import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus, HiOutlineTag } from "react-icons/hi";
import EmptyState from "./EmptyState";
import SkeletonRows from "./SkeletonRows";
import useTable from "../../hooks/useTable";
import Pagination from "./Pagination";

const PromotionsTab = ({ promotions, onAddClick, onEditClick, onDeleteClick, isLoading, searchQuery }) => {
  const { currentData, requestSort, SortIcon, currentPage, totalPages, goToPage, totalItems } = useTable({
    data: promotions,
    searchQuery,
    searchFields: ['promoId', 'code'],
    itemsPerPage: 10
  });

  return (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-gray-900">Promotions</h2>
      <button onClick={onAddClick} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition cursor-pointer">
        <HiOutlinePlus size={18} /> New Promotion
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase bg-gray-55/50">
            <th className="py-3 px-4 cursor-pointer hover:bg-gray-100" onClick={() => requestSort('promoId')}>ID <SortIcon columnKey="promoId" /></th>
            <th className="py-3 px-4 cursor-pointer hover:bg-gray-100" onClick={() => requestSort('code')}>Code <SortIcon columnKey="code" /></th>
            <th className="py-3 px-4 text-right cursor-pointer hover:bg-gray-100" onClick={() => requestSort('discountPercent')}>Discount % <SortIcon columnKey="discountPercent" /></th>
            <th className="py-3 px-4 cursor-pointer hover:bg-gray-100" onClick={() => requestSort('active')}>Status <SortIcon columnKey="active" /></th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
          {isLoading ? (
            <SkeletonRows columns={5} rows={3} />
          ) : promotions.length === 0 ? (
            <tr><td colSpan="5">
              <EmptyState icon={HiOutlineTag} title="No promotions" description="Create a promo code to offer discounts to your customers." actionLabel="New Promotion" onAction={onAddClick} />
            </td></tr>
          ) : currentData.length === 0 ? (
            <tr><td colSpan="5" className="py-8 text-center text-gray-500">
              No promotions match your search.
            </td></tr>
          ) : (
            currentData.map((p) => (
              <tr key={p.promoId} className="hover:bg-gray-50 transition">
                <td className="py-3.5 px-4 font-mono font-bold">#{p.promoId}</td>
                <td className="py-3.5 px-4 font-semibold">{p.code}</td>
                <td className="py-3.5 px-4 font-semibold text-blue-600 text-right tabular-nums">{p.discountPercent}%</td>
                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${p.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{p.active ? "Active" : "Inactive"}</span>
                </td>
                <td className="py-3.5 px-4 text-right flex justify-end gap-2">
                  <button onClick={() => onEditClick(p)} className="group relative text-blue-500 hover:text-blue-700 p-1.5 rounded-lg hover:bg-blue-50 transition cursor-pointer" aria-label="Edit promotion">
                    <HiOutlinePencil size={18} />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">Edit</span>
                  </button>
                  <button onClick={() => onDeleteClick(p.promoId)} className="group relative text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition cursor-pointer" aria-label="Delete promotion">
                    <HiOutlineTrash size={18} />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">Delete</span>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {!isLoading && currentData.length > 0 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} totalItems={totalItems} itemsPerPage={10} />
      )}
    </div>
  </div>
  );
};

export default PromotionsTab;
