import express, { Request, Response } from "express";
import { NotFoundError } from "@aaecomm/common";
import { Specializimi } from "../../models/specializimi";
import { Semundja } from "../../models/semundja";

const router = express.Router();

router.delete(
  "/api/specializimi/:id",
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const specializimi = await Specializimi.findById(id);

    if (!specializimi) {
      throw new NotFoundError();
    }

    await Semundja.deleteMany({ specializimiId: specializimi._id });

    await specializimi.deleteOne()

    res.status(204).send(true);
  }
);

export { router as deleteSpecializimiRouter };
