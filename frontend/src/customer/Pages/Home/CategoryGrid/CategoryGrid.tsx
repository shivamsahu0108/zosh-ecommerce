import React from "react";

const CategoryGrid = () => {
  return (
    <div className="grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20">
      <div className="col-span-3 row-span-12 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src="https://assets-jiocdn.ajio.com/medias/sys_master/root/20240801/i9jc/66aab96d1d763220fa5261d6/-473Wx593H-700158156-purple-MODEL.jpg"
          alt=""
        />
      </div>
      <div className="col-span-2 row-span-6 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src="https://assets-jiocdn.ajio.com/medias/sys_master/root/20240906/OPaj/66db2cd91d763220facd2de2/-473Wx593H-700308376-black-MODEL6.jpg"
          alt=""
        />
      </div>
      <div className="col-span-4 row-span-6 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src="https://pbs.twimg.com/media/Dksu_hiX0AA3yIG.jpg"
          alt=""
        />
      </div>
      <div className="col-span-3 row-span-12 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src="https://media.istockphoto.com/id/1130450215/photo/full-length-portrait-of-handsome-smiling-young-man.jpg?s=612x612&w=0&k=20&c=I_wjJdwchejrYyGXYd5lUN_LeeeRTcwhoWTmHgni9Dc="
          alt=""
        />
      </div>
      <div className="col-span-4 row-span-6 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src="https://etimg.etb2bimg.com/photo/105756564.cms"
          alt=""
        />
      </div>
      <div className="col-span-2 row-span-6 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src="https://fausto.in/cdn/shop/files/FSTKI-496GOLD_MoodShot_1_400x.jpg?v=1716972942"
          alt=""
        />
      </div>
    </div>
  );
};

export default CategoryGrid;
