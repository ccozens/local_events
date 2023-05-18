// from chatGPT

export function durationCalc(
	start: string,
	end: string
): { hours: number; minutes: number } {
	const startDate = new Date(`2000-01-01T${start}:00`);
	const endDate = new Date(`2000-01-01T${end}:00`);
	const durationMs = endDate.getTime() - startDate.getTime();
	const durationHours = durationMs / (1000 * 60 * 60);
	const durationMinutes = Math.floor(
		(durationMs % (1000 * 60 * 60)) / (1000 * 60)
	);
	return { hours: durationHours, minutes: durationMinutes };
}
