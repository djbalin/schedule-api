import { Request, Response } from "express";
import { db, getPersonByEmail } from "../lib/db";

// This is a very round-about way of doing it. I want to have the person ID as the URL parameter, but since
// I am indexing persons by their email in my mock DB, I have to do it in this round-about way for now.
export function getScheduleController(req: Request, res: Response) {
  const email = req.params.email.toLowerCase();

  const person = getPersonByEmail(email);

  if (!person) {
    res.status(404).send(`Person with email ${email} not found`);
  } else {
    const upcomingMeetings = Array.from(person.meetings).map((meetingId) => {
      const meeting = db.meetings.get(meetingId);
      if (!meeting) {
        throw new Error("Meeting not found");
      }
      return `${meeting.beginTime} - ${meeting.beginTime + 1}`;
    });
    res
      .status(200)
      // Meetings are not ordered chronologically, will not fix this for now.
      // The response is also not formatted at all.
      .send(JSON.stringify(upcomingMeetings));
  }
}
