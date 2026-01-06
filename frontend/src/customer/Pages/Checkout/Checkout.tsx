import React from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};
const paymentGatewayList = [
  {
    value: "RAZORPAY",
    image:
      "https://d6xcmfyh68wv8.cloudfront.net/newsroom-content/uploads/2024/05/Razorpay-Logo.jpg",
    label: "",
  },
  {
    value: "PAYPAL",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png",
    label: "",
  },
];
const Checkout = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [paymentMethod, setPaymentMethod] = React.useState("RAZORPAY");
  const handlePaymentMethodChange = (event: any) => {
    console.log(event.target.value);
    setPaymentMethod(event.target.value);
  };

  return (
    <>
      <div className="pt-10 px-5 sm:px-44 lg:px-60 min-h-screen">
        <div className="space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9">
          <div className="col-span-2 space-y-5">
            <div className=" flex justify-between items-center">
              <h1 className="font-semibold">Select address</h1>
              <Button onClick={handleOpen}>Add new address</Button>
            </div>
            <div className="text-xs font-medium space-y-5">
              <p>Saved addresses</p>
              <div className="space-y-3">
                {[1, 2, 3].map((address) => (
                  <AddressCard />
                ))}
              </div>
              <div className="py-4 px-5 rounded-md border border-gray-300">
                <Button onClick={handleOpen}>
                  <p>Add new address</p>
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="space-y-3 border p-5 rounded-md border-gray-200">
              <h1 className="text-primary-color font-medium pb-2 text-center">
                Choose Payment Method
              </h1>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                className="flex justify-between pr-0"
              >
                {paymentGatewayList.map((paymentGateway) => (
                  <FormControlLabel
                    className="w-[45%] border pr-2 rounded-md flex justify-center border-gray-300"
                    key={paymentGateway.value}
                    value={paymentGateway.value}
                    onChange={handlePaymentMethodChange}
                    control={<Radio />}
                    label={
                      <img
                        src={paymentGateway.image}
                        alt={paymentGateway.label}
                        className={`${
                          paymentGateway.value !== "RAZORPAY" ? "" : "w-14"
                        } object-cover`}
                      />
                    }
                  />
                ))}
              </RadioGroup>
            </div>
            <div className="border rounded-md border-gray-200">
              <PricingCard />
              <div className="p-5">
                <Button variant="contained" sx={{ py: "11px" }} fullWidth>
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddressForm paymentMethod={paymentMethod} />
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Checkout;
