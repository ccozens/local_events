import { useCombobox } from 'downshift';
import { useState, useEffect } from 'react';
import styles from '@/styles/Locations.module.css';
import { EventWithLocation } from '@/types/EventWithLocation';

interface EventsSearchProps {
	eventList: EventWithLocation[];
	handleSelect: (eventName: string) => void;
}

export default function EventsSearch({
	eventList,
	handleSelect,
}: EventsSearchProps) {
	const eventNames = eventList.map((event) => {
		return event.name;
	});

	function getNamesFilter(inputValue?: string) {
		const lowerCaseInputValue = (inputValue || '').toLowerCase();
		return function namesFilter(event: string) {
			return (
				!inputValue ||
				event.toLowerCase().includes(lowerCaseInputValue)
			);
		};
	}

	function ComboBox() {
		const [items, setItems] = useState(eventNames);
		useEffect(() => {
			setItems(eventNames);
		}, []);

		const { isOpen, getMenuProps, getInputProps, getItemProps } =
			useCombobox({
				onInputValueChange({ inputValue }) {
					setItems(eventNames.filter(getNamesFilter(inputValue)));
				},
				items,
				itemToString(item) {
					return item ? item : '';
				},
			});

		const itemsMap = items.map((item, index) => (
			<li
				className={styles.suggestion}
				key={`${item}${index}`}
				{...getItemProps({ item, index })}
				onClick={() => {
					handleSelect(item);
				}}>
				<span>{item}</span>
			</li>
		));

		return (
			<div>
				<div>
					<div>
						<input
							className={styles.input}
							aria-label="Search for an event"
							placeholder="Search for an event"
							{...getInputProps()}
						/>
					</div>
				</div>
				<ul {...getMenuProps()}>{isOpen && itemsMap}</ul>
			</div>
		);
	}
	return <ComboBox />;
}
