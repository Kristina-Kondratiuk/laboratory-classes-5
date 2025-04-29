const Product = require("../models/Product");
const Cart = require("../models/cart");
const { STATUS_CODE } = require("../constants/statusCode");

exports.addProductToCart = (request, response) => {
    const { name, description, price } = request.body;

    if (!Product.findByName(name)) {
        Product.add(new Product(name, description, parseFloat(price)));
    }

    try {
        Cart.add(name);
        console.log("Cart after add:", Cart.getItems());
        response.status(STATUS_CODE.FOUND).redirect("/products/new");
    } catch (error) {
        response.status(STATUS_CODE.NOT_FOUND).send(error.message);
    }
};

exports.getProductsCount = (request, response) => {
    const quantity = Cart.getProductsQuantity();

    response.status(STATUS_CODE.OK).json({ quantity });
};