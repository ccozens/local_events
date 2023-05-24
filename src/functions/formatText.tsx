	export interface Body {
		subTitle: string;
		body: string;
		links?: Array<{
			linkText: string;
			linkUrl: string;
		}>;
	}
	
	export const replaceBullets = (body: string) => {
		if (!body) return;
		const bodyWithBullets = body.replaceAll('\b', '•');
		return bodyWithBullets;
	};

	export const splitParagraphs = (body: string) => {
		if (!body) return;
		// replace bullets with unicode bullet
		const bodyWithBullets = replaceBullets(body);
		if (!bodyWithBullets) return;
		// split at each new line and return as array
		const paragraphs = bodyWithBullets.split('\n').map((str) => str);
		// render text as a paragraph
		return paragraphs;
	};

	// convert array of strings to <p> elements
	export const renderParagraphs = (body: string) => {
		const paragraphs = splitParagraphs(body);
		if (!paragraphs) return;
		return (
			<>
				{paragraphs.map((paragraph, idx) => (
					<p key={idx}>{paragraph}</p>
				))}
			</>
		);
	};

	// render links as anchor tags
	export const renderLinks = (body: string, links?: Body['links']) => {

		// split into paragraphs (<p> elements)
		const bodyWithParagraphs = splitParagraphs(body);
		// return as <p> elements if no links
		if (!links) return renderParagraphs(body);

		// null check
		if (!bodyWithParagraphs) return;
		// replace link text with anchor tags
		const bodyWithLinks = bodyWithParagraphs.map((paragraph) => {
			let updatedParagraph = paragraph;
			links.forEach((link) => {
				// return if no data
				if (!updatedParagraph) return;
				// replace link text with anchor tag
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
					<p
						key={idx}
						dangerouslySetInnerHTML={{ __html: paragraph }}></p>
				))}
			</>
		);
	};