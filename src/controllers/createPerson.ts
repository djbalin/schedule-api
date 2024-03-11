import { createPerson } from "../lib/db";
import express from "express";
export function createPersonController(
  req: express.Request,
  res: express.Response
) {
  const { name, email } = req.body;
  const result = createPerson(name, email);

  if (result) {
    res.status(201).json({
      message: `Person created with email ${email.toLowerCase()}`,
    });
  } else {
    res.status(400).json({
      message: `Person with email ${email.toLowerCase()} already exists`,
    });
  }
}
