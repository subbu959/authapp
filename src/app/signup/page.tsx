"use client"
import React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { cp } from "fs"

export default function SignupPage(){
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
        <div>
            <h1>Add a New User</h1>
            
        </div>
    )
}