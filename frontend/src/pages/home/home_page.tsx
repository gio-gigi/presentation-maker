import { Link } from "react-router-dom";
import { PresentationTile } from "../../components/presentation_tile/presentation_tile";
import { usePresentationList } from "../../hooks/usePresentationList";
import "./home_page.css";
import { NavBar } from "../../components/nav_bar/nav_bar";
import { FullPageLoader } from "../../components/full_page_loader/full_page_loader";
import { useConfirmMessage } from "../../contexts/confirm_message_context";
import { InfoModal } from "../../components/info_modal/info_modal";

export const HomePage = () => {
  const { status, presentations } = usePresentationList();
  const { message, isVisible } = useConfirmMessage();
  const { hideMessage } = useConfirmMessage();
  if (status.status === "loading") {
    return <FullPageLoader />;
  }
  if (status.status === "error") {
    return <div>Error: {status.message}</div>;
  }
  return (
    <div className="home-page">
      {
        isVisible && (
          <InfoModal message={message} callback={hideMessage} isAlert={false}/>
        )
      
      }
      <NavBar />
      <div className="presentation_list">
        {presentations.map((presentation) => (
          <PresentationTile key={presentation.id} presentation={presentation} />
        ))}
      </div>
    </div>
  );
};
