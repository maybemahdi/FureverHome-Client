/* eslint-disable react/prop-types */
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import "./TipTap.css";
import {
  FaBold,
  FaHeading,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
} from "react-icons/fa";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <div>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is_active" : ""}
        >
          <FaBold />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is_active" : ""}
        >
          <FaItalic />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is_active" : ""}
        >
          <FaUnderline />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is_active" : ""}
        >
          <FaStrikethrough />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is_active" : ""
          }
        >
          <FaHeading />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is_active" : ""
          }
        >
          <FaHeading className="heading3" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is_active" : ""}
        >
          <FaListUl />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is_active" : ""}
        >
          <FaListOl />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is_active" : ""}
        >
          <FaQuoteLeft />
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <FaUndo />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

const TiptapEditor = forwardRef((props, ref) => {
  const { setDescription, defaultValue } = props;
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Write your long description here...",
      }),
    ],
    content: defaultValue,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setDescription(html);
    },
  });

  useImperativeHandle(ref, () => ({
    clearContent() {
      editor.commands.clearContent();
    },
  }));
  
  useEffect(() => {
    if (editor && defaultValue) {
      editor.commands.setContent(defaultValue);
    }
  }, [editor, defaultValue]);

  return (
    <div className="textEditor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="focus:outline-none h-full" />
    </div>
  );
});
TiptapEditor.displayName = "TiptapEditor"; // Adding display name
export default TiptapEditor;
