import { UserLoginForm } from "@/components/user-loginform";

export default function UserLoginPage() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <UserLoginForm />
            </div>
        </div>
    )
}