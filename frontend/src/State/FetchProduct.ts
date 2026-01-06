const api = "http://localhost:8000/products";
import axios from "axios";
export const FetchProduct = async () => {
  try {
    const response = await axios.get(api);
    console.log(response);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
