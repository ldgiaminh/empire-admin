import React, { useState } from "react"
import QrReader from "react-qr-reader"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { checkinBooking as checkInBooking } from "store/actions"

const QrScanner = props => {
  const { history } = props

  const [qrData, setQRData] = useState("")
  const [showScanner, setShowScanner] = useState(true)
  const [bookingId, setBookingId] = useState(null)
  const [errorStatus, setErrorStatus] = useState(null)

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

  const now = new Date()
  const timeZoneOffset = 7 // Vietnam is GMT+7

  const vietnamDate = new Date(now.getTime() + timeZoneOffset * 60 * 60 * 1000)
  const isoDateTime = vietnamDate.toISOString()

  const sendNotification = ({ userId, code }) => {
    const notificationId = uuid.v4()
    set(ref(db, `users/${userId}/notifications/${notificationId}`), {
      isRead: "false",
      message: "Check-in thành công #" + code,
      time: isoDateTime,
      title: "Bạn đã check-in thành công",
    })
  }

  const goToCheckin = ({ id, userId, code }) => {
    dispatch(checkInBooking(id))
    sendNotification(userId, code)
    toastr.success("Check-in thành công", "Thành công")
    history.push(`/booking-detail/${id}`)
  }

  const handleScan = data => {
    if (data) {
      setShowScanner(false)
      setQRData(data)
      //Call API close generation
      fetch(
        `https://empire-api.azurewebsites.net/api/v1/booking-qrcode/close-generation?qrcode=${encodeURIComponent(
          data
        )}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJqdGkiOiI0ZGRmZjhkZC01MTkzLTRlOGYtODQ4OC02ZWEyYjVmZDI3ODgiLCJ1bmlxdWVfbmFtZSI6IkFkbWluIiwibmFtZWlkIjoiMTgiLCJyb2xlIjoiQUQiLCJuYmYiOjE2NzkzMjE5MjMsImV4cCI6MTcxMDk0NDMyMywiaWF0IjoxNjc5MzIxOTIzfQ.VOZRYUZer3Vat781lDsDZ5VmGhNATG1jZwZkabKfhXE",
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
          //Redirect to booking detail
          goToCheckin(data.bookingId, data.user.id, data.code)
        })
        .catch(error => {
          console.error("Error:", error)
        })
    }
  }

  const handleError = err => {
    console.error(err)
  }

  const toggleScanner = () => {
    setShowScanner(!showScanner)
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
