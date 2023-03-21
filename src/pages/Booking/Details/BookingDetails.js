import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link, withRouter } from "react-router-dom"
import uuid from "uuid"
import { connect } from "react-redux"
import { isEmpty, map } from "lodash"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap"
import Select from "react-select"
import Dropzone from "react-dropzone"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import {
  getBookingDetails as onGetBookingDetail,
  checkinBooking as checkInBooking,
} from "store/bookings/actions"

//redux
import { useSelector, useDispatch } from "react-redux"
import { ref, set } from "firebase/database"
import { db } from "helpers/firebase"

const BookingDetails = props => {
  //meta title
  document.title = "Chi Tiết Đặt Lịch | Empire Admin"

  const dispatch = useDispatch()
  const { history } = props

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { bookingDetail } = useSelector(state => ({
    bookingDetail: state.bookings.bookingDetail,
  }))

  /*
  ==================================================
  PRAMS (ID) & useEffect
  ==================================================
  */
  const {
    match: { params },
  } = props

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetBookingDetail(params.id))
    }
  }, [params, onGetBookingDetail])

  /*
  ==================================================
  CHECK-IN FUNCTION
  ==================================================
  */

  /* ALERT */
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

  const sendNotification = userId => {
    const notificationId = uuid.v4()
    set(ref(db, `users/${userId}/notifications/${notificationId}`), {
      isRead: "false",
      message: "Check-in thành công #" + bookingDetail.code,
      time: isoDateTime,
      title: "Bạn đã check-in thành công",
    })
  }

  /* HANDLE CHECK IN */
  const handleCheckIn = id => {
    dispatch(checkInBooking(id))
    toastr.success("Check-in thành công", "Thành công")
    dispatch(onGetBookingDetail(id))
    sendNotification(bookingDetail.user.id)
  }

  /*
  ==================================================
  FORMAT DATE TIME from API
  ==================================================
  */

  /* DATE */
  const bookingDate = bookingDetail.date
  const bookDate = new Date(bookingDate)
  const formattedDate = bookDate.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  /* CREATE AT  */
  const createAtDate = bookingDetail.createdAt
  const createDate = new Date(createAtDate)
  const formattedDate1 = createDate.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
  const formattedTime1 = createDate.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
  const formattedDateTime1 = `${formattedDate1} - ${formattedTime1}`

  /* ARRIVED DATE */
  const checkInDate = bookingDetail.arrivedDateTime
  const checkDate = new Date(checkInDate)
  const formattedDate2 = checkDate.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
  const formattedTime2 = checkDate.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
  const formattedDateTime2 = `${formattedDate2} - ${formattedTime2}`

  /* ========================================== RENDER ==============================================*/
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title="Đặt lịch"
            breadcrumbItem={"#" + bookingDetail.code}
          />

          {!isEmpty(bookingDetail) && (
            <>
              {/* <Row>
                <Col xl={12}>
                  <Row>
                    <Col lg={3}>
                      <Card className="mini-stats-wid">
                        <CardBody>
                          <div className="d-flex flex-wrap">
                            <div className="me-3">
                              <p className="text-muted mb-2">Mã Đặt Lịch</p>
                              <h5 className="mb-0">{bookingDetail.code}</h5>
                            </div>

                            <div className="avatar-sm ms-auto">
                              <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                                <i className="bx bxs-card"></i>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg={3}>
                      <Card className="blog-stats-wid">
                        <CardBody>
                          <div className="d-flex flex-wrap">
                            <div className="me-3">
                              <p className="text-muted mb-2">
                                Ngày gữi yêu cầu
                              </p>
                              <h5 className="mb-0">{formattedDateTime1}</h5>
                            </div>

                            <div className="avatar-sm ms-auto">
                              <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                                <i className="bx bx-calendar-plus"></i>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg={3}>
                      <Card className="blog-stats-wid">
                        <CardBody>
                          <div className="d-flex flex-wrap">
                            <div className="me-3">
                              <p className="text-muted mb-2">Ngày đặt lịch</p>
                              <h5 className="mb-0">{formattedDate}</h5>
                            </div>

                            <div className="avatar-sm ms-auto">
                              <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                                <i className="bx bx-calendar"></i>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg={3}>
                      <Card className="blog-stats-wid">
                        <CardBody>
                          <div className="d-flex flex-wrap">
                            <div className="me-3">
                              <p className="text-muted mb-2">
                                Thời gian Check-in
                              </p>
                              <h5 className="mb-0">
                                {bookingDetail.arrivedDateTime != null
                                  ? formattedDateTime2
                                  : "Xe chưa đến ga-ra"}
                              </h5>
                            </div>

                            <div className="avatar-sm ms-auto">
                              <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                                <i className="bx bxs-calendar-check"></i>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col xl={12}>
                  <Row>
                    <Col xl={4}>
                      <Card>
                        <CardBody>
                          <CardTitle className="mb-3">
                            Thông tin cá nhân
                          </CardTitle>
                        
                          <div className="table-responsive">
                            <Table className="mb-0">
                              <tbody>
                                <tr>
                                  <th scope="row">Họ và tên :</th>
                                  <td>{bookingDetail.user.fullname}</td>
                                </tr>
                                <tr>
                                  <th scope="row">Số điện thoại :</th>
                                  <td>{`(+${bookingDetail.user.phone.slice(
                                    1,
                                    3
                                  )}) ${bookingDetail.user.phone.slice(
                                    3
                                  )}`}</td>
                                </tr>
                                <tr>
                                  <th scope="row">E-mail :</th>
                                  <td>{bookingDetail.user.email}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col xl={4}>
                      <Card>
                        <CardBody>
                          <CardTitle className="mb-3">Phương tiện</CardTitle>
                          <div className="table-responsive">
                            <Table className="table-nowrap mb-0">
                              <tbody>
                                <tr>
                                  <th scope="row">Biển số xe :</th>
                                  <td>{bookingDetail.car.carLisenceNo} </td>
                                </tr>
                                <tr>
                                  <th scope="row">Thương hiệu :</th>
                                  <td>{bookingDetail.car.carBrand}</td>
                                </tr>
                                <tr>
                                  <th scope="row">Dòng xe :</th>
                                  <td>{bookingDetail.car.carModel}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col xl={4}>
                      <Card>
                        <CardBody>
                          <CardTitle className="mb-3">
                            Tình trạng xe được khách mô tả
                          </CardTitle>

                          <div className="table-responsive">
                            <Table className="mb-0">
                              {map(bookingDetail.symptoms, symptom => (
                                <tbody>
                                  <tr key={symptom.id}>
                                    <td
                                      scope="row"
                                      className="mdi mdi-chevron-right text-primary"
                                    >
                                      <span className="text-black">
                                        {symptom.name}
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              ))}
                            </Table>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row> */}

              <Row>
                <Col>
                  <Card>
                    <CardBody>
                      <CardTitle>Thông tin tổng</CardTitle>
                      <CardSubtitle className="mb-3">
                        Chi tiết về đặt lịch và thông tin khách hàng
                      </CardSubtitle>

                      <Row>
                        <Col xl="6">
                          <div className="table-responsive">
                            <Table className="table table-borderless  mb-0">
                              <tbody>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Tên khách:
                                  </th>
                                  <td>{bookingDetail.user.fullname}</td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Số điện thoại :
                                  </th>
                                  <td>{`(+${bookingDetail.user.phone.slice(
                                    1,
                                    3
                                  )}) ${bookingDetail.user.phone.slice(
                                    3
                                  )}`}</td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    E-mail :
                                  </th>
                                  <td>{bookingDetail.user.email}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                        <Col xl="6">
                          <div className="table-responsive">
                            <Table className="table table-borderless  mb-0">
                              <tbody>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Thời gian tạo lịch :
                                  </th>
                                  <td>{formattedDateTime1}</td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Thời gian check-in :
                                  </th>
                                  <td>
                                    {bookingDetail.arrivedDateTime != null
                                      ? formattedDateTime2
                                      : "Xe chưa đến ga-ra"}
                                  </td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Trạng thái :
                                  </th>
                                  <td>
                                    {bookingDetail.isActived
                                      ? bookingDetail.isArrived
                                        ? "Đã đến"
                                        : "Chưa đến"
                                      : "Hủy"}
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardBody>
                      <CardTitle>Phương tiện</CardTitle>
                      <CardSubtitle className="mb-3">
                        Thông về phương tiện và tình trạng
                      </CardSubtitle>
                      <Row>
                        <Col xl="6">
                          <div className="table-responsive">
                            <Table className="table table-borderless  mb-0">
                              <tbody>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Biển số xe :
                                  </th>
                                  <td>{bookingDetail.car.carLisenceNo}</td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Dòng xe :
                                  </th>
                                  <td>
                                    {bookingDetail.car.carBrand +
                                      " - " +
                                      bookingDetail.car.carModel}
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                        <Col xl="6">
                          <div className="table-responsive">
                            <Table className="table table-borderless  mb-0">
                              <tbody>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Tình trạng khách mô tả :
                                  </th>
                                  <td>
                                    {bookingDetail.symptoms
                                      .map(symptom => symptom.name)
                                      .join(", ")}
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                  <Row className="mt-4">
                    <Col sm="6">
                      <Link
                        to="/booking"
                        className="btn text-muted d-none d-sm-inline-block btn-link"
                      >
                        <i className="mdi mdi-arrow-left me-1" /> Trở về trang
                        danh sách đặt lịch{" "}
                      </Link>
                    </Col>
                    {!bookingDetail.isArrived && bookingDetail.isActived ? (
                      <Col sm="6">
                        <div className="text-sm-end">
                          <Button
                            type="button"
                            color="success"
                            className="btn btn-lg"
                            onClick={() => handleCheckIn(params.id)}
                          >
                            Check-in
                          </Button>
                        </div>
                      </Col>
                    ) : (
                      ""
                    )}
                  </Row>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

BookingDetails.propTypes = {
  match: PropTypes.object,
}

export default withRouter(BookingDetails)
