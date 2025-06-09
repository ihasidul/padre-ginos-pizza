import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import getPastOrders from '../api/getPastOrders'
import getPastOrder from '../api/getPastOrder'
import { priceConverter } from '../useCurrency'
import Modal from '../Modal'


export const Route = createLazyFileRoute('/past')({
  component: PastOrderRoute,
})

function PastOrderRoute() {
  const [page, setPage] = useState(1)
  const [focusedOrder, setFocusedOrder] = useState(null)
  const { isLoading, data} = useQuery({
    queryKey: ['past-orders', page],
    queryFn: () => getPastOrders(page),
    staleTime: 30000,
  });

  const { isLoading: isLoadingPastOrder, data: pastOrderData } = useQuery({
    queryKey: ['past-order', focusedOrder],
    queryFn: () => getPastOrder(focusedOrder),
    staleTime: 24 * 60 * 60 * 1000, // one day in milliseconds,
    enabled: !!focusedOrder, // Only run this query if focusedOrder is set
  });

  if (isLoading) {
    return <h2 className='past-orders'>Loading...</h2>
  }

  return (
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Date</td>
            <td>Time</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.date}</td>
              <td>{order.time}</td>
              <td>
                <button
                  onClick={() => setFocusedOrder(order.order_id)}
                >
                  View Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <div>{page}</div>
        <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>

{
  focusedOrder ? (
    <Modal>
      <h2>Order #{focusedOrder}</h2>
      {!isLoadingPastOrder ? (
        <table>
          <thead>
            <tr>
              <td>Image</td>
              <td>Name</td>
              <td>Size</td>
              <td>Quantity</td>
              <td>Price</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody>
            {pastOrderData.orderItems.map((pizza) => (
              <tr key={`${pizza.pizzaTypeId}_${pizza.size}`}>
                <td>
                  <img src={pizza.image} alt={pizza.name} />
                </td>
                <td>{pizza.name}</td>
                <td>{pizza.size}</td>
                <td>{pizza.quantity}</td>
                <td>{priceConverter(pizza.price)}</td>
                <td>{priceConverter(pizza.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>Loading …</h2>
      )}
      <button onClick={() => setFocusedOrder()}>Close</button>
    </Modal>
  ) : null
}
    </div>
  );
 }
