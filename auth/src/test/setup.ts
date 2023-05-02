import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";

declare global {
  namespace NodeJS {
    interface Global {
      signin: () => Promise<string[]>;
    }
  }
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "asddsa";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) { 
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

declare const global: NodeJS.Global & typeof globalThis;

global.signin = async () => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app).post("/api/users/signup").send({
    email,
    password,
  });

  expect(response.status).toEqual(201);

  const cookie = response.get("Set-Cookie");

  console.log("setcookie", {cookie});
  

  return cookie;
};