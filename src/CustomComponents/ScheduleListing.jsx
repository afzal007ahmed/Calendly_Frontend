import React from 'react'
import { PiLinkSimpleLight } from "react-icons/pi";
import { Link } from 'react-router';

const ScheduleListing = ( { schedules } ) => {
    const order = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div className='flex flex-col gap-4 my-4'>
            {
                schedules.map(schedule => (
                <div key={schedule._id}
                className='flex justify-between bg-white px-6 py-3 items-center rounded-2xl shadow-xl border-l-8 border-violet-700
                hover:bg-gray-100
                '
                >
                    <div className='flex items-center gap-4'>
                        <div>
                            {/* selected logic to be done */}
                            <input type="checkbox" 
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='font-extrabold'>{schedule.meeting_name}</p>
                            <div>
                                {/* icon */}
                                <p className='text-sm opacity-55'>{schedule.duration}min, {schedule.type_of_meeting}</p>
                            </div>
                            <p className='text-sm opacity-55'>
                                {
                                    schedule.availability.map(a => a.day.slice(0,3)).sort((a,b) => order.indexOf(a) - order.indexOf(b)).join(', ')
                                }
                            </p>
                        </div>
                    </div>
                    <Link to={`/${schedule.public_link}`} className='bg-gray-100 px-4 py-2 rounded-2xl border cursor-pointer'>
                        <PiLinkSimpleLight className='text-xl font-extrabold'
                        />
                    </Link>
                </div>
            ))
            }
        </div>
    )
}

export default ScheduleListing