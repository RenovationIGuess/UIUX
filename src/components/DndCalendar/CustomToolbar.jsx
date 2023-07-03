/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { AiFillCalendar, AiOutlineCalendar } from "react-icons/ai";
import "./CustomToolbar.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  Calendar,
  Col,
  DatePicker,
  Popover,
  Radio,
  Row,
  Select,
  Tooltip,
  Typography,
} from "antd";

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

const content = (
  <div className="w-[312px]">
    <Calendar
      fullscreen={false}
      headerRender={({ value, type, onChange, onTypeChange }) => {
        const start = 0;
        const end = 12;
        const monthOptions = [];
        let current = value.clone();
        const localeData = value.localeData();
        const months = [];
        for (let i = 0; i < 12; i++) {
          current = current.month(i);
          months.push(localeData.monthsShort(current));
        }
        for (let i = start; i < end; i++) {
          monthOptions.push(
            <Select.Option key={i} value={i} className="month-item">
              {months[i]}
            </Select.Option>
          );
        }
        const year = value.year();
        const month = value.month();
        const options = [];
        for (let i = year - 10; i < year + 10; i += 1) {
          options.push(
            <Select.Option key={i} value={i} className="year-item">
              {i}
            </Select.Option>
          );
        }
        return (
          <div
            style={{
              padding: 8,
            }}
          >
            <Row gutter={8}>
              <Col>
                <Radio.Group
                  size="small"
                  onChange={(e) => onTypeChange(e.target.value)}
                  value={type}
                >
                  <Radio.Button value="month">Month</Radio.Button>
                  <Radio.Button value="year">Year</Radio.Button>
                </Radio.Group>
              </Col>
              <Col>
                <Select
                  size="small"
                  className="my-year-select"
                  value={year}
                  onChange={(newYear) => {
                    const now = value.clone().year(newYear);
                    onChange(now);
                  }}
                >
                  {options}
                </Select>
              </Col>
              <Col>
                <Select
                  size="small"
                  value={month}
                  onChange={(newMonth) => {
                    const now = value.clone().month(newMonth);
                    onChange(now);
                  }}
                >
                  {monthOptions}
                </Select>
              </Col>
            </Row>
          </div>
        );
      }}
      // onPanelChange={onPanelChange}
    />
  </div>
);

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
      <div className="rbc-btn-group">
        <div className="flex items-center gap-2">
          <ViewNamesGroup
            view={view}
            views={views}
            messages={messages}
            onView={onView}
          />
        </div>
      </div>

      <div className="rbc-toolbar-label">
        <div className="flex justify-center items-center gap-2">
          {label}
          <Popover content={content} placement="bottom">
            <AiFillCalendar className="icon-style" style={{ marginTop: -4 }} />
          </Popover>
        </div>
      </div>

      <div className={clsx("rbc-btn-group", "examples--custom-toolbar")}>
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
      </div>
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
