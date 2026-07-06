import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import usersRouter from "./routes/usersRouter.js";
import contactsRouter from "./routes/contactsRouter.js";
import swaggerDocument from "./docs/swagger.js";

const { DB_HOST, PORT = 3210 } = process.env;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/api-docs.json", (_, res) => {
  res.json(swaggerDocument);
});

app.get("/api-docs", (_, res) => {
  res.send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Contact Manager API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.onload = () => {
        window.ui = SwaggerUIBundle({
          url: "/api-docs.json",
          dom_id: "#swagger-ui"
        });
      };
    </script>
  </body>
</html>`);
});

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
