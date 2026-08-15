'use client';

import { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
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

export default function CodeEditor({
  code,
  onCodeChange,
  language,
  languageName,
}: CodeEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[28rem] w-full rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground text-sm">
        Loading Monaco Editor...
      </div>
    );
  }

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
        language={languageToMonacoMode[language] || "javascript"}
        theme="vs-dark"
        options={{
          fontSize: 15,
          fontFamily: "Fira Mono, Inconsolata, Menlo, monospace",
          roundedSelection: true,
          cursorSmoothCaretAnimation: "on",
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
        height="28rem"
        width="100%"
        className="!rounded-b-xl"
        onChange={(val) => onCodeChange(val || "")}
      />
    </div>
  );
}
