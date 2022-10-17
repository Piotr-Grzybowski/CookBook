import { Request, Response } from "express";
import recipesService from "../services/recipes.service";

class RecipesController {
  async listRecipes(req: Request, res: Response) {
    try {
      const limit = req.query.limit || 20;
      const page = req.query.page || 0;
      const searchedPhrase = req.query.phrase || "";
      const recipes = await recipesService.list(
        Number(limit),
        Number(page),
        searchedPhrase.toString()
      );
      res.status(200).send(recipes);
    } catch (error) {
      res.status(500).send({ errors: "Something went wrong" });
    }
  }

  async getRecipeById(req: Request, res: Response) {
    try {
      const recipe = await recipesService.readById(req.params.recipeId);
      res.status(200).send(recipe);
    } catch (error) {
      res.status(500).send({ errors: "Something went wrong" });
    }
  }

  async createRecipe(req: Request, res: Response) {
    try {
      const userId = res.locals.jwt.userId;
      const recipe = await recipesService.create(req.body, userId);
      res.status(201).send(recipe);
    } catch (error) {
      res.status(500).send({ errors: "Something went wrong" });
    }
  }

  async updateRecipe(req: Request, res: Response) {
    try {
      await recipesService.updateById(req.params.recipeId, req.body);
      res.status(204).send();
    } catch (error) {
      res.status(500).send({ errors: "Something went wrong" });
    }
  }

  async deleteRecipe(req: Request, res: Response) {
    try {
      await recipesService.deleteById(req.params.recipeId);
      res.status(204).send();
    } catch (error) {
      res.status(500).send({ errors: "Something went wrong" });
    }
  }
}

export default new RecipesController();
