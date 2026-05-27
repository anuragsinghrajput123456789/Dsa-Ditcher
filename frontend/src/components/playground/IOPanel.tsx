
import { Terminal } from "lucide-react";

interface IOPanelProps {
  output: string;
  isRunning: boolean;
}

const IOPanel = ({ output, isRunning }: IOPanelProps) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
        <div className="bg-muted px-4 py-3 border-b border-border flex items-center">
          <Terminal className="w-4 h-4 mr-2 text-muted-foreground" />
          <h3 className="font-medium text-foreground">Output</h3>
        </div>
        <div className="h-32 p-4 font-mono text-sm bg-secondary text-foreground overflow-y-auto">
          {isRunning ? (
            <div className="flex items-center text-primary">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
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

