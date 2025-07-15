// src/components/ItemForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../services/api';

const ItemForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', price: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createItem(formData);
      console.log('Item created:', response.data);
      navigate('/supplier-dashboard/items');
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.errors?.map(e => e.msg).join(', ') ||
        'Failed to create item'
      );
      console.error('Create item error:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Item</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Item Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            placeholder="Enter item name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price (USD)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            min="0"
            step="0.01"
            placeholder="Enter price"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Create Item
        </button>
      </form>
    </div>
  );
};

export default ItemForm;