import { StrictMode } from "react";
import React from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";
// import Pizza from "./Pizza";
import Order from "./Order";
import PizzaOfTheDay from "./PizzaOfTheDay";
import Header from "./Header";
import { CartContext } from "./contexts";

// const App = () => {
//   return (
//     <div>
//       <h1>Pizza Menu</h1>
//       <Pizza
//         name="Margherita"
//         description="Classic pizza with tomato sauce and mozzarella cheese."
//         image={"/public/pizzas/mediterraneo.webp"}
//       />
//       <Pizza
//         name="Pepperoni"
//         description="Spicy pepperoni slices on a bed of cheese."
//         image={"/public/pizzas/pepperoni.webp"}
//       />
//       <Pizza
//         name="Vegetarian"
//         description="A mix of fresh vegetables on a cheesy base."
//         image={"/public/pizzas/veggie_veg.webp"}
//       />
//       <Pizza
//         name="BBQ Chicken"
//         description="Grilled chicken with BBQ sauce and red onions."
//         image={"/public/pizzas/bbq_ckn.webp"}
//       />
//     </div>
//   );
// };

const App = () => {
  const cartHook = useState([]);
  return (
    <StrictMode>
      <CartContext.Provider value={cartHook}>
        <div>
          {/* <h1 className="logo">Padre Gino's </h1> */}
          <Header />
          <Order />
          <PizzaOfTheDay />
        </div>
      </CartContext.Provider>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
