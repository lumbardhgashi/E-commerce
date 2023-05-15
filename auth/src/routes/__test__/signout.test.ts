import request from "supertest";
import { app } from "../../app";
import { User } from "../../models/users";

describe("POST /api/users/signout", () => {
  it("clears cookie when successful", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        username:"username",
        email: "test@test.com",
        password: "password",
      })
      .expect(201);
    const response = await request(app)
      .post("/api/users/signout")
      .send({})
      .expect(200);
    expect(
      response.get("Set-Cookie")[0] ===
        "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
    );
  });
});
