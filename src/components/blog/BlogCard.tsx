import type { Blog } from '@/types/blog';
import { formatDate, getCategoryColor, truncateText } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface BlogCardProps {
    blog: Blog;
    onClick: () => void;
}

export default function BlogCard({ blog, onClick }: BlogCardProps) {
    return (
        <Card
            className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] animate-fade-in"
            onClick={onClick}
        >
            {/* Cover Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Categories */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {blog.category.map((cat) => (
                        <Badge
                            key={cat}
                            className={getCategoryColor(cat)}
                        >
                            {cat}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Content */}
            <CardContent className="p-5">
                {/* Date */}
                <p className="text-sm text-muted-foreground mb-2">{formatDate(blog.date)}</p>

                {/* Title */}
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                    {truncateText(blog.description, 150)}
                </p>

                {/* Read More */}
                <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                    <span>Read more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
            </CardContent>
        </Card>
    );
}
