import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, 
  Bot, 
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
  Home,
  ChevronRight,
  Send
} from 'lucide-react';
import { 
  INITIAL_WELCOME_MESSAGE, 
  FAQS, 
  COMPANY_CONTACT_INFO 
} from './chatbotKnowledge';
import { submitInquiry } from '../../firebase/enquiryService';

export default function GoldenSolarChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([INITIAL_WELCOME_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [phoneInputText, setPhoneInputText] = useState('');
  const [pendingFlowData, setPendingFlowData] = useState(null);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen, isMinimized, phoneInputText]);

  // Open chatbot
  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  // Add bot response with typing delay
  const addBotResponse = (responseObj, delayMs = 400) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const textContent = typeof responseObj === 'string' ? responseObj : responseObj.text;
      const buttons = typeof responseObj === 'string' ? null : responseObj.quickReplies;
      const isFileUpload = typeof responseObj === 'object' && responseObj.isFileUpload;
      const isPhoneInput = typeof responseObj === 'object' && responseObj.isPhoneInput;
      const flowContext = typeof responseObj === 'object' ? responseObj.flowContext : null;

      const newBotMsg = {
        id: 'msg-' + Date.now(),
        sender: 'bot',
        text: textContent,
        quickReplies: buttons,
        isFileUpload: isFileUpload,
        isPhoneInput: isPhoneInput,
        flowContext: flowContext,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newBotMsg]);
    }, delayMs);
  };

  // Add user selection message
  const addUserSelection = (text) => {
    const userMsg = {
      id: 'msg-user-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
  };

  // Handle Phone Number Submission
  const handlePhoneSubmit = async (e, flowContext) => {
    e.preventDefault();
    const cleanPhone = phoneInputText.replace(/\D/g, '');

    if (cleanPhone.length !== 10) {
      alert('Please enter a valid 10-digit mobile number (e.g. 9850880687).');
      return;
    }

    const formattedPhone = `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`;
    addUserSelection(`📱 Phone Number: ${formattedPhone}`);
    setPhoneInputText('');

    const context = flowContext || pendingFlowData || { type: 'Callback Request', timeSlot: 'Anytime (9 AM - 7 PM)' };

    const payload = {
      fullName: context.customerName || 'Chatbot Customer',
      phone: cleanPhone,
      city: context.city || 'Sangli / Western MH',
      systemInterest: context.systemInterest || `Callback Request (${context.timeSlot || 'Anytime'})`,
      message: context.message || `Callback requested via Chatbot button for time window: ${context.timeSlot || 'Anytime'}. Customer Phone: ${cleanPhone}`,
      source: 'Golden Solar Assistant Chatbot',
      status: 'New'
    };

    // Mark previous phone input bubble as submitted
    setMessages(prev => prev.map(m => m.isPhoneInput ? { ...m, isSubmitted: true } : m));

    await submitInquiry(payload);

    addBotResponse({
      text: `✅ CALLBACK REQUEST CONFIRMED!\n\n• Mobile Number: ${formattedPhone}\n• Preferred Time Window: ${context.timeSlot || 'Anytime (9 AM - 7 PM)'}\n\nOur senior solar consultation team at Golden Electricals will call you at ${formattedPhone} during your selected time window.\n\n✨ Thank you! This chat session will close automatically.`,
    });

    // Auto-close chatbot window after confirmation and reset conversation
    setTimeout(() => {
      setIsOpen(false);
      setMessages([INITIAL_WELCOME_MESSAGE]);
      setPendingFlowData(null);
    }, 2500);
  };

  // Main Option Selection Handler
  const handleOptionSelect = async (option) => {
    const val = option.value;
    const label = option.label;

    addUserSelection(label);

    // 1. Residential Solar Flow
    if (val === 'flow_residential') {
      addBotResponse({
        text: `Great choice! ☀️ Golden Electricals provides residential rooftop solar solutions designed to help homeowners generate clean electricity, reduce energy bills by up to 90%, and claim PM Surya Ghar subsidies up to ₹78,000.\n\nPlease select your property location:`,
        quickReplies: [
          { label: '🏡 Sangli City Residence', value: 'res_sangli' },
          { label: '🏢 Miraj / Vishrambag Home', value: 'res_miraj' },
          { label: '📍 Other Location in MH', value: 'res_other' },
          { label: '⬅️ Main Menu', value: 'flow_welcome' }
        ]
      });
      return;
    }

    if (val === 'res_sangli' || val === 'res_miraj' || val === 'res_other') {
      addBotResponse({
        text: `Thank you! Select your average Monthly Electricity Consumption slab:`,
        quickReplies: [
          { label: '⚡ Low (< 300 kWh / ₹2,500/mo)', value: 'res_slab_low' },
          { label: '⚡ Medium (300 - 600 kWh / ₹5,000/mo)', value: 'res_slab_med' },
          { label: '⚡ High (600+ kWh / ₹8,000+/mo)', value: 'res_slab_high' },
          { label: '⬅️ Main Menu', value: 'flow_welcome' }
        ]
      });
      return;
    }

    if (val.startsWith('res_slab_')) {
      const slabText = val === 'res_slab_low' ? 'Low (< 300 units)' : val === 'res_slab_med' ? 'Medium (300 - 600 units)' : 'High (600+ units)';
      
      const flowData = {
        type: 'Residential Solar',
        systemInterest: `Residential Rooftop Solar (${slabText})`,
        message: `Residential Solar lead collected via Chatbot buttons. Consumption slab: ${slabText}`,
        timeSlot: 'Morning (9 AM - 1:00 PM)'
      };
      setPendingFlowData(flowData);

      addBotResponse({
        text: `🎉 Thank you! Under PM Surya Ghar scheme, you qualify for up to ₹78,000 central subsidy.\n\n📞 Enter your 10-digit mobile number below so our solar engineer can contact you with the subsidy breakdown & quotation:`,
        isPhoneInput: true,
        flowContext: flowData,
        quickReplies: [
          { label: '📄 Upload Light Bill Photo', value: 'flow_upload_bill' },
          { label: '⬅️ Main Menu', value: 'flow_welcome' }
        ]
      });
      return;
    }

    // 2. Commercial Solar Flow
    if (val === 'flow_commercial') {
      addBotResponse({
        text: `Golden Electricals provides customized commercial rooftop solar solutions to lower power tariffs for businesses, offices, hospitals, and educational institutions in Sangli.\n\nSelect your commercial facility type:`,
        quickReplies: [
          { label: '🏢 Commercial Office / Hospital', value: 'com_office' },
          { label: '🏪 Retail Shop / Hotel', value: 'com_shop' },
          { label: '🏫 School / Institute Campus', value: 'com_school' },
          { label: '⬅️ Main Menu', value: 'flow_welcome' }
        ]
      });
      return;
    }

    if (val.startsWith('com_')) {
      const flowData = {
        type: 'Commercial Solar',
        systemInterest: `Commercial Solar (${label})`,
        message: `Commercial Solar lead via Chatbot. Facility type: ${label}`,
        timeSlot: 'Afternoon (1:00 PM - 5:00 PM)'
      };
      setPendingFlowData(flowData);

      addBotResponse({
        text: `Commercial solar systems qualify for 40% Accelerated Depreciation tax benefits.\n\n📞 Enter your 10-digit mobile number to request a direct engineer consultation:`,
        isPhoneInput: true,
        flowContext: flowData,
        quickReplies: [
          { label: '📄 Upload Electricity Bill', value: 'flow_upload_bill' },
          { label: '⬅️ Main Menu', value: 'flow_welcome' }
        ]
      });
      return;
    }

    // 3. Industrial Solar Flow
    if (val === 'flow_industrial') {
      addBotResponse({
        text: `Industrial solar requirements depend on your sanctioned load, transformer capacity, and rooftop structural design.\n\nSelect your industrial unit type:`,
        quickReplies: [
          { label: '🏭 Textile / Packaging Mill', value: 'ind_mill' },
          { label: '⚙️ Manufacturing / Processing Plant', value: 'ind_plant' },
          { label: '🏗️ Industrial Shed (Tin/RCC)', value: 'ind_shed' },
          { label: '⬅️ Main Menu', value: 'flow_welcome' }
        ]
      });
      return;
    }

    if (val.startsWith('ind_')) {
      const flowData = {
        type: 'Industrial Solar',
        systemInterest: `Industrial Solar Project (${label})`,
        message: `Industrial Solar inquiry via Chatbot. Unit type: ${label}`,
        timeSlot: 'Anytime'
      };
      setPendingFlowData(flowData);

      addBotResponse({
        text: `Senior solar engineer Abhijeet Bhosale ("The Solar Man of Sangli") will review your industrial load.\n\n📞 Enter your 10-digit mobile number for direct project discussion:`,
        isPhoneInput: true,
        flowContext: flowData,
        quickReplies: [
          { label: '📄 Upload Electricity Bill PDF', value: 'flow_upload_bill' },
          { label: '⬅️ Main Menu', value: 'flow_welcome' }
        ]
      });
      return;
    }

    // 4. Solar Farm Flow
    if (val === 'flow_farm') {
      addBotResponse({
        text: `Golden Electricals engineers utility-scale ground-mounted Solar Farms for MW-scale power generation, PPA power evacuation, and agricultural solar pumps.\n\nSelect your land / project scale:`,
        quickReplies: [
          { label: '🌾 1 to 5 Acres (0.5 to 2 MW)', value: 'farm_small' },
          { label: '🏞️ 5+ Acres (Utility Scale MW)', value: 'farm_large' },
          { label: '💧 Agricultural Solar Pumps', value: 'farm_pump' },
          { label: '⬅️ Main Menu', value: 'flow_welcome' }
        ]
      });
      return;
    }

    if (val.startsWith('farm_')) {
      const flowData = {
        type: 'Solar Farm',
        systemInterest: `Solar Farm Project (${label})`,
        message: `Solar Farm inquiry via Chatbot. Scale: ${label}`,
        timeSlot: 'Anytime'
      };
      setPendingFlowData(flowData);

      addBotResponse({
        text: `📞 Enter your 10-digit mobile number to request a MW-scale utility project consultation:`,
        isPhoneInput: true,
        flowContext: flowData,
        quickReplies: [
          { label: '⬅️ Main Menu', value: 'flow_welcome' }
        ]
      });
      return;
    }

    // 5. Cost & Savings FAQ
    if (val === 'faq_cost') {
      addBotResponse({
        text: `💰 SOLAR COST & SAVINGS OVERVIEW:\n\n• Residential Solar: Eligible for up to ₹78,000 PM Surya Ghar Central Government Subsidy.\n• Commercial/Industrial: Eligible for 40% Accelerated Tax Depreciation.\n• Payback Period: Typically 3 to 4 years, followed by 20+ years of free solar energy!\n\nExact system investment depends on your sanctioned load, panel efficiency (Tata Solar), and mounting structure.`,
        quickReplies: [
          { label: '📊 Calculate Solar Requirement', value: 'flow_calculator' },
          { label: '📋 Request Custom Quote', value: 'flow_quote' },
          { label: '⬅️ Main Menu', value: 'flow_welcome' }
        ]
      });
      return;
    }

    // 6. On-Grid vs Off-Grid Comparison
    if (val === 'flow_ongrid_vs_offgrid') {
      addBotResponse({
        text: `☀️ ON-GRID SOLAR:\n• Connected to MSEDCL electricity grid\n• Uses net-metering to export excess energy\n• Most economical choice for homes & businesses\n\n🔋 OFF-GRID SOLAR:\n• Operates independently using battery storage\n• Provides power during grid blackouts\n• Ideal for remote locations\n\nWhich system type would you like to explore?`,
        quickReplies: [
          { label: '☀️ Explore On-Grid Solar', value: 'flow_residential' },
          { label: '🔋 Explore Off-Grid Solar', value: 'flow_callback' },
          { label: '📊 Calculate System Capacity', value: 'flow_calculator' },
          { label: '⬅️ Main Menu', value: 'flow_welcome' }
        ]
      });
      return;
    }

    // 7. Interactive Calculator Flow
    if (val === 'flow_calculator') {
      addBotResponse({
        text: `📊 SELECT YOUR MONTHLY ELECTRICITY CONSUMPTION:`,
        quickReplies: [
          { label: '⚡ 250 Units (3 kW System)', value: 'calc_250' },
          { label: '⚡ 450 Units (4 kW System)', value: 'calc_450' },
          { label: '⚡ 800 Units (7 kW System)', value: 'calc_800' },
          { label: '⚡ 1500 Units (13 kW System)', value: 'calc_1500' },
          { label: '⬅️ Main Menu', value: 'flow_welcome' }
        ]
      });
      return;
    }

    if (val.startsWith('calc_')) {
      const units = val === 'calc_250' ? 250 : val === 'calc_450' ? 450 : val === 'calc_800' ? 800 : 1500;
      const kwSize = Math.ceil(units / 120);
      const areaSqFt = kwSize * 80;
      const monthlySavingsRs = Math.round(kwSize * 120 * 8.5);
      const annualSavingsRs = monthlySavingsRs * 12;

      let subsidyNotice = kwSize >= 3 ? 'Cap ₹78,000 PM Surya Ghar Subsidy' : `₹${kwSize * 30000} PM Surya Ghar Subsidy`;

      addBotResponse({
        text: `📊 PRELIMINARY ESTIMATE (${units} Units/mo):\n\n• Recommended Solar Capacity: ${kwSize} kW\n• Rooftop Area Required: ${areaSqFt} sq. ft.\n• Est. Monthly Savings: ₹${monthlySavingsRs.toLocaleString('en-IN')}\n• Est. Annual Savings: ₹${annualSavingsRs.toLocaleString('en-IN')}\n• Subsidy Breakdown: ${subsidyNotice}\n\n⚠️ Note: Preliminary estimate. Final capacity is confirmed via physical site inspection by Golden Electricals.`,
        quickReplies: [
          { label: '📞 Request Callback for Inspection', value: 'flow_callback' },
          { label: '📋 Request Official Quotation', value: 'flow_quote' },
          { label: '⬅️ Main Menu', value: 'flow_welcome' }
        ]
      });
      return;
    }

    // 8. Get Quote Flow
    if (val === 'flow_quote') {
      const flowData = {
        type: 'Quotation Request',
        systemInterest: 'Official Tata Solar Quotation Request',
        message: 'Quotation request generated via Chatbot action button.',
        timeSlot: 'Morning (9 AM - 1 PM)'
      };
      setPendingFlowData(flowData);

      addBotResponse({
        text: `📋 REQUEST OFFICIAL TATA SOLAR QUOTATION:\n\n📞 Enter your 10-digit mobile number so our engineers can call you with a detailed system proposal:`,
        isPhoneInput: true,
        flowContext: flowData,
        quickReplies: [
          { label: '📄 Upload Light Bill Image/PDF', value: 'flow_upload_bill' },
          { label: '⬅️ Main Menu', value: 'flow_welcome' }
        ]
      });
      return;
    }

    // 9. Upload Light Bill Flow
    if (val === 'flow_upload_bill') {
      addBotResponse({
        text: `📄 UPLOAD YOUR RECENT ELECTRICITY BILL:\n\nAttaching your light bill allows our engineers to analyze your MSEDCL tariff slab, monthly consumption peaks, and design the optimal solar net-metering layout.\n\nClick the button below to select your file (PDF, JPG, PNG):`,
        isFileUpload: true,
        quickReplies: [
          { label: '📞 Request Callback Instead', value: 'flow_callback' },
          { label: '⬅️ Main Menu', value: 'flow_welcome' }
        ]
      });
      return;
    }

    // 10. Request Callback Flow
    if (val === 'flow_callback') {
      addBotResponse({
        text: `📞 SELECT PREFERRED CALLBACK TIME WINDOW:`,
        quickReplies: [
          { label: '🌅 Morning (9:00 AM - 12:00 PM)', value: 'cb_time_morning' },
          { label: '☀️ Afternoon (12:00 PM - 4:00 PM)', value: 'cb_time_afternoon' },
          { label: '🌇 Evening (4:00 PM - 8:00 PM)', value: 'cb_time_evening' },
          { label: '⚡ Urgent - Call ASAP', value: 'cb_time_urgent' }
        ]
      });
      return;
    }

    if (val.startsWith('cb_time_')) {
      const timeSlot = val === 'cb_time_morning' ? 'Morning (9 AM - 12 PM)' : val === 'cb_time_afternoon' ? 'Afternoon (12 PM - 4 PM)' : val === 'cb_time_evening' ? 'Evening (4 PM - 8 PM)' : 'URGENT ASAP';

      const flowData = {
        type: 'Callback Request',
        timeSlot: timeSlot,
        systemInterest: `Callback Request (${timeSlot})`,
        message: `Customer requested callback via Chatbot button for time window: ${timeSlot}`
      };
      setPendingFlowData(flowData);

      addBotResponse({
        text: `📞 PREFERRED TIME SLOT SELECTED: ${timeSlot}\n\nPlease enter your 10-digit mobile number below so our solar consultation team can call you:`,
        isPhoneInput: true,
        flowContext: flowData
      });
      return;
    }

    // 11. Contact Info Flow
    if (val === 'flow_contact') {
      addBotResponse({
        text: `📍 GOLDEN ELECTRICALS HEADQUARTERS:\n${COMPANY_CONTACT_INFO.address}\n\n📞 Direct Calls: ${COMPANY_CONTACT_INFO.phone}\n✉️ Email: ${COMPANY_CONTACT_INFO.email}\n👨‍💼 Founder: ${COMPANY_CONTACT_INFO.founder}\n🏆 Partnership: ${COMPANY_CONTACT_INFO.tataPartnership}`,
        quickReplies: [
          { label: '📞 Request Instant Callback', value: 'flow_callback' },
          { label: '📋 Get Quote', value: 'flow_quote' },
          { label: '⬅️ Main Menu', value: 'flow_welcome' }
        ]
      });
      return;
    }

    // Reset to Welcome / Main Menu
    setMessages([INITIAL_WELCOME_MESSAGE]);
  };

  // Handle File Upload from Chatbot Button
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit. Please select a smaller file.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(35);

    setTimeout(async () => {
      setUploadProgress(100);
      setIsUploading(false);
      
      const payload = {
        fullName: 'Light Bill Upload Customer',
        phone: '',
        city: 'Sangli',
        systemInterest: 'Solar Inquiry with Light Bill Attachment',
        hasLightBill: true,
        billFileName: file.name,
        message: `Customer uploaded light bill file: ${file.name} (${(file.size / 1024).toFixed(1)} KB) via Chatbot button.`,
        source: 'Golden Solar Assistant Chatbot',
        status: 'New'
      };
      await submitInquiry(payload);

      addBotResponse({
        text: `✅ Your electricity bill (${file.name}) has been uploaded successfully!\n\nGolden Electricals engineers will analyze your bill and prepare your custom solar layout.`,
        quickReplies: [
          { label: '📞 Request Callback from Team', value: 'flow_callback' },
          { label: '📋 Request Official Proposal', value: 'flow_quote' },
          { label: '⬅️ Main Menu', value: 'flow_welcome' }
        ]
      });
    }, 700);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3">
          
          {/* Label Badge */}
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
                  <span className="px-1.5 py-0.2 rounded bg-gold-400/20 text-gold-300 text-[10px] uppercase tracking-wider">Interactive</span>
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
              <span className="text-xs font-semibold">Click to open Golden Solar Assistant</span>
              <Sparkles className="w-4 h-4 text-gold-400" />
            </button>
          )}

          {/* Expanded Window Body */}
          {!isMinimized && (
            <>
              {/* Message Feed Container */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/70 text-xs sm:text-sm">
                
                {messages.map((msg) => (
                  <div key={msg.id} className="space-y-2.5">
                    <div className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      
                      {/* Avatar */}
                      {msg.sender === 'bot' ? (
                        <div className="w-8 h-8 rounded-xl bg-solar-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                          <Bot className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-xl bg-solar-900 text-gold-400 flex items-center justify-center shrink-0 shadow-sm mt-0.5 font-bold text-[10px]">
                          YOU
                        </div>
                      )}

                      {/* Message Content Bubble */}
                      <div className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                        msg.sender === 'user'
                          ? 'bg-solar-600 text-white rounded-tr-none shadow-md font-semibold'
                          : 'bg-white text-slate-800 rounded-tl-none border border-slate-200/90 shadow-xs'
                      }`}>
                        <p>{msg.text}</p>
                        <span className={`block text-[10px] mt-1.5 text-right ${msg.sender === 'user' ? 'text-solar-200' : 'text-slate-400'}`}>
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>

                    {/* Inline Phone Input Form Bubble */}
                    {msg.sender === 'bot' && msg.isPhoneInput && !msg.isSubmitted && (
                      <div className="pl-10 pt-1">
                        <form 
                          onSubmit={(e) => handlePhoneSubmit(e, msg.flowContext)} 
                          className="p-3.5 bg-gradient-to-br from-amber-50 to-orange-50/70 border border-amber-200/90 rounded-2xl space-y-2.5 shadow-sm"
                        >
                          <label className="block text-xs font-extrabold text-amber-950 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-amber-600 animate-bounce" />
                            <span>Enter 10-digit Mobile Number:</span>
                          </label>

                          <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-800">+91</span>
                              <input
                                type="tel"
                                required
                                pattern="[0-9]{10}"
                                maxLength={10}
                                placeholder="9850880687"
                                value={phoneInputText}
                                onChange={(e) => setPhoneInputText(e.target.value.replace(/\D/g, ''))}
                                className="w-full pl-11 pr-3 py-2 bg-white rounded-xl border border-amber-300 text-xs font-extrabold text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-2xs"
                              />
                            </div>

                            <button
                              type="submit"
                              disabled={phoneInputText.length !== 10}
                              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white font-black text-xs shadow-md transition-all shrink-0 flex items-center gap-1 active:scale-95"
                            >
                              <span>Submit</span>
                              <Send className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[10px] text-amber-800 font-medium italic">Our solar consultation team will call this number directly.</p>
                        </form>
                      </div>
                    )}

                    {/* Inline File Upload Button if requested */}
                    {msg.sender === 'bot' && msg.isFileUpload && (
                      <div className="pl-10 pt-1">
                        <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-solar-500 hover:bg-solar-600 text-white font-bold text-xs shadow-md cursor-pointer transition-all hover:scale-102">
                          <Upload className="w-4 h-4" />
                          <span>Select Electricity Bill File (PDF / Image)</span>
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}

                    {/* Interactive Selection Buttons */}
                    {msg.sender === 'bot' && msg.quickReplies && (
                      <div className="pl-10 flex flex-col gap-1.5 pt-1">
                        {msg.quickReplies.map((qr, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleOptionSelect(qr)}
                            className="w-full text-left px-3.5 py-2.5 rounded-xl bg-white hover:bg-solar-50 text-solar-900 border border-solar-200/90 text-xs font-bold shadow-2xs transition-all hover:border-solar-400 flex items-center justify-between group active:scale-98"
                          >
                            <span>{qr.label}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-solar-400 group-hover:text-solar-600 transition-transform group-hover:translate-x-0.5" />
                          </button>
                        ))}
                      </div>
                    )}

                  </div>
                ))}

                {/* Typing Animation */}
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

              {/* Persistent Bottom Action Dock */}
              <div className="p-3 bg-slate-100/90 border-t border-slate-200 flex items-center justify-between gap-1.5 shrink-0">
                <button
                  onClick={() => handleOptionSelect({ label: '⬅️ Main Menu', value: 'flow_welcome' })}
                  className="flex-1 py-2 px-2 rounded-xl bg-white hover:bg-slate-200/70 border border-slate-200 text-slate-700 font-bold text-[11px] flex items-center justify-center gap-1 transition-colors shadow-2xs"
                >
                  <Home className="w-3.5 h-3.5 text-solar-600" />
                  <span>Main Menu</span>
                </button>

                <button
                  onClick={() => handleOptionSelect({ label: '📋 Get Quote', value: 'flow_quote' })}
                  className="flex-1 py-2 px-2 rounded-xl bg-solar-500 hover:bg-solar-600 text-white font-bold text-[11px] flex items-center justify-center gap-1 transition-colors shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Get Quote</span>
                </button>

                <button
                  onClick={() => handleOptionSelect({ label: '📞 Callback', value: 'flow_callback' })}
                  className="flex-1 py-2 px-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] flex items-center justify-center gap-1 transition-colors shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Callback</span>
                </button>
              </div>

            </>
          )}

        </div>
      )}
    </>
  );
}
