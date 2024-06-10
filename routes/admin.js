import { Router } from "express";
import adminAuthenticate from "../middleware/adminAuth.js";
import {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  loginAdmin,
} from "../controllers/adminController.js";
import { addCampaign } from "../controllers/campaignController.js";

const router = Router();

// Middleware to be used in routes to check if user is an admin
router.post("/login", loginAdmin);

// Add item to menu
router.post("/addItem", adminAuthenticate, addMenuItem);

// Modify item in menu
router.put("/updateItem/:itemId", adminAuthenticate, updateMenuItem);

// Remove item from menu
router.delete("/deleteItem/:itemId", adminAuthenticate, deleteMenuItem);

// Add campaigns
router.post("/campaigns", adminAuthenticate, addCampaign);

export default router;
