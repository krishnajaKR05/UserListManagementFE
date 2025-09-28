import React, { useState, useEffect } from "react";
import { User } from "../Store/Slice/usersSlice";

type Props = {
  show: boolean;
  onClose: () => void;
  onSubmit: (u: User) => void;
  editingUser?: User | null;
};

export default function ManageUserModal({
  show,
  onClose,
  onSubmit,
  editingUser,
}: Props) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (editingUser) {
      setFirst(editingUser.first_name);
      setLast(editingUser.last_name);
      setEmail(editingUser.email);
      setAvatar(editingUser.avatar);
    } else {
      setFirst("");
      setLast("");
      setEmail("");
      setAvatar("");
    }
  }, [editingUser, show]);

  const submit = () => {
    // basic validation
    if (!first || !last || !email) {
      alert("Please fill required fields");
      return;
    }
    const user: User = {
      id: editingUser?.id ?? Math.floor(Math.random() * 100000) + 100,
      first_name: first,
      last_name: last,
      email,
      avatar: avatar || `https://i.pravatar.cc/150?u=${email}`,
    };
    onSubmit(user);
    onClose();
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {editingUser ? "Edit User" : "Create New User"}
            </h5>
            <button className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <label className="form-label">First Name*</label>
            <input
              className="form-control"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />
            <label className="form-label mt-2">Last Name*</label>
            <input
              className="form-control"
              value={last}
              onChange={(e) => setLast(e.target.value)}
            />
            <label className="form-label mt-2">Email*</label>
            <input
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label mt-2">Profile Image Link</label>
            <input
              className="form-control"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={submit}>
              {editingUser ? "Save" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
