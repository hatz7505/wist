import axios from "axios";
import { TOKEN_STORAGE_ID } from "./App";

const BASE_URL = process.env.BASE_URL || "http://localhost:8080";

class WistApi {
  static async signup(data) {
    try {
      let response = await axios.post(`${BASE_URL}/users`, data);
      return response.token;
    } catch (err) {
      console.log(err)
      // console.error("API Error:", err.response);
      // let message = err.response.data.message;
      // throw Array.isArray(message) ? message : [message];
    }
  }
}

export default WistApi;
