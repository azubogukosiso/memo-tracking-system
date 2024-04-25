import Request from "@/app/(models)/Request.model";
import Response from "@/app/(models)/Response.model";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const responseData = body.formData;
        console.log(responseData);

        if (!responseData.response) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        const request = await Request.findById({ _id: responseData.request_id });
        console.log(request);


        const updatedResponseData = {
            ...responseData,
            receipient: request.sender
        }

        const response = await Response.create(updatedResponseData);
        console.log("created response here", response);

        if (response) {
            const updatedRequest = await Request.findByIdAndUpdate(responseData.request_id, { status: 'responded' });

            console.log(updatedRequest);

            return NextResponse.json({ message: "Response created" }, { status: 201 });
        }

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}
