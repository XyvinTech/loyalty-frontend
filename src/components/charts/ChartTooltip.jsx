const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;

  return (
    <div className="bg-white p-3 border rounded-lg shadow-lg">
      <p className="font-medium text-gray-900">{label}</p>
      <div className="space-y-1 mt-2">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-600">{entry.name}:</span>
            <span className="text-sm font-medium text-gray-900">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartTooltip;
