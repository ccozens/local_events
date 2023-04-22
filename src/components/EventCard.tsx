import React from 'react';
import Router from 'next/router';
// import ReactMarkdown from 'react-markdown';
import { Event } from '@prismatypes';

export default function EventCard({ event }: { event: Event }) {
	console.log(event);
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
