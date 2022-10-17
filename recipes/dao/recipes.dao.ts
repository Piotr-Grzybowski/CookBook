import shortid from "shortid";
import mongooseService from "../../common/services/mongoose.service";
import { CreateRecipeDto } from "../dto/create.recipe.dto";
import { PutRecipeDto } from "../dto/put.recipe.dto";

class RecipeDao {
  Schema = mongooseService.getMongoose().Schema;

  recipeSchema = new this.Schema(
    {
      _id: { type: String, immutable: true, required: true },
      description: { type: String, required: true },
      name: { type: String, required: true },
      ingredients: { type: [String], required: true },
      preparationSteps: { type: [String], required: true },
      userId: { type: String, immutable: true, required: true },
      imageUrl: String,
    },
    { id: false }
  );

  Recipe = mongooseService.getMongoose().model("Recipes", this.recipeSchema);

  async addRecipe(recipeData: CreateRecipeDto, userId: string) {
    const recipeId = shortid.generate();
    const recipe = new this.Recipe({
      _id: recipeId,
      ...recipeData,
      userId: userId,
    });
    await recipe.save();
    return recipe;
  }

  async getRecipeById(recipeId: string) {
    return await this.Recipe.findById(recipeId);
  }

  async getRecipes(limit = 100, page = 1, phrase: string) {
    const searchCriteria =
      phrase.length > 3 ? { name: new RegExp(phrase, "i") } : {};
    return await this.Recipe.find(searchCriteria)
      .sort({ name: "asc" })
      .limit(limit)
      .skip(limit * (page - 1))
      .exec();
  }

  async updateRecipeById(recipeId: string, recipeData: PutRecipeDto) {
    const existingRecipe = await this.Recipe.findOneAndUpdate(
      { _id: recipeId },
      { $set: recipeData },
      { new: true }
    ).exec();
    return existingRecipe;
  }

  async deleteRecipeById(recipeId: string) {
    return this.Recipe.deleteOne({ _id: recipeId }).exec();
  }
}

export default new RecipeDao();
