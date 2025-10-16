import React from 'react';

const ClientCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 text-center flex flex-col items-center ring-1 ring-gray-900/5">
      <div className="w-24 h-24 rounded-full bg-surfaceNeutral dark:bg-gray-700 animate-pulse mb-4"></div>
      <div className="flex-grow w-full">
        <div className="h-5 bg-surfaceNeutral dark:bg-gray-700 animate-pulse rounded-md w-3/4 mx-auto"></div>
        <div className="h-4 bg-surfaceNeutral dark:bg-gray-700 animate-pulse rounded-md w-1/2 mx-auto mt-2"></div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 w-full">
        <div className="h-3 bg-surfaceNeutral dark:bg-gray-700 animate-pulse rounded-md w-1/4 mx-auto"></div>
      </div>
    </div>
  );
};

export default ClientCardSkeleton;