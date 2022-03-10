import express from "express";
import jsonServer from "json-server";
import path from "path";
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // <== Will be created later
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5000; // <== You can change the port

server.use(middlewares);
server.use(router);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  server.use(express.static(path.join(__dirname, "/client/build")));

  server.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  server.get("/", (req, res) => {
    res.send("API is running...");
  });
}

server.listen(port);
