import format from 'date-fns/format';
import addMinutes from 'date-fns/addMinutes';

const timeHoursAndMin = (date) => {
  const hours = format(new Date(date), 'HH');
  const minutes = format(new Date(date), 'mm');
  return `${hours}:${minutes}`;
};

export const addTime = (date, mount) => {
  const newDate = addMinutes(new Date(date), mount);
  const hours = format(new Date(newDate), 'HH');
  const minutes = format(new Date(newDate), 'mm');
  return `${hours}:${minutes}`;
};

export default timeHoursAndMin;
