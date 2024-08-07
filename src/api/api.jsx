// import axios from "axios";
// export async function productsData() {
//     try {
//       const response = await axios.get("https://fakestoreapi.com/products");
//       console.log(response.data); 
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching products data:", error);
//       throw error;
//     }
//   }
import axios from "axios";

export async function productsData() {
  try {
    const response = await axios.get("https://dummyjson.com/products?limit=100");
    console.log(response.data.products);
    
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products data:", error);
    throw error;
  }
}