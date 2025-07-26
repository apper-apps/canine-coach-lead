import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";
import { format, isAfter, isBefore, startOfToday } from "date-fns";

const SessionCard = ({ session, dog, program, onClick, className }) => {
  const sessionDate = new Date(session.date);
  const today = startOfToday();
  const isPast = isBefore(sessionDate, today);
  const isToday = format(sessionDate, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
  
  const getStatusVariant = (status) => {
    switch (status) {
      case "completed": return "completed";
      case "cancelled": return "cancelled";
      case "upcoming": return "upcoming";
      default: return "upcoming";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed": return "CheckCircle";
      case "cancelled": return "XCircle";
      case "upcoming": return "Clock";
      default: return "Clock";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01, x: 4 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "card p-5 cursor-pointer bg-gradient-to-r from-surface to-white hover:from-white hover:to-surface transition-all duration-300 border-l-4",
        session.status === "completed" ? "border-l-success" : 
        session.status === "cancelled" ? "border-l-gray-400" : "border-l-primary-500",
        className
      )}
      onClick={() => onClick && onClick(session)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              session.status === "completed" ? "bg-green-100" :
              session.status === "cancelled" ? "bg-gray-100" : "bg-blue-100"
            )}>
              <ApperIcon 
                name={getStatusIcon(session.status)} 
                size={20} 
                className={cn(
                  session.status === "completed" ? "text-green-600" :
                  session.status === "cancelled" ? "text-gray-600" : "text-blue-600"
                )}
              />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-1">
              <h3 className="font-display font-semibold text-gray-900">
                {dog?.name || "Unknown Dog"}
              </h3>
              <ApperIcon name="ArrowRight" size={14} className="text-gray-400" />
              <span className="text-sm text-gray-600">
                {program?.name || "Unknown Program"}
              </span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <ApperIcon name="Calendar" size={14} className="mr-1" />
                <span>
                  {isToday ? "Today" : format(sessionDate, "MMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="Clock" size={14} className="mr-1" />
                <span>{format(sessionDate, "h:mm a")}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Badge variant={getStatusVariant(session.status)} size="sm">
            {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
          </Badge>
          <ApperIcon name="ChevronRight" size={16} className="text-gray-400" />
        </div>
      </div>
    </motion.div>
  );
};

export default SessionCard;