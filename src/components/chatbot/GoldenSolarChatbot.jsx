import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, 
  Bot, 
  Send, 
  X, 
  Minus, 
  Paperclip, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Upload, 
  FileText, 
  Calculator, 
  ShieldCheck, 
  MessageSquare,
  AlertCircle,
  RefreshCw,
  UserCheck
} from 'lucide-react';
import { 
  INITIAL_WELCOME_MESSAGE, 
  FAQS, 
  processUserMessage, 
  COMPANY_CONTACT_INFO 
} from './chatbotKnowledge';
import { submitInquiry } from '../../firebase/enquiryService';

export default function GoldenSolarChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([INITIAL_WELCOME_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeFlow, setActiveFlow] = useState(null); // Active conversational flow state
  const [flowData, setFlowData] = useState({}); // Form step data accumulator
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Open chatbot
  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 200);
  };

  // Append bot message with typing simulation
  const addBotResponse = (responseObj, delayMs = 600) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const newBotMsg = {
        id: 'msg-' + Date.now(),
        sender: 'bot',
        text: typeof responseObj === 'string' ? responseObj : responseObj.text,
        quickReplies: responseObj.quickReplies || null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newBotMsg]);
    }, delayMs);
  };

  // Helper to add user message
  const addUserMessage = (text) => {
    const userMsg = {
      id: 'msg-user-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
  };

  // Handle flow transitions & data collection
  const handleFlowStep = async (userInputValue) => {
    const currentStep = activeFlow;

    // 1. Residential Flow Steps
    if (currentStep === 'residential_start') {
      addUserMessage(userInputValue || '☀️ Residential Solar');
      setFlowData(prev => ({ ...prev, systemType: 'Residential Solar' }));
      setActiveFlow('res_name');
      addBotResponse('Great choice! ☀️ Golden Electricals provides residential rooftop solar solutions designed to help homeowners generate clean electricity and claim PM Surya Ghar subsidies up to ₹78,000.\n\nPlease enter your Full Name:');
      return;
    }
    if (currentStep === 'res_name') {
      addUserMessage(userInputValue);
      setFlowData(prev => ({ ...prev, fullName: userInputValue }));
      setActiveFlow('res_phone');
      addBotResponse('Thank you! What is your 10-digit Mobile Number?');
      return;
    }
    if (currentStep === 'res_phone') {
      addUserMessage(userInputValue);
      setFlowData(prev => ({ ...prev, phone: userInputValue }));
      setActiveFlow('res_location');
      addBotResponse('Got it. What is your City / Location in Sangli or Western Maharashtra?');
      return;
    }
    if (currentStep === 'res_location') {
      addUserMessage(userInputValue);
      setFlowData(prev => ({ ...prev, city: userInputValue }));
      setActiveFlow('res_bill');
      addBotResponse('What is your average Monthly Electricity Bill (in ₹)? (e.g. ₹3,500)');
      return;
    }
    if (currentStep === 'res_bill') {
      addUserMessage(userInputValue);
      const finalPayload = {
        ...flowData,
        monthlyBill: userInputValue,
        systemInterest: 'Residential Rooftop Solar (PM Surya Ghar Subsidy)',
        message: 'Residential Solar lead collected via Golden Solar Assistant Chatbot.',
        source: 'Golden Solar Assistant Chatbot',
        status: 'New'
      };
      await submitInquiry(finalPayload);
      setActiveFlow(null);
      addBotResponse({
        text: `Thank you, ${flowData.fullName || 'valued customer'}! 🎉\nYour residential solar requirement has been recorded successfully by Golden Electricals.\nWould you like to request a formal quotation or an instant callback from our solar team?`,
        quickReplies: [
          { label: '📋 Get Quote', value: 'flow_quote' },
          { label: '📞 Request Callback', value: 'flow_callback' }
        ]
      });
      return;
    }

    // 2. Commercial Flow Steps
    if (currentStep === 'commercial_start') {
      addUserMessage(userInputValue || '🏢 Commercial Solar');
      setFlowData(prev => ({ ...prev, systemType: 'Commercial Solar' }));
      setActiveFlow('com_name');
      addBotResponse('Golden Electricals provides customized commercial rooftop solar solutions to lower power tariffs for businesses, hospitals, and schools.\n\nPlease enter your Full Name or Business Name:');
      return;
    }
    if (currentStep === 'com_name') {
      addUserMessage(userInputValue);
      setFlowData(prev => ({ ...prev, fullName: userInputValue }));
      setActiveFlow('com_phone');
      addBotResponse('Please enter your Contact Mobile Number:');
      return;
    }
    if (currentStep === 'com_phone') {
      addUserMessage(userInputValue);
      setFlowData(prev => ({ ...prev, phone: userInputValue }));
      setActiveFlow('com_bill');
      addBotResponse('What is your average Monthly Electricity Bill or Units consumption? (e.g. ₹25,000 or 2500 units)');
      return;
    }
    if (currentStep === 'com_bill') {
      addUserMessage(userInputValue);
      const finalPayload = {
        ...flowData,
        monthlyBill: userInputValue,
        systemInterest: 'Commercial Rooftop Solar Solution',
        message: 'Commercial Solar lead collected via Golden Solar Assistant Chatbot.',
        source: 'Golden Solar Assistant Chatbot',
        status: 'New'
      };
      await submitInquiry(finalPayload);
      setActiveFlow(null);
      addBotResponse({
        text: `Thank you! Your commercial solar inquiry has been recorded. Our engineering team will evaluate your consumption and contact you shortly.`,
        quickReplies: [
          { label: '📞 Request Callback', value: 'flow_callback' },
          { label: '📄 Upload Light Bill', value: 'flow_upload_bill' }
        ]
      });
      return;
    }

    // 3. Industrial Flow Steps
    if (currentStep === 'industrial_start') {
      addUserMessage(userInputValue || '🏭 Industrial Solar');
      setFlowData(prev => ({ ...prev, systemType: 'Industrial Solar' }));
      setActiveFlow('ind_name');
      addBotResponse('Industrial solar requirements depend on your sanctioned load, transformer specs, and rooftop structural design.\n\nPlease enter your Company / Factory Name and Contact Name:');
      return;
    }
    if (currentStep === 'ind_name') {
      addUserMessage(userInputValue);
      setFlowData(prev => ({ ...prev, fullName: userInputValue }));
      setActiveFlow('ind_phone');
      addBotResponse('What is your Direct Mobile Number?');
      return;
    }
    if (currentStep === 'ind_phone') {
      addUserMessage(userInputValue);
      setFlowData(prev => ({ ...prev, phone: userInputValue }));
      setActiveFlow('ind_load');
      addBotResponse('What is your Factory Location and Monthly Electricity Bill or Sanctioned Load (HP/kW)?');
      return;
    }
    if (currentStep === 'ind_load') {
      addUserMessage(userInputValue);
      const finalPayload = {
        ...flowData,
        message: `Industrial Solar Inquiry. Location & Load: ${userInputValue}`,
        systemInterest: 'Industrial Solar Turnkey Project',
        source: 'Golden Solar Assistant Chatbot',
        status: 'New'
      };
      await submitInquiry(finalPayload);
      setActiveFlow(null);
      addBotResponse({
        text: `Thank you! Your industrial solar consultation request has been logged. Senior engineer Abhijeet Bhosale and our technical team will review your site specifications.`,
        quickReplies: [
          { label: '📞 Request Callback', value: 'flow_callback' },
          { label: '📄 Upload Light Bill', value: 'flow_upload_bill' }
        ]
      });
      return;
    }

    // 4. Solar Farm Flow
    if (currentStep === 'farm_start') {
      addUserMessage(userInputValue || '🌞 Solar Farm');
      setFlowData(prev => ({ ...prev, systemType: 'Solar Farm' }));
      setActiveFlow('farm_name');
      addBotResponse('Golden Electricals provides megawatt-scale solar farm solutions for ground-mounted renewable generation.\n\nPlease enter your Name / Organization:');
      return;
    }
    if (currentStep === 'farm_name') {
      addUserMessage(userInputValue);
      setFlowData(prev => ({ ...prev, fullName: userInputValue }));
      setActiveFlow('farm_phone');
      addBotResponse('Please enter your Mobile Number:');
      return;
    }
    if (currentStep === 'farm_phone') {
      addUserMessage(userInputValue);
      const finalPayload = {
        ...flowData,
        phone: userInputValue,
        systemInterest: 'Utility-Scale Solar Farm',
        message: 'Solar Farm consultation request collected via Chatbot.',
        source: 'Golden Solar Assistant Chatbot',
        status: 'New'
      };
      await submitInquiry(finalPayload);
      setActiveFlow(null);
      addBotResponse({
        text: `Thank you! Your Solar Farm consultation request has been submitted successfully. Our team will contact you.`,
        quickReplies: [
          { label: '📞 Request Callback', value: 'flow_callback' }
        ]
      });
      return;
    }

    // 5. Calculator Flow
    if (currentStep === 'calc_units') {
      addUserMessage(userInputValue);
      const units = Math.max(100, Number(userInputValue.replace(/[^0-9]/g, '')) || 400);
      const kwSize = Math.ceil(units / 120);
      const areaSqFt = kwSize * 80;
      const monthlySavingsRs = Math.round(kwSize * 120 * 8.5);
      const annualSavingsRs = monthlySavingsRs * 12;

      let subsidyNotice = kwSize >= 3 ? 'Cap ₹78,000 Central PM Surya Ghar Subsidy' : `₹${kwSize * 30000} PM Surya Ghar Subsidy`;

      setActiveFlow(null);
      addBotResponse({
        text: `📊 PRELIMINARY SOLAR ESTIMATE:\n\n• Recommended Capacity: ${kwSize} kW\n• Rooftop Area Required: ${areaSqFt} sq. ft.\n• Est. Monthly Savings: ₹${monthlySavingsRs.toLocaleString('en-IN')}\n• Est. Annual Savings: ₹${annualSavingsRs.toLocaleString('en-IN')}\n• Government Subsidy: ${subsidyNotice}\n\n⚠️ Note: This is a preliminary calculation. Final system sizing and net-metering approval will be confirmed through site evaluation by Golden Electricals engineers.`,
        quickReplies: [
          { label: '📋 Get Quote', value: 'flow_quote' },
          { label: '📞 Request Callback', value: 'flow_callback' }
        ]
      });
      return;
    }

    // 6. Callback Request Flow
    if (currentStep === 'callback_name') {
      addUserMessage(userInputValue);
      setFlowData(prev => ({ ...prev, fullName: userInputValue }));
      setActiveFlow('callback_phone');
      addBotResponse('Please enter your 10-digit Mobile Number for the callback:');
      return;
    }
    if (currentStep === 'callback_phone') {
      addUserMessage(userInputValue);
      const finalPayload = {
        fullName: flowData.fullName || 'Callback Request',
        phone: userInputValue,
        city: 'Sangli',
        systemInterest: 'Instant Callback Request',
        message: 'Customer requested direct callback via Golden Solar Assistant Chatbot.',
        source: 'Golden Solar Assistant Chatbot',
        status: 'New'
      };
      await submitInquiry(finalPayload);
      setActiveFlow(null);
      addBotResponse({
        text: `✅ Your callback request has been submitted successfully!\nOur team will call you at ${userInputValue} at the earliest.`,
        quickReplies: [
          { label: '☀️ Residential Solar', value: 'flow_residential' },
          { label: '📞 View Office Contact', value: 'faq_contact' }
        ]
      });
      return;
    }

    // 7. General Quote Flow
    if (currentStep === 'quote_name') {
      addUserMessage(userInputValue);
      setFlowData(prev => ({ ...prev, fullName: userInputValue }));
      setActiveFlow('quote_phone');
      addBotResponse('What is your Mobile Number?');
      return;
    }
    if (currentStep === 'quote_phone') {
      addUserMessage(userInputValue);
      setFlowData(prev => ({ ...prev, phone: userInputValue }));
      setActiveFlow('quote_req');
      addBotResponse('Please enter your Property Address & Solar System Requirement (e.g. 5 kW On-Grid Home Solar in Sangli):');
      return;
    }
    if (currentStep === 'quote_req') {
      addUserMessage(userInputValue);
      const finalPayload = {
        ...flowData,
        systemInterest: userInputValue,
        message: `Quote request via Chatbot: ${userInputValue}`,
        source: 'Golden Solar Assistant Chatbot',
        status: 'New'
      };
      await submitInquiry(finalPayload);
      setActiveFlow(null);
      addBotResponse({
        text: `Thank you for contacting Golden Electricals! ☀️\nYour solar quotation enquiry has been submitted successfully. Our team will review your requirement and contact you.`,
        quickReplies: [
          { label: '📄 Upload Light Bill', value: 'flow_upload_bill' },
          { label: '📞 Request Callback', value: 'flow_callback' }
        ]
      });
      return;
    }
  };

  // Handle Quick Reply Clicks
  const handleQuickReply = (item) => {
    const val = item.value;
    const label = item.label;

    if (val === 'flow_residential') {
      handleFlowStep(label);
      return;
    }
    if (val === 'flow_commercial') {
      setActiveFlow('commercial_start');
      handleFlowStep(label);
      return;
    }
    if (val === 'flow_industrial') {
      setActiveFlow('industrial_start');
      handleFlowStep(label);
      return;
    }
    if (val === 'flow_farm') {
      setActiveFlow('farm_start');
      handleFlowStep(label);
      return;
    }
    if (val === 'flow_calculator') {
      addUserMessage(label);
      setActiveFlow('calc_units');
      addBotResponse('Let\'s calculate your recommended solar system capacity!\n\nPlease enter your average Monthly Electricity Consumption in Units (kWh) or Monthly Bill in ₹: (e.g. 450 units)');
      return;
    }
    if (val === 'flow_ongrid_vs_offgrid') {
      addUserMessage(label);
      const matched = FAQS.find(f => f.keywords.includes('difference'));
      addBotResponse(matched);
      return;
    }
    if (val === 'flow_contact' || val === 'faq_contact') {
      addUserMessage(label);
      addBotResponse({
        text: `📍 Golden Electricals Office:\n${COMPANY_CONTACT_INFO.address}\n\n📞 Call Us: ${COMPANY_CONTACT_INFO.phone}\n✉️ Email: ${COMPANY_CONTACT_INFO.email}\n👨‍💼 Founder: ${COMPANY_CONTACT_INFO.founder}`,
        quickReplies: [
          { label: '📞 Request Callback', value: 'flow_callback' },
          { label: '📋 Get Quote', value: 'flow_quote' }
        ]
      });
      return;
    }
    if (val === 'flow_callback') {
      addUserMessage(label);
      setActiveFlow('callback_name');
      addBotResponse('Please enter your Full Name for the callback request:');
      return;
    }
    if (val === 'flow_quote') {
      addUserMessage(label);
      setActiveFlow('quote_name');
      addBotResponse('To generate an accurate quotation, please enter your Full Name:');
      return;
    }
    if (val === 'flow_upload_bill') {
      addUserMessage(label);
      addBotResponse({
        text: `📄 Uploading your recent electricity bill helps our engineers analyze your tariff slab and design the perfect solar net-metering capacity for you.\n\nClick the paperclip button in the input bar or use the upload control below:`,
        quickReplies: [
          { label: '📋 Request Quote', value: 'flow_quote' },
          { label: '📞 Request Callback', value: 'flow_callback' }
        ]
      });
      return;
    }
    if (val === 'flow_support') {
      addUserMessage(label);
      addBotResponse({
        text: `🔧 Golden Electricals Customer Support:\n\nFor existing solar installations, inverter troubleshooting, maintenance checks, or documentation assistance, please choose an option or call our support desk at +91 98508 80687.`,
        quickReplies: [
          { label: '📞 Request Service Callback', value: 'flow_callback' },
          { label: '📍 Office Location', value: 'faq_contact' }
        ]
      });
      return;
    }

    // Default trigger
    addUserMessage(label);
    const nlpResult = processUserMessage(label);
    addBotResponse(nlpResult);
  };

  // Submit Text Input
  const handleSendText = (e) => {
    if (e) e.preventDefault();
    const text = inputText.trim();
    if (!text) return;

    setInputText('');

    if (activeFlow) {
      handleFlowStep(text);
      return;
    }

    addUserMessage(text);
    const response = processUserMessage(text);
    addBotResponse(response);
  };

  // Handle File Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit. Please upload a smaller image or PDF.');
      return;
    }

    setIsUploading(true);
    setUploadFile(file);
    setUploadProgress(30);

    setTimeout(async () => {
      setUploadProgress(100);
      setIsUploading(false);
      
      const payload = {
        fullName: 'Chatbot Light Bill Upload',
        phone: 'Pending Contact',
        city: 'Sangli',
        systemInterest: 'Solar Inquiry with Light Bill Attachment',
        hasLightBill: true,
        billFileName: file.name,
        message: `Customer uploaded light bill: ${file.name} (${(file.size / 1024).toFixed(1)} KB) via Golden Solar Assistant Chatbot.`,
        source: 'Golden Solar Assistant Chatbot',
        status: 'New'
      };
      await submitInquiry(payload);

      addBotResponse({
        text: `✅ Your electricity bill (${file.name}) has been uploaded and recorded successfully!\n\nOur solar engineers will analyze your power consumption slab and prepare your custom proposal. Would you like a callback or a formal quotation?`,
        quickReplies: [
          { label: '📞 Request Callback', value: 'flow_callback' },
          { label: '📋 Get Quote', value: 'flow_quote' }
        ]
      });
    }, 800);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3">
          
          {/* Label Tooltip Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-solar-950 text-white text-xs font-semibold shadow-xl border border-gold-400/30 animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Chat with Solar Assistant</span>
          </div>

          <button
            onClick={handleOpen}
            aria-label="Open Golden Solar Assistant Chatbot"
            className="group relative w-14 h-14 rounded-full bg-gradient-to-tr from-solar-600 via-solar-500 to-amber-400 text-white shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-solar-400/50"
          >
            {/* Pulsing Aura Effect */}
            <span className="absolute inset-0 rounded-full bg-solar-500 opacity-75 animate-ping pointer-events-none" />
            
            <Sun className="w-7 h-7 text-white transition-transform group-hover:rotate-45" />
            
            {/* Status dot */}
            <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white" />
          </button>
        </div>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className={`fixed z-50 transition-all duration-300 ${
          isMinimized 
            ? 'bottom-5 right-5 w-72 h-14 rounded-2xl shadow-xl overflow-hidden' 
            : 'bottom-0 right-0 sm:bottom-5 sm:right-5 w-full sm:w-[400px] h-[100dvh] sm:h-[620px] max-h-[100dvh] sm:max-h-[85vh] rounded-none sm:rounded-3xl shadow-2xl border-0 sm:border border-slate-200/80 flex flex-col bg-white overflow-hidden'
        }`}>
          
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-solar-950 via-solar-900 to-solar-800 text-white px-4 py-3.5 flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-white/10 border border-gold-400/30 flex items-center justify-center text-gold-400">
                <Sun className="w-5 h-5 text-gold-400" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-solar-950" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
                  <span>Golden Solar Assistant</span>
                  <span className="px-1.5 py-0.2 rounded bg-gold-400/20 text-gold-300 text-[10px] uppercase tracking-wider">AI</span>
                </h3>
                <p className="text-[11px] text-solar-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  <span>Golden Electricals Support</span>
                </p>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-7 h-7 rounded-lg hover:bg-white/10 text-solar-200 hover:text-white flex items-center justify-center transition-colors"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                <Minus className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg hover:bg-white/10 text-solar-200 hover:text-white flex items-center justify-center transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Minimized Bar Content */}
          {isMinimized && (
            <button 
              onClick={() => setIsMinimized(false)}
              className="w-full h-full bg-solar-900 text-white px-4 flex items-center justify-between"
            >
              <span className="text-xs font-semibold">Click to resume Solar Assistant</span>
              <Sparkles className="w-4 h-4 text-gold-400" />
            </button>
          )}

          {/* Expanded Window Body */}
          {!isMinimized && (
            <>
              {/* Message History Feed */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/70 text-xs sm:text-sm">
                
                {messages.map((msg) => (
                  <div key={msg.id} className="space-y-2">
                    <div className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      
                      {/* Avatar */}
                      {msg.sender === 'bot' ? (
                        <div className="w-8 h-8 rounded-xl bg-solar-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                          <Bot className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-xl bg-solar-900 text-gold-400 flex items-center justify-center shrink-0 shadow-sm mt-0.5 font-bold text-xs">
                          YOU
                        </div>
                      )}

                      {/* Message Bubble */}
                      <div className={`max-w-[82%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                        msg.sender === 'user'
                          ? 'bg-solar-600 text-white rounded-tr-none shadow-md'
                          : 'bg-white text-slate-800 rounded-tl-none border border-slate-200/90 shadow-xs'
                      }`}>
                        <p>{msg.text}</p>
                        <span className={`block text-[10px] mt-1.5 text-right ${msg.sender === 'user' ? 'text-solar-200' : 'text-slate-400'}`}>
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>

                    {/* Quick Replies Buttons */}
                    {msg.sender === 'bot' && msg.quickReplies && (
                      <div className="pl-10 flex flex-wrap gap-1.5 pt-1">
                        {msg.quickReplies.map((qr, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleQuickReply(qr)}
                            className="px-3 py-1.5 rounded-xl bg-white hover:bg-solar-50 text-solar-800 hover:text-solar-900 border border-solar-200 text-xs font-semibold shadow-2xs transition-all hover:scale-102 flex items-center gap-1 active:scale-98"
                          >
                            <span>{qr.label}</span>
                          </button>
                        ))}
                      </div>
                    )}

                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-solar-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-xs flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-solar-500 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-solar-500 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 rounded-full bg-solar-500 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Upload Progress Bar */}
              {isUploading && (
                <div className="px-4 py-2 bg-solar-50 border-t border-solar-100 flex items-center justify-between text-xs text-solar-800">
                  <span className="flex items-center gap-2 font-semibold">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-solar-600" />
                    <span>Uploading light bill...</span>
                  </span>
                  <span className="font-bold">{uploadProgress}%</span>
                </div>
              )}

              {/* Input Action Bar */}
              <form onSubmit={handleSendText} className="p-3 bg-white border-t border-slate-200/90 flex items-center gap-2">
                
                {/* File Upload Trigger */}
                <label className="p-2 rounded-xl text-slate-400 hover:text-solar-600 hover:bg-slate-100 cursor-pointer transition-colors shrink-0" title="Upload Light Bill PDF or Photo">
                  <Paperclip className="w-5 h-5" />
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {/* Input Textbox */}
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask about solar panels, estimates or quotes..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 py-2.5 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 outline-none focus:ring-2 focus:ring-solar-500 focus:border-solar-500"
                />

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-2.5 rounded-xl bg-solar-500 hover:bg-solar-600 disabled:opacity-40 disabled:hover:bg-solar-500 text-white font-bold transition-all shadow-md shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}

        </div>
      )}
    </>
  );
}
