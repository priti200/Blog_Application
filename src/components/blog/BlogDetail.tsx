import { useBlog } from '../../hooks/useBlog';
import { useBlogs } from '../../hooks/useBlogs';
import { formatDate, getCategoryColor } from '../../lib/utils';
import BlogCard from './BlogCard';

interface BlogDetailProps {
    blogId: number;
    onBack: () => void;
    onBlogClick?: (id: number) => void;
}

export default function BlogDetail({ blogId, onBack, onBlogClick }: BlogDetailProps) {
    const { data: blog, isLoading, isError, error } = useBlog(blogId);
    const { blogs: allBlogs } = useBlogs();

    // Get related blogs (same category, different ID, max 3)
    const relatedBlogs = blog
        ? allBlogs
            .filter((b) => b.id !== blog.id && b.category.some((cat) => blog.category.includes(cat)))
            .slice(0, 3)
        : [];

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-6">
                <div className="h-64 bg-gray-200 rounded-xl" />
                <div className="h-8 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-12">
                <div className="text-red-500 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Error loading blog</h3>
                <p className="text-gray-600 mb-4">{error?.message || 'Something went wrong'}</p>
                <button
                    onClick={onBack}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                    Go Back
                </button>
            </div>
        );
    }

    if (!blog) {
        return null;
    }

    // Format content with paragraph breaks
    const formattedContent = blog.content.split('\n\n').map((paragraph, index) => (
        <p key={index} className="mb-4 last:mb-0">
            {paragraph}
        </p>
    ));

    return (
        <div className="animate-fade-in">
            <article className="max-w-4xl mx-auto mb-16">
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="mb-6 flex items-center gap-2 text-gray-600 hover:text-primary-600 transition"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Back to blogs</span>
                </button>

                {/* Cover Image */}
                <div className="relative h-96 rounded-xl overflow-hidden mb-8 shadow-2xl">
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {blog.category.map((cat) => (
                                <span
                                    key={cat}
                                    className={`px-4 py-1.5 text-sm font-medium rounded-full ${getCategoryColor(cat)}`}
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">
                            {blog.title}
                        </h1>
                        <p className="text-gray-200 text-lg">{formatDate(blog.date)}</p>
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
                    {/* Description */}
                    <div className="mb-8 pb-8 border-b border-gray-200">
                        <p className="text-xl text-gray-700 leading-relaxed italic">
                            {blog.description}
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="prose prose-lg max-w-none">
                        <div className="text-gray-800 leading-relaxed text-base">
                            {formattedContent}
                        </div>
                    </div>
                </div>
            </article>

            {/* Related Posts Section */}
            {relatedBlogs.length > 0 && (
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
                            Related Posts
                        </h2>
                        <p className="text-gray-600">
                            Discover more articles on similar topics
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedBlogs.map((relatedBlog) => (
                            <BlogCard
                                key={relatedBlog.id}
                                blog={relatedBlog}
                                onClick={() => onBlogClick?.(relatedBlog.id)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
