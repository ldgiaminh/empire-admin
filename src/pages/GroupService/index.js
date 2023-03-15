import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import TableContainer from "../../components/Common/TableContainer"
import * as Yup from "yup"
import { useFormik } from "formik"
import classnames from "classnames"

//import components
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { getItemLists as onGetItemList } from "store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

import {
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
  Card,
  CardBody,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap"
import { Name } from "./ItemCol"

function GroupService() {
  //meta title
  document.title = "Các dịch vụ | Empire Admin"

  const [activeTab, setActiveTab] = useState("1")

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  const [itemList, setItemList] = useState([])
  const [item, setItem] = useState(null)

  const dispatch = useDispatch()
  const { items } = useSelector(state => ({
    items: state.items.items,
  }))

  useEffect(() => {
    if (items && !items.length) {
      dispatch(onGetItemList())
    }
  }, [dispatch, items])

  useEffect(() => {
    setItemList(items)
  }, [items])

  const columns = useMemo(
    () => [
      // {
      //   Header: "Order ID",
      //   accessor: "orderId",
      //   width: "150px",
      //   style: {
      //     textAlign: "center",
      //     width: "10%",
      //     background: "#0000",
      //   },
      //   filterable: true,
      //   Cell: cellProps => {
      //     return <OrderId {...cellProps} />
      //   },
      // },
      {
        Header: "Tên dịch vụ",
        accessor: "name",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Chi tiết",
        accessor: "view",
        disableFilters: true,
        Cell: () => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              //onClick={toggleViewModal}
            >
              Xem chi tiết
            </Button>
          )
        },
      },
    ],
    []
  )

  const activeItem = items.filter(item => item.isService)
  const inactiveItem = items.filter(item => !item.isService)

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Orders" />
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
                        Đang hoạt động
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
                        Tạm dừng
                      </NavLink>
                    </NavItem>
                  </ul>
                  <TabContent activeTab={activeTab} className="p-3">
                    <TabPane tabId="1" id="not-yet">
                      <TableContainer
                        columns={columns}
                        data={activeItem}
                        isGlobalFilter={true}
                        //isAddOptions={true}
                        //handleOrderClicks={handleOrderClicks}
                        customPageSize={10}
                        className="custom-header-css"
                      />
                    </TabPane>
                    <TabPane tabId="2" id="not-yet">
                      <TableContainer
                        columns={columns}
                        data={inactiveItem}
                        isGlobalFilter={true}
                        //isAddOptions={true}
                        //handleOrderClicks={handleOrderClicks}
                        customPageSize={10}
                        className="custom-header-css"
                      />
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
GroupService.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default GroupService
