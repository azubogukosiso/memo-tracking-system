import Request from "@/app/(models)/Request.model";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const requestData = body.formData;
        console.log(requestData);

        if (!requestData?.title || !requestData.description || !requestData.sender) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        const updatedRequestData = {
            ...requestData,
            status: 'no response'
        }

        const request = await Request.create(updatedRequestData);
        console.log("created request here", request);
        if (request) return NextResponse.json({ message: "Request created" }, { status: 201 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}
