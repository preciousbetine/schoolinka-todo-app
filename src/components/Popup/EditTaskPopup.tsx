import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { updateTodo } from '../../redux/slices/todo';
import TaskStyles from '../../styles/TaskPopup.module.scss';
import TaskPopupWrapper, { TaskPopupProps } from './TaskPopupWrapper';

export default function EditTaskPopup({
  id,
  visible,
  setVisible,
  title,
  startTime,
  endTime,
  date,
  completed,
}: TaskPopupProps) {
  const [editTitle, setEditTitle] = useState<string>(title || '');
  const dispatch = useDispatch<AppDispatch>();

  const saveTask = () => {
    console.log(
      id,
      title,
      startTime,
      endTime,
      date,
      completed,
    )
    dispatch(updateTodo({
      id,
      title: editTitle,
      startTime: startTime || '',
      endTime: endTime || '',
      date: date || '',
      completed: completed || false,
    }));
    setVisible(false);
  };

  return (
    <TaskPopupWrapper id={id} visible={visible} setVisible={setVisible} fullScreen>
      <div className={TaskStyles['task-popup_content']}>
        <div className={TaskStyles['task-popup_header']}>
          <h3>Edit Task</h3>
          <button
            type="button"
            onClick={() => setVisible(false)}>
            <img alt="close" src="close.svg" />
          </button>
        </div>
        <textarea
          className={TaskStyles['task-popup_description']}
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <div className={TaskStyles['task-time_settings']}>
          <button className={TaskStyles['task-time_settings_day']}>
            <img
              alt="date"
              src="calendar.svg"
            />
            <span>Today</span>
          </button>
          <button className={TaskStyles['task-time_settings_start']}>
            <img
              alt="start time"
              src="clock.svg"
            />
            <span>{startTime}</span>
          </button>
          <button className={TaskStyles['task-time_settings_end']}>
            <img
              alt="end time"
              src="clock.svg"
            />
            <span>{endTime}</span>
          </button>
        </div>
        <div className={TaskStyles['task-notification_settings']}>
          <div className={TaskStyles['task-notification_time']}>
            <img
              alt="notification"
              src="bell.svg"
            />
            <p>10 minutes before</p>
          </div>
          <img
            alt="close"
            src="close.svg"
          />
        </div>
      </div>
      <div className={TaskStyles['task-popup_actions']}>
        <button
          className={TaskStyles['task-popup_cancel']}
          onClick={() => setVisible(false)}
        >
          Cancel
        </button>
        <button
          className={TaskStyles['task-popup_save']}
          onClick={saveTask}
        >
          Save
        </button>
      </div>
    </TaskPopupWrapper>
  )
}
