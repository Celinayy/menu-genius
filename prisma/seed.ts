import { prisma } from "@/server/db/db.client";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import { boolean } from "zod";
import slugify from "slugify";

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
    const foodName = faker.food.dish();

    const product = await prisma.product.create({
      data: {
        name: foodName,
        price: faker.number.int({
          min: 5,
          max: 100,
        }),
        isFood: faker.datatype.boolean(),
        image: {
          create: {
            name: `${slugify(foodName)}.svg`,
            data: faker.image.dataUri({ height: 256, width: 256 }),
            height: 256,
            width: 256,
          },
        },
      },
    });
  }
};

console.log("[SEEDER] Seeding successfully finished!");

seed();
