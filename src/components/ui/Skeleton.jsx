import React from "react";

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-neutral-200/75 ${className}`}
      {...props}
    />
  );
};

export const RecipeCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-100">
      {/* Image Placeholder */}
      <Skeleton className="w-full h-48 md:h-56" />
      
      {/* Content Placeholder */}
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex gap-4 pt-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
