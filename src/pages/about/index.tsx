// index.tsx
import { blurb } from '../api/data/blurb';

export default function About() {
	interface Body {
		subTitle: string;
		body: string;
		links?: Array<{
			linkText: string;
			linkUrl: string;
		}>;
	}

	const renderText = (body: string) => {
		// destructure body and links from text
		if (!body) return;
		// split at render each new line and return as array
		const paragraphs = body.split('\n').map((str, idx) => str);
		// render text as a paragraph
		return paragraphs;
	};

	// render links as anchor tags
	const renderLinks = (body: string, links?: Body['links']) => {
		const renderedBody = renderText(body);
		if (!links || !renderedBody) return renderedBody;

		const bodyWithLinks = renderedBody.map((paragraph, idx) => {
			let updatedParagraph = paragraph;
			links.forEach((link) => {
				if (!updatedParagraph) return;
				updatedParagraph = updatedParagraph.replace(
					link.linkText,
					`<a href="${link.linkUrl}">${link.linkText}</a>`
				);
			});
			return updatedParagraph;
		});
		return (
			<>
				{bodyWithLinks.map((paragraph, idx) => (
					<p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
				))}
			</>
		);
	};

	const sections = blurb.sections.map((section, index) => (
		<div key={index}>
			<h2>{section.subTitle}</h2>
			{renderLinks(section.body, section.links)}
		</div>
	));

	return <>{sections}</>;
}
