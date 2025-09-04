import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { generateDashboard, getUserDashboardData } from '../lib/api';

// SSE Hook for real-time dashboard status updates
export const useSSEDashboardStatus = (jobId: string | null) => {
    const [status, setStatus] = useState<string | null>(null);
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

    return {
        generateDashboard: generateMutation.mutate,
        isGenerating: generateMutation.isPending,
        generateError: generateMutation.error,
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