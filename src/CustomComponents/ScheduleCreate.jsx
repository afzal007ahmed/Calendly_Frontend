import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, ChevronUpIcon, Plus } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "../components/ui/popover";
import React, { useState } from "react";
import ScheduleDrawer from "./ScheduleDrawer";

const ScheduleCreate = () => {
  const [select, setSelect] = useState(false);
  return (
    <div className="text-end">
      <Popover open={select} onOpenChange={(value) => setSelect(value)}>
        <PopoverTrigger asChild>
          <Button
            className="rounded-[20px] font-bold bg-[#006bff] cursor-pointer"
          >
            <Plus />
            Create {select ? <ChevronUpIcon /> : <ChevronDown />}{" "}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 cursor-pointer">
          <ScheduleDrawer type="one">
            <div className="hover:bg-gray-200 p-3">
              <p className="font-bold text-[#006bff] text-sm">one-to-one</p>
              <p className="flex text-xs items-center gap-1">
                <span>1 host</span> <ArrowRight size={12} /> <span>1 invitee</span>
              </p>
            </div>
          </ScheduleDrawer>
          <ScheduleDrawer type="group">
            <div className="hover:bg-gray-200 p-3 w-full">
              <p className="font-bold text-[#006bff] text-sm">Group</p>
              <p className="flex text-xs items-center gap-1">
                <span>1 host</span> <ArrowRight size={12} /> <span>multiple invitees</span>
              </p>
            </div>
          </ScheduleDrawer>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ScheduleCreate;
