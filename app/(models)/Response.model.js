import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const responseSchema = new Schema(
    {
        request_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Request'
        },
        response: String,
        receipient: String,
        receipientEmail: String,
        dateSent: {
            type: Date,
            default: Date.now
        },
        memoTrackingNum: String,
    },
    {
        timestamps: true,
    }
);

const Response = mongoose.models.Response || mongoose.model("Response", responseSchema);
export default Response;