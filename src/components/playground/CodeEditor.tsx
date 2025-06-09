
import { Code } from "lucide-react";

interface CodeEditorProps {
  code: string;
  onCodeChange: (code: string) => void;
  language: string;
  languageName: string;
}

const CodeEditor = ({ code, onCodeChange, language, languageName }: CodeEditorProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Code className="w-5 h-5" />
          <span className="font-medium">{languageName} Editor</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-300">Lines: {code.split('\n').length}</span>
          <span className="text-sm text-gray-300">Chars: {code.length}</span>
        </div>
      </div>
      <textarea
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        placeholder={`Write your ${languageName} code here...`}
        className="w-full h-96 p-4 font-mono text-sm border-none focus:outline-none resize-none bg-gray-900 text-gray-100"
        spellCheck={false}
      />
    </div>
  );
};

export default CodeEditor;
