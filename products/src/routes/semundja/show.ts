import express, { Request, Response } from "express";
import { NotFoundError } from "@aaecomm/common";
import { Semundja } from "../../models/semundja";

const router = express.Router();

router.get("/api/semundja/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const semundja = await Semundja.findById(id);

  res.send(semundja)
});

export { router as showSemundjaRouter };
