import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Modal, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useState } from "react";
import { Box } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 480,
  bgcolor: "#fff",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};
function ExpireDataGrid({ productsAboutToExpire }) {
  const webPath = useSelector((state) => state.app.webPath);
  const [isHovered, setIsHovered] = useState(false);
  const [showImg, setShowImg] = useState(null)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function openImgModal(params) {
    setShowImg(params.row.thumbnail_link)
    handleOpen();
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
        <div style={{ background: "#D0D0E2", borderRadius: "5px", cursor: "pointer" }} onClick={()=>openImgModal(params)}>
          <Avatar
            src={`${webPath}${params.row.thumbnail_link}`}
            alt={`Image ${params.thumbnail_title}`}
          />
        </div>
      ),
    },
    {
      field: "name",
      headerName: "ชื่อรายการ",
      headerAlign: "center",
      align: "left",
      width: isHovered ? 290 : 145,
      headerClassName: "table-columns",
      renderCell: (params) => (
        <div
          style={{ paddingLeft: "0" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <p style={{ fontSize: "12px", lineHeight: "12.5px" }}>
            {params.row.title}
          </p>
          <p
            style={{ fontSize: "12px", lineHeight: "12.5px", color: "#9993B4" }}
          >
            {params.row.product_id}
          </p>
        </div>
      ),
    },
    {
      field: "dateEXP",
      headerAlign: "center",
      align: "center",
      width: 100,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            จำนวนวัน EXP
          </Typography>
        </div>
      ),
      renderCell: (params) => {
        const endDate = dayjs(params.row.exp_date);
        const today = dayjs();
        const remainingDays = endDate.diff(today, "day");
        return (
          <div>
            <p
              style={{
                fontSize: "12px",
                lineHeight: "12.5px",
                color: remainingDays + 1 <= params.row.alert_date ? "#FF0000" : "#000",
              }}
            >
              {remainingDays + 1 <= 0 ? "หมดอายุ" : remainingDays + 1 + " วัน"}
            </p>
          </div>
        );
      },
    },
    {
      field: "counting_unit_name",
      headerName: "หน่วยนับ",
      headerAlign: "center",
      align: "center",
      width: 100,
      headerClassName: "table-columns",
    },
    {
      field: "MEDEXP",
      width: 125,
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
      field: "netweight",
      headerAlign: "center",
      align: "center",
      width: 125,
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
          <p>
            {params.row.netweight} {params.row.unit_name}
          </p>
        </div>
      ),
    },
    {
      field: "selling_price",
      headerAlign: "center",
      align: "center",
      width: 125,
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
  ];

  const rowsClassName = "table-rows";

  return (
    <>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <figure>
            <img src={`${webPath}${showImg}`} alt="" />
          </figure>
        </Box>
      </Modal>
      <DataGrid
        getRowClassName={() => rowsClassName}
        sx={{ fontSize: "12px", border: "none" }}
        rows={productsAboutToExpire}
        disableRowSelectionOnClick
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 50, 125]}
      />
    </>
  );
}

export default ExpireDataGrid;
