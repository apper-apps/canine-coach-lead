import React from "react";
import { motion } from "framer-motion";
import ProgramCard from "@/components/molecules/ProgramCard";
import { cn } from "@/utils/cn";

const ProgramGrid = ({ programs, onProgramClick, className }) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6", className)}>
      {programs.map((program, index) => (
        <motion.div
          key={program.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ProgramCard program={program} onClick={onProgramClick} />
        </motion.div>
      ))}
    </div>
  );
};

export default ProgramGrid;