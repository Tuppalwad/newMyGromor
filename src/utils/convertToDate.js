export default function convertToISO(timeString) {
    // Extract hours, minutes, and AM/PM using RegEx
    const match = timeString.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);

    if (!match) return "Invalid time format";

    let hours = parseInt(match[1], 10);
    let minutes = parseInt(match[2], 10);
    let modifier = match[3].toUpperCase();

    // Convert 12-hour format to 24-hour format
    if (modifier === "PM" && hours !== 12) {
        hours += 12;
    } else if (modifier === "AM" && hours === 12) {
        hours = 0;
    }

    const now = new Date();
    now.setHours(hours, minutes, 0, 0); // Set correct local time

    return now.toISOString(); // Convert to ISO UTC format
}