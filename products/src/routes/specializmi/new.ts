import { body } from "express-validator";
import { app } from "../../app";
import express, { Request, Response } from "express";
import { CompletionTriggerKind } from "typescript";
import { validateRequest } from "@aaecomm/common";
import { Specializimi } from "../../models/specializimi";

const router = express.Router();

router.post(
    "/api/specializimi",
    [
      body("name").notEmpty().withMessage("Name is required"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
      const {name} = req.body

      const specializimi = Specializimi.build({
        name
      })
      await specializimi.save()

      res.status(201).send(specializimi)
    }
);

export { router as newSpecializimiRouter };