import app from "../../app";
import request from "supertest";
import recipesService from "../services/recipes.service";
import { checkIfTokenIsValid } from "../../auth/middleware/auth.middleware";

jest.mock("../../auth/middleware/auth.middleware.ts", () => ({
  ...jest.requireActual("../../auth/middleware/auth.middleware.ts"),
  checkIfTokenIsValid: jest.fn((req, res, next) => {
    res.locals.jwt = {
      userId: "111",
      permissionLevel: 1,
    };
    next();
  }),
}));

afterAll(() => {
  jest.clearAllMocks();
});

const recipe: any = {
  description: "Lorem ipsum dolor",
  name: "Baguette",
  ingredients: ["½ baguette", "2 romaine lettuce hearts"],
  preparationSteps: [
    "Preheat the oven to 180°C/350°F. For the bread chips, cut the.",
  ],
  imageUrl: "http://someImage.png",
  userId: "111",
};
const id = "111";

describe("Testing recipes module", () => {
  test("user should be able to add recipe when given data is valid and list it", async () => {
    const spyCreate = jest
      .spyOn(recipesService, "create")
      .mockResolvedValue(recipe);
    const listSpy = jest.spyOn(recipesService, "list").mockResolvedValue([]);
    const response = await request(app).post("/recipes").send(recipe);
    await request(app).get("/recipes");

    expect(listSpy).toBeCalledTimes(1);
    expect(response.statusCode).toBe(201);
    spyCreate.mockRestore();
    listSpy.mockRestore();
  });
  test("user should be able to edit recipe of his authorship", async () => {
    const spyRead = jest
      .spyOn(recipesService, "readById")
      .mockResolvedValue(recipe);
    const spyUpdate = jest
      .spyOn(recipesService, "updateById")
      .mockResolvedValue(recipe);
    const response = await request(app)
      .put("/recipes/" + id)
      .send(recipe);

    expect(response.statusCode).toBe(204);
    expect(spyUpdate).toBeCalledTimes(1);
    spyRead.mockRestore();
    spyUpdate.mockRestore();
  });
  test("user should be able to delete his recipe", async () => {
    const spyRead = jest
      .spyOn(recipesService, "readById")
      .mockResolvedValue(recipe);
    const spyDelete = jest
      .spyOn(recipesService, "deleteById")
      .mockResolvedValue(null);
    const response = await request(app).delete("/recipes/" + id);

    expect(response.statusCode).toBe(204);
    expect(spyDelete).toBeCalledTimes(1);
    spyRead.mockRestore();
    spyDelete.mockRestore();
  });
  test("user should be able to get recipe with given id", async () => {
    const spyRead = jest
      .spyOn(recipesService, "readById")
      .mockResolvedValue(recipe);

    const response = await request(app).get("/recipes/" + id);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(recipe);
    expect(spyRead).toBeCalledTimes(2);
    spyRead.mockRestore();
  });
  test("user should not be able to edit or delete recipe that is not his", async () => {
    const spyRead = jest
      .spyOn(recipesService, "readById")
      .mockResolvedValue({ ...recipe, userId: "1221" });
    const spyUpdate = jest
      .spyOn(recipesService, "updateById")
      .mockResolvedValue(recipe);
    const response = await request(app)
      .put("/recipes/" + id)
      .send(recipe);

    expect(response.statusCode).toBe(403);
    expect(spyUpdate).toBeCalledTimes(0);
    spyRead.mockRestore();
    spyUpdate.mockRestore();
  });
  test("admin should be able to edit or delete any recipe he wants", () => {});
  test("when there is no recipe with given id, user should get proper status code and message", async () => {
    const spyRead = jest
      .spyOn(recipesService, "readById")
      .mockResolvedValue(null);
    const response = await request(app)
      .put("/recipes/" + id)
      .send(recipe);

    expect(response.statusCode).toBe(404);
    spyRead.mockRestore();
  });
});
