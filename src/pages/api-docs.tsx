import 'swagger-ui-react/swagger-ui.css';
import dynamic from 'next/dynamic';
import { SwaggerUIProps } from 'swagger-ui-react';
import styles from '@/styles/ApiDoc.module.css';

const SwaggerUI = dynamic<SwaggerUIProps>(
	import('swagger-ui-react'),
	{
		ssr: false,
	}
);

function ApiDoc() {
	return (
		<div className={styles.swaggerContainer}>
			<SwaggerUI url="/api/docs" />
		</div>
	);
}

export default ApiDoc;
