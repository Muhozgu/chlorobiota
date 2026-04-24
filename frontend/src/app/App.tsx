import { useState, useEffect } from 'react';
import { Leaf, Sparkles } from 'lucide-react';
import { UploadZone } from './components/UploadZone';
import { PlantResultCard } from './components/PlantResultCard';
import { FeedbackButtons } from './components/FeedbackButtons';

interface PlantData {
  imageUrl: string | null;
  commonName: string;
  scientificName: string;
  family: string;
  confidence: number;
  description: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export default function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [plantData, setPlantData] = useState<PlantData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Create object URL from file
const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (selectedImageUrl) {
        URL.revokeObjectURL(selectedImageUrl);
      }
    };
  }, [selectedImageUrl]);

  const handleImageSelect = (file: File) => {
  // Revoke old URL
  if (selectedImageUrl) {
    URL.revokeObjectURL(selectedImageUrl);
  }

  const imageUrl = URL.createObjectURL(file);

  setSelectedFile(file);
  setSelectedImageUrl(imageUrl);
  setPlantData(null);
  setError(null);
};


  const handleIdentify = async () => {
    if (!selectedFile) return;
    
    setIsIdentifying(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      setPlantData({
        imageUrl: selectedImageUrl,
        commonName: data.common_name,
        scientificName: data.scientific_name,
        family: data.family,
        confidence: Math.round(data.confidence * 100),
        description: data.description,
      });
    } catch (error) {
      console.error("Identification error:", error);
      setError("Failed to identify plant. Please try again.");
      setPlantData(null);
    } finally {
      setIsIdentifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-green-600 p-3 rounded-2xl shadow-lg">
              <Leaf className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-green-800">Chlorobiota</h1>
          </div>
          <p className="text-gray-600 max-w-xl mx-auto">
            Identify plants instantly from photos
          </p>
        </header>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-8 border border-green-100">
          {/* Upload Zone */}
          <UploadZone
            onImageSelect={handleImageSelect}
            selectedImage={selectedImageUrl}
          />

          {/* Error Message */}
          {error && (
            <div className="text-center p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Identify Button */}
          {selectedFile && !plantData && (
            <div className="text-center">
              <button
                onClick={handleIdentify}
                disabled={isIdentifying}
                className="inline-flex items-center gap-3 px-10 py-4 bg-linear-to-r from-green-600 to-green-500 text-white rounded-xl hover:from-green-700 hover:to-green-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-5 h-5" />
                {isIdentifying ? 'Identifying...' : 'Identify Plant'}
              </button>
            </div>
          )}

          {/* Results Section */}
          {plantData && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="border-t border-green-100 pt-6">
                <h2 className="text-center mb-6 text-green-800">
                  Identification Result
                </h2>
                <PlantResultCard {...plantData} imageUrl={plantData.imageUrl || ''} />
              </div>

              {/* Feedback Section */}
              <FeedbackButtons />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-sm text-gray-500 bg-white/60 backdrop-blur-sm inline-block px-6 py-3 rounded-full border border-green-100">
            AI-based identification – results may not be 100% accurate
          </p>
        </footer>
      </div>
    </div>
  );
}