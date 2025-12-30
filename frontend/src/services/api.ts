import axios, { type AxiosInstance, type AxiosError } from 'axios';

// API base URL - will use environment variable in production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            // Server responded with error status
            console.error('API Error:', error.response.data);
        } else if (error.request) {
            // Request made but no response
            console.error('Network Error:', error.message);
        } else {
            // Something else happened
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// Types
export interface ContactFormData {
    name: string;
    email: string;
    subject?: string;
    message: string;
}

export interface Project {
    _id: string;
    title: string;
    description: string;
    longDescription?: string;
    technologies: string[];
    category: 'web' | 'mobile' | 'desktop' | 'ai-ml' | 'other';
    imageUrl?: string;
    demoUrl?: string;
    githubUrl?: string;
    featured: boolean;
    order: number;
    startDate?: string;
    endDate?: string;
    status: 'completed' | 'in-progress' | 'planned';
    createdAt: string;
    updatedAt: string;
}

export interface Skill {
    _id: string;
    name: string;
    category: 'frontend' | 'backend' | 'database' | 'tools' | 'other';
    level: number;
    icon?: string;
    order: number;
    createdAt: string;
    updatedAt: string;
}

export interface Journey {
    _id: string;
    title: string;
    organization: string;
    type: 'education' | 'work' | 'achievement';
    description: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    location?: string;
    skills?: string[];
    order: number;
    createdAt: string;
    updatedAt: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    count?: number;
    message?: string;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

// API Functions

/**
 * Contact Form API
 */
export const contactApi = {
    /**
     * Submit contact form
     */
    submit: async (data: ContactFormData): Promise<ApiResponse<any>> => {
        const response = await apiClient.post('/contact', data);
        return response.data;
    },

    /**
     * Get all contact submissions (admin only)
     */
    getAll: async (page = 1, limit = 10): Promise<ApiResponse<any[]>> => {
        const response = await apiClient.get('/contact', {
            params: { page, limit },
        });
        return response.data;
    },
};

/**
 * Projects API
 */
export const projectsApi = {
    /**
     * Get all projects with optional filters
     */
    getAll: async (filters?: {
        category?: string;
        status?: string;
        featured?: boolean;
    }): Promise<ApiResponse<Project[]>> => {
        const response = await apiClient.get('/projects', { params: filters });
        return response.data;
    },

    /**
     * Get single project by ID
     */
    getById: async (id: string): Promise<ApiResponse<Project>> => {
        const response = await apiClient.get(`/projects/${id}`);
        return response.data;
    },

    /**
     * Create new project (admin only)
     */
    create: async (data: Partial<Project>): Promise<ApiResponse<Project>> => {
        const response = await apiClient.post('/projects', data);
        return response.data;
    },

    /**
     * Update project (admin only)
     */
    update: async (
        id: string,
        data: Partial<Project>
    ): Promise<ApiResponse<Project>> => {
        const response = await apiClient.put(`/projects/${id}`, data);
        return response.data;
    },

    /**
     * Delete project (admin only)
     */
    delete: async (id: string): Promise<ApiResponse<void>> => {
        const response = await apiClient.delete(`/projects/${id}`);
        return response.data;
    },
};

/**
 * Skills API
 */
export const skillsApi = {
    /**
     * Get all skills with optional category filter
     */
    getAll: async (category?: string): Promise<ApiResponse<Skill[]>> => {
        const response = await apiClient.get('/skills', {
            params: category ? { category } : {},
        });
        return response.data;
    },

    /**
     * Create new skill (admin only)
     */
    create: async (data: Partial<Skill>): Promise<ApiResponse<Skill>> => {
        const response = await apiClient.post('/skills', data);
        return response.data;
    },

    /**
     * Update skill (admin only)
     */
    update: async (
        id: string,
        data: Partial<Skill>
    ): Promise<ApiResponse<Skill>> => {
        const response = await apiClient.put(`/skills/${id}`, data);
        return response.data;
    },

    /**
     * Delete skill (admin only)
     */
    delete: async (id: string): Promise<ApiResponse<void>> => {
        const response = await apiClient.delete(`/skills/${id}`);
        return response.data;
    },
};

/**
 * Journey API
 */
export const journeyApi = {
    /**
     * Get all journey entries with optional type filter
     */
    getAll: async (
        type?: 'education' | 'work' | 'achievement'
    ): Promise<ApiResponse<Journey[]>> => {
        const response = await apiClient.get('/journey', {
            params: type ? { type } : {},
        });
        return response.data;
    },

    /**
     * Create new journey entry (admin only)
     */
    create: async (data: Partial<Journey>): Promise<ApiResponse<Journey>> => {
        const response = await apiClient.post('/journey', data);
        return response.data;
    },

    /**
     * Update journey entry (admin only)
     */
    update: async (
        id: string,
        data: Partial<Journey>
    ): Promise<ApiResponse<Journey>> => {
        const response = await apiClient.put(`/journey/${id}`, data);
        return response.data;
    },

    /**
     * Delete journey entry (admin only)
     */
    delete: async (id: string): Promise<ApiResponse<void>> => {
        const response = await apiClient.delete(`/journey/${id}`);
        return response.data;
    },
};

/**
 * Health check
 */
export const healthCheck = async (): Promise<{
    status: string;
    timestamp: string;
    uptime: number;
}> => {
    const response = await axios.get(`${API_BASE_URL.replace('/api', '')}/health`);
    return response.data;
};

// Export default API client for custom requests
export default apiClient;
