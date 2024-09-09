import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";

const t = initTRPC.context<{ accessToken: string | null }>().create({
  transformer: SuperJSON,
});

export const router = t.router;
export const procedure = t.procedure;
