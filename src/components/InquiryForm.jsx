import React, { useState, useEffect } from 'react';
import { Send, Upload, FileText, CheckCircle2, AlertCircle, X, Image as ImageIcon } from 'lucide-react';

import { submitInquiry } from '../firebase/enquiryService';

export default function InquiryForm({ prefillData }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    requirement: 'Residential Solar Rooftop (3 kW)',
  });

  const [billFile, setBillFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    if (prefillData) {
      setFormData(prev => ({
        ...prev,
        requirement: `${prefillData.systemType} Solar Rooftop (${prefillData.systemSize} kW) - Monthly Consumption: ${prefillData.monthlyUnits} units`
      }));
    }
  }, [prefillData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBillFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setBillFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      fullName: formData.name,
      phone: formData.phone,
      city: formData.address,
      systemInterest: formData.requirement,
      hasLightBill: !!billFile,
      billFileName: billFile ? billFile.name : null,
      message: `Solar Inquiry submitted via Golden Electricals Website. ${billFile ? `Attached bill: ${billFile.name}` : ''}`,
      status: 'Pending'
    };

    await submitInquiry(payload);

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section id="enquiry" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Inquiry Intro */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-xs font-semibold uppercase tracking-wider">
              <Upload className="w-3.5 h-3.5 text-amber-600" />
              <span>Get Free Site Inspection</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Drop Your Enquiry & Upload Light Bill
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Upload a clear photo or PDF of your recent electricity bill. Our engineers in Sangli will calculate your tariff bracket, solar rooftop suitability, and government subsidy eligibility for a custom proposal.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-solar-500 text-white flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Upload Electricity Bill</h4>
                  <p className="text-xs text-slate-500">Helps us calculate exact sanction load & tariff category.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-gold-500 text-slate-950 flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Free Rooftop Site Assessment</h4>
                  <p className="text-xs text-slate-500">Engineers visit your property to verify shadow-free area.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xl">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-slate-900">Enquiry Submitted Successfully!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Thank you <strong>{formData.name}</strong>. Our Golden Electricals solar engineering team will review your bill details and call you at <strong>{formData.phone}</strong> within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setBillFile(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-solar-500 text-white text-xs font-bold shadow-md hover:bg-solar-600 transition-colors"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Ramesh Patil"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-solar-500 bg-white"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      pattern="[0-9]{10}"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-solar-500 bg-white"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Installation Location Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g. Vishrambag, Sangli, Maharashtra"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-solar-500 bg-white"
                  />
                </div>

                {/* Requirement */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Your Solar System Requirement
                  </label>
                  <input
                    type="text"
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-solar-500 bg-white"
                  />
                </div>

                {/* File Upload Dropzone (Optional) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Photo / PDF of Recent Light Bill (Optional)
                  </label>
                  
                  {billFile ? (
                    <div className="bg-solar-50 p-4 rounded-2xl border border-solar-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-solar-500 text-white flex items-center justify-center">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 truncate max-w-xs">{billFile.name}</p>
                          <p className="text-[11px] text-slate-500">{(billFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setBillFile(null)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-200/50 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-colors bg-white ${
                        dragOver ? 'border-solar-500 bg-solar-50/50' : 'border-slate-300 hover:border-solar-400'
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="space-y-2">
                        <div className="w-12 h-12 rounded-full bg-solar-50 text-solar-500 flex items-center justify-center mx-auto">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-slate-800">
                            <span className="text-solar-600 underline">Click to upload</span> or drag & drop light bill
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">Supports PNG, JPG, JPEG or PDF (max 10MB)</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl bg-solar-500 hover:bg-solar-600 text-white font-bold text-sm shadow-lg shadow-solar-500/25 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <span>Submit Proposal Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
