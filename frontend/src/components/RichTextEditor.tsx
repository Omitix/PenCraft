import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";

interface RichTextEditorProps {
    content: string;
    onChange: (html: string) => void;
    placeholder?: string;
}

export const RichTextEditor = ({
    content,
    onChange,
    placeholder = "Write your story...",
}: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Image.configure({
                inline: false,
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "link link-primary",
                },
            }),
            Highlight,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Typography,
            TextStyle,
            Color,
            Underline,
            Placeholder.configure({
                placeholder,
            }),
        ],
        content,
        editorProps: {
            attributes: {
                class:
                    "prose prose-sm sm:prose-base max-w-none outline-0 min-h-64 px-4 py-3",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        immediatelyRender: false,
    });

    const addImage = () => {
        const url = window.prompt("Enter image URL:");
        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        const previousUrl = editor?.getAttributes("link").href;
        const url = window.prompt("Enter URL:", previousUrl || "");

        if (url === null) return;

        if (url === "") {
            editor?.chain().focus().extendMarkRange("link").unsetLink().run();
        } else {
            editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }
    };

    if (!editor) {
        return null;
    }

    return (
        <div className="border border-base-300 rounded-xl overflow-hidden focus-within:border-primary transition-colors">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-2 border-b border-base-300 bg-base-200">
                {/* Heading */}
                <div className="join">
                    <button
                        type="button"
                        className={`join-item btn btn-xs btn-ghost ${editor.isActive("heading", { level: 1 }) ? "btn-active" : ""
                            }`}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        title="Heading 1"
                    >
                        H1
                    </button>
                    <button
                        type="button"
                        className={`join-item btn btn-xs btn-ghost ${editor.isActive("heading", { level: 2 }) ? "btn-active" : ""
                            }`}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        title="Heading 2"
                    >
                        H2
                    </button>
                    <button
                        type="button"
                        className={`join-item btn btn-xs btn-ghost ${editor.isActive("heading", { level: 3 }) ? "btn-active" : ""
                            }`}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        title="Heading 3"
                    >
                        H3
                    </button>
                </div>

                <div className="divider divider-horizontal mx-0 h-6"></div>

                {/* Bold / Italic / Underline */}
                <button
                    type="button"
                    className={`btn btn-xs btn-ghost ${editor.isActive("bold") ? "btn-active" : ""
                        }`}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    title="Bold"
                >
                    <strong>B</strong>
                </button>
                <button
                    type="button"
                    className={`btn btn-xs btn-ghost italic ${editor.isActive("italic") ? "btn-active" : ""
                        }`}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    title="Italic"
                >
                    I
                </button>
                <button
                    type="button"
                    className={`btn btn-xs btn-ghost underline ${editor.isActive("underline") ? "btn-active" : ""
                        }`}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    title="Underline"
                >
                    U
                </button>

                <div className="divider divider-horizontal mx-0 h-6"></div>

                {/* Highlight / Color */}
                <button
                    type="button"
                    className={`btn btn-xs btn-ghost ${editor.isActive("highlight") ? "btn-active" : ""
                        }`}
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                    title="Highlight"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.12 2.87a3 3 0 014.24 0l2.83 2.83a3 3 0 010 4.24l-8.49 8.49-7.07-7.07 8.49-8.49zM3.07 19.79a1.5 1.5 0 012.12 0l1.06 1.06-2.12 2.12-1.06-1.06a1.5 1.5 0 010-2.12z" />
                    </svg>
                </button>
                <input
                    type="color"
                    className="w-6 h-6 rounded cursor-pointer"
                    onInput={(e) =>
                        editor.chain().focus().setColor(e.currentTarget.value).run()
                    }
                    value={editor.getAttributes("textStyle").color || "#000000"}
                    title="Text Color"
                />

                <div className="divider divider-horizontal mx-0 h-6"></div>

                {/* Text Align */}
                <button
                    type="button"
                    className={`btn btn-xs btn-ghost ${editor.isActive({ textAlign: "left" }) ? "btn-active" : ""
                        }`}
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    title="Align Left"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 3h18v2H3V3zm0 6h12v2H3V9zm0 6h18v2H3v-2zm0 6h12v2H3v-2z" />
                    </svg>
                </button>
                <button
                    type="button"
                    className={`btn btn-xs btn-ghost ${editor.isActive({ textAlign: "center" }) ? "btn-active" : ""
                        }`}
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    title="Align Center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 3h18v2H3V3zm4 6h10v2H7V9zm-4 6h18v2H3v-2zm4 6h10v2H7v-2z" />
                    </svg>
                </button>
                <button
                    type="button"
                    className={`btn btn-xs btn-ghost ${editor.isActive({ textAlign: "right" }) ? "btn-active" : ""
                        }`}
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    title="Align Right"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 rotate-180" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 3h18v2H3V3zm6 6h12v2H9V9zm-6 6h18v2H3v-2zm6 6h12v2H9v-2z" />
                    </svg>
                </button>

                <div className="divider divider-horizontal mx-0 h-6"></div>

                {/* List / Blockquote / Code */}
                <button
                    type="button"
                    className={`btn btn-xs btn-ghost ${editor.isActive("bulletList") ? "btn-active" : ""
                        }`}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    title="Bullet List"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 4h2v2H3V4zm0 7h2v2H3v-2zm0 7h2v2H3v-2zm4-13h14v2H7V5zm0 7h14v2H7v-2zm0 7h14v2H7v-2z" />
                    </svg>
                </button>
                <button
                    type="button"
                    className={`btn btn-xs btn-ghost ${editor.isActive("orderedList") ? "btn-active" : ""
                        }`}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    title="Ordered List"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 3h2v2H3V3zm0 6h2v2H3V9zm0 6h2v2H3v-2zm3-11h16v2H6V4zm0 6h16v2H6v-2zm0 6h16v2H6v-2zM3 21h2v-2H3v2zm3-2h16v-2H6v2z" />
                    </svg>
                </button>
                <button
                    type="button"
                    className={`btn btn-xs btn-ghost ${editor.isActive("blockquote") ? "btn-active" : ""
                        }`}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    title="Blockquote"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                    </svg>
                </button>
                <button
                    type="button"
                    className={`btn btn-xs btn-ghost ${editor.isActive("codeBlock") ? "btn-active" : ""
                        }`}
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    title="Code Block"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                    </svg>
                </button>

                <div className="divider divider-horizontal mx-0 h-6"></div>

                {/* Link / Image */}
                <button
                    type="button"
                    className={`btn btn-xs btn-ghost ${editor.isActive("link") ? "btn-active" : ""
                        }`}
                    onClick={setLink}
                    title="Add Link"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
                    </svg>
                </button>
                <button
                    type="button"
                    className="btn btn-xs btn-ghost"
                    onClick={addImage}
                    title="Add Image"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                    </svg>
                </button>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} />
        </div>
    );
};