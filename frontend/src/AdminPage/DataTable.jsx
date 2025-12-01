import React from 'react';

const DataTable = ({
  title,
  data,
  columns,
  onEdit,
  onDelete,
  stats,
  showAddButton = true,
  onAdd,
  addButtonText = 'Add New',
  searchPlaceholder = 'Search...',
  filters = [],
  onSearch,
  onFilter
}) => {
  return (
    <div className="space-y-8">
      {/* Header with Stats */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-[#624d41]">{title}</h1>
          <p className="text-[#b6b1b2] mt-2">Manage and monitor your data</p>
        </div>
        {stats && (
          <div className="flex flex-wrap gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-[#f8f9fa] px-4 py-3 rounded-lg border border-[#e9ecef] shadow-sm">
                <div className="text-2xl font-bold text-[#a50805]">{stat.value}</div>
                <div className="text-xs text-[#b6b1b2] uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#b6b1b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              type="text"
              placeholder={searchPlaceholder}
              onChange={(e) => onSearch && onSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] focus:border-transparent transition-all duration-200"
            />
          </div>
          <div className="flex gap-2">
            {filters.map((filter, index) => (
              <select
                key={index}
                onChange={(e) => onFilter && onFilter(filter.key, e.target.value)}
                className="px-4 py-3 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] bg-white"
              >
                <option value="">{filter.placeholder}</option>
                {filter.options.map((option, idx) => (
                  <option key={idx} value={option.value}>{option.label}</option>
                ))}
              </select>
            ))}
          </div>
        </div>
      </div>

      {/* Add Button */}
      {showAddButton && onAdd && (
        <div className="flex justify-end">
          <button
            onClick={onAdd}
            className="bg-gradient-to-r from-[#a50805] to-[#d32f2f] text-white px-8 py-4 rounded-lg hover:from-[#d32f2f] hover:to-[#a50805] transition-all duration-300 font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span>{addButtonText}</span>
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-gradient-to-br from-white to-[#f8f9fa] border border-[#e9ecef] rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef]">
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className="px-6 py-5 text-left text-[#624d41] font-semibold text-sm uppercase tracking-wider">
                    {column.header}
                  </th>
                ))}
                <th className="px-6 py-5 text-left text-[#624d41] font-semibold text-sm uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e9ecef]">
              {data.map((item, index) => (
                <tr key={item.id || item.userID || index} className="hover:bg-gradient-to-r hover:from-[#f8f9fa] hover:to-white transition-all duration-200 group">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 text-left">
                      {column.render ? column.render(item) : item[column.key]}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-left">
                    <div className="flex items-center space-x-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="bg-gradient-to-r from-[#2196f3] to-[#42a5f5] text-white px-4 py-2 rounded-lg hover:from-[#42a5f5] hover:to-[#2196f3] transition-all duration-200 text-sm font-medium flex items-center space-x-1 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                          <span>Edit</span>
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item.id || item.userID)}
                          className="bg-gradient-to-r from-[#d32f2f] to-[#a50805] text-white px-4 py-2 rounded-lg hover:from-[#a50805] hover:to-[#d32f2f] transition-all duration-200 text-sm font-medium flex items-center space-x-1 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                          <span>Delete</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="bg-[#f8f9fa] px-6 py-4 border-t border-[#e9ecef]">
          <div className="flex items-center justify-between">
            <div className="text-sm text-[#b6b1b2]">
              Showing <span className="font-medium text-[#624d41]">{data.length}</span> of <span className="font-medium text-[#624d41]">{data.length}</span> entries
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm border border-[#e9ecef] rounded hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-[#a50805] text-white border border-[#a50805] rounded">
                1
              </button>
              <button className="px-3 py-1 text-sm border border-[#e9ecef] rounded hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;