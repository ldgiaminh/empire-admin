import React from "react"
import { Container } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const CarBrand = () => {
  //meta title
  document.title = "Các hãng xe | Empire Admin"
  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Phương tiện"
            breadcrumbItem="Danh sách các hãng xe"
          />
          {/* write Html code or structure */}
        </Container>
      </div>
    </>
  )
}

export default CarBrand
