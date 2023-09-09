import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Avatar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport
        printOptions={{
          hideFooter: true,
          hideToolbar: true,
        }}
      />
    </GridToolbarContainer>
  );
}

function Table({ exportedProductDetails, refreshData, setRefreshData }) {
  const { displayName } = useSelector((state) => state.auth.profile);
  const webPath = useSelector((state) => state.app.webPath);

  const columns = [
    {
      field: "thumbnail_link",
      headerName: "ภาพ",
      width: 50,
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
      width: 140,
      headerClassName: "table-columns",
      renderCell: (params) => {
        return (
          <div style={{ paddingLeft: "0" }}>
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
      field: "export_id",
      headerName: "รหัสเบิก",
      headerAlign: "center",
      align: "left",
      width: 140,
      headerClassName: "table-columns",
    },
    {
      field: "supplier_name",
      headerAlign: "center",
      headerName: "ซัพพลายเออร์",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
    },
    {
      field: "product_barcode",
      headerAlign: "center",
      headerName: "บาร์โค้ดเดิม",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
    },
    {
      field: "barcode_number",
      headerAlign: "center",
      headerName: "บาร์โค้ดใหม่",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
    },
    {
      field: "export_quantity",
      headerAlign: "center",
      headerName: "จำนวนเบิก",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
    },
    {
      field: "quantityPerUnit",
      headerAlign: "center",
      headerName: "คงเหลือ",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
      renderCell: (params) => (
        <div>
          <p
            style={{
              fontSize: "12px",
              lineHeight: "12.5px",
              color:
                params.row.import_value -
                  (params.row.export_value +
                    params.row.export_defective_value) <=
                params.row.alert_stock
                  ? "#ff0000"
                  : "#000",
            }}
          >
            {params.row.import_value -
              (params.row.export_value + params.row.export_defective_value)}
          </p>
        </div>
      ),
    },
    {
      field: "export_date",
      headerName: "วันที่เบิก",
      headerAlign: "center",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
    },
    {
      field: "user",
      headerAlign: "center",
      headerName: "ผู้ใช้งาน",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
      renderCell: () => (
        <div style={{ lineHeight: "12.5px" }}>{displayName}</div>
      ),
    },
    {
      field: "picker_name",
      headerAlign: "center",
      headerName: "ผู้เบิก",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
    },
    {
      field: "approver_name",
      headerAlign: "center",
      headerName: "ผู้อนุมัติ",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
    },
  ];

  const rowsClassName = "table-rows";

  return (
    <div>
      <DataGrid
        slots={{ toolbar: CustomToolbar }}
        getRowClassName={() => rowsClassName}
        sx={{ fontSize: "12px", border: "none" }}
        rows={exportedProductDetails}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 50, 100]}
        disableColumnSelector
      />
    </div>
  );
}

export default Table;
