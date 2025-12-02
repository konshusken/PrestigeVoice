import React, { useState } from 'react';
import { 
  Bot, Phone, ShieldCheck, Clock, CheckCircle2, Menu, X, ArrowRight, Star, 
  Building2, Key, Calendar, MessageSquare, UserCheck, AlertTriangle, TrendingUp,
  PhoneIncoming, FileText, Smartphone
} from 'lucide-react';
import AgentCard from './components/AgentCard';
import { AGENTS } from './constants';
import { AgentType } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<AgentType>(AgentType.Receptionist);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const CALENDLY_LINK = "https://calendly.com/kenkyles/imc";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-600/20">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900">Prestige<span className="text-indigo-600">Voice</span></span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#demo" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Live Demo</a>
              <a href="#how-it-works" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">How it Works</a>
              <a 
                href={CALENDLY_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200"
              >
                Hire Your AI Agent
              </a>
            </div>

            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600 p-2">
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-4 shadow-xl">
              <a href="#demo" onClick={() => setMobileMenuOpen(false)} className="block text-slate-600 font-medium p-2 hover:bg-slate-50 rounded-lg">Live Demo</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-slate-600 font-medium p-2 hover:bg-slate-50 rounded-lg">How it Works</a>
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="block text-center bg-indigo-600 text-white font-bold p-3 rounded-lg hover:bg-indigo-700">
                Hire Your AI Agent
              </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-semibold text-sm mb-8 animate-fade-in-up shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Trusted by 500+ Real Estate Agencies
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]">
                Your Agency's <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">24/7 Voice Force.</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl lg:max-w-none mx-auto">
                Capture every lead and solve tenant emergencies instantly. Our human-like AI agents handle the calls so you can close the deals.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a 
                  href={CALENDLY_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group"
                >
                  <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Hire Your AI Agent
                </a>
                <a href="#demo" className="w-full sm:w-auto px-8 py-4 text-slate-600 font-semibold hover:text-indigo-600 transition-all flex items-center justify-center gap-2">
                  Try Live Demo
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm font-medium text-slate-500">
                <div className="flex -space-x-2">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i*123}`} alt="User" />
                     </div>
                   ))}
                </div>
                <div>
                   <div className="flex text-amber-400 text-xs mb-0.5">
                     <Star className="w-3 h-3 fill-current" />
                     <Star className="w-3 h-3 fill-current" />
                     <Star className="w-3 h-3 fill-current" />
                     <Star className="w-3 h-3 fill-current" />
                     <Star className="w-3 h-3 fill-current" />
                   </div>
                   <p>Loved by property managers</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative mx-auto lg:mx-0 w-full max-w-lg lg:max-w-none">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50">
                    <img 
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                        alt="Modern Real Estate Office" 
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-8">
                        <div className="text-white">
                            <p className="font-bold text-lg">Always Open for Business</p>
                            <p className="text-slate-200 text-sm">Automate your front desk today.</p>
                        </div>
                    </div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce-slow">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-bold uppercase">Calls Handled</p>
                        <p className="text-lg font-bold text-slate-900">24,592</p>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-[800px] h-[800px] bg-indigo-50/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Experience the Voice AI</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Interact with our agents in real-time. Choose a persona below and start a conversation to see how natural it feels.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Side: Toggle Controls */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-800/30 backdrop-blur-sm p-1 rounded-2xl border border-slate-700/50">
                  <button
                    onClick={() => setActiveTab(AgentType.Receptionist)}
                    className={`w-full text-left p-6 rounded-xl transition-all duration-300 flex items-start gap-4 group ${
                      activeTab === AgentType.Receptionist 
                        ? 'bg-gradient-to-r from-indigo-600 to-blue-600 shadow-lg' 
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className={`p-3 rounded-lg flex-shrink-0 ${activeTab === AgentType.Receptionist ? 'bg-white/20' : 'bg-slate-700 text-slate-400'}`}>
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`font-bold text-xl mb-1 ${activeTab === AgentType.Receptionist ? 'text-white' : 'text-slate-200'}`}>Receptionist Mode</h3>
                      <p className={`text-sm leading-relaxed ${activeTab === AgentType.Receptionist ? 'text-indigo-100' : 'text-slate-500'}`}>
                        "Sarah" handles scheduling, listing inquiries, and general front-desk tasks during business hours.
                      </p>
                    </div>
                  </button>

                  <div className="h-px bg-slate-700/50 my-1 mx-4"></div>

                  <button
                    onClick={() => setActiveTab(AgentType.Emergency)}
                    className={`w-full text-left p-6 rounded-xl transition-all duration-300 flex items-start gap-4 group ${
                      activeTab === AgentType.Emergency 
                        ? 'bg-gradient-to-r from-red-600 to-orange-600 shadow-lg' 
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className={`p-3 rounded-lg flex-shrink-0 ${activeTab === AgentType.Emergency ? 'bg-white/20' : 'bg-slate-700 text-slate-400'}`}>
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`font-bold text-xl mb-1 ${activeTab === AgentType.Emergency ? 'text-white' : 'text-slate-200'}`}>Emergency Mode</h3>
                      <p className={`text-sm leading-relaxed ${activeTab === AgentType.Emergency ? 'text-red-100' : 'text-slate-500'}`}>
                        "Mike" manages after-hours tenant emergencies like leaks, lockouts, and safety hazards.
                      </p>
                    </div>
                  </button>
              </div>

              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50 text-sm text-slate-400">
                <p className="font-semibold text-white mb-2">Try asking:</p>
                <ul className="space-y-2 list-disc pl-4 marker:text-indigo-500">
                    {activeTab === AgentType.Receptionist ? (
                        <>
                            <li>"I'd like to schedule a viewing for the downtown loft."</li>
                            <li>"Are you open on Sundays?"</li>
                            <li>"Can you leave a message for Mr. Smith?"</li>
                        </>
                    ) : (
                        <>
                            <li>"Help, water is leaking from my ceiling!"</li>
                            <li>"My heater stopped working and it's freezing."</li>
                            <li>"I'm locked out of my apartment."</li>
                        </>
                    )}
                </ul>
              </div>
            </div>

            {/* Right Side: Agent Card */}
            <div className="lg:col-span-7 relative">
              <AgentCard key={activeTab} config={AGENTS[activeTab]} />
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-[100px] -z-10 opacity-20 transition-colors duration-700 ${activeTab === AgentType.Emergency ? 'bg-red-600' : 'bg-indigo-600'}`}></div>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 1. Introduction */}
            <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-6">
                    Workflow
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">How PrestigeVoice Works</h2>
                <p className="text-xl text-slate-600 leading-relaxed mb-6">
                    PrestigeVoice is an advanced AI system designed specifically for real estate agents and brokers. Its primary purpose is to automate client communication, capture every lead, and handle routine inquiries so you can focus on high-value interactions.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                    Unlike basic chatbots, our system engages in fluid, human-like voice conversations. It serves as your 24/7 front desk, ensuring no client goes unanswered and no emergency is ignored.
                </p>
            </div>

            {/* 2. What the AI Can Do */}
            <div className="mb-24">
                <h3 className="text-2xl font-bold text-slate-900 mb-10 border-b border-slate-200 pb-4">Core Capabilities</h3>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0 text-indigo-600">
                            <PhoneIncoming className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-lg mb-2">Inbound Call Handling</h4>
                            <p className="text-slate-600 leading-relaxed">The AI manages inbound calls and web chats seamlessly, greeting clients professionally regardless of call volume.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0 text-indigo-600">
                            <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-lg mb-2">Listing Knowledge</h4>
                            <p className="text-slate-600 leading-relaxed">It answers specific questions about your active listings, providing details on price, square footage, and amenities directly from your database.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0 text-indigo-600">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-lg mb-2">Scheduling Automation</h4>
                            <p className="text-slate-600 leading-relaxed">The system can schedule, cancel, or reschedule viewing appointments and consultations by syncing directly with your calendar tools.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0 text-indigo-600">
                            <UserCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-lg mb-2">Lead Qualification</h4>
                            <p className="text-slate-600 leading-relaxed">It qualifies leads by asking relevant preliminary questions about budget, timeline, and pre-approval status before passing them to you.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0 text-indigo-600">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-lg mb-2">Natural Dialogue</h4>
                            <p className="text-slate-600 leading-relaxed">The AI provides friendly, natural dialogue that feels authentic, putting callers at ease rather than frustrating them with robotic menus.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0 text-indigo-600">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-lg mb-2">Strict Compliance</h4>
                            <p className="text-slate-600 leading-relaxed">It maintains compliance by strictly avoiding legal advice, negotiation, or acting as a licensed agent, ensuring your liability is protected.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 3. Step by Step Workflow */}
        <div className="bg-slate-50 py-24 border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-12">Conversation Workflow</h3>
                        <div className="space-y-12">
                            {/* Step 1 */}
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm">1</div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">Contact Initiated</h4>
                                    <p className="text-slate-600 mt-2 leading-relaxed">A prospective buyer, seller, or tenant calls your designated agency number.</p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm">2</div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">Intelligent Response</h4>
                                    <p className="text-slate-600 mt-2 leading-relaxed">The AI answers instantly with natural, human-like speech. It listens actively and responds conversationally to the caller's needs.</p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm">3</div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">Data Retrieval & Action</h4>
                                    <p className="text-slate-600 mt-2 leading-relaxed">If asked about a listing, the AI pulls details from your knowledge base. If a showing is requested, it accesses your calendar to book a slot.</p>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm">4</div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">Capture & Log</h4>
                                    <p className="text-slate-600 mt-2 leading-relaxed">The AI captures the lead's contact info, summarizes the conversation, and logs the entire interaction directly into your CRM.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Visual */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl transform rotate-3 scale-[1.02] opacity-20"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                            alt="Workflow Visualization" 
                            className="relative rounded-2xl shadow-xl border border-slate-200"
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* 4. Differentiators */}
        <div className="py-24 bg-slate-900 text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-3xl font-bold mb-12 text-center">The Prestige Difference</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                        <h4 className="text-xl font-bold mb-4 text-indigo-400">Human-Like Conversational Flow</h4>
                        <p className="text-slate-300 leading-relaxed">Our AI uses natural pauses, conversational fillers like "umm" and "uh-huh," and varied intonation. This makes callers feel heard and respected, rather than processed by a machine.</p>
                    </div>
                    <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                        <h4 className="text-xl font-bold mb-4 text-indigo-400">Zero-Training Deployment</h4>
                        <p className="text-slate-300 leading-relaxed">The system works with your existing tools and requires no technical training from your team. We handle the onboarding, so you can start capturing leads immediately.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* 5. Use Cases */}
        <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-12 text-center">Real World Scenarios</h3>
            <div className="grid md:grid-cols-3 gap-8">
                
                {/* Case 1 */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all group">
                    <div className="h-48 overflow-hidden">
                        <img 
                            src="https://images.unsplash.com/photo-1513584685908-2274653fa18f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                            alt="Night House" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Clock className="w-5 h-5 text-indigo-600" />
                            <h4 className="font-bold text-slate-900">The Midnight Buyer</h4>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">A potential buyer sees a sign at 11:30 PM and calls. Instead of voicemail, the AI answers, provides details on the 4-bedroom colonial, and schedules a viewing for the next afternoon.</p>
                    </div>
                </div>
                
                {/* Case 2 */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all group">
                    <div className="h-48 overflow-hidden">
                        <img 
                            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                            alt="Client Meeting" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Calendar className="w-5 h-5 text-indigo-600" />
                            <h4 className="font-bold text-slate-900">The Seller Request</h4>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">A homeowner wants to sell and requests a valuation. The AI collects their address, property condition, and timeline, then books a listing presentation on your calendar.</p>
                    </div>
                </div>

                {/* Case 3 */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all group">
                    <div className="h-48 overflow-hidden">
                        <img 
                            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                            alt="Open House" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Smartphone className="w-5 h-5 text-indigo-600" />
                            <h4 className="font-bold text-slate-900">Busy Open House</h4>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">You are hosting a busy open house and can't answer your phone. The AI fields three calls: one from a lender, one from a tenant, and one new lead, categorizing each for you.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* 6. Limitations */}
        <div className="py-16 bg-slate-50 border-t border-slate-200">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex gap-4 items-start p-6 bg-white rounded-xl border border-orange-100 shadow-sm">
                    <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Operational Boundaries</h3>
                        <p className="text-slate-600 mb-4">To ensure your protection and professional integrity, the AI adheres to strict boundaries:</p>
                        <ul className="grid md:grid-cols-2 gap-2 text-sm text-slate-600">
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>No legal advice provided</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>No pricing opinions given</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>No negotiation tactics</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>No fabrication of listing details</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        {/* 7. Closing */}
        <div className="py-24 bg-white text-center">
             <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-3xl font-bold text-slate-900 mb-6">Why This Matters</h3>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                    Missed calls cost real estate agents thousands in lost commissions every year. Quick response time is the single biggest predictor of lead conversion. By automating your initial contact, you free up your day to focus on closing deals and building relationships.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed mb-10">
                    PrestigeVoice fits seamlessly into the modern real estate business, ensuring you are always open, always professional, and always ready to serve.
                </p>
                <a 
                    href={CALENDLY_LINK} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 items-center justify-center gap-2 mx-auto"
                >
                    Hire Your AI Agent
                    <TrendingUp className="w-5 h-5" />
                </a>
             </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-indigo-600" />
            <span className="text-lg font-bold text-slate-900">PrestigeVoice</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-600 font-medium">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Contact Support</a>
          </div>
          <p className="text-sm text-slate-400">
            © 2024 Prestige Voice AI. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;