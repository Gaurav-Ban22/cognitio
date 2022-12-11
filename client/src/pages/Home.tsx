import { Link } from "react-router-dom";
import SetPreview from "../components/SetPreview";
import { SetData } from "../types";

function Home({ sets }: { sets: Map<string, SetData> }) {
  return (
    <div style={{ padding: "1%", display: "flex", flexDirection: "column" }}>
      <h1>Welcome to Cognitio!</h1>
      <h2>Check out these sets</h2>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {Array.from(sets.entries()).map(set => <Link to={"/sets/" + set[0] + "/"}><SetPreview id={set[0]} /></Link>)}
      </div>
    </div>
  );
}

export default Home;
