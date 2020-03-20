import React from 'react'

export default function RentedCarsTableHeader(props) {
  
const colums = props.colums.map((column) => <th>{column}</th>)
  
  return (
    <tr>
      {colums}
    </tr>
  )
}
