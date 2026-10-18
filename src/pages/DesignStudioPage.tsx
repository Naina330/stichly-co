import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MEN_INDIAN_CATEGORIES,
  MEN_WESTERN_CATEGORIES,
  WOMEN_INDIAN_CATEGORIES,
  WOMEN_WESTERN_CATEGORIES,
  FABRIC_OPTIONS,
  EMBROIDERY_OPTIONS,
  BUTTON_OPTIONS,
  SLEEVE_OPTIONS,
  NECKLINE_OPTIONS
} from '../data/categories';
import {
  Scissors,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Upload,
  Camera,
  Layers,
  MapPin,
  Star,
  Send,
  HelpCircle
} from 'lucide-react';

export const DesignStudioPage: React.FC = () => {
  const {
    tailors,
    createOrder,
    setCurrentView,
    selectedTailorId,
    setSelectedOrderId,
    currentCustomer,
    activeAttireFilter,
    openAIAssistWithPrompt
  } = useApp();

  // 8-Step Wizard State
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Gender
  const [gender, setGender] = useState<'Men' | 'Women'>(activeAttireFilter?.gender || 'Men');

  // Step 2: Attire Type
  const [attireType, setAttireType] = useState<'Indian' | 'Western'>(activeAttireFilter?.attireType || 'Indian');

  // Step 3: Garment Type
  const garmentChoices = gender === 'Men'
    ? (attireType === 'Indian' ? MEN_INDIAN_CATEGORIES : MEN_WESTERN_CATEGORIES)
    : (attireType === 'Indian' ? WOMEN_INDIAN_CATEGORIES : WOMEN_WESTERN_CATEGORIES);

  const [garmentType, setGarmentType] = useState<string>(activeAttireFilter?.category || garmentChoices[0]);

  // Step 4: Customizations
  const [selectedFabric, setSelectedFabric] = useState<string>(FABRIC_OPTIONS[0].name);
  const [selectedColor, setSelectedColor] = useState<string>('Ivory & Champagne Gold');
  const [selectedPattern, setSelectedPattern] = useState<string>('Tone-on-tone French Knots & Floral Vines');
  const [selectedSleeve, setSelectedSleeve] = useState<string>(SLEEVE_OPTIONS[0]);
  const [selectedNeckline, setSelectedNeckline] = useState<string>(NECKLINE_OPTIONS[0]);
  const [selectedLength, setSelectedLength] = useState<string>('Knee-Length / Royal Cut');
  const [selectedFit, setSelectedFit] = useState<string>('Structured Bespoke Fit');
  const [selectedEmbroidery, setSelectedEmbroidery] = useState<string>(EMBROIDERY_OPTIONS[1]);
  const [selectedButtons, setSelectedButtons] = useState<string>(BUTTON_OPTIONS[0]);
  const [selectedBorder, setSelectedBorder] = useState<string>('Antique Metallic Zari Cord');
  const [selectedPockets, setSelectedPockets] = useState<string>('Double Jetted Interior & Welt Chest');

  // Step 5: Reference Images
  const [referenceImages, setReferenceImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
  ]);
  const [newImageUrl, setNewImageUrl] = useState<string>('');

  // Step 6: Instructions & Occasion
  const [specialInstructions, setSpecialInstructions] = useState<string>(
    'Please allow 1.5 inches of ease in armholes for celebratory movement. Add pure cotton mulmul lining.'
  );
  const [occasion, setOccasion] = useState<string>('Royal Wedding / Reception');
  const [budgetEstimate, setBudgetEstimate] = useState<number>(8500);

  // Step 7: Preferred Tailor
  const [chosenTailorId, setChosenTailorId] = useState<string>(selectedTailorId || tailors[0].id);

  // Handle image upload from computer
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setReferenceImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImageUrl = () => {
    if (newImageUrl.trim()) {
      setReferenceImages((prev) => [...prev, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleSubmitBespokeRequest = () => {
    const chosenTailor = tailors.find((t) => t.id === chosenTailorId) || tailors[0];

    const newOrder = createOrder({
      customerId: currentCustomer.id,
      customerName: currentCustomer.name,
      customerCity: currentCustomer.city,
      tailorId: chosenTailor.id,
      tailorName: chosenTailor.name,
      atelierName: chosenTailor.atelierName,
      tailorCity: chosenTailor.city,
      garmentTitle: `${selectedColor} ${garmentType} (${attireType})`,
      currentQuote: budgetEstimate,
      initialQuote: budgetEstimate,
      referenceImages,
      measurementsSummary: `${currentCustomer.measurementProfiles[0]?.name || 'Standard Client Profile'} - Verified`,
      designSpecs: {
        gender,
        attireType,
        garmentType,
        fabric: selectedFabric,
        color: selectedColor,
        pattern: selectedPattern,
        sleeveStyle: selectedSleeve,
        neckline: selectedNeckline,
        length: selectedLength,
        fit: selectedFit,
        embroidery: selectedEmbroidery,
        buttons: selectedButtons,
        border: selectedBorder,
        pockets: selectedPockets,
        specialInstructions,
        occasion,
        clientBudget: budgetEstimate
      }
    });

    setSelectedOrderId(newOrder.id);
    setCurrentView('ORDERS');
  };

  return (
    <div className="py-12 bg-[#120B08] min-h-screen text-[#F4ECE1]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Indicator Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2C1910] text-[#D4AF37] text-xs font-semibold tracking-widest uppercase rounded-full border border-[#D4AF37]/30 mb-2">
            <Scissors className="w-3.5 h-3.5" />
            <span>8-Step Bespoke Design Studio</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FFF7E8]">
            Create Your Design
          </h1>
          <p className="text-xs sm:text-sm text-[#A89885] mt-2 font-light">
            Draft your unique garment, configure fabrics and artisanal finishes, and receive direct bespoke quotations from master tailors in Indian Rupees (₹).
          </p>

          {/* Stepper Progress Circles */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
              <button
                key={s}
                onClick={() => {
                  if (s < currentStep) setCurrentStep(s);
                }}
                className={`w-8 h-8 rounded-full text-xs font-bold transition-all flex items-center justify-center ${
                  currentStep === s
                    ? 'bg-[#D4AF37] text-[#120B08] ring-2 ring-[#FFDA79] shadow-lg scale-110'
                    : currentStep > s
                    ? 'bg-[#3D2619] text-[#E5C378]'
                    : 'bg-[#1C100A] text-[#7A6856] border border-[#2F1B10]'
                }`}
              >
                {currentStep > s ? <Check className="w-3.5 h-3.5" /> : s}
              </button>
            ))}
          </div>
          <div className="text-[11px] text-[#A6947D] mt-2">
            Step {currentStep} of 8:{' '}
            <span className="text-[#FFF] font-semibold">
              {currentStep === 1 && 'Select Gender'}
              {currentStep === 2 && 'Select Attire Style (Indian vs Western)'}
              {currentStep === 3 && 'Choose Garment Silhouette'}
              {currentStep === 4 && 'Artisanal Specifications & Fabric'}
              {currentStep === 5 && 'Inspiration & Reference Images'}
              {currentStep === 6 && 'Tailoring Notes & Occasion'}
              {currentStep === 7 && 'Select Preferred Atelier'}
              {currentStep === 8 && 'Review Quotation & Submit'}
            </span>
          </div>
        </div>

        {/* Wizard Main Card */}
        <div className="bg-[#1A0F0A] border border-[#442817] rounded-2xl p-6 sm:p-10 shadow-2xl">
          {/* STEP 1: GENDER */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#FFF7E8] text-center">
                Step 1: Who is this garment being tailored for?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto pt-4">
                <button
                  onClick={() => setGender('Men')}
                  className={`p-8 rounded-xl border text-center transition-all cursor-pointer ${
                    gender === 'Men'
                      ? 'border-[#D4AF37] bg-[#2E1A10] shadow-xl'
                      : 'border-[#3D2619] bg-[#140C08] hover:border-[#5C3720]'
                  }`}
                >
                  <div className="font-serif text-3xl font-bold text-[#FFF] mb-2">Gentlemen (Men)</div>
                  <p className="text-xs text-[#A89885]">Sherwanis, Bandhgalas, Kurtas, Tuxedos, Bespoke Suits</p>
                </button>

                <button
                  onClick={() => setGender('Women')}
                  className={`p-8 rounded-xl border text-center transition-all cursor-pointer ${
                    gender === 'Women'
                      ? 'border-[#D4AF37] bg-[#2E1A10] shadow-xl'
                      : 'border-[#3D2619] bg-[#140C08] hover:border-[#5C3720]'
                  }`}
                >
                  <div className="font-serif text-3xl font-bold text-[#FFF] mb-2">Ladies (Women)</div>
                  <p className="text-xs text-[#A89885]">Lehengas, Blouses, Anarkalis, Shararas, Bespoke Gowns</p>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ATTIRE TYPE */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#FFF7E8] text-center">
                Step 2: Choose Attire Tradition for {gender}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto pt-4">
                <button
                  onClick={() => setAttireType('Indian')}
                  className={`p-8 rounded-xl border text-center transition-all cursor-pointer ${
                    attireType === 'Indian'
                      ? 'border-[#D4AF37] bg-[#2E1A10] shadow-xl'
                      : 'border-[#3D2619] bg-[#140C08] hover:border-[#5C3720]'
                  }`}
                >
                  <div className="font-serif text-3xl font-bold text-[#E5C378] mb-2">Indian Wear</div>
                  <p className="text-xs text-[#A89885]">
                    Heritage weaves, Zardozi embroidery, Angrakhas, Bandhgalas, Lehengas, and royal drapes.
                  </p>
                </button>

                <button
                  onClick={() => setAttireType('Western')}
                  className={`p-8 rounded-xl border text-center transition-all cursor-pointer ${
                    attireType === 'Western'
                      ? 'border-[#D4AF37] bg-[#2E1A10] shadow-xl'
                      : 'border-[#3D2619] bg-[#140C08] hover:border-[#5C3720]'
                  }`}
                >
                  <div className="font-serif text-3xl font-bold text-[#FFF] mb-2">Western Wear</div>
                  <p className="text-xs text-[#A89885]">
                    Sharp Savile-style Tuxedos, Evening Gowns, 3-Piece Suits, Blazers, and Tailored Trousers.
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: GARMENT TYPE */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#FFF7E8] text-center">
                Step 3: Select Silhouette ({gender} • {attireType})
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                {garmentChoices.map((choice) => (
                  <button
                    key={choice}
                    onClick={() => setGarmentType(choice)}
                    className={`p-4 rounded-lg border text-left transition-all cursor-pointer ${
                      garmentType === choice
                        ? 'border-[#D4AF37] bg-[#2E1A10] text-[#FFF] shadow-lg'
                        : 'border-[#3D2619] bg-[#140C08] text-[#C9BAA6] hover:border-[#5C3720]'
                    }`}
                  >
                    <div className="text-xs font-bold truncate">{choice}</div>
                    <div className="text-[10px] text-[#8C7A68] mt-1">Bespoke Handcrafted</div>
                  </button>
                ))}
                <button
                  onClick={() => setGarmentType('Custom / I Have My Own Design')}
                  className={`p-4 rounded-lg border-2 border-dashed text-left transition-all cursor-pointer ${
                    garmentType === 'Custom / I Have My Own Design'
                      ? 'border-[#D4AF37] bg-[#2E1A10] text-[#FFF]'
                      : 'border-[#D4AF37]/40 bg-[#140C08] text-[#E5C378]'
                  }`}
                >
                  <div className="text-xs font-bold">Custom Own Design</div>
                  <div className="text-[10px] text-[#A6947D] mt-1">Provide custom photo/sketch</div>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CUSTOMIZATIONS & FABRIC */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#FFF7E8]">
                Step 4: Configure Artisanal Specifications
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Fabric Choice */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] block mb-2">
                    Fabric & Textile
                  </label>
                  <select
                    value={selectedFabric}
                    onChange={(e) => setSelectedFabric(e.target.value)}
                    className="w-full p-2.5 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF] focus:outline-none focus:border-[#D4AF37]"
                  >
                    {FABRIC_OPTIONS.map((f, i) => (
                      <option key={i} value={f.name} className="bg-[#1C100A]">
                        {f.name} ({f.tags.join(', ')})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Color */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] block mb-2">
                    Color Palette / Tone
                  </label>
                  <input
                    type="text"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    placeholder="e.g. Ivory & Champagne Gold, Royal Rust, Midnight Black"
                    className="w-full p-2.5 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Pattern & Texture */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] block mb-2">
                    Pattern & Weave
                  </label>
                  <input
                    type="text"
                    value={selectedPattern}
                    onChange={(e) => setSelectedPattern(e.target.value)}
                    placeholder="e.g. Tone-on-tone French Knots, Zari Jaal, Solid Minimalist"
                    className="w-full p-2.5 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Sleeve Style */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] block mb-2">
                    Sleeve Style
                  </label>
                  <select
                    value={selectedSleeve}
                    onChange={(e) => setSelectedSleeve(e.target.value)}
                    className="w-full p-2.5 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF] focus:outline-none focus:border-[#D4AF37]"
                  >
                    {SLEEVE_OPTIONS.map((sl, i) => (
                      <option key={i} value={sl} className="bg-[#1C100A]">
                        {sl}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Neckline / Collar */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] block mb-2">
                    Neckline / Collar
                  </label>
                  <select
                    value={selectedNeckline}
                    onChange={(e) => setSelectedNeckline(e.target.value)}
                    className="w-full p-2.5 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF] focus:outline-none focus:border-[#D4AF37]"
                  >
                    {NECKLINE_OPTIONS.map((n, i) => (
                      <option key={i} value={n} className="bg-[#1C100A]">
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Fit */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] block mb-2">
                    Cut & Fit Profile
                  </label>
                  <select
                    value={selectedFit}
                    onChange={(e) => setSelectedFit(e.target.value)}
                    className="w-full p-2.5 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Structured Bespoke Fit">Structured Bespoke Fit (Hand-Basted Canvas)</option>
                    <option value="Tailored Slim Silhouette">Tailored Slim Silhouette</option>
                    <option value="Relaxed Royal Comfort Cut">Relaxed Royal Comfort Cut</option>
                    <option value="Flared A-Line Dramatic">Flared A-Line Dramatic</option>
                  </select>
                </div>

                {/* Embroidery */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] block mb-2">
                    Embroidery & Needlecraft
                  </label>
                  <select
                    value={selectedEmbroidery}
                    onChange={(e) => setSelectedEmbroidery(e.target.value)}
                    className="w-full p-2.5 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF] focus:outline-none focus:border-[#D4AF37]"
                  >
                    {EMBROIDERY_OPTIONS.map((em, i) => (
                      <option key={i} value={em} className="bg-[#1C100A]">
                        {em}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Buttons */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] block mb-2">
                    Buttons & Placket Fastenings
                  </label>
                  <select
                    value={selectedButtons}
                    onChange={(e) => setSelectedButtons(e.target.value)}
                    className="w-full p-2.5 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF] focus:outline-none focus:border-[#D4AF37]"
                  >
                    {BUTTON_OPTIONS.map((bt, i) => (
                      <option key={i} value={bt} className="bg-[#1C100A]">
                        {bt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: REFERENCE IMAGES */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#FFF7E8]">
                Step 5: Upload Inspiration & Reference Images
              </h2>
              <p className="text-xs text-[#A89885]">
                Upload snapshots from your device, paste image links, or use reference photos to communicate your exact design aesthetic to the tailor.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {referenceImages.map((imgUrl, i) => (
                  <div key={i} className="relative rounded-lg overflow-hidden border border-[#3E2415] h-36 group">
                    <img src={imgUrl} alt="Inspiration" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setReferenceImages((prev) => prev.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 bg-red-900/90 text-white p-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                {/* Upload from device box */}
                <label className="h-36 rounded-lg border-2 border-dashed border-[#4A2D1B] hover:border-[#D4AF37] bg-[#140C08] flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-colors">
                  <Upload className="w-6 h-6 text-[#D4AF37] mb-1.5" />
                  <span className="text-xs font-medium text-[#FFF]">Upload Device Photo</span>
                  <span className="text-[10px] text-[#8C7A68]">JPG, PNG</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

              {/* URL paste input */}
              <div className="pt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Or paste an image URL..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF] focus:outline-none"
                />
                <button
                  onClick={handleAddImageUrl}
                  className="px-4 py-2 bg-[#2E1A10] text-[#E5C378] text-xs font-semibold rounded border border-[#D4AF37]/30"
                >
                  Add Image URL
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: INSTRUCTIONS & OCCASION */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#FFF7E8]">
                Step 6: Written Instructions & Occasion
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] block mb-2">
                    Occasion / Event Timeline
                  </label>
                  <input
                    type="text"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    placeholder="e.g. Royal Wedding Reception (Delhi, December 2026)"
                    className="w-full p-2.5 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] block mb-2">
                    Target Bespoke Budget (₹ INR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-[#D4AF37] font-serif font-bold text-sm">₹</span>
                    <input
                      type="number"
                      value={budgetEstimate}
                      onChange={(e) => setBudgetEstimate(parseInt(e.target.value, 10) || 0)}
                      className="w-full pl-8 pr-3 py-2.5 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <span className="text-[10px] text-[#8C7A68] mt-1 block">
                    You can negotiate this directly with the tailor once they review your design.
                  </span>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] block mb-2">
                    Detailed Tailoring Notes
                  </label>
                  <textarea
                    rows={4}
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Specify lining requirements, pocket preferences, shoulder roping, flare height, and drape preferences..."
                    className="w-full p-3 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: PREFERRED TAILOR */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#FFF7E8]">
                Step 7: Choose Preferred Atelier / Tailor
              </h2>
              <p className="text-xs text-[#A89885]">
                Select which master artisan receives your request, or choose the top regional specialist in your city.
              </p>

              <div className="space-y-3">
                {tailors.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setChosenTailorId(t.id)}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      chosenTailorId === t.id
                        ? 'border-[#D4AF37] bg-[#2E1A10] shadow-lg'
                        : 'border-[#3D2619] bg-[#140C08] hover:border-[#52331F]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-[#D4AF37]" />
                      <div>
                        <div className="font-serif text-base font-bold text-[#FFF]">{t.atelierName}</div>
                        <div className="text-xs text-[#A89885]">{t.name} • {t.city} ({t.locality})</div>
                        <div className="text-[10px] text-[#D4AF37]">{t.specialties.join(', ')}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-serif text-base font-bold text-[#E5C378]">
                        From ₹{t.startingPrice.toLocaleString('en-IN')}
                      </span>
                      <div className="text-[10px] text-[#8C7A68]">{t.turnaroundDays}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 8: REVIEW & SUBMIT */}
          {currentStep === 8 && (
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                  Step 8: Final Review
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#FFF7E8] mt-1">
                  Ready to Request Bespoke Quotation
                </h2>
                <p className="text-xs text-[#A89885] mt-1">
                  Your request will be submitted to the atelier. You can negotiate price in Indian Rupees (₹) immediately.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-[#140C08] border border-[#3E2415] rounded-xl p-6 text-xs text-[#D8C9B5] space-y-3">
                <div className="flex justify-between py-1 border-b border-[#2C1910]">
                  <span className="text-[#8C7A68]">Garment & Gender:</span>
                  <span className="font-bold text-[#FFF]">{gender} • {garmentType} ({attireType})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#2C1910]">
                  <span className="text-[#8C7A68]">Fabric Selected:</span>
                  <span className="font-medium text-[#FFF]">{selectedFabric}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#2C1910]">
                  <span className="text-[#8C7A68]">Color & Pattern:</span>
                  <span className="font-medium text-[#FFF]">{selectedColor} / {selectedPattern}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#2C1910]">
                  <span className="text-[#8C7A68]">Sleeve & Neckline:</span>
                  <span className="font-medium text-[#FFF]">{selectedSleeve} / {selectedNeckline}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#2C1910]">
                  <span className="text-[#8C7A68]">Embroidery & Craft:</span>
                  <span className="font-medium text-[#FFF]">{selectedEmbroidery}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#2C1910]">
                  <span className="text-[#8C7A68]">Target Budget:</span>
                  <span className="font-serif font-bold text-base text-[#E5C378]">₹{budgetEstimate.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#8C7A68]">Selected Atelier:</span>
                  <span className="font-bold text-[#D4AF37]">
                    {tailors.find((t) => t.id === chosenTailorId)?.atelierName}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="mt-10 pt-6 border-t border-[#331C10] flex items-center justify-between gap-3">
            {currentStep > 1 ? (
              <button
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-5 py-2.5 rounded bg-[#22130B] hover:bg-[#341E12] text-xs font-semibold text-[#D8C9B5] border border-[#3E2415] flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Step</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              {currentStep === 8 && (
                <button
                  type="button"
                  onClick={() =>
                    openAIAssistWithPrompt(
                      `I am designing a bespoke ${gender} ${garmentType} (${attireType}) using ${selectedFabric} in ${selectedColor} with ${selectedEmbroidery} embroidery and budget around ₹${budgetEstimate.toLocaleString('en-IN')}. What lining, structural canvassing, and tailor negotiation advice do you recommend?`
                    )
                  }
                  className="px-4 py-2.5 rounded bg-[#2A170F] hover:bg-[#3D2214] text-xs font-semibold text-[#E5C378] border border-[#D4AF37]/40 flex items-center gap-1.5 cursor-pointer"
                  title="Ask AI Concierge for Design Advice"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>✦ AI Style Review</span>
                </button>
              )}

              {currentStep < 8 ? (
                <button
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="px-6 py-2.5 rounded bg-[#D4AF37] hover:bg-[#E5C378] text-xs font-bold text-[#120B08] flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Continue to Step {currentStep + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitBespokeRequest}
                  className="px-8 py-3 rounded bg-gradient-to-r from-[#B8911C] via-[#D4AF37] to-[#A88118] hover:brightness-110 text-xs font-bold uppercase tracking-wider text-[#120B08] flex items-center gap-2 cursor-pointer shadow-xl"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Bespoke Request & Start Negotiation</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
