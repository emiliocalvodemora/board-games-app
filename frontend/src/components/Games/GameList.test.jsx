import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import GameList from "./GameList";
import axios from "axios";
import React from "react";

vi.mock("axios");

describe("GameList component", () => {
  const mockGames = [
    {
      id: 1,
      name: "Catan",
      description: "Juego de estrategia",
      min_players: 3,
      max_players: 4
    },
    {
      id: 2,
      name: "Carcassonne",
      description: "Juego de colocación de losetas",
      min_players: 2,
      max_players: 5
    }
  ];

  it("Renderiza la lista de juegos", async () => {
    axios.get.mockResolvedValue({
      data: { data: mockGames }
    });
    render(<GameList user={{ id: 1 }} />);
    await waitFor(() => {
      expect(screen.getByText("Catan")).toBeInTheDocument();
      expect(screen.getByText("Carcassonne")).toBeInTheDocument();
    });
  });

  it("Renderiza el botón de añadir juego", async () => {
    axios.get.mockResolvedValue({
      data: { data: [] }
    })
    render(<GameList user={{ id: 1 }} />);
    const addButton = await screen.findByRole("button", { name: /añadir juego/i });
    expect(addButton).toBeInTheDocument();
  });
});