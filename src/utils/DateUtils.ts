    export function convertToUTC(date: Date | string) {
      // Create a Date object from the input date
      const localDate = new Date(date);
    
      // Get the local timezone offset in minutes
      const offsetMinutes = localDate.getTimezoneOffset();
    
      // Convert the date to UTC by adding the offset
      const utcDate = new Date(localDate.getTime() + offsetMinutes * 60 * 1000);
    
      return utcDate;
    }