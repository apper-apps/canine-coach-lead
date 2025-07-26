import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import { programService } from "@/services/api/programService";
import { toast } from "react-toastify";

const AddProgramForm = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    objectives: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Program name is required";
    }
    
    if (!formData.objectives.trim()) {
      newErrors.objectives = "Objectives are required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const programData = {
        ...formData,
        createdAt: new Date().toISOString()
      };
      
      await programService.create(programData);
      toast.success("Training program created successfully!");
      onSuccess && onSuccess();
    } catch (error) {
      toast.error("Failed to create training program. Please try again.");
      console.error("Error creating program:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <FormField
        label="Program Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
        error={errors.name}
        placeholder="Enter program name (e.g., Basic Obedience, Puppy Training)"
      />
      
      <FormField
        label="Training Objectives"
        name="objectives"
        value={formData.objectives}
        onChange={handleInputChange}
        required
        error={errors.objectives}
        multiline
        rows={3}
        placeholder="List the main objectives and goals of this training program..."
      />
      
      <FormField
        label="Program Description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        required
        error={errors.description}
        multiline
        rows={4}
        placeholder="Provide a detailed description of the program, methods, and expected outcomes..."
      />
      
      <div className="flex space-x-4 pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="flex-1"
        >
          {loading ? "Creating..." : "Create Program"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </motion.form>
  );
};

export default AddProgramForm;