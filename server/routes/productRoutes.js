import express from "express";
import {
  getAllProducts,
  getSearchedProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
  getProductReviews,
  deleteReview,
  createProductReview,
  createProduct,
  getAdminProducts,
} from "../handlers/productHandler.js";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../middlewares/authenticator.js";

const Product = express();

///products?page=
Product.route("/products").get(getAllProducts);

Product.route("/admin/products").get(
  isAuthenticatedUser,
  authorizeRoles("ADMIN"),
  getAdminProducts
);
//product create
/*body{name,
    description,
    []highlights,
    []specifications,
    price,
    brand,
    category,
    []images,
    warranty}
    */
Product.route("/admin/product/new").post(
  isAuthenticatedUser,
  authorizeRoles("ADMIN"),
  createProduct
);

//product update
/*body{name,
    description,
    []highlights,
    []specifications,
    price,
    brand,
    category,
    []images,
    warranty}
    */
Product.route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("ADMIN"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("ADMIN"), deleteProduct);

Product.route("/product/:id").get(getProductDetails);

/*body{ int rating, string comment, productId }
 */
Product.route("/product/review").put(isAuthenticatedUser, createProductReview);

//product/search?name=
Product.route("/product/search").get(getSearchedProduct);

Product.route("/product/reviews").get(getProductReviews);

Product.route("/product/review/:id").delete(isAuthenticatedUser, deleteReview);

export default Product;
