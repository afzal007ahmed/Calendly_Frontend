import { config } from '@/config';
import GoogleButton from '@/CustomComponents/GoogleButton';
import ScheduleCreate from '@/CustomComponents/ScheduleCreate';
import ScheduleListing from '@/CustomComponents/ScheduleListing'
import useErrorHandler from '@/hooks/ErrorHandler/useErrorHandler';
import { fetchSchedules, scheduleError, scheduleSuccess } from '@/redux/ScheduleSlice';
import { getSchedules } from '@/services/schedule.services';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';
import { toast } from 'sonner';

const Scheduling = () => {

  const dispatch = useDispatch() ;
  const token = localStorage.getItem("token");
  const [searchParams] =  useSearchParams() ;
  const { errorHandler } = useErrorHandler()
  const message = searchParams.get("message") ;
  if( message) {
    toast.error(message) ;
  }
  const schedules = useSelector(( state ) => state.ScheduleSlice) ;
  const [ googleCalenderMissing , setGoogleCalenderMissing ] = useState(false);

    useEffect(() => {
        async function getSchedulesForUser(){
            try {
                dispatch(fetchSchedules()) ;
                const response = await getSchedules();
                setGoogleCalenderMissing(false) ;
                dispatch( scheduleSuccess( response ))

            }catch (error) {
              dispatch(scheduleError()) ;
              if( error.response.status === 403 && error.response.data.code === "GOOGLE_ACCESS_REQUIRED") {
                 setGoogleCalenderMissing(true) ;
              } 
              else{
                errorHandler(error)
              }
                
            }
        }

        getSchedulesForUser();
  }, []);

  console.log( schedules)
  return (
    <div>
      { googleCalenderMissing ? <GoogleButton route={config.google_redirect_login(token)}/> : <ScheduleCreate/>}
      { schedules.data && <ScheduleListing schedules={schedules.data} />}
    </div>
  )
}

export default Scheduling