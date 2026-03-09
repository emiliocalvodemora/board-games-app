import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import Game from "./Game";
import React from "react";

describe("Game component", () => {
  const mockGame = {
    id: 1,
    name: "Catan",
    description: "Juego de estrategia",
    min_players: 2,
    max_players: 4
  };

  it("Renderiza la información del juego", () => {
    render(<Game game={mockGame} onClick={() => {}} />);
    expect(screen.getByText("Catan")).toBeInTheDocument();
    expect(screen.getByText("Juego de estrategia")).toBeInTheDocument();
    expect(screen.getByText("2 - 4 jugadores")).toBeInTheDocument();
  });

  it("Llama a onClick cuando se pulsa el juego", () => {
    const handleClick = vi.fn();
    render(<Game game={mockGame} onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledWith(mockGame);
  });
});