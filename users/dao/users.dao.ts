import shortid from "shortid";
import { PermissionFlag } from "../../common/middleware/permissionFlag.enum";
import mongooseService from "../../common/services/mongoose.service";
import { CreateUserDto } from "../dto/createUser.dto";

class UsersDao {
  Schema = mongooseService.getMongoose().Schema;

  userSchema = new this.Schema(
    {
      _id: { immutable: true, type: String },
      email: { type: String, required: true },
      password: { type: String, select: false, required: true },
      name: String,
      permissionLevel: { type: Number, immutable: true },
    },
    { id: false }
  );

  User = mongooseService.getMongoose().model("Users", this.userSchema);

  async addUser(userFields: CreateUserDto) {
    const userId = shortid.generate();
    const user = new this.User({
      _id: userId,
      ...userFields,
      permissionLevel: PermissionFlag.USER_PERMISSION,
    });
    await user.save();
    return userId;
  }

  async getUserById(userId: string) {
    return this.User.findOne({ _id: userId }).populate("User").exec();
  }

  async getUserByEmailWithPassword(email: string) {
    return await this.User.findOne({ email: email })
      .select("_id email permissionLevel +password")
      .exec();
  }
}

export default new UsersDao();
