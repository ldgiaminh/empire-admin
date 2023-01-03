import React from "react"
import { Link } from "react-router-dom"

const OrderId = cell => {
  return (
    <Link to="#" className="text-body fw-bold">
      {cell.value ? cell.value : ""}
    </Link>
  )
}

const Name = cell => {
  return cell.value ? cell.value : ""
}

const Date = cell => {
  return cell.value ? cell.value : ""
}

const ModalCar = cell => {
  return cell.value ? cell.value : ""
}

const Plate = cell => {
  return cell.value ? cell.value : ""
}

export { OrderId, Name, Date, ModalCar, Plate }
