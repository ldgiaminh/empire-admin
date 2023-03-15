import PropTypes from "prop-types"
import React from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import ReactApexChart from "react-apexcharts"

const MiniWidget = ({ order }) => {
  /* CREATE AT  */
  const createAtDate = order.order.createdAt
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

  return (
    <React.Fragment>
      <Col lg={4}>
        <Card className="mini-stats-wid">
          <CardBody>
            <div className="d-flex flex-wrap">
              <div className="me-3">
                <p className="text-muted mb-2">Mã Đặt Lịch</p>
                <h5 className="mb-0">{order.code}</h5>
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
      <Col lg={4}>
        <Card className="mini-stats-wid">
          <CardBody>
            <div className="d-flex flex-wrap">
              <div className="me-3">
                <p className="text-muted mb-2">Hóa đơn được tạo lúc</p>
                <h5 className="mb-0">{formattedDateTime1}</h5>
              </div>

              {/* <div className="avatar-sm ms-auto">
                <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                  <i className="bx bxs-card"></i>
                </div>
              </div> */}
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col lg={4}>
        <Card className="mini-stats-wid">
          <CardBody>
            <div className="d-flex flex-wrap">
              <div className="me-3">
                <p className="text-muted mb-2">Trạng thái</p>
                <h5 className="mb-0">
                  {order.status === 0
                    ? "Phân công kỹ thuật viên"
                    : order.status === 1
                    ? "Đang chuẩn đoán"
                    : order.status === 2
                    ? "Xác nhận và thanh toán"
                    : order.status === 3
                    ? "Đang thực hiện dịch vụ"
                    : order.status === 4
                    ? "Chờ khách nhận xe"
                    : order.status === 5
                    ? "Khách đã nhận lại xe"
                    : "Đã Hủy"}
                </h5>
              </div>

              {/* <div className="avatar-sm ms-auto">
                <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                  <i className="bx bxs-card"></i>
                </div>
              </div> */}
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default MiniWidget
