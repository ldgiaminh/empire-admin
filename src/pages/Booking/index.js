import React, { useEffect, useState, useRef, useMemo } from "react"
import { withRouter, Link } from "react-router-dom"
import Loader from "components/Loader"
import PropTypes from "prop-types"
import toastr from "toastr"
import { isEmpty } from "lodash"
import "toastr/build/toastr.min.css"
import TableContainer from "../../components/Common/TableContainer"
import classnames from "classnames"
import moment from "moment"
import "moment/locale/vi"
import QrScanner from "./QrScanner"
import {
  Button,
  Col,
  Card,
  CardBody,
  Row,
  Container,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Nav,
} from "reactstrap"

import {
  BookingCode,
  ModalCar,
  Name,
  Phone,
  Plate,
  Status,
} from "./BookingUserListCol"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import {
  getBookingLists as onGetBookings,
  getBookingListsByDate as onGetBookingByDate,
  checkinBooking as checkInBooking,
  changePreloader as onLoading,
} from "store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"
import CheckInModal from "./CheckInModal"

const BookingList = props => {
  //meta title
  document.title = "Đặt Lịch | Empire Admin"

  const { history } = props
  const dispatch = useDispatch()

  /*
  ==================================================
  Render Day,Date in Father Tabs
  ==================================================
  */
  const today = moment().locale("vi")
  const monday = today.clone().startOf("isoWeek")
  const sunday = today.clone().endOf("isoWeek")

  const weekDays = []
  let currentDate = monday.clone()
  while (currentDate.isSameOrBefore(sunday, "day")) {
    //const date = currentDate.clone().format("YYYY-MM-DD") + "T00:00:00+00:00"
    const date = currentDate.clone().format("YYYY-MM-DD")
    const dateFormat = currentDate.clone().format("DD/MM")
    const dayArray = currentDate.format("dddd").split(" ")
    dayArray[0] = dayArray[0].charAt(0).toUpperCase() + dayArray[0].slice(1)
    dayArray[1] = dayArray[1].charAt(0).toUpperCase() + dayArray[1].slice(1)
    const day = dayArray.join(" ")
    weekDays.push({ day, date, dateFormat })

    currentDate.add(1, "day")
  }

  /*
  ==================================================
  useState
  ==================================================
  */
  const [activeTab, setActiveTab] = useState(
    weekDays.findIndex(day => day.dateFormat === today.format("DD/MM"))
  )
  const [subActiveTab, setSubActiveTab] = useState(0)

  const [booking, setBooking] = useState([])
  const [bookingList, setBookingList] = useState([])

  const [loading, setLoading] = useState(true)

  /*
  ==================================================
  Changes Tabs
  ==================================================
  */

  //Father Tabs
  const toggleTab = index => {
    setActiveTab(index)
    setSubActiveTab(0)
    const activeDate = weekDays[index].date
    dispatch(onGetBookingByDate(activeDate))
  }

  //Nested Tabs
  const toggleSubTab = index => {
    setSubActiveTab(index)
  }

  /*
  ==================================================
  Call api and useEffect
  ==================================================
  */

  //Get State from Redux
  const { bookings, isPreloader } = useSelector(state => ({
    bookings: state.bookings.bookings,
    isPreloader: state.Layout.isPreloader,
  }))

  const activeDate = weekDays[activeTab].date

  useEffect(() => {
    if (bookings && !bookings.length) {
      // dispatch(onLoading(true))
      //dispatch(onGetBookings())
      dispatch(onGetBookingByDate(activeDate))
    }
  }, [dispatch, bookings, activeDate])

  useEffect(() => {
    setBooking(bookings)
  }, [bookings])

  useEffect(() => {
    if (!isEmpty(bookings)) {
      setBooking(bookings)
    }
  }, [bookings])

  /*
  ==================================================
  Filter with Status
  ==================================================
  */
  const tableBookings = index => {
    const filteredBookings = bookings.filter(booking => {
      if (index === 0) {
        return !booking.isArrived && booking.isActived
      } else if (index === 1) {
        return booking.isArrived && booking.isActived
      } else if (index === 2) {
        return !booking.isArrived && !booking.isActived
      }
    })
    return filteredBookings
  }

  const pendingBooking = tableBookings(subActiveTab)
  const arrivedBooking = tableBookings(subActiveTab)
  const cancelBooking = tableBookings(subActiveTab)

  /*
  ==================================================
  Check-in 
  ==================================================
  */

  var node = useRef()
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page)
    }
  }

  //Notification
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

  const [checkinModal, setCheckInModal] = useState(false)

  const toggleViewModal = bookingData => {
    setBooking(bookingData)
    setCheckInModal(!checkinModal)
  }

  const handleCheckIn = () => {
    if (booking.id) {
      dispatch(checkInBooking(booking.id))
      onPaginationPageChange(1)
      setCheckInModal(false)
      toastr.success("Check-in thành công", "Thành công")
      dispatch(onGetBookings())
      history.push(`/booking-detail/${booking.id}`)
    }
  }

  const handleCheckInClick = () => {
    history.push("/scanner")
  }

  /*
  ==================================================
  Column for each Table with Status
  =================================================
  */
  const columnsNotYet = useMemo(
    () => [
      {
        Header: "Mã đặt lịch",
        accessor: "code",
        width: "150px",
        style: {
          textAlign: "center",
          width: "10%",
          background: "#0000",
        },
        filterable: true,
        Cell: cellProps => {
          return <BookingCode {...cellProps} />
        },
      },
      {
        Header: "Tên khách hàng",
        accessor: "user.fullname",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Số điện thoại",
        accessor: "user.phone",
        filterable: true,
        Cell: cellProps => {
          return <Phone {...cellProps} />
        },
      },
      {
        Header: "Thương hiệu",
        accessor: "car.carBrand",
        filterable: true,
        Cell: cellProps => {
          return <ModalCar {...cellProps} />
        },
      },
      {
        Header: "Dòng xe",
        accessor: "car.carModel",
        filterable: true,
        Cell: cellProps => {
          return <ModalCar {...cellProps} />
        },
      },
      {
        Header: "Biển số xe",
        accessor: "car.carLisenceNo",
        filterable: true,
        Cell: cellProps => {
          return <Plate {...cellProps} />
        },
      },

      {
        Header: "Chi tiết",
        accessor: "view",
        disableFilters: true,
        Cell: cellProps => {
          return (
            <Button
              type="button"
              color="primary"
              onClick={() =>
                history.push(`/booking-detail/${cellProps.row.original.id}`)
              }
            >
              Xem chi tiết
            </Button>
          )
        },
      },
      {
        Header: "Check-in",
        accessor: "action",
        disableFilters: true,
        Cell: cellProps => {
          return (
            <Button
              type="button"
              color="success"
              onClick={() => {
                toggleViewModal(cellProps.row.original)
              }}
            >
              Check-in
            </Button>
          )
        },
      },
    ],
    []
  )

  const columnsArrivedCancel = useMemo(
    () => [
      {
        Header: "Mã đặt lịch",
        accessor: "code",
        filterable: true,
        Cell: cellProps => {
          return <BookingCode {...cellProps} />
        },
      },
      {
        Header: "Tên khách hàng",
        accessor: "user.fullname",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Số điện thoại",
        accessor: "user.phone",
        filterable: true,
        Cell: cellProps => {
          return <Phone {...cellProps} />
        },
      },
      {
        Header: "Thương hiệu",
        accessor: "car.carBrand",
        filterable: true,
        Cell: cellProps => {
          return <ModalCar {...cellProps} />
        },
      },
      {
        Header: "Dòng xe",
        accessor: "car.carModel",
        filterable: true,
        Cell: cellProps => {
          return <ModalCar {...cellProps} />
        },
      },
      {
        Header: "Biển số xe",
        accessor: "car.carLisenceNo",
        filterable: true,
        Cell: cellProps => {
          return <Plate {...cellProps} />
        },
      },
      {
        Header: "Chi tiết",
        accessor: "view",
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <Button
              type="button"
              color="primary"
              onClick={() => history.push(`/booking-detail/${row.original.id}`)}
            >
              Xem chi tiết
            </Button>
          )
        },
      },
    ],
    []
  )

  return (
    <React.Fragment>
      {isPreloader && <Loader />}

      <CheckInModal
        isOpen={checkinModal}
        toggle={toggleViewModal}
        data={booking}
        handleCheckIn={handleCheckIn}
      />

      {!isPreloader && (
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Đặt Lịch" breadcrumbItem="Danh sách đặt lịch" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <Nav
                      pills
                      className="nav bg-light rounded nav-justified"
                      role="tablist"
                    >
                      {weekDays.map((day, index) => (
                        <NavItem key={index}>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: activeTab === index,
                            })}
                            onClick={() => {
                              toggleTab(index)
                            }}
                          >
                            {day.day} ({day.dateFormat})
                          </NavLink>
                        </NavItem>
                      ))}
                    </Nav>

                    <div className="mt-4">
                      {weekDays.map((day, index) => (
                        <div key={index}>
                          {activeTab === index && (
                            <>
                              <ul
                                className="nav nav-tabs nav-tabs-custom"
                                role="tablist"
                              >
                                <NavItem>
                                  <NavLink
                                    className={classnames({
                                      active: subActiveTab === 0,
                                    })}
                                    onClick={() => {
                                      toggleSubTab(0)
                                    }}
                                  >
                                    Chưa đến
                                  </NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink
                                    className={classnames({
                                      active: subActiveTab === 1,
                                    })}
                                    onClick={() => {
                                      toggleSubTab(1)
                                    }}
                                  >
                                    Đã đến
                                  </NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink
                                    className={classnames({
                                      active: subActiveTab === 2,
                                    })}
                                    onClick={() => {
                                      toggleSubTab(2)
                                    }}
                                  >
                                    Hủy
                                  </NavLink>
                                </NavItem>
                              </ul>
                              <TabContent className="p-3 mt-4">
                                {subActiveTab === 0 && (
                                  <TabPane id="not-yet">
                                    <TableContainer
                                      columns={columnsNotYet}
                                      data={pendingBooking}
                                      isGlobalFilter={true}
                                      isAddBookingOptions={false}
                                      //handleUserClick={handleUserClicks}
                                      isCheckin={true}
                                      handleCheckInClick={handleCheckInClick}
                                      customPageSize={10}
                                      className="custom-header-css"
                                    />
                                  </TabPane>
                                )}
                                {subActiveTab === 1 && (
                                  <TabPane id="not-yet">
                                    <TableContainer
                                      columns={columnsArrivedCancel}
                                      data={arrivedBooking}
                                      isGlobalFilter={true}
                                      isAddBookingOptions={false}
                                      //handleUserClick={handleUserClicks}
                                      customPageSize={10}
                                      className="custom-header-css"
                                    />
                                  </TabPane>
                                )}
                                {subActiveTab === 2 && (
                                  <TabPane id="not-yet">
                                    <TableContainer
                                      columns={columnsArrivedCancel}
                                      data={cancelBooking}
                                      isGlobalFilter={true}
                                      isAddBookingOptions={false}
                                      //handleUserClick={handleUserClicks}
                                      customPageSize={10}
                                      className="custom-header-css"
                                    />
                                  </TabPane>
                                )}
                              </TabContent>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </React.Fragment>
  )
}

BookingList.propTypes = {
  isPreloader: PropTypes.bool,
}

export default withRouter(BookingList)
