/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Fragment, useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";

import { Calendar, Views, DateLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import CustomToolbar from "./CustomToolbar";
import dayjs from "dayjs";
import toObject from "dayjs/plugin/toObject";
import { dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import styles from "./rendering.module.scss";

const localizer = dayjsLocalizer(dayjs);
dayjs.extend(toObject);

const DragAndDropCalendar = withDragAndDrop(Calendar);

function Event({ event }) {
  const { startTime, endTime } = useMemo(() => {
    return {
      startTime: dayjs(event.start).format("HH:mm"),
      endTime: dayjs(event.end).format("HH:mm"),
    };
  }, []);

  return (
    <span className="flex items-center justify-between">
      <div className="flex items-center">
        <span className="text-[10px] text-white bg-bright-green rounded-[3px] px-1 py-[2px]">
          {startTime}&nbsp;-&nbsp;{endTime}
        </span>
        {/* {event.desc && ':  ' + event.desc} */}
        <span className="text-85-gray text-xs ml-2">{event.title}</span>
      </div>
      <span className="text-[10px] px-2 rounded-full text-red-type border border-solid border-red-type">
        {event.priority}
      </span>
    </span>
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

// const customDayPropGetter = (date) => {
//   if (date.getDate() === 7 || date.getDate() === 15)
//     return {
//       className: styles.specialDay,
//       style: {
//         border: "solid 3px " + (date.getDate() === 7 ? "#faa" : "#afa"),
//       },
//     };
//   else return {};
// };

const customEventPropGetter = (event) => {
  return {
    className: styles.eventContainer,
  };
};

// const customSlotPropGetter = (date) => {
//   if (date.getDate() === 7 || date.getDate() === 15)
//     return {
//       className: styles.specialDay,
//     };
//   else return {};
// };

export default function DndCalendar({
  myEvents,
  setMyEvents,
  toggleMeetDetailModal,
  handleCreateMeet,
}) {
  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      // const title = window.prompt("New Event name");
      // if (title) {
      //   setMyEvents((prev) => [...prev, { start, end, title }]);
      // }
      handleCreateMeet();
    },
    [setMyEvents]
  );

  const handleSelectEvent = useCallback((event) => {
    toggleMeetDetailModal();
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
      },
      defaultDate: new Date(),
      toolbar: CustomToolbar,
    }),
    []
  );

  // const defaultDate = useMemo(() => new Date(), []);

  return (
    <Fragment>
      <div className="h-[490px]">
        <DragAndDropCalendar
          components={components}
          // dayPropGetter={customDayPropGetter}
          // slotPropGetter={customSlotPropGetter}
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
    </Fragment>
  );
}

DndCalendar.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
};
