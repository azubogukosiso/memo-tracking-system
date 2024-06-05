import Request from "@/app/(models)/Request.model";
import Response from "@/app/(models)/Response.model";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const responseData = body.formData;

        if (!responseData.radioResponse) {
            return NextResponse.json(
                { message: "Select an option in the list" },
                { status: 400 }
            );
        }

        console.log("This is the responseData: ", responseData);

        const { radioResponse, ...responseDataTrimmed } = responseData;

        console.log("This is it: ", responseDataTrimmed, radioResponse);

        const response = await Response.create(responseDataTrimmed);
        console.log("created response here", response);

        let updatedRequest;
        if (response) {
            if (radioResponse === "grant-request") {
                updatedRequest = await Request.findByIdAndUpdate(responseData.request_id, { status: 'responded' });
            } else {
                updatedRequest = await Request.findByIdAndUpdate(responseData.request_id, { status: 'request denied' });
            }
            return NextResponse.json({ message: "Your response has been sent" }, { status: 201 });
        }

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}
