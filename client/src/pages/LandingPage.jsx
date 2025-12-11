import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Rocket, 
  Target, 
  Lightbulb, 
  Globe, 
  Sparkles, 
  ChevronRight,
  Menu,
  X,
  ArrowUpRight,
  CheckCircle2,
  Zap,
  Users2,
  BookOpenCheck,
  GraduationCap
} from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const coreFeatures = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Learning",
      description: "Personalized learning paths adapted to your pace and style",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Interactive Live Classes",
      description: "Engage in real-time with instructors and peers worldwide",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Goal-Oriented Progress",
      description: "Track achievements and reach milestones with precision",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Creative Problem Solving",
      description: "Develop critical thinking through hands-on projects",
      color: "from-orange-500 to-red-500"
    }
  ];

  const benefits = [
    "Learn at your own pace with flexible scheduling",
    "Access to world-class instructors and mentors",
    "Interactive assignments and real-world projects",
    "Comprehensive progress tracking and analytics",
    "Community-driven learning environment",
    "Industry-recognized certifications"
  ];

  const achievements = [
    { 
      icon: <Users2 className="w-6 h-6" />,
      number: "25K+", 
      label: "Global Learners",
      description: "Students from 50+ countries"
    },
    { 
      icon: <GraduationCap className="w-6 h-6" />,
      number: "1.2K+", 
      label: "Expert Mentors",
      description: "Industry professionals"
    },
    { 
      icon: <BookOpenCheck className="w-6 h-6" />,
      number: "500+", 
      label: "Courses Available",
      description: "Across multiple domains"
    },
    { 
      icon: <Zap className="w-6 h-6" />,
      number: "98%", 
      label: "Success Rate",
      description: "Course completion"
    }
  ];

  const successStories = [
    {
      name: "Alex Chen",
      role: "Software Developer",
      company: "Google",
      content: "This platform transformed my career. The hands-on projects and mentorship helped me land my dream job.",
      image: "https://ui-avatars.com/api/?name=Alex+Chen&background=6366f1&color=fff&size=150"
    },
    {
      name: "Maria Rodriguez",
      role: "Data Scientist",
      company: "Microsoft",
      content: "The AI-powered learning paths adapted perfectly to my schedule. I completed my certification while working full-time.",
      image: "https://ui-avatars.com/api/?name=Maria+Rodriguez&background=8b5cf6&color=fff&size=150"
    },
    {
      name: "David Kim",
      role: "Product Manager",
      company: "Spotify",
      content: "The interactive sessions and real-world projects gave me the confidence to transition into tech leadership.",
      image: "https://ui-avatars.com/api/?name=David+Kim&background=06b6d4&color=fff&size=150"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl border-b border-gray-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                EduVerse
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Features</a>
              <a href="#courses" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Courses</a>
              <a href="#success" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Success Stories</a>
              <Link
                to="/login"
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all font-medium"
              >
                Start Learning
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-indigo-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-indigo-600 font-medium">Features</a>
                <a href="#courses" className="text-gray-600 hover:text-indigo-600 font-medium">Courses</a>
                <a href="#success" className="text-gray-600 hover:text-indigo-600 font-medium">Success Stories</a>
                <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium">Sign In</Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full text-center font-medium"
                >
                  Start Learning
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Learning Platform</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-gray-900">Master</span>
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Tomorrow's Skills
                </span>
                <br />
                <span className="text-gray-900">Today</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Join the future of education with personalized AI learning, live mentorship, 
                and hands-on projects that prepare you for real-world success.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/register')}
                  className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Begin Your Journey</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-indigo-300 hover:text-indigo-600 transition-all flex items-center justify-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Explore Courses</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Right Column - Interactive Feature Showcase */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="space-y-6">
                  {coreFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-2xl transition-all duration-500 cursor-pointer ${
                        activeFeature === index
                          ? 'bg-gradient-to-r ' + feature.color + ' text-white transform scale-105'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveFeature(index)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-xl ${activeFeature === index ? 'bg-white/20' : 'bg-white'}`}>
                          <div className={activeFeature === index ? 'text-white' : 'text-gray-600'}>
                            {feature.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className={`font-semibold ${activeFeature === index ? 'text-white' : 'text-gray-900'}`}>
                            {feature.title}
                          </h3>
                          <p className={`text-sm ${activeFeature === index ? 'text-white/90' : 'text-gray-600'}`}>
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl rotate-12 shadow-lg"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl -rotate-12 shadow-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Learners Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join a global community of ambitious learners and industry experts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-indigo-600">
                    {achievement.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{achievement.number}</div>
                <div className="text-lg font-semibold text-gray-700 mb-1">{achievement.label}</div>
                <div className="text-sm text-gray-500">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Why Choose 
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {" "}EduVerse?
                  </span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Experience learning like never before with our cutting-edge platform designed 
                  for the modern learner's success.
                </p>
              </div>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-indigo-600 transition-colors">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center space-x-2"
              >
                <span>Start Your Journey</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Learning Dashboard</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Course Progress</span>
                        <span className="text-sm text-indigo-600 font-semibold">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full w-3/4"></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-xl text-center">
                        <div className="text-2xl font-bold text-green-600">12</div>
                        <div className="text-sm text-gray-600">Completed</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-xl text-center">
                        <div className="text-2xl font-bold text-blue-600">4</div>
                        <div className="text-sm text-gray-600">In Progress</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="text-sm font-medium text-gray-700 mb-2">Next Live Session</div>
                      <div className="text-lg font-semibold text-gray-900">Advanced React Patterns</div>
                      <div className="text-sm text-gray-500">Tomorrow at 2:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating notification */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Achievement Unlocked!</div>
                    <div className="text-xs text-gray-500">Course Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories That Inspire
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real people, real transformations. See how EduVerse has helped learners 
              achieve their career goals and unlock new opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-3xl hover:shadow-xl transition-all transform hover:-translate-y-2">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{story.name}</h3>
                    <p className="text-indigo-600 font-medium">{story.role}</p>
                    <p className="text-gray-500 text-sm">{story.company}</p>
                  </div>
                </div>
                
                <blockquote className="text-gray-700 italic leading-relaxed">
                  "{story.content}"
                </blockquote>
                
                <div className="mt-6 flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center space-x-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Rocket className="w-4 h-4" />
            <span>Limited Time Offer</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Your Future Starts
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Right Now
            </span>
          </h2>
          
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Don't wait for tomorrow to build the skills you need today. 
            Join EduVerse and start your transformation journey with personalized AI learning.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => navigate('/register')}
              className="group bg-white text-indigo-900 px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all flex items-center space-x-3"
            >
              <span>Start Learning Free</span>
              <div className="bg-indigo-100 p-1 rounded-full group-hover:bg-indigo-200 transition-colors">
                <ChevronRight className="w-5 h-5 text-indigo-600" />
              </div>
            </button>
            
            <div className="text-center">
              <div className="text-white/80 text-sm mb-1">No credit card required</div>
              <div className="text-white/60 text-xs">Free forever plan available</div>
            </div>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-8 text-white/60">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm">30-day money back</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm">Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm">24/7 support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  EduVerse
                </span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md mb-8">
                Empowering the next generation of learners with AI-powered education, 
                personalized mentorship, and real-world skills.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-6">Learn</h3>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Browse Courses</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Live Sessions</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Skill Assessments</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Certifications</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Learning Paths</a></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h3 className="font-bold text-lg mb-6">Support</h3>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">System Status</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                &copy; 2024 EduVerse. All rights reserved. Built with ❤️ for learners worldwide.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0 text-sm text-gray-400">
                <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
                <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
                <a href="#" className="hover:text-indigo-400 transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
