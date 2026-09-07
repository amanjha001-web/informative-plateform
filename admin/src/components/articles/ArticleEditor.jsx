import { useRef } from "react";
import { Bold, Italic, Link, List, ListOrdered } from "lucide-react";

const ArticleEditor = ({
  value = "",
  onChange,
  placeholder = "Write your article content...",
  error = "",
}) => {
  const editorRef = useRef(null);

  const execCommand = (command, commandValue = null) => {
    editorRef.current?.focus();

    document.execCommand(command, false, commandValue);

    const content = editorRef.current?.innerHTML || "";

    onChange?.(content);
  };

  const handleInput = (event) => {
    onChange?.(event.currentTarget.innerHTML);
  };

  const handleLink = () => {
    const url = window.prompt("Enter URL:");

    if (!url) {
      return;
    }

    execCommand("createLink", url);
  };

  return (
    <div className={`article-editor ${error ? "article-editor--error" : ""}`}>
      <div className="article-editor__toolbar">
        <button
          type="button"
          className="article-editor__tool"
          onClick={() => execCommand("bold")}
          title="Bold"
          aria-label="Bold"
        >
          <Bold size={17} />
        </button>

        <button
          type="button"
          className="article-editor__tool"
          onClick={() => execCommand("italic")}
          title="Italic"
          aria-label="Italic"
        >
          <Italic size={17} />
        </button>

        <span className="article-editor__separator" />

        <button
          type="button"
          className="article-editor__tool"
          onClick={() => execCommand("insertUnorderedList")}
          title="Bullet list"
          aria-label="Bullet list"
        >
          <List size={18} />
        </button>

        <button
          type="button"
          className="article-editor__tool"
          onClick={() => execCommand("insertOrderedList")}
          title="Numbered list"
          aria-label="Numbered list"
        >
          <ListOrdered size={18} />
        </button>

        <button
          type="button"
          className="article-editor__tool"
          onClick={handleLink}
          title="Insert link"
          aria-label="Insert link"
        >
          <Link size={17} />
        </button>
      </div>

      <div
        ref={editorRef}
        className="article-editor__content"
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: value }}
      />

      {error && <p className="article-editor__error">{error}</p>}
    </div>
  );
};

export default ArticleEditor;
