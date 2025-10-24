// Filter tabs for payment status
export const FilterTabs = ({ tabs, activeFilter, onFilterChange }) => (
  <div className="flex gap-6 border-b border-gray-200">
    {tabs.map(tab => (
      <button
        key={tab.id}
        onClick={() => onFilterChange(tab.id)}
        className={`pb-3 px-1 font-medium ${activeFilter === tab.id ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
      >
        {tab.label} ({tab.count})
      </button>
    ))}
  </div>
);
