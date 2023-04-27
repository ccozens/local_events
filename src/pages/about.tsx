
import { usePathname } from 'next/navigation';

export default function About() {
  const pathname = usePathname();
  return <>Current pathname: {pathname}</>;
}
