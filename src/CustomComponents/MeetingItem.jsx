import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

const MeetingItem = ({ meeting }) => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(AppContext);

  return (
    <div className="px-4 sm:px-6 py-4 border-b">
      <div className="grid grid-cols-1 sm:grid-cols-12 items-start sm:items-center gap-4">
        <div className="sm:col-span-4 flex gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-500 shrink-0" />

          <div>
            <p className="font-medium">{meeting.time}</p>

            <p className="text-sm text-muted-foreground">{meeting.timezone}</p>
          </div>
        </div>

        <div className="sm:col-span-5">
          <p className="font-medium">{meeting.name}</p>

          <p className="text-sm">
            Event type <span className="font-semibold">{meeting.type}</span>
          </p>
        </div>

        <div className="sm:col-span-2 text-sm text-muted-foreground">
          {meeting.hosts}
        </div>

        <div className="sm:col-span-1 text-left sm:text-right">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1 text-sm text-blue-600"
          >
            Details
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-6 border-t pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
            <div className="sm:col-span-3 space-y-3">
              <Button variant="outline" className="w-full text-red-600">
                Cancel
              </Button>

              <Separator />
            </div>

            <div className="sm:col-span-3 space-y-5 text-center">
              <div>
                <p className="text-sm font-medium">INVITEE</p>

                <p className="text-sm">{meeting.invitee}</p>

                <p className="text-xs text-muted-foreground">{meeting.email}</p>
              </div>

              <div>
                <p className="text-sm font-medium">INVITEE TIME ZONE</p>

                <p className="text-sm text-muted-foreground">
                  {meeting.timezone}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">MEETING NOTES</p>

                <button className="text-sm text-muted-foreground">
                  {meeting.note || "No notes"}
                </button>
              </div>
            </div>

            <div className="sm:col-span-4 space-y-4 text-center sm:text-left">
              <div>
                <p className="text-sm font-medium">MEETING HOST</p>

                <p className="text-sm">{meeting.hostName}</p>
              </div>

              <p className="text-sm text-muted-foreground">
                {user?.data.name || "Host"} will attend this meeting
              </p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Created {meeting.createdBy}
          </p>
        </div>
      )}
    </div>
  );
};

export default MeetingItem;
