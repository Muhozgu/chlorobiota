import "../styles/app.css";  
import { useState, useRef, useCallback } from "react";
import { identifyPlant } from "../api.ts";
import type { PlantResult } from "../api.ts";

type State = "idle" | "loading" | "result" | "error";



export default function App() {
  const [state, setState] = useState<State>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<PlantResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<File | null>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    fileRef.current = file;
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
    setState("idle");
    setResult(null);
    setError(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleIdentify = async () => {
    if (!fileRef.current) return;
    setState("loading");
    setError(null);
    try {
      const res = await identifyPlant(fileRef.current);
      setResult(res);
      setState("result");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setState("error");
    }
  };

  return (
    <div className="app-root">
      <div className="noise" />

      <header>
        <div className="logo-mark">⬡</div>
        <h1>Chlorobiota</h1>
        <p className="tagline">Botanical intelligence · Powered by Qwen2.5-VL</p>
      </header>

      <main>
        {/* Upload zone */}
        <div
          className={`drop-zone ${dragging ? "dragging" : ""} ${preview ? "has-image" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => !preview && inputRef.current?.click()}
        >
          {preview ? (
            <div className="preview-wrapper">
              <img src={preview} alt="Plant preview" className="preview-img" />
              <button
                className="change-btn"
                onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
              >
                Change image
              </button>
            </div>
          ) : (
            <div className="drop-prompt">
              <div className="drop-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M20 8v16M12 16l8-8 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 28h28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                  <path d="M10 34h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.2"/>
                </svg>
              </div>
              <p className="drop-title">Drop a plant photo here</p>
              <p className="drop-sub">or click to browse · JPG, PNG, WEBP</p>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>

        {/* Identify button */}
        {preview && state !== "loading" && (
          <button className="identify-btn" onClick={handleIdentify}>
            <span className="btn-icon">⬡</span>
            Identify Plant
          </button>
        )}

        {/* Loading */}
        {state === "loading" && (
          <div className="loading-block">
            <div className="spinner">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="spinner-dot" style={{ "--i": i } as React.CSSProperties} />
              ))}
            </div>
            <p>Analysing plant morphology…</p>
          </div>
        )}

        {/* Error */}
        {state === "error" && (
          <div className="error-block">
            <span>⚠</span> {error}
          </div>
        )}

        {/* Result */}
        {state === "result" && result && (
          <div className="result-card">
            <div className="result-header">
              <div className="result-badge">Identified</div>
              <h2>{result.commonName}</h2>
              <p className="scientific">{result.scientificName}</p>
            </div>
            <div className="result-body">
              <div className="result-row">
                <span className="label">Family</span>
                <span className="value">{result.familyName}</span>
              </div>
              <div className="result-divider" />
              <div className="result-row description-row">
                <span className="label">Description</span>
                <span className="value description">{result.description}</span>
              </div>
            </div>
            <button className="retry-btn" onClick={() => { setState("idle"); setResult(null); setPreview(null); fileRef.current = null; }}>
              Identify another
            </button>
          </div>
        )}
      </main>

      <footer>
        <span>Chlorobiota · Plant Identification</span>
      </footer>
    </div>
  );
}