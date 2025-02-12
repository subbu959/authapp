"use client"
import { AdminLoginForm } from "@/components/login-form";
import { WarpBackground } from "@/components/magicui/warp-background";

export default function LoginPage() {
    return (
        <>
            <WarpBackground>
                <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 ">
                    <div className="w-full max-w-sm">
                        <AdminLoginForm />
                    </div>
                </div>
            </WarpBackground>
        </>
    )
}