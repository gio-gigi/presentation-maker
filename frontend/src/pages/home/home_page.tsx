import { Link } from "react-router-dom";
import { PresentationTile } from "../../components/presentation_tile/presentation_tile";
import { usePresentationList } from "../../hooks/usePresentationList";
import "./home_page.css";

export const HomePage = () => {
  const { status, presentations } = usePresentationList();
  if (status.status === "loading") {
    return <div>Loading...</div>;
  }
  if (status.status === "error") {
    return <div>Error: {status.message}</div>;
  }
  return (
    <div className="home-page">
      <Link to="/presentation/maker">Upload</Link>
      <div className="presentation_list">
        {presentations.map((presentation) => (
          <PresentationTile key={presentation.id} presentation={presentation} />
        ))}
      </div>
    </div>
  );
};
