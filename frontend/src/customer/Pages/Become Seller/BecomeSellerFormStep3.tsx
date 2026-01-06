import { Box, TextField } from "@mui/material";
import React from "react";

const BecomeSellerFormStep3 = ({ formik }: any) => {
  return (
    <Box>
      <p className="text-xl font-bold text-center pb-9">Bank Details</p>

      <div className="space-y-5">
        <div>
          <TextField
            fullWidth
            label="Account Number"
            name="accountNumber"
            value={formik.values.accountNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.accountNumber &&
              Boolean(formik.errors.accountNumber)
            }
            helperText={
              formik.touched.accountNumber && formik.errors.accountNumber
            }
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="IFSC Code"
            name="ifscCode"
            value={formik.values.ifscCode}
            onChange={formik.handleChange}
            error={formik.touched.ifscCode && Boolean(formik.errors.ifscCode)}
            helperText={formik.touched.ifscCode && formik.errors.ifscCode}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Account Holder Name"
            name="accountHolderName"
            value={formik.values.accountHolderName}
            onChange={formik.handleChange}
            error={
              formik.touched.accountHolderName &&
              Boolean(formik.errors.accountHolderName)
            }
            helperText={
              formik.touched.accountHolderName &&
              formik.errors.accountHolderName
            }
          />
        </div>
      </div>
    </Box>
  );
};

export default BecomeSellerFormStep3;
