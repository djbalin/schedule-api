// In this file, I just created a mock in-memory database. Having been brought up in Java,
// I like maps and sets and the O(1) lookup complexity they provide, but they are probably overkill for this small demo.

import { MEETING_BEGIN_TIMES, MEETING_DURATION } from "./meetings";
import { Meeting, Person } from "./types";
import { generateMeetingId, generatePersonId } from "./utils";

const persons = new Map<string, Person>();
const meetings = new Map<number, Meeting>();
export const db = { persons: persons, meetings: meetings };

export function getPersonByEmail(personEmail: string): Person | undefined {
  return persons.get(personEmail);
}

export function createPerson(name: string, email: string): boolean {
  email = email.toLowerCase();
  if (persons.has(email)) {
    // The email already exists
    return false;
  } else {
    // The email doesn't exist, can add person with initially empty meetings array
    const person: Person = {
      name,
      email,
      meetings: new Set(),
      id: generatePersonId(),
      availableTimeslots: new Set(MEETING_BEGIN_TIMES),
    };
    persons.set(email, person);
    return true;
  }
}

export function createMeeting(
  participants: string[],
  beginTime: number
): boolean {
  const meetingId = generateMeetingId();
  beginTime = Number(beginTime);

  for (let participant of participants) {
    participant = participant.toLowerCase();
    const person = db.persons.get(participant);
    if (!person) {
      throw new Error(`Person with email ${participant} does not exist`);
    } else {
      if (!person.availableTimeslots.has(beginTime)) {
        console.error(
          `Person with email ${participant} is not available at ${beginTime}`
        );
        return false;
      }
    }
  }
  const meeting: Meeting = {
    beginTime: beginTime,
    participants: new Set(participants),
    duration: MEETING_DURATION,
    id: meetingId,
  };

  // Very poor implementation for now. I only want to add the meeting to any of the participants' calendars if *all* the
  // request participants can attend. This is an poorly performing implementation: two consecutive loops over the participant array,
  // but for now, it should work.
  for (let participant of participants) {
    participant = participant.toLowerCase();
    const person = db.persons.get(participant);
    person!.meetings.add(meeting.id);
    person!.availableTimeslots.delete(meeting.beginTime);
  }

  meetings.set(meetingId, meeting);
  return true;
}

// export function getPersons() {
//   return Array.from(persons.values());
//   // return persons.values();
//   // return Array.from(persons.values());
// }

// export function getMeetings() {
//   return Array.from(meetings.values());
// }
