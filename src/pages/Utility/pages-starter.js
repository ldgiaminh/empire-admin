import React, { Component } from "react"
import { Container } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

class PagesStarter extends Component {
  render() {
    //meta title
    document.title = "Starter Page | Skote - React Admin & Dashboard Template";
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Utility" breadcrumbItem="Starter Page" />
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default PagesStarter
