import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Input } from './components/ui/input';
import { ScrollArea } from './components/ui/scroll-area';
import { Upload, Send, Sparkles, Info, ChevronRight, CheckCircle2, Zap } from 'lucide-react';
import { ChlorobiotoaLogo } from './components/ChlorobiotoaLogo';

interface PlantInfo {
  commonName: string;
  scientificName: string;
  familyName: string;
  confidence?: number;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export default function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const logoRotate = useTransform(mouseX, [-300, 300], [-5, 5]);
  const logoScale = useTransform(mouseY, [-300, 300], [0.95, 1.05]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (chatMessages.length > 0) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [chatMessages, isTyping]);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processImage(file);
    }
  };

  const processImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result as string);
      identifyPlant();
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const identifyPlant = () => {
    setIsIdentifying(true);
    setChatMessages([]);
    setPlantInfo(null);
    setShowSuccess(false);

    setTimeout(() => {
      const mockPlant = {
        commonName: 'Monstera Deliciosa',
        scientificName: 'Monstera deliciosa',
        familyName: 'Araceae',
        confidence: 96
      };
      setPlantInfo(mockPlant);
      setShowSuccess(true);

      setTimeout(() => setShowSuccess(false), 3000);

      setTimeout(() => {
        setChatMessages([{
          role: 'assistant',
          content: `Great! I've identified your plant as a ${mockPlant.commonName}. This beautiful tropical plant is perfect for indoor growing. What would you like to know about it?`,
          timestamp: new Date()
        }]);
      }, 500);

      setIsIdentifying(false);
    }, 2000);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !plantInfo) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        `The ${plantInfo.commonName} thrives in bright, indirect light. It can tolerate lower light conditions but grows more slowly. Direct sunlight can scorch its beautiful leaves.`,
        `Water your ${plantInfo.commonName} when the top 2-3 inches of soil are dry. Typically this means watering once every 1-2 weeks, but always check the soil moisture first.`,
        `The ${plantInfo.commonName} is native to the tropical rainforests of Central America, where it grows as an understory plant, climbing up trees with its aerial roots.`,
        `Yes, the ${plantInfo.commonName} is toxic to pets and humans if ingested. Keep it out of reach of curious cats, dogs, and children.`,
        `To propagate your ${plantInfo.commonName}, take a stem cutting with at least one node and aerial root. Place it in water or directly in moist soil. New roots will develop in 2-4 weeks.`
      ];

      const response: ChatMessage = {
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1200);
  };

  const suggestedQuestions = [
    'What are the ideal growing conditions?',
    'How often should I water it?',
    'Is this plant toxic to pets?',
    'How do I propagate it?'
  ];

  return (
    <div className="size-full bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-green-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Success notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-6 right-6 z-50 bg-white shadow-2xl rounded-2xl p-4 border border-green-200"
          >
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ delay: 0.2, type: "spring", damping: 15 }}
              >
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </motion.div>
              <div>
                <p className="font-semibold text-gray-800">Plant Identified!</p>
                <p className="text-sm text-gray-500">Analysis complete</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="size-full flex flex-col relative z-10">
        {/* Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-20 shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                style={{ rotate: logoRotate, scale: logoScale }}
                whileHover={{ rotate: 0, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ChlorobiotoaLogo className="w-10 h-10" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                  Chlorobiota
                </h1>
                <p className="text-xs text-gray-500">AI-Powered Plant Identification</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden md:flex items-center gap-2 text-sm text-gray-600"
            >
              <Sparkles className="w-4 h-4 text-green-600" />
              <span>Advanced ML Recognition</span>
            </motion.div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="max-w-7xl mx-auto h-full p-6">
            <div className="h-full grid grid-cols-1 lg:grid-cols-5 gap-6">

              {/* Left Panel - Upload & Results */}
              <div className="lg:col-span-2 flex flex-col gap-6 overflow-auto">

                {/* Upload Card */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, type: "spring", damping: 20 }}
                >
                  <Card className="overflow-hidden shadow-lg border-0 bg-white/90 backdrop-blur">
                    <div className="p-6">
                      <motion.div
                        className="flex items-center justify-between mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h2 className="font-semibold text-gray-800">Upload Image</h2>
                        <motion.div
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Info className="w-4 h-4 text-gray-400" />
                        </motion.div>
                      </motion.div>

                      <motion.div
                        onClick={() => fileInputRef.current?.click()}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className="relative group cursor-pointer"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <motion.div
                          className={`
                            border-2 border-dashed rounded-2xl overflow-hidden transition-all duration-300
                            ${uploadedImage
                              ? 'border-green-300 bg-green-50/50'
                              : isDragging
                              ? 'border-green-500 bg-green-100/50 scale-105'
                              : 'border-gray-300 hover:border-green-400 hover:bg-green-50/30'
                            }
                          `}
                          animate={{
                            borderColor: isDragging ? '#10b981' : uploadedImage ? '#86efac' : '#d1d5db'
                          }}
                        >
                          {uploadedImage ? (
                            <motion.div
                              className="relative"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ type: "spring", damping: 15 }}
                            >
                              <img
                                src={uploadedImage}
                                alt="Uploaded plant"
                                className="w-full h-80 object-cover"
                              />
                              <motion.div
                                className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                              >
                                <motion.div
                                  className="bg-white/90 backdrop-blur rounded-full p-3"
                                  initial={{ scale: 0 }}
                                  whileHover={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  <Upload className="w-5 h-5 text-green-600" />
                                </motion.div>
                              </motion.div>
                            </motion.div>
                          ) : (
                            <div className="p-12 flex flex-col items-center gap-4">
                              <motion.div
                                className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center"
                                animate={{
                                  y: isDragging ? -10 : 0,
                                  scale: isDragging ? 1.1 : 1
                                }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <Upload className="w-8 h-8 text-green-600" />
                              </motion.div>
                              <div className="text-center">
                                <p className="font-medium text-gray-700">Drop your image here</p>
                                <p className="text-sm text-gray-500 mt-1">or click to browse</p>
                              </div>
                              <p className="text-xs text-gray-400">PNG, JPG, WEBP • Max 10MB</p>
                            </div>
                          )}
                        </motion.div>
                      </motion.div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </Card>
                </motion.div>

                {/* Results Card */}
                <AnimatePresence mode="wait">
                  {(plantInfo || isIdentifying) && (
                    <motion.div
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -50, scale: 0.9 }}
                      transition={{ type: "spring", damping: 20, stiffness: 200 }}
                    >
                      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white"
                          initial={{ x: -100 }}
                          animate={{ x: 0 }}
                          transition={{ type: "spring", damping: 20 }}
                        >
                          <h2 className="font-semibold flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                              <Sparkles className="w-5 h-5" />
                            </motion.div>
                            Identification Results
                          </h2>
                        </motion.div>

                        {isIdentifying ? (
                          <motion.div
                            className="p-12 flex flex-col items-center gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <div className="relative">
                              <motion.div
                                className="w-16 h-16 rounded-full border-4 border-green-100"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                              <motion.div
                                className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-green-600"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                            </div>
                            <motion.div
                              className="text-center"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <p className="font-medium text-gray-700">Analyzing your plant...</p>
                              <p className="text-sm text-gray-500 mt-1">Using advanced AI recognition</p>
                            </motion.div>
                          </motion.div>
                        ) : plantInfo && (
                          <div className="p-6 space-y-6">
                            <motion.div
                              className="flex items-center justify-between pb-4 border-b border-gray-100"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              <span className="text-sm text-gray-500">Confidence</span>
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-24 bg-gray-100 rounded-full overflow-hidden">
                                  <motion.div
                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${plantInfo.confidence}%` }}
                                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                                  />
                                </div>
                                <motion.span
                                  className="text-sm font-semibold text-green-600"
                                  initial={{ opacity: 0, scale: 0.5 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.5, type: "spring" }}
                                >
                                  {plantInfo.confidence}%
                                </motion.span>
                              </div>
                            </motion.div>

                            <div className="space-y-4">
                              <motion.div
                                className="group hover:bg-green-50/50 p-4 rounded-xl transition-colors cursor-pointer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                whileHover={{ x: 5 }}
                              >
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                  Common Name
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                  {plantInfo.commonName}
                                </p>
                              </motion.div>

                              <motion.div
                                className="group hover:bg-green-50/50 p-4 rounded-xl transition-colors cursor-pointer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                whileHover={{ x: 5 }}
                              >
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                  Scientific Name
                                </p>
                                <p className="text-lg italic text-gray-700 font-medium">
                                  {plantInfo.scientificName}
                                </p>
                              </motion.div>

                              <motion.div
                                className="group hover:bg-green-50/50 p-4 rounded-xl transition-colors cursor-pointer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                whileHover={{ x: 5 }}
                              >
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                  Family
                                </p>
                                <p className="text-lg text-gray-700 font-medium">
                                  {plantInfo.familyName}
                                </p>
                              </motion.div>
                            </div>
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Panel - Chat */}
              <motion.div
                className="lg:col-span-3 flex flex-col min-h-0"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, type: "spring", damping: 20 }}
              >
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur flex flex-col overflow-hidden flex-1 min-h-0">
                  <motion.div
                    className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white flex-shrink-0"
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", damping: 15 }}
                  >
                    <h2 className="font-semibold flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Plant Research Assistant
                    </h2>
                    <p className="text-sm text-green-100 mt-1">
                      Ask anything about care, habitat, propagation, and more
                    </p>
                  </motion.div>

                  <ScrollArea className="flex-1 min-h-0">
                    <div className="p-6">
                    {chatMessages.length === 0 && !plantInfo ? (
                      <motion.div
                        className="h-full flex flex-col items-center justify-center text-center p-12"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <motion.div
                          className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6"
                          animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <ChlorobiotoaLogo className="w-12 h-12" />
                        </motion.div>
                        <motion.h3
                          className="text-xl font-semibold text-gray-700 mb-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          Welcome to Chlorobiota
                        </motion.h3>
                        <motion.p
                          className="text-gray-500 max-w-md"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          Upload a plant image to get started. I'll identify it and answer all your questions about care, growth, and more.
                        </motion.p>
                      </motion.div>
                    ) : (
                      <div className="space-y-6">
                        <AnimatePresence mode="popLayout">
                          {chatMessages.map((message, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 300,
                                delay: index * 0.05
                              }}
                              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              {message.role === 'assistant' && (
                                <motion.div
                                  className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0"
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{ type: "spring", delay: index * 0.05 + 0.1 }}
                                >
                                  <ChlorobiotoaLogo className="w-5 h-5" />
                                </motion.div>
                              )}
                              <motion.div
                                className={`max-w-[75%] rounded-2xl px-5 py-3 ${
                                  message.role === 'user'
                                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-800 shadow-sm'
                                }`}
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400 }}
                              >
                                <p className="leading-relaxed">{message.content}</p>
                              </motion.div>
                            </motion.div>
                          ))}
                        </AnimatePresence>

                        {isTyping && (
                          <motion.div
                            className="flex gap-3 items-start"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                          >
                            <motion.div
                              className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring" }}
                            >
                              <ChlorobiotoaLogo className="w-5 h-5" />
                            </motion.div>
                            <div className="bg-gray-100 rounded-2xl px-5 py-3">
                              <div className="flex gap-1">
                                {[0, 1, 2].map((i) => (
                                  <motion.div
                                    key={i}
                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{
                                      duration: 0.6,
                                      repeat: Infinity,
                                      delay: i * 0.15
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {chatMessages.length > 0 && chatMessages.length < 3 && !isTyping && (
                          <motion.div
                            className="pt-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            <p className="text-xs text-gray-500 mb-3 font-medium">Suggested questions:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {suggestedQuestions.map((question, idx) => (
                                <motion.button
                                  key={idx}
                                  onClick={() => setInputMessage(question)}
                                  className="text-left text-sm px-4 py-3 rounded-xl bg-green-50 hover:bg-green-100 text-gray-700 transition-colors border border-green-100 hover:border-green-200 flex items-center justify-between group"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.6 + idx * 0.1 }}
                                  whileHover={{ scale: 1.02, x: 5 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <span>{question}</span>
                                  <motion.div
                                    initial={{ x: -5, opacity: 0 }}
                                    whileHover={{ x: 0, opacity: 1 }}
                                  >
                                    <ChevronRight className="w-4 h-4 text-green-600" />
                                  </motion.div>
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                        <div ref={scrollRef} />
                      </div>
                    )}
                    </div>
                  </ScrollArea>

                  <motion.div
                    className="p-6 border-t border-gray-100 bg-gray-50/50 flex-shrink-0"
                    initial={{ y: 50 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", damping: 20 }}
                  >
                    <div className="flex gap-3">
                      <motion.div
                        className="flex-1"
                        whileFocus={{ scale: 1.01 }}
                      >
                        <Input
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder={plantInfo ? "Ask about care, habitat, toxicity..." : "Upload an image to start chatting"}
                          disabled={!plantInfo || isTyping}
                          className="flex-1 border-gray-200 focus:border-green-400 focus:ring-green-400 rounded-xl h-12"
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={handleSendMessage}
                          disabled={!plantInfo || !inputMessage.trim() || isTyping}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl px-6 h-12 shadow-md hover:shadow-lg transition-all"
                        >
                          <motion.div
                            animate={isTyping ? { rotate: 360 } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            <Send className="w-5 h-5" />
                          </motion.div>
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
