import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { AppContext } from "@/context/AppContext";
import { getAvailability } from "@/services/availability.services";
import useErrorHandler from "@/hooks/ErrorHandler/useErrorHandler";
import { ChevronDown, Clock, Plus } from "lucide-react";
import ScheduleDrawerSection from "./ScheduleDrawerSection";
import AvailibilityList from "./AvailibilityList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
const ScheduleDrawer = ({ children, type }) => {
  const { user } = useContext(AppContext);
  const [select, setSelect] = useState(false);
  const { errorHandler } = useErrorHandler();
  const [details, setDetails] = useState({
    title: "New Meeting",
    duration: 15,
    duration_custom: false,
    availability: null,
    limit: type == "group" ? 2 : null,
    host: user.data.name,
    duration_unit: "min",
  });

  const availSub = useMemo(() => {
    let sub = "";
    const order = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    if (details.availability) {
      order.map((item) => {
        if (details.availability?.[item]?.[0]) {
          const timeIntervalFrom =
            details.availability[item][0].from / 60 > 12 ? "PM" : "AM";
          const timeIntervalTo =
            details.availability[item][0].to / 60 > 12 ? "PM" : "AM";
          const fromMinutes =
            details.availability[item][0].from % 60 < 10
              ? `0${details.availability[item][0].from % 60}`
              : details.availability[item][0].from % 60;
          const toMinutes =
            details.availability[item][0].to % 60 < 10
              ? `0${details.availability[item][0].to % 60}`
              : details.availability[item][0].to % 60;
          const fromHours =
            Math.floor(details.availability[item][0].from / 60) % 12 === 0
              ? 12
              : Math.floor(details.availability[item][0].from / 60) % 12;
          const toHours =
            Math.floor(details.availability[item][0].to / 60) % 12 === 0
              ? 12
              : Math.floor(details.availability[item][0].to / 60) % 12;
          sub +=
            item +
            ` ${fromHours}:${fromMinutes}${timeIntervalFrom} -${toHours}:${toMinutes}${timeIntervalTo} `;
        }
      });
    }
    return sub;
  }, [details.availability]);

  function reset() {
    setDetails({
      title: "New Meeting",
      duration: 15,
      duration_custom: false,
      availability: null,
      limit: type == "group" ? 2 : null,
      host: user.data.name,
      duration_unit: "min",
    });
  }

  async function addSchedule() {
    try {
        if( details.duration <= 0 || (details.duration_unit === "hrs" && details.duration > 12) || ( details.duration > 720) ){
            toast.error("Please provide a valid duration.");
            return ;
        }
       

    } catch (error) {
        
    }
  }

  async function fetchAvailability() {
    try {
      const data = await getAvailability();
      setDetails((prev) => ({ ...prev, availability: data.data }));
    } catch (error) {
      errorHandler(error);
    }
  }

  useEffect(() => {
    fetchAvailability();
  }, []);

  return (
    <Sheet
      onOpenChange={(open) => {
        if (!open) {
          reset();
        }
      }}
    >
      <SheetTrigger className="w-full text-start">{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader className="gap-0">
          <p className="text-sm font-bold text-gray-500">Event type</p>
          {!select ? (
            <p
              className="text-2xl font-bold"
              onClick={() => setSelect((prev) => !prev)}
            >
              {" "}
              {details.title}
            </p>
          ) : (
            <Input
              placeholder="Enter event title."
              value={details.title}
              onChange={(e) => {
                setDetails((prev) => ({ ...prev, title: e.target.value }));
              }}
              className="font-bold"
              autoFocus={true}
              onBlur={() => {
                setSelect(false);
              }}
            />
          )}
        </SheetHeader>
        <hr />
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-3">
            <ScheduleDrawerSection
              title="Duration"
              subTitle={`${details.duration} ${details.duration_unit}`}
            >
              <Select
                defaultValue={details.duration.toString()}
                onValueChange={(value) => {
                  if (value === "custom") {
                    setDetails((prev) => ({
                      ...prev,
                      duration_custom: true,
                      duration: 0,
                    }));
                  } else {
                    setDetails((prev) => ({
                      ...prev,
                      duration: parseInt(value),
                      duration_custom: false,
                    }));
                  }
                }}
              >
                <SelectTrigger className="w-full m-2 mt-3 ">
                  <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="15">15 min</SelectItem>
                    <SelectItem value="30">30 min</SelectItem>
                    <SelectItem value="45">45 min</SelectItem>
                    <SelectItem value="60">60 min</SelectItem>
                    <SelectItem value="custom"> custom</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {details.duration_custom && (
                <div className="flex gap-2">
                  <Input
                    value={details.duration}
                    className="ml-2"
                    autoFocus={true}
                    type="number"
                    onChange={(e) => {
                      setDetails((prev) => ({
                        ...prev,
                        duration: parseInt(e.target.value),
                      }));
                    }}
                  />
                  <Select
                    defaultValue={details.duration_unit}
                    onValueChange={(value) =>
                      setDetails((prev) => ({ ...prev, duration_unit: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Enter time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="min">min</SelectItem>
                      <SelectItem value="hrs">hrs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </ScheduleDrawerSection>
            <hr />
            <ScheduleDrawerSection title="Availability" subTitle={availSub}>
              {details.availability && (
                <AvailibilityList data={details.availability} />
              )}
            </ScheduleDrawerSection>
            <hr />
            <ScheduleDrawerSection title="Host" subTitle={user.data.name}>
              <div className="pl-8 mt-4 flex gap-2 font-bold text-sm items-center">
                <Avatar className="h-[40px] w-[40px]">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="text-xs">
                  <p className="text-sm">{user.data.name}</p>
                  <p>{user.data.email}</p>
                </div>
              </div>
            </ScheduleDrawerSection>
            <hr />
          </div>
          <div className="text-end">
            <Button className=" rounded-full bg-[#006bff] font-bold" onClick={addSchedule}>
              <Plus />
              <p>Create</p>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ScheduleDrawer;
