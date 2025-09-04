import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { generateDashboard, getDashboardStatus, getUserDashboardData } from '../lib/api';

// SSE Hook for real-time dashboard status updates
export const useSSEDashboardStatus = (jobId: string | null) => {
    const [status, setStatus] = useState<any>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!jobId) {
            setStatus(null);
            setIsConnected(false);
            setError(null);
            return;
        }

        console.log(`🔗 Connecting SSE for job ${jobId}`);
        
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
        const eventSource = new EventSource(`${apiBaseUrl}/generate-dashboard/stream/${jobId}`);

        eventSource.onopen = () => {
            console.log(`✅ SSE connected for job ${jobId}`);
            setIsConnected(true);
            setError(null);
        };

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log(`📨 SSE message for job ${jobId}:`, data);
                
                if (data.error) {
                    setError(data.error);
                    setStatus(null);
                } else {
                    setStatus(data);
                    setError(null);
                }

                // Close connection when job completes
                if (data.status === 'completed' || data.status === 'error') {
                    console.log(`🏁 Job ${jobId} finished with status: ${data.status}`);
                    eventSource.close();
                    setIsConnected(false);
                }
            } catch (err) {
                console.error('Error parsing SSE message:', err);
                setError('Failed to parse server message');
            }
        };

        eventSource.onerror = () => {
            console.error(`❌ SSE connection error for job ${jobId}`);
            setIsConnected(false);
            setError('Connection lost');
        };

        return () => {
            console.log(`🔌 Closing SSE connection for job ${jobId}`);
            eventSource.close();
            setIsConnected(false);
        };
    }, [jobId]);

    return { status, isConnected, error };
};

export const useDashboardGeneration = () => {
    const queryClient = useQueryClient();

    const generateMutation = useMutation({
        mutationFn: generateDashboard,
        onSuccess: (data, username) => {
            // When generation starts, we get a job ID. When it's done, we need to refetch the data.
            queryClient.invalidateQueries({ queryKey: ['creatorData', username] });
        },
    });

    // Keep the old polling as fallback (we'll remove this later)
    const pollStatus = (jobId: string) => {
        return useQuery({
            queryKey: ['dashboardStatus', jobId],
            queryFn: () => getDashboardStatus(jobId),
            enabled: !!jobId,
            retry: (failureCount, error: any) => {
                // Stop retrying if job is not found (404 error)
                if (error?.response?.status === 404) {
                    return false;
                }
                // Retry up to 3 times for other errors
                return failureCount < 3;
            },
            refetchInterval: (dataOrQuery: any) => {
                // Check for errors first
                const error = dataOrQuery?.state?.error || dataOrQuery?.error;
                if (error?.response?.status === 404) {
                    return false; // Stop polling if job not found
                }

                // This is a version-agnostic check for React Query v4 and v5
                const status = dataOrQuery?.state?.data?.status || dataOrQuery?.status;

                if (status === 'completed' || status === 'error') {
                    return false; // Stop polling when job is done
                }
                return 2000; // Poll every 2 seconds
            },
            refetchIntervalInBackground: false,
        });
    };

    return {
        generateDashboard: generateMutation.mutate,
        isGenerating: generateMutation.isPending,
        generateError: generateMutation.error,
        pollStatus, // Keep for fallback
    };
};

export const useCreatorData = (username?: string) => {
    return useQuery({
        queryKey: ['creatorData', username],
        queryFn: () => getUserDashboardData(username!),
        enabled: !!username,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
    });
}; 