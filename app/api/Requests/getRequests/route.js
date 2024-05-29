import Request from "@/app/(models)/Request.model";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        console.log("Role here: ", body.user.role);

        if (body.user.role !== 'admin') {
            const allRequests = await Request.find({ sender: body.user.office });

            // SORT REQUESTS FROM LATEST TO OLDEST
            allRequests.sort(function (a, b) {
                // CONVERT DATESENT STRINGS TO DATE OBJECTS
                const dateA = new Date(a.dateSent);
                const dateB = new Date(b.dateSent);

                // COMPARE THE DATES
                if (dateA < dateB) return 1;
                if (dateA > dateB) return -1;
                return 0;
            });

            // if allMemos...
            return NextResponse.json(
                { message: allRequests },
                { status: 200 }
            );
        } else {
            const allRequests = await Request.find();

            // SORT REQUESTS FROM LATEST TO OLDEST
            allRequests.sort(function (a, b) {
                // CONVERT DATESENT STRINGS TO DATE OBJECTS
                const dateA = new Date(a.dateSent);
                const dateB = new Date(b.dateSent);

                // COMPARE THE DATES
                if (dateA < dateB) return 1;
                if (dateA > dateB) return -1;
                return 0;
            });

            // if allMemos...
            return NextResponse.json(
                { message: allRequests },
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
