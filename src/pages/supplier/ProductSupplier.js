import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Autocomplete, Avatar, TextField } from "@mui/material";

function ProductSupplier({ productAll }) {
  const webPath = useSelector((state) => state.app.webPath);

  const columns = [
    {
      field: "thumbnail_link",
      headerName: "ภาพ",
      width: 50,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <figure
          style={{
            background: "#D0D0E2",
            borderRadius: "5px",
            padding: ".1rem",
          }}
        >
          <Avatar
            alt="Thumbnail"
            src={`${webPath}${params.row.thumbnail_link}`}
          />
        </figure>
      ),
    },
    {
      field: "title",
      headerName: "ชื่อรายการ",
      width: 150,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "supplier_name",
      headerName: "ชื่อซัพพลายเออร์",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "supplier_barcode",
      headerName: "ซัพพลายเออร์บาร์โค้ด",
      width: 150,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "import_value",
      headerName: "จำนวนที่สั่งซื้อ",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "defective_product",
      headerName: "จำนวนสินค้าผิดปกติ",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "purchase_date",
      headerName: "วันที่ซื้อ",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "exp_date",
      headerName: "วันหมดอายุ",
      width: 150,
      headerAlign: "center",
      align: "center",
      // valueGetter: (params) =>
      // `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "vat_name",
      headerName: "Vat",
      width: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "supplier_cate_name",
      headerName: "หมวดหมู่",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount_name",
      headerName: "หน่วยนับ",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "netWeight",
      headerName: "ปริมาณสุทธิต่อหน่วย",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <p>
          {params.row.netweight} {params.row.net_name}
        </p>
      ),
    },
    {
      field: "cost_per_unit",
      headerName: "ต้นทุนต่อหน่วย",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "pp_profit",
      headerName: "ราคาต่อหน่วย",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "pp_vat",
      headerName: "รวมต้นทุนต่อหน่วย",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
  ];

  return (
    <div className="bottom-content">
      <div className="head"></div>
      <div className="content">
        <div className="content-head">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <img src="images/icons/ri_file-list-3-fill2222.png" alt="" />
              <p
                style={{
                  color: "#3B336B",
                  fontSize: "18px",
                  fontWeight: 400,
                }}
              >
                ประวัติสั่งสินค้า
              </p>
            </div>
            <div className="action">
              {/* <p>2500 จำนวนที่เคยสั่งซื้อ</p> */}
              <p>{productAll.length} รายการ</p>
            </div>
          </div>
          {/* <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={supplier}
            getOptionLabel={(option) => option.name || ""}
            sx={{ width: 180 }}
            renderInput={(params) => (
              <TextField {...params} label="ซัพพลายเออร์" />
            )}
            onChange={(e, value) => {
              filterData(value ? value.id : 0);
            }}
          /> */}
        </div>
        <div className="table">
          <DataGrid
            checkboxSelection={false}
            sx={{ border: "none" }}
            rows={productAll}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 50, 100]}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductSupplier;
