import { ChevronDown, ChevronUp, Clock } from "lucide-react";
import React, { useState } from "react";

const ScheduleDrawerSection = ({ children, title, subTitle }) => {
  const [select, setSelect] = useState(false);
  return (
    <div className="px-4">
      {" "}
      <div className="pl-8" onClick={() => setSelect((prev) => !prev)}>
        <div className="flex items-center justify-between">
          <p className="font-bold">{title}</p>
          { !select ? <ChevronDown /> : <ChevronUp/>}
        </div>
        <div className="flex items-center gap-1">
          {!select && title === "Duration" && <Clock size={15} />}
          <p className="text-sm text-gray-500 font-bold m-0">
            {!select && subTitle}
          </p>
        </div>
      </div>
      { select && children } 
    </div>
  );
};

export default ScheduleDrawerSection;
