import React from "react";
import { render, screen } from "@testing-library/react";
import AdminHome from "./AdminHome";
import {describe, expect, it} from "vitest";
import "@testing-library/jest-dom/vitest";

describe("AdminHome component", () => {
  const mockUser = { name: "Admin" };
    beforeEach(() => {
        render(<AdminHome user={mockUser} />);
    });

    it("Renderiza correctamente el mensaje de bienvenida", () => {
        const welcomeMessage = screen.getByText(/¡Bienvenido a la página de administración, Admin!/i);
        expect(welcomeMessage).toBeInTheDocument();
    });

    it("Renderiza correctamente la lista de eventos", () => {
        const infoMessage = screen.getByText(/Aquí puedes crear y eliminar eventos para que los jugadores puedan participar en ellos./i);
        expect(infoMessage).toBeInTheDocument();
    }); 

});