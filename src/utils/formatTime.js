import { format, getTime, formatDistanceToNow } from 'date-fns';
import moment from 'moment';
// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export const formatTime=(dateString)=> {
  return moment(dateString).format("YYYY MMM DD ");
}

export const formatTimePicker=(dateString)=> {
  return moment(dateString).format("mm/dd/yyyy");
}