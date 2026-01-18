import { Skeleton } from '@/components/ui/skeleton';

export default function BlogSkeleton() {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-md">
            {/* Image skeleton */}
            <Skeleton className="h-48 w-full rounded-none" />

            {/* Content skeleton */}
            <div className="p-5 space-y-4">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-1/3" />
            </div>
        </div>
    );
}
