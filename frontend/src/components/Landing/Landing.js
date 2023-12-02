import styles from "./Landing.module.css";

const Landing = () => {

    return (
        <>
        <h1 className="page-header">Welcome Motherfucker</h1>

        <Link id={styles["link-login"]} to="/">
        Log In to Account
        </Link>
        <Link id={styles["link-register"]} to="/register">
        Create an Account
        </Link>
        </>
    );
}

export default Landing;