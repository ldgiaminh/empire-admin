import React, { Component } from "react";
import { Container, Row } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"

import BlogList from "./BlogList"
import RightBar from "./RightBar"

export default class index extends Component {
  render() {

    //meta title
    document.title = "Blog List | Skote - React Admin & Dashboard Template";

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs title="Blog" breadcrumbItem="Blog List" />
            <Row>
              <BlogList />
              <RightBar />
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
};
