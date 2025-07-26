import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import Badge from "@/components/atoms/Badge";
import SessionList from "@/components/organisms/SessionList";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { sessionService } from "@/services/api/sessionService";
import { dogService } from "@/services/api/dogService";
import { programService } from "@/services/api/programService";
import { toast } from "react-toastify";
import { isAfter, startOfToday, format } from "date-fns";

const SessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const loadData = async () => {
    setLoading(true);
    setError("");
    
    try {
      const [sessionsData, dogsData, programsData] = await Promise.all([
        sessionService.getAll(),
        dogService.getAll(),
        programService.getAll()
      ]);
      
      setSessions(sessionsData);
      setDogs(dogsData);
      setPrograms(programsData);
    } catch (err) {
      setError("Failed to load sessions data. Please try again.");
      console.error("Error loading sessions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSessionClick = (session) => {
    const dog = dogs.find(d => d.Id === session.dogId);
    const program = programs.find(p => p.Id === session.programId);
    toast.info(`Session with ${dog?.name || 'Unknown Dog'} - ${program?.name || 'Unknown Program'} details would open here`);
  };

  // Filter sessions
  const filteredSessions = sessions.filter(session => {
    const dog = dogs.find(d => d.Id === session.dogId);
    const program = programs.find(p => p.Id === session.programId);
    
    const matchesSearch = 
      dog?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || session.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Sort sessions by date (upcoming first, then recent)
  const sortedSessions = [...filteredSessions].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    const today = startOfToday();
    
    const aIsUpcoming = isAfter(dateA, today);
    const bIsUpcoming = isAfter(dateB, today);
    
    if (aIsUpcoming && !bIsUpcoming) return -1;
    if (!aIsUpcoming && bIsUpcoming) return 1;
    
    if (aIsUpcoming && bIsUpcoming) {
      return dateA - dateB; // Earlier upcoming dates first
    } else {
      return dateB - dateA; // More recent past dates first
    }
  });

  const getSessionStats = () => {
    const today = startOfToday();
    const upcoming = sessions.filter(s => isAfter(new Date(s.date), today) && s.status === "upcoming").length;
    const completed = sessions.filter(s => s.status === "completed").length;
    const cancelled = sessions.filter(s => s.status === "cancelled").length;
    
    return { upcoming, completed, cancelled, total: sessions.length };
  };

  const stats = getSessionStats();

  if (loading) {
    return <Loading type="list" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
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
            Training Sessions
          </h1>
          <p className="text-gray-600 mt-2">
            Track upcoming sessions and review training history
          </p>
        </div>
        
        <Button 
          onClick={() => toast.info("Schedule session functionality would open here")}
          variant="primary"
          size="lg"
          className="self-start sm:self-auto"
        >
          <ApperIcon name="Plus" size={20} className="mr-2" />
          Schedule Session
        </Button>
      </motion.div>

      {/* Stats Cards */}
      {sessions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div className="card p-4 bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Upcoming</p>
                <p className="text-2xl font-display font-bold text-blue-900">{stats.upcoming}</p>
              </div>
              <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                <ApperIcon name="Clock" size={20} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="card p-4 bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Completed</p>
                <p className="text-2xl font-display font-bold text-green-900">{stats.completed}</p>
              </div>
              <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                <ApperIcon name="CheckCircle" size={20} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="card p-4 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl font-display font-bold text-gray-900">{stats.cancelled}</p>
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <ApperIcon name="XCircle" size={20} className="text-gray-600" />
              </div>
            </div>
          </div>

          <div className="card p-4 bg-gradient-to-br from-primary-50 to-primary-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary-600">Total</p>
                <p className="text-2xl font-display font-bold text-primary-900">{stats.total}</p>
              </div>
              <div className="w-10 h-10 bg-primary-200 rounded-full flex items-center justify-center">
                <ApperIcon name="Calendar" size={20} className="text-primary-600" />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Search and Filters */}
      {sessions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4"
        >
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search sessions by dog name or program..."
            className="flex-1"
          />
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">Filter:</span>
            {["all", "upcoming", "completed", "cancelled"].map(status => (
              <Button
                key={status}
                variant={filterStatus === status ? "primary" : "ghost"}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="capitalize"
              >
                {status === "all" ? "All Sessions" : status}
              </Button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Sessions List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {sortedSessions.length > 0 ? (
          <SessionList 
            sessions={sortedSessions} 
            dogs={dogs}
            programs={programs}
            onSessionClick={handleSessionClick} 
          />
        ) : sessions.length === 0 ? (
          <Empty
            title="No training sessions scheduled"
            message="Start organizing your training schedule by creating sessions for your dogs and programs. Track progress and maintain consistent training routines."
            actionLabel="Schedule First Session"
            onAction={() => toast.info("Schedule session functionality would open here")}
            icon="Calendar"
          />
        ) : (
          <Empty
            title="No sessions match your criteria"
            message={`No sessions found matching your current search and filter settings.`}
            actionLabel="Clear Filters"
            onAction={() => {
              setSearchTerm("");
              setFilterStatus("all");
            }}
            icon="Search"
          />
        )}
      </motion.div>
    </div>
  );
};

export default SessionsPage;