"use client"

import { useState, useRef, useEffect } from "react"
import { Mic, Search, Globe, Sprout, Landmark, Stethoscope, CloudRain, Volume2, Settings, FileText, Loader2, Square } from "lucide-react"

export default function Dashboard() {
  const [query, setQuery] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [answers, setAnswers] = useState<Array<{question: string, answer: string}>>([])
  
  // Speech Recognition setup
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'en-IN' // Indian English 

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setQuery(transcript)
        setIsListening(false)
        // Automatically submit the voice query!
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
  }, [])

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true)
      recognitionRef.current.start()
    } else {
      alert("Voice recognition is not supported in this browser. Please use Chrome.")
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  // Text to Speech
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel() // Stop any current speech
      
      // Clean up the text (remove emojis and markdown for better speech)
      const cleanText = text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
      
      const utterance = new SpeechSynthesisUtterance(cleanText)
      utterance.lang = 'en-IN'
      window.speechSynthesis.speak(utterance)
    } else {
      alert("Text-to-speech is not supported in this browser.")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmitEvent(query)
  }

  const handleSubmitEvent = async (textToSubmit: string) => {
    if (!textToSubmit.trim()) return

    const currentQuery = textToSubmit
    setIsThinking(true)
    setQuery("")
    
    // Add an empty answer placeholder immediately
    setAnswers(prev => [{ question: currentQuery, answer: "" }, ...prev])

    try {
      const res = await fetch("https://sahayak-ai-65s6.onrender.com/api/ask/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: currentQuery, language: "en" })
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
          newAnswers[0] = { ...newAnswers[0], answer: newAnswers[0].answer + chunk }
          return newAnswers
        })
      }
    } catch (error: any) {
      console.error("Failed to fetch:", error)
      setAnswers(prev => {
        const newAnswers = [...prev]
        newAnswers[0].answer = `Error: Backend connection failed. Make sure the Python server is running in the background! Details: ${error.message}`
        return newAnswers
      })
      setIsThinking(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto border-x border-zinc-200 bg-white text-zinc-900">
      <header className="flex items-center justify-between p-4 border-b border-zinc-200 sticky top-0 bg-white/90 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <Globe className="h-6 w-6 text-green-600" />
          <h1 className="font-bold text-lg tracking-tight">Sahayak AI</h1>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 h-8 px-3 border border-zinc-200 rounded-full font-medium hover:bg-zinc-100 transition-colors">
            <Globe className="h-4 w-4" />
            <span className="text-xs">English</span>
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 space-y-8 overflow-y-auto pb-32">
        <section className="text-center space-y-4 pt-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800">How can we help you today?</h2>
          <p className="text-sm text-zinc-500 pb-2">
            Tap the microphone and ask a question.
          </p>
          
          <div className="relative group pt-2 pb-4">
            {isListening && (
              <div className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-40 animate-pulse"></div>
            )}
            {!isListening && (
              <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            )}
            <button 
              onClick={isListening ? stopListening : startListening}
              className={`relative flex items-center justify-center mx-auto h-24 w-24 rounded-full text-white shadow-xl transition-transform active:scale-95 border-4 border-white ${isListening ? 'bg-red-500' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {isListening ? <Square className="h-8 w-8" /> : <Mic className="h-10 w-10" />}
            </button>
          </div>
          <p className={`text-xs font-semibold uppercase tracking-wider mt-4 ${isListening ? 'text-red-500 animate-pulse' : 'text-green-600'}`}>
            {isListening ? "Listening... Tap to stop" : "Tap to Speak"}
          </p>
        </section>

        <section>
          <form onSubmit={handleSubmit} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isListening ? "Listening to your voice..." : "Or type your question here..."} 
              disabled={isThinking || isListening}
              className="w-full pl-12 pr-4 py-4 text-base rounded-2xl bg-zinc-100 border border-transparent focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all disabled:opacity-50"
            />
            {isThinking && (
              <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-600 animate-spin" />
            )}
          </form>
        </section>

        {answers.length > 0 && (
          <section className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <SparklesIcon /> Chat History
            </h3>
            {answers.map((ans, i) => (
              <div key={i} className="rounded-xl border border-green-200 bg-green-50 p-4 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-start justify-between mb-2">
                  <span className="font-semibold text-sm text-green-900 opacity-70">Q: {ans.question}</span>
                  <button 
                    onClick={() => speakText(ans.answer)}
                    className="p-2 -mr-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-full transition-colors shrink-0"
                    title="Read Aloud"
                  >
                    <Volume2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="text-sm text-green-900 leading-relaxed whitespace-pre-wrap">
                  {ans.answer === "" ? (
                    <span className="flex items-center gap-2 animate-pulse">
                      <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                      <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                      <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                    </span>
                  ) : (
                    ans.answer
                  )}
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}

function SparklesIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
  )
}
