import React from 'react';
import DayListItem from './DayListItem';

const DayList = (props) => {
  const listDays = props.values.map(day => <DayListItem 
    key={day.id}
    name={day.name}
    spots={day.spots}
    selected={day.name === props.value}
    setDay={(event) => props.onChange(day.name)}
    />)

  return (
    <ul>
      { listDays }
    </ul>
  )
}

export default DayList;