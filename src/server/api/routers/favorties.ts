// src/server/api/routers/favorites.ts

import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const favoritesRouter = createTRPCRouter({
  toggleMealPlanFavorite: protectedProcedure
    .input(z.string()) // mealPlanId
    .mutation(async ({ ctx, input: mealPlanId }) => {
      // Try to delete existing favorite
      try {
        await ctx.db.userFavoriteMealPlan.delete({
          where: {
            userId_mealPlanId: {
              userId: ctx.session.user.id,
              mealPlanId: mealPlanId,
            },
          },
        });
        return { favorited: false, mealPlanId };
      } catch {
        // If delete fails (doesn't exist), create new favorite
        await ctx.db.userFavoriteMealPlan.create({
          data: {
            userId: ctx.session.user.id,
            mealPlanId: mealPlanId,
          },
        });
        return { favorited: true, mealPlanId };
      }
    }),

  toggleMealFavorite: protectedProcedure
    .input(z.string()) // mealId
    .mutation(async ({ ctx, input: mealId }) => {
      // Try to delete existing favorite
      try {
        await ctx.db.userFavoriteMeal.delete({
          where: {
            userId_mealId: {
              userId: ctx.session.user.id,
              mealId: mealId,
            },
          },
        });
        return { favorited: false, mealId };
      } catch {
        // If delete fails (doesn't exist), create new favorite
        await ctx.db.userFavoriteMeal.create({
          data: {
            userId: ctx.session.user.id,
            mealId: mealId,
          },
        });
        return { favorited: true, mealId };
      }
    }),

  toggleRecipeFavorite: protectedProcedure
    .input(z.string()) // recipeId
    .mutation(async ({ ctx, input: recipeId }) => {
      // Try to delete existing favorite
      try {
        await ctx.db.userFavoriteRecipe.delete({
          where: {
            userId_recipeId: {
              userId: ctx.session.user.id,
              recipeId: recipeId,
            },
          },
        });
        return { favorited: false, recipeId };
      } catch {
        // If delete fails (doesn't exist), create new favorite
        await ctx.db.userFavoriteRecipe.create({
          data: {
            userId: ctx.session.user.id,
            recipeId: recipeId,
          },
        });
        return { favorited: true, recipeId };
      }
    }),
  isMealPlanFavorited: protectedProcedure
    .input(z.string()) // mealPlanId
    .query(async ({ ctx, input: mealPlanId }) => {
      const favorite = await ctx.db.userFavoriteMealPlan.findFirst({
        where: {
          userId: ctx.session.user.id,
          mealPlanId: mealPlanId,
        },
      });
      return !!favorite;
    }),

  getFavoriteMealPlanIds: protectedProcedure.query(async ({ ctx }) => {
    const mealPlans = await ctx.db.userFavoriteMealPlan.findMany({
      where: { userId: ctx.session.user.id },
      select: { mealPlanId: true },
    });

    return mealPlans.map((f) => f.mealPlanId);
  }),
  getFavoriteMealIds: protectedProcedure.query(async ({ ctx }) => {
    const meals = await ctx.db.userFavoriteMeal.findMany({
      where: { userId: ctx.session.user.id },
      select: { mealId: true },
    });

    return meals.map((f) => f.mealId);
  }),

  getFavoriteRecipeIds: protectedProcedure.query(async ({ ctx }) => {
    const favorites = await ctx.db.userFavoriteRecipe.findMany({
      where: { userId: ctx.session.user.id },
      select: { recipeId: true },
    });

    return favorites.map((f) => f.recipeId);
  }),

  getFavoriteMealPlans: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.userFavoriteMealPlan.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        mealPlan: {
          include: {
            meals: true,
          },
        },
      },
      orderBy: {
        favoritedAt: "desc",
      },
    });
  }),

  getFavoriteMeals: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.userFavoriteMeal.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        meal: true,
      },
      orderBy: {
        favoritedAt: "desc",
      },
    });
  }),

  getFavoriteRecipes: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.userFavoriteRecipe.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        recipe: true,
      },
      orderBy: {
        favoritedAt: "desc",
      },
    });
  }),
});
