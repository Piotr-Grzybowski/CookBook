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
      ingredients: [String],
      preparationSteps: [String],
      userId: { type: String, immutable: true, required: true },
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

  async getRecipes(limit = 20, page = 0) {
    return await this.Recipe.find()
      .sort({ name: "asc" })
      .limit(limit)
      .skip(limit * page)
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
