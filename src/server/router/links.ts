import { createRouter } from "./context";
import { number, z } from "zod";

export const linksRouter = createRouter()
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
					slug: input.slug.replace(/\s/g, ''),
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
	.mutation("delete", {
		input: z
		.object({
			id: z.number().int()
		}),
		async resolve({ctx, input}) {
			await ctx.prisma.shortLink.delete({
				where: {
					id: input.id
				}
			})
		}
	})

