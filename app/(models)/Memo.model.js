import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const memoSchema = new Schema(
    {
        title: String,
        description: String,
        image: {
            type: Array,
            default: null
        },
        memoTrackingNum: String,
        resent: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true,
    }
);

const Memo = mongoose.models.Memo || mongoose.model("Memo", memoSchema);
export default Memo;