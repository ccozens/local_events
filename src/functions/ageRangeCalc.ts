export const ageRangeCalc = (
	minAgeMonths: number,
	maxAgeMonths: number,
	minAgeYears: number,
	maxAgeYears: number
) => {
	if (maxAgeYears < minAgeYears) {
		return 'Maximum age less than minimum age';
	} else {
		if (maxAgeYears === 0 && minAgeYears === 0) {
			return `${minAgeMonths} months - ${maxAgeMonths} months`;
		}
		if (maxAgeMonths === 0) {
			{
				if (minAgeMonths === 6 && minAgeYears === 1) {
					return `18 months - ${maxAgeYears} years`;
				}
				if (minAgeMonths === 0) {
					return `${minAgeYears} years - ${maxAgeYears} years`;
				}
				if (minAgeYears === 0)
					// minAgeMonths !== 0 always true here
					return `${minAgeMonths} months - ${maxAgeYears} years`;
			}
		} else {
			if (maxAgeMonths !== 0) {
				if (minAgeMonths === 6 && minAgeYears === 1) {
					return `18 months - ${maxAgeYears} years, ${maxAgeMonths} months`;
				}
				if (minAgeMonths === 0) {
					return `${minAgeYears} years - ${maxAgeYears} years, ${maxAgeMonths} months`;
				}
				if (minAgeYears === 0)
					// minAgeMonths !== 0 always true here
					return `${minAgeMonths} months - ${maxAgeYears} years, ${maxAgeMonths} months`;
			}
		}
	}
};
