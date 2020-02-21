import React from 'react';
import RentedCarsTable from './rentedCarsTable/RentedCarsTable';

export default function CurrentRentals() {
  return (
    <div>
      <div className="p-3">
        <h3>Current rentals</h3>
        <RentedCarsTable />
      </div>
    </div>
  );
}
