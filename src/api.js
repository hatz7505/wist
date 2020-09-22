import axios from "axios";
import { TOKEN_STORAGE_ID } from "./App";

const BASE_URL = process.env.BASE_URL || "http://localhost:8080";

class WistApi {
  static async request(endpoint, params = {}, verb = "get") {
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

  static async login(data) {
    let res = await this.request(`login`, data, "post");
    return res.token;
  }

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async getItemData(link) {
    let res = await axios.get(link);
    return res;
  }

  static async addItem(data) {
    let res = await this.request(`items`, data, "post");
    return res.item;
  }

  static async getUsersItems(username) {
    let res = await this.request(`items/${username}`);
    return res.items;
  }

  static async getProsForItem(itemId) {
    let res = await this.request(`items/pros/${itemId}`);
    return res.pros;
  }

  static async getConsForItem(itemId) {
    let res = await this.request(`items/cons/${itemId}`);
    return res.cons;
  }

  static async addProCon(data) {
    let res = await this.request(`items/procons/`, data, "post");
    return res;
  }
}

export default WistApi;
