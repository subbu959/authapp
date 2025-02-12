"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

// Define the type for User
export type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
};

// Define the function that returns column definitions
export const columns = (
  handleEdit: (user: User) => void,
  handleDelete: (id: number) => void
): ColumnDef<User>[] => [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => handleEdit(user)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDelete(user.id)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
