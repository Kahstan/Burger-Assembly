import React, { createContext, useState, useEffect } from "react";
export const CartContext = createContext();

export function CartProvider(props) {
  const [items, setItems] = useState([]);
  const [listings, setListings] = useState([]);
  const [product, setProduct] = useState({});

  const fetchListings = async (url) => {
    const options = {
      method: "GET",
    };

    try {
      const res = await fetch(url, options);
      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();
      console.log(data);
      setListings(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListings("http://localhost:5001/listings/displayAll");
    // eslint-disable-next-line
  }, [setListings]);

  function getProducts() {
    return listings;
  }

  function getProduct(id) {
    return listings.find((product) => product.id == id);
  }

  function onAddToCart() {
    addItemToCart(product.id);
    console.log("add", product.id);
  }

  function addItemToCart(id) {
    //takes the listings state, find the id of the product
    const product = getProduct(id);
    setItems((prevItems) => {
      const item = prevItems.find((item) => item.id == id);
      if (!item) {
        return [
          ...prevItems,
          {
            id,
            qty: 1,
            product,
            totalPrice: product.price,
          },
        ];
      } else {
        return prevItems.map((item) => {
          if (item.id == id) {
            [...prevItems];
            item.qty++;
            item.totalPrice += product.price;
          }
          return item;
        });
      }
    });
  }

  function onDeleteFromCart() {
    removeItemFromCart(product.id);
    console.log("delete", product.id);
  }

  function removeItemFromCart(id) {
    //takes the listings state, find the id of the product
    const product = getProduct(id);
    setItems((prevItems) => {
      const item = prevItems.find((item) => item.id == id);
      if (!item) {
        return [
          ...prevItems,
          {
            id,
            qty: 1,
            product,
            totalPrice: product.price,
          },
        ];
      } else {
        return prevItems.map((item) => {
          if (item.id == id) {
            if (item.qty > 1) {
              item.qty--;
              item.totalPrice -= product.price;
              console.log(items);
            } else {
              setItems([]);
            }
          }
          return item;
        });
      }
    });
  }

  function getItemsCount() {
    return items.reduce((sum, item) => sum + item.qty, 0);
  }

  function getTotalPrice() {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  return (
    <CartContext.Provider
      value={{
        items,
        getItemsCount,
        addItemToCart,
        getTotalPrice,
        getProduct,
        getProducts,
        listings,
        setListings,
        // removeItemFromCart,
        product,
        setProduct,
        onAddToCart,
        onDeleteFromCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
