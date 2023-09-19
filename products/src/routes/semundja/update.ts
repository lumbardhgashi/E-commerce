import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { NotFoundError, validateRequest } from "@aaecomm/common";
import { Semundja } from "../../models/semundja";

const router = express.Router();

router;
router.put(
  "/api/semundja/:id",
  [body("name").notEmpty().withMessage("Name is required")],
  [body("specializimiId").notEmpty().withMessage("specializimiId is required")],

  validateRequest,
  async (req: Request, res: Response) => {
    const {name, specializimiId} = req.body
    const { id } = req.params;

    const semundja = await Semundja.findById(id);

    if (!semundja) {
      throw new NotFoundError();
    }

    semundja.set({
      name,
      specializimiId
    })
    await semundja.save()

    res.send(semundja)
  }
);

export { router as updateSemundjaRouter };
