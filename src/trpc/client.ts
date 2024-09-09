import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { AppRouter } from "@/server/app/app.router";
import { SuperJSON } from "superjson";
export const trpc = createTRPCNext<AppRouter>({
  overrides: {
    useMutation: {
      onSuccess: async (opts) => {
        await opts.originalFn();
        await opts.queryClient.invalidateQueries();
      },
    },
  },
  config: () => ({
    transformer: SuperJSON,
    links: [
      httpBatchLink({
        url: `/api/trpc`,
        headers: () => {
          const accessToken = localStorage.getItem("accessToken");
          return {
            Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
          };
        },
      }),
    ],
  }),
  ssr: false,
});
