import { createMeetingController } from "../controllers/createMeeting";
import { getMeetingsController } from "../controllers/getMeetings";

const express = require("express");
const router = express.Router();

router.get("/", getMeetingsController);
router.post("/", createMeetingController);

module.exports = router;
