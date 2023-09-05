import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";

export default function Table({ productsData, refreshData, setRefreshData, setProductShow, setOpenModal }) {
  const webPath = useSelector((state) => state.app.webPath);

  const columns = [
    {
      field: "thumbnail_link",
      headerName: "ภาพ",
      // style: { maxWidth: '300px !important'  },
      width: 55,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div style={{ background: "#D0D0E2", borderRadius: "5px" }}>
          <Avatar
            src={`${webPath}${params.row.thumbnail_link}`}
            alt={`Image ${params.thumbnail_title}`}
          />
        </div>
      ),
    },
    {
      field: "title",
      headerName: "ชื่อรายการ",
      headerAlign: "center",
      align: "left",
      width: 435,
      headerClassName: "table-columns",
      renderCell: (params) => {
        return (
          <div
            style={{ paddingLeft: "0" }}
          >
            <p
              style={{ fontSize: "12px", lineHeight: "12.5px" }}
            >{`${params.row.title}`}</p>
            <p
              style={{
                fontSize: "12px",
                lineHeight: "12.5px",
                color: "#9993B4",
              }}
            >
              {params.row.product_id}
            </p>
          </div>
        );
      },
    },
    {
      field: "purchase_date",
      headerName: "วันที่ซื้อ",
      headerAlign: "center",
      align: "center",
      width: 200,
      headerClassName: "table-columns",
    },
    {
      field: "mfd_date",
      width: 200,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "10px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            MFD
          </Typography>
          <Typography
            style={{ fontSize: "10px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            EXP
          </Typography>
        </div>
      ),
      renderCell: (params) => (
        <div>
          <p style={{ fontSize: "12px", lineHeight: "12.5px", color: "#000" }}>
            {params.row.mfd_date}
          </p>
          <p
            style={{
              fontSize: "12px",
              lineHeight: "12.5px",
              color: "#9993B4",
            }}
          >
            {params.row.exp_date}
          </p>
        </div>
      ),
    },
    {
      field: "main_cate_name",
      headerName: "หมวดหมู่",
      headerAlign: "center",
      align: "center",
      width: 200,
      headerClassName: "table-columns",
    },
    {
      field: "amount_name",
      headerName: "หน่วยนับ",
      headerAlign: "center",
      align: "center",
      width: 200,
      headerClassName: "table-columns",
    },
    {
      field: "volumnPerUnit",
      headerAlign: "center",
      align: "center",
      width: 200,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            ปริมาตรสุทธิ
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            /หน่วย
          </Typography>
        </div>
      ),
    },
    {
      field: "action",
      headerName: "ดึงข้อมูล",
      headerAlign: "center",
      align: "center",
      width: 90,
      headerClassName: "table-columns",
      renderCell: (params) => (
        <Button
          id={`basic-button${params.row.id}`}
          onClick={() => handleClick(params.row)}
          style={{
            background: "#3B336B",
            minWidth: "40px",
            width: "40px",
            height: "40px",
            padding: ".65rem",
            paddingLeft: ".5rem",
            borderRadius: "5px",
          }}
        >
          <FontAwesomeIcon icon={faFileImport} size="xl" style={{ color: "#ffffff" }} />
        </Button>
      ),
    },
  ];

  const rowsClassName = "table-rows";

  // Remove duplicate products based on product_id
  const uniqueProductsMap = new Map();
  productsData.forEach((item) => {
    uniqueProductsMap.set(item.product_id, item);
  });
  const uniqueProductsData = Array.from(uniqueProductsMap.values());

  const handleClick = (product) => {
    const data = productsData.filter((item) => item.id === product.id)
    setProductShow(data[0])
    setOpenModal(true)
  }

  return (
    <div>
      <DataGrid
        getRowClassName={() => rowsClassName}
        sx={{ fontSize: "12px", border: "none" }}
        rows={uniqueProductsData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 50, 100]}
        checkboxSelection={false}
      />
    </div>
  );
}
