import { getAvailableTimeslotsController } from "../controllers/getAvailableTimeslots";

const express = require("express");
const router = express.Router();

// Assumes that emails are separated by a dash (-). Bad implementation for now, what if an actual email address contains a dash?
router.get("/:personEmails", getAvailableTimeslotsController);

module.exports = router;
