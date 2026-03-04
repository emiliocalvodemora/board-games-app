import React from "react";

// Componente de sidebar genérico
export default function Sidebar({ children }) {
  return (
    <aside className="w-80 h-screen bg-gray-100 p-4 overflow-y-auto border-l border-gray-300">
      {children}
    </aside>
  );
}