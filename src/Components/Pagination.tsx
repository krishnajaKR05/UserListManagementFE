import React from "react";

export default function Pagination({
  page,
  totalPages,
  onPage,
}: {
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav>
      <ul className="pagination justify-content-end">
        <li className={`page-item me-2 ${page === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onPage(page - 1)}>
            {"<"}
          </button>
        </li>
        {pages.map((p) => (
          <li
            key={p}
            className={`page-item me-2 ${p === page ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => onPage(p)}>
              {p}
            </button>
          </li>
        ))}
        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onPage(page + 1)}>
            {">"}
          </button>
        </li>
      </ul>
    </nav>
  );
}
