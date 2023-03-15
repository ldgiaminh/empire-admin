import React from "react"
import { Link } from "react-router-dom"
import * as moment from "moment"
import { size, map } from "lodash"

const toLowerCase1 = str => {
  return str === "" || str === undefined ? "" : str.toLowerCase()
}

const Name = cell => {
  return cell.value ? cell.value : ""
}

const IntendedMinute = cell => {
  return cell.value ? cell.value : ""
}

export { Name, IntendedMinute }
