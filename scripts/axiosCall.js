import axios from "axios";

const API_BASE_URL = "https://enormously-crack-bedbug.ngrok-free.app/"; // api url

// Hàm gọi API
export async function callAPI({ url, method = "GET", data = {} }) {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${url}`,
      method,
      data: method.toUpperCase() !== "GET" ? data : undefined,
      params: method.toUpperCase() === "GET" ? data : undefined,
    });

    return response.data; // return data
  } catch (error) {
    console.error("API Error:", error);
    throw error; 
  }
}
