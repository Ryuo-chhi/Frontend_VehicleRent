import { HiOutlinePlus } from "react-icons/hi";

const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction }) => (
  <div className="flex flex-col items-center justify-center py-16 px-8">
    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
      <Icon size={28} className="text-gray-400" />
    </div>
    <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>
    <p className="text-sm text-gray-500 mb-6 text-center max-w-xs">{description}</p>
    {actionLabel && onAction && (
      <button
        onClick={onAction}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition cursor-pointer"
      >
        <HiOutlinePlus size={16} />
        {actionLabel}
      </button>
    )}
  </div>
);

export default EmptyState;
