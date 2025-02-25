import { prisma } from "./Prisma";

export class Animal {
  async getAllAnimais() {
    return await prisma.animal.findMany();
  }

  async getAnimalById(idAnimal: string) {
    return await prisma.animal.findUnique({ where: { idAnimal } });
  }

  async createAnimal(data: any) {
    return await prisma.animal.create({ data });
  }

  async updateAnimal(idAnimal: string, data: any) {
    return await prisma.animal.update({
      where: { idAnimal },
      data,
    });
  }

  async deleteAnimal(idAnimal: string) {
    return await prisma.animal.delete({ where: { idAnimal } });
  }
}
