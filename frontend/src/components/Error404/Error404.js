import styles from "./Error404.module.css";
import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div>
      <h1 className={styles["page-header"]}>404 - Page Not Found</h1>
      <p className={styles["parar"]}>The page you're looking for doesn't exist.</p>
      <p className={styles["parar"]}>Aww, going to cry little baby?</p>
      <Link className={styles["button-home"]} to="/">
            <button>Go Back to Home</button>
        </Link>
    </div>
  );
};

export default Error404;