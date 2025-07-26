import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const Header = ({ title, onMenuToggle, className }) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "bg-white shadow-sm border-b border-gray-200 px-6 py-4 lg:px-8",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-8px"
          >
            <ApperIcon name="Menu" size={24} />
          </Button>
          
          {/* App branding and title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-8px flex items-center justify-center">
              <ApperIcon name="Heart" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary-700 to-primary-900 bg-clip-text text-transparent">
                Canine Coach Pro
              </h1>
              {title && (
                <p className="text-sm text-gray-600 mt-0.5">{title}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Header actions */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <ApperIcon name="Bell" size={20} className="mr-2" />
            Notifications
          </Button>
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <ApperIcon name="Settings" size={20} className="mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;