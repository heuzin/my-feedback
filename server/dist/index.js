"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const json_server_1 = __importDefault(require("json-server"));
const path_1 = __importDefault(require("path"));
const server = json_server_1.default.create();
const router = json_server_1.default.router("db.json"); // <== Will be created later
const middlewares = json_server_1.default.defaults();
const port = process.env.PORT || 5000; // <== You can change the port
server.use(middlewares);
server.use(router);
if (process.env.NODE_ENV === "production") {
    const __dirname = path_1.default.resolve();
    server.use(express_1.default.static(path_1.default.join(__dirname, "/client/build")));
    server.get("*", (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, "client", "build", "index.html"));
    });
}
else {
    server.get("/", (req, res) => {
        res.send("API is running...");
    });
}
server.listen(port);
