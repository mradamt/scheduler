import React from 'react';
import classNames from 'classnames';
import './InterviewerListItem.scss';

export default function InterviewerListItem(props) {
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
      {props.name}
    </li>
  )
}