import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import NavBar from "./NavBar";
import axios from "axios";
import React from "react";

vi.mock("axios");

vi.mock("react-router-dom", () => ({
  Link: ({ children }) => <a>{children}</a>,
  useNavigate: () => vi.fn()
}));

describe("NavBar component", () => {

  it("Muestra botones de inicio de sesión cuando no hay usuario logueado", () => {
    render(<NavBar user={null} setUser={() => {}} />);
    expect(screen.getByText(/Iniciar sesión/i)).toBeInTheDocument();
    expect(screen.getByText(/Registrarse/i)).toBeInTheDocument();
  });

  it("Muestra el nombre del usuario cuando está logueado", () => {
    const user = { name: "Carlos" };
    render(<NavBar user={user} setUser={() => {}} />);
    expect(screen.getByText("Carlos")).toBeInTheDocument();
  });

  it("Abre el menú desplegable al hacer click", () => {
    const user = { name: "Carlos" };
    render(<NavBar user={user} setUser={() => {}} />);
    fireEvent.click(screen.getByText("Carlos"));
    expect(screen.getByText(/Cerrar sesión/i)).toBeInTheDocument();
  });

});