import app from "./app";
import mongoose from "mongoose";
import "dotenv/config";
import config from "./app/config";

async function main() {
  try {
    await mongoose.connect(config.dataBaseUrl as string);

    app.listen(config.port, () => {
      console.log(`StorySync Server Is Running On Port => ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
