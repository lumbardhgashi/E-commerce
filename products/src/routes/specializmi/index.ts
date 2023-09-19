import express, { Request, Response } from "express";
import { Specializimi } from "../../models/specializimi";

const router = express.Router();

router.get("/api/specializimi", async (req: Request, res: Response) => {
  const specializimet = await Specializimi.find()

  res.send(specializimet)

});
  
  export { router as indexSpecializimiRouter };