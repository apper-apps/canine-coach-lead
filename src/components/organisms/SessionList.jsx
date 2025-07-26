import React from "react";
import { motion } from "framer-motion";
import SessionCard from "@/components/molecules/SessionCard";
import { cn } from "@/utils/cn";

const SessionList = ({ sessions, dogs, programs, onSessionClick, className }) => {
  const getDogById = (dogId) => dogs.find(dog => dog.Id === dogId);
  const getProgramById = (programId) => programs.find(program => program.Id === programId);

  return (
    <div className={cn("space-y-4", className)}>
      {sessions.map((session, index) => (
        <motion.div
          key={session.Id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <SessionCard 
            session={session}
            dog={getDogById(session.dogId)}
            program={getProgramById(session.programId)}
            onClick={onSessionClick}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default SessionList;