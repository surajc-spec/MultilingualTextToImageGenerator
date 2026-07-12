import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Check,
  Image as ImageIcon,
} from "lucide-react";
import Navbar from "../components/Navbar";

const Generate = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("English");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const languages = [
    { name: "English", native: "English" },
    { name: "Hindi", native: "हिंदी" },
    { name: "Marathi", native: "मराठी" },
    { name: "Bengali", native: "বাংলা" },
    { name: "Tamil", native: "தமிழ்" },
    { name: "Telugu", native: "తెలుగు" },
    { name: "Gujarati", native: "ગુજરાતી" },
    { name: "Kannada", native: "ಕನ್ನಡ" },
    { name: "Malayalam", native: "മലയാളം" },
    { name: "Punjabi", native: "ਪੰਜਾਬੀ" },
    { name: "Urdu", native: "اردو" },
    { name: "Odia", native: "ଓଡ଼ିଆ" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const token = localStorage.getItem("token");

      const apiBaseUrl =
        import.meta.env.VITE_API_BASE_URL ||
        "http://localhost:3000";

      console.log("Prompt:", prompt);
      console.log("Language:", language);

      const response = await fetch(
        `${apiBaseUrl}/api/v1/images/generate`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            prompt: prompt.trim(),
            language,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            result.message ||
            "Failed to generate image. Please try again."
        );
      }

      console.log("Aura AI Response:", result);
      console.log("Original Prompt:", result.originalPrompt);
      console.log("Translated Prompt:", result.translatedPrompt);

      if (!result.image) {
        throw new Error("Image was not returned by the server.");
      }

      setImageUrl(result.image.imageUrl);
    } catch (err) {
      console.error("Generate Error:", err);

      setError(
        err.message || "Something went wrong while generating the image."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--bg)]">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold leading-tight text-[var(--text-h)] sm:text-3xl lg:text-4xl">
            MultiLingual Text to Image Generator
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text)] sm:text-base">
            Describe what you want to see in any Indian language and
            Aura AI will bring your imagination to life.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-[380px_minmax(0,1fr)] xl:grid-cols-[400px_minmax(0,1fr)] xl:gap-8">
          {/* LEFT PANEL */}

          <div className="w-full min-w-0 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4 shadow-[var(--shadow)] sm:p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleGenerate();
              }}
              className="space-y-5"
            >
              {/* PROMPT */}

              <div>
                <label
                  htmlFor="prompt"
                  className="mb-2 block text-sm font-medium text-[var(--text-h)]"
                >
                  Image Prompt
                </label>

                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. A peacock dancing in the rain over the Taj Mahal"
                  maxLength={200}
                  className="h-32 w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3 text-sm text-[var(--text-h)] outline-none transition placeholder:text-[var(--text)] focus:ring-2 focus:ring-[var(--accent-border)] sm:h-36 sm:p-4 sm:text-base"
                />

                <div className="mt-2 text-right text-xs text-[var(--text)]">
                  {prompt.length} / 200
                </div>
              </div>

              {/* LANGUAGE */}

              <div ref={dropdownRef} className="relative">
                <label className="mb-2 block text-sm font-medium text-[var(--text-h)]">
                  Prompt Language
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setLanguageOpen((previous) => !previous)
                  }
                  className="flex w-full items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-left outline-none transition hover:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-border)]"
                >
                  <div className="min-w-0">
                    <span className="block truncate text-sm font-medium text-[var(--text-h)]">
                      {language}
                    </span>

                    <span className="block truncate text-xs text-[var(--text)]">
                      {
                        languages.find(
                          (item) => item.name === language
                        )?.native
                      }
                    </span>
                  </div>

                  <ChevronDown
                    className={`ml-3 h-5 w-5 shrink-0 text-[var(--text)] transition-transform duration-200 ${
                      languageOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {languageOpen && (
                  <div className="absolute left-0 right-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--bg)] p-2 shadow-2xl sm:max-h-64">
                    {languages.map((lang) => {
                      const selected = language === lang.name;

                      return (
                        <button
                          key={lang.name}
                          type="button"
                          onClick={() => {
                            setLanguage(lang.name);
                            setLanguageOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition ${
                            selected
                              ? "bg-[var(--accent-bg)] text-[var(--accent)]"
                              : "text-[var(--text-h)] hover:bg-[var(--code-bg)]"
                          }`}
                        >
                          <div className="min-w-0">
                            <span className="block truncate text-sm font-medium">
                              {lang.name}
                            </span>

                            {lang.name !== lang.native && (
                              <span className="mt-0.5 block truncate text-xs text-[var(--text)]">
                                {lang.native}
                              </span>
                            )}
                          </div>

                          {selected && (
                            <Check className="ml-3 h-4 w-4 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* GENERATE */}

              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 text-sm font-semibold text-white transition hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:text-base"
              >
                {loading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Generating...
                  </>
                ) : (
                  "Generate Image"
                )}
              </button>
            </form>

            {error && (
              <div className="mt-5 break-words rounded-xl border border-[var(--accent-border)] bg-[var(--accent-bg)] p-4 text-sm font-medium text-[var(--accent)]">
                {error}
              </div>
            )}
          </div>

          {/* RIGHT PANEL */}

          <div className="flex min-h-[340px] w-full min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4 shadow-[var(--shadow)] sm:min-h-[420px] sm:p-6 lg:min-h-[500px]">
            {loading ? (
              <div className="flex flex-col items-center px-4 text-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--accent-border)] border-t-[var(--accent)]" />

                <p className="mt-5 font-medium text-[var(--text-h)]">
                  Creating your image...
                </p>

                <p className="mt-2 text-sm text-[var(--text)]">
                  Aura AI is processing your prompt.
                </p>
              </div>
            ) : imageUrl ? (
              <div className="flex w-full items-center justify-center">
                <img
                  src={imageUrl}
                  alt={prompt}
                  className="h-auto max-h-[320px] w-auto max-w-full rounded-xl object-contain sm:max-h-[400px] lg:max-h-[460px]"
                />
              </div>
            ) : (
              <div className="max-w-sm px-4 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-bg)]">
                  <ImageIcon className="h-7 w-7 text-[var(--accent)]" />
                </div>

                <h2 className="mt-5 text-lg font-semibold text-[var(--text-h)] sm:text-xl">
                  Your creation will appear here
                </h2>

                <p className="mt-3 text-sm leading-6 text-[var(--text)]">
                  Enter a prompt, select the prompt language and generate
                  your AI image.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Generate;