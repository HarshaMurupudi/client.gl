import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";

import { fetchEvents } from "./store/actions";

import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import './store/react-big-calendar.css';
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import { LoadingOverlay } from "@mantine/core";

const eventsTest = [
  {
      "title": "Sumit Mahajan - Vacation",
      "allDay": true,
      "start": "2023-11-30T00:00:00.000Z",
      "end": "2023-11-30T00:00:00.000Z"
  },
  {
      "title": "Sumit Mahajan - Vacation",
      "allDay": true,
      "start": "2023-12-29T00:00:00.000Z",
      "end": "2023-12-29T00:00:00.000Z"
  },
  {
      "title": "Scott Bohm - Vacation",
      "allDay": true,
      "start": "2023-12-26T00:00:00.000Z",
      "end": "2023-12-27T00:00:00.000Z"
  },
  {
      "title": "Paul Stromberg - Vacation",
      "allDay": true,
      "start": "2024-01-08T00:00:00.000Z",
      "end": "2024-01-08T00:00:00.000Z"
  }
];

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function GLCalendar({
  fetchEvents,
  events,
  user,
}) {

  const [eventsLoading, setEventsLoading] = useState(true);

  const fetchData = async () => {
    setEventsLoading(true);
    await fetchEvents();
    setEventsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <LoadingOverlay
        visible={eventsLoading}
        zIndex={1000}
        overlayprops={{ radius: "sm", blur: 2 }}
      />
        <Calendar
          localizer={localizer}
          events={events || []}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 900 }}
        />
    </div>
  );
}

const mapStateToProps = (state) => ({
  events: state.getIn(["calendar", "events"]),
  user: state.getIn(["user","user"]),
});

export default connect(mapStateToProps, {
  fetchEvents
})(GLCalendar);