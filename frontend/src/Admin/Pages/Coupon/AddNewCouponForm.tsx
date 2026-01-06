import React from "react";
import { Dayjs } from "dayjs";
import { useFormik } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../../State/Store";
import { createCoupon } from "../../../State/admin/CouponSlice";
interface CouponFormValues {
  code: string;
  discountPercentage: number;
  validityStartDate: Dayjs | null;
  validityEndDate: Dayjs | null;
  minimumOrderValue: number;
}
const AddNewCouponForm = () => {
  const dispatch = useAppDispatch();
  
  const formik = useFormik<CouponFormValues>({
    initialValues: {
      code: "",
      discountPercentage: 0,
      validityStartDate: null,
      validityEndDate: null,
      minimumOrderValue: 0,
    },
    onSubmit: (values) => {
      const formatedValues = {
        ...values,
        validityStartDate: values.validityStartDate?.toISOString(),
        validityEndDate: values.validityEndDate?.toISOString(),
      };
      dispatch(createCoupon(formatedValues));
      console.log(values, formatedValues);
    },
  });
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-color pb-10 text-center ">
        Add New Coupon
      </h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Coupon Code"
                name="code"
                value={formik.values.code}
                onChange={formik.handleChange}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Discount Percentage"
                name="discountPercentage"
                value={formik.values.discountPercentage}
                onChange={formik.handleChange}
                error={
                  formik.touched.discountPercentage &&
                  Boolean(formik.errors.discountPercentage)
                }
                helperText={
                  formik.touched.discountPercentage &&
                  formik.errors.discountPercentage
                }
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Validity Start Date"
                name="validityStartDate"
                value={formik.values.validityStartDate}
                onChange={(newValue) => formik.setFieldValue("validityStartDate", newValue)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Validity End Date"
                name="validityEndDate"
                value={formik.values.validityEndDate}
                onChange={(newValue) => formik.setFieldValue("validityEndDate", newValue)}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Minimum Order Value"
                name="minimumOrderValue"
                value={formik.values.minimumOrderValue}
                onChange={formik.handleChange}
                error={
                  formik.touched.minimumOrderValue &&
                  Boolean(formik.errors.minimumOrderValue)
                }
                helperText={
                  formik.touched.minimumOrderValue &&
                  formik.errors.minimumOrderValue
                }
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ py: "0.8rem" }}
              >
                Create Coupon
              </Button>
            </Grid>
          </Grid>
        </Box>
      </LocalizationProvider>
    </div>
  );
};

export default AddNewCouponForm;
