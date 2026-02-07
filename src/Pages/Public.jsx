import useErrorHandler from "@/hooks/ErrorHandler/useErrorHandler";
import { getBooking } from "@/services/booking.services";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineFieldTime } from "react-icons/ai";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { routes } from "@/Routes/routes";
import { emailSchema } from "@/validations/joi.validate";
import { Loader2 } from "lucide-react";
import { createMeeting } from "@/services/bookings.services";
import { MdOutlineDateRange } from "react-icons/md";
import { IoEarthOutline } from "react-icons/io5";

const Public = () => {
  const [next, setNext] = useState("booking");
  const { username, userId, scheduleId } = useParams();
  const [details, setDetails] = useState({});
  const { errorHandler } = useErrorHandler();
  const [date, setDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
  const [guest, setGuest] = useState({
    name: "",
    email: "",
    note: "",
  });

  useEffect(() => {
    if (!username || !userId || !scheduleId) {
      return;
    }

    // localStorage.removeItem("token");

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
  const bookings = details?.bookings;

  const allowedDays = availability?.map((a) => a.day);

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

    for (
      let start = dayAvailability.from;
      start + duration <= dayAvailability.to;
      start += duration
    ) {
      if((schedule?.type_of_meeting === "one")){
        const isPresent = bookings.some(b => b?.from === start)
        
        if(isPresent)
          continue;
      }
      setSlots((prev) => [...prev, minutesToTime(start)]);
    }
  }

  function timeToMinutes(time) {
    const [hours, minutes] = time.split(":");
    const [m, _] = minutes.split(" ");
    const totalMins = Number(hours) * 60 + Number(m);
    return totalMins;
  }

  async function handleCreateSchedule() {
    try {
      setLoading(true);
      if (!guest.name.trim().length) {
        toast.error("Please enter your name.");
        return;
      }
      if (!guest.email.trim().length) {
        toast.error("Please enter your email.");
        return;
      }

      const emailValidation = emailSchema.validate(guest.email);
      if (emailValidation.error) {
        toast.error(emailValidation.error.message);
        return;
      }
      if (guest.email.split("@")[1] !== "gmail.com") {
        toast.error("We accept only gmail accounts.");
        return;
      }
      const body = {
        duration: duration,
        schedule_id: scheduleId,
        host_id: userId,
        type: schedule?.type_of_meeting,
        subject: schedule?.meeting_name,
        from: timeToMinutes(selectedSlot),
        to: timeToMinutes(selectedSlot) + duration,
        date: date,
        guest: {
          name: guest.name,
          email: guest.email,
          note: guest.note,
        },
      };

      await createMeeting(body);
      toast.success("Meeting created successfully.");
      setTimeout(() => {
        navigate(routes.scheduling);
      }, 2000);
    } catch (error) {
      errorHandler(error);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-white w-220 h-140 rounded-2xl shadow-xl flex gap-4">
        <div className="w-[25%] flex flex-col justify-start items-start p-8 gap-8">
          <div className="flex flex-col mt-2">
            <p className="text-lg font-semibold opacity-45">{host?.name}</p>
            <p className="text-2xl font-bold">{schedule?.meeting_name}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <AiOutlineFieldTime className="text-2xl opacity-60" />
              <div>
                <p className="text-xs font-semibold opacity-45">
                  {schedule?.duration} min </p>
                <p className="text-xs font-semibold opacity-45">
                  {
                    date!==null && selectedSlot!==null &&
                    `${selectedSlot} - ${minutesToTime(timeToMinutes(selectedSlot) +duration)}`
                  }
                </p>  
              </div>
            </div>
            { date!==null &&
              <div className="flex gap-2 items-center">
                <MdOutlineDateRange className="text-2xl opacity-60" />
                <p className="text-xs font-semibold opacity-45">{`${weekdays[date?.getDay()]}, ${date?.getDate()} ${months[date?.getMonth()]} ${date?.getFullYear()}`}</p>
              </div>
            }
            <div className="flex gap-2 items-center">
              <IoEarthOutline className="text-2xl opacity-60" />
              <p className="text-xs font-semibold opacity-45">Indian Standard Time (IST)</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1A1A1A] w-0.5 h-full opacity-25"></div>
        {/* component  */}
        {next === "booking" ? (
          <div className="flex">
            <div className="flex flex-col items-center gap-8 p-6 mt-4">
              <p className="text-2xl font-bold opacity-75">
                Select a Date & Time
              </p>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                  if (!selectedDate) return;
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const picked = new Date(selectedDate);
                  picked.setHours(0, 0, 0, 0);

                  const weekdayName = weekdays[picked.getDay()];
                  const isAvailable = allowedDays?.includes(weekdayName);

                  if(picked < today){
                    toast.info("Please select valid days!");
                    return;
                  }

                  if (!isAvailable) {
                    toast.info("Please select available days!");
                    return;
                  }
                  setDate(selectedDate);
                  generateSlots(selectedDate);
                }}
                captionLayout="dropdown"
                className="rounded-2xl border w-full p-4"
                modifiers={{
                  available: (day) =>
                    allowedDays?.includes(weekdays[day.getDay()]),
                  unavailable: (day) =>
                    !allowedDays?.includes(weekdays[day.getDay()]),
                }}
                modifiersClassNames={{
                  available:
                    "text-white font-extrabold bg-[#1A1A1A]/40 rounded-2xl",
                  today: "border rounded-2xl font-semibold",
                  unavailable: "text-black font-extrabold rounded-2xl",
                }}
                classNames={{
                  day: "h-7 w-7 m-1 flex items-center justify-center rounded-2xl",
                }}
              />
            </div>
            <div className={`p-6 flex flex-col gap-10 items-center overflow-x-hidden mt-4 ${date===null ? "overflow-hidden" : "overflow-scroll"}`}>
              {
                date!== null && 
                <p className="font-bold opacity-75">{`${weekdays[date?.getDay()]}, ${date?.getDate()} ${months[date?.getMonth()]} ${date?.getFullYear()}`}</p>
              }
              <div className="flex flex-col gap-3 w-full">
                {slots.map((slot) => (
                  <div key={slot} className="flex w-60 gap-1">
                    <p
                      className="border border-[#1A1A1A]/50 rounded text-[#1A1A1A] font-medium flex items-center justify-center py-1 cursor-pointer flex-1"
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot}
                    </p>
                    {selectedSlot === slot && (
                      <button
                        className="bg-[#1A1A1A] px-4 py-2 rounded text-white font-semibold flex-1 hover:bg-[#1A1A1A]/80 cursor-pointer"
                        onClick={() => setNext("confim")}
                      >
                        Next
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 p-12">
            <p className="font-bold text-2xl">Enter Details</p>
            <div className="mt-3">
              {" "}
              <p className="mb-2 font-medium text-sm">Name *</p>
              <Input
                type="text"
                value={guest.name}
                onChange={(e) =>
                  setGuest((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="mt-3">
              <p className="mb-2 font-medium text-sm">Email *</p>
              <Input
                type="email"
                value={guest.email}
                onChange={(e) =>
                  setGuest((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div className="mt-3">
              <p className="mb-2 font-medium text-sm">Note</p>
              <Textarea
                value={guest.note}
                onChange={(e) =>
                  setGuest((prev) => ({ ...prev, note: e.target.value }))
                }
              />
            </div>

            <div className="mt-12">
              <Button
                className="rounded-full bg-[#006bff] font-bold cursor-pointer"
                onClick={handleCreateSchedule}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Schedule Event"
                )}
              </Button>
            </div>
          </div>
        )}
        {/* end component */}
      </div>
    </div>
  );
};

export default Public;
