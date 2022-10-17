import { Request, Response, NextFunction } from "express";
import recipesService from "../../recipes/services/recipes.service";
import { PermissionFlag } from "./permissionFlag.enum";
import debug from "debug";

const log: debug.IDebugger = debug("app:middleware-permission");

export async function checkIfAuthorOrAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const recipe = await recipesService.readById(req.params.recipeId);

  if (recipe) {
    const authorOfTheRecipe = recipe.userId;
    const currentUserId = res.locals.jwt.userId;
    const currentPermissionLevel = res.locals.jwt.permissionLevel;
    log(authorOfTheRecipe, currentPermissionLevel, currentUserId, recipe);
    if (
      authorOfTheRecipe === currentUserId ||
      currentPermissionLevel === PermissionFlag.ADMIN_PERMISSION
    ) {
      return next();
    } else {
      return res.status(403).send();
    }
  } else {
    res.status(404).send();
  }
}
