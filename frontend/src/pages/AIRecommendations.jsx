// src/pages/AIRecommendations.jsx
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Copy, RefreshCw } from "lucide-react";

const AIRecommendations = () => {
  const [transactions, setTransactions] = useState([]);
  const [rawRecommendations, setRawRecommendations] = useState(""); // full AI string
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [loadingAI, setLoadingAI] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const token = localStorage.getItem("token");
  const cardRef = useRef(null);
  const typingSpeed = 14;

  // Fetch transactions once
  const fetchTransactions = async () => {
    setLoadingTransactions(true);
    try {
      const { data } = await axios.get("/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(data || []);
    } catch (err) {
      console.error("Transactions fetch error:", err);
      toast.error("Failed to load transactions.");
      setTransactions([]);
    } finally {
      setLoadingTransactions(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Run AI
  const runAI = async () => {
    if (!transactions || transactions.length === 0) {
      toast.error("No transactions to analyze.");
      return;
    }

    setLoadingAI(true);
    const loadingId = toast.loading("Analyzing your transactions...");

    try {
      const res = await axios.post(
        "/api/ai/recommend",
        { transactions },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const raw = res?.data?.recommendations ?? "";
      setRawRecommendations(raw);

      setExpanded(true); // auto expand to show full output
      setTypedText("");
      setIsTyping(true);

      toast.dismiss(loadingId);
      toast.success("AI recommendations ready!");

      setTimeout(
        () =>
          cardRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        120
      );
    } catch (err) {
      console.error("AIRecommendations ERROR:", err);
      toast.dismiss(loadingId);
      const msg =
        err?.response?.data?.error || "Failed to fetch AI recommendations.";
      toast.error(msg);
    } finally {
      setLoadingAI(false);
    }
  };

  // Typewriter effect
  useEffect(() => {
    if (!expanded || !rawRecommendations) {
      setTypedText("");
      setIsTyping(false);
      return;
    }

    let i = 0;
    const timer = setInterval(() => {
      i++;
      setTypedText(rawRecommendations.slice(0, i));
      if (i >= rawRecommendations.length) {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, [expanded, rawRecommendations]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawRecommendations || "");
      toast.success("Copied recommendations!");
    } catch {
      toast.error("Copy failed.");
    }
  };

  return (
    <div className="min-h-[50vh] p-6" ref={cardRef}>
      <Toaster />
      <h2 className="text-3xl font-bold mb-6">AI Recommendations</h2>

      {/* Controls */}
      <div className="flex gap-3 items-center mb-4 flex-wrap">
        <button
          onClick={runAI}
          disabled={loadingAI}
          className="btn btn-primary inline-flex items-center gap-2 transform transition hover:scale-105"
        >
          <RefreshCw className="size-4" />
          {loadingAI ? "Analyzing..." : "Run AI Recommendations"}
        </button>

        <button
          onClick={fetchTransactions}
          disabled={loadingTransactions}
          className="btn btn-ghost inline-flex items-center gap-2"
        >
          {loadingTransactions ? "Refreshing..." : "Refresh Transactions"}
        </button>

        <button
          onClick={handleCopy}
          disabled={!rawRecommendations}
          className="btn btn-outline ml-auto"
        >
          <Copy className="size-4" /> Copy
        </button>
      </div>

      {/* Gradient Card */}
      <div
        className="rounded-xl shadow-lg p-5 transition-all duration-500"
        style={{
          background:
            "linear-gradient(135deg, rgba(14,165,233,0.06) 0%, rgba(99,102,241,0.03) 45%, rgba(56,189,248,0.04) 100%)",
          border: "1px solid rgba(99,102,241,0.06)",
        }}
      >
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/90 dark:bg-white/5 shadow-sm">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <div className="text-lg font-semibold">SoraFinance AI</div>
            <div className="text-sm text-base-content/60">
              Friendly tips in ₱ for everyday Filipinos
            </div>
          </div>
        </div>

        {/* Full output only */}
        {rawRecommendations ? (
          <div className="overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out max-h-[1400px] opacity-100">
            <div className="p-4 rounded-lg bg-white/80 dark:bg-black/20 border border-base-200/20 min-h-[56px]">
              <div className="whitespace-pre-wrap text-base leading-relaxed">
                {isTyping ? typedText : rawRecommendations}
              </div>
            </div>

            {/* Buttons below */}
            <div className="mt-3 flex gap-2">
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => {
                  setExpanded(false);
                  setIsTyping(false);
                  setTypedText("");
                }}
              >
                Show Less
              </button>
              <button className="btn btn-sm btn-ghost" onClick={handleCopy}>
                Copy Full
              </button>
            </div>
          </div>
        ) : (
          !loadingAI && (
            <div className="text-base-content/60">
              Click <span className="font-medium">Run AI Recommendations</span>{" "}
              to analyze your transactions.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AIRecommendations;
