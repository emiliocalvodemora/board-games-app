import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import EventList from "./EventList";
import React from "react";


describe("EventList component", () => {
  const mockUser = {
    id: 1,
    role: "player"
  };

  const mockEvents = [
    {
      id: 1,
      title: "Torneo Catan",
      description: "Partida competitiva",
      event_location: "Madrid",
      event_date: "2026-03-10T18:00:00"
    }
  ];

  it("Muestra el título para jugadores", () => {
    render(<EventList user={{ role: "player" }} />);
    expect(
      screen.getByText(/Listado de Eventos/i)
    ).toBeInTheDocument();
  });

  it("Muestra el botón crear evento para admin", () => {
    render(<EventList user={{ role: "admin" }} />);
    expect(
      screen.getByRole("button", { name: /crear evento/i })
    ).toBeInTheDocument();
  });
});