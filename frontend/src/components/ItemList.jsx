
import { useEffect, useState } from 'react';
import { getItems } from '../services/api';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getItems();
        setItems(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load items');
        console.error(err);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">My Items</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {items.length === 0 ? (
          <li className="text-gray-500">No items available</li>
        ) : (
          items.map((item) => (
            <li key={item._id} className="p-2 border rounded">
              <div>{item.name}</div>
              <div>Price: ${item.price}</div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ItemList;