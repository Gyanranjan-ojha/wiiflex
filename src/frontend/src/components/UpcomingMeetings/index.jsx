import { Img } from "../Img";

const meetings = {
  Today: [
    {
      time: "03:15",
      name: "Mini Soman",
      details: "Mean stack developer, 4th phase interview | 03:15 - 003:45",
      color: "bg-blue-200",
      textColor: "text-blue-800",
      borderColor: "border-blue-300",
      borderColor1: "bg-blue-300",
    },
    {
      time: "10:00",
      name: "Mini Soman",
      details: "Mean stack developer, 4th phase interview | 03:15 - 03:45",
      color: "bg-blue-200",
      textColor: "text-blue-800",
      borderColor: "border-blue-300",
      borderColor1: "bg-blue-300",
    },
    {
      time: "10:00",
      name: "Mini Soman",
      details: "Mean stack developer, 4th phase interview | 03:15 - 03:45",
      color: "bg-blue-200",
      textColor: "text-blue-800",
      borderColor: "border-blue-300",
      borderColor1: "bg-blue-300",
    },
    {
      time: "10:00",
      name: "Mini Soman",
      details: "Mean stack developer, 4th phase interview | 03:15 - 03:45",
      color: "bg-green-200",
      textColor: "text-green-800",
      borderColor: "border-green-300",
      borderColor1: "bg-green-300",
    },
    {
      time: "03:15",
      name: "Mini Soman",
      details: "Mean stack developer, 4th phase interview | 03:15 - 03:45",
      color: "bg-blue-200",
      textColor: "text-blue-800",
      borderColor: "border-blue-300",
      borderColor1: "bg-blue-300",
    },
    {
      time: "10:00",
      name: "Mini Soman",
      details: "Mean stack developer, 4th phase interview | 03:15 - 03:45",
      color: "bg-blue-200",
      textColor: "text-blue-800",
      borderColor: "border-blue-300",
      borderColor1: "bg-blue-300",
    },
    {
      time: "10:00",
      name: "Mini Soman",
      details: "Mean stack developer, 4th phase interview | 03:15 - 003:45",
      color: "bg-blue-200",
      textColor: "text-blue-800",
      borderColor: "border-blue-300",
      borderColor1: "bg-blue-300",
    },
    {
      time: "10:00",
      name: "Mini Soman",
      details: "Mean stack developer, 4th phase interview | 03:15 - 003:45",
      color: "bg-green-200",
      textColor: "text-green-800",
      borderColor: "border-green-300",
      borderColor1: "bg-green-300",
    },
  ],
  Tomorrow: [
    {
      time: "03:15",
      name: "Mini Soman",
      details: "Mean stack developer, 4th phase interview | 03:15 - 003:45",
      color: "bg-blue-200",
      textColor: "text-blue-800",
      borderColor: "border-blue-300",
      borderColor1: "bg-blue-300",
    },
  ],
  "This Week": [
    {
      time: "03:15",
      name: "Mini Soman",
      details: "Mean stack developer, 4th phase interview | 3:15 - 003:45",
      color: "bg-blue-200",
      textColor: "text-blue-800",
      borderColor: "border-blue-300",
      borderColor1: "bg-blue-300",
    },
  ],
};

function UpcomingMeetings() {
  return (
    <div
      className="bg-white p-4 w-[22%] self-start overflow-auto h-screen scrollbar-invisible"
      style={{ minHeight: "calc(100vh - 66px)" }}
    >
      <div className="flex font-bold text-lg mb-4">
        Upcoming Meetings{" "}
        <span>
          <Img
            src="/images/add_meeting.svg"
            alt="add"
            className="h-6 w-6 rounded-[22px] object-cover ml-2.5 mt-[3px]"
          />
        </span>
      </div>
      {Object.keys(meetings).map((date, index) => (
        <div key={index}>
          <div className="font-semibold text-[#071c5094] mb-2 ">{date} </div>

          {meetings[date].map((meeting, idx) => (
            <div
              key={idx}
              className={`flex items-center text-[10px] mb-2 rounded-lg ${meeting.color} ${meeting.textColor} relative overflow-hidden`}
            >
              <div className="flex w-full relative">
                <div
                  className={`flex items-center font-bold p-1.5 pr-2 border-r-2 ${meeting.borderColor}`}
                >
                  {meeting.time}
                </div>
                <div className={`p-1.5 pl-2 flex-1`}>
                  <p>
                    <span className="font-bold">{meeting.name}; &nbsp;</span>
                    <span>{meeting.details}</span>
                  </p>
                </div>
              </div>
              <div
                className={`absolute right-0 top-0 bottom-0 w-[5px] ${meeting.borderColor1}`}
              ></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default UpcomingMeetings;
