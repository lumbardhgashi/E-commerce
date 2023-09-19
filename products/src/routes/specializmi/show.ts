import express, { Request, Response } from "express";
import { NotFoundError } from "@aaecomm/common";
import { Specializimi } from "../../models/specializimi";

const router = express.Router();

router.get("/api/specializimi/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const specializimi = await Specializimi.findById(id);

  res.send(specializimi)
});

export { router as showSpecializimiRouter };
