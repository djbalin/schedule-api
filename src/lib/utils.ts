import { getPersonByEmail } from "./db";

export const PORT = 3000;

let meetingIdCounter = 0;
let personIdCounter = 0;

export function generateMeetingId() {
  return meetingIdCounter++;
}

export function generatePersonId() {
  return personIdCounter++;
}

// Apparently there is no native method for the intersection of sets in Javascript...
function unionMultipleSets<Type>(sets: Set<Type>[]): Set<Type> {
  return sets.reduce((acc: Set<Type>, current: Set<Type>) => {
    return new Set([...acc].filter((x) => current.has(x)));
  });
}

export function findAvailableTimeslots(personEmails: string[]): Set<number> {
  const timeSlotsOfPersons = personEmails.map((email) => {
    const person = getPersonByEmail(email);
    if (!person) {
      throw new Error(`Person with email ${email} does not exist`);
    }
    return person.availableTimeslots;
  });
  return unionMultipleSets(timeSlotsOfPersons);
}
