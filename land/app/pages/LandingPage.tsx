import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ChlorobiotoaLogo } from '../components/ChlorobiotoaLogo';
import { Sparkles, Camera, MessageSquare, Leaf, ArrowRight, CheckCircle2, Zap, Shield, Globe } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Camera,
      title: 'Instant Identification',
      description: 'Upload any plant photo and get accurate identification in seconds using advanced AI technology.'
    },
    {
      icon: MessageSquare,
      title: 'Expert Chat Assistant',
      description: 'Ask unlimited questions about plant care, habitat, propagation, and more from our AI expert.'
    },
    {
      icon: Leaf,
      title: 'Comprehensive Database',
      description: 'Access information on thousands of plant species from around the world with detailed taxonomic data.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get results in under 2 seconds with our optimized machine learning models.'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your images and data are secure. We prioritize your privacy and never share your information.'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Identify plants from any region - tropical, temperate, desert, and everything in between.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-emerald-300/20 rounded-full blur-3xl"
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

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="bg-white/80 backdrop-blur-md border-b border-green-100"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <ChlorobiotoaLogo className="w-10 h-10" />
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
              transition={{ delay: 0.2 }}
            >
              <Button
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, type: "spring", damping: 20 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-block mb-4"
              >
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Powered by Advanced AI
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Discover the
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Green World </span>
                Around You
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Identify any plant instantly with our AI-powered recognition system. Get expert care advice, learn about habitats, and become a plant expert.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  onClick={() => navigate('/auth')}
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                >
                  Start Identifying
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-green-600 text-green-700 hover:bg-green-50 text-lg px-8 py-6"
                >
                  Watch Demo
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 flex items-center gap-6 text-sm text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span>No credit card required</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", damping: 20 }}
              className="relative"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Card className="bg-white/90 backdrop-blur p-8 shadow-2xl border-0">
                    <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center overflow-hidden relative">
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          background: [
                            'linear-gradient(45deg, #d1fae5 0%, #a7f3d0 100%)',
                            'linear-gradient(90deg, #a7f3d0 0%, #6ee7b7 100%)',
                            'linear-gradient(135deg, #6ee7b7 0%, #d1fae5 100%)',
                            'linear-gradient(45deg, #d1fae5 0%, #a7f3d0 100%)',
                          ]
                        }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      <ChlorobiotoaLogo className="w-48 h-48 relative z-10" />
                    </div>
                  </Card>
                </motion.div>

                {/* Floating cards */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -left-8 top-1/4 bg-white rounded-xl shadow-lg p-4 max-w-[200px]"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">10,000+</p>
                      <p className="text-xs text-gray-500">Plant Species</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute -right-8 bottom-1/4 bg-white rounded-xl shadow-lg p-4 max-w-[200px]"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Zap className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">98% Accuracy</p>
                      <p className="text-xs text-gray-500">AI Recognition</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Know About Plants
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make plant identification and learning effortless
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 bg-white/90 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-green-600 to-emerald-600 border-0 shadow-2xl overflow-hidden">
              <div className="p-12 md:p-16 text-center text-white relative">
                <motion.div
                  className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                />
                <h3 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
                  Ready to Explore the Plant Kingdom?
                </h3>
                <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto relative z-10">
                  Join thousands of plant enthusiasts discovering and learning about plants every day
                </p>
                <Button
                  onClick={() => navigate('/auth')}
                  size="lg"
                  className="bg-white text-green-700 hover:bg-green-50 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all relative z-10"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-green-100 bg-white/50 backdrop-blur mt-20">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ChlorobiotoaLogo className="w-8 h-8" />
                <span className="text-sm text-gray-600">© 2026 Chlorobiota. All rights reserved.</span>
              </div>
              <div className="flex gap-6 text-sm text-gray-600">
                <a href="#" className="hover:text-green-600 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-green-600 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-green-600 transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
