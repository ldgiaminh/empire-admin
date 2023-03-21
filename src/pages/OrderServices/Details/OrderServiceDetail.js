import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link, withRouter } from "react-router-dom"
import { isEmpty, map } from "lodash"

import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
  Table,
  Progress,
} from "reactstrap"
import Select from "react-select"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"

import {
  getOrderServicesDetails as onGetOrderServiceDetail,
  putOrderServices as onRecommendService,
  putAssignExperts as assignExpert,
  getStatusLog as onGetStatusLog,
} from "store/order-services/actions"

import { getExperts as onGetExpert } from "store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"
import CardUser from "./card-user"
import MiniWidget from "./mini-widget"
import AssignTechnicians from "./assign-technicians"
import Cart from "./cart"
import Symptoms from "./symptom"

const OrderServiceDetail = props => {
  //meta title
  document.title = "Theo dõi tiến trình | Empire Admin"

  const [step1, setStep1] = useState(true)
  const [step2, setStep2] = useState(false)

  const [symptom, setSymptom] = useState("")
  const [selectedGroup, setselectedGroup] = useState(null)

  const inpRow = [{ itemId: "", price: "" }]
  const [inputFields, setinputFields] = useState(inpRow)

  const {
    match: { params },
  } = props

  const { history } = props
  const dispatch = useDispatch()

  const { orderServicesDetails, groupService, users, orderServiceLog } =
    useSelector(state => ({
      orderServicesDetails: state.orderServices.orderServicesDetails,
      groupService: state.groupServices.groupService,
      users: state.userLists.users,
      orderServiceLog: state.orderServices.orderServiceLog,
    }))

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetOrderServiceDetail(params.id))
    }
  }, [params, onGetOrderServiceDetail])

  useEffect(() => {
    dispatch(onGetExpert())
  }, [onGetExpert])

  // useEffect(() => {
  //   if (params && params.id) {
  //     dispatch(onGetStatusLog(params.id))
  //   }
  // }, [params, onGetStatusLog])

  // Function for Create Input Fields
  function handleAddFields() {
    const item1 = { itemId: "", price: "" }
    setinputFields([...inputFields, item1])
    setselectedGroup(null)
  }

  // Function for Remove Input Fields
  function handleRemoveFields(index) {
    const updatedFields = [...inputFields]
    updatedFields.splice(index, 1)
    setinputFields(updatedFields)
  }

  // const handleSelectGroup = (selectedOption, index) => {
  //   // set the selected option
  //   setselectedGroup(selectedOption)

  //   // update the price field in the input
  //   const updatedFields = [...inputFields]
  //   updatedFields[index] = {
  //     itemId: selectedOption.itemId,
  //     price: selectedOption.price,
  //   }
  //   setinputFields(updatedFields)
  // }

  // const optionGroup1 = groupService.map(group => {
  //   const selectedOptionIds = inputFields.map(field => field.itemId) // get the ids of all selected options
  //   const options = group.items
  //     .filter(option => !selectedOptionIds.includes(option.id)) // filter out options that have already been selected
  //     .map(option => ({
  //       label: option.name,
  //       value: option.id,
  //       itemId: option.id,
  //       price: option.presentPrice.price,
  //     }))
  //   return {
  //     label: group.name,
  //     options: options,
  //   }
  // })

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   const services = {
  //     healthCarRecord: {
  //       symptom,
  //     },
  //     orderServiceDetails: inputFields,
  //   }
  //   //dispatch(onRecommendService(params.id, services))
  //   console.log(services)
  //   console.log(params)
  // }

  const createAtDate = orderServicesDetails?.order?.createdAt
  const createDate = new Date(createAtDate)
  const formattedDate = createDate.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
  const formattedTime = createDate.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
  const formattedDateTime = ` ${formattedTime} - ${formattedDate}`

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Dịch vụ"
            breadcrumbItem={
              "Theo dõi tiến trình" + " - " + ("#" + orderServicesDetails.code)
            }
          />

          {!isEmpty(orderServicesDetails) && (
            <React.Fragment>
              <Row>
                <Col>
                  <Card>
                    <CardBody>
                      <CardTitle>Thông tin tổng</CardTitle>
                      <CardSubtitle className="mb-3">
                        Chi tiết về đặt lịch và thông tin khách hàng
                      </CardSubtitle>

                      <Row>
                        <Col lg="6">
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
                                  <td>
                                    {orderServicesDetails.order.user.fullname}
                                  </td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Số điện thoại :
                                  </th>
                                  <td>{`(+${orderServicesDetails.order.user.phone.slice(
                                    1,
                                    3
                                  )}) ${orderServicesDetails.order.user.phone.slice(
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
                                  <td>
                                    {orderServicesDetails.order.user.email}
                                  </td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Biển số xe:
                                  </th>
                                  <td>
                                    {orderServicesDetails.car.carLisenceNo}
                                  </td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Thương hiệu xe:
                                  </th>
                                  <td>
                                    {orderServicesDetails.car.carBrand +
                                      " - " +
                                      orderServicesDetails.car.carModel}
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                        <Col lg="6">
                          <div className="table-responsive">
                            <Table className="table table-borderless  mb-0">
                              <tbody>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Hóa đơn tạo lúc :
                                  </th>
                                  <td>{formattedDateTime}</td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Số tiền từ đặt lịch :
                                  </th>
                                  <td>
                                    {orderServicesDetails.prepaidFromBooking.toLocaleString()}
                                    ₫
                                  </td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Tình trạng khách mô tả :
                                  </th>
                                  <td>
                                    {Array.isArray(
                                      orderServicesDetails.receivingStatus
                                    )
                                      ? orderServicesDetails.receivingStatus.join(
                                          ", "
                                        )
                                      : ""}
                                  </td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Kỹ thuật viên chính :
                                  </th>
                                  <td>
                                    {orderServicesDetails.expert?.fullname !=
                                    null
                                      ? orderServicesDetails.expert.fullname
                                      : "Chưa có kỹ thuật viên chính"}
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              {/* <Row>
                <CardUser information={orderServicesDetails} />

                <Col xl="8">
                  <Row>
                    <MiniWidget order={orderServicesDetails} />
                  </Row>

                  <Row>
                    <Symptoms symptoms={orderServicesDetails} />
                    <AssignTechnicians
                      order={orderServicesDetails}
                      expert={users}
                    />
                  </Row>
                </Col>
              </Row> */}
              <Row>
                {orderServicesDetails.healthCarRecord != null ? (
                  <Cart
                    details={orderServicesDetails}
                    services={orderServicesDetails.orderServiceDetails}
                    healthCarRecord={orderServicesDetails.healthCarRecord}
                    order={orderServicesDetails}
                  />
                ) : (
                  ""
                )}
              </Row>
            </React.Fragment>
          )}
        </Container>
      </div>
    </>
  )
}

OrderServiceDetail.propTypes = {
  history: PropTypes.object,
}

export default withRouter(OrderServiceDetail)
