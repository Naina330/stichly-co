import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Camera,
  Upload,
  Sparkles,
  Scissors,
  CheckCircle2,
  RefreshCw,
  Send,
  AlertTriangle,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ScanResult {
  garmentType: string;
  gender: string;
  category: string;
  generalStyle: string;
  silhouette: string;
  primaryColors: string[];
  recommendedFabrics: string[];
  visibleDetails: string[];
  customizationAdvice: string;
  estimatedTailoringDays: string;
  suggestedBudgetRange: string;
}

export const VisualScannerPage: React.FC = () => {
  const { tailors, setSelectedTailorId, setActiveAttireFilter, setCurrentView, createOrder, currentCustomer } = useApp();

  const [imagePreview, setImagePreview] = useState<string | null>(
    'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80'
  );
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>({
    garmentType: 'Royal Jodhpuri Bandhgala Ensemble',
    gender: 'Men',
    category: 'Indian',
    generalStyle: 'Imperial Heritage Bespoke',
    silhouette: 'Structured Contoured Waist with Roped Shoulders',
    primaryColors: ['Midnight Charcoal', 'Antique Gold Trim'],
    recommendedFabrics: ['Super 120s Italian Wool Blend', 'Mulmul Cotton Inner Lining'],
    visibleDetails: [
      'High Mandarin stand collar with velvet edge piping',
      'Artisanal hand-hammered brass crest buttons',
      'Double jetted pockets with concealed ticket flap',
      'Hand-basted horsehair chest canvas drape'
    ],
    customizationAdvice: 'Request 1.5 inch ease around armholes for celebratory wear. Consider adding a concealed inner pocket for phone/pen.',
    estimatedTailoringDays: '10-12 Days',
    suggestedBudgetRange: '₹7,500 – ₹11,000'
  });

  const [selectedTailorForSend, setSelectedTailorForSend] = useState<string>(tailors[0].id);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Curated Reference Designs for instant testing
  const SAMPLE_PRESETS = [
    {
      title: 'Royal Jodhpuri Bandhgala',
      category: 'Men • Heritage',
      img: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Shawl Lapel Evening Tuxedo',
      category: 'Men • Western Gala',
      img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Handcrafted Zardozi Ensemble',
      category: 'Festive Bespoke',
      img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    }
  ];

  // File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCameraError(null);
      stopCamera();
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const b64 = event.target.result as string;
          setImagePreview(b64);
          triggerDeconstruction(b64);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Camera Activation with Graceful Permission Dismissed Handling
  const startCamera = async () => {
    setCameraError(null);

    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera access is not supported in this browser environment. You can upload an outfit photo directly or select one of our curated styles below.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });
      setCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {
          // Play state handled
        });
      }
    } catch (err: any) {
      setCameraActive(false);
      const msg = (err?.message || '').toLowerCase();
      const name = err?.name || '';
      if (name === 'NotAllowedError' || msg.includes('permission') || msg.includes('dismissed') || msg.includes('denied')) {
        setCameraError('Camera permission was dismissed or denied. You can allow camera in browser settings, upload a photo directly, or select a sample design below.');
      } else if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
        setCameraError('No camera found on this device. Please upload an outfit photo directly from your device.');
      } else {
        setCameraError('Camera access is currently unavailable. You can upload an image directly or choose a curated sample below.');
      }
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImagePreview(dataUrl);
        setCameraError(null);
        stopCamera();
        triggerDeconstruction(dataUrl);
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      try {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      } catch (e) {
        // Stream release safety
      }
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  // Call Server-side Gemini Vision API
  const triggerDeconstruction = async (imageBase64: string) => {
    setIsScanning(true);
    try {
      const res = await fetch('/api/gemini/scan-design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64 })
      });
      if (!res.ok) {
        throw new Error(`Visual scan responded with status ${res.status}`);
      }
      const data = await res.json();
      if (data.result) {
        setScanResult(data.result);
      }
    } catch (err) {
      console.warn('Deconstruction note:', err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleSendToTailor = () => {
    if (!scanResult || !imagePreview) return;
    const tailor = tailors.find((t) => t.id === selectedTailorForSend) || tailors[0];

    createOrder({
      customerId: currentCustomer.id,
      customerName: currentCustomer.name,
      customerCity: currentCustomer.city,
      tailorId: tailor.id,
      tailorName: tailor.name,
      atelierName: tailor.atelierName,
      tailorCity: tailor.city,
      garmentTitle: `${scanResult.garmentType} (From Visual Scan)`,
      currentQuote: 8000,
      initialQuote: 8000,
      referenceImages: [imagePreview],
      measurementsSummary: 'Visual scan submitted. Tailor fitting trial required.',
      designSpecs: {
        gender: (scanResult.gender === 'Men' ? 'Men' : 'Women') as any,
        attireType: (scanResult.category === 'Western' ? 'Western' : 'Indian') as any,
        garmentType: scanResult.garmentType,
        fabric: scanResult.recommendedFabrics?.[0] || 'Raw Silk & Wool',
        color: scanResult.primaryColors?.[0] || 'Midnight Charcoal',
        pattern: scanResult.generalStyle,
        sleeveStyle: 'Full Sleeve with French Cuffs',
        neckline: 'High Stand Collar',
        length: 'Bespoke Length',
        fit: scanResult.silhouette,
        specialInstructions: scanResult.customizationAdvice,
        occasion: 'Festive / Formal Gala'
      }
    });

    setCurrentView('ORDERS');
  };

  const handleOpenInStudio = () => {
    if (scanResult) {
      setActiveAttireFilter({
        gender: (scanResult.gender === 'Men' ? 'Men' : 'Women') as any,
        attireType: (scanResult.category === 'Western' ? 'Western' : 'Indian') as any,
        category: scanResult.garmentType
      });
    }
    setCurrentView('DESIGN_STUDIO');
  };

  return (
    <div className="py-12 bg-[#120B08] min-h-screen text-[#F4ECE1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2C1910] text-[#D4AF37] text-xs font-semibold tracking-widest uppercase rounded-full border border-[#D4AF37]/30 mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>AI Multimodal Garment Decomposition</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FFF7E8]">
            Visual Design Scanner
          </h1>
          <p className="text-xs sm:text-sm text-[#A89885] mt-2 font-light">
            Upload an outfit photograph or capture with your camera. Our system deconstructs the garment silhouette, visible craft details, and recommended fabrics to instantly communicate your vision to a bespoke tailor.
          </p>

          {/* Explicit Trust & Safety Disclaimer */}
          <div className="mt-4 p-3 bg-[#24150D] border border-[#52331F] rounded-lg max-w-2xl mx-auto flex items-start gap-2.5 text-left text-xs text-[#D8C9B5]">
            <AlertTriangle className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#E5C378]">Design Understanding Notice:</span> This scanner analyzes garment style, silhouette, and craft elements. It does NOT claim to estimate exact body measurements from ordinary photos; measurements are drafted in collaboration with your master tailor.
            </div>
          </div>
        </div>

        {/* 2-Column Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Image Source & Camera */}
          <div className="bg-[#1A0F0A] border border-[#442817] rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#2C1910]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                Reference Photograph
              </span>
              <div className="flex items-center gap-2">
                {!cameraActive ? (
                  <button
                    onClick={startCamera}
                    className="px-3 py-1.5 rounded bg-[#2D180F] hover:bg-[#3D2214] text-xs text-[#E5C378] border border-[#D4AF37]/40 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Open Camera</span>
                  </button>
                ) : (
                  <button
                    onClick={stopCamera}
                    className="px-3 py-1.5 rounded bg-red-950/60 text-xs text-red-300 border border-red-800/40"
                  >
                    Close Camera
                  </button>
                )}
              </div>
            </div>

            {/* Camera Error / Permission Notice */}
            {cameraError && (
              <div className="p-3.5 bg-[#25150D] border border-amber-600/40 rounded-xl text-xs text-amber-200/90 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-[#E5C378]">Camera Notice</div>
                  <p className="mt-0.5 text-xs text-[#D8C9B5]">{cameraError}</p>
                </div>
                <button
                  onClick={() => setCameraError(null)}
                  className="text-[#A89885] hover:text-[#FFF7E8] text-xs px-1 cursor-pointer"
                  title="Dismiss notice"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Camera Video Stream OR Image Preview */}
            <div className="relative rounded-xl overflow-hidden bg-[#120B08] border border-[#3E2415] min-h-[380px] flex items-center justify-center">
              {cameraActive ? (
                <div className="relative w-full h-[380px]">
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                  <button
                    onClick={capturePhoto}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-full bg-[#D4AF37] text-[#120B08] font-bold text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2 cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Capture Snapshot</span>
                  </button>
                </div>
              ) : imagePreview ? (
                <div className="relative w-full h-[380px]">
                  <img src={imagePreview} alt="Outfit Preview" className="w-full h-full object-cover" />
                  {isScanning && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
                      <RefreshCw className="w-8 h-8 text-[#D4AF37] animate-spin mb-3" />
                      <div className="font-serif text-lg text-[#FFF7E8] font-bold">
                        Deconstructing Garment Architecture...
                      </div>
                      <p className="text-xs text-[#A89885] mt-1">
                        Extracting silhouette, neckline, fabrics, and artisanal elements
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center p-8 text-[#7D6B58]">
                  <Camera className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">No image uploaded yet</p>
                </div>
              )}
            </div>

            {/* Upload Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <label className="py-2.5 px-3 rounded bg-[#2D180F] hover:bg-[#3D2214] border border-[#3E2415] text-center text-xs font-semibold text-[#D8C9B5] cursor-pointer flex items-center justify-center gap-1.5 transition-colors">
                <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Upload From Device</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>

              <button
                onClick={() => {
                  if (imagePreview) triggerDeconstruction(imagePreview);
                }}
                disabled={isScanning || !imagePreview}
                className="py-2.5 px-3 rounded bg-[#3A2214] hover:bg-[#4E2E1A] text-xs font-bold text-[#E5C378] border border-[#D4AF37]/50 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Re-Analyze Design</span>
              </button>
            </div>

            {/* Curated Sample Reference Designs */}
            <div className="pt-2 border-t border-[#2C1910]">
              <div className="text-[11px] font-semibold text-[#A89885] uppercase tracking-wider mb-2">
                Or test with bespoke sample archives:
              </div>
              <div className="grid grid-cols-3 gap-2">
                {SAMPLE_PRESETS.map((preset) => (
                  <button
                    key={preset.title}
                    onClick={() => {
                      stopCamera();
                      setCameraError(null);
                      setImagePreview(preset.img);
                      triggerDeconstruction(preset.img);
                    }}
                    className="p-2 rounded-lg bg-[#140C08] hover:bg-[#25150E] border border-[#3A2114] hover:border-[#D4AF37]/50 text-left transition-all cursor-pointer group"
                  >
                    <div className="text-[11px] font-medium text-[#FFF7E8] group-hover:text-[#D4AF37] line-clamp-1">
                      {preset.title}
                    </div>
                    <div className="text-[9px] text-[#8C7A68]">
                      {preset.category}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Extracted "Design Understanding" */}
          <div className="bg-[#1A0F0A] border border-[#442817] rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#2C1910]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <h2 className="font-serif text-xl font-bold text-[#FFF7E8]">
                  Design Understanding
                </h2>
              </div>
              <span className="text-[10px] uppercase font-bold text-[#D4AF37] bg-[#2C1910] px-2.5 py-0.5 rounded border border-[#D4AF37]/30">
                Ready for Tailor Brief
              </span>
            </div>

            {scanResult ? (
              <div className="space-y-4 text-xs">
                {/* Garment Type & Category */}
                <div className="bg-[#140C08] p-4 rounded-xl border border-[#2F1B10]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-[#8C7A68] uppercase font-semibold">
                      Identified Garment
                    </span>
                    <span className="text-[10px] text-[#E5C378] bg-[#22130B] px-2 py-0.5 rounded">
                      {scanResult.gender} • {scanResult.category}
                    </span>
                  </div>
                  <div className="font-serif text-xl font-bold text-[#FFF]">
                    {scanResult.garmentType}
                  </div>
                  <div className="text-[#A89885] mt-1">{scanResult.generalStyle}</div>
                </div>

                {/* Silhouette & Colors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-[#140C08] p-3 rounded-lg border border-[#2F1B10]">
                    <div className="text-[10px] text-[#8C7A68] uppercase mb-1">Silhouette</div>
                    <div className="font-medium text-[#FFF]">{scanResult.silhouette}</div>
                  </div>
                  <div className="bg-[#140C08] p-3 rounded-lg border border-[#2F1B10]">
                    <div className="text-[10px] text-[#8C7A68] uppercase mb-1">Color Palette</div>
                    <div className="font-medium text-[#FFF]">{scanResult.primaryColors?.join(', ')}</div>
                  </div>
                </div>

                {/* Recommended Fabrics */}
                <div className="bg-[#140C08] p-3.5 rounded-lg border border-[#2F1B10]">
                  <div className="text-[10px] text-[#8C7A68] uppercase mb-1.5">
                    Recommended Textile & Fabrics
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {scanResult.recommendedFabrics?.map((fab, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-[#2C1910] text-[#E5C378] text-[11px] border border-[#3E2415]"
                      >
                        {fab}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visible Tailoring Elements */}
                <div className="bg-[#140C08] p-3.5 rounded-lg border border-[#2F1B10]">
                  <div className="text-[10px] text-[#8C7A68] uppercase mb-2">
                    Visible Craft & Tailoring Elements
                  </div>
                  <ul className="space-y-1 text-[#C9BAA6]">
                    {scanResult.visibleDetails?.map((det, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                        <span>{det}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Customization Advice */}
                <div className="bg-[#21130B] p-3.5 rounded-lg border border-[#442817]">
                  <div className="text-[10px] text-[#D4AF37] font-semibold uppercase mb-1">
                    Atelier Customization Advice
                  </div>
                  <p className="text-[#D8C9B5] leading-relaxed italic font-light">
                    "{scanResult.customizationAdvice}"
                  </p>
                </div>

                {/* Budget & Timeline Estimate */}
                <div className="flex items-center justify-between p-3 bg-[#140C08] rounded-lg border border-[#2F1B10]">
                  <div>
                    <span className="text-[10px] text-[#8C7A68] uppercase block">
                      Estimated Tailor Quote
                    </span>
                    <span className="font-serif text-lg font-bold text-[#E5C378]">
                      {scanResult.suggestedBudgetRange}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#8C7A68] uppercase block">
                      Crafting Timeline
                    </span>
                    <span className="text-xs text-[#FFF] font-medium">
                      {scanResult.estimatedTailoringDays}
                    </span>
                  </div>
                </div>

                {/* Action: Send to Tailor or Open in Design Studio */}
                <div className="pt-4 border-t border-[#2C1910] space-y-3">
                  <div>
                    <label className="text-[10px] uppercase text-[#8C7A68] block mb-1">
                      Choose Atelier to Send This Deconstructed Design
                    </label>
                    <select
                      value={selectedTailorForSend}
                      onChange={(e) => setSelectedTailorForSend(e.target.value)}
                      className="w-full p-2.5 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#E5C378] focus:outline-none"
                    >
                      {tailors.map((t) => (
                        <option key={t.id} value={t.id} className="bg-[#1C100A]">
                          {t.atelierName} ({t.city} • {t.name})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleOpenInStudio}
                      className="py-2.5 rounded bg-[#2D180F] hover:bg-[#3D2214] text-xs font-semibold text-[#FFF] border border-[#3E2415] transition-colors cursor-pointer"
                    >
                      Refine in Studio
                    </button>
                    <button
                      onClick={handleSendToTailor}
                      className="py-2.5 rounded bg-[#D4AF37] hover:bg-[#E5C378] text-xs font-bold text-[#120B08] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send to Atelier & Quote</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-[#7D6B58]">
                <p>Click "Analyze Design" to deconstruct garment architecture</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
