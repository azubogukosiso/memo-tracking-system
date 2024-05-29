import Memo from "@/app/(models)/Memo.model";
import Transaction from "@/app/(models)/Transaction.model";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();

        if (body.user.role !== 'admin') {
            const Memos = [];

            const matchedTransactions = await Transaction.find({
                $or: [
                    { sender: body.user.office },
                    { receipient: body.user.office }
                ]
            });

            await Promise.all(matchedTransactions.map(async (transaction) => {
                const matchedMemo = await Memo.find({ memoTrackingNum: transaction.memoTrackingNum })

                const memoDetails = {
                    id: transaction._id,
                    title: matchedMemo[0].title,
                    sender: transaction.sender,
                    receipient: transaction.receipient,
                    dateSent: transaction.dateSent,
                    dateConfirmed: transaction.dateConfirmed,
                    memoTrackingNum: matchedMemo[0].memoTrackingNum,
                    type: transaction.type
                }

                Memos.push(memoDetails);
            }))

            // SORT MEMOS FROM LATEST TO OLDEST
            Memos.sort(function (a, b) {
                // CONVERT DATESENT STRINGS TO DATE OBJECTS
                const dateA = new Date(a.dateSent);
                const dateB = new Date(b.dateSent);

                // COMPARE THE DATES
                if (dateA < dateB) return 1;
                if (dateA > dateB) return -1;
                return 0;
            });

            console.log("this is it, right here: ", Memos);

            return NextResponse.json(
                { message: Memos },
                { status: 200 }
            );
        } else {
            const Memos = [];

            const matchedTransactions = await Transaction.find();

            await Promise.all(matchedTransactions.map(async (transaction) => {
                const matchedMemo = await Memo.find({ memoTrackingNum: transaction.memoTrackingNum })

                const memoDetails = {
                    id: transaction._id,
                    title: matchedMemo[0].title,
                    sender: transaction.sender,
                    receipient: transaction.receipient,
                    dateSent: transaction.dateSent,
                    dateConfirmed: transaction.dateConfirmed,
                    memoTrackingNum: matchedMemo[0].memoTrackingNum,
                    type: transaction.type
                }

                Memos.push(memoDetails);
            }))

            // SORT MEMOS FROM LATEST TO OLDEST
            Memos.sort(function (a, b) {
                // CONVERT DATESENT STRINGS TO DATE OBJECTS
                const dateA = new Date(a.dateSent);
                const dateB = new Date(b.dateSent);

                // COMPARE THE DATES
                if (dateA < dateB) return 1;
                if (dateA > dateB) return -1;
                return 0;
            });

            return NextResponse.json(
                { message: Memos },
                { status: 200 }
            );
        }
    } catch (err) {

        return NextResponse.json(
            { message: "Error", err },
            { status: 400 }
        );
    }
}

export async function GET(req) {
    try {
        const id = req.nextUrl.searchParams.get("id"); // EXTRACT ID PARAMETER

        console.log("this is the way: ", id);

        // LOGIC TO USE THE "ID" PARAMETER FOR FETCHING DATA
        const matchedTransaction = await Transaction.findById(id);

        if (matchedTransaction) {
            const matchedMemo = await Memo.find({ memoTrackingNum: matchedTransaction.memoTrackingNum })

            const memoTransferHistory = await Transaction.find({ memoTrackingNum: matchedTransaction.memoTrackingNum })

            // SORT TRANSACTIONS FROM LATEST TO OLDEST
            memoTransferHistory.sort(function (a, b) {
                // CONVERT DATESENT STRINGS TO DATE OBJECTS
                const dateA = new Date(a.dateSent);
                const dateB = new Date(b.dateSent);

                // COMPARE THE DATES
                if (dateA < dateB) return -1;
                if (dateA > dateB) return 1;
                return 0;
            });

            const memoDetails = {
                id: id,
                sender: matchedTransaction.sender,
                receipient: matchedTransaction.receipient,
                dateSent: matchedTransaction.dateSent,
                dateConfirmed: matchedTransaction.dateConfirmed,
                memoTrackingNum: matchedTransaction.memoTrackingNum,
                title: matchedMemo[0].title,
                description: matchedMemo[0].description,
                image: matchedMemo[0].image,
                type: matchedTransaction.type,
                memoTransferHistory,
            }

            return NextResponse.json(
                { message: memoDetails },
                { status: 200 }
            );
        }
    } catch (err) {
        return NextResponse.json(
            { message: "Error", err },
            { status: 400 }
        );
    }
}