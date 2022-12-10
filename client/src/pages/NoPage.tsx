import { Link } from "react-router-dom";

function NoPage() {
    return (
        <div>
            <h1>Look's like nothing was found here</h1>
            <Link to="/">Back to home?</Link>
        </div>
    )
}

export default NoPage