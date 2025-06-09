
import { Play, Save, Download, Upload } from "lucide-react";

interface Language {
  id: string;
  name: string;
  extension: string;
}

interface CodeControlsProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  onLoadTemplate: () => void;
  onRunCode: () => void;
  onSaveSnippet: () => void;
  onDownloadCode: () => void;
  onUploadFile: () => void;
  isRunning: boolean;
  hasCode: boolean;
  languages: Language[];
}

const CodeControls = ({
  selectedLanguage,
  onLanguageChange,
  onLoadTemplate,
  onRunCode,
  onSaveSnippet,
  onDownloadCode,
  onUploadFile,
  isRunning,
  hasCode,
  languages
}: CodeControlsProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Language Selection */}
        <div className="flex items-center space-x-4">
          <label className="font-medium text-gray-700">Language:</label>
          <select
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {languages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
          <button
            onClick={onLoadTemplate}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Load Template
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onRunCode}
            disabled={isRunning || !hasCode}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>{isRunning ? "Running..." : "Run & Analyze"}</span>
          </button>
          
          <button
            onClick={onSaveSnippet}
            disabled={!hasCode}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
          
          <button
            onClick={onDownloadCode}
            disabled={!hasCode}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
          
          <button
            onClick={onUploadFile}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeControls;
