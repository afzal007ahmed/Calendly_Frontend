import React, { useState } from "react";
import { PiLinkSimpleLight } from "react-icons/pi";
import { IoTrashBinSharp } from "react-icons/io5";
import {
  deleteSelectedIds,
  getScheduleDetailsById,
} from "@/services/schedule.services";
import useErrorHandler from "@/hooks/ErrorHandler/useErrorHandler";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { FcInfo } from "react-icons/fc";
import {
  fetchScheduleDetails,
  fetchScheduleDetailsFailed,
  fetchScheduleDetailsSuccess,
} from "@/redux/Slices/scheduleDetailsSlice";

const ScheduleListing = ({ schedules, getSchedulesForUser, open, setOpen }) => {
  const order = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const { errorHandler } = useErrorHandler();

  async function getScheduleDetails(id) {
    try {
      dispatch(fetchScheduleDetails());
      const data = await getScheduleDetailsById(id);
      dispatch(fetchScheduleDetailsSuccess(data));
    } catch (error) {
      errorHandler(error);
    } finally {
      dispatch(fetchScheduleDetailsFailed());
    }
  }

  function addSelected(id) {
    if (selected.includes(id)) {
      setSelected((prev) => prev.filter((i) => i !== id));
    } else {
      setSelected((prev) => [...prev, id]);
    }
  }

  async function deleteSelected() {
    try {
      await deleteSelectedIds(selected);
      await getSchedulesForUser();
      setSelected([]);
      toast.success("Successfully deleted schedules!");
    } catch (error) {
      errorHandler(error);
    }
  }

  return (
    <div className="flex flex-col gap-4 my-4">
      {selected.length > 0 && (
        <div className="flex gap-4 items-center ml-8 -mt-12 absolute">
          <IoTrashBinSharp
            className="text-red-500 text-3xl rounded-2xl bg-white p-1 cursor-pointer"
            onClick={deleteSelected}
          />
          <p className="text-red-800 rounded-2xl text-sm font-semibold">
            Delete Selected
          </p>
        </div>
      )}
      {schedules && schedules.length > 0 ? (
        schedules.map((schedule) => (
          <div
            onClick={() => {
              setOpen(true);
              getScheduleDetails(schedule._id);
            }}
            key={schedule._id}
            className={`flex justify-between px-6 py-3 items-center rounded-2xl shadow-xl border-l-8 border-violet-700 cursor-pointer
                hover:bg-gray-100
                ${selected.includes(schedule._id) ? "bg-violet-100" : "bg-white"}`}
          >
            <div className="flex items-center gap-4">
              <div>
                <input
                  type="checkbox"
                  checked={selected.includes(schedule._id)}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={() => {
                    addSelected(schedule._id);
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-extrabold">{schedule.meeting_name}</p>
                <div>
                  <FcInfo />
                  <p className="text-sm opacity-55">
                    {schedule.duration} min,{" "}
                    {schedule.type_of_meeting === "one"
                      ? "One-to-one meeting"
                      : "Group meeting"}
                  </p>
                </div>
                <p className="text-sm opacity-55">
                  {schedule.availability
                    .map((a) => a.day.slice(0, 3))
                    .sort((a, b) => order.indexOf(a) - order.indexOf(b))
                    .join(", ")}
                </p>
              </div>
            </div>
            <a
              href={`/${schedule.public_link}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gray-100 px-4 py-2 rounded-2xl border cursor-pointer">
                <PiLinkSimpleLight className="text-xl font-extrabold" />
              </div>
            </a>
          </div>
        ))
      ) : (
        <div className="text-center mt-12 font-bold">
          No Schedules are created yet.
        </div>
      )}
    </div>
  );
};

export default ScheduleListing;
