import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appActions } from "../../../store/app-slice";
import { authActions } from "../../../store/auth-slice";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./sidebar.scss";
import {
  faCaretDown,
  faListOl,
  faSignsPost,
  faSitemap,
  faNewspaper,
  faGamepad,
  faBoxOpen,
  faImages,
  faTools,
  faLanguage,
  faUserShield,
  faCircleInfo,
  faStreetView,
  faInbox,
  faComments,
  faFileCsv,
  faHome,
  faIcons,
  faEnvelope,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import NavLink from "./navlink";
import { Link } from "react-router-dom";

const SidebarComponent = (props) => {
  const { t, i18n } = useTranslation("sidebar");

  const dispatch = useDispatch();
  const uPermission = useSelector((state) => state.auth.userPermission);
  const selectedLanguage = useSelector((state) => state.app.language);
  const webPath = useSelector((state) => state.app.webPath);
  const activateLanguage = useSelector((state) => state.auth.activateLanguage);
  const pagesAllow = useSelector((state) => state.app.pages);
  const uploadPath = useSelector((state) => state.app.uploadPath);
  const isDevMode = useSelector((state) => state.app.isDevMode);

  const languageSelectHandler = (lang) => {
    i18n.changeLanguage(lang);
    dispatch(appActions.changeLanguage(lang));
  };

  const toggleSubMenu = (event) => {
    const subMenu = event.target.closest(".has-child");
    subMenu.classList.toggle("opened");
  };

  const closeSidebarhandler = (e) => {
    /* ย่อแถบทำงานเฉพาะ width < 768 */
    let elRoot = document.querySelector("#root");
    if (elRoot && elRoot.offsetWidth <= 900) {
      props.collapseHandler(true);
    }
  };

  return (
    <aside className="aside">
      <nav>
        <Link className="sidenav-header" to="/">
          <figure className="figure-image">
            <img
              src="https://manami-delivery.com/img/home/mainlogogroup.png"
              className="website-logo"
            />
          </figure>
          <div className="website-powerby">
            <p>Manami-Stock management</p>
            {/* <p className="sub-website">{t("Managements")}</p> */}
          </div>
        </Link>
        <hr className="line-section" />
        <div className="title-section">{t("Languages")}</div>
        <div className="language-selection">
          {activateLanguage.map((lang) => (
            <Button
              variant="outlined"
              key={lang}
              onClick={(e) => languageSelectHandler(lang)}
              className={`btn-lang ${
                lang.toLowerCase() === selectedLanguage.toLowerCase()
                  ? "selected"
                  : ""
              }`}
            >
              {lang}
            </Button>
          ))}
        </div>

        <hr className="line-section gap " />
        <div className="sidenav-main">
          {pagesAllow.groups.notify && (
            <Fragment>
              <div className="title-section">{t("NotificationTitle")}</div>
              <ul className="nav-menu">
                {pagesAllow.dashboard && (
                  <li>
                    <NavLink
                      onClick={closeSidebarhandler}
                      to="/dashboard"
                      className="navlink"
                      title={t("dashboardPage")}
                      liClass="menu-link"
                    >
                      <figure className="faIcon">
                        <FontAwesomeIcon icon={faGamepad} />
                      </figure>
                      <div className="menu-title">{t("dashboardPage")}</div>
                    </NavLink>
                  </li>
                )}
                {pagesAllow.messages && (
                  <li>
                    <NavLink
                      onClick={closeSidebarhandler}
                      to="/messages"
                      className={`navlink `}
                      title={t("MessagesPage")}
                      liClass="menu-link"
                    >
                      <figure className="faIcon">
                        <FontAwesomeIcon icon={faComments} />
                      </figure>
                      <div className="menu-title">{t("MessagesPage")}</div>
                    </NavLink>
                  </li>
                )}
                {pagesAllow.inbox && (
                  <li>
                    <NavLink
                      onClick={closeSidebarhandler}
                      to="/inbox"
                      className={`navlink `}
                      title={t("InboxPage")}
                      liClass="menu-link"
                    >
                      <figure className="faIcon">
                        <FontAwesomeIcon icon={faInbox} />
                      </figure>
                      <div className="menu-title">{t("InboxPage")}</div>
                    </NavLink>
                  </li>
                )}
                {pagesAllow.subscribe && (
                  <li>
                    <NavLink
                      onClick={closeSidebarhandler}
                      to="/subscribe"
                      className={`navlink `}
                      title={t("SubscribePage")}
                      liClass="menu-link"
                    >
                      <figure className="faIcon">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </figure>
                      <div className="menu-title">{t("SubscribePage")}</div>
                    </NavLink>
                  </li>
                )}
              </ul>
            </Fragment>
          )}

          {pagesAllow.groups.product && (
            <Fragment>
              <hr className="line-section gap" />
              <div className="title-section">{t("ManageSystem")}</div>
              <ul className="nav-menu">
                {/* <div className="title-section">{t("ManageSystem")}</div> */}
                <li className="menu-link has-child ">
                  <a
                    className={`navlink `}
                    title={t("ProductsTitleMenu")}
                    onClick={toggleSubMenu}
                  >
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      className="toggle-submenu"
                    />
                    <figure
                      className="faIcon"
                      style={{ paddingRight: ".25rem" }}
                    >
                      <img src="/images/icons/imports-icon.png" alt="" />
                    </figure>
                    <div className="menu-title">{t("เพิ่มสินค้า")}</div>
                  </a>
                  <div className="child-menu ">
                    <ul className="nav-items ">
                      <li>
                        <NavLink
                          onClick={closeSidebarhandler}
                          to="/products/import"
                          className={`items `}
                          title={t("เพิ่มสินค้าหลัก")}
                          liClass="sub-items"
                        >
                          <span className="collap-title">
                            <FontAwesomeIcon icon={faSignsPost} />
                          </span>
                          <span className="menu-title">
                            {t("เพิ่มสินค้าหลัก")}
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={closeSidebarhandler}
                          to="/supproduct/import"
                          className={`items `}
                          title={t("เพิ่มสินค้าย่อย")}
                          liClass="sub-items"
                        >
                          <span className="collap-title">
                            <FontAwesomeIcon icon={faSignsPost} />
                          </span>
                          <span className="menu-title">
                            {t("เพิ่มสินค้าย่อย")}
                          </span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
              {/* <ul className="nav-menu">
                <li>
                  <NavLink
                    onClick={closeSidebarhandler}
                    to="/products/import"
                    className="navlink"
                    title={t("เพิ่มสินค้า")}
                    liClass="menu-link"
                  >
                    <figure
                      className="faIcon"
                      style={{ paddingRight: ".25rem" }}
                    >
                      <img src="/images/icons/imports-icon.png" alt="" />
                    </figure>
                    <div className="menu-title">{t("เพิ่มสินค้า")}</div>
                  </NavLink>
                </li>
              </ul> */}
              <ul className="nav-menu">
                <li>
                  <NavLink
                    onClick={closeSidebarhandler}
                    to="/products"
                    className="navlink"
                    title={t("productPage")}
                    liClass="menu-link"
                  >
                    <figure className="faIcon">
                      <img src="/images/icons/products-icon.png" alt="" />
                    </figure>
                    <div className="menu-title">{t("Products")}</div>
                  </NavLink>
                </li>
              </ul>
              <ul className="nav-menu">
                <li>
                  <NavLink
                    onClick={closeSidebarhandler}
                    to="/expiration"
                    className="navlink"
                    title={t("Expiration")}
                    liClass="menu-link"
                  >
                    <figure className="faIcon">
                      <img src="/images/icons/expiration-icon.png" alt="" />
                    </figure>
                    <div className="menu-title">{t("Expiration")}</div>
                  </NavLink>
                </li>
              </ul>
              <ul className="nav-menu">
                <li>
                  <NavLink
                    onClick={closeSidebarhandler}
                    to="/stock"
                    className="navlink"
                    title={t("Stock")}
                    liClass="menu-link"
                  >
                    <figure className="faIcon">
                      <img src="/images/icons/stock-icon.png" alt="" />
                    </figure>
                    <div className="menu-title">{t("Stock")}</div>
                  </NavLink>
                </li>
              </ul>
              {/* <ul className="nav-menu">
                <li>
                  <NavLink
                    onClick={closeSidebarhandler}
                    to="/import"
                    className="navlink"
                    title={t("Import")}
                    liClass="menu-link"
                  >
                    <figure className="faIcon" style={{ paddingRight: ".25rem" }}>
                      <img src="/images/icons/imports-icon.png" alt="" />
                    </figure>
                    <div className="menu-title">{t("Import")}</div>
                  </NavLink>
                </li>
              </ul> */}
              {/* <ul className="nav-menu">
                <li>
                  <NavLink
                    onClick={closeSidebarhandler}
                    to="products/export"
                    className="navlink"
                    title={t("เบิกออกสินค้า")}
                    liClass="menu-link"
                  >
                    <figure className="faIcon" style={{ paddingLeft: ".25rem" }}>
                      <img src="/images/icons/exports-icon.png" alt="" />
                    </figure>
                    <div className="menu-title">{t("เบิกออกสินค้า")}</div>
                  </NavLink>
                </li>
              </ul> */}
              <ul className="nav-menu">
                <li>
                  <NavLink
                    onClick={closeSidebarhandler}
                    to="/export"
                    className="navlink"
                    title={t("Export")}
                    liClass="menu-link"
                  >
                    <figure
                      className="faIcon"
                      style={{ paddingLeft: ".25rem" }}
                    >
                      <img src="/images/icons/exports-icon.png" alt="" />
                    </figure>
                    <div className="menu-title">{t("Export")}</div>
                  </NavLink>
                </li>
              </ul>
              <ul className="nav-menu">
                <li>
                  <NavLink
                    onClick={closeSidebarhandler}
                    to="/defective"
                    className="navlink"
                    title={t("Defective")}
                    liClass="menu-link"
                  >
                    <figure className="faIcon">
                      <img src="/images/icons/defective-icon.png" alt="" />
                    </figure>
                    <div className="menu-title">{t("Defective")}</div>
                  </NavLink>
                </li>
              </ul>
              <ul className="nav-menu">
                <li>
                  <NavLink
                    onClick={closeSidebarhandler}
                    to="/report"
                    className={`navlink `}
                    title={t("ReportPage")}
                    liClass="menu-link"
                  >
                    <figure className="faIcon">
                      <FontAwesomeIcon icon={faFileCsv} />
                    </figure>
                    <div className="menu-title">{t("ReportPage")}</div>
                  </NavLink>
                </li>
              </ul>
            </Fragment>
          )}

          {/* {pagesAllow.groups.article && (
            <Fragment>
              <hr className="line-section gap" />
              <div className="title-section">{t("ManageContent")}</div>
              <ul className="nav-menu">
                {pagesAllow.slides && (
                  <NavLink
                    onClick={closeSidebarhandler}
                    to="/slides"
                    className={`navlink `}
                    title={t("SlidesPage")}
                    liClass="menu-link"
                  >
                    <figure className="faIcon">
                      <FontAwesomeIcon icon={faImages} />
                    </figure>
                    <div className="menu-title">{t("SlidesPage")}</div>
                  </NavLink>
                )}
                <li className={`menu-link has-child opened`}>
                  <a className={`navlink `} onClick={toggleSubMenu} title={t("ManageWebContent")}>
                    <FontAwesomeIcon icon={faCaretDown} className="toggle-submenu" />
                    <span className="collap-title">
                      <FontAwesomeIcon icon={faListOl} />
                    </span>
                    <div className="menu-title">{t("ManageWebContent")}</div>
                  </a>
                  <div className="child-menu ">
                    <ul className="nav-items ">
                      {pagesAllow.menu && (
                        <NavLink
                          onClick={closeSidebarhandler}
                          to="/menu"
                          className={`items `}
                          title={t("ManageWebContent")}
                          liClass="sub-items"
                        >
                          <span className="collap-title">
                            <FontAwesomeIcon icon={faSignsPost} />
                          </span>
                          <span className="menu-title">{t("MenuPage")}</span>
                        </NavLink>
                      )}
                      {pagesAllow.category && (
                        <NavLink
                          onClick={closeSidebarhandler}
                          to="/category"
                          className={`items `}
                          title={t("ManageWebContent")}
                          liClass="sub-items"
                        >
                          <span className="collap-title">
                            <FontAwesomeIcon icon={faSitemap} />
                          </span>
                          <span className="menu-title">{t("CategoryPage")}</span>
                        </NavLink>
                      )}
                      {pagesAllow.posts && (
                        <NavLink
                          onClick={closeSidebarhandler}
                          to="/posts"
                          className={`items `}
                          title={t("ManageWebContent")}
                          liClass="sub-items"
                        >
                          <span className="collap-title">
                            <FontAwesomeIcon icon={faNewspaper} />
                          </span>
                          <span className="menu-title">{t("PostPage")}</span>
                        </NavLink>
                      )}
                    </ul>
                  </div>
                </li>
              </ul>
            </Fragment>
          )} */}

          {pagesAllow.groups.report && (
            <Fragment>
              <hr className="line-section gap" />
              <div className="title-section">{t("ReportTitle")}</div>
              <ul className="nav-menu">
                {pagesAllow.reports && (
                  <NavLink
                    onClick={closeSidebarhandler}
                    to="/report"
                    className={`navlink `}
                    title={t("ReportPage")}
                    liClass="menu-link"
                  >
                    <figure className="faIcon">
                      <FontAwesomeIcon icon={faFileCsv} />
                    </figure>
                    <div className="menu-title">{t("ReportPage")}</div>
                  </NavLink>
                )}
              </ul>
            </Fragment>
          )}

          {pagesAllow.groups.system && (
            <Fragment>
              <hr className="line-section gap" />
              <div className="title-section">{t("SettingsTitle")}</div>
              <ul className="nav-menu">
                {pagesAllow.suppliers &&
                  (uPermission.superAdmin ||
                    uPermission.admin ||
                    uPermission.officer) && (
                    <NavLink
                      onClick={closeSidebarhandler}
                      to="/suppliers"
                      className={`navlink `}
                      title={t("suppliersPage")}
                      liClass="menu-link"
                    >
                      <figure className="faIcon">
                        {/* <FontAwesomeIcon icon={faUserShield} /> */}
                        <img src="/images/icons/entypo_shop.png" alt="" />
                      </figure>
                      <div className="menu-title">{t("suppliersPage")}</div>
                    </NavLink>
                  )}
                {pagesAllow.productcate &&
                  (uPermission.superAdmin ||
                    uPermission.admin ||
                    uPermission.officer) && (
                    <NavLink
                      onClick={closeSidebarhandler}
                      to="/productcate"
                      className={`navlink `}
                      title={t("ProductCategory")}
                      liClass="menu-link"
                    >
                      <figure className="faIcon">
                        {/* <FontAwesomeIcon icon={faUserShield} /> */}
                        <img src="/images/icons/uis_layer-group.png" alt="" />
                      </figure>
                      <div className="menu-title">{t("ProductCategory")}</div>
                    </NavLink>
                  )}
                {pagesAllow.vat &&
                  (uPermission.superAdmin ||
                    uPermission.admin ||
                    uPermission.officer) && (
                    <NavLink
                      onClick={closeSidebarhandler}
                      to="/amount"
                      className={`navlink `}
                      title={t("amountPage")}
                      liClass="menu-link"
                    >
                      <figure className="faIcon">
                        {/* <FontAwesomeIcon icon={faUserShield} /> */}
                        <img
                          src="/images/icons/majesticons_atom-2.png"
                          alt=""
                        />
                      </figure>
                      <div className="menu-title">{t("amountPage")}</div>
                    </NavLink>
                  )}
                {pagesAllow.vat &&
                  (uPermission.superAdmin ||
                    uPermission.admin ||
                    uPermission.officer) && (
                    <NavLink
                      onClick={closeSidebarhandler}
                      to="/vat"
                      className={`navlink `}
                      title={t("vat")}
                      liClass="menu-link"
                    >
                      <figure className="faIcon">
                        {/* <FontAwesomeIcon icon={faUserShield} /> */}
                        <img
                          src="/images/icons/foundation_graph-pie.png"
                          alt=""
                        />
                      </figure>
                      <div className="menu-title">{t("vat")}</div>
                    </NavLink>
                  )}

                {pagesAllow.webinfo && (
                  <NavLink
                    onClick={closeSidebarhandler}
                    to="/webinfo"
                    className={`navlink `}
                    title={t("WebInfoPage")}
                    liClass="menu-link"
                  >
                    <figure className="faIcon">
                      <FontAwesomeIcon icon={faCircleInfo} />
                    </figure>
                    <div className="menu-title">{t("WebInfoPage")}</div>
                  </NavLink>
                )}

                {pagesAllow.admins &&
                  (uPermission.superAdmin ||
                    uPermission.admin ||
                    uPermission.officer) && (
                    <NavLink
                      onClick={closeSidebarhandler}
                      to="/admins"
                      className={`navlink `}
                      title={t("AdminPage")}
                      liClass="menu-link"
                    >
                      <figure className="faIcon">
                        <FontAwesomeIcon icon={faUserShield} />
                      </figure>
                      <div className="menu-title">{t("AdminPage")}</div>
                    </NavLink>
                  )}

                {pagesAllow.languages && (
                  <NavLink
                    onClick={closeSidebarhandler}
                    to="/languages"
                    className={`navlink `}
                    title={t("LanguagePage")}
                    liClass="menu-link"
                  >
                    <figure className="faIcon">
                      <FontAwesomeIcon icon={faLanguage} />
                    </figure>
                    <div className="menu-title">{t("LanguagePage")}</div>
                  </NavLink>
                )}

                {pagesAllow.configs && uPermission.superAdmin && (
                  <NavLink
                    onClick={closeSidebarhandler}
                    to="/configs"
                    className={`navlink `}
                    title={t("ConfigPage")}
                    liClass="menu-link"
                  >
                    <figure className="faIcon">
                      <FontAwesomeIcon icon={faTools} />
                    </figure>
                    <div className="menu-title">{t("ConfigPage")}</div>
                  </NavLink>
                )}
                {/* {isDevMode && (
                  <NavLink
                    onClick={closeSidebarhandler}
                    to="/componentui"
                    className={`navlink `}
                    title="UI Components"
                    liClass="menu-link"
                  >
                    <figure className="faIcon">
                      <FontAwesomeIcon icon={faIcons} />
                    </figure>
                    <div className="menu-title">UI Components</div>
                  </NavLink>
                )} */}
                {/* <div className="menu-link">
                  <a
                    href={`${uploadPath}upload/manual/manual.pdf`}
                    className={`navlink `}
                    target="_blank"
                    title="Manual"
                  >
                    <figure className="faIcon">
                      <FontAwesomeIcon icon={faBook} />
                    </figure>
                    <div className="menu-title">Manual</div>
                  </a>
                </div> */}
              </ul>
            </Fragment>
          )}
        </div>

        <hr className="line-section gap" />
      </nav>
      <ul
        className="nav-menu mini-bar"
        style={{ marginTop: "auto", paddingRight: ".5rem" }}
      >
        {/* <li className="menu-link footerLink">
          <a href={webPath} target="_blank" className="navlink pink-btn " title={t("GoToWebSite")}>
            <figure className="faIcon">
              <FontAwesomeIcon icon={faHome} />
            </figure>
            <span className="menu-title">{t("GoToWebSite")}</span>
          </a>
        </li> */}
      </ul>
      <p className="powerBy">Backoffice v. 1 </p>
    </aside>
  );
};

export default SidebarComponent;
