import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { generateDashboard, getDashboardStatus, getUserDashboardData } from '../lib/api';

export const useDashboardGeneration = () => {
    const queryClient = useQueryClient();

    const generateMutation = useMutation({
        mutationFn: generateDashboard,
        onSuccess: (data, username) => {
            // When generation starts, we get a job ID. When it's done, we need to refetch the data.
            queryClient.invalidateQueries({ queryKey: ['creatorData', username] });
        },
    });

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
        pollStatus,
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