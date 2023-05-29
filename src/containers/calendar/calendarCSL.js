import React from 'react'
import Calendar from 'react-calendar'
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import '../../styles/calendarCSL.css'
import 'react-calendar/dist/Calendar.css';

export const CalendarCSL = (props) => {
    const { activeCalendar, changeDate, date, handleActiveCalendar } = props

    return (
        <div style={{ display: `${activeCalendar ? "block" : 'none'}` }}>
            <Calendar
                onChange={(e) => {
                    changeDate(e)
                    handleActiveCalendar()
                }}
                value={date}
                view={"month"}
                onDrillUp={() => { }}
                showNeighboringMonth={false}
                nextLabel={<RiArrowRightSLine size={40} />}
                prevLabel={<RiArrowLeftSLine size={40} />}
                calendarType='US'
                maxDate={new Date()}
            />
        </div>
    )
}