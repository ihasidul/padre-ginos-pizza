import { usePizzaOfTheDay } from "./usePizzaOfTheDay";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});


export default function PizzaOfTheDay() {
const pizzaOfTheDay = usePizzaOfTheDay();
  if (!pizzaOfTheDay) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pizza-of-the-day">
      <h2>Pizza of the Day</h2>
      <div>
        <div className="pizza-of-the-day-info">
          <h3>{pizzaOfTheDay.name}</h3>
          <p>{pizzaOfTheDay.description}</p>
          <h2 className="pizza-of-the-day-price">
            From: <span>{intl.format(pizzaOfTheDay.sizes.S)}</span>
          </h2>
        </div>
        <img
          className="pizza-of-the-day-image"
          src={pizzaOfTheDay.image}
          alt={pizzaOfTheDay.name}
        />
      </div>
    </div>
  );
}