import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI_LOCAL);
mongoose.Promise = global.Promise;

const memoSchema = new Schema(
    {
        title: String,
        description: String,
        sender: String,
        receipient: String,
        dateSent: {
            type: Date,
            default: Date.now
        },
        dateConfirmed: {
            type: Date,
            default: null
        },
        memoTN: String,
        status: String,
        resent: {
            type: String,
            default: false
        },
    },
    {
        timestamps: true,
    }
);

const Memo = mongoose.models.Memo || mongoose.model("Memo", memoSchema);
export default Memo;