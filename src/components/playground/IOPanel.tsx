
import { Terminal } from "lucide-react";

interface IOPanelProps {
  output: string;
  isRunning: boolean;
}

const IOPanel = ({ output, isRunning }: IOPanelProps) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center">
          <Terminal className="w-4 h-4 mr-2" />
          <h3 className="font-medium text-gray-800">Output</h3>
        </div>
        <div className="h-32 p-4 font-mono text-sm bg-gray-900 text-green-400 overflow-y-auto">
          {isRunning ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400 mr-2"></div>
              Running code...
            </div>
          ) : (
            <pre className="whitespace-pre-wrap">{output || "Click 'Run Code' to see output..."}</pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default IOPanel;

