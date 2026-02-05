import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUpIcon, Plus } from "lucide-react";
import React, { useState } from "react";

const ScheduleCreate = () => {
  const [select, setSelect] = useState(false);
  return (
    <div className="text-end">
      <Button
        className="rounded-[20px] font-bold bg-[#006bff] cursor-pointer"
        onClick={() => setSelect((prev) => !prev)}
      >
        <Plus />
        Create {select ? <ChevronUpIcon /> : <ChevronDown />}{" "}
      </Button>
    </div>
  );
};

export default ScheduleCreate;
