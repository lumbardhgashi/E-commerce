import { body } from "express-validator";
import express, { Request, Response } from "express";
import { validateRequest } from "@aaecomm/common";
import { Semundja } from "../../models/semundja";

const router = express.Router();

router.post(
  "/api/semundja",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("specializimiId").notEmpty().withMessage("Specializimi is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, specializimiId } = req.body;

    const semundja = Semundja.build({
      name,
      specializimiId,
    });
    await semundja.save();

    res.status(201).send(semundja);
  }
);

export { router as newSemundjaRouter };
