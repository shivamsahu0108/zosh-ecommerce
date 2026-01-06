import ReviewCard from "./ReviewCard";
import { Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorprimary - color}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
    ...theme.applyStyles("dark", {
      backgroundColor: "#308fe8",
    }),
  },
}));
const Review = () => {
  return (
    <div className="p-5 lg-px-20 flex flex-col lg:flex-row gap-20">
      <section className="w-full md:w-1/2 lg:w-[30%] space-y-2">
        <img
          src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTdjshOHCwTJq3T2OdkEg1GbxuytKq1SovfqwPOHUK0YsTDzLmbeyYaHYSAptKVjr-4OK-SHT9m7yVuEOYOaOLx4Rzm5k817uDwRbPAVJs"
          alt=""
        />
        <div>
          <div>
            <p className="font-bold text-xl">Raam clothing</p>
            <p className="text-lg text-gray-600">Men's white shirt</p>
          </div>
          <div className="">
            <div className="price flex items-center gap-3 mt-5 text-2xl">
              <span className="font-sans text-gray-800">&#8377; 400</span>
              <span className="line-through text-gray-400">&#8377; 999</span>
              <span className="text-primary-color font-semibold">60%</span>
            </div>
          </div>
        </div>
      </section>

      <section className="5">
        <section className="w-full md:w-1/2 lg:w-[30%] space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold">4.5</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < 4 ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-500">(5 reviews)</span>
          </div>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <span className="w-4">{star}</span>
                <svg
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div className="w-full">
                  <BorderLinearProgress
                    variant="determinate"
                    value={star === 5 ? 70 : star === 4 ? 20 : 10}
                  />
                </div>
                <span className="w-8 text-sm text-gray-500">
                  {star === 5 ? "70%" : star === 4 ? "20%" : "10%"}
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className="space-y-">
          {[1, 2, 3, 4, 5].map((review) => (
            <div className="space-y-3">
              <ReviewCard key={review} />
              <Divider />
            </div>
          ))}
        </section>
      </section>
    </div>
  );
};

export default Review;
