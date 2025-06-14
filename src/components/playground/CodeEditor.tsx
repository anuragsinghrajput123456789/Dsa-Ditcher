
import { useRef, useEffect } from "react";
import MonacoEditor, { OnChange, loader } from "@monaco-editor/react";
import { Code } from "lucide-react";

interface CodeEditorProps {
  code: string;
  onCodeChange: (code: string) => void;
  language: string;
  languageName: string;
}

const languageToMonacoMode: Record<string, string> = {
  python: "python",
  javascript: "javascript",
  java: "java",
  cpp: "cpp"
};

const themeMap: Record<string, string> = {
  dark: "vs-dark",
  light: "vs-light",
};

const CodeEditor = ({
  code,
  onCodeChange,
  language,
  languageName,
}: CodeEditorProps) => {
  // Detect system theme for Monaco, fallback to light
  const theme =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "vs-dark"
      : "vs-light";

  // Editor height responsive to viewport on mobile, fixed on desktop
  const editorHeight =
    typeof window !== "undefined" && window.innerWidth < 640
      ? "320px"
      : "28rem";

  return (
    <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-neutral-700 bg-slate-100 dark:bg-neutral-900 transition-colors">
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
      <MonacoEditor
        value={code}
        language={languageToMonacoMode[language] || "python"}
        theme={theme}
        options={{
          fontSize: 15,
          fontFamily: "Fira Mono, Inconsolata, Menlo, monospace",
          roundedSelection: true,
          cursorSmoothCaretAnimation: true,
          smoothScrolling: true,
          lineNumbers: "on",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          scrollbar: {
            verticalSliderSize: 8,
            horizontalSliderSize: 8,
          },
          renderLineHighlight: "all",
          automaticLayout: true,
          wordWrap: "on",
          bracketPairColorization: { enabled: true },
          colorDecorators: true,
          formatOnType: true,
          formatOnPaste: true,
        }}
        height={editorHeight}
        width="100%"
        className="!rounded-b-xl"
        onChange={(val) => onCodeChange(val || "")}
      />
    </div>
  );
};

export default CodeEditor;
