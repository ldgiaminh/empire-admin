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

  const handleScan = data => {
    if (data) {
      setShowScanner(false)
      setQRData(data)
      //Call API close generation
      fetch(
        `https://dev-empire-api.azurewebsites.net/api/v1/booking-qrcode/close-generation?qrcode=${encodeURIComponent(
          data
        )}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ZTc1ZjI2ZS0wNGU1LTRlNzctOWNkZi05YWM1MWM2MGU4M2IiLCJuYW1lIjoiVGjDtG5nIEhvw6BuZyIsIm5hbWVpZCI6IjciLCJyb2xlIjoiVVMiLCJuYmYiOjE2NzcxMzk5NDQsImV4cCI6MTcwODY3NTk0NCwiaWF0IjoxNjc3MTM5OTQ0fQ.CKR7ILcdt9KrGr-I6kxugrQ8jBeaMuTlDLPF8kW53EQ",
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
          goToCheckin(bookingId)
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

  const goToCheckin = id => {
    dispatch(checkInBooking(id))
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
