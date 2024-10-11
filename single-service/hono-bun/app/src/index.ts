import { Hono } from "hono";
import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV}` });

console.log(process.env.NODE_ENV, "<-- Current Environment");
console.log(process.env.PORT, "<-- Current Port");

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default {
  port: Number(process.env.PORT),
  fetch: app.fetch,
};
