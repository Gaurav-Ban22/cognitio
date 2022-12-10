import { Button } from "@material-ui/core";
import { User } from "firebase/auth";

export default function AuthButton({
    currUser,
    login,
    logout,
}: { currUser: User | null, login: () => {}, logout: () => {} }) {
    return (
        <>
            {currUser ? (
                <Button
                    variant="contained"
                    color="primary"
                    style={{ float: "right" }}
                    onClick={logout}
                >
                    Log Out
                </Button>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    style={{ float: "right" }}
                    onClick={login}
                >
                    Sign in
                </Button>
            )}
        </>
    );
}