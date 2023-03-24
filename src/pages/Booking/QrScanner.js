import React, { useState } from "react"
import QrReader from "react-qr-reader"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { useDispatch } from "react-redux"
import uuid from "uuid"

import {
  checkinBooking as checkInBooking,
  checkinQRCode as checkInQRCode,
} from "store/actions"
import { ref, set } from "firebase/database"
import { db } from "helpers/firebase"

const QrScanner = props => {
  const { history } = props
  const dispatch = useDispatch()
  const [qrData, setQRData] = useState("")
  const [showScanner, setShowScanner] = useState(true)
  const [bookingId, setBookingId] = useState(null)
  const [errorStatus, setErrorStatus] = useState(null)
  const obj = JSON.parse(localStorage.getItem("authUser"))

  const handleScan = data => {
    if (data) {
      setShowScanner(false)
      setQRData(data)
      //dispatch(checkInQRCode(data))
      //goToCheckin(data.bookingId)
      fetch(
        `https://dev-empire-api.azurewebsites.net/api/v1/booking-qrcode/close-generation?qrcode=${encodeURIComponent(
          data
        )}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + obj.accessToken,
          },
        }
      )
        .then(response => {
          if (!response.ok) {
            setErrorStatus(response.status)
            throw new Error("Network response was not ok")
          }
          return response.json()
        })
        .then(data => {
          setBookingId(data.bookingId)
          goToCheckin(data.bookingId, data.code, data.user.id)
        })
        .catch(error => {
          console.error("Error:", error)
        })
      console.log(data)
    }
  }
  const handleError = err => {
    console.error(err)
  }
  const toggleScanner = () => {
    setShowScanner(!showScanner)
  }

  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: true,
    progressBar: false,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  }

  const goToCheckin = ({ id, code, userId }) => {
    dispatch(checkInBooking(id))
    const notificationId = uuid.v4()
    set(ref(db, `users/${userId}/notifications/${notificationId}`), {
      isRead: "false",
      message: "Check-in thành công #" + code,
      time: isoDateTime,
      title: "Bạn đã check-in thành công",
    })
    toastr.success("Check-in thành công", "Thành công")
    history.push(`/booking-detail/${id}`)
  }

  return (
    <div>
      <h1>Scanner page</h1>
      {showScanner && (
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%", height: "100%" }}
        />
      )}
      {qrData && <p>{qrData}</p>}
      {errorStatus && <p>{errorStatus}</p>}
    </div>
  )
}

export default QrScanner
