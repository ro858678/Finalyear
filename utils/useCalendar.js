// utils/useCalendar.js

export function getCalendarDays(year, month) {
  const days = [];

  // Total days in current month
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Day of the week the month starts on (0 = Sunday, 6 = Saturday)
  const startDay = new Date(year, month, 1).getDay();

  // Push empty slots for alignment (before the 1st of the month)
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  // Push actual day numbers
  for (let i = 1; i <= totalDays; i++) {
    days.push(i);
  }

  return days;
}
