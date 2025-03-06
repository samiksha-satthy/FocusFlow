import React from "react";

function IconCheck({ strokeColor = "black" }: { strokeColor?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 6v6l3 2"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3C7.03 3 3 7.03 3 12"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M21 12c0 4.97-4.03 9-9 9-2.58 0-4.91-1.06-6.6-2.77"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 3h5v5"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 3l-3.5 3.5"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

    </svg>
  );
}

export default IconCheck;