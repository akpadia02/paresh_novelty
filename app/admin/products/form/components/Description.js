import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

const Description = ({ data, handleData }) => {
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty() // Initialize with an empty editor state
  );

  // Handle editor state changes
  const handleChange = (newState) => {
    setEditorState(newState);
    const content = newState.getCurrentContent().getPlainText();
    handleData('description', content); // Pass the plain text content to the parent component
  };

  // Apply rich text formatting
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  // Apply inline style (e.g., bold, italic, underline)
  const applyInlineStyle = (style) => {
    handleChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  // Apply block style (e.g., headers, lists)
  const applyBlockType = (blockType) => {
    handleChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <section className="flex flex-col gap-4 p-3 bg-[#fbe1e3]  border rounded-xl shadow-md">
      <h1 className="font-semibold">Description</h1>
      <div className="p-4 bg-white rounded-lg shadow-inner border">
        {/* Toolbar */}
        <div className="toolbar flex flex-wrap gap-3 mb-4 bg-gray-100 p-3 rounded-md shadow-sm border">
          <button
            className="p-2 rounded bg-[#fbe1e3]  hover:bg-[#FEC4C7] font-semibold shadow transition"
            onClick={() => applyInlineStyle('BOLD')}
          >
            B
          </button>
          <button
            className="p-2 rounded bg-[#fbe1e3]  hover:bg-[#FEC4C7] font-semibold shadow transition"
            onClick={() => applyInlineStyle('ITALIC')}
          >
            I
          </button>
          <button
            className="p-2 rounded bg-[#fbe1e3]  hover:bg-[#FEC4C7] font-semibold shadow transition"
            onClick={() => applyInlineStyle('UNDERLINE')}
          >
            U
          </button>
          {/* <button
            className="p-2 rounded bg-[#fbe1e3]  hover:bg-[#FEC4C7] font-semibold shadow transition"
            onClick={() => applyBlockType('header-one')}
          >
            H1
          </button> */}
          <button
            className="p-2 rounded bg-[#fbe1e3]  hover:bg-[#FEC4C7] font-semibold shadow transition"
            onClick={() => applyBlockType('unordered-list-item')}
          >
            UL
          </button>
          <button
            className="p-2 rounded bg-[#fbe1e3]  hover:bg-[#FEC4C7] font-semibold shadow transition"
            onClick={() => applyBlockType('ordered-list-item')}
          >
            OL
          </button>
        </div>
        {/* Draft.js Editor */}
        <div className="editor-container p-3 bg-gray-50 border rounded-md shadow-inner h-[100px] overflow-y-auto">
          <Editor
            editorState={editorState}
            onChange={handleChange}
            handleKeyCommand={handleKeyCommand}
            placeholder="Enter your description here..."
          />
        </div>

      </div>
    </section>
  );
};

export default Description;
