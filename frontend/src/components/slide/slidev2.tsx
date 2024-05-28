import MDEditor from "@uiw/react-md-editor";
import { SlideV2Entity } from "../../infrastructure/entities/presentation_preview_entity";

interface SlideV2Props {
  slide: SlideV2Entity;
}

export const SlideV2 = ({ slide }: SlideV2Props) => {
  return (
    <div
      style={{
        width: "60%",
        aspectRatio: 2 / 1,
        border: "black",
        display: "inline-block",
        marginBottom: 30,
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 10,
        padding: 20,
        overflow: "hidden",
      }}
    >
      <MDEditor.Markdown
        source={slide.content}
        style={{ background: "none" }}
      />
    </div>
  );
};
