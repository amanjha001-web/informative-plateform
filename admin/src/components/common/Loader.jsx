import { Loader2 } from "lucide-react";

const Loader = ({ size = "md", text = "", fullScreen = false }) => {
  const content = (
    <div className={`ui-loader ui-loader--${size}`}>
      <Loader2 className="ui-loader__spinner" />

      {text && <span className="ui-loader__text">{text}</span>}
    </div>
  );

  if (fullScreen) {
    return <div className="ui-loader__fullscreen">{content}</div>;
  }

  return content;
};

export default Loader;
