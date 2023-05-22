import { requireAuth, validateRequest } from "@aaecomm/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Cart } from "../models/cart";
import { natsWrapper } from "../nats-wrapper";
