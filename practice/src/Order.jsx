import React from "react";
import { useEffect, useState } from "react";
import Pizza from "./Pizza";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [loading, setLoading] = useState(true);

  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    price = selectedPizza.sizes[pizzaSize];
  }

  async function fetchPizzaTypes() {
    const pizzaRes = await fetch("/api/pizzas");
    // const pizzaRes = await fetch(`${import.meta.env.VITE_API_URL}/api/pizzas`);
    console.log("pizzaRes", pizzaRes);
    const pizzaJson = await pizzaRes.json();
    console.log("pizzaJson", pizzaJson);
    setPizzaTypes(pizzaJson);
    setLoading(false);
  }
  useEffect(() => {
    // We don't directly make the useEffect function async, but we call call from inside it.
    fetchPizzaTypes();
  }, []); // The empty array ensures this runs only once after the initial render.
  return (
    <div className="order">
      <h2>Please place your order</h2>
      <form>
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
              onChange={(e) => setPizzaType(e.target.value)}
              name="pizza-type"
              value={pizzaType}
            >
              {
                pizzaTypes.map((pizza) => (
                    <option key={pizza.id} value={pizza.id}>
                        {pizza.name}
                    </option>
                ))
              }
            </select>
          </div>
          <div>
            <label htmlFor="pizza-size">Pizza Size</label>
            <div>
              <span>
                <input
                  onChange={(e) => setPizzaSize(e.target.value)}
                  checked={pizzaSize === "S"}
                  type="radio"
                  name="pizza-size"
                  value="S"
                  id="pizza-s"
                />
                <label htmlFor="pizza-s">Small</label>
              </span>
              <span>
                <input
                  onChange={(e) => setPizzaSize(e.target.value)}
                  checked={pizzaSize === "M"}
                  type="radio"
                  name="pizza-size"
                  value="M"
                  id="pizza-m"
                />
                <label htmlFor="pizza-m">Medium</label>
              </span>
              <span>
                <input
                  onChange={(e) => setPizzaSize(e.target.value)}
                  checked={pizzaSize === "L"}
                  type="radio"
                  name="pizza-size"
                  value="L"
                  id="pizza-l"
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Add to Cart</button>
          <div className="order-pizza">
            <Pizza
              name="Pepperoni Pizza"
              description="Mozzarella Cheese, Pepperoni"
              image={"/public/pizzas/pepperoni.webp"}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
