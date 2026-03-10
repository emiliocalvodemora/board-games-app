import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import Event from "./Event";

describe("Componente evento", () => {
  const mockEvent = {
    id: 1,
    title: "Torneo Catan",
    description: "Partida competitiva",
    event_location: "Madrid",
    event_date: "2026-03-10T18:00:00"
  };

  it("Renderiza la información del evento", () => {
    render(
      <Event
        user={{ role: "player" }}
        event={mockEvent}
        isJoinable={true}
      />
    );
    expect(screen.getByText("Torneo Catan")).toBeInTheDocument();
    expect(screen.getByText("Partida competitiva")).toBeInTheDocument();
    expect(screen.getByText("Madrid")).toBeInTheDocument();
  });

  it("Llama a onJoin cuando el jugador pulsa el botón", () => {
    const onJoin = vi.fn();
    render(
      <Event
        user={{ role: "player" }}
        event={mockEvent}
        isJoinable={true}
        onJoin={onJoin}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onJoin).toHaveBeenCalledTimes(1);
  });

  it("Llama a onLeave cuando el jugador pulsa el botón", () => {
    const onLeave = vi.fn();
    render(
      <Event
        user={{ role: "player" }}
        event={mockEvent}
        isJoinable={false}
        onLeave={onLeave}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onLeave).toHaveBeenCalledTimes(1);
  });

  it("Llama a onDelete si el usuario es admin", () => {
    const onDelete = vi.fn();
    render(
      <Event
        user={{ role: "admin" }}
        event={mockEvent}
        onDelete={onDelete}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});