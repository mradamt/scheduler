import React from 'react';
import classNames from 'classnames';
import 'components/DayListItem.scss';

export default function DayListItem(props) {
  const listItemClass = classNames({
    'day-list__item': true,
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0,
  })

  const onClickFunc = () => props.setDay(props.name);

  const formatSpots = (spots) => {
    const num = spots === 0 ? 'no' : spots;
    const spotsPlural = spots === 1 ? 'spot' : 'spots';
    return `${num} ${spotsPlural} remaining`
  }

  return (
    <li className={listItemClass} onClick={onClickFunc}>
      <h2 className="text--regular">{ props.name }</h2>
      <h3 className="text--light">{ formatSpots(props.spots) }</h3>
    </li>
  );
}