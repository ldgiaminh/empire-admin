import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import Select from "react-select"
import { useDispatch } from "react-redux"
import {
  Button,
  Card,
  CardBody,
  Col,
  Input,
  InputGroup,
  Label,
  Nav,
  NavItem,
  TabContent,
  TabPane,
} from "reactstrap"

import {
  getOrderServicesDetails as onGetOrderServiceDetail,
  putAssignExperts as assignExpert,
} from "store/order-services/actions"

const AssignTechnicians = ({ order, expert }) => {
  const dispatch = useDispatch()

  const [selectedGroup, setselectedGroup] = useState(null)

  function handleSelectGroup(selectedGroup) {
    setselectedGroup(selectedGroup)
  }

  const optionGroup = expert.map(ex => ({
    label: ex.fullname,
    value: ex.id,
  }))

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

  const handleAssignExpert = () => {
    const exId = selectedGroup.value
    if (order.id) {
      dispatch(assignExpert(order.id, exId))
      toastr.success("Đã phân công cho " + selectedGroup.label, "Thành công")
      dispatch(onGetOrderServiceDetail(order.id))
    }
  }

  return (
    <React.Fragment>
      {order.expert != null ? (
        <Col xl={6}>
          <Card>
            <CardBody>
              <div className="d-flex flex-wrap">
                <h5 className="card-title mb-3 me-2">Kỹ thuật viên chính</h5>
              </div>

              <div className="d-flex flex-wrap">
                <div>
                  <p className="text-muted mb-1">
                    Kỹ thuật viên chính được phân công
                  </p>
                  <h4 className="mb-2">{order.expert.fullname}</h4>
                  {/* <p className="text-success mb-0">
                  <span>
                    0.6 % <i className="mdi mdi-arrow-top-right ms-1"></i>
                  </span>
                </p> */}
                </div>
                <div className="ms-auto align-self-end">
                  <i className="bx bx-group display-4 text-light"></i>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ) : (
        <Col xl="6">
          <Card>
            <CardBody>
              <h5 className="card-title mb-2">Phân công kỹ thuật viên</h5>

              {/* <div>
              <p className="text-muted mb-2">
                <i className="mdi mdi-wallet me-1" /> Wallet Balance
              </p>
              <h5>$ 9148.23</h5>
            </div> */}

              <h6 className="font-size-14 mb-4 text-muted">
                Chọn kỹ thuật viên chính cho đơn hàng này
              </h6>

              <div>
                <div className="form-group mb-3">
                  <Label>Chọn :</Label>
                  <Select
                    value={selectedGroup}
                    onChange={handleSelectGroup}
                    options={optionGroup}
                    classNamePrefix="select2-selection"
                    placeholder="Chọn kỹ thuật viên"
                    //required={true}
                  />
                </div>

                <div className="text-center">
                  <Button
                    onClick={handleAssignExpert}
                    type="button"
                    color="success"
                    className="w-md"
                    disabled={!selectedGroup}
                  >
                    Phân công
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      )}
    </React.Fragment>
  )
}

export default AssignTechnicians
