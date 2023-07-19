/* eslint-disable */
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Typography } from "@mui/material";
import { useSelector } from "react-redux";

function Table({ productsData, refreshData, setRefreshData, productSelected, setProductSelected }) {
  const webPath = useSelector((state) => state.app.webPath);

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => productsData.find((product) => product.id === id));
    setProductSelected(selectedRowsData);
  };

  console.log(productsData);

  const columns = [
    {
      field: "thumbnail_link",
      headerName: "ภาพ",
      width: 50,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <figure style={{ background: "#D0D0E2", borderRadius: "5px", padding: ".1rem" }}>
          <Avatar alt="Thumbnail" src={`${webPath}${params.row.thumbnail_link}`} />
        </figure>
      ),
    },
    {
      field: "name",
      headerName: "ชื่อรายการ",
      headerAlign: "center",
      align: "left",
      width: 140,
      headerClassName: "table-columns",
      renderCell: (params) => (
        <div style={{ paddingLeft: "1.5rem" }}>
          <p style={{ fontSize: "12px", lineHeight: "12.5px" }}>{params.row.title}</p>
          <p style={{ fontSize: "12px", lineHeight: "12.5px", color: "#9993B4" }}>
            {params.row.product_id}
          </p>
        </div>
      ),
    },
    {
      field: "export_date",
      width: 109,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            วันเวลา
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            เบิกออกล่าสุด
          </Typography>
        </div>
      ),
      renderCell: (params) => {
        const date = params.row.export_date?.split(" ")[0];
        const time = params.row.export_date?.split(" ")[1];
        return (
          <div>
            <p style={{ fontSize: "12px", lineHeight: "12.5px" }}>{date}</p>
            <p style={{ fontSize: "12px", lineHeight: "12.5px", color: "red" }}>{time}</p>
          </div>
        );
      },
    },
    {
      field: "export_defective_value",
      width: 109,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            จำนวนเบิกออก
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ล่าสุด/หน่วย
          </Typography>
        </div>
      ),
      renderCell: (params) => (
        <div>
          <p style={{ fontSize: "12px", lineHeight: "12.5px" }}>
            {params.row.export_defective_value !== 0 ? params.row.export_defective_value : ""}
          </p>
        </div>
      ),
    },
    {
      field: "import_value",
      width: 109,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            คงเหลือ
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            /หน่วย
          </Typography>
        </div>
      ),
      renderCell: (params) => (
        <div>
          <p style={{ fontSize: "12px", lineHeight: "12.5px" }}>
            {params.row.import_value - params.row.export_value - params.row.export_defective_value}
          </p>
        </div>
      ),
    },
    {
      field: "purchase_date",
      headerName: "วันที่ซื้อ",
      width: 109,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "MEDEXP",
      width: 109,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            MFD
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            EXP
          </Typography>
        </div>
      ),
      renderCell: (params) => (
        <div>
          <p style={{ fontSize: "12px", lineHeight: "12.5px" }}>{params.row.mfd_date}</p>
          <p style={{ fontSize: "12px", lineHeight: "12.5px", color: "#FF0000" }}>
            {params.row.exp_date}
          </p>
        </div>
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
      width: 109,
      headerClassName: "table-columns",
    },
    {
      field: "volumnPerUnit",
      headerAlign: "center",
      align: "center",
      width: 109,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ปริมาตรสุทธิ
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            /หน่วย
          </Typography>
        </div>
      ),
    },
    {
      field: "oc_unit",
      width: 109,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ดำเนินการ
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            /หน่วย (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "product_cost",
      headerAlign: "center",
      align: "center",
      width: 109,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ราคาดิบ
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            /หน่วย (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "unit_price",
      width: 109,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ต้นทุน
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            /หน่วย (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "set_profit",
      headerName: "กำไร (%)",
      width: 109,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
    },
    {
      field: "selling_price",
      width: 109,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ราคาขายจริง
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            (THB)
          </Typography>
        </div>
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

  return (
    <div>
      <DataGrid
        getRowClassName={() => rowsClassName}
        sx={{ fontSize: "12px", border: "none" }}
        rows={uniqueProductsData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 50, 109]}
        checkboxSelection
        onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
      />
    </div>
  );
}

export default Table;
