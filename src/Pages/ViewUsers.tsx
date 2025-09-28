import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import {
  fetchUsersPage,
  User,
  addUser,
  updateUser,
  deleteUser,
} from "../Store/Slice/usersSlice";
import Loader from "../Components/Loader";
import UserTable from "../Components/UserTable";
import UserCard from "../Components/UserCard";
import Pagination from "../Components/Pagination";
import ManageUserModal from "../Components/ManageUserModal";
import useDebounce from "../Hooks/useDebounce";

export default function ViewUsers() {
  const dispatch = useAppDispatch();
  const usersState = useAppSelector((s) => s.users);
  const [view, setView] = useState<"table" | "card">("table");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 250);
  const [page, setPage] = useState(1);
  const pageSize = 6; 
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);

  useEffect(() => {
    dispatch(fetchUsersPage(1));
    dispatch(fetchUsersPage(2));
  }, [dispatch]);

  const filtered = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    const list = usersState.all || [];
    if (!q) return list;
    return list.filter((u) =>
      (u.first_name + " " + u.last_name + " " + u.email)
        .toLowerCase()
        .includes(q)
    );
  }, [usersState.all, debouncedSearch]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const onCreate = (u: User) => {
    dispatch(addUser(u));
  };
  const onUpdate = (u: User) => {
    dispatch(updateUser(u));
  };
  const onDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    dispatch(deleteUser(id));
  };

  return (
    <div className="vh-100 d-flex flex-column">
      <div className="bg-dark text-white w-100 d-flex justify-content-end align-items-center p-3">
        <h5 className="m-2 mb-0">UserName</h5>
        <button className="btn btn-danger btn-sm ms-2">Logout</button>
      </div>

      <div className="container bg-white h-75 mt-4 p-4">
        <div className="row align-items-center mb-3">
          <div className="col-6">
            <h3>Users</h3>
          </div>
          <div className="col-4">
            <div className="input-group">
              <input
                className="form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email"
              />
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
            </div>
          </div>
          <div className="col-2 text-end">
            <button
              className="btn btn-primary"
              onClick={() => {
                setEditing(null);
                setShowModal(true);
              }}
            >
              Create User
            </button>
          </div>
        </div>

        <div className="mb-3">
          <button
            className={`btn btn-outline-dark me-2 ${
              view === "table" ? "active" : ""
            }`}
            onClick={() => setView("table")}
          >
            <i className="bi bi-table me-2"></i>Table
          </button>
          <button
            className={`btn btn-outline-dark ${
              view === "card" ? "active" : ""
            }`}
            onClick={() => setView("card")}
          >
            <i className="bi bi-card-list me-2"></i>Card
          </button>
        </div>

        {usersState.loading ? (
          <Loader />
        ) : (
          <>
            {view === "table" ? (
              <UserTable
                users={current}
                onEdit={(u) => {
                  setEditing(u);
                  setShowModal(true);
                }}
                onDelete={onDelete}
              />
            ) : (
              <div className="d-flex flex-wrap gap-3">
                {current.map((u) => (
                  <UserCard
                    key={u.id}
                    user={u}
                    onEdit={(user) => {
                      setEditing(user);
                      setShowModal(true);
                    }}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="container mt-4">
        <Pagination
          page={page}
          totalPages={totalPages}
          onPage={(p) => setPage(p)}
        />
      </div>

      <ManageUserModal
        show={showModal}
        editingUser={editing}
        onClose={() => setShowModal(false)}
        onSubmit={(u) => {
          if (editing) onUpdate(u);
          else onCreate(u);
        }}
      />
    </div>
  );
}
