import dogsData from "@/services/mockData/dogs.json";

class DogService {
  constructor() {
    this.dogs = [...dogsData];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.dogs];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const dog = this.dogs.find(d => d.Id === parseInt(id));
    if (!dog) {
      throw new Error("Dog not found");
    }
    return { ...dog };
  }

  async create(dogData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const newId = Math.max(...this.dogs.map(d => d.Id)) + 1;
    const newDog = {
      ...dogData,
      Id: newId,
      createdAt: new Date().toISOString()
    };
    
    this.dogs.push(newDog);
    return { ...newDog };
  }

  async update(id, dogData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    
    const index = this.dogs.findIndex(d => d.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Dog not found");
    }
    
    this.dogs[index] = {
      ...this.dogs[index],
      ...dogData,
      Id: parseInt(id)
    };
    
    return { ...this.dogs[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const index = this.dogs.findIndex(d => d.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Dog not found");
    }
    
    this.dogs.splice(index, 1);
    return { success: true };
  }
}

export const dogService = new DogService();