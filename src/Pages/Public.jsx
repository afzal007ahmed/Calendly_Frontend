import useErrorHandler from "@/hooks/ErrorHandler/useErrorHandler";
import { getBooking } from "@/services/booking.services";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineFieldTime } from "react-icons/ai";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";

const Public = () => {
  const { username, userId, scheduleId } = useParams();
  const [details, setDetails] = useState({});
  const { errorHandler } = useErrorHandler();
  const [date, setDate] = useState(new Date());
  // const [selected, setSelected] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    if (!username || !userId || !scheduleId) {
      return;
    }

    localStorage.removeItem("token");

    async function getDetails() {
      try {
        const response = await getBooking(username, userId, scheduleId);
        setDetails(response.data);
      } catch (error) {
        errorHandler(error);
      }
    }

    getDetails();
  }, [username, userId, scheduleId]);

  const host = details?.host;
  const schedule = details?.schedule;
  const availability = details?.availability;
  // const bookings = details?.bookings;
  // const today = new Date().getDate();

  const minutesToTime = (minutes) => {
    let hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const period = hrs >= 12 ? "PM" : "AM";
    hrs = hrs % 12 || 12;

    return `${hrs}:${String(mins).padStart(2, "0")} ${period}`;
  };

  const duration = schedule?.duration;

  function generateSlots(selectedDate) {
    const dayAvailability = availability?.find(
      (a) => weekdays.indexOf(a.day) === selectedDate.getDay(),
    );
    if (!dayAvailability?.from || !dayAvailability?.to) {
      setSlots([]);
      return;
    }
    setSlots([]);

    for (let start=dayAvailability.from;start+duration<=dayAvailability.to;start+=duration) {
      setSlots((prev) => [...prev, minutesToTime(start)]);
    }
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-white w-240 h-140 rounded-2xl shadow-xl flex gap-4">
        <div className="w-[25%] flex flex-col justify-start items-start p-8 pr-0 gap-8">
          <div className="flex flex-col mt-2">
            <p className="text-lg font-semibold opacity-45">{host?.name}</p>
            <p className="text-2xl font-bold">{schedule?.meeting_name}</p>
          </div>
          <div className="flex gap-2 items-center">
            <AiOutlineFieldTime className="text-2xl opacity-60" />
            <p className="text-sm font-semibold opacity-45">{schedule?.duration} min</p>
          </div>
        </div>
        <div className="bg-[#1A1A1A] w-0.5 h-full opacity-25"></div>
        <div className="flex flex-col items-center gap-8 p-6">
          <p className="text-2xl font-bold opacity-75">Select a Date & Time</p>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              if (!selectedDate) return;
              const todayDate = new Date();
              todayDate.setHours(0, 0, 0, 0);
              const picked = new Date(selectedDate);
              picked.setHours(0, 0, 0, 0);

              if (picked >= todayDate) {
                setDate(selectedDate);
                generateSlots(selectedDate);
              } else {
                toast.info("Select today or later dates!");
              }
            }}
            className="rounded-lg border w-full p-4"
            captionLayout="dropdown"
          />
        </div>
        <div className="overflow-scroll p-6 flex flex-col gap-10 items-center overflow-x-hidden">
          <p className="font-bold opacity-75">{`${weekdays[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}</p>
          <div className="flex flex-col gap-3">
            {slots.map((slot) => (
              <div key={slot} className="flex w-60 gap-1">
                <p
                  className="border border-[#1A1A1A]/50 rounded text-[#1A1A1A] font-medium flex items-center justify-center py-1 cursor-pointer flex-1"
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </p>
                {selectedSlot === slot && (
                  <button className="bg-[#1A1A1A] px-4 py-2 rounded text-white font-semibold flex-1"
                  >
                    Next
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Public;
