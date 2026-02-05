import { config } from '@/config';
import GoogleButton from '@/CustomComponents/GoogleButton';
import ScheduleCreate from '@/CustomComponents/ScheduleCreate';
import ScheduleListing from '@/CustomComponents/ScheduleListing'
import useErrorHandler from '@/hooks/ErrorHandler/useErrorHandler';
import { getSchedules } from '@/services/schedule.services';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router';
import { toast } from 'sonner';

const Scheduling = () => {

  const token = localStorage.getItem("token");
  const [searchParams] =  useSearchParams() ;
  const message = searchParams.get("message") ;
  if( message) {
    toast.error(message) ;
  }
  const [schedules, setSchedules] = useState([]);
  const [ googleCalenderMissing , setGoogleCalenderMissing ] = useState(false);

    useEffect(() => {
        async function getSchedulesForUser(){
            try {
                const response = await getSchedules();
                setGoogleCalenderMissing(false) ;
                setSchedules(response.data);

            }catch (error) {
              if( error.response.status === 403 && error.response.data.code === "GOOGLE_ACCESS_REQUIRED") {
                 setGoogleCalenderMissing(true) ;
              } 
                
            }
        }

        getSchedulesForUser();
  }, []);

  return (
    <div>
      { googleCalenderMissing ? <GoogleButton route={config.google_redirect_login(token)}/> : <ScheduleCreate/>}
      <ScheduleListing schedules={schedules} />
    </div>
  )
}

export default Scheduling