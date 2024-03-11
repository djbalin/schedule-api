import { Request, Response } from "express";
import { db } from "../lib/db";

export function getPersonsController(req: Request, res: Response) {
  const persons = db.persons;
  if (persons.size === 0) {
    res.status(404).send("No persons found");
  } else {
    res
      .status(200)
      // Parse Sets:  https://stackoverflow.com/questions/31190885/json-stringify-a-set
      .send(
        JSON.stringify(Array.from(persons.values()), (_key, value) =>
          value instanceof Set ? [...value] : value
        )
      );
  }
}
