import { Box, Button, Grid, TextField } from "@mui/material";

const BecomeSellerFormStep2 = ({ formik }: any) => {
  return (
    <Box sx={{ maxWidth: "auto" }}>
      <p className="text-xl font-bold text-center pb-5">Pickup Address</p>
      <>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              label="Mobile"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              label="Pin Code"
              name="pinCode"
              value={formik.values.pinCode}
              onChange={formik.handleChange}
              error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
              helperText={formik.touched.pinCode && formik.errors.pinCode}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Locality"
              name="locality"
              value={formik.values.locality}
              onChange={formik.handleChange}
              error={formik.touched.locality && Boolean(formik.errors.locality)}
              helperText={formik.touched.locality && formik.errors.locality}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </Grid>
        </Grid>
      </>
    </Box>
  );
};

export default BecomeSellerFormStep2;
