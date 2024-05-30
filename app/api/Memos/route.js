import Memo from "@/app/(models)/Memo.model";
import Transaction from '@/app/(models)/Transaction.model';
import { NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';
import { generateMemoTN } from "@/app/(functions)/generateMemoTN.js";
import { cloudinaryUpload } from "@/app/(functions)/cloudinaryUpload.js";

export async function POST(req) {
    try {
        const data = await req.formData();

        const title = data.get('title');
        const description = data.get('description');
        const sender = data.get('sender');
        const receipient = data.get('receipient');
        const id = data.get('id');
        const resent = Boolean(data.get('resent'));
        const type = data.get('type');

        const formDataEntryValues = Array.from(data.values());

        console.log("the form data is here: ", formDataEntryValues);

        console.log("this is it: ", resent);

        const memoData = {
            title,
            description,
            image: [],
        }

        console.log("before we start: ", memoData);

        if (!resent) {
            // CHECK FOR ALL REQUIRED FIELDS
            if (!memoData?.title || !memoData.description || !sender || !receipient) {
                return NextResponse.json(
                    { message: "All fields are required" },
                    { status: 400 }
                );
            }

            // CHECK THAT SENDER AND RECEIPIENT DON'T MATCH
            if (sender === receipient) {
                return NextResponse.json(
                    { message: "Sender cannot be the same as receipient" },
                    { status: 400 }
                );
            }

            await Promise.all(formDataEntryValues.map(async (image) => {
                if (typeof image === "object") {
                    console.log("it is an object");
                    let url;
                    // UPLOAD FILE TO CLOUDINARY
                    try {
                        console.log("in the try block");

                        url = await cloudinaryUpload(image);

                        console.log("here is the url: ", url);
                    } catch (error) {
                        console.log("this is the error: ", error);
                        return NextResponse.json({ message: "Error", error }, { status: 500 });
                    }

                    memoData.image.push(url);
                }
            }));

            console.log("right here -> ", memoData);

            const memoTrackingNum = generateMemoTN();
            console.log("number here: ", memoTrackingNum);

            const memoDataUpdated = {
                ...memoData,
                memoTrackingNum,
            }

            console.log(memoDataUpdated);

            const createdMainMemo = await Memo.create(memoDataUpdated);
            console.log("The real memo: ", createdMainMemo);

            if (createdMainMemo) {
                const memoTransferDetails = {
                    sender,
                    receipient,
                    memoTrackingNum,
                    dateSent: Date.now(),
                };

                const savedMemoTransferDetails = await Transaction.create(memoTransferDetails);

                console.log(savedMemoTransferDetails);

                if (savedMemoTransferDetails) return NextResponse.json({ message: "Your memo has been sent" }, { status: 201 });
            }
        }
        else {
            if (sender === receipient) {
                return NextResponse.json(
                    { message: "Sender cannot be the same as receipient" },
                    { status: 400 }
                );
            }

            await Promise.all(formDataEntryValues.map(async (image) => {
                if (typeof image === "object") {
                    console.log("it is an object");
                    let url;
                    // UPLOAD FILE TO CLOUDINARY
                    try {
                        console.log("in the try block");

                        url = await cloudinaryUpload(image);

                        console.log("here is the url: ", url);
                    } catch (error) {
                        console.log("this is the error: ", error);
                        return NextResponse.json({ message: "Error", error }, { status: 500 });
                    }

                    memoData.image.push(url);
                }
            }));

            console.log("the transaction id: ", id);

            const transDoc = await Transaction.findById(id);

            if (transDoc) {
                console.log("transDoc: ", transDoc);
                const memoDoc = await Memo.findOneAndUpdate({ memoTrackingNum: transDoc.memoTrackingNum }, { resent: resent, $push: { image: { $each: memoData.image } } });
                console.log("memoDoc: ", memoDoc);

                const resentDoc = { sender, receipient, memoTrackingNum: transDoc.memoTrackingNum, type }

                const resentMemo = await Transaction.create(resentDoc);

                if (resentMemo) return NextResponse.json({ message: "Resent" }, { status: 201 });
            }// else... HANDLE NOT FOUND LATER
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}