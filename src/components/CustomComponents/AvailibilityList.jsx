
import { routes } from "@/Routes/routes";
import React from "react";
import { useNavigate } from "react-router";

const AvailibilityList = ({ data }) => {
    const nav = useNavigate() ;
  const order = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div>
      <div className="bg-[#fafafa] mt-6 p-8">
        <div className=" w-fit ml-auto" onClick={() => nav(routes.availability)}><p className="p-1 font-bold cursor-pointer text-sm text-blue-500"> Edit</p></div>
        {order.map((item) => {
          if (!data[item]) return null;
          const timeIntervalFrom = data[item][0].from / 60 > 12 ? "pm" : "am";
          const timeIntervalTo = data[item][0].to / 60 > 12 ? "pm" : "am";
          const fromMinutes =
            data[item][0].from % 60 < 10
              ? `0${data[item][0].from % 60}`
              : data[item][0].from % 60;
          const toMinutes =
            data[item][0].to % 60 < 10
              ? `0${data[item][0].to % 60}`
              : data[item][0].to % 60;
          const fromHours =
            Math.floor(data[item][0].from / 60) % 12 === 0
              ? 12
              : Math.floor(data[item][0].from / 60) % 12;
          const toHours =
            Math.floor(data[item][0].to / 60) % 12 === 0
              ? 12
              : Math.floor(data[item][0].to / 60) % 12;
          return (
            <div key={item}>
              <div className="flex items-center gap-4 mb-2">
                <div className="h-[30px] w-[30px] bg-[#004796] flex justify-center items-center rounded-full">
                  <p className="font-bold text-white text-sm ">{item[0]}</p>
                </div>
                <div className="text-sm font-medium">
                  {fromHours}:{fromMinutes} {timeIntervalFrom} - {toHours}:{toMinutes} {timeIntervalTo}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailibilityList;
