import React, { useEffect, useState, useRef, useMemo } from "react"
import { withRouter, Link } from "react-router-dom"
import TableContainer from "../../components/Common/TableContainer"
import classnames from "classnames"

import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
  Button,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap"

import {
  OrderCode,
  Name,
  DateCell,
  ModalCar,
  Plate,
  Expert,
} from "./OrderServiceCol"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import { getOrderServicesListByStatus as onGetOrderServicesListByStatus } from "store/order-services/actions"
import { isEmpty } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"

const OrderSerives = props => {
  //meta title
  document.title = "Theo dõi tiến trình | Empire Admin"

  const statusServices = [
    { id: "0", title: "Đang chuẩn đoán" },
    { id: "1", title: "Chờ xác nhận và thanh toán" },
    { id: "2", title: "Đang thực hiện" },
    { id: "3", title: "Chờ khách nhận xe" },
    { id: "4", title: "Hoàn thành" },
    { id: "-1", title: "Hủy" },
  ]

  const { history } = props

  const dispatch = useDispatch()

  const [activeTab, setActiveTab] = useState("0")
  const [orderService, setOrderService] = useState()

  const { orderServicess } = useSelector(state => ({
    orderServicess: state.orderServices.orderServicess,
  }))

  //Change Tabs
  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
      dispatch(onGetOrderServicesListByStatus(tab))
    }
  }

  const columnsAssign = useMemo(
    () => [
      {
        Header: "Mã đơn hàng",
        accessor: "code",
        width: "150px",
        style: {
          textAlign: "center",
          width: "10%",
          background: "#0000",
        },
        filterable: true,
        Cell: cellProps => {
          return <OrderCode {...cellProps} />
        },
      },
      {
        Header: "Tên khách hàng",
        accessor: "order.user.fullname",
        disableFilters: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Thời gian check-in",
        accessor: "order.updatedAt",
        disableFilters: true,
        Cell: cellProps => {
          return <DateCell {...cellProps} />
        },
      },
      {
        Header: "Modal xe",
        accessor: "car.carBrand",
        disableFilters: true,
        Cell: cellProps => {
          return <ModalCar {...cellProps} />
        },
      },
      {
        Header: "Biển số xe",
        accessor: "car.carLisenceNo",
        disableFilters: true,
        Cell: cellProps => {
          return <Plate {...cellProps} />
        },
      },
      {
        Header: "Chẩn đoán",
        accessor: "action",
        disableFilters: true,
        Cell: cellProps => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() =>
                history.push(
                  `/order-service-detail/${cellProps.row.original.id}`
                )
              }
            >
              Phân công
            </Button>
          )
        },
      },
    ],
    []
  )

  const columns = useMemo(
    () => [
      {
        Header: "Mã đơn hàng",
        accessor: "code",
        width: "150px",
        style: {
          textAlign: "center",
          width: "10%",
          background: "#0000",
        },
        filterable: true,
        Cell: cellProps => {
          return <OrderCode {...cellProps} />
        },
      },
      {
        Header: "Tên khách hàng",
        accessor: "order.user.fullname",
        disableFilters: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Ngày đến",
        accessor: "order.updatedAt",
        disableFilters: true,
        Cell: cellProps => {
          return <DateCell {...cellProps} />
        },
      },
      {
        Header: "Modal xe",
        accessor: "car.carBrand",
        disableFilters: true,
        Cell: cellProps => {
          return <ModalCar {...cellProps} />
        },
      },
      {
        Header: "Biển số xe",
        accessor: "car.carLisenceNo",
        disableFilters: true,
        Cell: cellProps => {
          return <Plate {...cellProps} />
        },
      },
      {
        Header: "Kỹ thuật viên",
        accessor: "expert.fullname",
        disableFilters: true,
        Cell: cellProps => {
          return <Expert {...cellProps} />
        },
      },
      {
        Header: "Chi tiết",
        accessor: "action",
        disableFilters: true,
        Cell: cellProps => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() =>
                history.push(
                  `/order-service-detail/${cellProps.row.original.id}`
                )
              }
            >
              Xem chi tiết
            </Button>
          )
        },
      },
    ],
    []
  )

  useEffect(() => {
    if (orderServicess && !orderServicess.length) {
      dispatch(onGetOrderServicesListByStatus(activeTab))
    }
  }, [dispatch, orderServicess])

  useEffect(() => {
    setOrderService(orderServicess)
  }, [orderServicess])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Theo dõi tiến trình" breadcrumbItem="Danh sách" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
                    {statusServices.map(tab => (
                      <NavItem key={tab.id}>
                        <NavLink
                          className={classnames({
                            active: activeTab === tab.id,
                          })}
                          onClick={() => {
                            toggleTab(tab.id)
                          }}
                        >
                          {tab.title}
                        </NavLink>
                      </NavItem>
                    ))}
                  </ul>
                  <TabContent activeTab={activeTab} className="p-3">
                    <TabPane tabId="0" id="diagnosing">
                      <TableContainer
                        columns={columnsAssign}
                        data={orderServicess}
                        isGlobalFilter={true}
                        // isAddUserList={true}
                        // handleUserClick={handleUserClicks}
                        customPageSize={10}
                        className="custom-header-css"
                      />
                    </TabPane>
                    <TabPane tabId="1" id="diagnosing">
                      <TableContainer
                        columns={columns}
                        data={orderServicess}
                        isGlobalFilter={true}
                        // isAddUserList={true}
                        // handleUserClick={handleUserClicks}
                        customPageSize={10}
                        className="custom-header-css"
                      />
                    </TabPane>
                    <TabPane tabId="2" id="pending">
                      <TableContainer
                        columns={columns}
                        data={orderServicess}
                        isGlobalFilter={true}
                        // isAddUserList={true}
                        // handleUserClick={handleUserClicks}
                        customPageSize={10}
                        className="custom-header-css"
                      />
                    </TabPane>
                    <TabPane tabId="3" id="done">
                      <TableContainer
                        columns={columns}
                        data={orderServicess}
                        isGlobalFilter={true}
                        // isAddUserList={true}
                        // handleUserClick={handleUserClicks}
                        customPageSize={10}
                        className="custom-header-css"
                      />
                    </TabPane>
                    <TabPane tabId="4" id="checkout">
                      <TableContainer
                        columns={columns}
                        data={orderServicess}
                        isGlobalFilter={true}
                        // isAddUserList={true}
                        // handleUserClick={handleUserClicks}
                        customPageSize={10}
                        className="custom-header-css"
                      />
                    </TabPane>
                    <TabPane tabId="-1" id="cancel">
                      <TableContainer
                        columns={columns}
                        data={orderServicess}
                        isGlobalFilter={true}
                        // isAddUserList={true}
                        // handleUserClick={handleUserClicks}
                        customPageSize={10}
                        className="custom-header-css"
                      />
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(OrderSerives)
