import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineDownload,
  HiOutlineEye,
  HiOutlinePhotograph,
  HiOutlinePlus,
  HiX,
} from "react-icons/hi";

import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const apiBaseUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

      const response = await fetch(
        `${apiBaseUrl}/api/v1/images/my-images`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch images.");
      }

      setImages(result.images || []);
    } catch (error) {
      console.error("Dashboard Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = `aura-ai-${Date.now()}.jpg`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download Error:", error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* HEADER */}

        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold text-[var(--accent)]">
              YOUR CREATIONS
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-[var(--text-h)] sm:text-4xl">
              My Images
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--text)] sm:text-base">
              View and manage all images you've generated with Aura AI.
            </p>
          </div>

          <Link
            to="/generate"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 sm:w-auto"
          >
            <HiOutlinePlus size={20} />

            Generate New Image
          </Link>
        </div>

        {/* STATS */}

        {!loading && !error && (
          <div className="mb-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-bg)] text-[var(--accent)]">
                <HiOutlinePhotograph size={24} />
              </div>

              <div>
                <p className="text-2xl font-bold text-[var(--text-h)]">
                  {images.length}
                </p>

                <p className="text-sm text-[var(--text)]">
                  Total Creations
                </p>
              </div>
            </div>
          </div>
        )}

        {/* LOADING */}

        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="aspect-square animate-pulse rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
              />
            ))}
          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">
            <p className="text-sm font-medium text-red-400">
              {error}
            </p>

            <button
              onClick={fetchImages}
              className="mt-4 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Try Again
            </button>
          </div>
        )}

        {/* EMPTY STATE */}

        {!loading && !error && images.length === 0 && (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent-bg)] text-[var(--accent)]">
              <HiOutlinePhotograph size={32} />
            </div>

            <h2 className="text-xl font-semibold text-[var(--text-h)]">
              No images yet
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--text)]">
              Generate your first multilingual AI image and it will appear
              here.
            </p>

            <Link
              to="/generate"
              className="mt-6 rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white"
            >
              Create Your First Image
            </Link>
          </div>
        )}

        {/* IMAGE GRID */}

        {!loading && !error && images.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {images.map((image) => (
              <div
                key={image._id}
                className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={image.imageUrl}
                    alt="Aura AI creation"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* HOVER OVERLAY */}

                  <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <button
                      onClick={() => setSelectedImage(image)}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25"
                      aria-label="View image"
                    >
                      <HiOutlineEye size={21} />
                    </button>

                    <button
                      onClick={() => handleDownload(image.imageUrl)}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25"
                      aria-label="Download image"
                    >
                      <HiOutlineDownload size={21} />
                    </button>
                  </div>
                </div>

                {/* IMAGE INFO */}

                <div className="flex items-center justify-between p-4">
                  <span className="rounded-full bg-[var(--accent-bg)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                    {image.language}
                  </span>

                  <span className="text-xs text-[var(--text)]">
                    {formatDate(image.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* IMAGE MODAL */}

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c10]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-black/80"
              aria-label="Close preview"
            >
              <HiX size={22} />
            </button>

            <img
              src={selectedImage.imageUrl}
              alt="Aura AI creation"
              className="max-h-[75vh] w-full object-contain"
            />

            <div className="flex flex-col gap-4 border-t border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-white">
                  Aura AI Creation
                </p>

                <p className="mt-1 text-xs text-white/50">
                  {selectedImage.language} •{" "}
                  {formatDate(selectedImage.createdAt)}
                </p>
              </div>

              <button
                onClick={() =>
                  handleDownload(selectedImage.imageUrl)
                }
                className="flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                <HiOutlineDownload size={19} />

                Download Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;