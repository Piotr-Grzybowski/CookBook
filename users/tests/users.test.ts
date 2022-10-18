import request from "supertest";
import app from "../../app";
import usersService from "../services/users.service";

jest.mock("../../users/services/users.service.ts", () => {
  return {
    createUser: jest.fn().mockReturnValue({
      _id: "123",
      email: "email",
    }),
    getUserByEmailWithPassword: jest.fn().mockImplementation(() => {
      return null;
    }),
  };
});

describe("Testing users module", () => {
  test("should be able to create user when data is valid", async () => {
    const response = await request(app).post("/users/register").send({
      email: "email@email.com",
      password: "123445",
    });
    expect(response.statusCode).toBe(201);
  });
});
