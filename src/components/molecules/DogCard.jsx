import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";
import { format } from "date-fns";

const DogCard = ({ dog, onClick, className }) => {
  const getAgeText = (age) => {
    if (age < 1) return `${age * 12} months`;
    return `${age} year${age > 1 ? 's' : ''} old`;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "card p-6 cursor-pointer bg-gradient-to-br from-surface to-white hover:from-white hover:to-surface transition-all duration-300",
        className
      )}
      onClick={() => onClick && onClick(dog)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
            <ApperIcon name="Heart" size={24} className="text-primary-600" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-gray-900">{dog.name}</h3>
            <p className="text-sm text-gray-600">{dog.breed}</p>
          </div>
        </div>
        <Badge variant="primary" size="sm">
          {getAgeText(dog.age)}
        </Badge>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <ApperIcon name="Calendar" size={16} className="mr-2" />
          <span>Added {format(new Date(dog.createdAt), "MMM d, yyyy")}</span>
        </div>
        
        {dog.temperament && (
          <div className="flex items-start text-sm text-gray-700">
            <ApperIcon name="FileText" size={16} className="mr-2 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">{dog.temperament}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <ApperIcon name="BookOpen" size={16} className="mr-1" />
            <span>Training Programs: 0</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <ApperIcon name="Clock" size={16} className="mr-1" />
            <span>Sessions: 0</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DogCard;