import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import axios from "axios";
import Match from "./Match";
import React from "react";

vi.mock("axios");

describe("Match component", () => {
  const mockMatch = {
    id: 1,
    event_id: 5,
    game_name: "Catan",
    max_players: 4,
    start_time: "2026-03-10T18:00:00",
    end_time: "2026-03-10T20:00:00"
  };

  it("Renderiza la información básica de la partida", async () => {
    axios.get.mockResolvedValueOnce({
      data: { data: [{ player_id: 1, score: 10 }] }
    });
    axios.get.mockResolvedValueOnce({
      data: { data: { id: 1, name: "Juan" } }
    });
    render(<Match match={mockMatch} />);
    expect(await screen.findByText(/Partida del evento/i)).toBeInTheDocument();
    expect(screen.getByText(/Catan/i)).toBeInTheDocument();
  });

  it("Llama a onClick cuando se pulsa la partida si se puede unir", async () => {
    const onClick = vi.fn();
    axios.get.mockResolvedValueOnce({
      data: { data: [] }
    });
    render(<Match match={mockMatch} onClick={onClick} isJoinable={true} />);
    const button = await screen.findByRole("button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

});