import React, { useContext, useEffect, useMemo, useState } from "react";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
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
import { Loader2, Plus } from "lucide-react";
import ScheduleDrawerSection from "./ScheduleDrawerSection";
import AvailibilityList from "./AvailibilityList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createSchedule, getSchedules } from "@/services/schedule.services";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSchedules,
  scheduleError,
  scheduleSuccess,
} from "@/redux/scheduleSlice";
import {
  availabilityError,
  availabilitySuccess,
  fetchAvailabilityState,
} from "@/redux/availabilitySlice";
const ScheduleDrawer = ({ type, open, setOpen }) => {
  const availability = useSelector((state) => state.availabilityReducer);
  const { user } = useContext(AppContext);
  const dispatch = useDispatch();
  const [select, setSelect] = useState(false);
  const [loading, setLoading] = useState(false);
  const { errorHandler } = useErrorHandler();

  const [details, setDetails] = useState({
    title: "New Meeting",
    duration: 15,
    duration_custom: false,
    availability: availability.data,
    limit: type === "group" ? 2 : 0,
    type: type,
    host: user.data.name,
    duration_unit: "min",
  });

  const availSub = useMemo(() => {
    if (availability.loading) return "Loading...";
    if (!availability.data) return "";

    const order = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let sub = "";

    order.forEach((day) => {
      const slot = availability.data?.[day]?.[0];
      if (!slot) return;

      const fromH = Math.floor(slot.from / 60) % 12 || 12;
      const fromM = String(slot.from % 60).padStart(2, "0");
      const fromAMPM = slot.from / 60 >= 12 ? "PM" : "AM";

      const toH = Math.floor(slot.to / 60) % 12 || 12;
      const toM = String(slot.to % 60).padStart(2, "0");
      const toAMPM = slot.to / 60 >= 12 ? "PM" : "AM";

      sub += `${day} ${fromH}:${fromM}${fromAMPM} - ${toH}:${toM}${toAMPM} `;
    });

    return sub;
  }, [availability.data, availability.loading]);

  function reset() {
    setDetails({
      title: "New Meeting",
      duration: 15,
      duration_custom: false,
      availability: availability.data,
      limit: type == "group" ? 2 : null,
      host: user.data.name,
      duration_unit: "min",
      type: type,
    });
  }

  async function addSchedule() {
    try {
      setLoading(true);
      if (
        details.duration <= 0 ||
        (details.duration_unit === "hrs" && details.duration > 12) ||
        details.duration > 720
      ) {
        toast.error("Please provide a valid duration.");
        setLoading(false);
        return;
      }
      if (details.limit > 9999) {
        toast.error("Please provide a valid limit.");
        setLoading(false);
        return;
      }
      await createSchedule(details);
      dispatch(fetchSchedules());
      const response = await getSchedules();
      dispatch(scheduleSuccess(response));
      toast.success("Schedule created.");
      setLoading(false);
      setOpen((prev) => ({ ...prev, [type]: !prev[type] }));
    } catch (error) {
      dispatch(scheduleError());
      setLoading(false);
      errorHandler(error);
    }
  }

  async function fetchAvailability() {
    try {
      dispatch(fetchAvailabilityState());
      const data = await getAvailability();
      dispatch(availabilitySuccess(data));
    } catch (error) {
      errorHandler(error);
      dispatch(availabilityError());
    }
  }

  useEffect(() => {
    fetchAvailability();
  }, []);
  return (
    <Sheet
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          reset();
        }
        setOpen((prev) => ({ ...prev, [type]: value }));
      }}
    >
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
              {availability.loading && <Loader2 className="animate-spin" />}

              {availability.data && !availability.loading && (
                <AvailibilityList data={availability.data} />
              )}
            </ScheduleDrawerSection>

            {type === "group" && (
              <>
                <hr />
                <ScheduleDrawerSection
                  title="Limit"
                  subTitle="Select limit for meeting."
                >
                  <Input
                    value={details.limit?.toString()}
                    onChange={(e) =>
                      setDetails((prev) => ({
                        ...prev,
                        limit: Number(e.target.value),
                      }))
                    }
                    className="ml-2"
                  />
                </ScheduleDrawerSection>
              </>
            )}

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
          <div className="text-end p-2">
            <Button
              className=" rounded-full bg-[#006bff] font-bold"
              onClick={addSchedule}
            >
              {" "}
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Plus />
                  <p>Create</p>
                </>
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ScheduleDrawer;
