import { Request, Response } from "express";
import recipesService from "../services/recipes.service";

class RecipesController {
  async listRecipes(req: Request, res: Response) {
    const limit = req.query.limit || 20;
    const page = req.query.page || 0;
    const recipes = await recipesService.list(Number(limit), Number(page));
    res.status(200).send(recipes);
  }

  async getRecipeById(req: Request, res: Response) {
    const recipe = await recipesService.readById(req.params.recipeId);
    res.status(200).send(recipe);
  }

  async createRecipe(req: Request, res: Response) {
    const userId = res.locals.jwt.userId;
    const recipe = await recipesService.create(req.body, userId);
    res.status(201).send(recipe);
  }

  async updateRecipe(req: Request, res: Response) {
    await recipesService.updateById(req.params.recipeId, req.body);
    res.status(204).send();
  }

  async deleteRecipe(req: Request, res: Response) {
    await recipesService.deleteById(req.params.recipeId);
    res.status(204).send();
  }
}

export default new RecipesController();
