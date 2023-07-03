/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Fragment, useCallback, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";

import { Calendar, Views, DateLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import CustomToolbar from "./CustomToolbar";
import dayjs from "dayjs";
import toObject from "dayjs/plugin/toObject";
import { dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import styles from "./rendering.module.scss";
import CustomHeader from "./CustomHeader";
import "./DndCalendar.scss";
import CreateMeetModal from "../CreateMeetModal/CreateMeetModal";
import { Modal, Popover, Progress, Tooltip } from "antd";
import MeetDetail from "../MeetDetail/MeetDetail";
import { useNavigate } from "react-router-dom";
import CreateTaskModal from "../CreateTaskModal/CreateTaskModal";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";

const localizer = dayjsLocalizer(dayjs);
dayjs.extend(toObject);

const DragAndDropCalendar = withDragAndDrop(Calendar);

const EventHoverPopup = ({ event, open, setOpen }) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center gap-8 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center pr-3 border-[#f5f6fb] border-r">
              <p className="font-medium text-base">
                {event.name || event.title}
              </p>
            </div>
            <span
              className={`px-3 py-1 text-xs font-semibold uppercase rounded-full border${
                event.priority === "high"
                  ? " border-red-type text-red-type"
                  : event.priority === "medium"
                  ? " border-yellow-type text-yellow-type"
                  : " border-bright-green text-bright-green"
              }`}
            >
              {event.priority}
            </span>
            <span
              className={`px-3 py-1 text-xs font-semibold uppercase rounded-full border${
                event.status === "done"
                  ? " border-bright-green text-bright-green"
                  : event.status === "to do"
                  ? " border-45-gray text-45-gray"
                  : " border-yellow-type text-yellow-type"
              }`}
            >
              {event.status}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <AiFillEdit className="icon-style" />
            <AiFillCloseCircle
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
              className="text-2xl cursor-pointer text-red-type"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="w-8 h-8 rounded-full mr-2"
              src={event.creator.image}
            />
            <p className="text-sm">{event.creator.name} is the Creator</p>
          </div>
          <Progress type="circle" percent={event.completion} size={45} />
        </div>
      </div>
    </>
  );
};

function Event({ event }) {
  const [open, setOpen] = useState(false);

  const { startTime, endTime } = useMemo(() => {
    return {
      startTime: dayjs(event.start).format("HH:mm"),
      endTime: dayjs(event.end).format("HH:mm"),
    };
  }, []);

  return (
    <>
      <Popover
        content={
          <EventHoverPopup event={event} setOpen={setOpen} open={open} />
        }
        title="Event Detail"
        placement="top"
      >
        <div
          className={`flex items-center justify-between ${
            dayjs().isAfter(dayjs(event.end)) && "opacity-50"
          }`}
        >
          <div className="flex items-center">
            <span className="time-wrapper">
              {startTime}&nbsp;-&nbsp;{endTime}
            </span>
            <span className="event-title">{event.title || event.name}</span>
          </div>
        </div>
      </Popover>

      <Modal
        title="Confirm Modal"
        centered
        open={open}
        onOk={(e) => {
          e.stopPropagation();
          setOpen(!open);
          toast("Delete Successful!");
        }}
        onCancel={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        <p>Are you sure you want to delete</p>
      </Modal>
    </>
  );
}
Event.propTypes = {
  event: PropTypes.object,
};

function CustomDayEvent({ event }) {
  const { startTime, endTime } = useMemo(() => {
    return {
      startTime: dayjs(event.start).format("HH:mm"),
      endTime: dayjs(event.end).format("HH:mm"),
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="items-center flex">
          <p className="time-wrapper">
            {startTime}&nbsp;-&nbsp;{endTime}
          </p>
          <p className="event-title font-medium">{event.title}</p>
        </div>
        <div className="flex items-center gap-2">
          <p
            className={`py-1 px-3 font-medium text-xs uppercase border rounded-full ${
              event.priority === "high"
                ? "border-red-type text-red-type"
                : event.priority === "medium"
                ? "border-yellow-type text-yellow-type"
                : "border-bright-green text-bright-green"
            }`}
          >
            {event.priority}
          </p>
          <p
            className={`py-1 px-3 font-medium text-xs uppercase border rounded-full ${
              event.status === "done"
                ? "border-bright-green text-bright-green"
                : event.status === "todo"
                ? "border-45-gray text-45-gray"
                : "border-yellow-type text-yellow-type"
            }`}
          >
            {event.status}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            className="w-6 h-6 rounded-full mr-2"
            src={event.creator.image}
            alt="creator-image"
          />
          <p className="text-sm">{event.creator.name} is the Creator</p>
        </div>
        {Object.keys(event.team).length !== 0 && (
          <Tooltip placement="top" title="Team">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium hover:text-bright-green">
                {event.team.name}
              </p>
              <img
                className="h-6 w-6 rounded-full"
                src={event.team.image}
                alt="team-ava"
              />
            </div>
          </Tooltip>
        )}
        {Object.keys(event.workspace).length !== 0 && (
          <Tooltip placement="top" title="Workspace">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium hover:text-bright-green">
                {event.workspace.name}
              </p>
              <img
                className="h-6 w-6 rounded-full"
                src={event.workspace.image}
                alt="team-ava"
              />
            </div>
          </Tooltip>
        )}
      </div>
      <div className="flex items-center">
        {console.log(event)}
        {event.members.splice(0, 3).map((m, i) => (
          <img
            key={i}
            src={m.image}
            className="w-6 h-6 rounded-full"
            style={{ transform: `translateX(${i * -50}%)` }}
            alt="sth"
          />
        ))}
        <p className="text-sm">{event.members.length} members assigned</p>
      </div>
    </div>
  );
}
Event.propTypes = {
  event: PropTypes.object,
};

function EventAgenda({ event }) {
  return (
    <span>
      <em style={{ color: "magenta" }}>{event.title}</em>
      <p>{event.desc}</p>
    </span>
  );
}
EventAgenda.propTypes = {
  event: PropTypes.object,
};

// function CustomToolbar({ event }) {
//   return (
//     <div></div>
//   )
// }

const customDayPropGetter = (date) => {
  if (date.getDate() === 7 || date.getDate() === 15)
    return {
      className: styles.specialDay,
      style: {
        border: "solid 1px " + (date.getDate() === 7 ? "#22C55E" : "#D91212"),
      },
    };
  else return {};
};

const customEventPropGetter = (event) => {
  return {
    className: styles.eventContainer,
  };
};

const customSlotPropGetter = (date) => {
  if (date.getDate() === 7 || date.getDate() === 15)
    return {
      className: styles.specialDay,
    };
  else return {};
};

export default function DndCalendar({
  type,
  myEvents,
  setMyEvents,
  setMyTasks,
  createMeetOpen,
  meetDetailOpen,
  setMeetDetailOpen,
  setCreateMeetOpen,
  createTaskOpen,
  setCreateTaskOpen,
}) {
  const navigate = useNavigate();

  // const [dayLayoutAlgorithm, setDayLayoutAlgorithm] = useState('no-overlap');
  const startEndRef = useRef({ start: new Date(), end: new Date() });
  const [selectedEvent, setSelectedEvent] = useState({});

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      startEndRef.current = {
        start: start,
        end: end,
      };
      type === "meet" ? setCreateMeetOpen(true) : setCreateTaskOpen(true);
      // toggleCreateMeetModal();
    },
    [setMyEvents]
  );

  const handleSelectEvent = useCallback((event) => {
    if (type === "meet") {
      setSelectedEvent(event);
      setMeetDetailOpen(true);
    } else {
      navigate("/team/1/tasks/1");
    }
  }, []);

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }

      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end, allDay }];
      });
    },
    [setMyEvents]
  );

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setMyEvents]
  );

  const { components, defaultDate } = useMemo(
    () => ({
      components: {
        agenda: {
          event: EventAgenda,
        },
        event: Event,
        toolbar: CustomToolbar,
        day: {
          header: CustomHeader,
          event: CustomDayEvent,
        },
        week: {
          header: CustomHeader,
        },
        month: {
          header: CustomHeader,
        },
      },
      defaultDate: new Date(),
      // views: {
      // }
    }),
    []
  );

  return (
    <Fragment>
      <div className="h-[768px] calendar-wrapper">
        <DragAndDropCalendar
          components={components}
          dayPropGetter={customDayPropGetter}
          slotPropGetter={customSlotPropGetter}
          eventPropGetter={customEventPropGetter}
          defaultDate={defaultDate}
          defaultView={Views.MONTH}
          events={myEvents}
          localizer={localizer}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          popup
          resizable
        />
      </div>

      {createMeetOpen && (
        <CreateMeetModal
          setMyEvents={setMyEvents}
          setCreateMeetOpen={setCreateMeetOpen}
          start={startEndRef.current.start}
          end={startEndRef.current.end}
        />
      )}

      {meetDetailOpen && (
        <MeetDetail
          setMeetDetailOpen={setMeetDetailOpen}
          event={selectedEvent}
        />
      )}

      {createTaskOpen && (
        <CreateTaskModal
          setMyTasks={setMyTasks}
          setCreateTaskOpen={setCreateTaskOpen}
          start={startEndRef.current.start}
          end={startEndRef.current.end}
        />
      )}
    </Fragment>
  );
}

DndCalendar.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
};
