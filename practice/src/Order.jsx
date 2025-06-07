import React from "react";
import { useState } from "react";
import Pizza from "./Pizza";

export default function Order() {
//   const pizzaType = "pepperoni";
//   const pizzaSize = "M";
    const [pizzaType, setPizzaType] = useState("pepperoni");
    const [pizzaSize, setPizzaSize] = useState("M");

  return (
    <div className="order">
      <h2>Please place your order</h2>
      <form>
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select 
             onChange={(e) => setPizzaType(e.target.value)}
            name="pizza-type" value={pizzaType}>
              <option value="pepperoni"> The Pepperoni Pizza</option>
              <option value="margherita"> The Margherita Pizza</option>
              <option value="bbq_ckn"> The BBQ Chicken Pizza</option>
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
