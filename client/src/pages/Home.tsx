import { Link } from "react-router-dom";
import { SetData } from "../types";

function Home({ sets }: { sets: Map<string, SetData> }) {
  return (
    <div>
      <h1>Hello World!</h1>
      {Array.from(sets.entries()).map(set => <Link to={"/sets/" + set[0] + "/"}>asdf</Link>)}
    </div>
  );
}

export default Home;
