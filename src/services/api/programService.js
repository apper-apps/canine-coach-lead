import programsData from "@/services/mockData/programs.json";

class ProgramService {
  constructor() {
    this.programs = [...programsData];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 280));
    return [...this.programs];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const program = this.programs.find(p => p.Id === parseInt(id));
    if (!program) {
      throw new Error("Program not found");
    }
    return { ...program };
  }

  async create(programData) {
    await new Promise(resolve => setTimeout(resolve, 420));
    
    const newId = Math.max(...this.programs.map(p => p.Id)) + 1;
    const newProgram = {
      ...programData,
      Id: newId,
      createdAt: new Date().toISOString()
    };
    
    this.programs.push(newProgram);
    return { ...newProgram };
  }

  async update(id, programData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    
    const index = this.programs.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Program not found");
    }
    
    this.programs[index] = {
      ...this.programs[index],
      ...programData,
      Id: parseInt(id)
    };
    
    return { ...this.programs[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const index = this.programs.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Program not found");
    }
    
    this.programs.splice(index, 1);
    return { success: true };
  }
}

export const programService = new ProgramService();