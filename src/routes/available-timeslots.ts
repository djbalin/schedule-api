import { getAvailableTimeslotsController } from "../controllers/getAvailableTimeslots";

const express = require("express");
const router = express.Router();

// Assumes that emails are separated by a dash (-) in the URL. Bad implementation, what if an actual email address contains a dash?
// Would rather query by person IDs in the real world.
router.get("/:personEmails", getAvailableTimeslotsController);

module.exports = router;
