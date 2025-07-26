import sessionsData from "@/services/mockData/sessions.json";

class SessionService {
  constructor() {
    this.sessions = [...sessionsData];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 320));
    return [...this.sessions];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const session = this.sessions.find(s => s.Id === parseInt(id));
    if (!session) {
      throw new Error("Session not found");
    }
    return { ...session };
  }

  async create(sessionData) {
    await new Promise(resolve => setTimeout(resolve, 380));
    
    const newId = Math.max(...this.sessions.map(s => s.Id)) + 1;
    const newSession = {
      ...sessionData,
      Id: newId,
      createdAt: new Date().toISOString()
    };
    
    this.sessions.push(newSession);
    return { ...newSession };
  }

  async update(id, sessionData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.sessions.findIndex(s => s.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Session not found");
    }
    
    this.sessions[index] = {
      ...this.sessions[index],
      ...sessionData,
      Id: parseInt(id)
    };
    
    return { ...this.sessions[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const index = this.sessions.findIndex(s => s.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Session not found");
    }
    
    this.sessions.splice(index, 1);
    return { success: true };
  }

  async getByDogId(dogId) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return this.sessions.filter(s => s.dogId === parseInt(dogId));
  }

  async getByProgramId(programId) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return this.sessions.filter(s => s.programId === parseInt(programId));
  }
}

export const sessionService = new SessionService();