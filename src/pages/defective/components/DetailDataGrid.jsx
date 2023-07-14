import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import dayjs from "dayjs";

function DetailDataGrid({ selectedProduct, productShow, productShowArr, stock }) {
  const current_date = dayjs().toISOString().substring(0, 10);

  const columns = [
    {
      field: "total_product",
      headerAlign: "center",
      align: "center",
      width: 70,
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
          <p>{params.row.import_value - (params.row.export_value + params.row.export_defective_value)}</p>
        </div>
      )
    },
    {
      field: "defective_product",
      headerAlign: "center",
      align: "center",
      width: 70,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            สินค้า
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            มีปัญหา
          </Typography>
        </div>
      ),
    },
    {
      field: "purchase_date",
      headerName: "วันที่ซื้อ",
      headerAlign: "center",
      align: "center",
      width: 95,
      headerClassName: "table-columns",
    },
    {
      field: "mfd_date",
      width: 90,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            MFD
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            EXP
          </Typography>
        </div>
      ),
      renderCell: (params) => (
        <div>
          <p style={{ fontSize: "12px", lineHeight: "12.5px" }}>
            {params.row.mfd_date}
          </p>
          <p
            style={{ fontSize: "12px", lineHeight: "12.5px", color: "#FF0000" }}
          >
            {params.row.exp_date}
          </p>
        </div>
      ),
    },
    {
      field: "exp_date",
      headerAlign: "center",
      align: "center",
      width: 70,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            จำนวนวัน
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            EXP
          </Typography>
        </div>
      ),
      renderCell: (params) => {
        const startDate = new Date(params.row.mfd_date);
        const endDate = new Date(params.row.exp_date);
        const diffDateInMs = endDate - startDate;
        const diffDateInDays = diffDateInMs / (1000 * 60 * 60 * 24);

        const duration = dayjs(params.row.exp_date).diff(current_date, "day");
        return (
          <div>
            <p>{duration} วัน</p>
          </div>
        );
      },
    },
    {
      field: "vat_name",
      headerName: "Vat",
      headerAlign: "center",
      align: "center",
      width: 50,
      headerClassName: "table-columns",
    },
    {
      field: "main_cate_name",
      headerName: "หมวดหมู่",
      headerAlign: "center",
      align: "center",
      width: 95,
      headerClassName: "table-columns",
    },
    {
      field: "amount_name",
      headerName: "หน่วยนับ",
      headerAlign: "center",
      align: "center",
      width: 95,
      headerClassName: "table-columns",
    },
    {
      field: "volumnPerUnit",
      width: 95,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
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
      field: "px_total",
      width: 95,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            ค่าดำเนินการ
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
      field: "oc_unit",
      width: 95,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            ค่าดำเนินการ
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            /หน่วย (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "product_cost",
      width: 95,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            ราคาดิบ
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
      field: "cost_per_unit",
      headerName: "ราคาดิบ/หน่วย (THB)",
      width: 95,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            ราคาดิบ
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            /หน่วย (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "unit_price",
      width: 95,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            ต้นทุน
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            /หน่วย (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "total_cost",
      headerName: "Total",
      width: 95,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "set_profit",
      headerName: "กำไร (%)",
      width: 95,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "pp_vat",
      width: 95,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            ราคาขาย
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
      field: "selling_price",
      width: 95,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
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
  ];

  const rowsClassName = "table-rows";

  const rowData = selectedProduct ? [selectedProduct] : [];

  return (
    <>
      <DataGrid
        getRowClassName={() => rowsClassName}
        sx={{ fontSize: "12px", border: "none" }}
        rows={productShowArr}
        columns={columns}
        hideFooterPagination
        className="no-footer"
      />
    </>
  );
}

export default DetailDataGrid;
