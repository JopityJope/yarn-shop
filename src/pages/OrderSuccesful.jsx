import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Link } from "react-router-dom";
import { transformYarnName } from "../utils/utils";
import { useAuth } from "../contexts/AuthContext";

function OrderSuccesful() {
  const [orders, setOrders] = useState([]);
  const [mostRecentOrder, setMostRecentOrder] = useState({});
  const { getData } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userData = await getData();
        setOrders(userData.orders);
        console.log(userData.orders);
        if (userData && userData.orders) {
          let mostRecentOrder = userData.orders[0];
          for (let i = 1; i < userData.orders.length; i++) {
            const currentOrder = userData.orders[i];

            if (currentOrder.timestamp > mostRecentOrder.timestamp) {
              mostRecentOrder = currentOrder;
            }
            setMostRecentOrder(mostRecentOrder);
          }

          console.log("Most recent order:", mostRecentOrder);
          console.log(mostRecentOrder.cartItems);
        }
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
            {mostRecentOrder.cartItems &&
              mostRecentOrder.cartItems.map((item, index) => (
                <li className={`checkout__item`} key={index}>
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

          {mostRecentOrder.totalPrice && (
            <div className="total">
              <p className="checkout__title">TOTAL:&nbsp;</p>
              <p className="checkout__title">{mostRecentOrder.totalPrice} €</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default OrderSuccesful;
