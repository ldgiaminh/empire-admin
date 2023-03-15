import React from "react"
import { Container } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const Transaction = () => {
  //meta title
  document.title = "Các giao dịch | Empire Admin"
  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Thương mại"
            breadcrumbItem="Danh sách các giao dịch"
          />
          {/* write Html code or structure */}
        </Container>
      </div>
    </>
  )
}

export default Transaction
