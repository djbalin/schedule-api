import { Request, Response } from "express";
import { db } from "../lib/db";
// import { getMeetings } from "../lib/db";

export function getMeetingsController(req: Request, res: Response) {
  //   const persons = getPersons();
  const meetings = db.meetings;
  if (meetings.size === 0) {
    res.status(404).send("No meetings found");
  } else {
    res
      .status(200)
      // Parse Sets:  https://stackoverflow.com/questions/31190885/json-stringify-a-set
      .send(
        JSON.stringify(Array.from(meetings.values()), (_key, value) =>
          value instanceof Set ? [...value] : value
        )
      );
  }
}
