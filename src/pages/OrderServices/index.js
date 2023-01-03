import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Link, withRouter } from "react-router-dom"
import classnames from "classnames"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import TableContainer from "../../components/Common/TableContainer"
import * as Yup from "yup"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { OrderId, Date, ModalCar, Name, Plate } from "./OrderServiceCol"

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

const OrderSerives = props => {
  //meta title
  document.title = "Dịch Vụ | Empire Admin"

  const { history } = props

  const [activeTab, setActiveTab] = useState("1")

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  const columns = useMemo(
    () => [
      {
        Header: "Mã đơn",
        accessor: "code",
        width: "150px",
        style: {
          textAlign: "center",
          width: "10%",
          background: "#0000",
        },
        disableFilters: true,
        Cell: cellProps => {
          return <OrderId {...cellProps} />
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
        Header: "Ngày đến",
        accessor: "date",
        disableFilters: true,
        Cell: cellProps => {
          return <Date {...cellProps} />
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
        Header: "Chẩn đoán",
        accessor: "view",
        disableFilters: true,
        Cell: cellProps => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() => history.push(`/order-service-diagnose`)}
            >
              Chẩn đoán
            </Button>
          )
        },
      },
    ],
    []
  )

  const columns1 = useMemo(
    () => [
      {
        Header: "Mã đơn",
        accessor: "code",
        width: "150px",
        style: {
          textAlign: "center",
          width: "10%",
          background: "#0000",
        },
        disableFilters: true,
        Cell: cellProps => {
          return <OrderId {...cellProps} />
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
        Header: "Ngày đến",
        accessor: "date",
        disableFilters: true,
        Cell: cellProps => {
          return <Date {...cellProps} />
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
              onClick={() => history.push(`/order-service-detail`)}
            >
              Xem chi tiết
            </Button>
          )
        },
      },
    ],
    []
  )

  const data = [
    {
      code: "#ORID001",
      fullname: "Lê Đặng Gia Minh",
      date: "01/01/2023",
      car_modal: "Tesla",
      car_license_no: "59D-123.45",
    },
    {
      code: "#ORID002",
      fullname: "Trần Duy Hiếu Trung",
      date: "02/02/2023",
      car_modal: "Ford",
      car_license_no: "63F-325.44",
    },
    {
      code: "#ORID003",
      fullname: "Hoàng Trung Thông",
      date: "03/03/2023",
      car_modal: "Honda",
      car_license_no: "30B-153.53",
    },
    {
      code: "#ORID004",
      fullname: "Nguyễn Hoàng Hồng Phúc",
      date: "04/04/2023",
      car_modal: "Porche",
      car_license_no: "72C-764.45",
    },
  ]

  const dataRecommened = [
    {
      code: "#ORID005",
      fullname: "Justin Bieber",
      phone: "0698532179",
      car_modal: "Lamborghini",
      car_license_no: "59D-123.45",
    },
    {
      code: "#ORID006",
      fullname: "Charlie Puth",
      phone: "0985625719",
      car_modal: "Ferrari",
      car_license_no: "59D-325.44",
    },
    {
      code: "#ORID007",
      fullname: "Post Malone",
      phone: "0326985716",
      car_modal: "Maserati",
      car_license_no: "59D-153.53",
    },
    {
      code: "#ORID008",
      fullname: "Kendrick Lamar",
      phone: "0985326178",
      car_modal: "Aston Martin",
      car_license_no: "59D-764.45",
    },
  ]

  const dataConfirmation = [
    {
      code: "#ORID001",
      fullname: "Peter Parker",
      date: "05/05/2023",
      car_modal: "Mercedes",
      car_license_no: "59F-325.44",
    },
    {
      code: "#ORID002",
      fullname: "Tony Stark",
      date: "06/06/2023",
      car_modal: "BMW",
      car_license_no: "59D-123.45",
    },
    {
      code: "#ORID003",
      fullname: "Bruce Wayne",
      date: "07/07/2023",
      car_modal: "Roll Royce",
      car_license_no: "59D-764.45",
    },
    {
      code: "#ORID004",
      fullname: "Clark Kent",
      date: "08/08/2023",
      car_modal: "McLaren",
      car_license_no: "59D-153.53",
    },
  ]

  const dataCompleted = [
    {
      code: "#ORID001",
      fullname: "Lionel Messi",
      date: "09/09/2023",
      car_modal: "Ferrari",
      car_license_no: "59D-123.45",
    },
    {
      code: "#ORID002",
      fullname: "Cristiano Ronaldo",
      date: "10/10/2023",
      car_modal: "Lamborghini",
      car_license_no: "59D-325.44",
    },
    {
      code: "#ORID003",
      fullname: "Kylian Mbappé",
      date: "11/11/2023",
      car_modal: "Aston Martin",
      car_license_no: "59D-153.53",
    },
    {
      code: "#ORID004",
      fullname: "Neymar",
      date: "12/12/2023",
      car_modal: "Bently",
      car_license_no: "59D-764.45",
    },
  ]

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Dịch Vụ" breadcrumbItem="Dịch Vụ" />
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
                        Chẩn đoán
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
                        Gợi ý
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
                        Xác nhận
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "4",
                        })}
                        onClick={() => {
                          toggleTab("4")
                        }}
                      >
                        Hoàn Thành
                      </NavLink>
                    </NavItem>
                  </ul>
                  <TabContent activeTab={activeTab} className="p-3">
                    <TabPane tabId="1" id="not-yet">
                      <TableContainer
                        columns={columns}
                        data={data}
                        isGlobalFilter={true}
                        //handleBookingClick={handleAddNewBookingClick}
                        customPageSize={10}
                        className="custom-header-css"
                      />
                    </TabPane>
                    <TabPane tabId="2" id="arrived">
                      <div>
                        <TableContainer
                          columns={columns1}
                          data={dataRecommened}
                          isGlobalFilter={true}
                          //handleBookingClick={handleAddNewBookingClick}
                          customPageSize={10}
                          className="custom-header-css"
                        />
                      </div>
                    </TabPane>
                    <TabPane tabId="3" id="cancel">
                      <div>
                        <TableContainer
                          columns={columns1}
                          data={dataConfirmation}
                          isGlobalFilter={true}
                          //handleBookingClick={handleAddNewBookingClick}
                          customPageSize={10}
                          className="custom-header-css"
                        />
                      </div>
                    </TabPane>
                    <TabPane tabId="4" id="cancel">
                      <div>
                        <TableContainer
                          columns={columns1}
                          data={dataCompleted}
                          isGlobalFilter={true}
                          //handleBookingClick={handleAddNewBookingClick}
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
        </div>
      </div>
    </React.Fragment>
  )
}

OrderSerives.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
  history: PropTypes.object,
}

export default withRouter(OrderSerives)

// EcommerceProducts.propTypes = {
//   products: PropTypes.array,
//   history: PropTypes.object,
//   onGetProducts: PropTypes.func,
// }

// export default withRouter(EcommerceProducts)
