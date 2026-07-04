import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Play,
  Layout,
  CheckSquare,
  Users,
  MessageSquare,
  Video,
  Calendar,
  FileText,
  Bell,
  Clock,
  BarChart3,
  Shield,
  Moon,
  Disc,
  Plus,
  Minus,
  Check,
  TrendingUp,
  Briefcase,
  Layers
} from "lucide-react";
import Logo from "@/components/logo";

export default function Landing() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("kanban");
  const [statCount, setStatCount] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatCount((prev) => (prev < 99.9 ? prev + 1.1 : 99.9));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const featuresList = [
    { title: "Kanban Board", description: "Organize tasks visually with fully customizable workflow columns and drag-and-drop ease.", icon: Layout, color: "from-blue-500 to-indigo-500" },
    { title: "Task Management", description: "Break down large projects into manageable subtasks, assign owners, and set due dates.", icon: CheckSquare, color: "from-purple-500 to-indigo-500" },
    { title: "Real-time Collaboration", description: "Work together effortlessly with live updates, instant state sync, and shared team spaces.", icon: Users, color: "from-cyan-500 to-blue-500" },
    { title: "Team Chat", description: "Stay aligned with integrated direct messages, group channels, and message threads.", icon: MessageSquare, color: "from-blue-600 to-cyan-400" },
    { title: "Video Meetings", description: "Launch high-definition team syncs directly within your project workspace instantly.", icon: Video, color: "from-purple-600 to-pink-500" },
    { title: "Calendar Sync", description: "Keep track of deadlines, milestones, and daily team schedules on a master calendar.", icon: Calendar, color: "from-indigo-500 to-cyan-500" },
    { title: "File Sharing", description: "Attach documents, images, and project assets directly to tasks for centralized access.", icon: FileText, color: "from-blue-500 to-purple-500" },
    { title: "Smart Notifications", description: "Never miss an update with customizable alerts for mentions, due dates, and assignments.", icon: Bell, color: "from-cyan-400 to-indigo-600" },
    { title: "Activity Timeline", description: "View a complete audit log of project changes, task completions, and team interactions.", icon: Clock, color: "from-purple-500 to-blue-500" },
    { title: "Analytics Dashboard", description: "Gain actionable insights into team velocity, overdue tasks, and project completion rates.", icon: BarChart3, color: "from-indigo-500 to-purple-600" },
    { title: "Role Based Access", description: "Ensure enterprise-grade security with fine-grained permissions and custom user roles.", icon: Shield, color: "from-cyan-500 to-blue-600" },
    { title: "Dark Mode", description: "Work comfortably at any hour with an elegant, expertly crafted dark visual theme.", icon: Moon, color: "from-blue-500 to-cyan-400" },
  ];

  const faqList = [
    { question: "How does GPMS differ from Jira or ClickUp?", answer: "GPMS combines the power of enterprise project management with the lightning-fast performance and clean, minimalist aesthetics of modern apps like Linear. We eliminate clutter while providing powerful features like real-time team chat, video syncs, and advanced analytics in one unified platform." },
    { question: "Can I invite external clients to my workspace?", answer: "Yes! You can easily generate secure invitation links to bring team members, contractors, or clients into specific workspaces with custom role-based access controls." },
    { question: "Is there a free trial available?", answer: "Absolutely. Our Free tier gives you full access to unlimited tasks, core project boards, and real-time collaboration for up to 5 members forever—no credit card required." },
    { question: "How secure is my project data?", answer: "We implement industry-standard encryption, secure session handling, and robust OAuth identity verification to ensure your project files and discussions remain strictly confidential and protected." },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden relative">
      {/* Immersive ambient gradient background globes */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none animate-ambient-glow" />
      <div className="absolute top-[1200px] right-10 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none animate-ambient-glow-reverse" />
      <div className="absolute top-[2800px] left-10 w-[550px] h-[550px] bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none animate-ambient-glow" />
      <div className="absolute top-[4400px] right-1/4 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none animate-ambient-glow-reverse" />

      {/* 1. Sticky Navbar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800/80 px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between transition-all duration-300 shadow-2xl"
      >
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3 group">
            <Logo asLink={false} />
            <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              GPMS
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#preview" className="hover:text-cyan-400 transition-colors">Dashboard</a>
            <a href="#pricing" className="hover:text-cyan-400 transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/sign-in"
            className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2.5 rounded-xl hover:bg-slate-800/60 transition-all border border-transparent hover:border-slate-700"
          >
            Login
          </Link>
          <Link
            to="/sign-up"
            className="text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 px-6 py-2.5 rounded-xl shadow-[0_0_25px_-5px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_-3px_rgba(59,130,246,0.7)] transition-all duration-300 hover:-translate-y-0.5"
          >
            Get Started
          </Link>
        </div>
      </motion.header>

      <main className="relative z-10">
        {/* 2. Hero Section */}
        <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-cyan-400 text-sm font-semibold mb-8 shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)]"
          >
            <Disc className="w-4 h-4 animate-spin text-blue-400" />
            <span>Next-Generation Team Project Management SaaS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.1] mb-8 text-slate-100"
          >
            Manage Projects Smarter.{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Collaborate Faster.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto font-normal mb-12 leading-relaxed"
          >
            Plan tasks, manage teams, track progress, communicate in real time, and deliver projects efficiently from one platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20"
          >
            <Link
              to="/sign-up"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 px-8 py-4 rounded-xl shadow-[0_0_35px_-5px_rgba(59,130,246,0.6)] hover:shadow-[0_0_45px_-2px_rgba(59,130,246,0.8)] transition-all duration-300 hover:-translate-y-1"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#preview"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 text-base font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >
              <Play className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
              <span>Watch Demo</span>
            </a>
          </motion.div>

          {/* Hero Illustration / Interactive Floating Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative mx-auto max-w-6xl rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-2xl p-4 sm:p-6 shadow-[0_0_80px_-15px_rgba(59,130,246,0.3)]"
          >
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 text-xs font-semibold text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full">gpms-core-app.vercel.app</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" /> Live Sync
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 text-left">
              {/* Left Mock Sidebar */}
              <div className="hidden lg:flex flex-col gap-4 border-r border-slate-800/80 pr-6">
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-blue-600/10 border border-blue-500/30 text-white font-semibold text-sm">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                  <span>Apex Launch</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-800/50 text-slate-400 font-medium text-sm transition-colors cursor-pointer">
                  <Layout className="w-4 h-4 text-slate-500" />
                  <span>Kanban Boards</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-800/50 text-slate-400 font-medium text-sm transition-colors cursor-pointer">
                  <CheckSquare className="w-4 h-4 text-slate-500" />
                  <span>Sprint Tasks</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-800/50 text-slate-400 font-medium text-sm transition-colors cursor-pointer">
                  <Users className="w-4 h-4 text-slate-500" />
                  <span>Team Members</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-800/50 text-slate-400 font-medium text-sm transition-colors cursor-pointer">
                  <BarChart3 className="w-4 h-4 text-slate-500" />
                  <span>Velocity Charts</span>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-800/80">
                  <div className="flex items-center gap-3 px-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-white text-xs shadow-md">
                      JD
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-white">John Doe</span>
                      <span className="text-[10px] text-slate-500">Project Lead</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Mock Content */}
              <div className="col-span-1 lg:col-span-3 flex flex-col gap-6">
                {/* Upper Metrics Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/50 shadow-inner flex flex-col justify-between">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Team Velocity</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-white">{statCount.toFixed(1)}%</span>
                      <span className="text-xs font-bold text-green-400 flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> +14%</span>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/50 shadow-inner flex flex-col justify-between">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Active Tasks</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-white">48</span>
                      <span className="text-xs font-bold text-cyan-400">12 In Review</span>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/50 shadow-inner flex flex-col justify-between">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Sprint Health</span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-700 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full w-5/6 rounded-full" />
                      </div>
                      <span className="text-sm font-bold text-white">84%</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Kanban Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Todo Column */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between px-2 py-1 bg-slate-800/60 rounded-lg border border-slate-700/60">
                      <span className="text-xs font-bold text-slate-300">TO DO</span>
                      <span className="text-xs font-bold text-slate-50:bg-slate-700 px-2 py-0.5 rounded-full">5</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/40 hover:border-blue-500/50 transition-all shadow-md flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">FEATURE</span>
                        <span className="text-xs text-slate-500 font-medium">TS-101</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-200">Implement WebSocket state synchronization</span>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                        <span className="text-xs text-slate-400 font-medium">Oct 12</span>
                        <div className="w-6 h-6 rounded-full bg-cyan-600 flex items-center justify-center text-[10px] font-bold text-white">SJ</div>
                      </div>
                    </div>
                  </div>

                  {/* In Progress Column */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between px-2 py-1 bg-blue-500/10 rounded-lg border border-blue-500/30">
                      <span className="text-xs font-bold text-blue-400">IN PROGRESS</span>
                      <span className="text-xs font-bold text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded-full">3</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 hover:border-purple-500/50 transition-all shadow-md flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">INFRA</span>
                        <span className="text-xs text-slate-500 font-medium">TS-98</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-200">Kubernetes cluster autoscaling setup</span>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                        <span className="text-xs text-slate-400 font-medium">Oct 14</span>
                        <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-[10px] font-bold text-white">DK</div>
                      </div>
                    </div>
                  </div>

                  {/* Done Column */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between px-2 py-1 bg-green-500/10 rounded-lg border border-green-500/30">
                      <span className="text-xs font-bold text-green-400">DONE</span>
                      <span className="text-xs font-bold text-green-300 bg-green-500/20 px-2 py-0.5 rounded-full">12</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/20 border border-slate-700/30 opacity-80 hover:opacity-100 transition-all shadow-md flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/30">RELEASE</span>
                        <span className="text-xs text-slate-500 font-medium">TS-95</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-300 line-through">Vite v7 + React 19 production bundle build</span>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                        <span className="text-xs text-slate-500 font-medium">Oct 10</span>
                        <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">ER</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 3. Trusted By Section */}
        <section className="py-16 border-y border-slate-900 bg-slate-950/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
              TRUSTED BY INNOVATIVE ENGINEERING TEAMS WORLDWIDE
            </span>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-500">
              {["LinearCorp", "NotionLabs", "ClickTech", "Vercelify", "FramerCo", "AsanaFlow"].map((company, idx) => (
                <div key={idx} className="flex items-center justify-center gap-2 font-extrabold text-xl text-slate-400 tracking-tight hover:text-white transition-colors cursor-pointer">
                  <Layers className="w-6 h-6 text-indigo-500" />
                  <span>{company}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Features Section */}
        <section id="features" className="py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">EVERYTHING YOU NEED IN ONE PLACE</h2>
            <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-100">
              Powerful features to drive your team&apos;s success.
            </p>
            <p className="mt-4 text-lg text-slate-400 font-normal">
              Eliminate context switching. GPMS unites project boards, real-time communication, and comprehensive reporting into a single beautiful interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresList.map((feat, idx) => {
              const IconComponent = feat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 backdrop-blur-xl shadow-xl hover:shadow-[0_0_35px_-10px_rgba(59,130,246,0.25)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
                >
                  <div>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${feat.color} p-0.5 mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors">{feat.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-normal">{feat.description}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center text-xs font-semibold text-indigo-400 group-hover:text-cyan-400 transition-colors">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 5. Dashboard Preview Section */}
        <section id="preview" className="py-28 bg-slate-900/30 border-y border-slate-800/50 relative backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              {[
                { id: "kanban", label: "Project Boards", icon: Layout },
                { id: "tasks", label: "Sprint Tasks", icon: CheckSquare },
                { id: "analytics", label: "Analytics Charts", icon: BarChart3 },
                { id: "members", label: "Team Directory", icon: Users },
              ].map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                        : "bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/50"
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Simulated Active Tab Views */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="border border-slate-800 bg-slate-950/90 rounded-3xl p-6 sm:p-10 shadow-[0_0_100px_-20px_rgba(99,102,241,0.3)] backdrop-blur-2xl text-left"
            >
              {activeTab === "kanban" && (
                <div className="flex flex-col gap-8">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white">Active Sprints / Alpha Launch</h3>
                      <p className="text-slate-400 text-sm">Managing 48 active tasks across 3 sprint columns</p>
                    </div>
                    <div className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm cursor-pointer transition-colors shadow-md flex items-center gap-2">
                      <Plus className="w-4 h-4" /> Add Task
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {["To Do", "In Progress", "In Review"].map((col, cIdx) => (
                      <div key={cIdx} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <span className="font-bold text-sm text-slate-200">{col}</span>
                          <span className="px-2.5 py-0.5 bg-slate-800 text-slate-400 rounded-full text-xs font-bold">4</span>
                        </div>
                        {[1, 2].map((item) => (
                          <div key={item} className="p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl hover:border-indigo-500/50 transition-colors flex flex-col gap-3 shadow-sm">
                            <div className="flex items-center justify-between">
                              <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded text-[10px] font-extrabold">TASK</span>
                              <span className="text-xs text-slate-500 font-medium">GPMS-{cIdx*10 + item}</span>
                            </div>
                            <span className="text-sm font-semibold text-slate-200">Framer Motion dashboard view configuration #{item}</span>
                            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                              <span className="text-xs text-slate-400">Due in 3 days</span>
                              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">US</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "tasks" && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white">All Master Tasks</h3>
                      <p className="text-slate-400 text-sm">Sorted by urgency and due date</p>
                    </div>
                  </div>
                  <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/40">
                    <div className="grid grid-cols-12 gap-4 p-4 bg-slate-800/60 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <div className="col-span-6">Task Description</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-2">Priority</div>
                      <div className="col-span-2 text-right">Assignee</div>
                    </div>
                    {[
                      { title: "Optimize PostgreSQL query indexing for large workspace loads", status: "In Progress", prio: "High", auth: "Sarah J." },
                      { title: "Implement Google Calendar API webhooks for instant invite sync", status: "Done", prio: "Urgent", auth: "David K." },
                      { title: "Review glassmorphism Tailwind v4 utility tokens across auth pages", status: "To Do", prio: "Medium", auth: "Elena R." },
                    ].map((row, rIdx) => (
                      <div key={rIdx} className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800/80 hover:bg-slate-800/30 transition-colors text-sm items-center">
                        <div className="col-span-6 font-semibold text-slate-200">{row.title}</div>
                        <div className="col-span-2"><span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-full text-xs font-bold">{row.status}</span></div>
                        <div className="col-span-2"><span className="px-2.5 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 rounded-full text-xs font-bold">{row.prio}</span></div>
                        <div className="col-span-2 text-right font-medium text-slate-400">{row.auth}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "analytics" && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white">Team Velocity & Completion Metrics</h3>
                      <p className="text-slate-400 text-sm">Live data aggregated across all active workspace repositories</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between">
                      <span className="text-sm font-semibold text-slate-400 mb-4">Task Resolution Rate</span>
                      <span className="text-5xl font-extrabold text-green-400 mb-2">94.8%</span>
                      <span className="text-xs text-slate-500">Industry average: 78.2%</span>
                    </div>
                    <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between">
                      <span className="text-sm font-semibold text-slate-400 mb-4">Sprint Velocity Gain</span>
                      <span className="text-5xl font-extrabold text-cyan-400 mb-2">+24.5%</span>
                      <span className="text-xs text-slate-500">Based on last 4 consecutive sprints</span>
                    </div>
                    <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between">
                      <span className="text-sm font-semibold text-slate-400 mb-4">Average Cycle Time</span>
                      <span className="text-5xl font-extrabold text-purple-400 mb-2">1.4 Days</span>
                      <span className="text-xs text-slate-500">Down from 3.2 days last quarter</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "members" && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white">Workspace Directory</h3>
                      <p className="text-slate-400 text-sm">Manage team invitations, roles, and security policies</p>
                    </div>
                    <div className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm cursor-pointer transition-colors shadow-md flex items-center gap-2">
                      <Users className="w-4 h-4" /> Invite Member
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: "Sarah Jenkins", role: "VP of Engineering", email: "s.jenkins@technova.io", init: "SJ" },
                      { name: "David Krell", role: "Product Lead", email: "david@luminalabs.com", init: "DK" },
                      { name: "Elena Rostova", role: "Founder & CEO", email: "elena@apexagency.co", init: "ER" },
                    ].map((m, mIdx) => (
                      <div key={mIdx} className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center gap-4 hover:border-slate-700 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-base shadow-md">
                          {m.init}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="font-bold text-white truncate">{m.name}</span>
                          <span className="text-xs text-indigo-400 font-semibold mb-1">{m.role}</span>
                          <span className="text-xs text-slate-500 truncate">{m.email}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* 6. Workflow Section */}
        <section className="py-24 bg-slate-900/30 border-y border-slate-800/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">SEAMLESS OPERATIONAL WORKFLOW</h2>
            <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-100 mb-16">
              From ideation to delivery in 5 simple steps.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative">
              {[
                { step: "01", title: "Create Project", desc: "Initialize your workspace repository in seconds." },
                { step: "02", title: "Invite Team", desc: "Send secure access links to your coworkers." },
                { step: "03", title: "Assign Tasks", desc: "Break down milestones into assigned cards." },
                { step: "04", title: "Track Progress", desc: "Monitor live velocity and state sync." },
                { step: "05", title: "Deliver Project", desc: "Ship ahead of schedule with complete alignment." },
              ].map((flow, fIdx) => (
                <motion.div
                  key={fIdx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: fIdx * 0.1 }}
                  className="p-6 rounded-3xl bg-slate-955/80 border border-slate-800 hover:border-slate-700 shadow-xl flex flex-col items-center text-center group hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-lg flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    {flow.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">{flow.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed font-normal">{flow.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Pricing Section */}
        <section id="pricing" className="py-28 bg-slate-900/30 border-y border-slate-800/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">TRANSPARENT, SCALABLE PRICING</h2>
            <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-100 mb-6">
              Pick the perfect plan for your team.
            </p>
            <p className="max-w-2xl mx-auto text-lg text-slate-400 font-normal mb-20">
              Unlock complete collaboration regardless of your startup size. Switch tiers or cancel at any time.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
              {/* Free Plan */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-3xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-800 text-slate-300 uppercase tracking-widest">Free Tier</span>
                  <div className="my-6">
                    <span className="text-5xl font-extrabold text-white">$0</span>
                    <span className="text-slate-500 text-sm font-medium ml-2">/ month forever</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-8 font-normal">Perfect for small teams and independent creators getting started.</p>
                  <ul className="space-y-4 text-sm text-slate-300 font-medium mb-12">
                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-400 shrink-0" /> Up to 5 team members</li>
                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-400 shrink-0" /> Unlimited tasks & projects</li>
                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-400 shrink-0" /> Real-time state sync</li>
                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-400 shrink-0" /> Core Kanban & Calendar views</li>
                  </ul>
                </div>
                <Link
                  to="/sign-up"
                  className="w-full text-center font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 py-4 rounded-xl transition-all shadow-md block"
                >
                  Start Free
                </Link>
              </motion.div>

              {/* Pro Plan (Highlighted) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-8 rounded-3xl bg-slate-900 border-2 border-blue-500 shadow-[0_0_50px_-12px_rgba(59,130,246,0.4)] flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-cyan-500 text-white text-[10px] font-extrabold px-4 py-1 rounded-bl-xl uppercase tracking-widest shadow-md">
                  MOST POPULAR
                </div>
                <div>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase tracking-widest">Professional</span>
                  <div className="my-6">
                    <span className="text-5xl font-extrabold text-white">$12</span>
                    <span className="text-slate-400 text-sm font-medium ml-2">/ member / month</span>
                  </div>
                  <p className="text-slate-300 text-sm mb-8 font-normal">For growing startups demanding complete speed and reporting.</p>
                  <ul className="space-y-4 text-sm text-slate-200 font-medium mb-12">
                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-400 shrink-0" /> Unlimited team members</li>
                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-400 shrink-0" /> Advanced Analytics & Velocity charts</li>
                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-400 shrink-0" /> Integrated team chat & messaging</li>
                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-400 shrink-0" /> 1080p Video Meeting workspaces</li>
                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-400 shrink-0" /> Priority API access & Webhooks</li>
                  </ul>
                </div>
                <Link
                  to="/sign-up"
                  className="w-full text-center font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 py-4 rounded-xl shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)] transition-all block"
                >
                  Get Started Pro
                </Link>
              </motion.div>

              {/* Enterprise Plan */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-8 rounded-3xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 uppercase tracking-widest">Enterprise</span>
                  <div className="my-6">
                    <span className="text-5xl font-extrabold text-white">Custom</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-8 font-normal">Dedicated support, custom compliance, and advanced security controls.</p>
                  <ul className="space-y-4 text-sm text-slate-300 font-medium mb-12">
                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-purple-400 shrink-0" /> Custom SAML / Single Sign-On (SSO)</li>
                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-purple-400 shrink-0" /> Advanced role-based security policies</li>
                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-purple-400 shrink-0" /> Dedicated account manager</li>
                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-purple-400 shrink-0" /> 99.99% Guaranteed Uptime SLA</li>
                  </ul>
                </div>
                <a
                  href="#contact"
                  className="w-full text-center font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 py-4 rounded-xl transition-all shadow-md block"
                >
                  Contact Sales
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 10. FAQ Section */}
        <section className="py-28 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold tracking-widest text-purple-400 uppercase mb-3">CLEAR ANSWERS</h2>
            <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-100">
              Frequently Asked Questions
            </p>
          </div>

          <div className="space-y-6">
            {faqList.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="border border-slate-800/80 bg-slate-900/50 rounded-2xl overflow-hidden backdrop-blur-xl shadow-md transition-colors hover:border-slate-700"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left font-bold text-lg text-slate-100 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <span className={`p-2 rounded-xl bg-slate-800 text-slate-400 transition-transform duration-300 ${activeFaq === idx ? "rotate-180 bg-indigo-500/20 text-indigo-400" : ""}`}>
                    {activeFaq === idx ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </span>
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 text-slate-400 text-sm leading-relaxed font-normal border-t border-slate-800/60 pt-4"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

      </main>

      {/* 11. Footer */}
      <footer id="contact" className="border-t border-slate-800 bg-slate-950 pt-20 pb-12 px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3 group">
              <Logo asLink={false} />
              <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
                GPMS
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed font-normal max-w-sm">
              Next-generation Team Project Management SaaS. Built to empower developers, product leads, and visionary startups with uncompromising speed and visual excellence.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-all shadow-md hover:-translate-y-1" aria-label="GitHub">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-all shadow-md hover:-translate-y-1" aria-label="Twitter">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.902 4.902 0 0 0 1.523 6.574 4.903 4.903 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 0 1-2.224.084 4.928 4.928 0 0 0 4.6 3.419A9.9 9.9 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.01-7.505 14.01-14.01 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-all shadow-md hover:-translate-y-1" aria-label="LinkedIn">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-bold text-sm text-white uppercase tracking-wider">Product</span>
            <a href="#features" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Features</a>
            <a href="#preview" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Dashboard Preview</a>
            <a href="#pricing" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Pricing Tiers</a>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-bold text-sm text-white uppercase tracking-wider">Legal</span>
            <a href="#" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Security Overview</a>
            <a href="#" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Compliance</a>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-bold text-sm text-white uppercase tracking-wider">Contact</span>
            <span className="text-sm text-slate-400">Questions or need dedicated enterprise billing? Reach out to our team directly.</span>
            <a href="mailto:sales@gpms-core.io" className="text-sm font-bold text-indigo-400 hover:text-cyan-400 transition-colors underline underline-offset-4">
              sales@gpms-core.io
            </a>
            <span className="text-xs text-slate-500 mt-2">Global HQ: San Francisco, CA</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} GPMS Technologies Inc. All rights reserved.</span>
          <span className="flex items-center gap-1">Built with uncompromising quality for fast-moving teams.</span>
        </div>
      </footer>
    </div>
  );
}
