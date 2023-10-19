import { useState, useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
/* import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
 */
function App() {
  return <Layout />;
}

export default App;

/* <div className="App">
      {yarns.map((yarn) => {
        return (
          <div className="yarn" key={yarn.id}>
            <h3 className="yarn__name">{yarn.name}</h3>
            <p className="yarn__price">
              <strong>{yarn.price} EUR</strong> / {yarn.weight}g
            </p>
            <p className="yarn__contents">{yarn.contents.content}</p>
            <p className="yarn__length">
              {yarn.weight}g = {yarn.length}m
            </p>
            <p className="yarn__colors">{yarn.colors} colors</p>
          </div>
        );
      })}
    </div> */

/* const [yarns, setYarns] = useState([]);
  const yarnsCollectionRef = collection(db, "yarns");

  useEffect(() => {
    const getYarns = async function () {
      const data = await getDocs(yarnsCollectionRef);
      setYarns(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getYarns();
  }, []);
 */
