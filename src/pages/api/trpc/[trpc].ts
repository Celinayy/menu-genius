import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "@/server/app/app.router";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: ({ req }) => ({
    accessToken: req.headers.authorization?.replace("Bearer ", "") ?? null,
  }),
});
