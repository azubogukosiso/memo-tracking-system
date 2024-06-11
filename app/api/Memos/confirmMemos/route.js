import Transaction from "@/app/(models)/Transaction.model";
import Transaction_Backup from "@/app/(models)/TransactionBackup.model";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();

        console.log("look: ", body.memoId);

        const transDoc = await Transaction.findByIdAndUpdate(body.memoId, { dateConfirmed: Date.now() });
        if (transDoc) {
            const backupTransDoc = await Transaction_Backup.findOneAndUpdate({ transactionId: transDoc._id }, { dateConfirmed: Date.now() });

            if (backupTransDoc) return NextResponse.json({ message: "Confirmed" }, { status: 201 });
        }
    } catch (err) {
        console.log("Error here: ", err);
        return NextResponse.json(
            { message: "Error", err },
            { status: 400 }
        );
    }
}
