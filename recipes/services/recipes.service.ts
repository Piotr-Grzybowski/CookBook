import RecipeDao from "../dao/recipes.dao";
import { CreateRecipeDto } from "../dto/create.recipe.dto";
import { PutRecipeDto } from "../dto/put.recipe.dto";

class RecipesService {
  async list(limit: number, page: number, phrase: string) {
    const amountOfRecordsPerPage = limit > 0 ? limit : 10;
    const pageNumber = page > 0 ? page : 1;
    return RecipeDao.getRecipes(amountOfRecordsPerPage, pageNumber, phrase);
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
