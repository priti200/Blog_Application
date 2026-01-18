export interface Blog {
    id: number;
    title: string;
    category: string[];
    description: string;
    date: string;
    coverImage: string;
    content: string;
    author?: string;
    authorTitle?: string;
    authorAvatar?: string;
}

export interface CreateBlogDTO {
    title: string;
    category: string[];
    description: string;
    coverImage: string;
    content: string;
}

export type BlogCategory = 'FINANCE' | 'TECH' | 'LIFESTYLE' | 'BUSINESS';

export interface BlogFilters {
    search?: string;
    categories?: BlogCategory[];
    sortBy?: 'date' | 'title';
    sortOrder?: 'asc' | 'desc';
}
