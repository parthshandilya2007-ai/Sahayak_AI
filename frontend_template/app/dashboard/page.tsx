"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { 
  Mic, Search, Globe, Volume2, VolumeX, Loader2, Square, ChevronDown, 
  Sparkles, ArrowLeft, Copy, Check, Sprout, Landmark, CloudRain, 
  Stethoscope, Zap, RefreshCw, Send
} from "lucide-react"

const LANGUAGES = [
  { code: "en", label: "English", native: "English", langCode: "en-IN" },
  { code: "hi", label: "Hindi", native: "हिंदी", langCode: "hi-IN" },
  { code: "bn", label: "Bengali", native: "বাংলা", langCode: "bn-IN" },
  { code: "mr", label: "Marathi", native: "मराठी", langCode: "mr-IN" },
  { code: "ta", label: "Tamil", native: "தமிழ்", langCode: "ta-IN" },
  { code: "te", label: "Telugu", native: "తెలుగు", langCode: "te-IN" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ", langCode: "kn-IN" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી", langCode: "gu-IN" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ", langCode: "pa-IN" },
]

const QUICK_PROMPTS = [
  { icon: Sprout, label: "Mandi Crop Prices", query: "What are today's wheat and rice prices in local Mandi?" },
  { icon: Landmark, label: "Government Schemes", query: "How to check eligibility for PM-Kisan Samman Nidhi?" },
  { icon: CloudRain, label: "Weather Forecast", query: "What is the weather and rain forecast for my district?" },
  { icon: Stethoscope, label: "Health Guidance", query: "What are basic precautions for heatstroke and seasonal fever?" },
  { icon: Zap, label: "Solar Pump Subsidy", query: "What solar pump subsidies are available for farmers?" },
]

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "https://sahayak-ai-65s6.onrender.com").replace(/\/$/, "")

