"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EditUserForm({ user }: { user: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
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

  return (
    <Card className="w-[500px] bg-white shadow-lg rounded-xl border border-gray-200 transition-all hover:shadow-xl">
      <CardHeader className="bg-gray-50 rounded-t-xl py-4">
        <CardTitle className="text-2xl text-center font-semibold text-gray-800">
          Edit User Profile
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1.5">
            <Label className="text-gray-700 font-medium">First Name</Label>
            <Input name="firstName" value={userData.firstName} disabled={!isEditing} onChange={handleChange} />
          </div>
          <div className="grid gap-1.5">
            <Label className="text-gray-700 font-medium">Last Name</Label>
            <Input name="lastName" value={userData.lastName} disabled={!isEditing} onChange={handleChange} />
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label className="text-gray-700 font-medium">Username</Label>
          <Input name="username" value={userData.username} disabled={!isEditing} onChange={handleChange} />
        </div>

        <div className="grid gap-1.5">
          <Label className="text-gray-700 font-medium">Email</Label>
          <Input name="email" type="email" value={userData.email} disabled={!isEditing} onChange={handleChange} />
        </div>

        <div className="grid gap-1.5">
          <Label className="text-gray-700 font-medium">Phone</Label>
          <Input name="phone" type="tel" value={userData.phone} disabled={!isEditing} onChange={handleChange} />
        </div>

        <div className="grid gap-1.5">
          <Label className="text-gray-700 font-medium">Address</Label>
          <Input name="address" value={userData.address} disabled={!isEditing} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1.5">
            <Label className="text-gray-700 font-medium">City</Label>
            <Input name="city" value={userData.city} disabled={!isEditing} onChange={handleChange} />
          </div>
          <div className="grid gap-1.5">
            <Label className="text-gray-700 font-medium">State</Label>
            <Input name="state" value={userData.state} disabled={!isEditing} onChange={handleChange} />
          </div>
        </div>

        <Button onClick={() => (isEditing ? handleSave() : setIsEditing(true))} className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all hover:bg-blue-700">
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </CardContent>
    </Card>
  );
}
