"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  const handleSelection = (role: "admin-login" | "user-login") => {
    router.push(`/${role}`); // Redirect to Admin or User page
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-3xl font-bold">Select Your Role</h1>
      <div className="flex gap-6">
        {/* Admin Card */}
        <Card className="w-72 cursor-pointer hover:shadow-lg transition-all" onClick={() => handleSelection("admin-login")}>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin</CardTitle>
            <CardDescription className="text-center">Manage users and settings</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button className="w-full">Continue as Admin</Button>
          </CardContent>
        </Card>

        {/* User Card */}
        <Card className="w-72 cursor-pointer hover:shadow-lg transition-all" onClick={() => handleSelection("user-login")}>
          <CardHeader>
            <CardTitle className="text-2xl text-center">User</CardTitle>
            <CardDescription className="text-center">Access your profile</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button className="w-full">Continue as User</Button>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}
