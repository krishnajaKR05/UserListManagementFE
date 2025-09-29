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

  const [errors, setErrors] = useState({
    first: "",
    last: "",
    email: "",
    avatar: "",
  });

  const emailRegex = /^[a-zA-Z]+(?:\.[a-zA-Z]+)+@reqres\.in$/i;
  const nameRegex = /^[A-Za-z]+$/;
  const imageRegex = /\.(jpg|jpeg)$/i;

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

  useEffect(() => {
    setErrors({
      first:
        first.trim() === ""
          ? "First name is required"
          : !nameRegex.test(first.trim())
          ? "First name must contain letters only"
          : "",
      last:
        last.trim() === ""
          ? "Last name is required"
          : !nameRegex.test(last.trim())
          ? "Last name must contain letters only"
          : "",
      email:
        email.trim() === ""
          ? "Email is required"
          : !emailRegex.test(email.trim())
          ? 'Email must match "abc.abc@reqres.in"'
          : "",
      avatar:
        avatar.trim() !== "" && !imageRegex.test(avatar.trim())
          ? "Image must be a .jpg file"
          : "",
    });
  }, [first, last, email, avatar]);

  const isFormValid =
    errors.first === "" &&
    errors.last === "" &&
    errors.email === "" &&
    errors.avatar === "" &&
    first.trim() !== "" &&
    last.trim() !== "" &&
    email.trim() !== "";

  const submit = () => {
    if (!isFormValid) return;

    const user: User = {
      id: editingUser?.id ?? Math.floor(Math.random() * 100000) + 100,
      first_name: first.trim(),
      last_name: last.trim(),
      email: email.trim(),
      avatar: avatar.trim() || `https://i.pravatar.cc/150?u=${email}`,
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
            {/* First Name */}
            <div>
              <label className="form-label">First Name*</label>
              <input
                className="form-control"
                value={first}
                onChange={(e) => setFirst(e.target.value)}
              />
              {errors.first && (
                <small className="text-danger">{errors.first}</small>
              )}
            </div>
            {/* Last Name */}
            <div>
              <label className="form-label mt-2">Last Name*</label>
              <input
                className="form-control"
                value={last}
                onChange={(e) => setLast(e.target.value)}
              />
              {errors.last && (
                <small className="text-danger">{errors.last}</small>
              )}
            </div>
            {/* Email */}
            <div>
              <label className="form-label mt-2">Email*</label>
              <input
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <small className="text-danger">{errors.email}</small>
              )}
            </div>
            {/* Avatar */}
            <label className="form-label mt-2">Profile Image Link (.jpg)</label>
            <input
              className="form-control"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            {errors.avatar && (
              <small className="text-danger">{errors.avatar}</small>
            )}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={submit}
              disabled={!isFormValid}
            >
              {editingUser ? "Save" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
