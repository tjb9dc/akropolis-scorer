import "./App.css";
import marble1 from "./assets/styling/marble-1.jpg";
import { ScoreCard } from "./scorecard/ScoreCard";

function App() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(${marble1})`,
        backgroundRepeat: "repeat",
        backgroundSize: "1920px 979px",
      }}
    >
      <ScoreCard />
    </div>
  );
}

export default App;
