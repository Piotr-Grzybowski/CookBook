import usersDao from "../dao/users.dao";
import { CreateUserDto } from "../dto/createUser.dto";

class UsersService {
  async createUser(userData: CreateUserDto) {
    return await usersDao.addUser(userData);
  }

  async readByIdWithoutPassword(id: string) {
    return await usersDao.getUserById(id);
  }

  async getUserByEmailWithPassword(email: string) {
    return await usersDao.getUserByEmailWithPassword(email);
  }
}

export default new UsersService();
