import express, { Request, Response } from "express";
import { NotFoundError } from "@aaecomm/common";
import { Specializimi } from "../../models/specializimi";
import { Semundja } from "../../models/semundja";

const router = express.Router();

router.delete(
  "/api/semundja/:id",
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const semundja = await Semundja.findById(id);

    if (!semundja) {
      throw new NotFoundError();
    }

    await semundja.deleteOne()

    res.status(204).send(true);
  }
);

export { router as deleteSemundjaRouter };
