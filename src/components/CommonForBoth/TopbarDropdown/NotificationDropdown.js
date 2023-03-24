import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import SimpleBar from "simplebar-react"

//Import images
import avatar3 from "../../../assets/images/users/avatar-3.jpg"
import avatar4 from "../../../assets/images/users/avatar-4.jpg"

//i18n
import { withTranslation } from "react-i18next"
import { child, get, off, onValue, ref, update } from "firebase/database"
import { db } from "helpers/firebase"

const NotificationDropdown = props => {
  // Declare a new state variable, which we'll call "menu"
  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      setUserId(obj.id)
    }
  }, [])
  const [menu, setMenu] = useState(false)

  const [userId, setUserId] = useState("")
  const [notis, setNotis] = useState({})

  // useEffect(() => {
  //   get(child(ref(db), `users/${userId}/notifications/`))
  //     .then(snapshot => {
  //       if (snapshot.exists()) {
  //         const fetched = snapshot.val()
  //         setNotis(fetched)
  //       } else {
  //         console.log("")
  //       }
  //     })
  //     .catch(error => {
  //       console.error(error)
  //     })
  // }, [userId])

  // const notisArray = Object.values(notis)

  // // Sort the notis array by time in descending order
  // const sortedNotis = notisArray.sort(
  //   (a, b) => new Date(b.time) - new Date(a.time)
  // )

  //console.log(sortedNotis)
  useEffect(() => {
    const notificationsRef = ref(db, `users/${userId}/notifications`)

    // Listen for changes to the notifications node
    onValue(
      notificationsRef,
      snapshot => {
        if (snapshot.exists()) {
          const fetched = snapshot.val()
          // Convert the fetched object to an array
          const fetchedArray = Object.values(fetched)
          // Sort the fetchedArray by time in descending order
          const sortedNotis = fetchedArray.sort(
            (a, b) => new Date(b.time) - new Date(a.time)
          )
          setNotis(sortedNotis)
        } else {
          setNotis([])
        }
      },
      {
        // Keep the event listener active even if the component unmounts
        // This ensures that the notifications are updated in real-time
        // when new notifications are added to the database
        keepSynced: true,
      }
    )

    // Clean up the event listener when the component unmounts
    return () => {
      off(notificationsRef)
    }
  }, [userId])

  const notisArray = Object.values(notis)

  const unreadNotis = notisArray.filter(noti => noti.isRead === "false")

  const unreadCount = unreadNotis.length

  const markAllAsRead = async () => {
    const notificationsRef = ref(db, `users/${userId}/notifications`)
    const snapshot = await get(notificationsRef)
    const notifications = snapshot.val()

    const unreadNotis = Object.keys(notifications).filter(
      key => notifications[key].isRead === "false"
    )

    const updates = {}
    unreadNotis.forEach(noti => {
      updates[`${noti}/isRead`] = "true"
    })

    update(notificationsRef, updates)
  }

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon"
          tag="button"
          id="page-header-notifications-dropdown"
          onClick={markAllAsRead}
        >
          <i className="bx bx-bell bx-tada" />
          {unreadCount > 0 && (
            <span className="badge bg-danger rounded-pill">{unreadCount}</span>
          )}
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> {props.t("Thông báo")} </h6>
              </Col>
              {/* <div className="col-auto">
                <a href="#" className="small">
                  {" "}
                  View All
                </a>
              </div> */}
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            {Object.keys(notis).map(key => {
              const createAtDate = notis[key].time
              const createDate = new Date(createAtDate)
              const formattedDate1 = createDate.toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              const formattedTime1 = createDate.toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })
              const formattedDateTime1 = `${formattedTime1} - ${formattedDate1}`

              return (
                <Link to="#" key={key} className="text-reset notification-item">
                  <div className="d-flex">
                    <div className="avatar-xs me-3">
                      <span className="avatar-title bg-primary rounded-circle font-size-16">
                        <i className="bx bx-cart" />
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mt-0 mb-1">{notis[key].title}</h6>
                      <div className="font-size-12 text-muted">
                        <p className="mb-1">{notis[key].message}</p>
                        <p className="mb-0">
                          <i className="mdi mdi-clock-outline" />{" "}
                          {formattedDateTime1}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}

            {/* <Link to="" className="text-reset notification-item">
              <div className="d-flex">
                <img
                  src={avatar3}
                  className="me-3 rounded-circle avatar-xs"
                  alt="user-pic"
                />
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">James Lemire</h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {props.t("It will seem like simplified English") + "."}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline" />
                      {props.t("1 hours ago")}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="" className="text-reset notification-item">
              <div className="d-flex">
                <div className="avatar-xs me-3">
                  <span className="avatar-title bg-success rounded-circle font-size-16">
                    <i className="bx bx-badge-check" />
                  </span>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">
                    {props.t("Your item is shipped")}
                  </h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {props.t("If several languages coalesce the grammar")}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline" />{" "}
                      {props.t("3 min ago")}
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="" className="text-reset notification-item">
              <div className="d-flex">
                <img
                  src={avatar4}
                  className="me-3 rounded-circle avatar-xs"
                  alt="user-pic"
                />
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">Salena Layfield</h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {props.t(
                        "As a skeptical Cambridge friend of mine occidental"
                      ) + "."}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline" />
                      {props.t("1 hours ago")}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Link> */}
          </SimpleBar>
          {/* <div className="p-2 border-top d-grid">
            <Link
              className="btn btn-sm btn-link font-size-14 text-center"
              to="#"
            >
              <i className="mdi mdi-arrow-right-circle me-1"></i>{" "}
              <span key="t-view-more">{props.t("View More..")}</span>
            </Link>
          </div> */}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
  t: PropTypes.any,
}
