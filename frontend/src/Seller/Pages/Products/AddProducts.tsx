import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useFormik } from "formik";
import { UploadToCoudinary } from "../../../util/UploadToCoudinary";
import { Close } from "@mui/icons-material";
import { colors } from "./../../../data/filter/color";
import { mainCategory } from "./../../../data/category/mainCategory";
import { menLevelTwo } from "./../../../data/category/level two/menLevelTwo";
import { furnitureLevelTwo } from "./../../../data/category/level two/furnitureLevelTwo";
import { womenLevelTwo } from "./../../../data/category/level two/womenLevelTwo";
import { electronicsLevelTwo } from "./../../../data/category/level two/electronicsLevelTwo";
import { menLevelThree } from "./../../../data/category/level three/menLevelThree";
import { womenLevelThree } from "./../../../data/category/level three/womenLevelThree";
import { furnitureLevelThree } from "./../../../data/category/level three/furnitureLevelThree";
import { electronicsLevelThree } from "./../../../data/category/level three/electronicsLevelThree";
import { useAppDispatch } from "../../../State/Store";
import { createProduct } from "../../../State/seller/SellerProductSlice";
import { size } from "../../../data/filter/size";
const categoryTwo: { [key: string]: any } = {
  men: menLevelTwo,
  women: womenLevelTwo,
  kids: [],
  home_furniture: furnitureLevelTwo,
  beauty: [],
  electronics: electronicsLevelTwo,
};
const categoryThree: { [key: string]: any } = {
  men: menLevelThree,
  women: womenLevelThree,
  kids: [],
  home_furniture: furnitureLevelThree,
  beauty: [],
  electronics: electronicsLevelThree,
};
const AddProducts = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      quantity: "",
      color: "",
      images: [],
      category: "",
      category2: "",
      category3: "",
      sizes: "",
    },
    onSubmit: (values) => {
      dispatch(
        createProduct({ request: values, jwt: localStorage.getItem("jwt") })
      );
      console.log(values);
    },
  });
  console.log("AddProducts", categoryTwo[formik.values.category]);
  console.log("AddProducts", categoryThree);
  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await UploadToCoudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };
  const handleRemoveImage = (index: number) => {
    const updateImage = [...formik.values.images];
    updateImage.splice(index, 1);
    formik.setFieldValue("images", updateImage);
  };
  const childCategory = (category: any, parentCategoryId: any) => {
    return category.filter(
      (child: any) => child.parentCategoryId === parentCategoryId
    );
  };
  return (
    <div>
      <form className="space-y-4 p-4" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }} className="flex flex-wrap gap-5">
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="fileInput" className="relative">
              <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                <AddPhotoAlternateIcon className="text-gray-600" />
              </span>
              {uploadImage && (
                <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                  <CircularProgress />
                </div>
              )}
            </label>
            <div className="flex flex-wrap gap-2">
              {formik.values.images.map((image, index) => (
                <div className="relative">
                  <img
                    className="w-24 h-24 object-cover"
                    src={image}
                    alt={`ProductImage ${index + 1}`}
                  />
                  <IconButton
                    onClick={() => {
                      handleRemoveImage(index);
                    }}
                    className=""
                    size="small"
                    color="error"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      outline: "none",
                    }}
                  >
                    <Close />
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Title"
              name="title"
              fullWidth
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              id="description"
              label="Description"
              name="description"
              multiline
              fullWidth
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <TextField
              label="MRP Price"
              name="mrpPrice"
              fullWidth
              value={formik.values.mrpPrice}
              onChange={formik.handleChange}
              error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)}
              helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <TextField
              label="Selling Price"
              name="sellingPrice"
              fullWidth
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
              error={
                formik.touched.sellingPrice &&
                Boolean(formik.errors.sellingPrice)
              }
              helperText={
                formik.touched.sellingPrice && formik.errors.sellingPrice
              }
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <FormControl
              fullWidth
              error={formik.touched.color && Boolean(formik.errors.color)}
              required
            >
              <InputLabel id="color-label">Color</InputLabel>
              <Select
                labelId="color-label"
                id="color"
                name="color"
                label="Color"
                value={formik.values.color}
                onChange={formik.handleChange}
              >
                <MenuItem value="">
                  <em>Select Color</em>
                </MenuItem>
                {colors.map((color) => (
                  <MenuItem key={color.name} value={color.name}>
                    <div className="flex gap-3">
                      <span
                        style={{ backgroundColor: color.name }}
                        className={`h-5 w-5 rounded-full ${
                          color.name === "White" ? "border" : ""
                        }`}
                      ></span>
                      <p>{color.name}</p>
                    </div>
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.color && formik.errors.color && (
                <FormHelperText>{formik.errors.color}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <FormControl
              fullWidth
              error={formik.touched.sizes && Boolean(formik.errors.sizes)}
              required
            >
              <InputLabel id="sizes-label">Sizes</InputLabel>
              <Select
                labelId="sizes-label"
                id="sizes"
                name="sizes"
                label="Sizes"
                value={formik.values.sizes}
                onChange={formik.handleChange}
              >
                <MenuItem value="">
                  <em>Select Size</em>
                </MenuItem>
                {size.map((color) => (
                  <MenuItem key={color.name} value={color.name}>
                    <div className="flex gap-3">
                      <span
                        style={{ backgroundColor: color.name }}
                        className={`h-5 w-5 rounded-full ${
                          color.name === "White" ? "border" : ""
                        }`}
                      ></span>
                      <p>{color.name}</p>
                    </div>
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.sizes && formik.errors.sizes && (
                <FormHelperText>{formik.errors.sizes}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 4 }}>
            <FormControl
              fullWidth
              error={formik.touched.category && Boolean(formik.errors.category)}
              required
            >
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                label="Category"
                value={formik.values.category}
                onChange={formik.handleChange}
              >
                <MenuItem value="">
                  <em>Select Category</em>
                </MenuItem>
                {mainCategory.map((category) => {
                  return (
                    <MenuItem key={category.name} value={category.categoryId}>
                      <p>{category.name}</p>
                    </MenuItem>
                  );
                })}
              </Select>
              {formik.touched.category && formik.errors.category && (
                <FormHelperText>{formik.errors.category}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 4 }}>
            <FormControl
              fullWidth
              error={
                formik.touched.category2 && Boolean(formik.errors.category2)
              }
              required
            >
              <InputLabel id="category-label">Second Category</InputLabel>
              <Select
                labelId="category2-label"
                id="category2"
                name="category2"
                label="Second Category"
                value={formik.values.category2}
                onChange={formik.handleChange}
              >
                {formik.values.category ? (
                  categoryTwo[formik.values.category]?.length > 0 ? (
                    categoryTwo[formik.values.category].map((subCat) => (
                      <MenuItem
                        key={subCat.categoryId}
                        value={subCat.categoryId}
                      >
                        {subCat.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>
                      <em>No subcategories available</em>
                    </MenuItem>
                  )
                ) : (
                  <MenuItem disabled>
                    <em>Select first Category</em>
                  </MenuItem>
                )}
              </Select>
              {formik.touched.category2 && formik.errors.category2 && (
                <FormHelperText>{formik.errors.category2}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 4 }}>
            <FormControl
              fullWidth
              error={
                formik.touched.category3 && Boolean(formik.errors.category3)
              }
              required
            >
              <InputLabel id="category-label">Third Category</InputLabel>
              <Select
                labelId="category3-label"
                id="category3"
                name="category3"
                label="Third Category"
                value={formik.values.category3}
                onChange={formik.handleChange}
              >
                {formik.values.category2 ? (
                  childCategory(
                    categoryThree?.[formik.values.category],
                    formik.values.category2
                  )?.length ? (
                    childCategory(
                      categoryThree?.[formik.values.category],
                      formik.values.category2
                    ).map((item: any) => (
                      <MenuItem key={item.categoryId} value={item.categoryId}>
                        <p>{item.name}</p>
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>
                      <em>No categories found</em>
                    </MenuItem>
                  )
                ) : (
                  <MenuItem disabled>
                    <em>Select previous category</em>
                  </MenuItem>
                )}
              </Select>
              {formik.touched.category3 && formik.errors.category3 && (
                <FormHelperText>{formik.errors.category3}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ p: "14px" }}
              color="primary"
            >
              {false ? (
                <CircularProgress
                  size="small"
                  sx={{ width: "27px", height: "27px" }}
                />
              ) : (
                "Add Product"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddProducts;
