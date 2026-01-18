import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export function useBlog(id: number) {
    return useQuery({
        queryKey: ['blog', id],
        queryFn: () => api.getBlog(id),
        enabled: !!id,
    });
}
