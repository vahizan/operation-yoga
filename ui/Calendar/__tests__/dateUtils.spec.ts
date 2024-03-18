import { createDateRange } from "../dateUtils";

describe("createDateRange", () => {
  test("should generate correct date range for given parameters", () => {
    const hourOfDay = 10;
    const minuteOfDay = 30;
    const dayOfWeek = 3;
    const numberOfWeeks = 4;

    const dateRange = createDateRange(
      hourOfDay,
      minuteOfDay,
      dayOfWeek,
      numberOfWeeks
    );

    // Check if the length of the date range is equal to the number of weeks specified
    expect(dateRange.length).toBe(numberOfWeeks);

    // Check if each date is correct
    dateRange.forEach((date, index) => {
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() + 7 * index);
      expectedDate.setHours(hourOfDay, minuteOfDay, 0, 0);
      const expectedDay = (dayOfWeek + 7 * index) % 7; // Calculate the expected day of the week
      expect(date.getDay()).toBe(expectedDay);
      expect(date.getHours()).toBe(hourOfDay);
      expect(date.getMinutes()).toBe(minuteOfDay);
    });
  });
});
