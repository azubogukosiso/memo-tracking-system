import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
    {
        fullname: String,
        email: String,
        picture: String,
        password: {
            type: String,
            default: null
        },
        role: String,
        office: String,
        staffID: String,
        isApproved: {
            type: Boolean,
            default: false
        },
        isCreatorAdmin: Boolean
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;