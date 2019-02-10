import { chunk, range, repeat } from 'lodash';
import * as moment from 'moment';

const initHms = (date: moment.Moment) => {
  return date
    .hour(0)
    .minute(0)
    .second(0);
};

export const getDayMatrix = (year?: number, month?: number): string[][] => {
  const updateYear = year || moment().year();
  const updateMonth = month || moment().month();

  const date = moment({ years: updateYear, months: updateMonth });

  const startOfMonth = parseInt(date.startOf('month').format('DD'), 10);
  const endOfMonth = parseInt(date.endOf('month').format('DD'), 10);

  const startDay = date.startOf('month').day();
  const remain = (startDay + endOfMonth) % 7;

  return chunk(
    [
      ...repeat(' ', startDay).split(''),
      ...range(startOfMonth, endOfMonth + 1).map(v => `${v}`),
      ...(7 - remain === 7 ? [] : repeat(' ', 7 - remain).split('')),
    ],
    7
  );
};

export const getMomentHour = (hour: number, type: string) => {
  let updateHour = hour;
  if (hour === 12) {
    updateHour = type === 'AM' ? 0 : 12;
  } else {
    updateHour = type === 'AM' ? hour : hour + 12;
  }
  return updateHour;
};

export const getNormalHour = (hour: number) => {
  let updateHour = hour;
  if (updateHour === 0) {
    updateHour = 12;
  } else if (hour > 12) {
    updateHour = hour - 12;
  }
  return updateHour;
};

export const getMonthMatrix = (locale: string) => {
  const months = moment.localeData(locale).monthsShort();
  return chunk(months, 3);
};

export const getYearMatrix = (year: number) => {
  return chunk(range(year - 4, year + 5).map(v => `${v}`), 3);
};

export const isDayEqual = (day1?: moment.Moment, day2?: moment.Moment) => {
  if (!day1 || !day2) return false;
  return day1.format('YYYYMMDD') === day2.format('YYYYMMDD');
};

export const isDayAfter = (source: moment.Moment, target: moment.Moment) => {
  return initHms(source).diff(initHms(target), 'days') > 0;
};

export const isDayBefore = (source: moment.Moment, target: moment.Moment) => {
  return initHms(source).diff(initHms(target), 'days') < 0;
};

export const isDayRange = (date: moment.Moment, start?: moment.Moment, end?: moment.Moment) => {
  if (!start || !end) return false;

  return isDayAfter(date, start) && isDayBefore(date, end);
};
