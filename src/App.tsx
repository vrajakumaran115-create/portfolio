import { useState, useEffect, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Code,
  Database,
  Globe,
  Terminal,
  MessageCircle,
  Users,
  Lightbulb,
  Clock,
  Zap,
  ChevronUp,
  GraduationCap,
  Briefcase,
  Heart,
} from 'lucide-react';

const profileImage = 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400';

const typingTexts = [
  'Aspiring Software Developer',
  '.NET Developer',
  'Python Enthusiast',
  'Web Developer',
];

function App() {
  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = ['home', 'about', 'education', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < typingTexts[textIndex].length) {
          setCurrentText(typingTexts[textIndex].slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % typingTexts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, textIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const technicalSkills = [
    { name: '.NET', icon: Code, color: 'from-purple-500 to-purple-600' },
    { name: 'Python', icon: Terminal, color: 'from-yellow-500 to-yellow-600' },
    { name: 'PHP', icon: Code, color: 'from-indigo-500 to-indigo-600' },
    { name: 'HTML', icon: Globe, color: 'from-orange-500 to-orange-600' },
    { name: 'CSS', icon: Globe, color: 'from-blue-500 to-blue-600' },
    { name: 'JavaScript', icon: Code, color: 'from-amber-500 to-amber-600' },
    { name: 'SQL', icon: Database, color: 'from-cyan-500 to-cyan-600' },
    { name: 'GitHub', icon: Github, color: 'from-gray-600 to-gray-700' },
    { name: 'VS Code', icon: Code, color: 'from-sky-500 to-sky-600' },
  ];

  const softSkills = [
    { name: 'Problem Solving', icon: Lightbulb },
    { name: 'Communication', icon: MessageCircle },
    { name: 'Teamwork', icon: Users },
    { name: 'Quick Learning', icon: Zap },
    { name: 'Adaptability', icon: Heart },
    { name: 'Time Management', icon: Clock },
  ];

  const projects = [
    {
      title: 'AgriMart',
      description: 'Agriculture business platform designed to support farmers and local product management through digital technology solutions.',
      tags: ['Web App', 'Agriculture', 'E-commerce'],
      icon: Globe,
      github: '#',
      demo: '#',
    },
    {
      title: 'MoiPay',
      description: 'Fintech-based payment solution concept focused on secure digital transactions and simplified payment systems.',
      tags: ['Fintech', 'Payments', 'Security'],
      icon: Database,
      github: '#',
      demo:'https://www.linkedin.com/feed/update/urn:li:activity:7434203701629616128/',
    },
    {
      title: 'WorkLink',
      description: 'Business networking and workforce connection platform designed to improve collaboration between workers and service providers.',
      tags: ['Networking', 'Collaboration', 'Platform'],
      icon: Users,
      github: '#',
      demo: '#',
    },
  ];

  return (
    <div className="min-h-screen gradient-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => scrollToSection('home')}
              className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity"
            >
              VRK
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-sm font-medium transition-colors relative ${
                    activeSection === link.id
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400 rounded" />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full text-left py-2 text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="min-h-screen flex items-center justify-center pt-16 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 animate-float">
            <div className="relative inline-block">
              <img
                src={profileImage}
                alt="RAJAKUMARAN V"
                className="w-40 h-40 rounded-full object-cover profile-glow border-4 border-blue-500/30"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-slate-900" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white">
            RAJAKUMARAN V
          </h1>

          <div className="h-12 mb-4">
            <p className="text-xl sm:text-2xl text-blue-400 typing-cursor">
              {currentText}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-400 mb-8">
            <MapPin className="w-4 h-4" />
            <span>Kariyapatti, Tamil Nadu, India</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="https://www.linkedin.com/in/rajakumaran-v-279b2a288/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-3 bg-gradient-to-r from-[#0077B5] to-[#00A0DC] text-white rounded-full font-medium flex items-center gap-2 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,119,181,0.6)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              <Linkedin className="w-5 h-5 relative z-10" />
              <span className="relative z-10">LinkedIn</span>
            </a>
            <a
              href="https://github.com/vrajakumaran115-create"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-3 bg-gradient-to-r from-[#24292e] to-[#1a1e22] text-white rounded-full font-medium flex items-center gap-2 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(36,41,46,0.8)] border border-gray-700"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              <Github className="w-5 h-5 relative z-10" />
              <span className="relative z-10">GitHub</span>
            </a>
            <a
              href="https://wa.me/919344310934"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-full font-medium flex items-center gap-2 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(37,211,102,0.6)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              <MessageCircle className="w-5 h-5 relative z-10" />
              <span className="relative z-10">WhatsApp</span>
            </a>
            <a
              href="mailto:vrajakumaran115@gmail.com"
              className="group relative px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-medium flex items-center gap-2 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              <Mail className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Email</span>
            </a>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronUp className="w-8 h-8 text-gray-500 rotate-180" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="reveal text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded" />
          </div>

          <div className="reveal glass rounded-2xl p-8 card-hover">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Passionate software developer interested in building practical web applications and software solutions.
              Skilled in .NET, Python, HTML and database concepts. Strong interest in problem solving,
              software engineering and technology innovation.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>vrajakumaran115@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>+91 9344310934</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>Kariyapatti, Tamil Nadu</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Code className="w-5 h-5 text-blue-400" />
                <span>Software Developer</span>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="/RAJAKUMARAN_RESUME.pdf"
                download="RAJAKUMARAN-V-Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" ref={educationRef} className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="reveal text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Education</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded" />
          </div>

          <div className="reveal glass rounded-2xl p-8 card-hover relative timeline-item ml-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  B.Sc Degree
                </h3>
                <p className="text-blue-400 font-medium mb-2">
                  Government Arts and Science College, Tirussuli
                </p>
                <p className="text-gray-400">
                  2023 - 2026
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                    Computer Science
                  </span>
                  <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm">
                    Programming
                  </span>
                  <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm">
                    Database Management
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="reveal text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Technical Skills</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded" />
          </div>

          <div className="reveal grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-16">
            {technicalSkills.map((skill, index) => (
              <div
                key={index}
                className="glass rounded-xl p-6 text-center card-hover cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center skill-icon`}>
                  <skill.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-medium">{skill.name}</h3>
              </div>
            ))}
          </div>

          <div className="reveal text-center mb-12 mt-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Soft Skills</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded" />
          </div>

          <div className="reveal grid grid-cols-2 md:grid-cols-3 gap-4">
            {softSkills.map((skill, index) => (
              <div
                key={index}
                className="glass rounded-xl p-6 flex items-center gap-4 card-hover"
              >
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                  <skill.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-white font-medium">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="reveal text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="reveal glass rounded-2xl p-6 card-hover flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl w-fit mb-4">
                  <project.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>

                <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">
                    <Github className="w-4 h-4" />
                    GitHub
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="reveal text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded" />
            <p className="text-gray-400 mt-4">
              Ready to discuss opportunities or just want to say hello? Feel free to reach out!
            </p>
          </div>

          <div className="reveal grid sm:grid-cols-2 gap-4 mb-8">
            <a
              href="mailto:vrajakumaran115@gmail.com"
              className="glass rounded-xl p-6 flex items-center gap-4 card-hover group"
            >
              <div className="p-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white font-medium">vrajakumaran115@gmail.com</p>
              </div>
            </a>

            <a
              href="tel:+919344310934"
              className="glass rounded-xl p-6 flex items-center gap-4 card-hover group"
            >
              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Phone</p>
                <p className="text-white font-medium">+91 9344310934</p>
              </div>
            </a>

            <a
              href="https://wa.me/919344310934"
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl p-6 flex items-center gap-4 card-hover group"
            >
              <div className="p-4 bg-gradient-to-r from-green-400 to-green-600 rounded-xl group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">WhatsApp</p>
                <p className="text-white font-medium">Send a message</p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/rajakumaran-v-279b2a288/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl p-6 flex items-center gap-4 card-hover group"
            >
              <div className="p-4 bg-gradient-to-r from-[#0077B5] to-[#00A0DC] rounded-xl group-hover:scale-110 transition-transform">
                <Linkedin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">LinkedIn</p>
                <p className="text-white font-medium">Connect professionally</p>
              </div>
            </a>
          </div>

          <div className="reveal text-center">
            <a
              href="https://github.com/vrajakumaran115-create"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full text-white hover:bg-slate-700 transition-all"
            >
              <Github className="w-5 h-5" />
              View GitHub Profile
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-white font-bold text-lg">RAJAKUMARAN V</p>
              <p className="text-gray-400 text-sm">Aspiring Software Developer</p>
            </div>

            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/rajakumaran-v-279b2a288/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/vrajakumaran115-create"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:vrajakumaran115@gmail.com"
                className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/919344310934"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-green-400 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} RAJAKUMARAN V. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Built with React, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-110 z-40"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export default App;
