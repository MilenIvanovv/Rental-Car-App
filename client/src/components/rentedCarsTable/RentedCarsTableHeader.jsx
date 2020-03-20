import React from 'react'

export default function RentedCarsTableHeader(props) {
  
const colums = props.colums.map((colum) => <th key={colum}>{colum}</th>)
  
  return (
    <tr>
      {colums}
    </tr>
  )
}
