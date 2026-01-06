import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import { useFormik } from "formik";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";

const steps = [
  "Tax Details",
  "Pickup Address",
  "Bank Details",
  "Supplier Details",
];
const SellerAccountForm = () => {
  const formik = useFormik({
    initialValues: {
      mobile: "",
      otp: "",
      gstin: "",
      pickupAddress: {
        name: "",
        mobile: "",
        address: "",
        pinCode: "",
        city: "",
        state: "",
        locality: "",
      },
      bankDetails: {
        accountHolderName: "",
        accountNumber: "",
        ifscCode: "",
      },
      sellerName: "",
      email: "",
      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
        logo: "",
        banner: "",
        businessAddress: "",
      },
      password: "",
    },
    // validationSchema: null,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const handleStep = (value: number) => {
    (activeStep < steps.length - 1 || (activeStep > 0 && value - 1)) &&
      setActiveStep(activeStep + value);
    activeStep == steps.length - 1 && handleCreateAccount();
  };
  const handleCreateAccount = () => {
    console.log("Create Account");
  };
  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <section className="mt-20 space-y-10">
        <div>
          {activeStep == 0 ? (
            <BecomeSellerFormStep1 formik={formik} />
          ) : activeStep == 1 ? (
            <BecomeSellerFormStep2 formik={formik} />
          ) : activeStep == 2 ? (
            <BecomeSellerFormStep3 formik={formik} />
          ) : (
            <BecomeSellerFormStep4 formik={formik} />
          )}
        </div>
        <div className="flex items-center justify-between">
          <Button
            variant="contained"
            disabled={activeStep == 0}
            onClick={() => handleStep(-1)}
          >
            Back
          </Button>
          <Button variant="contained" onClick={() => handleStep(1)}>
            {activeStep == steps.length - 1 ? "Create Account" : "Continue"}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SellerAccountForm;
