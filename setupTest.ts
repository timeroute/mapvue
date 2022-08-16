import { beforeEach, vi } from "vitest";

vi.mock("mapbox-gl");

beforeEach(async (context) => {
  context.accessToken =
    "pk.eyJ1IjoiY2FydG9kYmluYyIsImEiOiJja202bHN2OXMwcGYzMnFrbmNkMzVwMG5rIn0.Zb3J4JTdJS-oYNXlR3nvnQ";
});
