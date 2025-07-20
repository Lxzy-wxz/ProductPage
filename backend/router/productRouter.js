import {
  getproducts,
  createProduct,
  updateProducts,
  deleteProduct,
} from "../controller/productController.js";
import express from "express";

const router = express.Router();

router.get("/", getproducts);
router.post("/", createProduct);
router.patch("/:id", updateProducts);
router.delete("/:id", deleteProduct);

export default router;
