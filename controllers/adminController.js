import db from "../db/database.js";
import admins from "../services/admins.js";

// Add admins to database
const addAdmins = async () => {
  try {
    // Loop through admins array
    for (const admin of admins) {
      // Add admins to database
      const insertedAdmin = await db["admin"].insert(admin);
    }
  } catch (error) {}
};

// Call addAdmins when the server starts
addAdmins();

// Login controller
const loginAdmin = async (req, res) => {
  // Get username and password from request body
  const { username, password } = req.body;

  try {
    // Get information about user from database
    const user = await db.admin.findOne({ username });

    // Checks if user exists in database
    if (user) {
      // Verify password
      if (user.password === password) {
        // If user exists and password matches, set global variable isAdmin to true
        global.isAdmin = true;
        return res.status(200).json({
          message: `Logged in as admin. Logged in user: ${username}.`,
        });
      } else {
        // If password is incorrect, set global variable isAdmin to false
        global.isAdmin = false;
        return res
          .status(400)
          .json({ message: "Incorrect username or password." });
      }
    } else {
      // If user doesn't exist, set global variable isAdmin to false
      global.isAdmin = false;
      return res
        .status(400)
        .json({ message: "Incorrect username or password." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Login failed." });
  }
};

// Add item to menu
const addMenuItem = async (req, res) => {
  try {
    const item = req.body;

    // Validate that the object has necessary properties
    if (!item.id || !item.title || !item.desc || !item.price) {
      return res.status(400).json({
        message: "Id, title, description, and price are required fields.",
      });
    }

    // Create a new item object with provided properties and current date
    const newItem = {
      _id: item.id,
      title: item.title,
      desc: item.desc,
      price: item.price,
      createdAt: new Date().toLocaleString("sv-SE", {
        timeZone: "Europe/Stockholm",
      }),
    };

    const addedItem = await db.menu.insert(newItem);
    res.status(201).json({
      message: "Item added to menu.",
      item: newItem,
    });
  } catch (error) {
    if (error.errorType === "uniqueViolated") {
      res.status(409).json({
        message: "Item already exists in menu.",
        error: error.message,
      });
    } else {
      res
        .status(500)
        .json({ message: "Could not add item.", error: error.message });
    }
  }
};

// Modify item in menu
const updateMenuItem = async (req, res) => {
  try {
    // itemId is passed as a URL parameter
    const { itemId } = req.params;
    // Get title, description, and price from request body
    const { title, desc, price } = req.body;

    // Validate that at least one of the fields is provided
    if (title === undefined && desc === undefined && price === undefined) {
      return res.status(400).json({
        message:
          "At least one of title, description, or price must be provided.",
      });
    }

    // Convert itemId to number if necessary (assuming _id is a number)
    const parsedItemId = parseInt(itemId, 10);

    // Check if item exists in menu
    const existingItem = await db.menu.findOne({ _id: parsedItemId });

    if (!existingItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found in menu.",
      });
    }

    // Set new values, falling back to existing values if not provided
    const newTitle = title !== undefined ? title : existingItem.title;
    const newDesc = desc !== undefined ? desc : existingItem.desc;
    const newPrice = price !== undefined ? price : existingItem.price;
    const currentDateTime = new Date().toLocaleString("sv-SE", {
      timeZone: "Europe/Stockholm",
    });

    // Create an updates object only if there are changes
    const updates = {};
    if (newTitle !== existingItem.title) updates.title = newTitle;
    if (newDesc !== existingItem.desc) updates.desc = newDesc;
    if (newPrice !== existingItem.price) updates.price = newPrice;

    // Check if there are no changes
    if (Object.keys(updates).length === 0) {
      return res.status(200).json({
        success: true,
        message: "No changes were made to the item.",
        item: existingItem,
      });
    }

    // Set modifiedAt to current date
    updates.modifiedAt = currentDateTime;

    // Update item in menu
    const updateResult = await db.menu.updateOne(
      { _id: parsedItemId },
      {
        $set: updates,
      }
    );

    // Fetch the updated data from the database
    const updatedItemData = await db.menu.findOne({ _id: parsedItemId });

    // Compare the updated item with the existing item to confirm the change
    const changesMade = Object.keys(updates).some(
      (key) => updatedItemData[key] !== existingItem[key]
    );

    // If changes were made, send the updated item data in response
    if (changesMade) {
      res.status(200).json({
        success: true,
        message: "Item updated in menu.",
        item: updatedItemData,
      });
    } else {
      // If no changes were made, send an error response
      res.status(500).json({
        success: false,
        message: "Could not update item.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Could not update item.",
      error: error.message,
    });
  }
};

// Remove item from menu
const deleteMenuItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const parsedItemId = parseInt(itemId, 10);

    const deletionResult = await db.menu.remove({ _id: parsedItemId });

    // Check if item was removed
    if (deletionResult === 1) {
      res
        .status(200)
        .json({ message: "Item removed from menu.", itemId: parsedItemId });
    } else {
      res.status(404).json({ message: "Item not found in menu." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not remove item.", error: error.message });
  }
};

export { loginAdmin, addMenuItem, updateMenuItem, deleteMenuItem };
