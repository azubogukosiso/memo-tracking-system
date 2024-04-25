import Request from "@/app/(models)/Request.model";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        console.log("Role here: ", body.user.role);

        if (body.user.role !== 'admin') {
            const allRequests = await Request.find({ sender: body.user.office });
            console.log(allRequests);

            // if allMemos...
            return NextResponse.json(
                { message: allRequests },
                { status: 200 }
            );
        } else {
            const allRequests = await Request.find();
            console.log(allRequests);

            // if allMemos...
            return NextResponse.json(
                { message: allRequests },
                { status: 200 }
            );
        }
        // const adminMemos = await Memo.find();        
    } catch (err) {
        console.log("Error here: ", err);
        return NextResponse.json(
            { message: "Error", err },
            { status: 400 }
        );
    }
}
