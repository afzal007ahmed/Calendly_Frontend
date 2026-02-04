import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp } from "lucide-react";

const MeetingItem = ({ meeting }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="px-6 py-4 border-b">
      {/* Main Row */}
      <div className="grid grid-cols-12 items-center gap-4">
        {/* Time */}
        <div className="col-span-4 flex gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-500" />

          <div>
            <p className="font-medium">{meeting.time}</p>

            <p className="text-sm text-muted-foreground">{meeting.timezone}</p>
          </div>
        </div>

        {/* Info */}
        <div className="col-span-5">
          <p className="font-medium">{meeting.name}</p>

          <p className="text-sm">
            Event type <span className="font-semibold">{meeting.type}</span>
          </p>
        </div>

        {/* Hosts */}
        <div className="col-span-2 text-sm text-muted-foreground">
          {meeting.hosts}
        </div>

        {/* Details */}
        <div className="col-span-1 text-right">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1 text-sm text-blue-600"
          >
            Details
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Expand */}
      {open && (
        <div className="mt-6 border-t pt-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Left */}
            <div className="col-span-3 space-y-3">
              <Button variant="outline" className="w-full">
                Reschedule
              </Button>

              <Button variant="outline" className="w-full text-red-600">
                Cancel
              </Button>

              <Separator />

              <div className="space-y-2 text-sm text-blue-600">
                <p>Edit Event Type</p>
                <p>Filter by Event Type</p>
                <p>Schedule Invitee Again</p>
                <p>Report this event</p>
              </div>
            </div>

            {/* Middle */}
            <div className="col-span-5 space-y-4">
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

                <button className="text-sm text-blue-600">
                  + Add meeting notes
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="col-span-4 space-y-4">
              <div>
                <p className="text-sm font-medium">MEETING HOST</p>

                <p className="text-sm">{meeting.hostName}</p>
              </div>

              <p className="text-sm text-muted-foreground">
                Host will attend this meeting
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
