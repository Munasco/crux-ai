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

// Expose queryClient globally for debugging in development
// This allows programmatic access via window.__REACT_QUERY_CLIENT__
// See REACT_API_DEBUGGING.md for usage examples
if (import.meta.env.DEV) {
    (window as any).__REACT_QUERY_CLIENT__ = queryClient;
    console.log('🔍 React Query Client exposed for debugging');
    console.log('   Access via: window.__REACT_QUERY_CLIENT__');
    console.log('   See: REACT_API_DEBUGGING.md for API usage');
}

export default queryClient; 