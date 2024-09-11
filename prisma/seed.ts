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

  const ingredients = await prisma.ingredient.createManyAndReturn({
    data: faker.helpers
      .uniqueArray(
        faker.food.ingredient,
        faker.number.int({
          min: 20,
          max: 40,
        })
      )
      .map((ingredientName) => ({
        name: ingredientName,
      })),
  });

  const allergens = await prisma.allergen.createManyAndReturn({
    data: faker.helpers
      .uniqueArray(
        faker.food.spice,
        faker.number.int({
          min: 20,
          max: 40,
        })
      )
      .map((allergenName) => ({
        name: allergenName,
      })),
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
        description: faker.food.description(),
        image: {
          create: {
            name: `${slugify(foodName)}.svg`,
            data: faker.image.dataUri({ height: 256, width: 256 }),
            height: 256,
            width: 256,
          },
        },
        allergens: {
          connect: faker.helpers
            .arrayElements(allergens, {
              min: 1,
              max: 5,
            })
            .map((allergen) => ({
              id: allergen.id,
            })),
        },
        ingredients: {
          connect: faker.helpers
            .arrayElements(ingredients, {
              min: 1,
              max: 5,
            })
            .map((ingredient) => ({
              id: ingredient.id,
            })),
        },
        favorites: {},
      },
    });
  }
};

console.log("[SEEDER] Seeding successfully finished!");

seed();
