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
    setSaving(true);
    const updatedList = await updateInquiryStatus(activeInquiry.id, selectedStatus, responseNote);
    setInquiries(updatedList);
    setActiveInquiry(prev => ({ ...prev, status: selectedStatus, adminNote: responseNote }));
    setSaving(false);
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

  // Filtered list
  const filteredInquiries = inquiries.filter(item => {
    const matchesSearch = 
      (item.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.phone || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.city || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.systemInterest || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalLeads = inquiries.length;
  const pendingLeads = inquiries.filter(i => i.status === 'Pending').length;
  const contactedLeads = inquiries.filter(i => i.status === 'Contacted').length;
  const resolvedLeads = inquiries.filter(i => i.status === 'Quote Sent' || i.status === 'Resolved').length;

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
              Manage incoming customer requests, review light bills, respond with quotes, update lead status, or delete quotes directly in Firestore.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-solar-50 text-solar-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">{totalLeads}</p>
              <p className="text-xs font-semibold text-slate-500">Total Customer Inquiries</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-amber-600">{pendingLeads}</p>
              <p className="text-xs font-semibold text-slate-500">Pending Action Needed</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-blue-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-blue-600">{contactedLeads}</p>
              <p className="text-xs font-semibold text-slate-500">Contacted / Surveyed</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-emerald-600">{resolvedLeads}</p>
              <p className="text-xs font-semibold text-slate-500">Quotes Sent & Resolved</p>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, phone or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-solar-500 focus:border-solar-500 outline-none"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {['All', 'Pending', 'Contacted', 'Quote Sent', 'Resolved'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  statusFilter === st
                    ? 'bg-solar-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
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

                      {item.source && item.source.toLowerCase().includes('chatbot') && (
                        <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold flex items-center gap-1">
                          <Bot className="w-3 h-3 text-purple-600" />
                          <span>Chatbot Assistant Lead</span>
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-solar-600" />
                        <a href={`tel:${item.phone}`} className="hover:underline font-semibold">{item.phone}</a>
                      </span>
                      
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

                    <p className="text-xs text-slate-700 font-medium">
                      <strong>Solar Interest:</strong> {item.systemInterest}
                    </p>

                    {item.message && (
                      <p className="text-xs text-slate-500 bg-slate-100/70 p-2 rounded-lg max-w-2xl italic">
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
              <p><strong>Requirement:</strong> {activeInquiry.systemInterest}</p>
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
