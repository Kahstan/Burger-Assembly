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

  const fetchAddQty = async (url, listingName) => {
    const bod = JSON.stringify({
      name: listingName,
    });

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: bod,
    };

    try {
      const res = await fetch(url, options);
      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMinusQty = async (url, listingName) => {
    const bod = JSON.stringify({
      name: listingName,
    });

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: bod,
    };

    try {
      const res = await fetch(url, options);
      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  function onAddToCart() {
    addItemToCart(product.id);
    fetchAddQty("http://localhost:5001/listings/addToCart", product.name);
    console.log("Product ID to add:", product.id);
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
            item.product.cartCount++;
            item.totalPrice += product.price;
            console.log(item);
          }
          return item;
        });
      }
    });
  }

  function onDeleteFromCart() {
    removeItemFromCart(product.id);
    fetchMinusQty("http://localhost:5001/listings/minusToCart", product.name);
    console.log("Product ID to delete:", product.id);
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
              [...prevItems];
              item.product.cartCount--;
              item.qty--;
              item.totalPrice -= product.price;
              console.log(prevItems);
            } else {
              item.product.cartCount === 0;
              console.log(item.product.cartCount);
              setItems([]);
            }
          }
          console.log(item);
          return item;
        });
      }
    });
  }
  //Round all the numbers and display the sum
  function getItemsCount() {
    return items.reduce((sum, item) => sum + item.qty, 0);
  }
  //Round all the numbers and display the sum
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
