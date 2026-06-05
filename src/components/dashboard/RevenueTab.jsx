const RevenueTab = ({ revenue, isLoading }) => (
  <div>
    <h2 className="text-xl font-bold text-gray-900 mb-6">Financial Statistics</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {isLoading ? (
        <article className="p-10 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl shadow-sm flex justify-center">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </article>
      ) : (
        <article className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl shadow-sm">
          <span className="text-sm font-semibold text-blue-600 uppercase">Total Revenue Collected</span>
          <h3 className="text-4xl font-extrabold text-blue-900 mt-2">${(typeof revenue === 'number' ? revenue : 0).toFixed(2)}</h3>
        </article>
      )}
    </div>
  </div>
);

export default RevenueTab;
