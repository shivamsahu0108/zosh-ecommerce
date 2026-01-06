import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { createDeal } from "../../../State/admin/DealSlice";

const CreateDealForm = () => {
  const dispatch = useAppDispatch();
  const { customer } = useAppSelector((state) => state);
  const formik = useFormik({
    initialValues: { discount: 0, category: "" },
    onSubmit: (values) => {
      console.log(values);
      const reqData = {
        discount: values.discount,
        category: {
          id: values.category,
        },
      };
      dispatch(createDeal(reqData));
    },
  });
  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      className="space-y-5 w-full max-w-md"
    >
      <div className="">
        <Typography variant="h4" className="text-center">
          Create Deal
        </Typography>
      </div>
      <div>
        <TextField
          fullWidth
          label="Discount"
          name="discount"
          onChange={formik.handleChange}
          value={formik.values.discount}
          error={formik.touched.discount && Boolean(formik.errors.discount)}
          helperText={formik.touched.discount && formik.errors.discount}
        />
      </div>
      <div>
        <FormControl fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            name="category"
            label="Category"
            value={formik.values.category}
            onChange={formik.handleChange}
          >
            {customer.homepageData?.dealCategories?.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Button fullWidth sx={{ py: "0.9rem" }} type="submit" variant="contained">
        Create Deal
      </Button>
    </Box>
  );
};

export default CreateDealForm;
