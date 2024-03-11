import { Request, Response } from "express";
import { db } from "../lib/db";
import { findAvailableTimeslots } from "../lib/utils";
// import { getMeetings } from "../lib/db";

export function getAvailableTimeslotsController(req: Request, res: Response) {
  const personEmails: string[] = req.params.personEmails
    .split("-")
    .map((email) => email.toLowerCase());
  //   const meetings = db.meetings;
  try {
    const availableTimeslots = findAvailableTimeslots(personEmails);
    if (availableTimeslots.size === 0) {
      res
        .status(200)
        .send(`No available timeslots found for ${personEmails.join(", ")}`);
    } else {
      res
        .status(200)
        // Parse Sets:  https://stackoverflow.com/questions/31190885/json-stringify-a-set
        .send(
          JSON.stringify(availableTimeslots, (_key, value) =>
            value instanceof Set ? [...value] : value
          )
        );
    }
  } catch (error) {
    console.error(error);
    res.status(404).send(`Error looking up ${personEmails.join(", ")}`);
  }

  //   if (availableTimeslots.size === 0) {
  //     res.status(404).send("No available timeslots found");
  //   } else {
  //     res
  //       .status(200)
  //       // Parse Sets:  https://stackoverflow.com/questions/31190885/json-stringify-a-set
  //       .send(
  //         JSON.stringify(meetings, (_key, value) =>
  //           value instanceof Set ? [...value] : value
  //         )
  //       );
  //   }
}
