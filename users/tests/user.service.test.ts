import mongooseService from "../../common/services/mongoose.service";
import usersService from "../services/users.service";

afterAll(async () => {
  await mongooseService.getMongoose().connection.dropDatabase();
  await mongooseService.getMongoose().disconnect();
});

describe("Testing recipe DAO", () => {
  let idOfUser, idOfUser2;
  const user = {
    name: "Henry Ford",
    email: "invented@modern.cars",
    password: "Carl Benz and his Mercedes",
    permissionLevel: 1,
  };
  const user2 = {
    name: "Henry Cavill",
    email: "iam@the.witcher",
    password: "toss a coin to your witcher",
    permissionLevel: 1,
  };

  test("user should be able to add user to database and retrieve it without password field", async () => {
    idOfUser = await usersService.createUser(user);
    const userFromDB = await usersService.readByIdWithoutPassword(idOfUser);

    expect(userFromDB.name).toBe(user.name);
    expect(userFromDB.email).toBe(user.email);
    expect(userFromDB.password).not.toBeDefined();
  });

  test("user should be able to retrieve user with given email address with password field", async () => {
    idOfUser2 = await usersService.createUser(user2);
    const userFromDB = await usersService.getUserByEmailWithPassword(
      user2.email
    );

    expect(userFromDB.email).toBe(user2.email);
    expect(userFromDB.password).toBeDefined();
  });
});
