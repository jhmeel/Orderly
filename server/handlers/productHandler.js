import Product from "../models/productModel.js";
import cloudinary from "cloudinary";
import ErrorHandler from "./errorHandler.js";
import catchAsync from "../middlewares/catchAsync.js";

export const createProduct = catchAsync(async (req, res, next) => {
  const {
    name,
    description,
    highlights,
    specifications,
    price,
    brand,
    category,
    warranty,
  } = req.body;

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLink = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  let specs = [];
  let highlighted = [];

  specifications.forEach((s) => {
    specs.push(JSON.parse(s));
  });
  highlights.forEach((hlt) => {
    highlighted.push(JSON.parse(hlt));
  });

  const newProductData = {
    name,
    description,
    highlights: highlighted,
    specifications: specs,
    price,
    imagesLink,
    brand,
    category,
    warranty,
    owner: req.user._id,
  };

  const product = await Product.create(newProductData);

  res.status(201).json({
    success: true,
    product,
  });
});

export const updateProduct = catchAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  const {
    name,
    description,
    highlights,
    specifications,
    price,
    brand,
    category,
    warranty,
  } = req.body;

  if (req.body.images !== undefined) {
    let images = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  }
  const specs = [];
  const highlighted = [];

  specifications.forEach((s) => {
    specs.push(JSON.parse(s));
  });
  highlights.forEach((hlt) => {
    highlighted.push(JSON.parse(hlt));
  });

  const updatedProductData = {
    name,
    description,
    highlights: highlighted,
    specifications: specs,
    price,
    imagesLink,
    brand,
    category,
    warranty,
  };
  product = await Product.findByIdAndUpdate(req.params.id, updatedProductData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(201).json({
    success: true,
    product,
  });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(201).json({
    success: true,
  });
});
export const getAdminProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({ owner: req.user._id });

  res.status(200).json({
    success: true,
    products,
  });
});

export const getAllProducts = catchAsync(async (req, res, next) => {
  const page = req.query.page;
  const pageSize = 10;
  const products = await Product.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .exec();

  const totalResults = await products.length;

  const totalPages = Math.ceil(totalResults / pageSize);

  res.status(200).json({
    success: true,
    products,
    totalResults,
    totalPages,
  });
});

export const getProductDetails = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('owner');

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

export const getSearchedProduct = catchAsync(async (req, res, next) => {
  const { name, page } = req.query;
  const pageSize = 10;
  let product = await Product.find({
    name: { $regex: name, $options: "i" },
  }).populate('owner');
 
  if(!product.length){
    product = await Product.find({
      category: { $regex: name, $options: "i" },
    }).populate('owner')
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .exec();
  }
  const totalResults = await product.length;

  const totalPages = Math.ceil(totalResults / pageSize);
  
  res.status(200).json({
    success: true,
    products: product,
    totalResults,
    totalPages
  });
});

export const createProductReview = catchAsync(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  const isReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

export const getProductReviews = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

export const deleteReview = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev.user.toString() !== req.user._id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  product.ratings = Number(ratings);
  product.numOfReviews = numOfReviews;

  await product.save();

  res.status(200).json({
    success: true,
  });
});
