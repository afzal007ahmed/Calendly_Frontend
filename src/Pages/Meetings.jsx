import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import MeetingItem from "../CustomComponents/MeetingItem";
import EmptyState from "../CustomComponents/EmptyState";

const Meetings = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  const [activeTab, setActiveTab] = useState("upcoming");
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchMeetings("upcoming");
    fetchMeetings("past");
  }, []);

  // Minutes to Time
  const formatTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;

    const ampm = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;

    return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  const fetchMeetings = async (type) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${BASE_URL}meetings?type=${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = res.data;

      const formatted = json.data.map((item) => {
        const booking = item.booking_id;
        const guest = booking.guest[0];

        return {
          id: item._id,

          name: guest?.name,

          email: guest?.email,

          note: guest?.note,

          date: booking.date,

          time: `${formatTime(booking.from)} - ${formatTime(booking.to)}`,

          timezone: "India Time",

          type: booking.meeting_id,

          hostId: booking.host_id,

          createdBy: new Date(booking.createdAt).toDateString(),
        };
      });

      if (json.type === "upcoming") {
        setUpcoming(formatted);
      } else {
        setPast(formatted);
      }

      setLoading(false);
    } catch (err) {
      console.error("Meeting fetch error:", err);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Meetings</h1>

      <div className="border rounded-xl bg-white">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex gap-6 text-sm font-medium">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`pb-2 ${
                activeTab === "upcoming"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-muted-foreground"
              }`}
            >
              Upcoming
            </button>

            <button
              onClick={() => setActiveTab("past")}
              className={`pb-2 ${
                activeTab === "past"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-muted-foreground"
              }`}
            >
              Past
            </button>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchMeetings(activeTab)}
            >
              Refresh
            </Button>
          </div>
        </div>

        <div>
          {loading && (
            <p className="py-10 text-center text-muted-foreground">
              Loading meetings...
            </p>
          )}

          {/* Upcoming */}
          {!loading &&
            activeTab === "upcoming" &&
            (upcoming.length ? (
              upcoming.map((m) => <MeetingItem key={m.id} meeting={m} />)
            ) : (
              <EmptyState
                title="No Upcoming Events"
                subtitle="You don’t have any upcoming meetings"
              />
            ))}

          {/* Past */}
          {!loading &&
            activeTab === "past" &&
            (past.length ? (
              past.map((m) => <MeetingItem key={m.id} meeting={m} />)
            ) : (
              <EmptyState
                title="No Past Events"
                subtitle="You don’t have any previous meetings"
              />
            ))}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground py-4 border-t">
          You've reached the end of the list
        </div>
      </div>
    </div>
  );
};

export default Meetings;
