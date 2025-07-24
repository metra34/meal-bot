import { z } from "zod";
import { MEAL_GENERATOR_FORM_SCHEMA } from "~/lib/constants/meals";

import {
  createTRPCRouter,
  protectedProcedure
} from "~/server/api/trpc";

export const mealsRouter = createTRPCRouter({

  create: protectedProcedure
    .input(MEAL_GENERATOR_FORM_SCHEMA)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });

    return post ?? null;
  }),
});
