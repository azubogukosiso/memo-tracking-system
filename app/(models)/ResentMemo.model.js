import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI_LOCAL);
mongoose.Promise = global.Promise;

const ResentMemoSchema = new Schema(
    {
        originalMemo_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Memo'
        },
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
        status: String,
        memoTN: String,
    },
    {
        timestamps: true,
    }
);

const ResentMemo = mongoose.models.Resent_Memo || mongoose.model("Resent_Memo", ResentMemoSchema);
export default ResentMemo;