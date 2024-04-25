import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI_LOCAL);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
    {
        username: String,
        email: String,
        password: String,
        role: String,
        office: String
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;