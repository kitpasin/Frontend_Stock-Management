import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import MenuItemList from "./MenuItemList";

function Table({
  rows,
  productsAll,
  refreshData,
  setRefreshData,
  productSelected,
  setProductSelected,
}) {
  const webPath = useSelector((state) => state.app.webPath);

  const [selectionModel, setSelectionModel] = React.useState([]);

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) =>
      productsAll.find((product) => product.id === id)
    );
    setProductSelected(selectedRowsData);
  };

  useEffect(() => {
    setSelectionModel([])
  }, [refreshData])

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
      align: "center",
      width: 150,
      headerClassName: "table-columns",
      renderCell: (params) => (
        <div style={{ paddingLeft: "1.2rem" }}>
          <p
            style={{ fontSize: "12px", lineHeight: "12.5px" }}
          >{`${params.row.title}`}</p>
          <p
            style={{ fontSize: "12px", lineHeight: "12.5px", color: "#9993B4" }}
          >
            {params.row.product_id}
          </p>
        </div>
      ),
    },
    {
      field: "import_value",
      headerAlign: "center",
      align: "center",
      width: 50,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            นำเข้า
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
      field: "defective_product",
      headerAlign: "center",
      align: "center",
      width: 50,
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
      field: "export_value",
      headerAlign: "center",
      align: "center",
      width: 50,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            เบิกแล้ว
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
          <p>{params.row.export_value + params.row.export_defective_value}</p>
        </div>
      ),
    },
    {
      field: "quantityPerUnit",
      headerAlign: "center",
      align: "center",
      width: 50,
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
              color: params.row.import_value <= 50 ? "#ff0000" : "#000",
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
      width: 90,
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
      field: "diff_date",
      headerAlign: "center",
      align: "center",
      width: 60,
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
      renderCell: (param) => (
        <p style={{ color: param.row.diff_date <= 30 ? "#ff0000" : "#000" }}>
          {param.row.diff_date} วัน
        </p>
      ),
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
      width: 70,
      headerClassName: "table-columns",
    },
    {
      field: "amount_name",
      headerName: "หน่วยนับ",
      headerAlign: "center",
      align: "center",
      width: 70,
      headerClassName: "table-columns",
    },
    {
      field: "volumnPerUnit",
      headerAlign: "center",
      align: "center",
      width: 90,
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
      field: "px_total",
      headerAlign: "center",
      align: "center",
      width: 70,
      headerClassName: "table-columns",
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
      width: 50,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            ดำเนินการ
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            /หน่วย
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
      field: "product_cost",
      headerName: "ราคาดิบ (THB)",
      headerAlign: "center",
      align: "center",
      width: 70,
      headerClassName: "table-columns",
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
      headerAlign: "center",
      align: "center",
      width: 50,
      headerClassName: "table-columns",
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
            /หน่วย
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            (THB)
          </Typography>
        </div>
      ),
    },
    // {
    //   field: "cost",
    //   headerName: "ต้นทุน (THB)",
    //   headerAlign: "center",
    //   align: "center",
    //   width: 70,
    //   headerClassName: "table-columns",
    //   renderHeader: () => (
    //     <div>
    //       <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
    //         ต้นทุน
    //       </Typography>
    //       <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
    //         (THB)
    //       </Typography>
    //     </div>
    //   ),
    // },
    {
      field: "unit_price",
      width: 50,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
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
            /หน่วย
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
      field: "total_cost",
      width: 50,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            Total
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
      field: "set_profit",
      width: 50,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            กำไร
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            (%)
          </Typography>
        </div>
      ),
    },
    {
      field: "pp_vat",
      headerAlign: "center",
      align: "center",
      width: 70,
      headerClassName: "table-columns",
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
      width: 70,
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
      field: "action",
      headerName: "จัดการสินค้า",
      headerAlign: "center",
      align: "center",
      width: 90,
      headerClassName: "table-columns",
      renderCell: (params) => (
        <MenuItemList
          params={params}
          refreshData={refreshData}
          setRefreshData={setRefreshData}
          setProductSelected={setProductSelected}
        />
      ),
    },
  ];

  const rowsClassName = "table-rows";
  console.log(productSelected);

  return (
    <div>
      <DataGrid
        getRowClassName={() => rowsClassName}
        sx={{ fontSize: "12px", border: "none" }}
        rows={productsAll}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 50, 100]}
        checkboxSelection
        onSelectionModelChange={setSelectionModel}
        selectionModel={selectionModel}
        onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
      />
    </div>
  );
}

export default Table;
