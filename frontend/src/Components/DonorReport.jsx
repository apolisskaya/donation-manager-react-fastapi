import React from 'react';

const formatAmount = (resourceType, quantity) => {
    if (resourceType === 'money') {
      const dollars = Math.floor(quantity / 100);
      const cents = quantity % 100;
      return `$${dollars}.${cents < 10 ? '0' : ''}${cents}`;
    }
    return quantity;
  };

const DonorReport = ({ reportData }) => {
  return (
    <div>
      <table className="donor-table">
        <thead>
          <tr>
            <th>Donor Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Resource Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((donor, index) => (
            donor.donations.map((donation, subIndex) => (
              <tr key={index + subIndex}>
                <td>{donor.donor.name}</td>
                <td>{donor.donor.email || ''}</td>
                <td>{donor.donor.phone || ''}</td>
                <td>{donation.resource_type}</td>
                <td>{formatAmount(donation.resource_type, donation.quantity)}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonorReport;
