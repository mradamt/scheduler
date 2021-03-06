import React from 'react';
import classNames from 'classnames';
import './InterviewerListItem.scss';

const InterviewerListItem = (props) => {
  const listItemClasses = classNames({
    'interviewers__item': true,
    'interviewers__item--selected': props.selected,
  })

  return (
    <li className={listItemClasses} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}

export default InterviewerListItem;