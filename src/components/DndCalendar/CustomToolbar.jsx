/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { AiOutlineCalendar } from "react-icons/ai";
import "./CustomToolbar.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { DatePicker } from "antd";

let navigate = {
  PREVIOUS: "PREV",
  NEXT: "NEXT",
  TODAY: "TODAY",
  DATE: "DATE",
};

function ViewNamesGroup({ views: viewNames, view, messages, onView }) {
  return viewNames.map((name) => (
    <div
      type="button"
      key={name}
      className={clsx({ "view-button-active": view === name }, "view-button")}
      onClick={() => onView(name)}
    >
      {messages[name]}
    </div>
  ));
}
ViewNamesGroup.propTypes = {
  messages: PropTypes.object,
  onView: PropTypes.func,
  view: PropTypes.string,
  views: PropTypes.array,
};

export default function CustomToolbar({
  // date, // available, but not used here
  label,
  localizer: { messages },
  onNavigate,
  onView,
  view,
  views,
}) {
  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <div className="flex items-center gap-2">
          <ViewNamesGroup
            view={view}
            views={views}
            messages={messages}
            onView={onView}
          />
        </div>
      </span>

      <span className="rbc-toolbar-label">
        <span className="flex justify-center items-center gap-4">
          {label}
          {/* <DatePicker picker="month" />
          <DatePicker picker="quarter" />
          <DatePicker picker="year" /> */}
        </span>
      </span>

      <span className={clsx("rbc-btn-group", "examples--custom-toolbar")}>
        <div className="flex items-center gap-4">
          <div
            type="button"
            onClick={() => onNavigate(navigate.PREVIOUS)}
            aria-label={messages.previous}
          >
            <IoIosArrowBack className="icon-style" />
          </div>
          <div
            type="button"
            onClick={() => onNavigate(navigate.TODAY)}
            aria-label={messages.today}
            className="hover:text-bright-green cursor-pointer"
          >
            Current
          </div>
          <div
            type="button"
            onClick={() => onNavigate(navigate.NEXT)}
            aria-label={messages.next}
          >
            <IoIosArrowForward className="icon-style" />
          </div>
        </div>
      </span>
    </div>
  );
}

CustomToolbar.propTypes = {
  date: PropTypes.instanceOf(Date),
  label: PropTypes.string,
  localizer: PropTypes.object,
  messages: PropTypes.object,
  onNavigate: PropTypes.func,
  onView: PropTypes.func,
  view: PropTypes.string,
  views: PropTypes.array,
};
