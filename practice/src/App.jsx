import React from "react";
import { createRoot } from "react-dom/client";
// import Pizza from "./Pizza";
import Order from "./Order";


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
  return (
    <div>
      <h1>Fire Pizza</h1>
      <Order />
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
