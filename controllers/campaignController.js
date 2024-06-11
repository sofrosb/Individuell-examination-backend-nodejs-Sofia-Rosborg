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

      // Extract names of the products
      const productNames = products.map((product) => product.title);

      // Check if product names were retrieved
      if (productNames.length === 0) {
        return res.status(400).json({
          error: "Could not retrieve product names.",
        });
      }

      // Generate title based on product names
      const title = `Campaign for ${productNames.join(" and ")}`;

      // Calculate total discounted price for the campaign
      const totalDiscountedPrice = products.reduce((total, product) => {
        // Calculate price with 10% discount for each product and add it to the total
        return total + product.price * 0.9;
      }, 0);

      // Format the total discounted price to two decimal places
      const formattedTotalDiscountedPrice = parseFloat(
        totalDiscountedPrice.toFixed(2)
      );

      // Use the calculated total price for the campaign
      const totalPrice = formattedTotalDiscountedPrice;

      // Create and save the campaign in the database
      const campaign = { title, productIDs, totalPrice };
      db.campaigns
        .insert(campaign)
        .then(() => {
          // Send the response
          res.status(201).json({
            message: "This campaign has been added.",
            campaign: {
              title: campaign.title,
              totalPrice: campaign.totalPrice,
              products: products.map((product) => ({
                _id: product._id,
                name: product.name,
                price: product.price,
              })),
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
