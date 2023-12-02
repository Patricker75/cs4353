import styles from "./Landing.module.css";
import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {

    return (
        <>
        <h1 className={styles["page-header"]}>Fuel Wholesale</h1>

        <div className={styles["button-container"]}>
        <Link className={styles["button-login"]} to="/login">
            <button>Log In to Account</button>
        </Link>
        <Link className={styles["button-register"]} to="/register">
            <button>Register an Account</button>
        </Link>
        </div>
        </>
    );
};

export default Landing;