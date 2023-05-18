import React from 'react';

export const descriptionToDisplay = (description: string | null) => {
	if (description && description.length > 100) {
		return (
			<React.Fragment>{description.slice(0, 100)}...</React.Fragment>
		);
	}
	if (description && description.length < 100) {
		return description;
	}
	if (!description) {
		return <React.Fragment>No description provided.</React.Fragment>;
	}
};
