import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ChlorobiotoaLogo } from '../components/ChlorobiotoaLogo';
import {
  Camera,
  History,
  BookOpen,
  Settings,
  LogOut,
  Sparkles,
  TrendingUp,
  Award,
  Leaf,
  ArrowRight
} from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const stats = [
    { label: 'Plants Identified', value: '24', icon: Camera, color: 'from-green-500 to-emerald-600' },
    { label: 'Learning Streak', value: '7 days', icon: TrendingUp, color: 'from-blue-500 to-cyan-600' },
    { label: 'Achievement Points', value: '156', icon: Award, color: 'from-purple-500 to-pink-600' },
  ];

  const recentPlants = [
    {
      name: 'Monstera Deliciosa',
      date: 'Today, 2:30 PM',
      image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=200&h=200&fit=crop'
    },
    {
      name: 'Snake Plant',
      date: 'Yesterday, 4:15 PM',
      image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=200&h=200&fit=crop'
    },
    {
      name: 'Peace Lily',
      date: '2 days ago',
      image: 'https://images.unsplash.com/photo-1593691509543-c50f610e3aa4?w=200&h=200&fit=crop'
    },
  ];

  const quickActions = [
    {
      title: 'Identify New Plant',
      description: 'Upload a photo to identify',
      icon: Camera,
      color: 'from-green-500 to-emerald-600',
      action: () => navigate('/identifier')
    },
    {
      title: 'View History',
      description: 'See all your identifications',
      icon: History,
      color: 'from-blue-500 to-cyan-600',
      action: () => {}
    },
    {
      title: 'Plant Library',
      description: 'Browse plant database',
      icon: BookOpen,
      color: 'from-purple-500 to-pink-600',
      action: () => {}
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Animated background */}
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
          className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-20"
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
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </motion.div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-green-50"
              >
                <Settings className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="gap-2 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </motion.header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, Plant Explorer! 🌿
            </h2>
            <p className="text-gray-600">Ready to discover more plants today?</p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-white/90 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-green-600" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={action.action}
                >
                  <Card className="bg-white/90 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all p-6 cursor-pointer group">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">{action.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                    <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
                      <span>Start now</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <History className="w-5 h-5 text-green-600" />
              Recent Identifications
            </h3>
            <Card className="bg-white/90 backdrop-blur border-0 shadow-lg overflow-hidden">
              <div className="divide-y divide-gray-100">
                {recentPlants.map((plant, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ backgroundColor: 'rgba(16, 185, 129, 0.05)' }}
                    className="p-4 flex items-center gap-4 cursor-pointer transition-colors"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-green-100 flex-shrink-0">
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{plant.name}</h4>
                      <p className="text-sm text-gray-500">{plant.date}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="hover:bg-green-100">
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8"
          >
            <Card className="bg-gradient-to-r from-green-600 to-emerald-600 border-0 shadow-2xl overflow-hidden">
              <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                    <Leaf className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Ready to identify more plants?</h3>
                    <p className="text-green-100">Discover the green world around you</p>
                  </div>
                </div>
                <Button
                  onClick={() => navigate('/identifier')}
                  size="lg"
                  className="bg-white text-green-700 hover:bg-green-50 shadow-lg hover:shadow-xl transition-all"
                >
                  Start Identifying
                  <Camera className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
