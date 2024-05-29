import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const requestSchema = new Schema(
    {
        title: String,
        description: String,
        sender: String,
        dateSent: {
            type: Date,
            default: Date.now
        },
        memoTrackingNum: String,
        status: String,
    },
    {
        timestamps: true,
    }
);

const Request = mongoose.models.Request || mongoose.model("Request", requestSchema);
export default Request;