import React from 'react';
import classNames from 'classnames';
import './InterviewerListItem.scss';

export default function InterviewerListItem(props) {
  const listItemClasses = classNames({
    'interviewers__item': true,
    'interviewers__item--selected': props.selected,
  })

  const onClickFunc = () => props.setInterviewer(props.name);

  return (
    <li className={listItemClasses} onClick={onClickFunc}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  )
}