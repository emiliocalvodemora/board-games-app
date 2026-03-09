import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import axios from "axios";
import MatchList from "./MatchList";
import React from "react";

vi.mock("axios");

vi.mock("../Matches/Match.jsx", () => ({
  default: ({ match }) => <div>{match.event_id ? "Partida del evento" : "Partida sin evento"}</div>
}));

describe("MatchList component", () => {
  const mockUser = { id: 1 };
  const mockMatches = [
    {
      id: 1,
      event_id: null,
      game_name: "Catan",
      max_players: 4,
      start_time: "2026-03-10T18:00:00",
      end_time: "2026-03-10T20:00:00"
    }
  ];

  it("Muestra las partidas del usuario", async () => {
    axios.get
      .mockResolvedValueOnce({ data: { data: mockMatches } })
      .mockResolvedValueOnce({ data: { data: [] } });
    render(<MatchList user={mockUser} />);
    expect(await screen.findByText(/Partida sin evento/i)).toBeInTheDocument();
  });

  it("Muestra mensaje cuando no hay partidas", async () => {
    axios.get
      .mockResolvedValueOnce({ data: { data: [] } })
      .mockResolvedValueOnce({ data: { data: [] } });
    render(<MatchList user={mockUser} />);
    expect(await screen.findByText(/No tienes partidas registradas/i)).toBeInTheDocument();
  });

});