import request from "supertest";
import { app } from "../../app";
import { User } from "../../models/users";

describe("POST /api/users/signin", () => {
  it("fails when a username that does not exist is supplied", async () => {
    await request(app)
      .post("/api/users/signin")
      .send({
        username: "username",
        password: "password",
      })
      .expect(400);
  });
  it("fails when a incorrect password is supplied", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        username: "username",
        password: "password",
      })
      .expect(201);
    await request(app)
      .post("/api/users/signin")
      .send({
        username: "username",
        password: "",
      })
      .expect(400);
  });
  it("responds with a cookie when valid creds", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        username: "username",
        password: "password",
      })
      .expect(201);
    const response = await request(app)
      .post("/api/users/signin")
      .send({
        username: "username",
        password: "password",
      })
      .expect(200);
    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
