// src/components/OrderForm.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createOrder, getItems, getUsers } from '../services/api';

const OrderForm = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    project: projectId,
    supplier: '',
    items: [],
    totalAmount: 0,
  });
  const [itemsList, setItemsList] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsRes = await getItems();
        const usersRes = await getUsers();
        setItemsList(itemsRes.data);
        setSuppliers(usersRes.data.filter(user => user.role === 'supplier'));
      } catch (err) {
        setError('Failed to load items or suppliers');
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'items') {
      const selected = Array.from(e.target.selectedOptions, option => option.value);
      const total = selected.reduce((sum, itemId) => {
        const item = itemsList.find(i => i._id === itemId);
        return sum + (item ? item.price : 0);
      }, 0);
      setFormData({ ...formData, items: selected, totalAmount: total });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createOrder(formData);
      console.log('Order created:', response.data);
      navigate(`/owner-dashboard/orders/${projectId}`);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.errors?.map(e => e.msg).join(', ') ||
        'Failed to create order'
      );
      console.error('Create order error:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Order</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Supplier</label>
          <select
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select Supplier</option>
            {suppliers.map(supplier => (
              <option key={supplier._id} value={supplier._id}>{supplier.username}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Items</label>
          <select
            name="items"
            multiple
            value={formData.items}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            {itemsList.map(item => (
              <option key={item._id} value={item._id}>{item.name} (${item.price})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Total Amount (USD)</label>
          <input
            type="number"
            name="totalAmount"
            value={formData.totalAmount}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Create Order
        </button>
      </form>
    </div>
  );
};

export default OrderForm;