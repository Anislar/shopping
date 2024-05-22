import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com/",
});
class MainSericeApi {
  constructor() {
    this.getProducts = this.getProducts.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.getCarts = this.getCarts.bind(this);
    // this.updateCart = this.updateCart.bind(this);
    this.axiosInstance = axiosInstance;
  }
  async getProducts(category) {
    let url = "";
    if (category === "all") url = "products";
    else {
      url = `products/category/${category}`;
    }
    const response = await this.axiosInstance.get(url);

    if (response.status === 200) {
      return response.data;
    } else throw new Error("Something went wrong");
  }

  async getCarts() {
    const response = await this.axiosInstance.get("carts/user/1");
    if (response.status === 200) {
      return response.data;
    } else throw new Error("Something went wrong");
  }
  async addToCart(product) {
    try {
      const response = await this.axiosInstance.post(
        "carts",
        JSON.stringify(product),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      } else throw new Error("Something went wrong");
    } catch (error) {
      return error;
    }
  }
  // async updateCart(product) {}
}

const MainService = new MainSericeApi();
export default MainService;
