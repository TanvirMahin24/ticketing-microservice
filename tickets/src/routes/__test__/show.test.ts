import request from "supertest";
import { app } from "../../app";

it("Return 404 if not found", async () => {
  await request(app).get("/api/tickets/lasdj").send().expect(404);
});
