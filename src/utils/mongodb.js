import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB already connect");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology:true,
    });
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};
