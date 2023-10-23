import React from 'react';

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
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryReport;
