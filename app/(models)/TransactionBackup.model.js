import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const TransactionBackupSchema = new Schema(
    {
        transactionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction'
        },
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

const Transaction_Backup = mongoose.models.Transaction_Backup || mongoose.model("Transaction_Backup", TransactionBackupSchema);
export default Transaction_Backup;