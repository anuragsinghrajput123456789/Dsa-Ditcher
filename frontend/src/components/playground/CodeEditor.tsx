
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
  // Detect theme from document class or system preference
  const getTheme = () => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark") ? "vs-dark" : "vs-light";
    }
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "vs-dark"
      : "vs-light";
  };

  const theme = getTheme();

  // Editor height responsive to viewport on mobile, fixed on desktop
  const editorHeight =
    typeof window !== "undefined" && window.innerWidth < 640
      ? "320px"
      : "28rem";

  return (
    <div className="rounded-xl overflow-hidden shadow-xl border border-border bg-card transition-colors">
      <div className="bg-secondary text-foreground flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center space-x-2">
          <Code className="w-5 h-5 text-primary" />
          <span className="font-semibold tracking-wide">{languageName} Editor</span>
        </div>
        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
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
