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

        userData.orders.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );

        if (userData.orders.length > 0) {
          setMostRecentOrder(userData.orders[0]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (mostRecentOrder && Object.keys(mostRecentOrder).length > 0) {
      const filteredOrder = {};
      Object.keys(mostRecentOrder).forEach((key) => {
        if (key !== "timestamp" && key !== "totalPrice") {
          filteredOrder[key] = mostRecentOrder[key];
        }
      });
      console.log(filteredOrder);
    }
  }, [mostRecentOrder]);

  return (
    <>
      <Helmet title="Order" />
      <div className="login__container">
        <div className="login">
          <h3 className="heading-secondary">Order sucessful</h3>

          <p className="checkout__title">Your items</p>
          {/*  {mostRecentOrder && (
            <ul className="checkout__items">
              {Object.values(mostRecentOrder).map((item, index) => (
                <li className={`checkout__item`} key={index}>
                  <Link to={`/product-page/${item.id}`}>
                    <img
                      src={`/${transformYarnName(item.name)}/colors/${
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
          )} */}

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
