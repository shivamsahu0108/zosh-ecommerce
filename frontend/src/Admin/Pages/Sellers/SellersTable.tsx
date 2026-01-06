import {
  Button,
  FormControl,
  InputLabel,
  Menu,
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
import { useAppDispatch, useAppSelector } from "./../../../State/Store";
import {
  getAllSellers,
  updateSellerStatus,
} from "../../../State/admin/allSellerSlice";
import { Seller } from "../../../Types/SellerTypes";
const accountStatusList = [
  {
    status: "PENDING_VERIFICATION",
    title: "Pending Verification",
    description: "Account is pending verification",
  },
  {
    status: "ACTIVE",
    title: "Active",
    description: "Account is active and in good standing",
  },
  {
    status: "SUSPENDED",
    title: "Suspended",
    description: "Account is temporarily suspended",
  },
  {
    status: "DEACTIVATED",
    title: "Deactivated",
    description: "Account is deactivated",
  },
  {
    status: "BANNED",
    title: "Banned",
    description: "Account is permanently banned",
  },
  {
    status: "CLOSED",
    title: "Closed",
    description: "Account is permanently closed",
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
const SellersTable = () => {
  const dispatch = useAppDispatch();

  const { allSellers } = useAppSelector((state) => state);

  const [accountStatus, setAccountStatus] = useState("ACTIVE");

  useEffect(() => {
    dispatch(getAllSellers(accountStatus));
  }, [dispatch, accountStatus]);

  const handleChange = (event: any) => {
    setAccountStatus(event.target.value);
  };
  const [anchorEl, setAnchorEl] = useState<null | any>({});
  const open = Boolean(anchorEl);
  const handleClick = (event: any, sellerId: number) => {
    setAnchorEl((prev: any) => ({ ...prev, [sellerId]: event.currentTarget }));
  };
  const handleClose = (sellerId: number) => () => {
    setAnchorEl((prev: any) => ({ ...prev, [sellerId]: null }));
  };
  const handleUpdateOrderStatus = (id: number, status: string) => () => {
    dispatch(
      updateSellerStatus({
        jwt: localStorage.getItem("jwt") || "",
        id,
        status,
      })
    ).then(() => {
      // Refresh the list so the filter works correctly
      dispatch(getAllSellers(accountStatus));
    });

    // Close the menu
    setAnchorEl((prev: any) => ({ ...prev, [id]: null }));
  };

  return (
    <>
      <div className="pb-5 w-60">
        <FormControl fullWidth>
          <InputLabel>Account Status</InputLabel>
          <Select
            value={accountStatus}
            label="Account Status"
            onChange={handleChange}
          >
            {accountStatusList.map((status) => (
              <MenuItem key={status.status} value={status.status}>
                {status.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Seller Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell align="right">Mobile</StyledTableCell>
              <StyledTableCell align="right">GSTIN</StyledTableCell>
              <StyledTableCell align="right">Business Name</StyledTableCell>
              <StyledTableCell align="right">Account Status</StyledTableCell>
              <StyledTableCell align="right">Change Status</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {allSellers.sellers.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell>{item.sellerName}</StyledTableCell>
                <StyledTableCell>{item.email}</StyledTableCell>
                <StyledTableCell align="right">{item.mobile}</StyledTableCell>
                <StyledTableCell align="right">{item.GSTIN}</StyledTableCell>
                <StyledTableCell align="right">
                  {item.businessDetails?.businessName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {item.accountStatus}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button>
                    {" "}
                    <div>
                      <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(event) => handleClick(event, item.id)}
                      >
                        CHANGE STATUS
                      </Button>
                      <Menu
                        id={`status-menu ${item.id}`}
                        anchorEl={anchorEl[item.id]}
                        open={Boolean(anchorEl[item.id])}
                        onClose={handleClose(item.id)}
                        slotProps={{
                          list: {
                            "aria-labelledby": `status-menu ${item.id}`,
                          },
                        }}
                      >
                        {accountStatusList.map((status) => (
                          <MenuItem
                            key={status.status}
                            onClick={handleUpdateOrderStatus(
                              item.id,
                              status.status
                            )}
                          >
                            {status.title}
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SellersTable;
