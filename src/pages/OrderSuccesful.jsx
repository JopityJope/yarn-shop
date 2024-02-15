import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import { transformYarnName } from "../utils/utils";

function OrderSuccesful() {
  const [mostRecentOrder, setMostRecentOrder] = useState([]);
  const { getData } = useCart();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userData = await getData();
        const ordersData = userData && userData.orders ? userData.orders : [];
        console.log(ordersData);
        const mostRecentOrder = ordersData.reduce((prevOrder, currentOrder) => {
          return prevOrder.timestamp > currentOrder.timestamp
            ? prevOrder
            : currentOrder;
        }, ordersData[0]);
        setMostRecentOrder(mostRecentOrder);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Helmet title="Order" />
      <div className="login__container">
        <div className="login">
          <h3 className="heading-secondary">Order sucessful</h3>

          <p className="checkout__title">Your items</p>
          <ul className="checkout__items">
            {mostRecentOrder.map((item) => (
              <li
                className={`checkout__item`}
                key={`${item.item.id}${item.color}`}
              >
                <Link to={`/product-page/${item.item.id}`}>
                  <img
                    src={`/${transformYarnName(item.item.name)}/colors/${
                      item.color + 1
                    }.jpg`}
                    alt=""
                    loading="lazy"
                    className="checkout__image"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="total">
            <p>TOTAL TO PAY:&nbsp;</p>
            <p className="total">
              {/*  {Number(totalPrice) + Number(deliveryPrice)} */} €
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderSuccesful;
