import { useNavigate } from 'react-router-dom';

const roles = [
  { label: 'Owner', value: 'owner', path: '/owner-dashboard' },
  { label: 'Builder', value: 'builder', path: '/builder-dashboard' },
  { label: 'Supplier', value: 'supplier', path: '/supplier-dashboard' },
];

const DashboardSelector = ({ selectedRole }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const selected = roles.find(r => r.value === e.target.value);
    if (selected) {
      localStorage.setItem('selectedRole', selected.value);
      navigate(selected.path);
    }
  };

  return (
    <select
      className="border rounded px-2 py-1 font-bold"
      value={selectedRole || ''}
      onChange={handleChange}
    >
      <option value="" disabled>Select Dashboard</option>
      {roles.map(role => (
        <option key={role.value} value={role.value}>{role.label}</option>
      ))}
    </select>
  );
};

export default DashboardSelector;