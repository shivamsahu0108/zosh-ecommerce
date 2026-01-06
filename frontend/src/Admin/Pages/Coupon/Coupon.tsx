import { Delete } from "@mui/icons-material";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { deleteCoupon, getAllCoupons } from "../../../State/admin/CouponSlice";

const couponStatusList = [
  {
    status: "ALL",
    title: "All",
    description: "Show all coupons",
  },
  {
    status: "ACTIVE",
    title: "Active",
    description: "Coupon is active and can be used",
  },

  {
    status: "DEACTIVATED",
    title: "Deactivated",
    description: "Coupon is deactivated and cannot be used",
  },

  {
    status: "CLOSED",
    title: "Closed",
    description: "Coupon is permanently closed and cannot be used",
  },
];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
const Coupon = () => {
  const [accountStatus, setAccountStatus] = useState("ALL");
  const dispatch = useAppDispatch();
  const { adminCoupons } = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(getAllCoupons());
  }, [dispatch]);
  const handleChange = (event: any) => {
    setAccountStatus(event.target.value);
  };
  const filteredCoupons = adminCoupons.coupons.filter((coupon) => {
    if (accountStatus === "ALL") return true;

    if (accountStatus === "ACTIVE") return coupon.active === true;

    if (accountStatus === "DEACTIVATED") return coupon.active === false;

    if (accountStatus === "CLOSED") return coupon.active === false;
    // adjust if you have a separate field for closed

    return true;
  });
  const handleDelete = (couponId: number) => {
    dispatch(deleteCoupon(couponId));
  };

  return (
    <>
      <div className="pb-5 w-60">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Account Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={accountStatus}
            label="Account Status"
            onChange={handleChange}
          >
            {couponStatusList.map((status: any) => (
              <MenuItem key={status.status} value={status.status}>
                {status.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Coupon Code</StyledTableCell>
                <StyledTableCell>Start Date</StyledTableCell>
                <StyledTableCell>End Date</StyledTableCell>
                <StyledTableCell>Min Order Value</StyledTableCell>
                <StyledTableCell align="right">Discount %</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCoupons.map((coupon) => (
                <StyledTableRow key={coupon.id}>
                  <StyledTableCell component="th" scope="row">
                    {coupon.code}
                  </StyledTableCell>
                  <StyledTableCell>{coupon.validityStartDate}</StyledTableCell>
                  <StyledTableCell>{coupon.validityEndDate}</StyledTableCell>
                  <StyledTableCell>{coupon.minimumOrderValue}</StyledTableCell>
                  <StyledTableCell align="right">
                    {coupon.discountPercentage}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {coupon.active ? "Active" : "Inactive"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button onClick={() => handleDelete(coupon.id)}>
                      <Delete />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Coupon;
