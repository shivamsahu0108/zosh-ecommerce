import { Box, TextField } from "@mui/material";
import React from "react";

const BecomeSellerFormStep4 = ({ formik }: any) => {
  return (
    <Box>
      <p className="text-xl font-bold text-center pb-9">Business Details</p>

      <div className="space-y-5">
        <div>
          <TextField
            fullWidth
            label="Business Name"
            name="businessName"
            value={formik.values.businessName}
            onChange={formik.handleChange}
            error={
              formik.touched.businessName && Boolean(formik.errors.businessName)
            }
            helperText={
              formik.touched.businessName && formik.errors.businessName
            }
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Seller Name"
            name="sellerName"
            value={formik.values.sellerName}
            onChange={formik.handleChange}
            error={
              formik.touched.sellerName && Boolean(formik.errors.sellerName)
            }
            helperText={formik.touched.sellerName && formik.errors.sellerName}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
      </div>
    </Box>
  );
};

export default BecomeSellerFormStep4;
