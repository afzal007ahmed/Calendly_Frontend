import { useState } from "react";
import { Button } from "@/components/ui/button";
import MeetingItem from "../CustomComponents/MeetingItem";
import EmptyState from "../CustomComponents/EmptyState";

const Meetings = () => {
  // Example meetings (later from API)
  const meetings = [
    {
      id: 1,
      name: "Sufyan",
      date: "2026-02-05", // YYYY-MM-DD
      time: "12:00 - 12:30",
      timezone: "India, Sri Lanka Time",
      type: "30 Minute Meeting",
      hosts: "1 host | 0 non-hosts",
      invitee: "Sufyan",
      email: "sufyan@gmail.com",
      hostName: "John Richard",
      createdBy: "2 February 2026 by John Richard",
    },

    {
      id: 2,
      name: "Alex",
      date: "2025-12-10", // Past meeting
      time: "10:00 - 10:30",
      timezone: "India, Sri Lanka Time",
      type: "15 Minute Meeting",
      hosts: "1 host",
      invitee: "Alex",
      email: "alex@gmail.com",
      hostName: "John Richard",
      createdBy: "10 December 2025 by John Richard",
    },
  ];

  const [activeTab, setActiveTab] = useState("upcoming");

  // Today date (no time)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Convert string → Date
  const getDate = (date) => new Date(date);

  // Filters
  const upcoming = meetings.filter((m) => getDate(m.date) >= today);

  const past = meetings.filter((m) => getDate(m.date) < today);

  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-semibold">Meetings</h1>

      {/* Container */}
      <div className="border rounded-xl bg-white">
        {/* Tabs */}
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

            <button className="text-muted-foreground">Date Range</button>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              Export
            </Button>

            <Button variant="outline" size="sm">
              Filter
            </Button>
          </div>
        </div>

        {/* Content */}
        <div>
          {/* Upcoming */}
          {activeTab === "upcoming" &&
            (upcoming.length > 0 ? (
              upcoming.map((m) => <MeetingItem key={m.id} meeting={m} />)
            ) : (
              <EmptyState
                title="No Upcoming Events"
                subtitle="You don’t have any upcoming meetings"
              />
            ))}

          {/* Past */}
          {activeTab === "past" &&
            (past.length > 0 ? (
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
