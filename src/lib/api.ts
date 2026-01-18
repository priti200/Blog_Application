import type { Blog, CreateBlogDTO } from '../types/blog';

const API_BASE_URL = 'http://localhost:3001';

export const api = {
    // Get all blogs
    getBlogs: async (): Promise<Blog[]> => {
        const response = await fetch(`${API_BASE_URL}/blogs`);
        if (!response.ok) {
            throw new Error('Failed to fetch blogs');
        }
        return response.json();
    },

    // Get single blog by ID
    getBlog: async (id: number): Promise<Blog> => {
        const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Blog not found');
            }
            throw new Error('Failed to fetch blog');
        }
        return response.json();
    },

    // Create new blog
    createBlog: async (blog: CreateBlogDTO): Promise<Blog> => {
        const response = await fetch(`${API_BASE_URL}/blogs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...blog,
                date: new Date().toISOString(),
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to create blog');
        }
        return response.json();
    },
};
