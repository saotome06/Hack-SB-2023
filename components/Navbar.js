import Link from "next/link";
import styles from "../styles/loading.module.css";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  console.log(router.pathname);

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link
            href="/"
            className={
              router.pathname == "/" ? styles.nav_type0 : styles.nav_type1
            }
          >
            HOMT
          </Link>
        </li>
        <li>
          <Link
            href="/ranking"
            className={
              router.pathname == "/ranking"
                ? styles.nav_type0
                : styles.nav_type1
            }
          >
            RANKING
          </Link>
        </li>
        <li>
          <Link
            href="/gacha"
            className={
              router.pathname == "/gacha" ? styles.nav_type0 : styles.nav_type1
            }
          >
            GACHA
          </Link>
        </li>
      </ul>
    </nav>
  );
}
