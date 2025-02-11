"use client";
import { useState } from "react";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function UserProfile({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [isEditing, setIsEditing] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [userData, setUserData] = useState({
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "johndoe@example.com",
      phone: "1234567890",
      address: "123 Main St",
      city: "New York",
      state: "NY",
    });
  
    const [passwordData, setPasswordData] = useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    };
  
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };
  
    const handleSave = () => {
      if (!userData.email.includes("@")) {
        alert("Please enter a valid email.");
        return;
      }
      if (userData.phone.length !== 10 || isNaN(Number(userData.phone))) {
        alert("Phone number must be 10 digits.");
        return;
      }
      setIsEditing(false);
      console.log("Updated User Data:", userData);
    };
  
    const handlePasswordSubmit = () => {
      if (passwordData.newPassword.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
      }
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        alert("New password and confirm password do not match.");
        return;
      }
      console.log("Password updated:", passwordData);
      setIsPasswordModalOpen(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    };
  return (
    <div className={cn("flex flex-col items-center justify-center min-h-screen gap-8", className)} {...props}>
      <h1 className="text-3xl font-bold">Welcome, {userData.firstName}!</h1>
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>First Name</Label>
                <Input name="firstName" value={userData.firstName} disabled={!isEditing} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label>Last Name</Label>
                <Input name="lastName" value={userData.lastName} disabled={!isEditing} onChange={handleChange} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Username</Label>
              <Input name="username" value={userData.username} disabled={!isEditing} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input name="email" type="email" value={userData.email} disabled={!isEditing} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input name="phone" type="tel" value={userData.phone} disabled={!isEditing} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label>Address</Label>
              <Input name="address" value={userData.address} disabled={!isEditing} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>City</Label>
                <Input name="city" value={userData.city} disabled={!isEditing} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label>State</Label>
                <Input name="state" value={userData.state} disabled={!isEditing} onChange={handleChange} />
              </div>
            </div>
            <Button onClick={() => (isEditing ? handleSave() : setIsEditing(true))} className="w-full">
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
            <Button variant="outline" onClick={() => setIsPasswordModalOpen(true)} className="w-full">
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Password Change Modal */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label>Current Password</Label>
              <Input name="currentPassword" type="password" value={passwordData.currentPassword} onChange={handlePasswordChange} />
            </div>
            <div className="grid gap-2">
              <Label>New Password</Label>
              <Input name="newPassword" type="password" value={passwordData.newPassword} onChange={handlePasswordChange} />
            </div>
            <div className="grid gap-2">
              <Label>Confirm New Password</Label>
              <Input name="confirmPassword" type="password" value={passwordData.confirmPassword} onChange={handlePasswordChange} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handlePasswordSubmit}>Save Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
