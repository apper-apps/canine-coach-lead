import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import Modal from "@/components/molecules/Modal";
import ProgramGrid from "@/components/organisms/ProgramGrid";
import AddProgramForm from "@/components/organisms/AddProgramForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { programService } from "@/services/api/programService";
import { toast } from "react-toastify";

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const loadPrograms = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await programService.getAll();
      setPrograms(data);
    } catch (err) {
      setError("Failed to load training programs. Please try again.");
      console.error("Error loading programs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrograms();
  }, []);

  const handleAddProgram = () => {
    setShowAddModal(false);
    loadPrograms();
  };

  const handleProgramClick = (program) => {
    toast.info(`Selected ${program.name} - Program details would open here`);
  };

  const filteredPrograms = programs.filter(program =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.objectives.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading type="cards" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadPrograms} />;
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
      >
        <div>
          <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-primary-700 to-primary-900 bg-clip-text text-transparent">
            Training Programs
          </h1>
          <p className="text-gray-600 mt-2">
            Create and manage comprehensive training programs for your canine clients
          </p>
        </div>
        
        <Button 
          onClick={() => setShowAddModal(true)}
          variant="primary"
          size="lg"
          className="self-start sm:self-auto"
        >
          <ApperIcon name="Plus" size={20} className="mr-2" />
          Create Program
        </Button>
      </motion.div>

      {/* Search and Stats */}
      {programs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4"
        >
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search programs by name, objectives, or description..."
            className="flex-1"
          />
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <ApperIcon name="Target" size={16} />
            <span>{programs.length} program{programs.length !== 1 ? 's' : ''} available</span>
          </div>
        </motion.div>
      )}

      {/* Programs Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {filteredPrograms.length > 0 ? (
          <ProgramGrid programs={filteredPrograms} onProgramClick={handleProgramClick} />
        ) : programs.length === 0 ? (
          <Empty
            title="No training programs created yet"
            message="Build your training curriculum by creating structured programs with clear objectives and methodologies. Each program can be customized for different skill levels and training goals."
            actionLabel="Create First Program"
            onAction={() => setShowAddModal(true)}
            icon="Target"
          />
        ) : (
          <Empty
            title="No programs match your search"
            message={`No training programs found matching "${searchTerm}". Try adjusting your search terms.`}
            actionLabel="Clear Search"
            onAction={() => setSearchTerm("")}
            icon="Search"
          />
        )}
      </motion.div>

      {/* Add Program Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Create New Training Program"
        size="lg"
      >
        <AddProgramForm
          onSuccess={handleAddProgram}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>
    </div>
  );
};

export default ProgramsPage;