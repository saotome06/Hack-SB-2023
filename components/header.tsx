import { useRouter } from "next/router";
import styles from "../styles/loading.module.css";

export default function Header() {
  const router = useRouter();
  let page_title = "Home";
  if (router.pathname == "/") {
    page_title = "笑☆顔☆王";
  } else if (router.pathname == "/gacha") {
    page_title = "笑顔ガチャ";
  } else if (router.pathname == "/ranking") {
    page_title = "笑顔ランキング";
  } else if (router.pathname == "/createCard") {
    page_title = "カード作成";
  }

  return (
    <>
      <div className={styles.head}>
        <img
          src="./logo.png"
          width="60px"
          style={{
            position: "fixed",
          }}
        />
        <h2
          style={{
            width: "100%",
            maxWidth: "100%",
            textAlign: "center",
            margin: "auto",
            fontFamily: "Helvetica, Arial, sans-serif",
            position: "fixed",
            top: "15px",
          }}
        >
          {page_title}
        </h2>
      </div>
      <div style={{ height: "60px" }}></div>
    </>
  );
}
