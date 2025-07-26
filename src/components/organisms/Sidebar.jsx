import React from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ isOpen, onClose, className }) => {
  const navItems = [
    {
      name: "Dogs",
      path: "/",
      icon: "Heart",
      description: "Manage dog profiles"
    },
    {
      name: "Training Programs",
      path: "/programs",
      icon: "Target",
      description: "Create and manage programs"
    },
    {
      name: "Sessions",
      path: "/sessions",
      icon: "Calendar",
      description: "Schedule and track sessions"
    }
  ];

  // Desktop sidebar (always visible on large screens)
  const DesktopSidebar = () => (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-60">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200 shadow-sidebar paw-watermark"
        >
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-6 mb-8">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-6px flex items-center justify-center">
                <ApperIcon name="Heart" size={20} className="text-white" />
              </div>
              <span className="ml-3 text-lg font-display font-bold text-gray-900">
                Canine Coach Pro
              </span>
            </div>
            
            <nav className="mt-5 flex-1 px-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "group flex items-center px-4 py-3 text-sm font-medium rounded-8px transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-primary-50 to-primary-100 text-primary-800 border-l-4 border-primary-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <ApperIcon
                          name={item.icon}
                          size={20}
                          className={cn(
                            "mr-3 flex-shrink-0 transition-colors duration-200",
                            isActive ? "text-primary-600" : "text-gray-400 group-hover:text-gray-500"
                          )}
                        />
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                        </div>
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </div>
        </motion.div>
      </div>
    </div>
  );

  // Mobile sidebar (overlay)
  const MobileSidebar = () => (
    <AnimatePresence>
      {isOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 flex z-40">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-600 bg-opacity-75 backdrop-blur-sm"
              onClick={onClose}
            />
            
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={onClose}
                >
                  <ApperIcon name="X" size={24} className="text-white" />
                </button>
              </div>
              
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto paw-watermark">
                <div className="flex-shrink-0 flex items-center px-6 mb-8">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-6px flex items-center justify-center">
                    <ApperIcon name="Heart" size={20} className="text-white" />
                  </div>
                  <span className="ml-3 text-lg font-display font-bold text-gray-900">
                    Canine Coach Pro
                  </span>
                </div>
                
                <nav className="mt-5 px-4 space-y-2">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn(
                          "group flex items-center px-4 py-3 text-sm font-medium rounded-8px transition-all duration-200",
                          isActive
                            ? "bg-gradient-to-r from-primary-50 to-primary-100 text-primary-800 border-l-4 border-primary-600"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <ApperIcon
                            name={item.icon}
                            size={20}
                            className={cn(
                              "mr-3 flex-shrink-0 transition-colors duration-200",
                              isActive ? "text-primary-600" : "text-gray-400 group-hover:text-gray-500"
                            )}
                          />
                          <div className="flex-1">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                          </div>
                        </>
                      )}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div className={className}>
      <DesktopSidebar />
      <MobileSidebar />
    </div>
  );
};

export default Sidebar;