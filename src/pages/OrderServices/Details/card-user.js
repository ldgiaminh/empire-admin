import React, { useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
} from "reactstrap"
import { Link } from "react-router-dom"

const CardUser = ({ information }) => {
  const [menu, setMenu] = useState(false)

  return (
    <React.Fragment>
      <Col xl="4">
        <Card>
          <CardBody>
            <Dropdown
              isOpen={menu}
              toggle={() => setMenu(!menu)}
              className="float-end ms-2"
            >
              <DropdownToggle tag="i" className="text-muted">
                <i className="mdi mdi-dots-horizontal font-size-18"></i>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="#">Action</DropdownItem>
                <DropdownItem href="#">Another action</DropdownItem>
                <DropdownItem href="#">Something else</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <div>
              <div className="mb-4 me-3">
                <i className="mdi mdi-account-circle text-primary h1"></i>
              </div>

              <div>
                <h5>{information.order.user.fullname}</h5>
                <h6 className="text-muted mb-1">
                  {`(+${information.order.user.phone.slice(
                    1,
                    3
                  )}) ${information.order.user.phone.slice(3)}`}
                </h6>
                <p className="text-muted mb-0">
                  {information.order.user.email}
                </p>
              </div>
            </div>
          </CardBody>

          <CardBody className="border-top">
            <Row>
              <div className="col-sm-6">
                <div>
                  <p className="fw-medium mb-2">Biển số xe :</p>
                  <h4>{information.car.carLisenceNo}</h4>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mt-4 mt-sm-0">
                  <p className="fw-medium mb-2">Dòng xe :</p>
                  <h5>
                    {" "}
                    {information.car.carBrand +
                      " - " +
                      information.car.carModel}
                  </h5>
                </div>
              </div>
            </Row>
          </CardBody>

          {/* <CardFooter className="bg-transparent border-top">
            <div className="text-center">
              <Link to="#" className="btn btn-outline-light me-2 w-md">
                Deposit
              </Link>{" "}
              <Link to="#" className="btn btn-primary me-2 w-md">
                Buy / Sell
              </Link>
            </div>
          </CardFooter> */}
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default CardUser
