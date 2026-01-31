"use client";

import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Brain, 
  Users, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  Github, 
  BookOpen,
  CheckCircle,
  Phone,
  Code,
  UserCheck,
  ArrowRight,
  Rocket,
  Award,
  Target,
  Server,
  GraduationCap,
  Network,
  Globe,
  Star,
  ChevronDown,
  Mail
} from 'lucide-react';

const HiringClientPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const visionItems = [
    {
      icon: Brain,
      title: "Multi-Agent Lab",
      description: "World's first research lab focused on agent collaboration and autonomous systems",
      gradient: "from-red-500/20 to-pink-500/20"
    },
    {
      icon: Network,
      title: "Autonomous Corporations",
      description: "Building fully autonomous corporations that operate 24/7 with perfect coordination",
      gradient: "from-red-400/20 to-orange-500/20"
    },
    {
      icon: Server,
      title: "Industry Simulation",
      description: "Digital twins of entire industries through advanced agent networks",
      gradient: "from-red-600/20 to-red-400/20"
    },
    {
      icon: Globe,
      title: "Civilization Scale",
      description: "Simulating and optimizing complex societies through autonomous systems",
      gradient: "from-pink-500/20 to-red-500/20"
    }
  ];

  const values = [
    {
      icon: Users,
      title: "Humanity First",
      description: "Every advancement we make is guided by its positive impact on humanity",
      gradient: "from-blue-500/20 to-red-500/20"
    },
    {
      icon: Target,
      title: "Intense Focus",
      description: "Unwavering dedication to solving the most challenging problems in AI",
      gradient: "from-purple-500/20 to-red-500/20"
    },
    {
      icon: BookOpen,
      title: "Research Focused",
      description: "Pushing the boundaries of what's possible through rigorous research",
      gradient: "from-red-500/20 to-orange-500/20"
    },
    {
      icon: Zap,
      title: "Hard Work",
      description: "Relentless pursuit of excellence and breakthrough solutions",
      gradient: "from-yellow-500/20 to-red-500/20"
    },
    {
      icon: Star,
      title: "Creativity",
      description: "Innovative thinking that transforms theoretical concepts into reality",
      gradient: "from-green-500/20 to-red-500/20"
    }
  ];

  const qualities = [
    {
      icon: Zap,
      title: "Exceptional Drive",
      description: "Relentless pursuit of breakthrough solutions"
    },
    {
      icon: BookOpen,
      title: "Research Excellence",
      description: "Published work or significant technical contributions"
    },
    {
      icon: Github,
      title: "Open Source Impact",
      description: "500+ commits demonstrating consistent quality"
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Track record of transformative implementations"
    }
  ];

  const positions = [
    {
      title: "Senior Agent Researcher",
      icon: Brain,
      type: "Research",
      location: "Palo Alto, CA",
      priority: "Critical",
      description: "Lead groundbreaking research in autonomous agent development and multi-agent coordination systems.",
      requirements: ["PhD in CS/AI/ML", "Published research", "Multi-agent systems experience"]
    },
    {
      title: "Agent Engineer",
      icon: Code,
      type: "Engineering",
      location: "Palo Alto, CA",
      priority: "Critical",
      description: "Build and optimize autonomous agents, implement advanced coordination protocols, and scale multi-agent systems.",
      requirements: ["Strong Python/TypeScript", "Distributed systems", "ML/AI experience"]
    },
    {
      title: "Rust Engineer",
      icon: Server,
      type: "Engineering",
      location: "Palo Alto, CA",
      priority: "High",
      description: "Develop high-performance, memory-safe infrastructure for agent communication and coordination systems.",
      requirements: ["Expert Rust skills", "Systems programming", "Performance optimization"]
    },
    {
      title: "DevReal Lead",
      icon: Rocket,
      type: "Engineering",
      location: "Palo Alto, CA",
      priority: "Critical",
      description: "Lead the development of DevReal platform - our revolutionary agent development and deployment infrastructure.",
      requirements: ["Full-stack expertise", "Platform architecture", "Team leadership"]
    },
    {
      title: "Infrastructure Engineer",
      icon: Server,
      type: "Engineering",
      location: "Palo Alto, CA",
      priority: "High",
      description: "Build and scale computational infrastructure powering multi-agent research and deployment.",
      requirements: ["Cloud infrastructure", "Distributed systems", "DevOps experience"]
    },
    {
      title: "Research Intern",
      icon: GraduationCap,
      type: "Internship",
      location: "Bay Area",
      priority: "Medium",
      description: "Exceptional students working on ambitious multi-agent research with senior mentorship.",
      requirements: ["Strong academic record", "Programming skills", "Research interest"]
    }
  ];

  const requirements = [
    "500+ GitHub commits with consistent contribution history",
    "PhD in CS/AI/ML or equivalent industry experience",
    "Experience with multi-agent systems or distributed computing",
    "Published research or significant open-source contributions",
    "Exceptional work ethic and collaborative mindset"
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-red-500/20 selection:text-red-200 w-full max-w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center px-3 sm:px-4 py-12 sm:py-16 md:py-0">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 via-black to-red-900/10" />
          <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-red-500/5 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-red-400/3 rounded-full blur-[120px] animate-pulse-slower" />
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_70%,transparent_110%)]" />
        </div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 mb-6 sm:mb-8 backdrop-blur-sm hover:scale-105 hover:bg-red-500/15 transition-all duration-500 cursor-default"
          >
            <Rocket className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Let's Automate the Global Economy</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black mb-4 sm:mb-6 bg-gradient-to-r from-white via-red-100 to-red-300 bg-clip-text text-transparent leading-[0.9] tracking-tight">
            Advance
            <br />
            Humanity
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-3 sm:mb-4 max-w-4xl mx-auto font-light tracking-wide">
            Join the world's first <span className="text-red-400 font-medium">multi-agent research lab</span>
          </p>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            We're building autonomous agents that collaborate to simulate entire industries and civilizations
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16">
            <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
              <MapPin className="w-5 h-5 text-red-500" />
              <span className="font-light tracking-wide">Palo Alto, CA</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full" />
            <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
              <Users className="w-5 h-5 text-red-500" />
              <span className="font-light tracking-wide">In-Person Collaboration</span>
            </div>
          </div>
 
          <button 
            className="group relative w-full sm:w-auto bg-red-600 text-white px-6 sm:px-8 py-4 rounded-lg font-medium text-lg transition-all duration-500 hover:scale-[1.02] hover:bg-red-700"
          >
            <a 
              href="https://cal.com/swarms/swarms-careers" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-3"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
            </a>
          </button>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 sm:py-32 px-4 bg-gradient-to-b from-black to-red-950/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <div className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm font-medium mb-4 sm:mb-6 hover:scale-105 hover:bg-red-500/15 transition-all duration-500 cursor-default">
              Our Vision
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent px-4">
              The Future We're Building
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto font-light tracking-wide px-4">
              Creating autonomous systems that revolutionize how industries operate and evolve
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 px-2 sm:px-4">
            {visionItems.map((item, index) => (
              <div
                key={index}
                className="group relative p-6 sm:p-8 bg-gradient-to-br from-red-950/5 to-black border border-red-500/20 rounded-2xl hover:border-red-500/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/10 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative flex flex-col items-center text-center">
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl mb-5 sm:mb-6 group-hover:bg-red-500/20 group-hover:scale-110 transition-all duration-500">
                    <item.icon className="w-7 h-7 sm:w-8 sm:h-8 text-red-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-32 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <div className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm font-medium mb-4 sm:mb-6 hover:scale-105 hover:bg-red-500/15 transition-all duration-500 cursor-default">
              Our Values
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent px-4">
              What Drives Us Forward
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto font-light tracking-wide px-4">
              Our core principles that guide every decision and advancement we make
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-8 px-2 sm:px-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative p-6 sm:p-8 bg-gradient-to-br from-red-950/5 to-black border border-red-500/20 rounded-2xl hover:border-red-500/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/10 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative flex flex-col items-center text-center">
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl mb-5 sm:mb-6 group-hover:bg-red-500/20 group-hover:scale-110 transition-all duration-500">
                    <value.icon className="w-7 h-7 sm:w-8 sm:h-8 text-red-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-light">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualities Section */}
      <section className="py-16 sm:py-32 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <div className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm font-medium mb-4 sm:mb-6 hover:scale-105 hover:bg-red-500/15 transition-all duration-500 cursor-default">
              Who We Seek
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent px-4">
              Exceptional Individuals
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto font-light tracking-wide px-4">
              We seek those who combine deep technical expertise with the drive to push boundaries
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 px-2 sm:px-4">
            {qualities.map((quality, index) => (
              <div
                key={index}
                className="group relative p-6 sm:p-8 bg-gradient-to-br from-red-950/5 to-black border border-red-500/20 rounded-2xl hover:border-red-500/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/10 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative flex flex-col items-center text-center">
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl mb-5 sm:mb-6 group-hover:bg-red-500/20 group-hover:scale-110 transition-all duration-500">
                    <quality.icon className="w-7 h-7 sm:w-8 sm:h-8 text-red-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
                    {quality.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-light">
                    {quality.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 sm:py-32 px-4 bg-gradient-to-br from-red-950/5 to-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <div className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm font-medium mb-4 sm:mb-6 hover:scale-105 hover:bg-red-500/15 transition-all duration-500 cursor-default">
              Requirements
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent px-4">
              What It Takes
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 font-light tracking-wide px-4">
              We maintain exceptionally high standards for complex AI research challenges
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-red-950/5 to-black border border-red-500/20 rounded-2xl p-6 sm:p-12 backdrop-blur-sm hover:border-red-500/40 transition-all duration-500 mx-2 sm:mx-4">
            <div className="space-y-6 sm:space-y-8">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-start gap-4 sm:gap-6 group">
                  <div className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg mt-1 group-hover:bg-red-500/20 group-hover:scale-110 transition-all duration-500 flex-shrink-0">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                  </div>
                  <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-light tracking-wide group-hover:text-white transition-colors duration-300">
                    {req}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 sm:py-32 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <div className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-medium mb-4 sm:mb-6 hover:scale-105 hover:bg-green-500/15 transition-all duration-500 cursor-default">
              Apply Now
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent px-4">
              Start Your Application
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 font-light tracking-wide px-4">
              Submit your application through our comprehensive form and take the first step towards joining our mission
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-950/5 to-black border border-green-500/20 rounded-2xl p-6 sm:p-12 backdrop-blur-sm hover:border-green-500/40 transition-all duration-500 mx-2 sm:mx-4">
            <div className="text-center space-y-8">
              <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-xl">
                <Mail className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
                  Complete Application Form
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed font-light tracking-wide mb-6">
                  Fill out our detailed application form to showcase your skills, experience, and passion for AI research
                </p>
                <button className="group/btn relative bg-red-600 text-white px-8 py-4 rounded-lg font-medium transition-all duration-500 hover:scale-105 hover:bg-red-700">
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSd3f1c_WBVoBm5P_IHwxVFxeEFRy3RbiDslj91o5CTknsca5g/viewform?usp=sf_link" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center gap-3"
                  >
                    Submit Application
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-500" />
                  </a>
                </button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <div className="flex items-center gap-3 text-gray-400">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="font-light tracking-wide">Comprehensive evaluation</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full" />
                <div className="flex items-center gap-3 text-gray-400">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="font-light tracking-wide">Quick response time</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full" />
                <div className="flex items-center gap-3 text-gray-400">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="font-light tracking-wide">Direct team review</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Positions Section */}
      <section className="py-32 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm font-medium mb-6 hover:scale-105 hover:bg-red-500/15 transition-all duration-500 cursor-default">
              Open Positions
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
              Join Our Mission
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light tracking-wide">
              Build the future of autonomous agent technology with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {positions.map((position, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-red-950/5 to-black border border-red-500/20 rounded-2xl p-8 hover:border-red-500/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/10 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                
                {/* Priority Badge */}
                <div className="absolute top-4 right-4">
                  {position.priority === "Critical" && (
                    <span className="px-3 py-1 bg-red-500/20 text-red-300 border border-red-500/30 rounded-full text-sm font-medium animate-pulse">
                      Critical
                    </span>
                  )}
                  {position.priority === "High" && (
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-300 border border-orange-500/30 rounded-full text-sm font-medium">
                      High Priority
                    </span>
                  )}
                  {position.priority === "Medium" && (
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-sm font-medium">
                      Medium Priority
                    </span>
                  )}
                </div>

                {/* Header */}
                <div className="relative flex items-start gap-6 mb-8">
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl group-hover:bg-red-500/20 group-hover:scale-110 transition-all duration-500 flex-shrink-0">
                    <position.icon className="w-8 h-8 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
                      <span className="flex items-center gap-2 font-light">
                        <Target className="w-4 h-4" />
                        {position.type}
                      </span>
                      <span className="flex items-center gap-2 font-light">
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="relative mb-8">
                  <p className="text-gray-300 text-lg leading-relaxed font-light tracking-wide">
                    {position.description}
                  </p>
                </div>

                {/* Requirements */}
                <div className="relative mb-8">
                  <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-red-400" />
                    Key Requirements
                  </h4>
                  <div className="space-y-3">
                    {position.requirements.map((req, reqIndex) => (
                      <div key={reqIndex} className="flex items-center gap-3 text-gray-400 text-sm group/req">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full group-hover/req:scale-150 transition-transform duration-300" />
                        <span className="font-light tracking-wide group-hover/req:text-white transition-colors duration-300">
                          {req}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Apply Buttons */}
                <div className="relative flex flex-col sm:flex-row gap-3 justify-end">
                  <button className="group/btn relative bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-500 hover:scale-105 hover:bg-red-700">
                    <a 
                      href="https://docs.google.com/forms/d/e/1FAIpQLSd3f1c_WBVoBm5P_IHwxVFxeEFRy3RbiDslj91o5CTknsca5g/viewform?usp=sf_link" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-3"
                    >
                      Apply Now
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-500" />
                    </a>
                  </button>
                  <button className="group/btn relative border border-red-500/30 text-red-400 hover:bg-red-500/10 px-6 py-3 rounded-xl font-medium transition-all duration-500 hover:scale-105">
                    <a 
                      href="https://cal.com/swarms/swarms-careers" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-3"
                    >
                      Book Call
                      <Phone className="w-4 h-4" />
                    </a>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-red-950/5 to-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm font-medium mb-6 hover:scale-105 hover:bg-red-500/15 transition-all duration-500 cursor-default">
              How to Join
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
              Your Path Forward
            </h2>
            <p className="text-xl text-gray-400 font-light tracking-wide">
              Our process focuses on practical demonstration over traditional interviews
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="group flex items-center gap-8 p-8 bg-gradient-to-br from-blue-500/5 to-black border border-blue-500/20 rounded-2xl hover:border-blue-500/40 transition-all duration-500 hover:scale-[1.01]">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 font-bold group-hover:scale-110 transition-transform duration-500">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
                  Initial Conversation
                </h3>
                <p className="text-gray-400 font-light tracking-wide">
                  Schedule a deep dive into your background and research interests
                </p>
              </div>
              <button className="group/btn relative bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-500 hover:scale-105 hover:bg-red-700">
                <a 
                  href="https://cal.com/swarms/swarms-careers" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2"
                >
                  Book Call
                  <Phone className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-500" />
                </a>
              </button>
            </div>
            
            <div className="group flex items-center gap-8 p-8 bg-gradient-to-br from-green-500/5 to-black border border-green-500/20 rounded-2xl hover:border-green-500/40 transition-all duration-500 hover:scale-[1.01]">
              <div className="flex items-center justify-center w-12 h-12 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 font-bold group-hover:scale-110 transition-transform duration-500">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
                  Technical Demonstration
                </h3>
                <p className="text-gray-400 font-light tracking-wide">
                  Complete meaningful contributions to our framework
                </p>
              </div>
              <button className="group/btn relative bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-500 hover:scale-105 hover:bg-red-700">
                <a 
                  href="https://github.com/kyegomez/swarms" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2"
                >
                  Explore
                  <Code className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-500" />
                </a>
              </button>
            </div>
            
            <div className="group flex items-center gap-8 p-8 bg-gradient-to-br from-purple-500/5 to-black border border-purple-500/20 rounded-2xl hover:border-purple-500/40 transition-all duration-500 hover:scale-[1.01]">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 font-bold group-hover:scale-110 transition-transform duration-500">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
                  Technical Review
                </h3>
                <p className="text-gray-400 font-light tracking-wide">
                  Comprehensive evaluation of your contributions
                </p>
              </div>
            </div>
            
            <div className="group flex items-center gap-8 p-8 bg-gradient-to-br from-red-500/5 to-black border border-red-500/20 rounded-2xl hover:border-red-500/40 transition-all duration-500 hover:scale-[1.01]">
              <div className="flex items-center justify-center w-12 h-12 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 font-bold group-hover:scale-110 transition-transform duration-500">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
                  Welcome to the Team
                </h3>
                <p className="text-gray-400 font-light tracking-wide">
                  Begin your journey shaping the future of AI
                </p>
              </div>
              <UserCheck className="w-8 h-8 text-red-400 group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="group bg-gradient-to-br from-red-950/10 to-black border border-red-500/30 rounded-2xl p-16 backdrop-blur-sm hover:border-red-500/40 transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent relative">
              Ready to Advance Humanity?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light tracking-wide relative">
              Join us in building the infrastructure that will power the next generation of autonomous agents and multi-agent systems
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative">
              <button className="group/btn relative bg-red-600 text-white px-8 py-4 rounded-lg font-medium transition-all duration-500 hover:scale-105 hover:bg-red-700">
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSd3f1c_WBVoBm5P_IHwxVFxeEFRy3RbiDslj91o5CTknsca5g/viewform?usp=sf_link" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-3"
                >
                  Submit Application
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-500" />
                </a>
              </button>
              <button className="group/btn relative border border-red-500/30 text-red-300 hover:bg-red-500/10 px-8 py-4 rounded-lg font-medium transition-all duration-500 hover:scale-105">
                <a 
                  href="https://cal.com/swarms/swarms-careers" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-3"
                >
                  Book Call
                  <Phone className="w-5 h-5" />
                </a>
              </button>
              <button className="group/btn relative border border-red-500/30 text-red-300 hover:bg-red-500/10 px-8 py-4 rounded-lg font-medium transition-all duration-500 hover:scale-105">
                <a 
                  href="https://docs.swarms.world" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-3"
                >
                  Learn more
                  <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-500" />
                </a>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HiringClientPage;