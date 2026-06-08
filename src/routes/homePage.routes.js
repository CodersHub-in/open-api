import { Router } from "express";
import { homePageApi } from "../controllers/homePageApi/homePageApi.controller.js";

const router = Router();

router.route("/").get(homePageApi)


export default router