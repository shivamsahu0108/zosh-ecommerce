import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import React, { useState, useEffect } from "react";
import { colors } from "../../../data/filter/color";
import { price } from "../../../data/filter/price";
import { useSearchParams } from "react-router-dom";
import { discounts } from "../../../data/filter/discount";

const FilterSection = () => {
  const [expandColor, setExpandColor] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // State to track which radio buttons are selected
  const [selectedFilters, setSelectedFilters] = useState({
    color: "",
    price: "",
    discount: "",
  });

  // Update selected filters when search params change
  useEffect(() => {
    setSelectedFilters({
      color: searchParams.get("color") || "",
      price: searchParams.get("price") || "",
      discount: searchParams.get("discount") || "",
    });
  }, [searchParams]);

  const updateFilterParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSelectedFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    // Reset selected filters state
    setSelectedFilters({
      color: "",
      price: "",
      discount: "",
    });

    // Clear all search parameters
    searchParams.delete("color");
    searchParams.delete("price");
    searchParams.delete("discount");

    setSearchParams(searchParams);
  };

  return (
    <div className="-z-50 space-y-5 bg-white">
      <div className="flex items-center justify-between h-10 px-9 lg:border-r">
        <p className="text-lg font-semibold">Filter</p>
        <Button
          onClick={clearAllFilters}
          size="small"
          className="text-teal-600 cursor-pointer font-semibold"
        >
          Clear All
        </Button>
      </div>
      <Divider />
      <div className="px-9 space-y-6">
        <section className="pt-5">
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: teal[500],
                pb: "14px",
              }}
              className="text-2xl font-semibold"
              id="color"
            >
              Color
            </FormLabel>
            <RadioGroup
              aria-labelledby="color"
              value={selectedFilters.color}
              name="color"
              onChange={updateFilterParams}
            >
              {colors.slice(0, expandColor ? colors.length : 5).map((color) => (
                <FormControlLabel
                  key={color.name}
                  value={color.name}
                  control={<Radio />}
                  label={
                    <div className="flex items-center gap-3">
                      <p>{color.name}</p>
                      <p
                        style={{ backgroundColor: color.value }}
                        className={`h-5 w-5 rounded-full ${
                          color.name === "White" ? "border border-gray-300" : ""
                        }`}
                      ></p>
                    </div>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
          <div
            onClick={() => {
              setExpandColor(!expandColor);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-primary-color cursor-pointer hover:text-teal-900 flex items-center"
          >
            {expandColor ? "hide" : `+${colors.length - 5} more`}
          </div>
        </section>

        <Divider />
        <section className="pt-5">
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: teal[600],
                pb: "14px",
              }}
              className="text-2xl font-semibold"
              id="price"
            >
              Price
            </FormLabel>
            <RadioGroup
              aria-labelledby="price"
              value={selectedFilters.price}
              name="price"
              onChange={updateFilterParams}
            >
              {price.map((item) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>

        <Divider />
        <section className="pt-5">
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: teal[600],
                pb: "14px",
              }}
              className="text-2xl font-semibold"
              id="discount"
            >
              Discount
            </FormLabel>
            <RadioGroup
              aria-labelledby="discount"
              value={selectedFilters.discount}
              name="discount"
              onChange={updateFilterParams}
            >
              {discounts.map((item) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>
      </div>
    </div>
  );
};

export default FilterSection;
