export function timeSince(commentedDate: Date): string {
    const now = new Date();
    const convertedDate = new Date(commentedDate);
    const seconds = Math.round((now.getTime() - convertedDate.getTime()) / 1000);
  
    if (seconds < 60) {
      return seconds === 1 ? "1 second ago" : `just now`;
    }
  
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    }
  
    const hours = Math.round(minutes / 60);
    if (hours < 24) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    }
  
    const days = Math.round(hours / 24);
    if (days < 7) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
    }
  
    const weeks = Math.round(days / 7);
    if (weeks < 4) {
      return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    }
  
    const months = Math.round(days / 30);
    if (months < 12) {
      return months === 1 ? "1 month ago" : `${months} months ago`;
    }
  
    const years = Math.round(months / 12);
    return years === 1 ? "1 year ago" : `${years} years ago`;
}