// blurb.ts
export interface Blurb {
	sections: Array<{
		subTitle: string;
		body: string;
		links?: Array<{
			linkText: string;
			linkUrl: string;
		}>;
	}>;
}

export const blurb: Blurb = {
	sections: [
		{
			subTitle: 'What is Weekly Events?',
			body: 'Weekly Events is a website focussed on activities for young children that occur on a weekly basis. There is no reason it cannot be for older people, it is simply that I wanted a resource for my family. Currently it is Leicester-centred, because I live here. It can be used elsewhere, but I would need to add geolocation.',
		},
		{
			subTitle: 'Why build it?',
			body: 'Two reasons: \n 1. I wanted this resource to exist. I recently moved to Leicester with young children, and want it to be easy to find things to do with them. \n2. I am learning software engineering (specifically web dev) and this is a great practice project.',
		},
		{
			subTitle: 'Can it do .....?',
			body: 'Yes probably! If you have any suggestions for tweaks or features, please get in touch.',
			links: [
				{
					linkText: 'get in touch',
					linkUrl: '/contact',
				},
			],
		},
		{
			subTitle: 'What else are you thinking of adding?',
			body: "I've a list, including (in no particular order): \n\b Add geolocation, so you can view events near you \n\b Add a login, so events can only be edited by logging in (to reduce spam and add user feedback) \n\b add event list to each location page \n\b add search for event by location. \nGet in touch if you've more ideas, or want to get involved.",
			links: [
				{
					linkText: 'Get in touch',
					linkUrl: '/contact',
				},
			],
		},
		{
			subTitle: "What's next?",
			body: "I'm building other projects and applying for jobs! I'm much, much better at working on real life projects than tutorials/dummy projects, so if you have any ideas for projects, or if you'd like to work with me, please feel free to get in touch.",
			links: [
				{
					linkText: 'get in touch',
					linkUrl: '/contact',
				},
			],
		},
		{
			subTitle: "What's the tech stack?",
			body: "This website is built with NextJS and TypeScript. The database is a postgres database hosted at supabase and using Prisma as ORM. It is hosted at Vercel. The code is available on GitHub - if you're interested in reviewing it or helping out, do get in touch.",
			links: [
				{ linkText: 'NextJS', linkUrl: '/nextjs' },
				{
					linkText: 'TypeScript',
					linkUrl: 'https://www.typescriptlang.org/',
				},
				{
					linkText: 'postgres',
					linkUrl: 'https://www.postgresql.org/about/',
				},
				{ linkText: 'supabase', linkUrl: 'https://supabase.com/' },
				{ linkText: 'Prisma', linkUrl: '/prisma' },
				{
					linkText: 'ORM',
					linkUrl:
						'https://www.prisma.io/dataguide/types/relational/what-is-an-orm#:~:text=An%20ORM%2C%20or%20Object%20Relational,used%20in%20object%2Doriented%20programming',
				},
				{ linkText: 'Vercel', linkUrl: '/vercel' },
				{
					linkText: 'GitHub',
					linkUrl: 'https://github.com/ccozens/weekly_events',
				},
				{ linkText: 'get in touch', linkUrl: '/contact' },
			],
		},
	],
};
