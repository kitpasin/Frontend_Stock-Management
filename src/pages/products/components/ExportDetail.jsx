import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import PulseLoader from 'react-spinners/PulseLoader';

import dayjs from "dayjs";
import DeleteRowExportDetail from "./DeleteRowExportDetail";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import axios from "axios";

function ExportDetail({
  setOpenExportedTempModal,
  refreshData,
  setRefreshData,
  uniqueProductsData,
}) {
  const { displayName } = useSelector((state) => state.auth.profile);
  const webPath = useSelector((state) => state.app.webPath);
  const [isHovered, setIsHovered] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Simulate data loading after 2 seconds
    setTimeout(() => {
      setDataLoaded(true);
    }, 2000);
  }, []);

  function minusQuantity(data) {
    if (data.quantity > 1) {
      const newData = data.quantity -= 1
      const formData = {
        'product_id': data.product_id,
        'quantity': newData
      }
      axios.post("product/export/minus/quantity", formData).then(() => {
        setRefreshData(refreshData + 1)
      })
    } else {
      console.log("Error, quantity shouldn't less than 0")
    }
  }

  function plusQuantity(data) {
    if (data.quantity >= 0 && data.quantity < (data.import_value - data.export_value - data.export_defective_value)) {
      const newData = data.quantity += 1
      const formData = {
        'product_id': data.product_id,
        'quantity': newData
      }
      axios.post("product/export/plus/quantity", formData).then(() => {
        setRefreshData(refreshData + 1)
      })
    } else {
      console.log("Error, quantity shouldn't less than 0")
    }
  }

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
      width: 143,
      headerClassName: "table-columns",
      renderCell: (params) => {
        return (
          <div
            style={{ paddingLeft: "0" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
      field: "p_type",
      headerAlign: "center",
      align: "center",
      width: 143,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            ประเภทสินค้า
          </Typography>
        </div>
      ),
      // renderCell: () => (
      //   <div style={{ lineHeight: "12.5px" }}>{displayName}</div>
      // ),
    },
    {
      field: "product_barcode",
      headerAlign: "center",
      align: "center",
      width: 143,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            บาร์โค้ดเดิม
          </Typography>
        </div>
      ),
    },
    {
      field: "quantityPerUnit",
      headerAlign: "center",
      align: "center",
      width: 143,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            คงเหลือ
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            /หน่วย
          </Typography>
        </div>
      ),
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
      field: "purchase_date",
      headerName: "วันที่ซื้อ",
      headerAlign: "center",
      align: "center",
      width: 143,
      headerClassName: "table-columns",
    },
    {
      field: "mfd_date",
      width: 143,
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
              color: "#FF0000",
            }}
          >
            {params.row.exp_date}
          </p>
        </div>
      ),
    },
    {
      field: "counting_unit_name",
      headerName: "หน่วยนับ",
      headerAlign: "center",
      align: "center",
      width: 143,
      headerClassName: "table-columns",
    },
    {
      field: "volumnPerUnit",
      headerAlign: "center",
      align: "center",
      width: 143,
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
      renderCell: (params) => (
        <div>
          <p style={{ fontSize: "12px", lineHeight: "12.5px" }}>
            {params.row.units} {params.row.unit_name}
          </p>
        </div>
      ),
    },
    {
      field: "selling_price",
      width: 143,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            ราคาขายจริง
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "quantity",
      width: 143,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            จำนวนที่จะ
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            เบิก/หน่วย
          </Typography>
        </div>
      ),
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <figure onClick={() => minusQuantity(params.row)}>
            <RemoveCircleOutlineIcon sx={{ cursor: "pointer" }} />
          </figure>
          <p style={{ fontSize: "12px", lineHeight: "12.5px" }}>
            {params.row.quantity}
          </p>
          <figure onClick={() => plusQuantity(params.row)}>
            <AddCircleOutlineIcon sx={{ cursor: "pointer" }} />
          </figure>
        </div>
      ),
    },
    {
      field: "action",
      headerName: "ลบ",
      headerAlign: "center",
      align: "center",
      width: 143,
      headerClassName: "table-columns",
      renderCell: (params) => (
        <DeleteRowExportDetail
          params={params}
          refreshData={refreshData}
          setRefreshData={setRefreshData}
          setOpenExportedTempModal={setOpenExportedTempModal}
          uniqueProductsData={uniqueProductsData}
        />
      ),
    },
  ];

  const rowsClassName = "table-rows";

  return (
    <div>
    {dataLoaded ? (
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
        disableColumnSelector
      />
    ) : (
      <div className="loading-screen">
        <PulseLoader color={"#3b326b"} loading={true} />
      </div>
    )}
  </div>
  );
}

export default ExportDetail;
