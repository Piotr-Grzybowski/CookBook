import express from "express";
import recipesController from "./controllers/recipes.controller";
import { checkIfRecipeExist } from "./middleware/recipe.middleware";
import { validateBody } from "../common/middleware/body.validator.middleware";
import { body, check } from "express-validator";
import { checkIfTokenIsValid } from "../auth/middleware/auth.middleware";
import { checkIfAuthorOrAdmin } from "../common/middleware/permission.middleware";

const recipesRouter = express.Router();

recipesRouter
  .route("/")
  .get(recipesController.listRecipes)
  .post(
    body("description")
      .isString()
      .isLength({ min: 10, max: 500 })
      .trim()
      .escape(),
    body("name").isString().not().isEmpty().trim().escape(),
    body("ingredients").isArray(),
    body("preparationSteps").isArray(),
    body("imageUrl").isURL(),
    check("ingredients.*").isString().not().isEmpty().trim().escape(),
    check("preparationSteps.*").isString().not().isEmpty().trim().escape(),
    validateBody,
    checkIfTokenIsValid,
    recipesController.createRecipe
  );

recipesRouter
  .route("/:recipeId")
  .all(checkIfRecipeExist)
  .get(recipesController.getRecipeById)
  .put(
    body("description")
      .isString()
      .isLength({ min: 10, max: 500 })
      .trim()
      .escape(),
    body("name").isString().not().isEmpty().trim().escape(),
    body("ingredients").isArray(),
    body("preparationSteps").isArray(),
    body("imageUrl").isURL(),
    check("ingredients.*").isString().not().isEmpty().trim().escape(),
    check("preparationSteps.*").isString().not().isEmpty().trim().escape(),
    validateBody,
    checkIfTokenIsValid,
    checkIfAuthorOrAdmin,
    recipesController.updateRecipe
  )
  .delete(
    checkIfTokenIsValid,
    checkIfAuthorOrAdmin,
    recipesController.deleteRecipe
  );

export default recipesRouter;
