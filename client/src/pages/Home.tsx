import { Link } from "react-router-dom";
import { SetData } from "../types";

function Home({ sets }: { sets: Map<string, SetData> }) {
  return (
    <div>
      <h1>Welcome to Cognitio!</h1>
      {Array.from(sets.entries()).map(set => <Link to={"/sets/" + set[0] + "/"}>{set[0]}</Link>)}
    </div>
  );
}

export default Home;
