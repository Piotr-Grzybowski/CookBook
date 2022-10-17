import { Request, Response, NextFunction } from "express";
import recipesService from "../services/recipes.service";

export async function validateIfRecipeExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const recipe = await recipesService.readById(req.params.recipeId);
  if (recipe) next();
  else {
    res
      .status(404)
      .json({ error: `Recipe with id ${req.params.recipeId} not found` });
  }
}
