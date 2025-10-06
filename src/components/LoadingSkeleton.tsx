import React from 'react';

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '', children }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}>
    {children}
  </div>
);

export const GameCardSkeleton: React.FC = () => (
  <div data-testid="loading-skeleton" className="bg-white dark:bg-gray-800 border-t-2 border-gray-200 dark:border-gray-700 py-6">
    <div className="flex items-start space-x-6">
      <div className="flex-shrink-0">
        <Skeleton className="w-20 h-20 rounded-lg" />
      </div>
      <div className="flex-1 min-w-0 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex justify-end">
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </div>
  </div>
);

export const GameListSkeleton: React.FC = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, index) => (
      <GameCardSkeleton key={index} />
    ))}
  </div>
);

export const GameDetailSkeleton: React.FC = () => (
  <div data-testid="game-detail-skeleton" className="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-8 w-24" />
          <div></div>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="mb-4 sm:mb-6 flex justify-center">
              <Skeleton className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg" />
            </div>
            <div className="text-center space-y-3">
              <Skeleton className="h-8 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3 mx-auto" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
            <div className="mt-6 text-center">
              <Skeleton className="h-12 w-32 mx-auto" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <Skeleton className="h-6 w-24 mb-4" />
            <div className="space-y-3">
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-5 w-32" />
              </div>
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-5 w-24" />
              </div>
              <div>
                <Skeleton className="h-4 w-12 mb-2" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const HeaderSkeleton: React.FC = () => (
  <header className="dark:bg-gray-800 border-gray-200 dark:border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center space-x-3">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <Skeleton className="h-6 w-48" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  </header>
);

export const CategorySkeleton: React.FC = () => (
  <div className="border-t-2 border-gray-200 dark:border-gray-700 p-4 lg:p-6 lg:px-2">
    {Array.from({ length: 3 }).map((_, index) => (
      <Skeleton key={index} className="h-12 w-full mb-2" />
    ))}
  </div>
);

export default Skeleton;
