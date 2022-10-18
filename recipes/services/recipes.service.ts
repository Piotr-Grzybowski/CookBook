import RecipeDao from "../dao/recipes.dao";
import { CreateRecipeDto } from "../dto/create.recipe.dto";
import { PutRecipeDto } from "../dto/put.recipe.dto";
import { listOptions } from "../types/listOptions";

class RecipesService {
  async list(listOptions: listOptions) {
    return RecipeDao.getRecipes(listOptions);
  }
  async create(recipeData: CreateRecipeDto, userId: string) {
    return await RecipeDao.addRecipe(recipeData, userId);
  }
  async readById(id: string) {
    return await RecipeDao.getRecipeById(id);
  }
  async updateById(id: string, recipeData: PutRecipeDto) {
    return await RecipeDao.updateRecipeById(id, recipeData);
  }
  async deleteById(id: string) {
    return await RecipeDao.deleteRecipeById(id);
  }
}

export default new RecipesService();
