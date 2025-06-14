
import AceEditor from "react-ace";
import { Code } from "lucide-react";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";

interface CodeEditorProps {
  code: string;
  onCodeChange: (code: string) => void;
  language: string;
  languageName: string;
}

const languageToAceMode: Record<string, string> = {
  python: "python",
  javascript: "javascript",
  java: "java",
  cpp: "c_cpp",
};

const CodeEditor = ({
  code,
  onCodeChange,
  language,
  languageName
}: CodeEditorProps) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-xl border border-gray-200 bg-gradient-to-b from-neutral-900 via-slate-900 to-neutral-800">
      <div className="bg-gradient-to-r from-indigo-700 via-emerald-800 to-slate-900 text-white flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-2">
          <Code className="w-5 h-5" />
          <span className="font-semibold tracking-wide">{languageName} Editor</span>
        </div>
        <div className="flex items-center space-x-3 text-xs">
          <span>Lines: {code.split('\n').length}</span>
          <span>Chars: {code.length}</span>
        </div>
      </div>
      <AceEditor
        mode={languageToAceMode[language] || "python"}
        theme="monokai"
        name="playground-ace"
        value={code}
        onChange={onCodeChange}
        width="100%"
        height="28rem"
        fontSize={15}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
        className="!rounded-b-xl !bg-transparent"
        editorProps={{ $blockScrolling: true }}
      />
    </div>
  );
};

export default CodeEditor;
