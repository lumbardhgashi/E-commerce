import express, { Request, Response } from "express";
import { Specializimi } from "../../models/specializimi";
import { Semundja } from "../../models/semundja";

const router = express.Router();

router.get("/api/semundja", async (req: Request, res: Response) => {
  const semundjet = await Semundja.find().populate("specializimiId")

  res.send(semundjet)
  

});
  
  export { router as indexSemundjaRouter };