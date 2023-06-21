import request from "supertest";
import { app } from "../../app";
import { getCurrentUserCookie } from "../../test/getCurrentUserCookie";

it("[POST] /api/tickets => error without parameter", async () => {
  const res = await request(app).post("/api/tickets").send({});

  expect(res.status).not.toEqual(404);
});
it("Can not be accessed by unauthenticated users", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});
it("accessed by authenticated users", async () => {
  const cookie = await getCurrentUserCookie();
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({});
});
it("Will throw error if invalid title provided", async () => {
  const cookie = await getCurrentUserCookie();
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({});
});
