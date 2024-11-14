const backendDomain = "https://clone-e-commerce-project.vercel.app";

const summaryApi = {
  signUp: {
    url: `${backendDomain}/api/signUp`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signIn`,
    method: "post",
  },
  userDetails: {
    url: `${backendDomain}/api/userDetails`,
    method: "get",
  },
  userLogout: {
    url: `${backendDomain}/api/userLogout`,
    method: "get",
  },
  allUsers: {
    url: `${backendDomain}/api/allUsers`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomain}/api/updateUser`,
    method: "put",
  },
  deleteUser: {
    url: `${backendDomain}/api/deleteUser`,
    method: "delete",
  },
  uploadProduct: {
    url: `${backendDomain}/api/uploadProduct`,
    method: "post",
  },
  allProducts: {
    url: `${backendDomain}/api/allProducts`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomain}/api/updateProduct`,
    method: "put",
  },
  deleteProduct: {
    url: `${backendDomain}/api/deleteProduct`,
    method: "delete",
  },
  productCategory: {
    url: `${backendDomain}/api/productCategory`,
    method: "get",
  },
  allProductsCategory: {
    url: `${backendDomain}/api/allProductsCategory`,
    method: "get",
  },
  productDetails: {
    url: `${backendDomain}/api/productDetails`,
    method: "get",
  },
  addToCart: {
    url: `${backendDomain}/api/addToCart`,
    method: "post",
  },
  addToCartCount: {
    url: `${backendDomain}/api/addToCartCount`,
    method: "get",
  },
  cartProducts: {
    url: `${backendDomain}/api/cartProducts`,
    method: "get",
  },
  getQuantity: {
    url: `${backendDomain}/api/getQuantity`,
    method: "get",
  },
  changeQuantity: {
    url: `${backendDomain}/api/changeQuantity`,
    method: "put",
  },
  deleteCartProduct: {
    url: `${backendDomain}/api/deleteCartProduct`,
    method: "delete",
  },
  searchProduct: {
    url: `${backendDomain}/api/search`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomain}/api/filterProduct`,
    method: "post",
  },
};

export default summaryApi;
