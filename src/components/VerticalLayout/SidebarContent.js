import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

const SidebarContent = props => {
  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Danh Mục")} </li>
            <li>
              <Link to="/dashboard">
                <i className="bx bx-home-circle"></i>
                <span>{props.t("Trang chủ")}</span>
              </Link>
            </li>
            <li>
              <Link to="/booking">
                <i className="bx bx-calendar"></i>
                <span>{props.t("Đặt Lịch")}</span>
              </Link>
            </li>
            <li>
              <Link to="/order-service">
                <i className="bx bxs-detail"></i>
                <span>{props.t("Theo dõi tiến trình")}</span>
              </Link>
            </li>

            <li className="menu-title">{props.t("Thương mại")}</li>
            <li>
              <Link to="/booking">
                <i className="bx bx-receipt"></i>
                <span>{props.t("Hóa đơn")}</span>
              </Link>
            </li>
            <li>
              <Link to="/transactions">
                <i className="bx bx-money"></i>
                <span>{props.t("Giao dịch")}</span>
              </Link>
            </li>

            <li className="menu-title">{props.t("Dịch vụ")}</li>
            <li>
              <Link to="/service-list">
                <i className="bx bx-window"></i>
                <span>{props.t("Các dịch vụ")}</span>
              </Link>
            </li>
            <li>
              <Link to="/symptoms">
                <i className="bx bx-spreadsheet"></i>
                <span>{props.t("Triệu chứng")}</span>
              </Link>
            </li>

            <li className="menu-title">{props.t("Quản lý")}</li>
            <li>
              <Link to="/car-brand">
                <i className="bx bx-car"></i>
                <span>{props.t("Phương tiện")}</span>
              </Link>
            </li>

            <li>
              <Link to="/users">
                <i className="bx bxs-user-circle"></i>
                <span>{props.t("Khách hàng")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
