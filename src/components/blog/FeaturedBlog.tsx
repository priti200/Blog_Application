import type { Blog } from '@/types/blog';
import { formatDate, getCategoryColor } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Share2, ThumbsUp, MessageCircle } from 'lucide-react';

interface FeaturedBlogProps {
    blog: Blog;
    onBack: () => void;
}

export default function FeaturedBlog({ blog, onBack }: FeaturedBlogProps) {
    return (
        <Card className="overflow-hidden">
            {/* Hero Image */}
            <div className="relative h-80 bg-gray-200">
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                />
                <Badge
                    className={`absolute top-6 left-6 ${getCategoryColor(blog.category[0])}`}
                >
                    {blog.category[0]}
                </Badge>
            </div>

            {/* Content */}
            <CardContent className="p-8 md:p-12">
                {/* Category Badge and Read Time */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <span
                        className="font-semibold uppercase"
                        style={{ color: getCategoryColor(blog.category[0]) }}
                    >
                        {blog.category[0]}
                    </span>
                    <span>•</span>
                    <span>5 min read</span>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    {blog.title}
                </h1>

                {/* Share Article Button */}
                <Button className="mb-6 gap-2">
                    <Share2 className="w-4 h-4" />
                    Share Article
                </Button>

                {/* Metadata Table */}
                <div className="grid grid-cols-3 gap-4 mb-8 pb-6 border-b border-gray-200">
                    <div>
                        <div className="text-xs text-gray-500 uppercase mb-1">Category</div>
                        <div className="font-medium text-gray-900">Fintech & AI</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500 uppercase mb-1">Read Time</div>
                        <div className="font-medium text-gray-900">5 Mins</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500 uppercase mb-1">Date</div>
                        <div className="font-medium text-gray-900">{formatDate(blog.date)}</div>
                    </div>
                </div>

                {/* Blog Content */}
                <div className="prose prose-lg max-w-none">
                    <div
                        className="text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>

                {/* Author Section */}
                <div className="mt-12 pt-6 border-t border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Author Photo */}
                        {blog.authorAvatar ? (
                            <img
                                src={blog.authorAvatar}
                                alt={blog.author || 'Author'}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">
                                    {blog.author ? blog.author.split(' ').map(n => n[0]).join('').slice(0, 2) : getAuthorInitials(blog.category[0])}
                                </span>
                            </div>
                        )}
                        <div>
                            <p className="font-semibold text-gray-900">
                                Written by {blog.author || getAuthorName(blog.category[0])}
                            </p>
                            <p className="text-sm text-gray-600">
                                {blog.authorTitle || getAuthorTitle(blog.category[0])}
                            </p>
                        </div>
                    </div>

                    {/* Like and Comment Icons */}
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon">
                            <ThumbsUp className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <MessageCircle className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// Helper functions for category-based authors
function getAuthorName(category: string): string {
    const authors: Record<string, string> = {
        FINANCE: 'Arjun Mehta',
        TECH: 'Priya Sharma',
        LIFESTYLE: 'Rahul Verma',
        BUSINESS: 'Sneha Patel',
        TECHNOLOGY: 'Priya Sharma',
    };
    return authors[category.toUpperCase()] || 'CA Monk Team';
}

function getAuthorTitle(category: string): string {
    const titles: Record<string, string> = {
        FINANCE: 'Senior Financial Analyst',
        TECH: 'Tech Evangelist',
        LIFESTYLE: 'Wellness Coach',
        BUSINESS: 'Business Consultant',
        TECHNOLOGY: 'Tech Evangelist',
    };
    return titles[category.toUpperCase()] || 'Content Writer';
}

function getAuthorInitials(category: string): string {
    const author = getAuthorName(category);
    return author.split(' ').map(n => n[0]).join('').slice(0, 2);
}
