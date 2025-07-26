import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import { dogService } from "@/services/api/dogService";
import { toast } from "react-toastify";

const AddDogForm = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    temperament: ""
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
      newErrors.name = "Dog name is required";
    }
    
    if (!formData.breed.trim()) {
      newErrors.breed = "Breed is required";
    }
    
    if (!formData.age || formData.age <= 0) {
      newErrors.age = "Valid age is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const dogData = {
        ...formData,
        age: parseFloat(formData.age),
        createdAt: new Date().toISOString()
      };
      
      await dogService.create(dogData);
      toast.success("Dog profile created successfully!");
      onSuccess && onSuccess();
    } catch (error) {
      toast.error("Failed to create dog profile. Please try again.");
      console.error("Error creating dog:", error);
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
        label="Dog Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
        error={errors.name}
        placeholder="Enter dog's name"
      />
      
      <FormField
        label="Breed"
        name="breed"
        value={formData.breed}
        onChange={handleInputChange}
        required
        error={errors.breed}
        placeholder="Enter dog's breed"
      />
      
      <FormField
        label="Age (years)"
        name="age"
        type="number"
        value={formData.age}
        onChange={handleInputChange}
        required
        error={errors.age}
        placeholder="Enter age in years"
        min="0"
        step="0.1"
      />
      
      <FormField
        label="Temperament Notes"
        name="temperament"
        value={formData.temperament}
        onChange={handleInputChange}
        multiline
        rows={4}
        placeholder="Describe the dog's temperament, behavior, and any special notes..."
      />
      
      <div className="flex space-x-4 pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="flex-1"
        >
          {loading ? "Creating..." : "Create Dog Profile"}
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

export default AddDogForm;