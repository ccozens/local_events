import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import Layout from '@/components/Layout';
import { Inter } from 'next/font/google';
import { clarity } from 'react-microsoft-clarity';
import { useEffect } from 'react';

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const inter = Inter({
	subsets: ['latin'],
});

export default function App({
	Component,
	pageProps,
}: AppPropsWithLayout) {
	useEffect(() => {
		clarity.init(process.env.NEXT_PUBLIC_CLARITY_ID || '');
	}, []);

	return (
		<div className={inter.className}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</div>
	);
}
