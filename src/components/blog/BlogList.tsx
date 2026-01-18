import { useState } from 'react';
import { useBlogs } from '../../hooks/useBlogs';
import type { BlogFilters, BlogCategory } from '../../types/blog';
import BlogCard from './BlogCard';
import BlogSkeleton from './BlogSkeleton';

interface BlogListProps {
    onBlogClick: (id: number) => void;
}

export default function BlogList({ onBlogClick }: BlogListProps) {
    const [filters, setFilters] = useState<BlogFilters>({
        search: '',
        categories: [],
        sortBy: 'date',
        sortOrder: 'desc',
    });

    const { blogs, isLoading, isError, error } = useBlogs(filters);

    const availableCategories: BlogCategory[] = ['FINANCE', 'TECH', 'LIFESTYLE', 'BUSINESS'];

    const toggleCategory = (category: BlogCategory) => {
        setFilters(prev => ({
            ...prev,
            categories: prev.categories?.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...(prev.categories || []), category],
        }));
    };

    return (
        <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={filters.search}
                        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    />
                    <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                {/* Category Filters */}
                <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Categories:</p>
                    <div className="flex flex-wrap gap-2">
                        {availableCategories.map((cat) => {
                            const isSelected = filters.categories?.includes(cat);
                            return (
                                <button
                                    key={cat}
                                    onClick={() => toggleCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isSelected
                                        ? `${getCategoryColor(cat)}`
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Sort Options */}
                <div className="flex items-center gap-4">
                    <p className="text-sm font-medium text-gray-700">Sort by:</p>
                    <select
                        value={filters.sortBy}
                        onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as 'date' | 'title' }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    >
                        <option value="date">Date</option>
                        <option value="title">Title</option>
                    </select>
                    <button
                        onClick={() => setFilters(prev => ({
                            ...prev,
                            sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc'
                        }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                        {filters.sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                </div>
            </div>

            {/* Blog Grid */}
            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <BlogSkeleton key={i} />
                    ))}
                </div>
            )}

            {isError && (
                <div className="text-center py-12">
                    <div className="text-red-500 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Error loading blogs</h3>
                    <p className="text-gray-600">{error?.message || 'Something went wrong'}</p>
                </div>
            )}

            {!isLoading && !isError && blogs.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No blogs found</h3>
                    <p className="text-gray-600">Try adjusting your search or filters</p>
                </div>
            )}

            {!isLoading && !isError && blogs.length > 0 && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog) => (
                            <BlogCard
                                key={blog.id}
                                blog={blog}
                                onClick={() => onBlogClick(blog.id)}
                            />
                        ))}
                    </div>
                    <p className="text-center text-gray-600 mt-4">
                        Showing {blogs.length} {blogs.length === 1 ? 'blog' : 'blogs'}
                    </p>
                </>
            )}
        </div>
    );
}

function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
        FINANCE: 'bg-category-finance text-white',
        TECH: 'bg-category-tech text-white',
        LIFESTYLE: 'bg-category-lifestyle text-white',
        BUSINESS: 'bg-category-business text-white',
    };
    return colors[category] || 'bg-gray-500 text-white';
}
