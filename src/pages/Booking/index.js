import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import TableContainer from "../../components/Common/TableContainer"
import * as Yup from "yup"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { BookingCode, ModalCar, Name, Phone, Plate } from "./BookingUserListCol"

//redux
import BookingUserListModal from "./BookingUserListModal"

import {
  Container,
  Button,
  Col,
  Row,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
  NavItem,
  NavLink,
  Card,
  CardBody,
  TabContent,
  TabPane,
} from "reactstrap"

function Booking() {
  //meta title
  document.title = "Đặt Lịch | Empire Admin"

  const [activeTab, setActiveTab] = useState("1")
  const [modal, setModal] = useState(false)
  const [modal1, setModal1] = useState(false)
  const [isCheck, setIsCheck] = useState(false)

  const [bookingUserList, setBookingUserList] = useState([])
  const [bookingUser, setBookingUser] = useState(null)

  const toggleViewModal = () => setModal1(!modal1)

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  const toggle = () => {
    if (modal) {
      setModal(false)
      setBookingUser(null)
    } else {
      setModal(true)
    }
  }

  const handleBookingUserDetailClick = arg => {
    const booking = arg
    setBookingUser({
      id: booking.id,
      code: booking.code,
      date: booking.date,
      status: booking.status,
      fullName: booking.fullName,
      phone: booking.orderdate,
      email: booking.email,
      car_modal: booking.car_modal,
      car_license_no: booking.paymentStatus,
    })

    setIsCheck(true)

    toggle()
  }

  const handleAddNewBookingClick = () => {
    setBookingUserList("")
    setIsCheck(false)
    toggle()
  }

  const columns = useMemo(
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
        disableFilters: true,
        Cell: cellProps => {
          return <BookingCode {...cellProps} />
        },
      },
      {
        Header: "Tên khách hàng",
        accessor: "fullname",
        disableFilters: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Số điện thoại",
        accessor: "phone",
        disableFilters: true,
        Cell: cellProps => {
          return <Phone {...cellProps} />
        },
      },
      {
        Header: "Modal xe",
        accessor: "car_modal",
        disableFilters: true,
        Cell: cellProps => {
          return <ModalCar {...cellProps} />
        },
      },
      {
        Header: "Biển số xe",
        accessor: "car_license_no",
        disableFilters: true,
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
              className="btn-sm btn-rounded"
              //onClick={toggleViewModal}
              onClick={() => {
                const bookingUserData = cellProps.row.original
                handleBookingUserDetailClick(bookingUserData)
              }}
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
        Cell: () => {
          return (
            <Button
              type="button"
              color="success"
              className="btn-sm btn-rounded"
              //onClick={toggleViewModal}
            >
              Check-in
            </Button>
          )
        },
      },
    ],
    []
  )

  const data = [
    {
      code: "#BK001",
      fullname: "Lê Đặng Gia Minh",
      phone: "0867635674",
      car_modal: "Tesla",
      car_license_no: "59D-123.45",
    },
    {
      code: "#BK002",
      fullname: "Trần Duy Hiếu Trung",
      phone: "0123456789",
      car_modal: "Ford",
      car_license_no: "63F-325.44",
    },
    {
      code: "#BK003",
      fullname: "Hoàng Trung Thông",
      phone: "0123456789",
      car_modal: "Honda",
      car_license_no: "30B-153.53",
    },
    {
      code: "#BK004",
      fullname: "Nguyễn Hoàng Hồng Phúc",
      phone: "0123456789",
      car_modal: "Porche",
      car_license_no: "72C-764.45",
    },
  ]

  const dataArrived = [
    {
      code: "#BK001",
      fullname: "Peter Parker",
      phone: "0573658193",
      car_modal: "Mercedes",
      car_license_no: "59F-325.44",
    },
    {
      code: "#BK002",
      fullname: "Tony Stark",
      phone: "0457465712",
      car_modal: "BMW",
      car_license_no: "59D-123.45",
    },
    {
      code: "#BK003",
      fullname: "Bruce Wayne",
      phone: "0174658272",
      car_modal: "Roll Royce",
      car_license_no: "59D-764.45",
    },
    {
      code: "#BK004",
      fullname: "Clark Kent",
      phone: "06587291357",
      car_modal: "McLaren",
      car_license_no: "59D-153.53",
    },
  ]

  const dataCancel = [
    {
      code: "#BK001",
      fullname: "Justin Bieber",
      phone: "0698532179",
      car_modal: "Lamborghini",
      car_license_no: "59D-123.45",
    },
    {
      code: "#BK002",
      fullname: "Charlie Puth",
      phone: "0985625719",
      car_modal: "Ferrari",
      car_license_no: "59D-325.44",
    },
    {
      code: "#BK003",
      fullname: "Post Malone",
      phone: "0326985716",
      car_modal: "Maserati",
      car_license_no: "59D-153.53",
    },
    {
      code: "#BK004",
      fullname: "Kendrick Lamar",
      phone: "0985326178",
      car_modal: "Aston Martin",
      car_license_no: "59D-764.45",
    },
  ]

  return (
    <React.Fragment>
      <BookingUserListModal isOpen={modal1} toggle={toggleViewModal} />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Đặt Lịch" breadcrumbItem="Danh sách đặt lịch" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "1",
                        })}
                        onClick={() => {
                          toggleTab("1")
                        }}
                      >
                        Xe chưa đến
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "2",
                        })}
                        onClick={() => {
                          toggleTab("2")
                        }}
                      >
                        Xe đã đến
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "3",
                        })}
                        onClick={() => {
                          toggleTab("3")
                        }}
                      >
                        Hủy
                      </NavLink>
                    </NavItem>
                  </ul>
                  <TabContent activeTab={activeTab} className="p-3">
                    <TabPane tabId="1" id="not-yet">
                      <TableContainer
                        columns={columns}
                        data={data}
                        isGlobalFilter={true}
                        isAddBookingOptions={true}
                        handleBookingClick={handleAddNewBookingClick}
                        customPageSize={10}
                        className="custom-header-css"
                      />
                    </TabPane>
                    <TabPane tabId="2" id="arrived">
                      <div>
                        <TableContainer
                          columns={columns}
                          data={dataArrived}
                          isGlobalFilter={true}
                          isAddBookingOptions={true}
                          handleBookingClick={handleAddNewBookingClick}
                          customPageSize={10}
                          className="custom-header-css"
                        />
                      </div>
                    </TabPane>
                    <TabPane tabId="3" id="cancel">
                      <div>
                        <TableContainer
                          columns={columns}
                          data={dataCancel}
                          isGlobalFilter={true}
                          isAddBookingOptions={true}
                          handleBookingClick={handleAddNewBookingClick}
                          customPageSize={10}
                          className="custom-header-css"
                        />
                      </div>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h4">
              {!!isCheck ? "Chi tiết đặt lịch" : "Thêm đặt lịch mới"}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={e => {
                  e.preventDefault()
                  //validation.handleSubmit()
                  return false
                }}
              >
                <Row form>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Mã đặt lịch</Label>
                      <Input
                        name="orderId"
                        type="text"
                        // onChange={validation.handleChange}
                        // onBlur={validation.handleBlur}
                        // value={validation.values.orderId || ""}
                        // invalid={
                        //   validation.touched.orderId &&
                        //   validation.errors.orderId
                        //     ? true
                        //     : false
                        // }
                      />
                      {/* {validation.touched.orderId &&
                      validation.errors.orderId ? (
                        <FormFeedback type="invalid">
                          {validation.errors.orderId}
                        </FormFeedback>
                      ) : null} */}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Ngày đặt lịch</Label>
                      <Input
                        name="orderdate"
                        type="date"
                        // value={orderList.orderdate || ""}
                        // onChange={validation.handleChange}
                        // onBlur={validation.handleBlur}
                        // value={validation.values.orderdate || ""}
                        // invalid={
                        //   validation.touched.orderdate &&
                        //   validation.errors.orderdate
                        //     ? true
                        //     : false
                        // }
                      />
                      {/* {validation.touched.orderdate &&
                      validation.errors.orderdate ? (
                        <FormFeedback type="invalid">
                          {validation.errors.orderdate}
                        </FormFeedback>
                      ) : null} */}
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">Trạng thái</Label>
                      <Input
                        name="badgeclass"
                        type="select"
                        className="form-select"
                        // onChange={validation.handleChange}
                        // onBlur={validation.handleBlur}
                        // value={validation.values.badgeclass || ""}
                      >
                        <option>Đã đến</option>
                        <option>Quá hạn</option>
                        <option>Chưa đến</option>
                      </Input>
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Họ và Tên</Label>
                      <Input
                        name="billingName"
                        type="text"
                        validate={{
                          required: { value: true },
                        }}
                        // onChange={validation.handleChange}
                        // onBlur={validation.handleBlur}
                        // value={validation.values.billingName || ""}
                        // invalid={
                        //   validation.touched.billingName &&
                        //   validation.errors.billingName
                        //     ? true
                        //     : false
                        // }
                      />
                      {/* {validation.touched.billingName &&
                      validation.errors.billingName ? (
                        <FormFeedback type="invalid">
                          {validation.errors.billingName}
                        </FormFeedback>
                      ) : null} */}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Số điện thoại</Label>
                      <Input
                        name="total"
                        type="text"
                        // onChange={validation.handleChange}
                        // onBlur={validation.handleBlur}
                        // value={validation.values.total || ""}
                        // invalid={
                        //   validation.touched.total && validation.errors.total
                        //     ? true
                        //     : false
                        // }
                      />
                      {/* {validation.touched.total && validation.errors.total ? (
                        <FormFeedback type="invalid">
                          {validation.errors.total}
                        </FormFeedback>
                      ) : null} */}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Email</Label>
                      <Input
                        name="total"
                        type="text"
                        // onChange={validation.handleChange}
                        // onBlur={validation.handleBlur}
                        // value={validation.values.total || ""}
                        // invalid={
                        //   validation.touched.total && validation.errors.total
                        //     ? true
                        //     : false
                        // }
                      />
                      {/* {validation.touched.total && validation.errors.total ? (
                        <FormFeedback type="invalid">
                          {validation.errors.total}
                        </FormFeedback>
                      ) : null} */}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Hiệu xe</Label>
                      <Input
                        name="total"
                        type="text"
                        // onChange={validation.handleChange}
                        // onBlur={validation.handleBlur}
                        // value={validation.values.total || ""}
                        // invalid={
                        //   validation.touched.total && validation.errors.total
                        //     ? true
                        //     : false
                        // }
                      />
                      {/* {validation.touched.total && validation.errors.total ? (
                        <FormFeedback type="invalid">
                          {validation.errors.total}
                        </FormFeedback>
                      ) : null} */}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Dòng xe</Label>
                      <Input
                        name="total"
                        type="text"
                        // onChange={validation.handleChange}
                        // onBlur={validation.handleBlur}
                        // value={validation.values.total || ""}
                        // invalid={
                        //   validation.touched.total && validation.errors.total
                        //     ? true
                        //     : false
                        // }
                      />
                      {/* {validation.touched.total && validation.errors.total ? (
                        <FormFeedback type="invalid">
                          {validation.errors.total}
                        </FormFeedback>
                      ) : null} */}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Biển số xe</Label>
                      <Input
                        name="total"
                        type="text"
                        // onChange={validation.handleChange}
                        // onBlur={validation.handleBlur}
                        // value={validation.values.total || ""}
                        // invalid={
                        //   validation.touched.total && validation.errors.total
                        //     ? true
                        //     : false
                        // }
                      />
                      {/* {validation.touched.total && validation.errors.total ? (
                        <FormFeedback type="invalid">
                          {validation.errors.total}
                        </FormFeedback>
                      ) : null} */}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      {!!isCheck ? (
                        <button
                          type="submit"
                          className="btn btn-success save-user"
                        >
                          Check-in
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-success save-user"
                        >
                          Lưu
                        </button>
                      )}
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  )
}

Booking.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default Booking
