// Function to get the current timestamp
export const getCurrentTimestamp = () => {
  const now = new Date();
  return now.toISOString().slice(0, 19).replace("T", " ");
};

export const timeAgo = (timestamp: string) => {
  // Ensure the timestamp is in a valid format
  const givenTime = new Date(timestamp.replace(/ /g, "T")); // Replace space with 'T' for ISO format
  const now = new Date();

  if (isNaN(givenTime.getTime())) {
    return "Invalid date"; // If the date parsing fails, return an error message
  }

  const diffInMs = now.getTime() - givenTime.getTime(); // Difference in milliseconds

  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));
  const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInDays < 30) {
    return `${diffInDays}d ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths}mo ago`;
  } else {
    return `${diffInYears}y ago`;
  }
};

export function timeAgoFunction(dateString: any) {
  const now: any = new Date(); // current local time
  const past: any = new Date(dateString + " UTC"); // ensure past time is treated as UTC

  const seconds = Math.floor((now - past) / 1000); // Difference in seconds

  // Define time intervals in seconds
  const intervals = {
    year: 365 * 24 * 60 * 60,
    month: 30 * 24 * 60 * 60,
    week: 7 * 24 * 60 * 60,
    day: 24 * 60 * 60,
    hour: 60 * 60,
    minute: 60,
    second: 1,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval !== 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}
