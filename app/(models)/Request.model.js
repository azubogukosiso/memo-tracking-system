import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const requestSchema = new Schema(
    {
        details: String,
        sender: String,
        senderEmail: String,
        transactionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction'
        },
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