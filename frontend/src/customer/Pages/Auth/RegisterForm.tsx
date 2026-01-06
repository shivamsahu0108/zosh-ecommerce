import { useFormik } from "formik";

import { useNavigate } from "react-router-dom";
import { sellerLogin } from "../../../State/seller/SellerAuthSlice";
import { useAppDispatch } from "../../../State/Store";
import { TextField, Button } from "@mui/material";
import { sendLoginSignUpOtp } from "../../../State/AuthSlice";

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      fullName: "",
    },
    onSubmit: (values) => {
      dispatch(sellerLogin(values));
      console.log(values);
      if (dispatch(sellerLogin(values)) !== undefined) navigate("/seller");
    },
  });
  const handleSendOTP = (e: any) => {
    dispatch(sendLoginSignUpOtp({ email: formik.values.email }));
  };
  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary-color pb-8">
        Sign Up
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

          {true && (
            <div className="space-y-5">
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm opacity-60">
                    Your OTP will be sent to this email
                  </p>
                </div>
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
              <div>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fullName && Boolean(formik.errors.fullName)
                  }
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />
              </div>
            </div>
          )}
          {false && (
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
          )}

          <Button
            variant="contained"
            fullWidth
            sx={{ py: "11px" }}
            type="submit"
            onClick={() => formik.handleSubmit()}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
