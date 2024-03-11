// This could be implemented in many different ways. For now, for simplicity, I keep track of the relation between persons and the meetings they
// participate in by a unique meeting ID.

import { MEETING_BEGIN_TIMES, MEETING_DURATION } from "./meetings";

// Fulfilling the uniqueness constraints of meeting IDs and person email addresses is simply

// Implementational compromise: I implement ghetto hashmaps (key-value stores) for keeping track of meetings and persons.
// The keys are the "ids" of each which I manually keep track of here and ensure are unique.
export type Meeting = {
  beginTime: number;
  duration: number;
  id: number;
  participants: Set<string>;
};

// The "id" field on Person could maybe be hashed from the unique email address in a real-world scenario?
// For now I will just keep track of it manually.
export type Person = {
  name: string;
  email: string;
  meetings: Set<number>;
  id: number;
  availableTimeslots: Set<number>;
};
