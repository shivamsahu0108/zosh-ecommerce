import { useFormik } from "formik";

import { useNavigate } from "react-router-dom";
import { sellerLogin } from "../../../State/seller/SellerAuthSlice";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { TextField, Button, CircularProgress } from "@mui/material";
import { sendLoginSignUpOtp, signin } from "../../../State/AuthSlice";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: (values) => {
      dispatch(sellerLogin(values));
      console.log(values);
      dispatch(signin(values));
    },
  });
  const handleSendOTP = (e: any) => {
    dispatch(sendLoginSignUpOtp({ email: formik.values.email }));
  };
  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary-color pb-8">
        Login
      </h1>
      <div>
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

          {auth.otpSent && (
            <div className="space-y-3">
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
                required
                
              />
            </div>
          )}
          <div>
            {auth.otpSent ? (
              <Button
                variant="contained"
                fullWidth
                sx={{ py: "11px" }}
                type="submit"
                onClick={() => formik.handleSubmit()}
              >
                Login
              </Button>
            ) : (
              <Button
                variant="contained"
                fullWidth
                sx={{ py: "11px" }}
                type="submit"
                onClick={handleSendOTP}
              >
                {auth.loading ? <CircularProgress /> : "Send OTP"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
