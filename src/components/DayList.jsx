import React from 'react';
import DayListItem from './DayListItem';

const DayList = ({days, selectedDay, onChange}) => {
  const listDays = days.map(day => <DayListItem 
    key={day.id}
    name={day.name}
    spots={day.spots}
    selected={day.name === selectedDay}
    setDay={() => onChange(day.name)}
    />)

  return (
    <ul>
      { listDays }
    </ul>
  )
}

export default DayList;