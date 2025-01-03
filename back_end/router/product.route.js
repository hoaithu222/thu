import { Router } from "express"
import { createProductController, getProductController } from "../controller/product.controller.js";
import auth from "../middleware/auth.js";


const productRouter = Router();

productRouter.post("/create", auth, createProductController)
productRouter.post("/get", getProductController)


export default productRouter;