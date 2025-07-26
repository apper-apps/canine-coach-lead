import React from "react";
import { motion } from "framer-motion";
import DogCard from "@/components/molecules/DogCard";
import { cn } from "@/utils/cn";

const DogGrid = ({ dogs, onDogClick, className }) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6", className)}>
      {dogs.map((dog, index) => (
        <motion.div
          key={dog.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <DogCard dog={dog} onClick={onDogClick} />
        </motion.div>
      ))}
    </div>
  );
};

export default DogGrid;