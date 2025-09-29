import React from "react";
import { User } from "../Store/Slice/usersSlice";

export default function UserCard({
  user,
  onEdit,
  onDelete,
}: {
  user: User;
  onEdit: (u: User) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="card" style={{ width: 195 }}>
      <img
        src={user.avatar}
        className="card-img-top h-50"
        alt={`${user.first_name}`}
      />
      <div className="card-body">
        <h5 className="card-title">
          {user.first_name} {user.last_name}
        </h5>
        <div className="card-text h-50">{user.email}</div>
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-sm btn-primary"
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
        </div>
      </div>
    </div>
  );
}
