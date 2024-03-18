export const createDateRange = (
  hourOfDay: number,
  minuteOfDay: number,
  dayOfWeek: number,
  numberOfWeeks: number
): Date[] => {
  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setHours(hourOfDay, minuteOfDay, 0, 0);

  // Find the day of the week for the start date
  const dayDifference = (dayOfWeek - startDate.getDay() + 7) % 7;
  startDate.setDate(startDate.getDate() + dayDifference);

  const dates: Date[] = [new Date(startDate)];

  // Generate dates for subsequent weeks
  for (let i = 1; i < numberOfWeeks; i++) {
    const nextDate = new Date(startDate);
    nextDate.setDate(nextDate.getDate() + 7 * i);
    dates.push(nextDate);
  }

  return dates;
};
