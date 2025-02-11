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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AddUserForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        uname: "",
        email: "",
        phno: "",
        address: "",
        city: "",
        state: "",
        password: "",
      });
    
      const [errors, setErrors] = useState<Record<string, string>>({});
    
      const validateForm = () => {
        let newErrors: Record<string, string> = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;
    
        if (!formData.fname || formData.fname.length < 2) newErrors.fname = "First Name must be at least 2 characters.";
        if (!formData.lname || formData.lname.length < 2) newErrors.lname = "Last Name must be at least 2 characters.";
        if (!formData.uname || formData.uname.length < 4) newErrors.uname = "Username must be at least 4 characters.";
        if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = "Enter a valid email address.";
        if (!formData.phno || !phoneRegex.test(formData.phno)) newErrors.phno = "Phone Number must be 10 digits.";
        if (!formData.address || formData.address.length < 3) newErrors.address = "Address must be at least 3 characters.";
        if (!formData.city || formData.city.length < 3) newErrors.city = "City must be at least 3 characters.";
        if (!formData.state || formData.state.length < 2) newErrors.state = "State must be at least 2 characters.";
        if (!formData.password || formData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
          console.log("User Data:", formData);
        }
      };
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add New User</CardTitle>
          <CardDescription>Enter the below details to add a new user</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "First Name", id: "fname", placeholder: "John" },
                  { label: "Last Name", id: "lname", placeholder: "Doe" },
                  { label: "Username", id: "uname", placeholder: "johndoe" },
                  { label: "Email", id: "email", placeholder: "m@example.com", type: "email" },
                ].map(({ label, id, placeholder, type = "text" }) => (
                  <div key={id} className="grid gap-2">
                    <Label htmlFor={id}>{label}</Label>
                    <Input
                      id={id}
                      type={type}
                      placeholder={placeholder}
                      value={formData[id as keyof typeof formData]}
                      onChange={handleChange}
                      className={errors[id] ? "border-red-500" : ""}
                      required
                    />
                    {errors[id] && <p className="text-red-500 text-sm">{errors[id]}</p>}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Phone Number", id: "phno", placeholder: "1234567890", type: "tel" },
                  { label: "Address", id: "address", placeholder: "123 Main St" },
                  { label: "City", id: "city", placeholder: "New York" },
                  { label: "State", id: "state", placeholder: "NY" },
                ].map(({ label, id, placeholder, type = "text" }) => (
                  <div key={id} className="grid gap-2">
                    <Label htmlFor={id}>{label}</Label>
                    <Input
                      id={id}
                      type={type}
                      placeholder={placeholder}
                      value={formData[id as keyof typeof formData]}
                      onChange={handleChange}
                      className={errors[id] ? "border-red-500" : ""}
                      required
                    />
                    {errors[id] && <p className="text-red-500 text-sm">{errors[id]}</p>}
                  </div>
                ))}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "border-red-500" : ""}
                  required
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
              <Button type="submit" className="w-full">
                Add User
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    )
}
