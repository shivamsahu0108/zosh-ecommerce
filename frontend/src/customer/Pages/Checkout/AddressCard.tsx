import { Radio } from "@mui/material";
import React from "react";

const AddressCard = () => {
  const handleChange = (event: any) => {
    console.log(event);
  };

  return (
    <div className="p-5 border rounded-md flex border-gray-300">
      <div>
        <Radio
          checked={true}
          onChange={handleChange}
          value={""}
          name="radio-button"
        />
      </div>
      <div className="space-y-3 pt-3">
        <h1 className="">Zosh</h1>
        <p className="w-[320px]">
          MIG-526, Dhanwantri Nagar, Phase 2, Gachibowli, Hyderabad, Telangana
          241661
        </p>
        <p>
          <strong>Mobile:</strong> 9876543210
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
