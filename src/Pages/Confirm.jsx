import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { emailSchema } from "@/validations/joi.validate";
import { Calendar, Camera, Clock, Globe } from "lucide-react";
import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { toast } from "sonner";

const Confirm = () => {
  const days = [
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

  const [searchParams] = useSearchParams();
  const month = searchParams.get("month");
  const date = searchParams.get("date");
  const subject = searchParams.get("subject");
  const duration = searchParams.get("duration");
  const type = searchParams.get("type");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const newDate = new Date(date);
  const { scheduleid, hostid, username } = useParams();
  const [guest, setGuest] = useState({
    name: "",
    email: "",
    note: "",
  });

  async function handleCreateSchedule() {
    try {
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
      if( guest.email.split("@")[1] !== "gmail.com") {
         toast.error("We accept only gmail accounts.") ;
         return 
      }
    } catch (error) {}
  }

  return (
    <div className="bg-[#ffffff] flex items-center justify-center flex-wrap min-h-full">
      <div className="bg-white max-w-[800px] w-full flex shadow-lg">
        <div className="flex-1 border-r-1 p-12">
          <p className="font-bold text-gray-400">{username}</p>
          <p className="font-bold text-2xl">Subject</p>
          <p className="mt-3 flex gap-2 items-center">
            <Clock className="text-gray-400" size={16} />{" "}
            <span className="font-bold text-gray-400">15 min</span>
          </p>
          <p className="mt-3 flex gap-2 items-center">
            <Camera className="text-gray-400" size={30} />
            <span className="font-bold text-gray-400">
              Web conferencing details provided upon confirmation.
            </span>
          </p>
          <p className="mt-3 flex gap-2 items-center">
            <Calendar className="text-gray-400" size={16} />
            <span className="font-bold text-gray-400">
              from - to , {days[newDate.getDay()]} ,{" "}
              {months[newDate.getMonth()]} {newDate.getDate()},{" "}
              {newDate.getFullYear()}
            </span>
          </p>
          <p className="mt-3 flex gap-2 items-center">
            <Globe className="text-gray-400" size={16} />
            <span className="font-bold text-gray-400">
              Indian Standard Time
            </span>
          </p>
        </div>
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
              className="rounded-full bg-[#006bff] font-bold"
              onClick={handleCreateSchedule}
            >
              Schedule Event
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
