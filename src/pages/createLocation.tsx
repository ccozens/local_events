import styles from '@/styles/Form.module.css';
/* list locations
export const getStaticProps: GetStaticProps = async () => {
	const locations = await prisma.location.findMany({
		// no args = return all
	});
	return {
		props: { locations: JSON.parse(JSON.stringify(locations)) },
		revalidate: 10,
	};
}; */
// pass props: {
// 	locations: Location[];
// }): ReactElement 
// into createLocation

export default function createLocation () {

    return (
        <div>
            Create Location
        </div>
    )
}