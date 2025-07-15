import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrders } from '../services/api';

const OrderList = () => {
  const { projectId } = useParams();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders(projectId);
        setOrders(response.data);
      } catch (err) {
        setError('Failed to load orders');
        console.error(err);
      }
    };
    fetchOrders();
  }, [projectId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Orders for Project</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {orders.map((order) => (
          <li key={order._id} className="p-2 border rounded">
            <div>Supplier: {order.supplier?.username || 'Unknown'}</div>
            <div>Items: {order.items.map(item => item.name).join(', ')}</div>
            <div>Total: ${order.totalAmount}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;