export default function Dashboard() {
  const [query, setQuery] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0])
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Array<{question: string, answer: string, timestamp: string}>>([])
  
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = selectedLang.langCode

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setQuery(transcript)
        setIsListening(false)
        handleSubmitEvent(transcript)
      }
      
      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error)
        setIsListening(false)
      }
      
      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [selectedLang])

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = selectedLang.langCode
      setIsListening(true)
      recognitionRef.current.start()
    } else {
      alert("Voice recognition is not supported in this browser. Please use Chrome or Edge.")
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const speakText = (text: string, index: number) => {
    if ('speechSynthesis' in window) {
      if (speakingIndex === index) {
        window.speechSynthesis.cancel()
        setSpeakingIndex(null)
        return
      }

      window.speechSynthesis.cancel()
      
      const cleanText = text
        .replace(/🔍 Processing your request\.\.\.\n\n/g, '')
        .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
      
      const utterance = new SpeechSynthesisUtterance(cleanText)
      utterance.lang = selectedLang.langCode

      utterance.onend = () => setSpeakingIndex(null)
      utterance.onerror = () => setSpeakingIndex(null)

      setSpeakingIndex(index)
      window.speechSynthesis.speak(utterance)
    } else {
      alert("Text-to-speech is not supported in this browser.")
    }
  }

  const copyToClipboard = (text: string, index: number) => {
    const cleanText = cleanDisplayAnswer(text)
    navigator.clipboard.writeText(cleanText)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmitEvent(query)
  }

  const handleSubmitEvent = async (textToSubmit: string) => {
    if (!textToSubmit.trim()) return

    const currentQuery = textToSubmit
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setIsThinking(true)
    setQuery("")
    
    setAnswers(prev => [{ question: currentQuery, answer: "", timestamp: now }, ...prev])

    try {
      const res = await fetch(`${API_BASE_URL}/api/ask/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: currentQuery, language: selectedLang.code })
      })
      
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`)
      }
      if (!res.body) throw new Error("No readable stream")

      setIsThinking(false)
      
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        const chunk = decoder.decode(value)
        setAnswers(prev => {
          const newAnswers = [...prev]
          newAnswers[0] = { 
            ...newAnswers[0], 
            answer: newAnswers[0].answer + chunk 
          }
          return newAnswers
        })
      }
    } catch (error: any) {
      console.error("Failed to fetch:", error)
      setAnswers(prev => {
        const newAnswers = [...prev]
        newAnswers[0] = {
          ...newAnswers[0],
          answer: `Error: Backend connection failed. Details: ${error.message}`
        }
        return newAnswers
      })
      setIsThinking(false)
    }
  }

  const cleanDisplayAnswer = (rawAnswer: string) => {
    return rawAnswer.replace(/🔍 Processing your request\.\.\.\n\n/g, '')
  }

  return (
    <div className="flex flex-col min-h-screen max-w-lg mx-auto bg-zinc-950 text-zinc-100 border-x border-zinc-800 shadow-2xl">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80 sticky top-0 bg-zinc-950/90 backdrop-blur-xl z-30">
        <div className="flex items-center gap-3">
          <Link 
            href="/" 
            className="p-1.5 rounded-full hover:bg-zinc-800/80 text-zinc-400 hover:text-white transition-colors"
            title="Back to Home"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-green-600 to-emerald-400 flex items-center justify-center shadow-sm">
              <Globe className="h-4 w-4 text-zinc-950" />
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-tight leading-none text-zinc-100">Sahayak AI</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-medium text-zinc-400">Online • Public Good AI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Language Selector Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-800 transition-all text-xs text-zinc-200 shadow-xs"
          >
            <Globe className="h-3.5 w-3.5 text-green-400" />
            <span className="font-medium">{selectedLang.native}</span>
            <ChevronDown className="h-3 w-3 text-zinc-500" />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-1.5 w-48 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl z-40 py-1.5 max-h-64 overflow-y-auto">
              <div className="px-3 py-1 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                Select Language
              </div>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLang(lang)
                    setIsLangOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-zinc-800 transition-colors flex items-center justify-between ${selectedLang.code === lang.code ? 'font-bold text-green-400 bg-green-950/40' : 'text-zinc-300'}`}
                >
                  <span>{lang.native} ({lang.label})</span>
                  {selectedLang.code === lang.code && <span className="w-1.5 h-1.5 rounded-full bg-green-400" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-4 space-y-6 overflow-y-auto pb-28">
        {/* Voice Section */}
        <section className="text-center space-y-4 pt-2">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-zinc-100">
              Voice-First Assistant
            </h2>
            <p className="text-xs text-zinc-400">
              Tap mic & speak in <span className="text-green-400 font-semibold">{selectedLang.native}</span>
            </p>
          </div>
          
          {/* Animated Pulsing Mic Button */}
          <div className="relative flex items-center justify-center pt-2 pb-2">
            {isListening && (
              <>
                <div className="absolute inset-0 bg-red-500/30 rounded-full blur-2xl animate-ping" />
                <div className="absolute w-32 h-32 bg-red-500/20 rounded-full animate-pulse" />
              </>
            )}
            {!isListening && (
              <div className="absolute w-28 h-28 bg-green-500/10 rounded-full blur-xl hover:bg-green-500/20 transition-all" />
            )}
            
            <button 
              onClick={isListening ? stopListening : startListening}
              className={`relative z-10 flex items-center justify-center h-24 w-24 rounded-full text-white shadow-2xl transition-all duration-300 active:scale-95 border-4 ${
                isListening 
                  ? 'bg-gradient-to-tr from-red-600 to-rose-500 border-red-400 shadow-red-500/40' 
                  : 'bg-gradient-to-tr from-green-600 via-emerald-500 to-teal-400 border-emerald-300/40 shadow-green-500/30 hover:scale-105'
              }`}
            >
              {isListening ? (
                <Square className="h-8 w-8 text-white fill-white" />
              ) : (
                <Mic className="h-10 w-10 text-zinc-950" />
              )}
            </button>
          </div>

          <p className={`text-xs font-semibold uppercase tracking-wider ${isListening ? 'text-red-400 animate-pulse' : 'text-green-400'}`}>
            {isListening ? "Listening... Tap to Stop" : "Tap Microphone to Speak"}
          </p>
        </section>

        {/* Quick Suggestion Prompts */}
        <section className="space-y-2">
          <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider px-1">
            Popular Queries (Tap to ask)
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {QUICK_PROMPTS.map((item, idx) => {
              const IconComp = item.icon
              return (
                <button
                  key={idx}
                  onClick={() => handleSubmitEvent(item.query)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-green-500/50 hover:bg-zinc-800/80 transition-all text-xs text-zinc-300 shrink-0 shadow-xs"
                >
                  <IconComp className="h-3.5 w-3.5 text-green-400 shrink-0" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </section>

        {/* Text Input Section */}
        <section>
          <form onSubmit={handleSubmit} className="relative">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isListening ? `Listening in ${selectedLang.native}...` : "Or type your question here..."} 
              disabled={isThinking || isListening}
              className="w-full pl-4 pr-12 py-3.5 text-sm rounded-2xl bg-zinc-900/90 border border-zinc-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-zinc-100 placeholder-zinc-500 outline-none transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!query.trim() || isThinking || isListening}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-green-600 hover:bg-green-500 disabled:opacity-30 disabled:hover:bg-green-600 text-zinc-950 font-bold transition-colors"
            >
              {isThinking ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </form>
        </section>

        {/* Answers / Chat History */}
        {answers.length > 0 && (
          <section className="space-y-4 pt-2">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-semibold text-xs flex items-center gap-2 text-zinc-400 uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5 text-green-400" /> Response History
              </h3>
              <button 
                onClick={() => setAnswers([])}
                className="text-[11px] text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="h-3 w-3" /> Clear
              </button>
            </div>

            {answers.map((ans, i) => {
              const cleanedText = cleanDisplayAnswer(ans.answer)
              const isSpeakingThis = speakingIndex === i
              const isCopiedThis = copiedIndex === i

              return (
                <div key={i} className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 space-y-3 shadow-md animate-in fade-in slide-in-from-bottom-3 duration-300">
                  {/* User Question Bar */}
                  <div className="flex items-start justify-between gap-3 border-b border-zinc-800/80 pb-2.5">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-semibold text-green-400 uppercase tracking-wider">User Query</span>
                      <p className="font-semibold text-sm text-zinc-100">{ans.question}</p>
                    </div>
                    <span className="text-[10px] text-zinc-500 shrink-0">{ans.timestamp}</span>
                  </div>

                  {/* AI Response Box */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="h-3 w-3" /> Sahayak AI Answer
                      </span>
                      
                      {/* Action buttons */}
                      {cleanedText.length > 0 && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => copyToClipboard(ans.answer, i)}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                            title="Copy Answer"
                          >
                            {isCopiedThis ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                          <button 
                            onClick={() => speakText(cleanedText, i)}
                            className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs ${
                              isSpeakingThis ? 'text-red-400 bg-red-950/40' : 'text-green-400 hover:bg-zinc-800'
                            }`}
                            title={isSpeakingThis ? "Stop Speaking" : "Read Aloud"}
                          >
                            {isSpeakingThis ? <VolumeX className="h-3.5 w-3.5 animate-pulse" /> : <Volume2 className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                      {ans.answer === "" ? (
                        <span className="flex items-center gap-2 py-1 text-zinc-400 text-xs font-medium">
                          <Loader2 className="h-4 w-4 animate-spin text-green-400" />
                          Generating AI response...
                        </span>
                      ) : cleanedText === "" && ans.answer.includes("Processing your request") ? (
                        <span className="flex items-center gap-2 py-1 text-zinc-400 text-xs font-medium">
                          <Loader2 className="h-4 w-4 animate-spin text-green-400" />
                          Searching & processing...
                        </span>
                      ) : (
                        cleanedText
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </section>
        )}
      </main>
    </div>
  )
}


