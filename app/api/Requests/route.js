import Request from "@/app/(models)/Request.model";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();

        const requestData = body.formData;

        const updatedRequestData = {
            ...requestData,
            memoTrackingNum: body.memoTrackingNum,
            status: 'no response'
        }

        const request = await Request.create(updatedRequestData);
        if (request) return NextResponse.json({ message: "Your request has been sent!" }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}
