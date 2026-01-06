import React from "react";
import ProfileFieldCard from "../../../components/ProfileFieldCard";
import { Edit } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";

const Profile = () => {
  return (
    <div className="p-8 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold text-gray-700">
          Personal Details
        </h2>

        {/* Edit Button */}
        <Button
          variant="contained"
          color="primary"
          className="rounded-full"
          style={{ borderRadius: "50%", width: "3rem", height: "4rem" }}
        >
          <Edit className="w-6 h-6" />
        </Button>
      </div>

      {/* Profile + Details */}
      <div className=" items-start gap-10">
        <img
          src="https://i.imgur.com/7yUvePI.jpeg"
          alt="Seller Profile"
          className="w-40 h-40 rounded-full object-cover shadow-md"
        />
        <ProfileFieldCard keys="Seller Name" value="Ashok" />
        <Divider />
        <ProfileFieldCard keys="Seller Email" value="ashok262690@gmail.com" />
        <Divider />
        <ProfileFieldCard keys="Seller Mobile" value="9234567890" />
        <Divider />

        {/* <div className="bg-gray-50 rounded-xl shadow-sm w-full p-6 space-y-6">
          <div className="flex justify-between border-b pb-4">
            <p className="text-gray-600 font-medium">Seller Name</p>
            <p className="font-semibold text-gray-800">Ashok</p>
          </div>

          <div className="flex justify-between border-b pb-4">
            <p className="text-gray-600 font-medium">Seller Email</p>
            <p className="font-semibold text-gray-800">ashok262690@gmail.com</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-600 font-medium">Seller Mobile</p>
            <p className="font-semibold text-gray-800">9234567890</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
