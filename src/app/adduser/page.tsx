"use client"
import React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { cp } from "fs"
import { AddUserForm } from "@/components/adduser-form"

export default function AdduserPage(){
    const [user,setUser] = React.useState({
        fname: "",
        lname:"",
        uname:"",
        email: "",
        phno:"",
        address:"",
        city:"",
        state:"",
        password: "",
        cpassword: ""
    })
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-lg">
                        <AddUserForm />
                    </div>
                </div>
    )
}