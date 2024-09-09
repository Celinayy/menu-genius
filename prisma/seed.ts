import { prisma } from "@/server/db/db.client";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import { boolean } from "zod";

export const seed = async () => {
  console.log("[SEEDER] Starting seed...");

  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "user@test.com",
      password: await bcrypt.hash("password", 10),
    },
  });

  for (let i = 0; i < 24; i++) {
    const product = await prisma.product.create({
      data: {
        name: faker.food.dish(),
        price: faker.number.int({
          min: -100,
          max: 100,
        }),
        isFood: faker.datatype.boolean(),
      },
    });
  }
};

console.log("[SEEDER] Seeding successfully finished!");

seed();
