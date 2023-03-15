import PropTypes from "prop-types"
import React from "react"

import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter, Link } from "react-router-dom"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

//Social Media Imports
import { GoogleLogin } from "react-google-login"
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"

// actions
import { loginUser, socialLogin } from "../../store/actions"

// import images
import profile from "assets/images/profile-img.png"
import logo from "assets/images/Empire-Logo-Login.png"

//Import config
import { facebook, google } from "../../config"

const Login = props => {
  //meta title
  document.title = "Login | Empire Admin"

  const dispatch = useDispatch()

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "admin@gmail.com" || "",
      password: "123456" || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: values => {
      dispatch(loginUser(values, props.history))
      console.log(values)
    },
  })

  const { error } = useSelector(state => ({
    error: state.Login.error,
  }))

  // const signIn = (res, type) => {
  //   if (type === "google" && res) {
  //     const postData = {
  //       name: res.profileObj.name,
  //       email: res.profileObj.email,
  //       token: res.tokenObj.access_token,
  //       idToken: res.tokenId,
  //     }
  //     dispatch(socialLogin(postData, props.history, type))
  //   } else if (type === "facebook" && res) {
  //     const postData = {
  //       name: res.name,
  //       email: res.email,
  //       token: res.accessToken,
  //       idToken: res.tokenId,
  //     }
  //     dispatch(socialLogin(postData, props.history, type))
  //   }
  // }

  //handleGoogleLoginResponse
  // const googleResponse = response => {
  //   signIn(response, "google")
  // }

  //handleTwitterLoginResponse
  // const twitterResponse = e => {}

  //handleFacebookLoginResponse
  // const facebookResponse = response => {
  //   signIn(response, "facebook")
  // }

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Chào mừng !</h5>
                        <p>Vui lòng đăng nhập vào Empire Admin</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="80"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={e => {
                        e.preventDefault()
                        validation.handleSubmit()
                        return false
                      }}
                    >
                      {error ? <Alert color="danger">{error}</Alert> : null}

                      <div className="mb-3">
                        <Label className="form-label">Tài khoản</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Nhập email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Mật Khẩu</Label>
                        <Input
                          name="password"
                          value={validation.values.password || ""}
                          type="password"
                          placeholder="Nhập mật khẩu"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          Nhớ tài khoản
                        </label>
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Đăng nhập
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Quên mật khẩu
                        </Link>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}
