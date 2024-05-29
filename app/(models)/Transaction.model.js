import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const TransactionSchema = new Schema(
    {
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
        memoTrackingNum: String,
        type: {
            type: String,
            default: "original"
        },
    },
    {
        timestamps: true,
    }
);

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
export default Transaction;