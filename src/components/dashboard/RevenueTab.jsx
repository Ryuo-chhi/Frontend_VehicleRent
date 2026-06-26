import { useState, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, BarChart, Bar 
} from 'recharts';
import { HiOutlineCurrencyDollar, HiOutlineClipboardList, HiOutlineTruck, HiOutlineTrendingUp, HiOutlineDocumentDownload } from 'react-icons/hi';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const formatCurrency = (val) => {
  if (typeof val !== 'number' || isNaN(val)) return '0.00';
  return (Math.ceil(val * 100) / 100).toFixed(2);
};

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
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const filteredHistory = useMemo(() => {
    if (!rentalHistory || rentalHistory.length === 0) return [];
    const now = new Date();
    return rentalHistory.filter(record => {
      if (!record.payDate) return false;
      if (timeFilter === 'ALL') return true;
      
      const recDate = new Date(record.payDate);
      
      if (timeFilter === 'CUSTOM') {
        if (customStart && recDate < new Date(customStart)) return false;
        // set End time to end of day
        if (customEnd) {
          const endObj = new Date(customEnd);
          endObj.setHours(23, 59, 59, 999);
          if (recDate > endObj) return false;
        }
        return true;
      }

      const diffDays = Math.ceil(Math.abs(now - recDate) / (1000 * 60 * 60 * 24));
      if (timeFilter === '7DAYS') return diffDays <= 7;
      if (timeFilter === '30DAYS') return diffDays <= 30;
      return true;
    });
  }, [rentalHistory, timeFilter, customStart, customEnd]);

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
      const vCode = curr.rent?.vehicle?.vehicleCode || '';
      const vType = vCode ? vCode.split('-')[0] : 'Unknown';
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
          <p className="text-sm text-blue-600 font-bold">${formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  const exportCSV = () => {
    const headers = ['Code', 'Vehicle Model', 'Customer', 'Days', 'Total Amount', 'Payment Date'];
    let totalAmount = 0;
    const rows = filteredHistory.map(h => {
      totalAmount += h.totalPaid || 0;
      return [
        h.rent?.vehicle?.vehicleCode || 'N/A',
        h.rent?.vehicle?.vehicleModel || 'N/A',
        h.rent?.customer?.customerName || 'N/A',
        h.rent?.rentDays || 0,
        formatCurrency(h.totalPaid),
        h.payDate || 'N/A'
      ];
    });
    
    rows.push(['', '', '', 'Grand Total', formatCurrency(totalAmount), '']);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'revenue_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    
    // 1. Header Area
    // Company Logo / Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(31, 41, 55); // Gray-800
    doc.text('VEHICLERENT', 14, 20);
    
    // Company Subtitle / Contact
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128); // Gray-500
    doc.text('123 Business Avenue, Enterprise City', 14, 26);
    doc.text('Phone: +1 234 567 890 | Email: support@vehiclerent.com', 14, 31);
    
    // Report Title (Right Aligned)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(31, 41, 55);
    doc.text('FINANCIAL REPORT', pageWidth - 14, 20, { align: 'right' });
    
    // Date & Period
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Date Generated: ${new Date().toLocaleDateString()}`, pageWidth - 14, 26, { align: 'right' });
    doc.text(`Period Filter: ${timeFilter}`, pageWidth - 14, 31, { align: 'right' });

    // Separator Line
    doc.setDrawColor(229, 231, 235); // Gray-200
    doc.setLineWidth(0.5);
    doc.line(14, 36, pageWidth - 14, 36);

    const tableColumn = ['Code', 'Vehicle Model', 'Customer', 'Days', 'Total Amount', 'Payment Date'];
    const tableRows = [];
    let totalAmount = 0;

    filteredHistory.forEach(h => {
      const amount = h.totalPaid || 0;
      totalAmount += amount;
      const rowData = [
        h.rent?.vehicle?.vehicleCode || 'N/A',
        h.rent?.vehicle?.vehicleModel || 'N/A',
        h.rent?.customer?.customerName || 'N/A',
        h.rent?.rentDays || 0,
        `$${formatCurrency(amount)}`,
        h.payDate || 'N/A'
      ];
      tableRows.push(rowData);
    });

    tableRows.push([
      { content: 'Grand Total', colSpan: 4, styles: { halign: 'right', fontStyle: 'bold', fillColor: [249, 250, 251] } },
      { content: `$${formatCurrency(totalAmount)}`, styles: { fontStyle: 'bold', textColor: [22, 163, 74], fillColor: [249, 250, 251] } },
      { content: '', styles: { fillColor: [249, 250, 251] } }
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 42,
      theme: 'grid',
      styles: { 
        fontSize: 9,
        font: 'helvetica',
        cellPadding: 4,
        lineColor: [229, 231, 235],
        lineWidth: 0.1
      },
      headStyles: { 
        fillColor: [31, 41, 55], // Dark gray header
        textColor: 255,
        fontStyle: 'bold' 
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251] // Very light gray alternating
      },
      didDrawPage: (data) => {
        // Footer
        const str = `Page ${doc.internal.getNumberOfPages()}`;
        doc.setFontSize(8);
        doc.setTextColor(156, 163, 175);
        doc.text(str, pageWidth / 2, doc.internal.pageSize.height - 10, { align: 'center' });
      }
    });

    doc.save('revenue_report.pdf');
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900">Financial Statistics</h2>
        <div className="flex flex-wrap items-center gap-3">
          {timeFilter === 'CUSTOM' && (
            <div className="flex items-center gap-2">
              <input type="date" value={customStart} onChange={e => setCustomStart(e.target.value)} className="px-2 py-1.5 border border-gray-300 rounded-lg text-xs" />
              <span className="text-gray-400 text-xs">-</span>
              <input type="date" value={customEnd} onChange={e => setCustomEnd(e.target.value)} className="px-2 py-1.5 border border-gray-300 rounded-lg text-xs" />
            </div>
          )}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            {[{ key: '7DAYS', label: '7D' }, { key: '30DAYS', label: '30D' }, { key: 'ALL', label: 'All Time' }, { key: 'CUSTOM', label: 'Custom' }].map(f => (
              <button key={f.key} onClick={() => setTimeFilter(f.key)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${timeFilter === f.key ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={exportCSV} className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-xl text-xs font-semibold transition">
              <HiOutlineDocumentDownload size={16} /> CSV
            </button>
            <button onClick={exportPDF} className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-xl text-xs font-semibold transition">
              <HiOutlineDocumentDownload size={16} /> PDF
            </button>
          </div>
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
          <KPICard label="Total Revenue" value={`$${formatCurrency(filteredRevenue)}`} icon={HiOutlineCurrencyDollar} color="blue" />
          <KPICard label="Avg / Rental" value={`$${formatCurrency(avgPerRental)}`} icon={HiOutlineTrendingUp} color="green" />
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
