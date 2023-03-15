import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { isEmpty, map } from "lodash"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap"

const CheckInModal = props => {
  const { isOpen, toggle, data, handleCheckIn } = props

  return (
    <>
      <Modal
        isOpen={isOpen}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={toggle}
        key={data.id}
      >
        <div className="modal-content">
          <ModalHeader toggle={toggle}>
            Thông tin chi tiết: <strong> #{data.code}</strong>
          </ModalHeader>
          <ModalBody>
            <p className="mb-4">
              Ngày đặt:{" "}
              <strong className="text-primary">
                {new Date(data.date).toLocaleDateString()}
              </strong>
            </p>
            <p className="mb-4">
              Họ và tên: <span>{data.user ? data.user.fullname : ""}</span>
            </p>
            <p className="mb-4">
              Số điện thoại: <span>{data.user ? data.user.phone : ""}</span>
            </p>
            <h5 className="fw-medium">Phương tiện</h5>
            <p className="mb-4 mt-4">
              Biển số xe:{" "}
              <strong>{data.car ? data.car.carLisenceNo : ""}</strong>
            </p>
            <p>
              Dòng xe:{" "}
              <span>
                {data.car ? data.car.carBrand + " - " + data.car.carModel : ""}
              </span>
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="success"
              onClick={() => handleCheckIn(data.id)}
            >
              Check-in
            </Button>
            <Button type="button" color="secondary" onClick={toggle}>
              Hủy
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </>
  )
}

CheckInModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  handleCheckIn: PropTypes.func,
}

export default CheckInModal
