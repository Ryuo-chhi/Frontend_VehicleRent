import { useState, useMemo, useEffect } from 'react';

const useTable = ({ data = [], searchQuery = '', searchFields = [], itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Reset to page 1 when search or data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, data.length]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getNestedValue = (obj, path) => {
    const keys = path.split('.');
    let val = obj;
    for (let k of keys) {
      if (val === null || val === undefined) return undefined;
      val = val[k];
    }
    return val;
  };

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    const lowerQuery = searchQuery.toLowerCase();
    
    return data.filter(item => {
      return searchFields.some(field => {
        const val = getNestedValue(item, field);
        if (val === null || val === undefined) return false;
        return val.toString().toLowerCase().includes(lowerQuery);
      });
    });
  }, [data, searchQuery, searchFields]);

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let valA = getNestedValue(a, sortConfig.key);
        let valB = getNestedValue(b, sortConfig.key);

        // Handle numeric sorting properly if both are numbers
        if (typeof valA === 'number' && typeof valB === 'number') {
           return sortConfig.direction === 'ascending' ? valA - valB : valB - valA;
        }

        // Convert to strings for comparison otherwise
        const strA = String(valA || '').toLowerCase();
        const strB = String(valB || '').toLowerCase();

        if (strA < strB) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (strA > strB) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / itemsPerPage));
  
  const currentData = useMemo(() => {
    // Prevent out of bounds if filters reduce data size
    const safePage = Math.min(currentPage, totalPages);
    const begin = (safePage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return sortedData.slice(begin, end);
  }, [sortedData, currentPage, totalPages, itemsPerPage]);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return <span className="text-gray-300 opacity-50 ml-1">↕</span>;
    return sortConfig.direction === 'ascending' ? <span className="text-blue-600 ml-1">↑</span> : <span className="text-blue-600 ml-1">↓</span>;
  };

  return { currentData, requestSort, sortConfig, currentPage, totalPages, goToPage, totalItems: filteredData.length, SortIcon };
};

export default useTable;
