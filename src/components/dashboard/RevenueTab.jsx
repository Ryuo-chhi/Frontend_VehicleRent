import { useState, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, BarChart, Bar 
} from 'recharts';
import { HiOutlineCurrencyDollar, HiOutlineClipboardList, HiOutlineTruck, HiOutlineTrendingUp } from 'react-icons/hi';

const KPICard = ({ label, value, icon: Icon, color }) => {
  const colorMap = {
    blue: 'from-blue-50 to-indigo-50 border-blue-100',
    green: 'from-green-50 to-emerald-50 border-green-100',
    purple: 'from-purple-50 to-violet-50 border-purple-100',
    amber: 'from-amber-50 to-yellow-50 border-amber-100',
  };
  const iconColorMap = {
    blue: 'text-blue-600 bg-blue-100',
    green: 'text-green-600 bg-green-100',
    purple: 'text-purple-600 bg-purple-100',
    amber: 'text-amber-600 bg-amber-100',
  };
  return (
    <div className={`p-4 rounded-2xl border bg-gradient-to-br ${colorMap[color]} shadow-sm`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconColorMap[color]}`}>
          <Icon size={18} />
        </div>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-2xl font-extrabold text-gray-900 tabular-nums">{value}</p>
    </div>
  );
};

const RevenueTab = ({ revenue, rentalHistory = [], isLoading }) => {
  const [timeFilter, setTimeFilter] = useState('ALL');

  const filteredHistory = useMemo(() => {
    if (!rentalHistory || rentalHistory.length === 0) return [];
    const now = new Date();
    return rentalHistory.filter(record => {
      if (!record.payDate) return false;
      if (timeFilter === 'ALL') return true;
      const recDate = new Date(record.payDate);
      const diffDays = Math.ceil(Math.abs(now - recDate) / (1000 * 60 * 60 * 24));
      if (timeFilter === '7DAYS') return diffDays <= 7;
      if (timeFilter === '30DAYS') return diffDays <= 30;
      return true;
    });
  }, [rentalHistory, timeFilter]);

  const filteredRevenue = useMemo(() => {
    if (timeFilter === 'ALL' && revenue) return revenue;
    return filteredHistory.reduce((sum, curr) => sum + curr.totalPaid, 0);
  }, [filteredHistory, timeFilter, revenue]);

  const avgPerRental = filteredHistory.length > 0 ? filteredRevenue / filteredHistory.length : 0;

  const lineChartData = useMemo(() => {
    const grouped = filteredHistory.reduce((acc, curr) => {
      const date = curr.payDate.split(' ')[0];
      acc[date] = (acc[date] || 0) + curr.totalPaid;
      return acc;
    }, {});
    return Object.entries(grouped).map(([date, amount]) => ({ date, amount })).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [filteredHistory]);

  const pieChartData = useMemo(() => {
    const grouped = filteredHistory.reduce((acc, curr) => {
      const method = curr.paymentMethod || 'UNKNOWN';
      acc[method] = (acc[method] || 0) + curr.totalPaid;
      return acc;
    }, {});
    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  }, [filteredHistory]);

  const barChartData = useMemo(() => {
    const grouped = filteredHistory.reduce((acc, curr) => {
      const vType = curr.rent?.vehicle?.vehicleType || 'Unknown';
      acc[vType] = (acc[vType] || 0) + curr.totalPaid;
      return acc;
    }, {});
    return Object.entries(grouped).map(([name, amount]) => ({ name, amount }));
  }, [filteredHistory]);

  const topEarner = barChartData.length > 0 ? barChartData.reduce((a, b) => a.amount > b.amount ? a : b).name : '—';

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-100 shadow-xl rounded-xl">
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          <p className="text-sm text-blue-600 font-bold">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Financial Statistics</h2>
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
          {[{ key: '7DAYS', label: '7D' }, { key: '30DAYS', label: '30D' }, { key: 'ALL', label: 'All Time' }].map(f => (
            <button key={f.key} onClick={() => setTimeFilter(f.key)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${timeFilter === f.key ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-4 rounded-2xl border border-gray-100 bg-gray-50 animate-pulse h-24" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard label="Total Revenue" value={`$${(typeof filteredRevenue === 'number' ? filteredRevenue : 0).toFixed(2)}`} icon={HiOutlineCurrencyDollar} color="blue" />
          <KPICard label="Avg / Rental" value={`$${avgPerRental.toFixed(2)}`} icon={HiOutlineTrendingUp} color="green" />
          <KPICard label="Completed" value={filteredHistory.length} icon={HiOutlineClipboardList} color="purple" />
          <KPICard label="Top Earner" value={topEarner} icon={HiOutlineTruck} color="amber" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Line Chart */}
        <div className="bg-white p-6 border border-gray-100 rounded-2xl shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">Revenue Over Time</h3>
          <div className="h-64">
            {lineChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dx={-10} tickFormatter={(val) => `$${val}`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">No data available for this period.</div>
            )}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 border border-gray-100 rounded-2xl shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">Revenue by Payment Method</h3>
          <div className="h-64">
            {pieChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                    {pieChartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">No data available.</div>
            )}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 border border-gray-100 rounded-2xl shadow-sm lg:col-span-2">
          <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">Revenue by Vehicle Type</h3>
          <div className="h-72">
            {barChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dx={-10} tickFormatter={(val) => `$${val}`} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6' }} />
                  <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                    {barChartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">No data available.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueTab;
