/**
 * Knowledge Base & NLP Intent Processor for Golden Solar Assistant
 * Golden Electricals - Authorized Partner of Tata Power Solar in Sangli
 */

export const INITIAL_WELCOME_MESSAGE = {
  id: 'msg-welcome',
  sender: 'bot',
  text: `👋 Hello! Welcome to Golden Electricals.\nI'm your Golden Solar Assistant. I can help you explore solar solutions, understand your solar requirements, calculate estimates, request a quotation, and connect you with our solar engineering team.\nHow can I help you today?`,
  quickReplies: [
    { label: '☀️ Residential Solar', value: 'flow_residential' },
    { label: '🏢 Commercial Solar', value: 'flow_commercial' },
    { label: '🏭 Industrial Solar', value: 'flow_industrial' },
    { label: '🌞 Solar Farm', value: 'flow_farm' },
    { label: '💰 Solar Cost & Savings', value: 'faq_cost' },
    { label: '🔋 On-Grid / Off-Grid', value: 'flow_ongrid_vs_offgrid' },
    { label: '📊 Calculate Solar Requirement', value: 'flow_calculator' },
    { label: '📋 Get a Solar Quote', value: 'flow_quote' },
    { label: '📄 Upload Light Bill', value: 'flow_upload_bill' },
    { label: '📞 Contact Us', value: 'flow_contact' },
    { label: '🔧 Existing Customer Support', value: 'flow_support' },
  ],
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

// Fixed business contact details from existing website
export const COMPANY_CONTACT_INFO = {
  phone: '+91 98508 80687 / +91 91175 77711',
  email: 'golden.electricals@rediffmail.com',
  address: 'Sangli - Miraj Rd, Chougule Marg, V T, Sangli, Maharashtra 416414',
  founder: 'Abhijeet Bhosale ("The Solar Man of Sangli")',
  experience: '16+ Years Expertise in Solar & Electrical Engineering',
  tataPartnership: 'Official Channel Partner of Tata Power Solar in Sangli & Western Maharashtra'
};

// FAQ Match Dictionary
export const FAQS = [
  {
    keywords: ['tata', 'tata solar', 'partner', 'authorized', 'dealer'],
    response: `Golden Electricals is an official channel partner of Tata Power Solar in Sangli and Western Maharashtra, backed by 16+ years of expertise. We provide authentic Tata Power solar modules, tier-1 inverters, and official 25-year performance warranties.`,
    quickReplies: [
      { label: '📋 Get a Solar Quote', value: 'flow_quote' },
      { label: '☀️ Residential Solar', value: 'flow_residential' },
      { label: '📞 Contact Us', value: 'flow_contact' }
    ]
  },
  {
    keywords: ['on grid', 'ongrid', 'grid tie', 'net metering', 'msedcl'],
    response: `An on-grid solar system is connected directly to the electricity grid (e.g. MSEDCL). Solar energy generated powers your property during the day, and excess generation is exported back to the grid subject to net-metering regulations, significantly reducing your monthly electricity bills.`,
    quickReplies: [
      { label: '📊 Calculate Requirement', value: 'flow_calculator' },
      { label: '📋 Get Quote', value: 'flow_quote' },
      { label: '⚡ On-Grid vs Off-Grid', value: 'flow_ongrid_vs_offgrid' }
    ]
  },
  {
    keywords: ['off grid', 'offgrid', 'battery', 'backup', 'power outage'],
    response: `An off-grid solar system operates independently from the electricity grid using battery storage to store power for nighttime or during power outages. It is ideal for remote locations or areas with frequent grid disruptions.`,
    quickReplies: [
      { label: 'Talk to Expert', value: 'flow_callback' },
      { label: '📋 Request Quote', value: 'flow_quote' }
    ]
  },
  {
    keywords: ['difference', 'vs', 'which is better', 'compare'],
    response: `☀️ ON-GRID SOLAR:\n• Connected to electricity grid with net-metering\n• Most cost-effective solution for homes & businesses\n• Exports surplus solar power to grid\n\n🔋 OFF-GRID SOLAR:\n• Independent from electricity grid\n• Requires battery storage bank\n• Ideal for zero-grid or unreliable grid locations\n\nThe best choice depends on your daily energy consumption and location.`,
    quickReplies: [
      { label: '📊 Calculate Requirement', value: 'flow_calculator' },
      { label: '📞 Talk to Solar Expert', value: 'flow_callback' }
    ]
  },
  {
    keywords: ['cost', 'price', 'rate', 'how much', '5kw', '3kw', '10kw', 'investment'],
    response: `Solar system investment depends on your specific monthly energy consumption, equipment specifications (Tata Solar panels / tier-1 inverters), mounting structure type, and applicable PM Surya Ghar government subsidies (up to ₹78,000 for residential homes).\n\nWould you like our engineering team to provide a customized proposal for your property?`,
    quickReplies: [
      { label: '📋 Get a Solar Quote', value: 'flow_quote' },
      { label: '📊 Calculate Solar Requirement', value: 'flow_calculator' },
      { label: '📞 Request Callback', value: 'flow_callback' }
    ]
  },
  {
    keywords: ['tree', 'solar tree'],
    response: `Golden Electricals designs and installs customized Solar Trees. Solar Trees elevate solar panels vertically on a tree-like structure, conserving valuable ground space while capturing maximum sunlight for institutional campuses, commercial gardens, and smart cities.`,
    quickReplies: [
      { label: '🏢 Commercial Solar', value: 'flow_commercial' },
      { label: '📋 Get Quote', value: 'flow_quote' }
    ]
  },
  {
    keywords: ['maintenance', 'repair', 'cleaning', 'service', 'issue'],
    response: `Golden Electricals provides comprehensive solar panel maintenance, annual health checks, inverter troubleshooting, panel cleaning, and electrical switchgear testing across Sangli and Western Maharashtra.`,
    quickReplies: [
      { label: '🔧 Maintenance Request', value: 'flow_support' },
      { label: '📞 Contact Support', value: 'flow_contact' }
    ]
  },
  {
    keywords: ['contact', 'address', 'phone', 'location', 'number', 'email', 'office'],
    response: `📍 Golden Electricals Office:\n${COMPANY_CONTACT_INFO.address}\n\n📞 Phone: ${COMPANY_CONTACT_INFO.phone}\n✉️ Email: ${COMPANY_CONTACT_INFO.email}\n👨‍💼 Founder: ${COMPANY_CONTACT_INFO.founder}`,
    quickReplies: [
      { label: '📞 Request Callback', value: 'flow_callback' },
      { label: '📋 Get a Solar Quote', value: 'flow_quote' }
    ]
  }
];

/**
 * Natural Language Processor to identify intent from freeform text
 */
export const processUserMessage = (userText) => {
  const text = (userText || '').toLowerCase().trim();

  if (!text) return null;

  // Intent: Residential Solar
  if (text.includes('home') || text.includes('house') || text.includes('residential') || text.includes('bungalow') || text.includes('flat')) {
    return {
      text: `Great choice! ☀️ Golden Electricals provides residential rooftop solar solutions designed to help homeowners generate clean electricity, reduce energy bills by up to 90%, and claim PM Surya Ghar subsidies up to ₹78,000.\n\nLet's get a few details to assist you better.`,
      flow: 'residential_name',
      quickReplies: [
        { label: 'Start Residential Quote', value: 'flow_residential' },
        { label: '📊 Calculate Savings', value: 'flow_calculator' }
      ]
    };
  }

  // Intent: Commercial Solar
  if (text.includes('office') || text.includes('commercial') || text.includes('shop') || text.includes('hospital') || text.includes('school') || text.includes('hotel')) {
    return {
      text: `Golden Electricals provides customized commercial rooftop solar solutions to lower operational overheads for businesses, hospitals, and educational institutions in Sangli.`,
      flow: 'commercial_name',
      quickReplies: [
        { label: 'Start Commercial Enquiry', value: 'flow_commercial' },
        { label: '📋 Request Quote', value: 'flow_quote' }
      ]
    };
  }

  // Intent: Industrial Solar
  if (text.includes('factory') || text.includes('industrial') || text.includes('plant') || text.includes('shed') || text.includes('textile') || text.includes('mill')) {
    return {
      text: `Industrial solar solutions require careful site assessment based on your sanctioned load, transformer capacity, and rooftop structural design. Golden Electricals has delivered 30 kW to 500 kW+ industrial solar turnkeys across Miraj and Sangli industrial belts.`,
      flow: 'industrial_name',
      quickReplies: [
        { label: 'Start Industrial Consultation', value: 'flow_industrial' },
        { label: '📞 Request Callback', value: 'flow_callback' }
      ]
    };
  }

  // Intent: Solar Farm
  if (text.includes('farm') || text.includes('land') || text.includes('mw') || text.includes('megawatt') || text.includes('large scale')) {
    return {
      text: `Golden Electricals engineers utility-scale ground-mounted Solar Farms for MW-scale power generation, PPA power evacuation, and agricultural solar pumps across Maharashtra.`,
      flow: 'farm_name',
      quickReplies: [
        { label: 'Request Solar Farm Consultation', value: 'flow_farm' }
      ]
    };
  }

  // Intent: Cost / Price inquiry
  if (text.includes('cost') || text.includes('price') || text.includes('rate') || text.includes('how much') || text.includes('lakh')) {
    return FAQS.find(f => f.keywords.includes('cost'));
  }

  // Intent: On-Grid vs Off-Grid
  if (text.includes('grid') || text.includes('on grid') || text.includes('off grid')) {
    return FAQS.find(f => f.keywords.includes('on grid'));
  }

  // Intent: Contact / Talk
  if (text.includes('call') || text.includes('talk') || text.includes('speak') || text.includes('human') || text.includes('person')) {
    return {
      text: `You can reach our senior solar team directly at ${COMPANY_CONTACT_INFO.phone} or request an instant callback below:`,
      quickReplies: [
        { label: '📞 Request Callback', value: 'flow_callback' },
        { label: '📍 View Address & Email', value: 'faq_contact' }
      ]
    };
  }

  // Match against FAQ Keyword dictionary
  for (const faq of FAQS) {
    if (faq.keywords.some(k => text.includes(k))) {
      return faq;
    }
  }

  // Default Fallback Response (Rule 20)
  return {
    text: `I'm sorry, I don't have enough information to answer that accurately.\n\nI can help you with:\n☀️ Solar Solutions & Estimates\n🏠 Residential Solar (PM Surya Ghar)\n🏢 Commercial & Industrial Solar\n🔋 On-Grid / Off-Grid Guidance\n📊 Solar Capacity Calculation\n📋 Official Tata Solar Quotations\n📞 Connecting with Our Engineering Team\n\nWhat would you like help with?`,
    quickReplies: [
      { label: '☀️ Residential Solar', value: 'flow_residential' },
      { label: '🏢 Commercial Solar', value: 'flow_commercial' },
      { label: '🏭 Industrial Solar', value: 'flow_industrial' },
      { label: '📊 Calculate Requirement', value: 'flow_calculator' },
      { label: '📋 Get a Solar Quote', value: 'flow_quote' },
      { label: '📞 Contact Our Team', value: 'flow_contact' }
    ]
  };
};
