import axios from "axios";
import { TOKEN_STORAGE_ID } from "./App";

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

class WistApi {
  static async request(endpoint, params = {}, verb = "get") {
    console.debug("API Call:", endpoint, params, verb);

    // FIXME: see above for note about this
    const _token = localStorage.getItem(TOKEN_STORAGE_ID);

    const data =
      verb === "get"
        ? { params: { _token, ...params } } // GET
        : { _token, ...params }; // POST,PATCH

    const req = axios[verb](`${BASE_URL}/${endpoint}`, data);

    try {
      return (await req).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async signup(data) {
    let res = await this.request(`users`, data, "post");
    return res.token;
  }
}


export default WistApi;
