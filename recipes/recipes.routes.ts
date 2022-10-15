import express from "express";

const recipesRouter = express.Router();

recipesRouter
  .route("/")
  .get((req: express.Request, res: express.Response) => {
    res.status(200).send(`List of recipes`);
  })
  .post((req: express.Request, res: express.Response) => {
    res.status(200).send(`Add new recipe`);
  });

recipesRouter
  .route("/:recipeId")
  .get((req: express.Request, res: express.Response) => {
    res.status(200).send(`get a recipe`);
  })
  .put((req: express.Request, res: express.Response) => {
    res.status(200).send(`change recipe`);
  })
  .delete((req: express.Request, res: express.Response) => {
    res.status(200).send(`remove recipe`);
  });

export default recipesRouter;
