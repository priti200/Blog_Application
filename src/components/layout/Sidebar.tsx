import type { Blog } from '../../types/blog';
import { getCategoryColor } from '../../lib/utils';

interface SidebarProps {
    blogs: Blog[];
    onBlogClick: (id: number) => void;
}

// Helper to get category icon
const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
        FINANCE: '📈',
        TECH: '💻',
        TECHNOLOGY: '💻',
        LIFESTYLE: '🌱',
        BUSINESS: '💼',
        CAREER: '🎓',
        REGULATIONS: '📋',
        SKILLS: '👥',
    };
    return icons[category.toUpperCase()] || '📄';
};

// Helper to get relative time
const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffWeeks = Math.floor(diffDays / 7);

    if (diffDays === 0) {
        return `${diffHours} hours ago`;
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else if (diffWeeks < 4) {
        return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
};

// Helper to get tag for blog
const getBlogTag = (blog: Blog) => {
    const tags: Record<string, string> = {
        'Future of Fintech': 'Featured',
        'Ace Your CA Finals': 'Study Tips',
        'Understanding Tax Reforms': 'Taxation',
        'Soft Skills for Auditors': 'Development',
        'Audit Automation Tools': 'Technology',
    };
    return tags[blog.title] || '';
};

export default function Sidebar({ blogs, onBlogClick }: SidebarProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Latest Articles</h2>

            <div className="space-y-6">
                {blogs.map((blog) => {
                    const tag = getBlogTag(blog);

                    return (
                        <article
                            key={blog.id}
                            className="border-b border-gray-100 pb-6 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors p-3 rounded -mx-3"
                            onClick={() => onBlogClick(blog.id)}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span>{getCategoryIcon(blog.category[0])}</span>
                                    <span
                                        className="text-xs font-semibold uppercase"
                                        style={{ color: getCategoryColor(blog.category[0]) }}
                                    >
                                        {blog.category[0]}
                                    </span>
                                </div>
                                <time className="text-xs text-gray-500">{getRelativeTime(blog.date)}</time>
                            </div>

                            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                                {blog.title}
                            </h3>

                            <p className="text-sm text-gray-600 line-clamp-3 mb-2">
                                {blog.description}
                            </p>

                            {tag && (
                                <span className="inline-block text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded mb-2">
                                    {tag}
                                </span>
                            )}
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
