import mongooseService from "../../common/services/mongoose.service";
import recipesService from "../services/recipes.service";

afterAll(async () => {
  await mongooseService.getMongoose().connection.dropDatabase();
  await mongooseService.getMongoose().disconnect();
});

describe("Testing recipe Service", () => {
  let id1, id2, id3;
  const recipe1 = {
    description: "Lorem ipsum dolor",
    name: "Baguette",
    ingredients: ["½ baguette", "2 romaine lettuce hearts"],
    preparationSteps: [
      "Preheat the oven to 180°C/350°F. For the bread chips, cut the.",
    ],
  };
  const recipe2 = {
    description: "Lorem ipsum dolor",
    name: "Garlic bread",
    ingredients: ["½ baguette", "2 romaine lettuce hearts"],
    preparationSteps: [
      "Preheat the oven to 180°C/350°F. For the bread chips, cut the baguette into thin slices and distribute on a lined baking tray.",
    ],
  };
  const recipe3 = {
    description: "Lorem ipsum dolor",
    name: "Pies with banana",
    ingredients: ["½ baguette", "2 romaine lettuce hearts"],
    preparationSteps: [
      "Preheat the oven to 180°C/350°F. For the bread chips, cut the baguette into thin slices and distribute on a lined baking tray   0°C/350°F. For the",
    ],
  };
  test("user should be able to list recipes and add new one", async () => {
    const recipeWithId1 = await recipesService.create(recipe1, "111");
    const recipeWithId2 = await recipesService.create(recipe2, "111");
    const recipeWithId3 = await recipesService.create(recipe3, "111");
    id1 = recipeWithId1._id;
    id2 = recipeWithId2._id;
    id3 = recipeWithId3._id;
    const recipes = await recipesService.list({});

    expect(recipes.length).toBe(3);
    expect(recipes[0].name).toEqual(recipe1.name);
    expect(recipes[0].ingredients).toEqual(recipe1.ingredients);
    expect(recipes[0].description).toEqual(recipe1.description);
    expect(recipes[0].preparationSteps).toEqual(recipe1.preparationSteps);
    expect(recipes[1].name).toEqual(recipe2.name);
    expect(recipes[1].ingredients).toEqual(recipe2.ingredients);
    expect(recipes[1].description).toEqual(recipe2.description);
    expect(recipes[1].preparationSteps).toEqual(recipe2.preparationSteps);
    expect(recipes[2].name).toEqual(recipe3.name);
    expect(recipes[2].ingredients).toEqual(recipe3.ingredients);
    expect(recipes[2].description).toEqual(recipe3.description);
    expect(recipes[2].preparationSteps).toEqual(recipe3.preparationSteps);
  });
  test("user should be able to get recipe with given id", async () => {
    const recipe = await recipesService.readById(id1);
    expect(recipe.name).toEqual(recipe1.name);
    expect(recipe.description).toEqual(recipe1.description);
    expect(recipe._id).toEqual(id1);
  });
  test("user should be able to update recipe with given id", async () => {
    const recipe = await recipesService.readById(id2);
    expect(recipe.name).toEqual(recipe2.name);
    await recipesService.updateById(id2, {
      name: "Chicken soup",
    });
    const updatedRecipe = await recipesService.readById(id2);
    expect(updatedRecipe.name).toBe("Chicken soup");
    expect(updatedRecipe.description).toBe(recipe2.description);
  });
  test("list of recipes should be ordered ascending by name and pagination should work", async () => {
    const howManyOnPage = 1;
    const pageNumber = 2;
    const recipes = await recipesService.list({
      limit: 1,
      page: 2,
    });
    expect(recipes.length).toBe(1);
    expect(recipes[0]._id).toBe(id2);
  });
  test("user should be able to look for partial name of recipe", async () => {
    const searchedRecipe = await recipesService.list({
      phrase: "s wi",
    });
    expect(searchedRecipe.length).toBe(1);
    expect(searchedRecipe[0].name).toBe(recipe3.name);
  });
  test("user should be able to delete recipe with given id", async () => {
    const recipeToDelete = await recipesService.deleteById(id3);
    const recipeThatWasDeleted = await recipesService.readById(id3);
    expect(recipeThatWasDeleted).toBe(null);
  });
});
