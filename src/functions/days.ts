

export function currentDay(): number {
    return new Date().getDay();
};

export function currentDayName(): string {
    return new Date().toLocaleString('default', { weekday: 'long' });
}

export function tomorrowDayName(): string {
    return new Date(Date.now() + 86400000).toLocaleString('default', { weekday: 'long' });
}