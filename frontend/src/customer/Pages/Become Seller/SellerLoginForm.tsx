import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useAppDispatch } from "../../../State/Store";
import { sendLoginSignUpOtp, signin } from "../../../State/AuthSlice";
import { sellerLogin } from "../../../State/seller/SellerAuthSlice";
import { useNavigate } from "react-router-dom";

const SellerLoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: (values) => {
      dispatch(sellerLogin(values));
      console.log(values);
      if (dispatch(sellerLogin(values)) !== undefined)
        navigate("/seller");
    },
  });
  const handleSendOTP = (e: any) => {
    dispatch(sendLoginSignUpOtp({ email: formik.values.email }));
  };
  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary-color pb-5">
        Login As Seller
      </h1>
      <div className="space-y-5">
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

        {true && (
          <div className="space-y-2">
            <p className="font-medium text-sm opacity-60">
              Your OTP will be sent to this email
            </p>
            <TextField
              fullWidth
              label="OTP"
              name="otp"
              value={formik.values.otp}
              onChange={formik.handleChange}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={formik.touched.otp && formik.errors.otp}
            />
          </div>
        )}
        <div>
          <Button
            variant="contained"
            fullWidth
            sx={{ py: "11px" }}
            type="submit"
            onClick={handleSendOTP}
          >
            Send OTP
          </Button>
        </div>

        <Button
          variant="contained"
          fullWidth
          sx={{ py: "11px" }}
          type="submit"
          onClick={() => formik.handleSubmit()}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default SellerLoginForm;
