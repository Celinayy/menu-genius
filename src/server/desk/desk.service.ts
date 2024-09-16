import { prisma } from "../db/db.client";
import { FindFreeDeskPayloadType } from "./desk.schema";

export class DeskService {
  public async findFree({ from, to, capacity }: FindFreeDeskPayloadType) {
    return await prisma.desk.findFirst({
      where: {
        capacity: {
          gte: capacity,
        },
        reservations: {
          every: {
            OR: [
              {
                checkOutDate: {
                  lte: from,
                },
              },
              {
                checkInDate: {
                  gte: to,
                },
              },
            ],
          },
        },
      },
      orderBy: {
        capacity: "asc",
      },
    });
  }
}
