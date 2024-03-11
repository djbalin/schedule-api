import { createPersonController } from "../controllers/createPerson";
import { getPersonsController } from "../controllers/getPersons";
import { getScheduleController } from "../controllers/getSchedule";

const express = require("express");

const router = express.Router();

router.get("/", getPersonsController);

router.post("/", createPersonController);

router.get("/:email/schedule", getScheduleController);

module.exports = router;
