import usersService from "../../users/services/users.service";
import request from "supertest";
import app from "../../app";

jest.mock("../../users/services/users.service.ts", () => {
  return {
    getUserByEmailWithPassword: jest.fn().mockImplementation(() => {
      return {
        name: "Henry Ford",
        email: "invented@modern.cars",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$n7vFXmbs4ZVR0zGh3fIuiA$74RsO2ICw1mfIwp+COJRlFTXH9uYl+0U7hxDk43BDsQ",
        permissionLevel: 1,
      };
    }),
  };
});

describe("Testing auth module", () => {
  let token;
  let refreshToken;
  test("should authorize user when credentials are valid", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "invented@modern.cars",
      password: "password",
    });
    token = response.body.accessToken;
    refreshToken = response.body.refreshToken;

    expect(response.statusCode).toBe(201);
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();
  });
  test("should inform user with proper message and status when credentials not valid", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "invented@modern.cars",
      password: "password not valid",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.errors).toStrictEqual([
      "Invalid email and/or password",
    ]);
  });
  test("should return proper errors when email not email", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "that is no Email",
      password: "pass",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.errors[0].param).toEqual("email");
    expect(response.body.errors[0].msg).toEqual("Invalid value");
  });
  test("should refresh token when both token and refresh token valid", async () => {
    const response = await request(app)
      .post("/auth/refresh-token")
      .send({
        refreshToken: refreshToken,
      })
      .set("Authorization", "Bearer " + token);

    expect(response.statusCode).toBe(201);
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();
  });
  test("should respond with proper message when refresh token invalid", async () => {
    const response = await request(app)
      .post("/auth/refresh-token")
      .send({
        refreshToken: "asdasdawad1wd1wd1dw1dw1dwd1",
      })
      .set("Authorization", "Bearer " + token);

    expect(response.statusCode).toBe(400);
    expect(response.body.errors).toStrictEqual(["Invalid refresh token"]);
  });
  test("should respond with proper message when access token invalid", async () => {
    const response = await request(app)
      .post("/auth/refresh-token")
      .send({
        refreshToken: refreshToken,
      })
      .set("Authorization", "Bearer " + "asdasda");

    expect(response.statusCode).toBe(403);
    expect(response.body.errors).toBe("Non Authorized");
  });
});
