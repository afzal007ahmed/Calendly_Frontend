import useErrorHandler from '@/ErrorHandler/useErrorHandler';
import { getAvailability } from '@/services/availability.services';
import React, { useEffect, useState } from 'react'
import { PiArrowsClockwiseLight } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";

const Availability = () => {
  const { errorHandler } = useErrorHandler();
  const [availability, setAvailability] = useState({});
  const daysInAWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  useEffect(() => {
    async function getAvailabilityForUser(){
      try {
        const response = await getAvailability();
        setAvailability(response.data);
      } catch (error) {
        errorHandler(error)
      }
    }
    getAvailabilityForUser()
  }, []);

  function minutesToTime(minutes){
    if(minutes === null) return "";

    const h = Math.floor(minutes/60);
    const m = minutes%60;
    console.log(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
  }

  function timeToMinutes(value) {
    if (!value) return null;
    const [h, m] = value.split(":").map(Number);
    return h * 60 + m;
  }

  function handleTimeChange(day, field, value) {
    const minutes = timeToMinutes(value);

    setAvailability(prev => ({
      ...prev,
      [day]: [
        {
          ...prev?.[day]?.[0],
          [field]: minutes
        }
      ]
    }));
  }

  const hasInvalidTime = Object.values(availability || {}).some((d) => d[0].from > d[0].to);

  function addDefaultTime(day){
    setAvailability(prev => ({
      ...prev,
      [day] : [
        {
          from : prev?.[day]?.from || 540,
          to : prev?.[day]?.to || 1020
        }
      ]
    }));
  }

  function removeTime(day){
    setAvailability(prev => ({
      ...prev,
      [day] : [{
        from : null,
        to : null
      }]
    }))
  }

  return (
    <div className='bg-white min-h-full px-10 py-6'>
      <div className='flex justify-between items-center'>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-3'>
              <PiArrowsClockwiseLight/>
              <p className='font-bold font-lg'>Weekly Hours</p>
            </div>
            <div className='text-xs opacity-50'>
              <p>Set when you are typically available for meetings</p>
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-3'>
              <SlCalender/>
              <p className='font-bold font-lg'>Date-specific hours</p>
            </div>
            <p className='text-xs opacity-50'>
              Adjust hours for specific days
            </p>
          </div>
      </div>
      <div className='mt-10 flex flex-col gap-6 min-w-80'>
        {
        daysInAWeek.map(day => (
          <div key={day} className='flex gap-8 items-center'>
            <div className='w-7 h-7 rounded-full bg-violet-900 flex items-center gap-6 justify-center'>
              <p className='font-bold text-sm text-white'>{day.slice(0,1)}</p>
            </div>
            {
            (availability?.[day]?.[0]?.from!==null && availability?.[day]?.[0]?.to) ?
            <>
              <input type="time" 
              className='text-sm opacity-80 outline-none cursor-pointer'
              value={minutesToTime(availability?.[day]?.[0]?.from)} 
              onChange={(e) =>handleTimeChange(day, "from", e.target.value)}
              />
              <input type="time" 
              className='text-sm opacity-80 outline-none cursor-pointer'
              value={minutesToTime(availability?.[day]?.[0]?.to)}
              onChange={(e) =>handleTimeChange(day, "to", e.target.value)}
              />
              <IoMdRemoveCircleOutline className='text-lg opacity-50'
              onClick={() => removeTime(day)}
              />
            </>
            :
            <>
              <p className='text-sm opacity-60'>
                Unavailable
              </p>
              <IoMdAddCircleOutline className='text-lg font-extrabold opacity-50'
              onClick={() => addDefaultTime(day)}
              />
            </>
            }
           
            {
              (availability?.[day]?.[0]?.from) > (availability?.[day]?.[0]?.to) &&
              <div>
                <p className='text-red-700 font-bold text-sm'>Select correct time for availability</p>
              </div>
            }
          </div>
        ))
        }
      </div>
      <button 
      disabled={hasInvalidTime}
      className={`text-white rounded-xl px-4 py-2 font-semibold mt-10 text-sm
      ${ hasInvalidTime ? "bg-emerald-400 cursor-not-allowed" : "bg-violet-900 cursor-pointer" }
      `}

      >Save Changes</button>
    </div>
  )
}

export default Availability 