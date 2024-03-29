import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        let connect = await mongoose.connect(process.env.PORT||"mongodb://0.0.0.0:27017/coursesDB")
        console.log("mongo db connected")
    }
    catch (err) {
        console.log(err);
        console.log("cannot connect to db");
        process.exit(1)
    }
}
