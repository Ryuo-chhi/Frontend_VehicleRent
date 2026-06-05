const PromotionsTab = ({ promotions, isLoading }) => (
  <div>
    <h2 className="text-xl font-bold text-gray-900 mb-6">Promotions</h2>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase bg-gray-55/50">
            <th className="py-3 px-4">ID</th>
            <th className="py-3 px-4">Code</th>
            <th className="py-3 px-4">Discount %</th>
            <th className="py-3 px-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
          {isLoading ? (
            <tr>
              <td colSpan="4" className="text-center py-10">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
              </td>
            </tr>
          ) : promotions.length === 0 ? (
            <tr><td colSpan="4" className="text-center py-8 text-gray-400">No promotions found.</td></tr>
          ) : (
            promotions.map((p) => (
              <tr key={p.promoId} className="hover:bg-gray-50 transition">
                <td className="py-3.5 px-4 font-mono font-bold">#{p.promoId}</td>
                <td className="py-3.5 px-4 font-semibold">{p.code}</td>
                <td className="py-3.5 px-4 font-semibold text-blue-600">{p.discountPercent}%</td>
                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    p.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {p.active ? "Active" : "Inactive"}
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

export default PromotionsTab;
