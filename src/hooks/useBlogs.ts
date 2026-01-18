import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { Blog, BlogFilters } from '../types/blog';
import { useMemo } from 'react';

export function useBlogs(filters?: BlogFilters) {
    const query = useQuery({
        queryKey: ['blogs'],
        queryFn: api.getBlogs,
    });

    // Apply client-side filtering and sorting
    const filteredBlogs = useMemo(() => {
        if (!query.data) return [];

        let result = [...query.data];

        // Search filter
        if (filters?.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter(blog =>
                blog.title.toLowerCase().includes(searchLower) ||
                blog.description.toLowerCase().includes(searchLower) ||
                blog.content.toLowerCase().includes(searchLower)
            );
        }

        // Category filter
        if (filters?.categories && filters.categories.length > 0) {
            result = result.filter(blog =>
                blog.category.some(cat => filters.categories?.includes(cat as any))
            );
        }

        // Sorting
        if (filters?.sortBy) {
            result.sort((a, b) => {
                let comparison = 0;

                if (filters.sortBy === 'date') {
                    comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
                } else if (filters.sortBy === 'title') {
                    comparison = a.title.localeCompare(b.title);
                }

                return filters.sortOrder === 'desc' ? -comparison : comparison;
            });
        } else {
            // Default: sort by date descending (newest first)
            result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }

        return result;
    }, [query.data, filters]);

    return {
        ...query,
        blogs: filteredBlogs,
    };
}
