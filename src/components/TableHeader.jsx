import React from 'react'

export const TableHeader = ({headers}) => {
  return (
    <thead className="bg-gray-50">
    <tr>
      {headers.map((item,index) => (
        <th key={index}
        scope="col"
        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
      >
        {headers[index]}
      </th>
      ))}

    </tr>
  </thead>
  )
}
