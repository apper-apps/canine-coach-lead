import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Loading = ({ className, type = "cards" }) => {
  const CardSkeleton = () => (
    <div className="card p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full shimmer"></div>
          <div>
            <div className="h-5 bg-gray-200 rounded w-32 mb-2 shimmer"></div>
            <div className="h-4 bg-gray-200 rounded w-24 shimmer"></div>
          </div>
        </div>
        <div className="h-6 bg-gray-200 rounded-full w-16 shimmer"></div>
      </div>
      
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-40 shimmer"></div>
        <div className="h-4 bg-gray-200 rounded w-full shimmer"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 shimmer"></div>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="h-4 bg-gray-200 rounded w-24 shimmer"></div>
          <div className="h-4 bg-gray-200 rounded w-20 shimmer"></div>
        </div>
      </div>
    </div>
  );

  const ListSkeleton = () => (
    <div className="card p-5 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full shimmer"></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded w-48 mb-2 shimmer"></div>
            <div className="flex items-center space-x-4">
              <div className="h-4 bg-gray-200 rounded w-24 shimmer"></div>
              <div className="h-4 bg-gray-200 rounded w-20 shimmer"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="h-6 bg-gray-200 rounded-full w-20 shimmer"></div>
          <div className="w-4 h-4 bg-gray-200 rounded shimmer"></div>
        </div>
      </div>
    </div>
  );

  const GridLoading = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <CardSkeleton />
        </motion.div>
      ))}
    </div>
  );

  const ListLoading = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <ListSkeleton />
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className={cn("w-full", className)}>
      {type === "cards" ? <GridLoading /> : <ListLoading />}
    </div>
  );
};

export default Loading;