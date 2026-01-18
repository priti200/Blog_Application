import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
}

export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

export function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
        FINANCE: 'bg-category-finance text-white',
        TECH: 'bg-category-tech text-white',
        LIFESTYLE: 'bg-category-lifestyle text-white',
        BUSINESS: 'bg-category-business text-white',
    };
    return colors[category] || 'bg-gray-500 text-white';
}
