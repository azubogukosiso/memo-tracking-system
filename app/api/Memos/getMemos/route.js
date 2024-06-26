import Memo from "@/app/(models)/Memo.model";
import Transaction from "@/app/(models)/Transaction.model";
import Transaction_Backup from "@/app/(models)/TransactionBackup.model";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();

        console.log("this is the body: ", body);

        if (body.user?.role === 'attendant') {
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
        } else if (body.user?.role === 'admin') {
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
        } else {
            const Memos = [];

            console.log("this is the mtn: ", body);

            const matchedTransaction = await Transaction.findOne({ memoTrackingNum: body.value, type: "original" });
            const matchedMemo = await Memo.findOne({ memoTrackingNum: body.value });

            console.log("the search is over: ", matchedTransaction, matchedMemo);

            if (!matchedTransaction || !matchedMemo) {
                return NextResponse.json(
                    { message: "There is no memo with this tracking number!" },
                    { status: 400 }
                );
            }

            const memoDetails = {
                id: matchedTransaction._id,
                title: matchedMemo.title,
                sender: matchedTransaction.sender,
                receipient: matchedTransaction.receipient,
                dateSent: matchedTransaction.dateSent,
                dateConfirmed: matchedTransaction.dateConfirmed,
                memoTrackingNum: matchedTransaction.memoTrackingNum,
                type: matchedTransaction.type
            }

            Memos.push(memoDetails);

            return NextResponse.json(
                { message: Memos },
                { status: 200 }
            );
        }
    } catch (err) {
        console.log("this is the error: ", err);
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

            const memoTransferHistory = await Transaction_Backup.find({ memoTrackingNum: matchedTransaction.memoTrackingNum })

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

            console.log("right here: ", memoDetails);

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