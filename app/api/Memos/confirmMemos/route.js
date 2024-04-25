import Memo from "@/app/(models)/Memo.model";
import ResentMemo from "@/app/(models)/ResentMemo.model";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const memoID = body.memo_id;

        console.log("look", body, memoID);

        let memoForUpdate = await Memo.findById(memoID);
        if (!memoForUpdate) {
            memoForUpdate = await ResentMemo.findById(memoID);
        }

        memoForUpdate.status = 'confirmed';
        memoForUpdate.dateConfirmed = Date.now();

        let updatedMemo = await Memo.findByIdAndUpdate(memoID, memoForUpdate);
        if (!updatedMemo) {
            updatedMemo = await ResentMemo.findByIdAndUpdate(memoID, memoForUpdate);
        }

        if (updatedMemo) return NextResponse.json(
            { message: "Confirmed" },
            { status: 201 }
        );
    } catch (err) {
        console.log("Error here: ", err);
        return NextResponse.json(
            { message: "Error", err },
            { status: 400 }
        );
    }
}
