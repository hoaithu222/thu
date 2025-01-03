
import { Router } from "express"
import { addCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from "../controller/category.controller.js";
import auth from "../middleware/auth.js";
const categoryRouter = Router();
categoryRouter.post("/add-category", auth, addCategoryController)
categoryRouter.put("/update-category", auth, updateCategoryController)
categoryRouter.get("/get-category", getCategoryController)
categoryRouter.delete("/delete", deleteCategoryController)




export default categoryRouter;
