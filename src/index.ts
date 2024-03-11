import express, { Request, Response } from "express";
import { launchCLI } from "./lib/cli";
import { PORT } from "./lib/utils";

const app = express();
const body = require("body-parser");

app.use(body.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/persons", require("./routes/persons"));
app.use("/meetings", require("./routes/meetings"));
app.use("/available-timeslots", require("./routes/available-timeslots"));

app.listen(PORT, () => {
  // console.log(`Listening on port ${PORT}\n`);
});

launchCLI();
