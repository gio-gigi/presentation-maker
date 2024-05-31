import MDEditor, {
  ICommand,
  TextAreaTextApi,
  TextState,
  commands,
} from "@uiw/react-md-editor";
import { useState } from "react";
import { SlideV2 } from "../../components/slide/slidev2";
import { BackButton } from "../../components/back_button/back_button";
import { useUploadPresentationV2 } from "../../hooks/useUploadPresentationV2";
import { useConfirmMessage } from "../../contexts/confirm_message_context";
import { useNavigate } from "react-router-dom";
import { APIRequestStatusEnum } from "../../constants/api_request";
import { FullPageLoader } from "../../components/full_page_loader/full_page_loader";
import './presentation_maker_page.css';

export const PresentationMakerPageV2 = () => {
  const [slides, setSlides] = useState<string[]>([""]);
  const [color, setColor] = useState<string>("#000000");
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const { status, uploadPresentation } = useUploadPresentationV2();
  const navigate = useNavigate();
  const { showMessage } = useConfirmMessage();

  const updateSlides = (index: number, content: string) => {
    setSlides(slides.map((slide, i) => (i === index ? content : slide)));
  };

  if (status.status === APIRequestStatusEnum.SUCCESS) {
    showMessage("Presentacion subida con exito");
    navigate("/", { replace: true });
  }

  if (status.status === APIRequestStatusEnum.LOADING) {
    return <FullPageLoader></FullPageLoader>;
  }

  const handleUpload = () => {
    if (slides.length === 0) return;
    const content = JSON.stringify(
      slides.map((slide, index) => ({ pageNumber: index, content: slide }))
    );
    const regex =
      /<[^>]*>|`[^`]*`|__([^_]+)__|\*\*([^*]+)\*\*|~~([^~]+)~~|\*([^*]+)\*|_([^_]+)_|!\[[^\]]*\]\([^)]*\)|\[[^\]]*\]\([^)]*\)|#{1,6}\s*|>\s*|\n-{3,}|\n={3,}/g;

    const title = slides[0].replace(regex, (match, p1, p2, p3, p4, p5) => {
      return p1 || p2 || p3 || p4 || p5 || "";
    });

    uploadPresentation(content, title);
  };

  return (
    <div style={{ height: "100vh", width: "100vw", paddingTop: 50 }}>
      <BackButton />
      <MDEditor
        value={slides[currentSlide]}
        onChange={(value: string | undefined) =>
          updateSlides(currentSlide, value || "")
        }
        commands={[
          commands.bold,
          commands.italic,
          commands.strikethrough,
          commands.hr,
          commands.title,
          commands.divider,
          {
            name: "color",
            keyCommand: "color",
            buttonProps: { "aria-label": "Insert color" },
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V3ZM5 5V19H19V5H5Z"
                  fill="currentColor"
                />
              </svg>
            ),
            execute: (state: TextState, api: TextAreaTextApi) => {
              if (!state.selectedText) return;
              let modifyText = `<span style="color: ${color}">${
                state.selectedText || "text"
              }</span>`;
              api.replaceSelection(modifyText);
            },
          },
        ]}
      />
      <button
        onClick={() => {
          setSlides([
            ...slides.slice(0, currentSlide + 1),
            "",
            ...slides.slice(currentSlide + 1),
          ]);
          setCurrentSlide(currentSlide + 1);
        }}
      >
        Add slide
      </button>
      <button
        onClick={() => {
          setCurrentSlide(Math.min(currentSlide, slides.length - 2));
          setSlides(slides.filter((_, index) => index !== currentSlide));
        }}
      >
        Remove slide
      </button>
      <button
        onClick={() => {
          setCurrentSlide(Math.max(0, currentSlide - 1));
        }}
      >
        Previous slide
      </button>
      <button
        onClick={() => {
          setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1));
        }}
      >
        Next slide
      </button>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <div style={{ width: "100%", textAlign: "center" }}>
        {slides.map((slide, index) => {
          return <SlideV2 id={`slide-${index}`} slide={{ content: slide }} />;
        })}
      </div>
      {slides.length > 0 && (
        <button className="upload-button" onClick={handleUpload}>
          Subir Presentacion
        </button>
      )}
    </div>
  );
};
