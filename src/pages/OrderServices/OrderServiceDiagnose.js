import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link, withRouter } from "react-router-dom"
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
} from "reactstrap"
import Select from "react-select"
import makeAnimated from "react-select/animated"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const OrderServiceDiagnose = props => {
  //meta title
  document.title = "Chuẩn đoán và Gợi ý dịch vụ | Empire Admin"

  const { history } = props

  const [selectedMulti3, setselectedMulti3] = useState(null)
  const animatedComponents = makeAnimated()

  function handleMulti3(selectedMulti3) {
    setselectedMulti3(selectedMulti3)
  }

  const optionGroup2 = [
    {
      label: "Vệ sinh xe",
      options: [
        { label: "Vệ Sinh Nội Thất", value: "Vệ Sinh Nội Thất" },
        { label: "Vệ Sinh Khoang Máy", value: "Vệ Sinh Khoang Máy" },
        { label: "Rửa Xe Sạch, An Toàn", value: "Rửa Xe Sạch, An Toàn" },
      ],
    },
    {
      label: "Chăm sóc, làm đẹp",
      options: [
        { label: "Phủ nano", value: "Phủ nano" },
        { label: "Phủ Ceramic", value: "Phủ Ceramic" },
        { label: "Thông xúc kim phun", value: "Thông xúc kim phun" },
      ],
    },
  ]

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Dịch vụ"
            breadcrumbItem="Chuẩn đoán và Gợi ý dịch vụ"
          />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title">Thông tin khách hàng</h4>
                  <p className="card-title-desc">Những thông tin chi tiết</p>

                  <form>
                    <Row>
                      <Col lg="6">
                        <div className="mb-3">
                          <Label htmlFor="formrow-firstname-Input">
                            Họ và Tên
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-firstname-Input"
                            placeholder="Trần Duy Hiếu Trung"
                          />
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="formrow-firstname-Input">
                            Số điện thoại
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-firstname-Input"
                            placeholder="012345678"
                          />
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="formrow-firstname-Input">Email</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-firstname-Input"
                            placeholder="trung@gmail.com"
                          />
                        </div>
                      </Col>

                      <Col lg="6">
                        <div className="mb-3">
                          <Label htmlFor="formrow-firstname-Input">
                            Ngày và Giờ Đặt Lịch
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-firstname-Input"
                            placeholder="01/01/2023 14:20"
                          />
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="formrow-firstname-Input">
                            Ngày và Giờ Check-in
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-firstname-Input"
                            placeholder="01/01/2023 15:0"
                          />
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="formrow-firstname-Input">
                            Trạng thái
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-firstname-Input"
                            placeholder="Đang chẩn đoán"
                          />
                        </div>
                      </Col>
                    </Row>
                  </form>
                  <h4 className="card-title mt-5">Gợi ý dịch vụ</h4>
                  <p className="card-title-desc">
                    Vui lòng chọn những dịch vụ phù hợp sau khi kiểm tra xe
                  </p>
                  <form>
                    <Row>
                      <Col lg="12">
                        <div className="mb-3 templating-select select2-container">
                          <label className="control-label">Dịch vụ</label>
                          <Select
                            value={selectedMulti3}
                            isMulti={true}
                            onChange={() => {
                              handleMulti3()
                            }}
                            options={optionGroup2}
                            classNamePrefix="select2-selection"
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="control-label">
                            Hồ sơ sức khỏe
                          </label>
                          <Input
                            type="textarea"
                            className="form-control"
                            id="formrow-firstname-Input"
                            placeholder="Ghi chú tình trạng xe"
                          />
                        </div>
                      </Col>
                    </Row>
                  </form>
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary w-md"
                      onClick={() => history.push(`/order-service-detail`)}
                    >
                      Gữi gợi ý
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

OrderServiceDiagnose.propTypes = {
  history: PropTypes.object,
}

export default withRouter(OrderServiceDiagnose)
