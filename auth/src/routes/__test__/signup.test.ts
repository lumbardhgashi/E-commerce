import request from "supertest";
import { app } from "../../app";
import { User } from "../../models/users";

describe("POST /api/users/signup", () => {
  it("returns a 201 status code and creates a user if valid input is provided", async () => {
    const email = "test@example.com";
    const password = "testpassword";

    const response = await request(app)
      .post("/api/users/signup")
      .send({
        email: email,
        password: password,
      })
      .expect(201);

    expect(response.body.email).toEqual(email);

    const user = await User.findOne({ email: email });
    expect(user).toBeDefined();
    expect(user!.email).toEqual(email);
    expect(user!.password).not.toEqual(password); // should be hashed
  });

  it("returns a 400 status code if the email already exists", async () => {
    const existingUser = User.build({
      email: "test@example.com",
      password: "testpassword",
    });
    await existingUser.save();

    const response = await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@example.com",
        password: "newpassword",
      })
      .expect(400);

    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toEqual("Email in use");
  });

  it("returns a 400 status code if an invalid email is provided", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({
        email: "notanemail",
        password: "testpassword",
      })
      .expect(400);

    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toEqual("Email must be valid");
  });

  it("returns a 400 status code if an invalid password is provided", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@example.com",
        password: "x",
      })
      .expect(400);

    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toEqual(
      "Password must be between 4 and 20 char"
    );
  });

  it("sets a cookie after a successful sign up", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@example.com",
        password: "newpassword",
      })
      .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
  })
});
