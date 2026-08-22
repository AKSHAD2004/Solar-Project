import React, { useState, useEffect } from 'react';
import { 
  fetchInquiries, 
  updateInquiryStatus,
  deleteInquiry 
} from '../firebase/enquiryService';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  RefreshCw, 
  Sun, 
  ShieldCheck, 
  MessageSquare,
  ChevronDown,
  Paperclip,
  Trash2,
  AlertTriangle,
  LogOut,
  Bot
} from 'lucide-react';

export default function AdminDashboardPage({ onLogout }) {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All'); // Source filter state
  const [activeInquiry, setActiveInquiry] = useState(null);
  const [responseNote, setResponseNote] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Pending');
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchInquiries();
    setInquiries(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenModal = (item) => {
    setActiveInquiry(item);
    setResponseNote(item.adminNote || '');
    setSelectedStatus(item.status || 'Pending');
  };

  const handleSaveResponse = async () => {
    if (!activeInquiry) return;
    const targetId = activeInquiry.id;
    const newStatus = selectedStatus;
    const newNote = responseNote;

    // Immediately close modal box for instant visual feedback
    setActiveInquiry(null);

    // Save status and admin notes to Firestore / state
    const updatedList = await updateInquiryStatus(targetId, newStatus, newNote);
    setInquiries(updatedList);
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    const updatedList = await deleteInquiry(id);
    setInquiries(updatedList);
    setDeletingId(null);
    setConfirmDeleteId(null);
    if (activeInquiry && activeInquiry.id === id) {
      setActiveInquiry(null);
    }
  };

  // Helper check for chatbot source
  const isChatbotSource = (item) => {
    return (item.source || '').toLowerCase().includes('chatbot');
  };

  // Helper check for callback request
  const isCallbackRequest = (item) => {
    const text = ((item.systemInterest || '') + ' ' + (item.message || '') + ' ' + (item.fullName || '') + ' ' + (item.phone || '')).toLowerCase();
    return text.includes('callback') || text.includes('call back') || text.includes('phone call') || text.includes('call asap') || text.includes('direct contact') || text.includes('pending');
  };

  // Helper check for valid phone number
  const hasValidPhone = (phoneStr) => {
    if (!phoneStr) return false;
    const lower = phoneStr.toLowerCase();
    if (lower.includes('pending') || lower.includes('direct') || lower.includes('contact') || lower.includes('callback')) {
      return false;
    }
    return true;
  };

  // Metrics Calculations
  const totalLeads = inquiries.length;
  const pendingLeads = inquiries.filter(i => i.status === 'Pending').length;
  const contactedLeads = inquiries.filter(i => i.status === 'Contacted').length;
  const resolvedLeads = inquiries.filter(i => i.status === 'Quote Sent' || i.status === 'Resolved').length;

  const chatbotTotal = inquiries.filter(isChatbotSource).length;
  const chatbotCallbacks = inquiries.filter(i => isChatbotSource(i) && isCallbackRequest(i)).length;
  const chatbotInquiries = inquiries.filter(i => isChatbotSource(i) && !isCallbackRequest(i)).length;
  const websiteFormCount = inquiries.filter(i => !isChatbotSource(i)).length;

  // Filtered list
  const filteredInquiries = inquiries.filter(item => {
    const matchesSearch = 
      (item.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.phone || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.city || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.systemInterest || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

    let matchesSource = true;
    if (sourceFilter === 'Chatbot_All') matchesSource = isChatbotSource(item);
    else if (sourceFilter === 'Chatbot_Callbacks') matchesSource = isChatbotSource(item) && isCallbackRequest(item);
    else if (sourceFilter === 'Chatbot_Inquiries') matchesSource = isChatbotSource(item) && !isCallbackRequest(item);
    else if (sourceFilter === 'Website_Form') matchesSource = !isChatbotSource(item);

    return matchesSearch && matchesStatus && matchesSource;
  });

  return (
    <div className="py-8 bg-slate-50 min-h-screen space-y-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-solar-950 via-solar-900 to-solar-800 text-white rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-gold-300 text-xs font-semibold border border-gold-400/20">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>Golden Electricals Admin Portal</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              Customer Solar Inquiry Dashboard
            </h1>
            <p className="text-solar-200 text-xs sm:text-sm max-w-xl">
              Track incoming leads, review light bills, manage Chatbot Callback Requests vs Solar Inquiries, and update status in Firestore.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={loadData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-solar-600 hover:bg-solar-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-md"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs sm:text-sm font-semibold transition-all shadow-md border border-rose-500/30"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-solar-50 text-solar-600 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900">{totalLeads}</p>
              <p className="text-[11px] font-semibold text-slate-500">Total Solar Leads</p>
            </div>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-purple-200/80 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-purple-700">{chatbotTotal}</p>
              <p className="text-[11px] font-semibold text-purple-900">Total Chatbot Leads</p>
            </div>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-amber-200/80 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-amber-600">{chatbotCallbacks}</p>
              <p className="text-[11px] font-semibold text-slate-600">Chatbot Callbacks</p>
            </div>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-blue-200/80 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-blue-600">{chatbotInquiries}</p>
              <p className="text-[11px] font-semibold text-slate-600">Chatbot Inquiries</p>
            </div>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-emerald-200/80 shadow-sm flex items-center gap-3.5 sm:col-span-2 lg:col-span-1">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-emerald-600">{resolvedLeads}</p>
              <p className="text-[11px] font-semibold text-slate-600">Quotes & Resolved</p>
            </div>
          </div>
        </div>

        {/* Source & Status Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          
          {/* Top Row: Search & Source Tabs */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, phone or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-solar-500 focus:border-solar-500 outline-none"
              />
            </div>

            {/* Lead Source Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
              {[
                { label: `All Sources (${totalLeads})`, val: 'All' },
                { label: `🤖 Chatbot All (${chatbotTotal})`, val: 'Chatbot_All' },
                { label: `📞 Chatbot Callbacks (${chatbotCallbacks})`, val: 'Chatbot_Callbacks' },
                { label: `📋 Chatbot Inquiries (${chatbotInquiries})`, val: 'Chatbot_Inquiries' },
                { label: `🌐 Website Form (${websiteFormCount})`, val: 'Website_Form' },
              ].map(src => (
                <button
                  key={src.val}
                  onClick={() => setSourceFilter(src.val)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    sourceFilter === src.val
                      ? 'bg-purple-700 text-white shadow-sm ring-2 ring-purple-400/30'
                      : 'bg-purple-50 text-purple-900 hover:bg-purple-100 border border-purple-200/60'
                  }`}
                >
                  {src.label}
                </button>
              ))}
            </div>

          </div>

          {/* Bottom Row: Status Filter Tabs */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 overflow-x-auto">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">Status Filter:</span>
            <div className="flex items-center gap-1.5">
              {['All', 'Pending', 'Contacted', 'Quote Sent', 'Resolved'].map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    statusFilter === st
                      ? 'bg-solar-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Customer Inquiries List */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden space-y-4">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-solar-600" />
              <span>Customer Inquiries List ({filteredInquiries.length})</span>
            </h2>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-500 space-y-3">
              <RefreshCw className="w-8 h-8 text-solar-500 animate-spin mx-auto" />
              <p className="text-sm font-medium">Fetching customer inquiries from Firestore...</p>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="p-12 text-center text-slate-500 space-y-2">
              <Users className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-base font-semibold">No inquiries found matching your filters.</p>
              <p className="text-xs text-slate-400">Try clearing your search term or switching status filter tabs.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 overflow-x-auto">
              {filteredInquiries.map((item) => (
                <div 
                  key={item.id}
                  className="p-5 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  {/* Customer Info */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-base text-slate-900">{item.fullName}</span>
                      
                      {/* Status Badge */}
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        item.status === 'Pending' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                        item.status === 'Contacted' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                        item.status === 'Quote Sent' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                        'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {item.status || 'Pending'}
                      </span>

                      {item.hasLightBill && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold flex items-center gap-1">
                          <Paperclip className="w-3 h-3" />
                          <span>Light Bill Attached</span>
                        </span>
                      )}

                      {isChatbotSource(item) ? (
                        <>
                          <span className="px-2.5 py-0.5 rounded-lg bg-purple-100 text-purple-900 border border-purple-300 text-[11px] font-extrabold flex items-center gap-1">
                            <Bot className="w-3 h-3 text-purple-700" />
                            <span>Chatbot Assistant Lead</span>
                          </span>

                          {isCallbackRequest(item) && (
                            <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow-md border border-amber-300 flex items-center gap-1.5 animate-pulse">
                              <Phone className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                              <span>📞 CALLBACK REQUEST</span>
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold flex items-center gap-1">
                          <FileText className="w-3 h-3 text-slate-500" />
                          <span>🌐 Website Form</span>
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                      {hasValidPhone(item.phone) && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-solar-600" />
                          <a href={`tel:${item.phone}`} className="hover:underline font-semibold">{item.phone}</a>
                        </span>
                      )}
                      
                      {item.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-solar-600" />
                          <span>{item.email}</span>
                        </span>
                      )}

                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-solar-600" />
                        <span>{item.city || 'Sangli'}</span>
                      </span>
                    </div>

                    <p className={`text-xs p-2.5 rounded-xl font-medium transition-colors ${
                      isCallbackRequest(item)
                        ? 'bg-amber-100 text-amber-950 border-l-4 border-amber-500 font-bold shadow-xs'
                        : 'text-slate-700'
                    }`}>
                      <strong>Solar Interest:</strong> {item.systemInterest}
                    </p>

                    {item.message && (
                      <p className={`text-xs p-3 rounded-xl max-w-2xl italic transition-colors ${
                        isCallbackRequest(item)
                          ? 'bg-amber-50/90 text-amber-950 border border-amber-300/80 font-semibold shadow-2xs'
                          : 'text-slate-600 bg-slate-100/70'
                      }`}>
                        "{item.message}"
                      </p>
                    )}

                    {item.adminNote && (
                      <p className="text-xs text-solar-800 bg-solar-50 border border-solar-200/60 p-2 rounded-lg max-w-2xl">
                        <strong>Admin Response:</strong> {item.adminNote}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end pt-2 md:pt-0">
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="px-3.5 py-2 rounded-xl bg-solar-50 hover:bg-solar-100 text-solar-700 font-semibold text-xs border border-solar-200 transition-colors flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-solar-600" />
                      <span>Respond & Manage</span>
                    </button>

                    <button
                      onClick={() => setConfirmDeleteId(item.id)}
                      disabled={deletingId === item.id}
                      className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold text-xs border border-rose-200 transition-colors flex items-center gap-1.5"
                      title="Delete Quote / Inquiry"
                    >
                      {deletingId === item.id ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                      )}
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Response Modal / Drawer */}
      {activeInquiry && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6 relative border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  Manage Customer Inquiry
                </h3>
                <p className="text-xs text-slate-500">
                  Lead ID: <span className="font-mono">{activeInquiry.id}</span>
                </p>
              </div>
              <button
                onClick={() => setActiveInquiry(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Customer Details Summary */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2 text-xs text-slate-700">
              <p><strong>Customer Name:</strong> {activeInquiry.fullName}</p>
              <p><strong>Phone:</strong> {activeInquiry.phone}</p>
              <p><strong>Location:</strong> {activeInquiry.city}</p>
              <p className={`p-2 rounded-lg font-semibold ${
                isCallbackRequest(activeInquiry) 
                  ? 'bg-amber-100 text-amber-950 border-l-4 border-amber-500 font-bold' 
                  : 'text-slate-800'
              }`}>
                <strong>Requirement:</strong> {activeInquiry.systemInterest}
              </p>
              {activeInquiry.billFileName && (
                <p className="text-emerald-700 font-semibold">
                  <strong>Attached Bill:</strong> {activeInquiry.billFileName}
                </p>
              )}
            </div>

            {/* Status Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Update Lead Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-800 outline-none focus:ring-2 focus:ring-solar-500"
              >
                <option value="Pending">⏳ Pending (Action Required)</option>
                <option value="Contacted">📞 Contacted & Site Survey Scheduled</option>
                <option value="Quote Sent">📄 Quote Sent to Customer</option>
                <option value="Resolved">✅ Resolved & System Installed</option>
              </select>
            </div>

            {/* Admin Response Note */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Admin Response & Quote Estimate Notes
              </label>
              <textarea
                rows={4}
                placeholder="Enter quote estimate (e.g. 3 kW system total ₹1.85 Lakh with ₹78,000 subsidy), survey findings, or customer response details..."
                value={responseNote}
                onChange={(e) => setResponseNote(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-solar-500"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setConfirmDeleteId(activeInquiry.id)}
                className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold text-xs border border-rose-200 flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Quote</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveInquiry(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSaveResponse}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-solar-500 hover:bg-solar-600 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Save & Update</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 text-center relative border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            
            <div className="space-y-1">
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Delete Customer Quote?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to delete this customer inquiry? This action will permanently remove the quote record from Firestore database.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDeleteId(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => handleDelete(confirmDeleteId)}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
