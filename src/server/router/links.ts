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
	.mutation("update", {
		input: z
		.object({
			id: z.number().int().min(1),
			url: z.string().url().min(1).max(2000),
			slug: z.string().min(1).max(20),
		}),
		async resolve({ctx, input}) {

			await ctx.prisma.shortLink.findFirst({
				where: {
					id: input.id
				}
			}).then(async link => {
				if (input.slug.replace(/\s/g, '') === link?.slug) {
					if (input.url === link.url) return null;
					const newLink = await ctx.prisma.shortLink.update({
							where: {
								id: input.id
							},
							data: {
								url: input.url
							}
						})
					return newLink
				} else if (input.url === link?.url) {
					if (input.slug.replace(/\s/g, '') === link?.slug) return null;
					const newLink = await ctx.prisma.shortLink.update({
						where: {
							id: input.id
						},
						data: {
							slug: input.slug.replace(/\s/g, '')
						}
					})
					return newLink
				} else {
					const newLink = await ctx.prisma.shortLink.update({
						where: {
							id: input.id
						},
						data: {
							slug: input.slug.replace(/\s/g, ''),
							url: input.url
						}
					})
					return newLink
				}
			})
		}
	})

