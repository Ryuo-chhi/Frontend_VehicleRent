const MaintenanceTab = ({ maintenanceRecords, isLoading }) => (
  <div>
    <h2 className="text-xl font-bold text-gray-900 mb-6">Maintenance Records</h2>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase bg-gray-55/50">
            <th className="py-3 px-4">ID</th>
            <th className="py-3 px-4">Vehicle ID</th>
            <th className="py-3 px-4">Details</th>
            <th className="py-3 px-4">Cost</th>
            <th className="py-3 px-4">Start</th>
            <th className="py-3 px-4">End</th>
            <th className="py-3 px-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
          {isLoading ? (
            <tr>
              <td colSpan="7" className="text-center py-10">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
              </td>
            </tr>
          ) : maintenanceRecords.length === 0 ? (
            <tr><td colSpan="7" className="text-center py-8 text-gray-400">No maintenance records.</td></tr>
          ) : (
            maintenanceRecords.map((m) => (
              <tr key={m.maintenanceId} className="hover:bg-gray-50 transition">
                <td className="py-3.5 px-4 font-mono font-bold">#{m.maintenanceId}</td>
                <td className="py-3.5 px-4">{m.vehicleId}</td>
                <td className="py-3.5 px-4">{m.details}</td>
                <td className="py-3.5 px-4 font-semibold text-blue-600">${m.cost}</td>
                <td className="py-3.5 px-4">{m.startDate}</td>
                <td className="py-3.5 px-4">{m.endDate}</td>
                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    m.status === "COMPLETED" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {m.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default MaintenanceTab;
