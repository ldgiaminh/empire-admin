import React from "react"
import { Link } from "react-router-dom"

// const BookingId = cell => {
//   return (
//     <Link to="#" className="text-body fw-bold">
//       {cell.value ? cell.value : ""}
//     </Link>
//   )
// }

const BookingCode = cell => {
  return (
    <Link to="#" className="text-body fw-bold">
      {cell.value ? cell.value : ""}
    </Link>
  )
}

const Name = cell => {
  return cell.value ? cell.value : ""
}

const Phone = cell => {
  return cell.value ? cell.value : ""
}

const ModalCar = cell => {
  return cell.value ? cell.value : ""
}

const Plate = cell => {
  return cell.value ? cell.value : ""
}

const Status = cell => {
  return cell.value ? cell.value : ""
}

export { BookingCode, Name, Phone, ModalCar, Plate, Status }
