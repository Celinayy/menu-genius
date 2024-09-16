import { prisma } from "@/server/db/db.client";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import { boolean, nullable } from "zod";
import slugify from "slugify";
import { taintUniqueValue } from "next/dist/server/app-render/rsc/taint";
import moment from "moment";

export const seed = async () => {
  console.log("[SEEDER] Starting seed...");

  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "user@test.com",
      password: await bcrypt.hash("password", 10),
    },
  });

  const desks = await prisma.desk.createManyAndReturn({
    data: Array.from(
      {
        length: faker.number.int({ min: 9, max: 21 }),
      },
      () => ({
        capacity: faker.number.int({
          min: 1,
          max: 10,
        }),
        name: faker.animal.dog(),
      })
    ),
  });

  const reservations = await prisma.reservation.createManyAndReturn({
    data: desks.flatMap((desk) =>
      Array.from(
        {
          length: faker.number.int({
            min: 1,
            max: 5,
          }),
        },
        (_, index) => {
          const checkInDate = moment()
            .set("hours", 18)
            .startOf("hours")
            .add(index, "day")
            .toDate();

          const checkOutDate = moment(checkInDate)
            .add(
              faker.number.int({
                min: 1,
                max: 6,
              }),
              "hours"
            )
            .toDate();

          return {
            userId: user.id,
            name: user.name,
            phone: user.phone ?? faker.phone.number(),
            deskId: desk.id,
            numberOfGuests: faker.number.int({
              min: 1,
              max: desk.capacity,
            }),
            comment: faker.lorem.sentence({
              min: 4,
              max: 10,
            }),
            checkInDate,
            checkOutDate,
          };
        }
      )
    ),
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

  const products = await prisma.$transaction(
    faker.helpers
      .uniqueArray(
        faker.food.dish,
        faker.number.int({
          min: 12,
          max: 24,
        })
      )
      .map((foodName) =>
        prisma.product.create({
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
        })
      )
  );

  const cart = await prisma.cart.create({
    data: {
      userId: user.id,
    },
  });

  const cartItems = await prisma.cartItem.createManyAndReturn({
    data: faker.helpers
      .arrayElements(products, {
        min: 3,
        max: 5,
      })
      .map((product) => ({
        productId: product.id,
        cartId: cart.id,
      })),
  });
};

console.log("[SEEDER] Seeding successfully finished!");

seed();
