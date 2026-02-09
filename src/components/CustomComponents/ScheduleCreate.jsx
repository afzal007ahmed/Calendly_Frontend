import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, ChevronUpIcon, Plus } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "../ui/popover";
import React, { useState } from "react";
import ScheduleDrawer from "./ScheduleDrawer";

const ScheduleCreate = () => {
  const [select, setSelect] = useState(false);
  const [open, setOpen] = useState({
    one: false,
    group: false,
  });
  return (
    <div className="text-end">
      <Popover open={select} onOpenChange={(value) => setSelect(value)}>
        <PopoverTrigger asChild>
          <Button className="rounded-[20px] font-bold bg-[#006bff] cursor-pointer">
            <Plus />
            Create {select ? <ChevronUpIcon /> : <ChevronDown />}{" "}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 cursor-pointer">
          <div
            className="hover:bg-gray-200 p-3"
            onClick={() => setOpen((prev) => ({ ...prev, one: !prev.one }))}
          >
            <p className="font-bold text-[#006bff] text-sm">one-to-one</p>
            <p className="flex text-xs items-center gap-1">
              <span>1 host</span> <ArrowRight size={12} />{" "}
              <span>1 invitee</span>
            </p>
          </div>
          {open.one && (
            <ScheduleDrawer type="one" open={open.one} setOpen={setOpen} />
          )}
          <div
            className="hover:bg-gray-200 p-3 w-full"
            onClick={() => setOpen((prev) => ({ ...prev, group: !prev.group }))}
          >
            <p className="font-bold text-[#006bff] text-sm">Group</p>
            <p className="flex text-xs items-center gap-1">
              <span>1 host</span> <ArrowRight size={12} />{" "}
              <span>multiple invitees</span>
            </p>
          </div>
          {open.group && (
            <ScheduleDrawer type="group" open={open.group} setOpen={setOpen} />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ScheduleCreate;
