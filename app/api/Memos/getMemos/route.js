import Memo from "@/app/(models)/Memo.model";
import ResentMemo from "@/app/(models)/ResentMemo.model";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        console.log("siuuuu: ", body);

        if (body.user.role !== 'admin') {
            const allMemos = await Memo.find({
                $or: [
                    { sender: body.user.office },
                    { receipient: body.user.office }
                ]
            });

            const allResentMemos = await ResentMemo.find({
                $or: [
                    { sender: body.user.office },
                    { receipient: body.user.office }
                ]
            });

            const combinedMemos = allMemos.concat(allResentMemos);

            console.log("first:", combinedMemos);

            // if allMemos...
            return NextResponse.json(
                { message: combinedMemos },
                { status: 200 }
            );
        } else {
            const allMemos = await Memo.find();

            // if allMemos...
            return NextResponse.json(
                { message: allMemos },
                { status: 200 }
            );
        }
    } catch (err) {
        console.log("Error here: ", err);
        return NextResponse.json(
            { message: "Error", err },
            { status: 400 }
        );
    }
}

export async function GET(req) {
    try {
        const type = req.nextUrl.searchParams.get("id");

        // Logic to use the "type" parameter for fetching data
        let matchedMemo = await Memo.findById(type);

        if (matchedMemo) {
            if (matchedMemo.resent === "true") {
                let memoTransferHistory = await ResentMemo.find({ originalMemo_id: matchedMemo._id }, { sender: 1, receipient: 1, dateSent: 1, dateConfirmed: 1, _id: 1 });

                let initialMemoHistory = {
                    _id: matchedMemo._id,
                    sender: matchedMemo.sender,
                    receipient: matchedMemo.receipient,
                    dateSent: matchedMemo.dateSent,
                    dateConfirmed: matchedMemo.dateConfirmed
                }

                memoTransferHistory.push(initialMemoHistory);
                console.log("first sect: ", memoTransferHistory);

                memoTransferHistory.sort(function (a, b) {
                    // Convert dateSent strings to Date objects
                    const dateA = new Date(a.dateSent);
                    const dateB = new Date(b.dateSent);

                    // Compare the dates
                    if (dateA < dateB) return -1;
                    if (dateA > dateB) return 1;
                    return 0;
                });

                const updatedMatchedMemo = {
                    ...matchedMemo,
                    memoTransferHistory
                }

                console.log("here it is, first", updatedMatchedMemo);

                return NextResponse.json(
                    { message: updatedMatchedMemo },
                    { status: 200 }
                );
            } else {
                let memoTransferHistory = {
                    _id: matchedMemo._id,
                    sender: matchedMemo.sender,
                    receipient: matchedMemo.receipient,
                    dateSent: matchedMemo.dateSent,
                    dateConfirmed: matchedMemo.dateConfirmed
                }

                console.log("second sect: ", memoTransferHistory);

                const updatedMatchedMemo = {
                    ...matchedMemo,
                    memoTransferHistory
                }

                console.log("here it is, second", updatedMatchedMemo);

                return NextResponse.json(
                    { message: updatedMatchedMemo },
                    { status: 200 }
                );
            }
        } else {
            let oneResentDoc = await ResentMemo.findOne({ _id: type });
            if (oneResentDoc) {
                let mainDoc = await Memo.findById(oneResentDoc.originalMemo_id);

                if (mainDoc) {
                    let memoTransferHistory = await ResentMemo.find({ originalMemo_id: mainDoc._id }, { sender: 1, receipient: 1, dateSent: 1, dateConfirmed: 1, _id: 1 });

                    let initialMemoHistory = {
                        _id: mainDoc._id,
                        sender: mainDoc.sender,
                        receipient: mainDoc.receipient,
                        dateSent: mainDoc.dateSent,
                        dateConfirmed: mainDoc.dateConfirmed
                    }

                    memoTransferHistory.push(initialMemoHistory);
                    console.log("third sect: ", memoTransferHistory);

                    memoTransferHistory.sort(function (a, b) {
                        // Convert dateSent strings to Date objects
                        const dateA = new Date(a.dateSent);
                        const dateB = new Date(b.dateSent);

                        console.log("yooooo: ", dateA, dateB);

                        // Compare the dates
                        if (dateA < dateB) return -1;
                        if (dateA > dateB) return 1;
                        return 0;
                    });

                    const updatedMatchedMemo = {
                        ...oneResentDoc,
                        memoTransferHistory
                    }

                    console.log("here it is, third", updatedMatchedMemo);

                    return NextResponse.json(
                        { message: updatedMatchedMemo },
                        { status: 200 }
                    );
                }
            }
        }
    } catch (err) {
        return NextResponse.json(
            { message: "Error", err },
            { status: 400 }
        );
    }
}