import { useState } from 'react';
import { useCreateBlog } from '@/hooks/useCreateBlog';
import type { CreateBlogDTO, BlogCategory } from '@/types/blog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getCategoryColor } from '@/lib/utils';
import { AlertCircle, Image as ImageIcon, Sparkles, X } from 'lucide-react';

interface BlogFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export default function BlogForm({ onSuccess, onCancel }: BlogFormProps) {
    const [formData, setFormData] = useState<CreateBlogDTO>({
        title: '',
        category: [],
        description: '',
        coverImage: '',
        content: '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof CreateBlogDTO, string>>>({});

    const createBlogMutation = useCreateBlog();

    const availableCategories: BlogCategory[] = ['FINANCE', 'TECH', 'LIFESTYLE', 'BUSINESS'];

    const toggleCategory = (category: BlogCategory) => {
        setFormData(prev => ({
            ...prev,
            category: prev.category.includes(category)
                ? prev.category.filter(c => c !== category)
                : [...prev.category, category],
        }));
    };

    const fillExampleData = () => {
        setFormData({
            title: "Future of Fintech",
            category: ["FINANCE", "TECH"],
            description: "Exploring how AI and blockchain are reshaping financial services",
            coverImage: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg",
            content: "The intersection of finance and technology has never been more vibrant. As we look towards 2026, the role of the Chartered Accountant is evolving from mere bookkeeping to strategic financial analysis powered by AI.\n\nThe Rise of Automated Accounting\nAutomation is no longer a buzzword; it's a reality. Routine tasks like data entry, reconciliation, and payroll processing are being automated at an unprecedented pace. This shift allows finance professionals to focus on high-value activities such as:\n\n• Strategic financial planning and analysis (FP&A).\n• Risk management and compliance auditing.\n• Advisory services for business growth and sustainability.\n\nBlockchain: Beyond Cryptocurrency\nWhile Bitcoin grabs the headlines, the underlying technology—blockchain—is quietly revolutionizing auditing. The immutable ledger provides a \"single source of truth\" that could potentially eliminate the need for sampling in audits, allowing for 100% verification of transactions.",
        });
        setErrors({});
    };

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof CreateBlogDTO, string>> = {};

        if (!formData.title || formData.title.length < 5) {
            newErrors.title = 'Title must be at least 5 characters';
        } else if (formData.title.length > 200) {
            newErrors.title = 'Title must be less than 200 characters';
        }

        if (!formData.description || formData.description.length < 20) {
            newErrors.description = 'Description must be at least 20 characters';
        } else if (formData.description.length > 300) {
            newErrors.description = 'Description must be less than 300 characters';
        }

        if (!formData.content || formData.content.length < 100) {
            newErrors.content = 'Content must be at least 100 characters';
        }

        if (formData.category.length === 0) {
            newErrors.category = 'Please select at least one category';
        }

        if (!formData.coverImage) {
            newErrors.coverImage = 'Cover image URL is required';
        } else {
            try {
                new URL(formData.coverImage);
            } catch {
                newErrors.coverImage = 'Please enter a valid URL';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            await createBlogMutation.mutateAsync(formData);
            onSuccess();
        } catch (error) {
            console.error('Failed to create blog:', error);
        }
    };

    return (
        <Card className="max-w-3xl mx-auto border-t-4 border-t-primary shadow-lg animate-fade-in">
            <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-3xl font-heading text-foreground">Create New Blog Post</CardTitle>
                        <CardDescription>Share your insights with the CA Monk community</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={fillExampleData} className="gap-2 hidden sm:flex border-primary/20 hover:bg-primary/5 hover:text-primary">
                        <Sparkles className="w-4 h-4 text-primary" />
                        Fill Example
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-base font-semibold">Title <span className="text-destructive">*</span></Label>
                        <Input
                            type="text"
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            className={`h-12 text-lg ${errors.title ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                            placeholder="e.g. The Future of Financial Auditing"
                        />
                        <div className="flex justify-between text-xs">
                            {errors.title ? <p className="text-destructive font-medium">{errors.title}</p> : <span></span>}
                            <p className="text-muted-foreground">{formData.title.length}/200</p>
                        </div>
                    </div>

                    {/* Cover Image URL */}
                    <div className="space-y-2">
                        <Label htmlFor="coverImage" className="text-base font-semibold">Cover Image URL <span className="text-destructive">*</span></Label>
                        <div className="flex gap-2">
                            <Input
                                type="url"
                                id="coverImage"
                                value={formData.coverImage}
                                onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                                className={errors.coverImage ? 'border-destructive focus-visible:ring-destructive' : ''}
                                placeholder="https://..."
                            />
                        </div>
                        {errors.coverImage && <p className="text-sm text-destructive font-medium">{errors.coverImage}</p>}

                        {formData.coverImage && !errors.coverImage ? (
                            <div className="mt-3 relative h-48 w-full rounded-lg overflow-hidden border bg-muted/30">
                                <img
                                    src={formData.coverImage}
                                    alt="Preview"
                                    className="h-full w-full object-cover"
                                    onError={() => setErrors(prev => ({ ...prev, coverImage: 'Failed to load image' }))}
                                />
                            </div>
                        ) : (
                            <div className="mt-2 h-24 w-full rounded-lg border border-dashed flex items-center justify-center bg-muted/10 text-muted-foreground">
                                <div className="flex flex-col items-center gap-1">
                                    <ImageIcon className="w-6 h-6 opacity-50" />
                                    <span className="text-xs">Image preview will appear here</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Categories */}
                    <div className="space-y-3">
                        <Label className="text-base font-semibold">Categories <span className="text-destructive">*</span></Label>
                        <div className="flex flex-wrap gap-2 p-4 border rounded-lg bg-muted/10">
                            {availableCategories.map((cat) => {
                                const isSelected = formData.category.includes(cat);
                                return (
                                    <Badge
                                        key={cat}
                                        variant={isSelected ? "default" : "outline"}
                                        className={`px-4 py-1.5 text-sm cursor-pointer transition-all ${isSelected
                                            ? `${getCategoryColor(cat)} hover:opacity-90 border-transparent`
                                            : 'hover:bg-background hover:border-primary/50'}`}
                                        onClick={() => toggleCategory(cat)}
                                    >
                                        {cat}
                                        {isSelected && <X className="ml-2 w-3 h-3" />}
                                    </Badge>
                                );
                            })}
                        </div>
                        {errors.category ? (
                            <p className="text-sm text-destructive font-medium">{errors.category}</p>
                        ) : (
                            <p className="text-xs text-muted-foreground">Select one or more categories that best fit your post.</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-base font-semibold">Short Description <span className="text-destructive">*</span></Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            rows={2}
                            className={`resize-none ${errors.description ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                            placeholder="A brief summary to appear on the blog card..."
                        />
                        <div className="flex justify-between text-xs">
                            {errors.description ? <p className="text-destructive font-medium">{errors.description}</p> : <span></span>}
                            <p className="text-muted-foreground">{formData.description.length}/300</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                        <Label htmlFor="content" className="text-base font-semibold">Content <span className="text-destructive">*</span></Label>
                        <Textarea
                            id="content"
                            value={formData.content}
                            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                            rows={15}
                            className={`font-mono text-sm leading-relaxed ${errors.content ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                            placeholder="Write your full article here..."
                        />
                        <div className="flex justify-between text-xs">
                            {errors.content ? <p className="text-destructive font-medium">{errors.content}</p> : <span></span>}
                            <p className="text-muted-foreground">{formData.content.length} characters</p>
                        </div>
                    </div>

                    {/* Error Message */}
                    {createBlogMutation.isError && (
                        <Alert variant="destructive" className="animate-fade-in">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                Failed to create blog post. Please try again later.
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4 border-t">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onCancel}
                            disabled={createBlogMutation.isPending}
                            className="w-full sm:w-auto"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={createBlogMutation.isPending}
                            className="w-full sm:w-auto sm:ml-auto min-w-[150px]"
                        >
                            {createBlogMutation.isPending ? (
                                <span className="flex items-center gap-2">Creating...</span>
                            ) : (
                                'Publish Post'
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
