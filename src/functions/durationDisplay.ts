
export 	function durationDisplay(duration: { hours: number; minutes: number }) {
    if (duration.hours < 0) return 'Invalid time';
    if (duration.hours === 1) return `${duration.hours} hour`;
    if (duration.hours < 1)
        return `${duration.minutes} minutes`;
    if (duration.hours > 1 && duration.minutes === 0) {
        return `${duration.hours} hours`;
    } else {
        return `${duration.hours.toFixed(2)} hours`;
    }
}