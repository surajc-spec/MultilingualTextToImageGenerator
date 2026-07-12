import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Generate = () => {
  const [prompt, setPrompt] = useState('');
  // const [language, setLanguage] = useState('English');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const languages = [
    'English', 'Hindi', 'Marathi', 'Bengali', 'Tamil', 'Telugu',
    'Gujarati', 'Kannada', 'Malayalam', 'Punjabi', 'Urdu', 'Odia'
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const response = await fetch(`${apiBaseUrl}/api/v1/images/generate`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to generate image. Please try again.');
      }

      const result = await response.json();

      let url = null;
      if (result) {
        if (result.fileName) {
          url = `${apiBaseUrl}/${result.fileName}`;
        } else if (typeof result === 'string' && (result.startsWith('http') || result.startsWith('data:image') || result.startsWith('/'))) {
          url = result;
        } else if (result.image) {
          url = result.image;
        } else if (result.imageUrl) {
          url = result.imageUrl;
        } else if (result.url) {
          url = result.url;
        } else if (result.data) {
          if (typeof result.data === 'string') {
            url = result.data;
          } else if (Array.isArray(result.data) && result.data[0]) {
            const first = result.data[0];
            url = first.url || first.image || first.imageUrl || (typeof first === 'string' ? first : null);
          } else if (result.data.image) {
            url = result.data.image;
          } else if (result.data.imageUrl) {
            url = result.data.imageUrl;
          } else if (result.data.url) {
            url = result.data.url;
          }
        }
      }

      if (url) {
        setImageUrl(url);
      } else {
        console.error('Unexpected response format:', result);
        throw new Error(`Invalid response structure from server: ${JSON.stringify(result)}`);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[var(--bg)] min-h-screen">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-8 mt-6 py-12 md:py-16">
        {/* Page heading */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[var(--text-h)]">Text to Image Generator</h1>
          <p className="text-[var(--text)] text-sm mt-2">
            Describe what you want to see, in any Indian language, and we'll bring it to life.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-[var(--bg)] border border-[var(--border)] rounded-2xl shadow-[var(--shadow)] p-6 md:p-10">
          <form
            onSubmit={(e) => {
               e.preventDefault();
               handleGenerate();
            }}
            className="space-y-6"
          >
            {/* Prompt input */}
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-[var(--text-h)] mb-2">
                Image Prompt
              </label>
              <textarea
                id="prompt"
                className="w-full h-32 p-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] resize-none outline-none transition-all focus:ring-2 focus:ring-[var(--accent-border)]"
                placeholder="e.g. A peacock dancing in the rain over the Taj Mahal"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                
                
              />
            </div>

            {/* Language select */}
            {/* <div>
              <label htmlFor="language" className="block text-sm font-medium text-[var(--text-h)] mb-2">
                Prompt Language
              </label>
              <select
                id="language"
                className="w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] outline-none transition-all focus:ring-2 focus:ring-[var(--accent-border)]"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select> */}
             
            {/* </div> */}

            {/* Submit button */}
            <div className="flex items-center justify-end pt-2">
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-semibold text-white bg-[var(--accent)] transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  'Generate Image'
                )}
              </button>
            </div>
          </form>

          {/* Error state */}
          {error && (
            <div className="mt-6 p-4 rounded-lg border border-[var(--accent-border)] bg-[var(--accent-bg)] text-[var(--accent)] flex items-center gap-3 text-sm font-medium">
              <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Result area */}
          {(imageUrl || loading) && (
            <div className="mt-8 pt-8 border-t border-[var(--border)]">
              <div className="relative aspect-square w-full max-w-xl mx-auto overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--code-bg)]">
                {loading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center animate-pulse">
                    <div className="w-12 h-12 rounded-full border-4 border-[var(--accent-border)] border-t-[var(--accent)] animate-spin"></div>
                    <p className="mt-4 text-[var(--text)] font-medium tracking-wide">Processing prompt...</p>
                  </div>
                ) : imageUrl && (
                  <img
                    src={imageUrl}
                    alt={prompt}
                    className="h-full w-full object-cover transition-opacity duration-500"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Generate;