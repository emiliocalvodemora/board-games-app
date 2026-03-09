import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import PlayerHome from "./PlayerHome";
import React from "react";

// Mock de componentes hijos
vi.mock("../Events/EventList.jsx", () => ({
  default: () => <div data-testid="event-list">EventList</div>
}));

vi.mock("../Games/GameList.jsx", () => ({
  default: () => <div data-testid="game-list">GameList</div>
}));

vi.mock("../Matches/MatchList.jsx", () => ({
  default: () => <div data-testid="match-list">MatchList</div>
}));

describe("PlayerHome component", () => {
  it("muestra el mensaje de bienvenida con el nombre del usuario", () => {
    const user = { name: "Emilio", role: "player" };
    render(<PlayerHome user={user} />);
    expect(screen.getByText(/¡Bienvenido, Emilio!/i)).toBeInTheDocument();
    expect(screen.getByText(/En esta página puedes ver tus eventos y partidas, así como gestionar tu participación en ellos./i)).toBeInTheDocument();
  });

  it("renderiza MatchList, GameList y EventList siempre", () => {
    const user = { name: "Emilio", role: "player" };
    render(<PlayerHome user={user} />);
    expect(screen.getByTestId("match-list")).toBeInTheDocument();
    expect(screen.getByTestId("game-list")).toBeInTheDocument();
    expect(screen.getByTestId("event-list")).toBeInTheDocument();
  });
});