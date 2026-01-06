export const UploadToCoudinary = async (pics: any) => {
  const cloud_name = "dyv8n0zmy";
  const update_preset = "ZoshEcommerce";
  if (pics) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", update_preset);
    data.append("cloud_name", cloud_name);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dyv8n0zmy/image/upload",
      {
        method: "post",
        body: data,
      }
    );
    const fileData = await res.json();
    return fileData.url;
  } else {
    console.log("error : pics not found");
  }
};
