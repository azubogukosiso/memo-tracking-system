import User from "@/app/(models)/User.model";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const userData = body.formData;
        console.log(userData);

        if (!userData?.username || !userData.email || !userData.password || !userData.role) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        const duplicate = await User.find({ email: userData.email }).lean().exec();

        if (duplicate) {
            let allowDuplicate = true;

            duplicate.map(user => {
                if (user.role === userData.role) {
                    allowDuplicate = false;
                }
            });

            if (!allowDuplicate) return NextResponse.json({ message: "An email already exists for this role. Choose another role or another email." }, { status: 400 });
        }

        const user = await User.create(userData);
        console.log("created user here", user);
        if (user) return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}