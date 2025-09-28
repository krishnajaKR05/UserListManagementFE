import React from "react";

export default function Loader({ size = 24 }: { size?: number }) {
  return (
    <span
      className="spinner-border spinner-border-sm"
      role="status"
      style={{ width: size, height: size }}
      aria-hidden="true"
    ></span>
  );
}
