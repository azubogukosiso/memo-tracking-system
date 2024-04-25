import Memo from "@/app/(models)/Memo.model";
import ResentMemo from '@/app/(models)/ResentMemo.model';
import { NextResponse } from "next/server";
import { generateMemoTN } from "@/app/functions";

export async function POST(req) {
    try {
        const body = await req.json();
        const memoData = body.formData;
        console.log("check it: ", memoData);

        if (!memoData.resent) {
            if (!memoData?.title || !memoData.description || !memoData.sender || !memoData.receipient) {
                return NextResponse.json(
                    { message: "All fields are required" },
                    { status: 400 }
                );
            }

            if (memoData.sender === memoData.receipient) {
                return NextResponse.json(
                    { message: "Sender cannot be the same as receipient" },
                    { status: 400 }
                );
            }

            const memoTN = generateMemoTN();
            console.log("number here: ", memoTN);

            const memoDataUpdated = {
                ...memoData,
                memoTN,
            }

            console.log(memoDataUpdated);

            const createdMainMemo = await Memo.create(memoDataUpdated);
            console.log("The real memo: ", createdMainMemo);

            if (createdMainMemo) {
                const memoTransferHistory = [];
                memoTransferHistory.push({ _id: createdMainMemo._id, sender: createdMainMemo.sender, receipient: createdMainMemo.receipient, dateSent: Date.now(), dateReceived: null });

                const updatedMemoStatus = await Memo.findByIdAndUpdate(createdMainMemo._id, { status: 'sent', memoTransferHistory });

                console.log(updatedMemoStatus);

                if (updatedMemoStatus) return NextResponse.json({ message: "Your memo has been sent" }, { status: 201 });
            }
        } else {
            if (memoData.sender === memoData.receipient) {
                return NextResponse.json(
                    { message: "Sender cannot be the same as receipient" },
                    { status: 400 }
                );
            }

            console.log("the memo to be resent: ", memoData);

            const prevMemo = await Memo.findByIdAndUpdate(memoData._id, { resent: 'true' });

            const memoTN = generateMemoTN();
            console.log("number here: ", memoTN);

            let updatedMemoData;
            if (memoData.originalMemo_id) {
                updatedMemoData = {
                    originalMemo_id: memoData.originalMemo_id, sender: memoData.sender, receipient: memoData.receipient, dateConfirmed: null, dateSent: Date.now(), resent: memoData.resent, status: 'sent', memoTN, title: memoData.title, description: memoData.description,
                }
            } else {
                updatedMemoData = {
                    originalMemo_id: memoData._id, sender: memoData.sender, receipient: memoData.receipient, dateConfirmed: null, dateSent: Date.now(), resent: memoData.resent, status: 'sent', memoTN, title: memoData.title, description: memoData.description,
                }
            }
            console.log("new data: ", updatedMemoData);

            const resentMemo = await ResentMemo.create(updatedMemoData);
            console.log(resentMemo);

            if (resentMemo) return NextResponse.json({ message: "Resent" }, { status: 201 });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}
