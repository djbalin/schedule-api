import express from "express";
import { MEETING_BEGIN_TIMES } from "../lib/meetings";
import { createMeeting } from "../lib/db";

export function createMeetingController(
  req: express.Request,
  res: express.Response
) {
  let {
    participants,
    beginTime,
  }: { participants: string[]; beginTime: number } = req.body;
  //   MEETING_BEGIN_TIMES;

  beginTime = Number(beginTime);

  if (MEETING_BEGIN_TIMES.includes(beginTime)) {
    try {
      const result = createMeeting(participants, beginTime);

      if (result) {
        res.status(200).json({
          message: `Meeting at ${beginTime} created with participants ${participants.join(
            ", "
          )}`,
        });
      } else {
        res.status(400).json({
          message: `Meeting at ${beginTime} could not be created with participants ${participants.join(
            ", "
          )}`,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  } else {
    res.status(400).json({
      message: `Meetings can only begin at either ${MEETING_BEGIN_TIMES.join(
        ", "
      )} o'clock and not at ${beginTime}`,
    });
  }
}
