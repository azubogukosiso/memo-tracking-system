import Response from "@/app/(models)/Response.model";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        console.log("Params here: ", body);

        const response = await Response.findOne({ request_id: body });

        if (response) return NextResponse.json(
            { message: response },
            { status: 200 }
        );
    } catch (err) {
        console.log("Error here: ", err);
        return NextResponse.json(
            { message: "Error", err },
            { status: 400 }
        );
    }
}
