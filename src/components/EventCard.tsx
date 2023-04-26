import Router from 'next/router';
import { Event } from '@prismatypes';

export default function EventCard({ event }: { event: Event }) {
	const {name, description, id} = event;
	return (
		<div className="card">
			<div className="card-header">
				<h3 className="card-header-title">{name}</h3>
			</div>
			<div className="card-content">
				<div className="content">
                    <p>{description? description : ''}</p>
                    <p>{id}</p>
					<p>Start</p>
					<p>End</p>
					<p>last edited (time and person)</p>
					<p>click to update</p>
				</div>
			</div>

			<footer className="card-footer">
				<a
					href="#"
					className="card-footer-item"
					onClick={() => Router.push("/events/[id]", `/events/${event.id}`)}>
					View
				</a>

			</footer>
		</div>
	);
}
