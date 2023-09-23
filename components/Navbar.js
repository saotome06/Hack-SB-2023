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
          <Link href="/Ranking">Ranking</Link>
        </li>
        <li>
          <Link href="/openai_api_test">test</Link>
        </li>
      </ul>
    </nav>
  );
}
