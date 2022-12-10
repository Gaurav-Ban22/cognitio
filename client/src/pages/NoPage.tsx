import { Link } from "react-router-dom";

function NoPage() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", textDecorationColor: "blue" }}>
            <h1><Link to="/">Page not found, back to home?</Link></h1>
        </div>
    )
}

export default NoPage