import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"

const formatDate = (date, format) => {
  const dateFormat = format ? format : "DD MMM Y"
  const timeFormat = format && format.includes("H") ? "HH:mm:ss" : ""
  const formattedDate = moment(new Date(date))
    .format(`${dateFormat} - ${timeFormat}`)
    .trim()
  return formattedDate
}

const OrderCode = cell => {
  return (
    <Link to="#" className="text-body fw-bold">
      {cell.value ? cell.value : ""}
    </Link>
  )
}

const Name = cell => {
  return cell.value ? cell.value : ""
}

const DateCell = cell => {
  if (!cell.value) {
    return ""
  }
  const formattedDateTime = formatDate(cell.value, "DD/MM/YYYY H:mm:ss")
  const formattedTime = formattedDateTime.split(" - ")[1] // get the formatted time from the formatted date and time
  return `${formattedDateTime.split(" ")[0]} ${formattedTime}` // return the formatted date and time in the desired format
}

const ModalCar = cell => {
  return cell.value ? cell.value : ""
}

const Plate = cell => {
  return cell.value ? cell.value : ""
}

const Expert = cell => {
  return cell.value ? cell.value : ""
}

export { OrderCode, Name, DateCell, ModalCar, Plate, Expert }
