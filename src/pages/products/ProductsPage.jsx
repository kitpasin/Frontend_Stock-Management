/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import "./ProductsPage.scss"
import HeadPageComponent from "../../components/layout/headpage/headpage";
import { Card } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function ProductsPage() {
  const { t } = useTranslation(["dashboard-page"]);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <section id="products-page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <figure style={{ width: "30px", marginBottom: "1rem" }}>
          <img src="/images/icons/productsPage-icon.png" alt="" />
        </figure>
        <div style={{ width: "100%" }}>
          <HeadPageComponent
            h1={t("Products")}
            breadcrums={[{ title: t("Products"), link: false }]}
          />
        </div>
      </div>
      <Card className="flex-container-column">
        <div className="header">
          <figure className="header-title">
            <img src="" alt="" />
            <p>สินค้าทั้งหมด</p>
          </figure>
          <div className="header-filter">
            <TextField
              id="standard-basic"
              label="ค้นหา"
              variant="standard"
              // value={searchQuery}
              size="small"
              // onChange={searchMembers}
            />
          </div>
        </div>
        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 50, 100]}
            checkboxSelection
          />
        </div>
      </Card>
    </section>
  );
}

export default ProductsPage;
