// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { linksRouter } from "./links";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("links.", linksRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
