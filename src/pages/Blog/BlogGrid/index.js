import React, { Component } from "react";
import { Container, Row } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";

import BlogGrid from "./BlogGrid";
import RightBar from "../BlogList/RightBar";

export default class index extends Component {
  render() {
    //meta title
    document.title = "Blog Grid | Skote - React Admin & Dashboard Template";
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs title="Blog" breadcrumbItem="Blog Grid" />
            <Row>
              <BlogGrid />
              <RightBar />
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}
