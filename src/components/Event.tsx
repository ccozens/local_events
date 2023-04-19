import React from 'react';
import Router from 'next/router';
// import ReactMarkdown from 'react-markdown';
import { Event } from '@prismatypes';

export default function EventCard({ event }: { event: Event }) {
	const title = event.name;
    const description = event.description ? event.description : '';

	return (
		<div className="card">
			<div className="card-header">
                <h2>here</h2>
				<h3 className="card-header-title">{title}</h3>
			</div>
			<div className="card-content">
				<div className="content">
					{/* <ReactMarkdown source={description} /> */}
                    <p>{description}</p>
				</div>
			</div>
			<footer className="card-footer">
				<a
					href="#"
					className="card-footer-item"
					onClick={() => Router.push(`/events/${event.id}`)}>
					View
				</a>
			</footer>
		</div>
	);
}
