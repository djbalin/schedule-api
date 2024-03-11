import { Request, Response } from "express";
import { findAvailableTimeslots } from "../lib/utils";

export function getAvailableTimeslotsController(req: Request, res: Response) {
  const personEmails: string[] = req.params.personEmails
    .split("-")
    .map((email) => email.toLowerCase());
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
}
