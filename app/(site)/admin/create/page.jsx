import CreateUserForm from "@/app/(components)/CreateUserForm";
import Header from "@/app/(components)/HeaderComponent";
import Nav from "@/app/(components)/Nav";

const page = () => {
    return (
        <div className="flex w-full justify-between">
            <div className="w-0 lg:w-[20%]">
                <Nav />
            </div>
            <div className="w-full lg:w-[78%]">
                <Header />
                <CreateUserForm />
            </div>
        </div>
    )
}

export default page