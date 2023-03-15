import React from "react"
import { Card, CardBody, Col } from "reactstrap"

const Symptoms = ({ symptoms }) => {
  return (
    <React.Fragment>
      <Col xl={6}>
        <Card>
          <CardBody>
            <div className="d-flex flex-wrap">
              <h5 className="card-title mb-3 me-2">
                Tình trạng được khách mô tả
              </h5>
            </div>

            <div className="d-flex flex-wrap">
              {symptoms.receivingStatus && (
                <div style={{ columnCount: 2, columnGap: "100px" }}>
                  {symptoms.receivingStatus.split(",").map((symptom, index) => (
                    <div className="text-muted" key={index}>
                      <span className="mb-2">
                        <i className="mdi mdi-circle-medium align-middle text-primary me-1" />
                        {symptom.trim()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default Symptoms
