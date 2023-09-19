import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { NotFoundError, validateRequest } from "@aaecomm/common";
import { Specializimi } from "../../models/specializimi";

const router = express.Router();

router;
router.put(
  "/api/specializimi/:id",
  [body("name").notEmpty().withMessage("Name is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    const {name} = req.body
    const { id } = req.params;

    const specializimi = await Specializimi.findById(id);

    if (!specializimi) {
      throw new NotFoundError();
    }

    specializimi.set({
      name
    })
    await specializimi.save()

    res.send(specializimi)
  }
);

export { router as updateSpecializimiRouter };
