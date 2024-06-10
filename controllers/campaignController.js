import db from "../db/database.js";

// Add campaign
const addCampaign = (req, res) => {
  // Get product IDs from request body
  const { productIDs } = req.body;

  // Check if productIDs is an array and contains at least two elements
  if (!Array.isArray(productIDs) || productIDs.length < 2) {
    return res.status(400).json({
      error:
        "At least two or more product IDs are required. Please provide multiple product IDs.",
    });
  }

  // Retrieve prices for products with specific product IDs
  db.menu
    .find({ _id: { $in: productIDs } })
    .then((products) => {
      // Check if all requested products were found
      if (products.length !== productIDs.length) {
        return res.status(400).json({
          error: "One or more products do not exist.",
        });
      }

      // Calculate total discounted price for the campaign
      const totalDiscountedPrice = products.reduce((total, product) => {
        // Calculate price with 10% discount for each product and add it to the total
        return total + product.price * 0.9;
      }, 0);

      // Generate an automatic title based on product IDs
      const title = `Campaign for Products ${productIDs.join(", ")}`;

      // Use the calculated total price for the campaign
      const price = totalDiscountedPrice;

      // Create and save the campaign in the database
      const campaign = { title, productIDs, price };
      db.campaigns
        .insert(campaign)
        .then(() => {
          res.status(201).json({
            message: "This campaign has been added.",
            campaign: {
              title: campaign.title,
              products: products,
              price: campaign.price,
            },
          });
        })
        .catch((error) => {
          res
            .status(500)
            .json({ error: "An error occurred while saving the campaign." });
        });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "An error occurred during product retrieval." });
    });
};

export { addCampaign };
