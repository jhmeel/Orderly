import { v4 as uuidv4 } from "uuid";
class Orderer {
  constructor() {}

  static createNewOrder(orderDetails) {
    const { orderer_name, phonenumber, address, city, state, country } =
      orderDetails.orderer;
    const {
      product_name,
      price,
      quantity,
      totalPrice,
      order_at,
      status,
    } = orderDetails.product;
    return {
      newOrder: {
        order_details: {
          buyer_info: {
            _id: uuidv4(),
            name: orderer_name,
            phonenumber: phonenumber,
            address: address,
            city,
            state,
            country,
          },
          orderdItem: {
            product_name,
            price,
            quantity,
          },
          totalPrice,
          status,
        },
        ordered_at: new Date(Date.now()).toUTCString(),
      },
    };
  }
}
