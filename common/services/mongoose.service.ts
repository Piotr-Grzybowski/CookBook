import mongoose from "mongoose";
import debug from "debug";

const log: debug.IDebugger = debug("app:mongoose-service");

class MongooseService {
  constructor() {
    this.connectOrRetry();
  }

  getMongoose() {
    return mongoose;
  }

  uri =
    process.env.NODE_ENV === "testing"
      ? "mongodb://localhost:27017/test"
      : "mongodb://localhost:27017/cook-book";

  connectOrRetry() {
    mongoose
      .connect(this.uri)
      .then(() => {
        log("MongoDB is connected");
      })
      .catch((err) => {
        const retrySeconds = 5;
        log(`MongoDB couldn't connect ( will retry in ${retrySeconds})`);
        setTimeout(this.connectOrRetry, retrySeconds * 1000);
      });
  }
}

export default new MongooseService();
