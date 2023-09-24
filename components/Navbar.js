import Link from "next/link";
import styles from "../styles/loading.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/">Top</Link>
        </li>
        <li>
          <Link href="/myCard">MyCard</Link>
        </li>
        <li>
          <Link href="/ranking">Ranking</Link>
        </li>
        <li>
          <Link href="/gacha">Gacha</Link>
        </li>
      </ul>
    </nav>
  );
}
