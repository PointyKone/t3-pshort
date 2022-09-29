import { createRouter } from "./context";
import { z } from "zod";

export const linksRouter = createRouter()
  // .query("hello", {
  //   input: z
  //     .object({
  //       text: z.string().nullish(),
  //     })
  //     .nullish(),
  //   resolve({ input }) {
  //     return {
  //       greeting: `Hello ${input?.text ?? "world"}`,
  //     };
  //   },
  // })
  .query("getAll", {
    async resolve({ ctx }) {
      const links = ctx.prisma.shortLink.findMany({})
      return links
    },
  })
  .mutation("create", {
    input: z
    .object({
      url: z.string().url().min(1).max(2000),
      slug: z.string().min(1).max(20),
    }),
    async resolve({ctx, input}) {
      const link = await ctx.prisma.shortLink.create({
        data: {
          slug: input.slug,
          url: input.url
        }
      })
      if (link) {
        return link
      } else {
        return 400
      }
    }

  })
