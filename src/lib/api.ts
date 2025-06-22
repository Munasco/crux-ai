import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Types
export interface DashboardData {
    totalFollowers: string;
    avgEngagement: string;
    highestViewCount: string;
    videoContentPieces: number;
    strengths: Array<{
        name: string;
        score: number;
        description: string;
    }>;
    improvements: Array<{
        name: string;
        score: number;
        description: string;
        suggestion: string;
    }>;
    username: string;
    generatedAt: string;
}

export interface JobStatus {
    status: 'starting' | 'scraping_instagram' | 'getting_followers' | 'analyzing' | 'completed' | 'error';
    progress: number;
    message: string;
    timestamp: string;
    data?: DashboardData;
}

export interface GenerateDashboardResponse {
    success: boolean;
    message: string;
    jobId: string;
}

export interface StatusResponse {
    success: boolean;
    jobId: string;
    status: JobStatus['status'];
    progress: number;
    message: string;
    timestamp: string;
    data?: DashboardData;
}

// API functions
export const generateDashboard = async (username: string): Promise<GenerateDashboardResponse> => {
    const response = await apiClient.post('/generate-dashboard', { username });
    return response.data;
};

export const getDashboardStatus = async (jobId: string): Promise<StatusResponse> => {
    const response = await apiClient.get(`/generate-dashboard/status/${jobId}`);
    return response.data;
};

export const getUserDashboardData = async (userId: string): Promise<{ success: boolean; data: any }> => {
    const response = await apiClient.get(`/users/${userId}/dashboardInfo`);
    return response.data;
};

export const updateUserDashboard = async (userId: string, data: any): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post(`/users/${userId}/updateDashboard`, data);
    return response.data;
};

export const scrapeInstagram = async (url: string): Promise<any> => {
    const response = await apiClient.post('/scrape-instagram', { url });
    return response.data;
};

export const getFollowersCount = async (username: string): Promise<any> => {
    const response = await apiClient.post('/get-followers-count', { username });
    return response.data;
};

export const analyzeVideo = async (videoUrl: string, prompt?: string): Promise<any> => {
    const response = await apiClient.post('/analyze-video', { video_url: videoUrl, prompt });
    return response.data;
}; 