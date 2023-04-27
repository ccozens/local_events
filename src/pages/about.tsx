/* export default function About () {

    return (
        <div>
            <h1>About</h1>
            
        </div>
    )
} */

import { usePathname } from 'next/navigation';

export default function About() {
  const pathname = usePathname();
  return <>Current pathname: {pathname}</>;
}
