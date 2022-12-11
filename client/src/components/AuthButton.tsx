import { Button } from "@material-ui/core";
import { User } from "firebase/auth";

export default function AuthButton({
    currUser,
    login,
    logout,
}: { currUser: User | null, login: () => {}, logout: () => {} }) {
    return (
        <div style={{ alignItems: "right", overflow: "hidden" }}>
            {currUser ? (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={logout}
                >
                    Log Out
                </Button>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={login}
                >
                    Sign in with Google
                </Button>
            )}
        </div>
    );
}