import React from 'react';

const formatAsMoney = (cents) => {
    if (cents === null || cents === undefined) return ''; // Handle null or undefined
    const dollars = cents / 100;
    return `$${dollars.toFixed(2)}`;
};

const InventoryReport = ({ reportData }) => {
  return (
    <div>
      <h2>Inventory Report</h2>
      <table>
        <thead>
          <tr>
            <th>Resource Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((item, index) => (
            <tr key={index}>
              <td>{item.resource_type}</td>
              <td>{item.resource_type === 'money' ? formatAsMoney(item.quantity) : item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryReport;
