import React from "react";
import { User } from "../Store/Slice/usersSlice";

export default function UserTable({
  users,
  onEdit,
  onDelete,
}: {
  users: User[];
  onEdit: (u: User) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>{" "}</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th style={{ minWidth: 140 }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <img
                src={user.avatar}
                alt=""
                style={{ width: 40, borderRadius: 20 }}
              />
            </td>
            <td>{user.email}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => onEdit(user)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(user.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
