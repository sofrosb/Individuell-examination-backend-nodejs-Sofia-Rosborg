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

// Admin login route
router.post("/login", loginAdmin);

// Route to add a new item to the menu (requires admin authentication)
router.post("/addItem", adminAuthenticate, addMenuItem);

// Route to update an existing item in the menu (requires admin authentication)
router.put("/updateItem/:itemId", adminAuthenticate, updateMenuItem);

// Route to delete an item from the menu (requires admin authentication)
router.delete("/deleteItem/:itemId", adminAuthenticate, deleteMenuItem);

// Route to add a new campaign (requires admin authentication)
router.post("/campaigns", adminAuthenticate, addCampaign);

export default router;
