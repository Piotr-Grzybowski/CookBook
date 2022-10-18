import app from "../../app";
import request from "supertest";

describe("Testing middleware to catch 404", () => {
  test("when api is requested for resource that does not exist it should respond with status code 404", async () => {
    const response = await request(app).get("/somethingIdontHAve");
    expect(response.statusCode).toBe(404);
  });
});
