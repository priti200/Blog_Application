import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { CreateBlogDTO } from '../types/blog';

export function useCreateBlog() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (blog: CreateBlogDTO) => api.createBlog(blog),
        onSuccess: () => {
            // Invalidate and refetch blogs query
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });
}
