import User from "@/app/(models)/User.model";
import { NextResponse } from "next/server";
import { validateEmail } from "@/app/(functions)/validateEmail";
import { generatePassword } from "@/app/(functions)/generatePassword";
import nodemailer from "nodemailer";
import bcrypt from 'bcrypt';

export async function GET(req) {
    try {
        const accounts = await User.find();
        console.log("the users are here: ", accounts);

        if (accounts.length > 0) return NextResponse.json({ message: accounts }, { status: 201 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const data = await req.formData();

        const fullname = data.get('fullname');
        const email = data.get('email');
        const role = data.get('role');
        const office = data.get('office');
        const staffID = data.get('staffID');

        let userData = {
            fullname, email, role, office, staffID
        }

        console.log("here it is: ", userData);

        if (!userData.fullname || !userData.email || !userData.role || !userData.office || !userData.staffID) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        if (userData.role === "admin") {
            delete userData.office;
        }

        const isEmailValid = validateEmail(userData.email);

        console.log(isEmailValid);

        if (!isEmailValid) return NextResponse.json({ message: "Invalid email. Must be a staff school email" }, { status: 400 });

        const duplicate = await User.find({ email: userData.email }).lean().exec();

        console.log("here they are: ", duplicate);

        if (duplicate.length > 0) {
            return NextResponse.json({ message: "This email already exists. Use another email." }, { status: 400 });
        }

        const user = await User.create(userData);
        console.log("created user here", user);

        if (user) return NextResponse.json({ message: "Credentials submitted! The admins will approve your account for operation soon. Check the email you provided regularly." }, { status: 201 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        const id = req.nextUrl.searchParams.get("id");

        const body = await req.json();

        const password = generatePassword();
        console.log("this is the password: ", password);

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.findById(id);

        const usernameForEmail = process.env.USER;
        const passwordForEmail = process.env.PASS;

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: usernameForEmail,
                pass: passwordForEmail
            }
        });

        if (!user.office) {
            user.office = "none";
        }

        const mailOptions = {
            from: `"The Memo Tracker app" ${usernameForEmail}`,
            to: user.email,
            subject: "Here's your password for login",
            html: `
                    <p>This is your password for logging in: ${password}</p>
                    <p>We recommend you change this password as soon as you log in. Do not reveal this password to anyone.</p>
                    <p>If you did not initiate any request to warrant this email, please ignore</p>
                    <p>Other details:</p>
                    <p>Full Name: ${user.fullname}</p>
                    <p>Email: ${user.email}</p>
                    <p>Role: ${user.role}</p>
                    <p>Office: ${user.office}</p>
                    <p>Staff ID: ${user.staffID}</p>
                `,
        };

        try {
            console.log("will send soon: ", password);
            const mailSent = await transporter.sendMail(mailOptions);
            if (mailSent) {
                const user = await User.findByIdAndUpdate(id, { isApproved: body.isApproved, password: hashedPassword })
                if (user) return NextResponse.json({ message: "User account has been approved" }, { status: 201 });
            }
        } catch (error) {
            console.log("this is the error: ", error);
            return NextResponse.json({ message: "An error occured in approving the user. Check your internet connection and try again" }, { status: 500 });
        }
    } catch (err) {
        return NextResponse.json(
            { message: "Error", err },
            { status: 500 }
        );
    }
}

export async function DELETE(req) {
    try {
        const id = req.nextUrl.searchParams.get("id");
        const user = await User.findByIdAndDelete(id);
        if (user) return NextResponse.json({ message: "User account disapproved and deleted successfully" }, { status: 201 });
    } catch (err) {
        return NextResponse.json(
            { message: "Error", err },
            { status: 500 }
        );
    }
}

export async function PUT(req) {
    try {
        const { oldPwd, newPwd, email } = await req.json();

        const user = await User.findOne({ email });

        if (user) {
            console.log("user here: ", user);
            const pwdMatch = await bcrypt.compare(oldPwd, user.password);

            console.log("password match: ", oldPwd, pwdMatch);

            if (!pwdMatch) return NextResponse.json(
                { message: "Your old password does not match with the current input" },
                { status: 400 }
            )

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(newPwd, salt);

            const userMod = await User.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true });

            if (userMod) {
                return NextResponse.json({ message: "Password changed successfully" }, { status: 201 })
            } else {
                return NextResponse.json(
                    { message: "Error", err },
                    { status: 500 }
                )
            }
        } else {
            return NextResponse.json(
                { message: "Error", err },
                { status: 500 }
            );
        }
    } catch (err) {
        return NextResponse.json(
            { message: "Error", err },
            { status: 500 }
        );
    }
}
