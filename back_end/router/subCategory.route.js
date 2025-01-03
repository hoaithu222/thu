import { Router } from "express";
import { addSubCategoryController, deleteSubCategoryController, getSubCategoryController, updateSubCategoryController } from "../controller/subCategory.controller.js";
import auth from "../middleware/auth.js";

const subCategoryRouter = Router();

subCategoryRouter.post('/add-subCategory', auth, addSubCategoryController)
subCategoryRouter.get('/get', getSubCategoryController)
subCategoryRouter.put('/update', auth, updateSubCategoryController)
subCategoryRouter.delete('/delete', auth, deleteSubCategoryController)


export default subCategoryRouter;