import React, { useState, useEffect } from "react";
import productsData from "../../data/static/products.json";
import "../../styles/CheckoutView.css";

/*
 *
 * The current code is for project assignment 1, where the objective is to create a checkout page with view, modify and delete functionality.
 * The data for the products is provided in the products.json file.
 *
 */

// We will initialize an interface 'Product' to define the structure of the product object

interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  rebateQuantity: number;
  rebatePercent: number;
  upsellProductId: null | string;
}

// The basket structure for the products

interface BasketProduct {
  id: string;
  product: Product;
  quantity: number;
  total: number;
  giftWrap: boolean;
}

const CheckoutView = () => {
  // initialize a state that stores the total price of the products in the basket

  const [total, setTotal] = useState<number>(0.0);

  // Initialize a state of type "Product" as an array with an empty state as the initial value

  const [basket, setBasket] = useState<BasketProduct[]>([]);

  // Use useEffect to initialize a random basket of products when the component is mounted

  useEffect(() => {
    const randomProductData = productsData.sort(() => 0.5 - Math.random());
    const basketProducts = randomProductData.slice(0, 5).map((product) => {
      return {
        id: product.id,
        product,
        quantity: 1,
        total: product.price,
        giftWrap: false,
      };
    });
    setBasket(basketProducts);
  }, []);

  const handleQuantityChange = (id: string, quantity: number) => {
    const updatedBasket = basket.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity,
          total: item.product.price * quantity,
        };
      }
      return item;
    });
    setBasket(updatedBasket);
  };

  const handleGiftWrapChange = (id: string, giftWrap: boolean) => {
    const updatedBasket = basket.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          giftWrap,
        };
      }
      return item;
    });
    setBasket(updatedBasket);
  };

  const handleRemove = (id: string) => {
    const updatedBasket = basket.filter((item) => item.id !== id);
    setBasket(updatedBasket);
  };

  useEffect(() => {
    const total = basket.reduce((acc, item) => acc + item.total, 0);
    setTotal(total);
  }, [basket]);

  return (
    <div className="cart_container">
      <h1 className="cart_header">Shopping cart</h1>
      <div className="cart_items">
        <ul role="list" className="cart_list">
          <li
            className="cart_list_item header_row"
            style={{ fontWeight: "bold", marginBottom: "0.2rem" }}
          >
            <div
              className="cart_item_column"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="header__detail">Product Name</div>
              <div className="header__detail">Quantity</div>
              <div className="header__detail">Gift Wrap</div>
              <div className="header__detail">Price</div>
              <div className="header__detail">Remove</div>
            </div>
          </li>
          <li key="test" className="cart_list_item">
            <div className="cart_list_image_container ">
              <img
                src="https://via.placeholder.com/150"
                alt="Product"
                className="cart_list_image"
              />
            </div>

            <div className="cart_item_details_container">
              <div>
                <div className="cart_item_grid_container">
                  {basket.map((item) => (
                    <div
                      key={item.id}
                      className="cart_item_column"
                      style={{ marginTop: "2rem" }}
                    >
                      <div className="item__details">
                        <div className="product_name">{item.product.name}</div>
                      </div>
                      <input
                        type="number"
                        placeholder="Vælg antal"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value)
                          )
                        }
                        style={{
                          width: "auto",
                          padding: "5px",
                          backgroundColor: "white",
                        }}
                      />
                      <div className="item__gift_wrap">
                        <input
                          type="checkbox"
                          checked={item.giftWrap}
                          onChange={(e) =>
                            handleGiftWrapChange(item.id, e.target.checked)
                          }
                        />
                        <label> Indpakning</label>
                      </div>
                      <div className="item__price">
                        {item.product.price * item.quantity} kr
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="remove_button"
                      >
                        Fjern
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="cart_total">
                <div>I alt: {total} kr</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CheckoutView;
