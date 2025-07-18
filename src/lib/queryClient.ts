import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // Avoid refetching on focus
            staleTime: 5 * 60 * 1000,    // 5 minutes stale time
            retry: 2,                     // Retry failed requests twice
        },
        mutations: {
            retry: 1,                     // Retry failed mutations once
        },
    },
});

export default queryClient; 