import axios from "axios";
import summaryApi from "../common";

export const fetchAllProductsCategory = async (category) => {
  try {
    // Make sure the backend accepts POST method for fetching categories.
    const response = await axios.post(
      summaryApi.allProductsCategory.url,
      { category },
      { withCredentials: true }
    );
    return response.data; // Return the data from the response
  } catch (error) {
    // Handle errors appropriately
    console.error("Error fetching product categories:", error);
    throw error; // Rethrow the error if you want it to be handled upstream
  }
};
