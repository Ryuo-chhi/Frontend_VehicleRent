const SkeletonRows = ({ columns = 5, rows = 5 }) => (
  <>
    {Array.from({ length: rows }).map((_, i) => (
      <tr key={i} className="animate-pulse">
        {Array.from({ length: columns }).map((_, j) => (
          <td key={j} className="py-3.5 px-4">
            <div
              className="h-4 bg-gray-200 rounded"
              style={{ width: `${50 + Math.random() * 40}%` }}
            />
          </td>
        ))}
      </tr>
    ))}
  </>
);

export default SkeletonRows;
