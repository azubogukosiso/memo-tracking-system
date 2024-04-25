import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI_LOCAL);
mongoose.Promise = global.Promise;

const responseSchema = new Schema(
    {
        request_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Request'
        },
        response: String,
        receipient: String,
        dateSent: {
            type: Date,
            default: Date.now
        },
        memoTN: String,
    },
    {
        timestamps: true,
    }
);

const Response = mongoose.models.Response || mongoose.model("Response", responseSchema);
export default Response;