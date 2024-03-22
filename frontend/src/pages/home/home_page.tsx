import { Link } from "react-router-dom";
import { PresentationTile } from "../../components/presentation_tile/presentation_tile";
import { usePresentationList } from "../../hooks/usePresentationList";
import "./home_page.css";
import { NavBar } from "../../components/nav_bar/nav_bar";
import { FullPageLoader } from "../../components/full_page_loader/full_page_loader";

export const HomePage = () => {
  const { status, presentations } = usePresentationList();
  if (status.status === "loading") {
    return <FullPageLoader />;
  }
  if (status.status === "error") {
    return <div>Error: {status.message}</div>;
  }
  return (
    <div className="home-page">
      <NavBar />
      <div className="presentation_list">
        {presentations.map((presentation) => (
          <PresentationTile key={presentation.id} presentation={presentation} />
        ))}
      </div>
    </div>
  );
};
