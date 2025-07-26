import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import Modal from "@/components/molecules/Modal";
import DogGrid from "@/components/organisms/DogGrid";
import AddDogForm from "@/components/organisms/AddDogForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { dogService } from "@/services/api/dogService";
import { toast } from "react-toastify";

const DogsPage = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const loadDogs = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await dogService.getAll();
      setDogs(data);
    } catch (err) {
      setError("Failed to load dogs. Please try again.");
      console.error("Error loading dogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDogs();
  }, []);

  const handleAddDog = () => {
    setShowAddModal(false);
    loadDogs();
  };

  const handleDogClick = (dog) => {
    toast.info(`Selected ${dog.name} - Dog profile details would open here`);
  };

  const filteredDogs = dogs.filter(dog =>
    dog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dog.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading type="cards" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadDogs} />;
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
            Dog Profiles
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your canine clients and their training profiles
          </p>
        </div>
        
        <Button 
          onClick={() => setShowAddModal(true)}
          variant="primary"
          size="lg"
          className="self-start sm:self-auto"
        >
          <ApperIcon name="Plus" size={20} className="mr-2" />
          Add Dog
        </Button>
      </motion.div>

      {/* Search and Filters */}
      {dogs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4"
        >
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search dogs by name or breed..."
            className="flex-1"
          />
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <ApperIcon name="Users" size={16} />
            <span>{dogs.length} dog{dogs.length !== 1 ? 's' : ''} total</span>
          </div>
        </motion.div>
      )}

      {/* Dogs Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {filteredDogs.length > 0 ? (
          <DogGrid dogs={filteredDogs} onDogClick={handleDogClick} />
        ) : dogs.length === 0 ? (
          <Empty
            title="No dogs registered yet"
            message="Start building your client base by adding your first dog profile. Include details about their breed, age, and temperament to track their training progress."
            actionLabel="Add First Dog"
            onAction={() => setShowAddModal(true)}
            icon="Heart"
          />
        ) : (
          <Empty
            title="No dogs match your search"
            message={`No dogs found matching "${searchTerm}". Try adjusting your search terms.`}
            actionLabel="Clear Search"
            onAction={() => setSearchTerm("")}
            icon="Search"
          />
        )}
      </motion.div>

      {/* Add Dog Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Dog Profile"
        size="md"
      >
        <AddDogForm
          onSuccess={handleAddDog}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>
    </div>
  );
};

export default DogsPage;