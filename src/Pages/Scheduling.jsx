import ScheduleCreate from '@/CustomComponents/ScheduleCreate';
import ScheduleListing from '@/CustomComponents/ScheduleListing'
import useErrorHandler from '@/ErrorHandler/useErrorHandler';
import { getSchedules } from '@/services/schedule.services';
import React, { useEffect, useState } from 'react'

const Scheduling = () => {
  const {errorHandler} = useErrorHandler();

  const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        async function getSchedulesForUser(){
            try {
                const response = await getSchedules();
                setSchedules(response.data);

            }catch (error) {
                errorHandler(error);
            }
        }

        getSchedulesForUser();
  }, []);

  return (
    <div>
      <ScheduleCreate/>
      <ScheduleListing schedules={schedules} />
    </div>
  )
}

export default Scheduling