import { db } from './config';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  doc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

const COLLECTION_NAME = 'enquiries';

// Initial sample inquiries for demonstration & offline fallback
const initialMockInquiries = [
  {
    id: 'inq-101',
    fullName: 'Rajesh Patil',
    phone: '+91 98220 12345',
    email: 'rajesh.patil@gmail.com',
    city: 'Sangli (Vishrambag)',
    roofType: 'Flat RCC Concrete',
    monthlyBill: '₹8,500',
    systemInterest: 'Commercial Rooftop 5 kW',
    message: 'Looking to install solar panels on our commercial bungalow roof. Need subsidy breakdown under PM Surya Ghar.',
    status: 'Pending',
    adminNote: '',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'inq-102',
    fullName: 'Sunil Kulkarni',
    phone: '+91 94224 88990',
    email: 'sunil.kulkarni@yahoo.com',
    city: 'Miraj Industrial Estate',
    roofType: 'Industrial Shed Tin Roof',
    monthlyBill: '₹45,000',
    systemInterest: 'Industrial Rooftop 30 kW',
    message: 'We run a textile packaging unit. Requesting Tata Solar site survey and net-metering estimate.',
    status: 'Contacted',
    adminNote: 'Called customer on 22 Aug. Scheduled site survey for tomorrow at 11 AM.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'inq-103',
    fullName: 'Anil Deshmukh',
    phone: '+91 98900 77665',
    email: 'anil.deshmukh@rediffmail.com',
    city: 'Madhavnagar, Sangli',
    roofType: 'Residential Terrace',
    monthlyBill: '₹3,200',
    systemInterest: 'On-Grid 3 kW',
    message: 'Interested in 3 kW home solar system with Tata Solar panels.',
    status: 'Quote Sent',
    adminNote: 'Sent complete ₹1.85 Lakh system proposal with ₹78,000 PM Surya Ghar subsidy details via WhatsApp.',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

// Helper to get local storage backup
const getLocalInquiries = () => {
  const stored = localStorage.getItem('golden_solar_enquiries');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing local enquiries', e);
    }
  }
  localStorage.setItem('golden_solar_enquiries', JSON.stringify(initialMockInquiries));
  return initialMockInquiries;
};

// Helper to save local storage backup
const saveLocalInquiries = (data) => {
  localStorage.setItem('golden_solar_enquiries', JSON.stringify(data));
};

/**
 * Submit a new customer solar inquiry to Firestore (and local storage backup)
 */
export const submitInquiry = async (inquiryData) => {
  const newEntry = {
    ...inquiryData,
    status: inquiryData.status || 'Pending',
    adminNote: '',
    createdAt: new Date().toISOString(),
  };

  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...newEntry,
      timestamp: serverTimestamp()
    });
    console.log('Inquiry saved to Firestore with ID:', docRef.id);
    
    // Backup locally as well
    const local = getLocalInquiries();
    saveLocalInquiries([{ id: docRef.id, ...newEntry }, ...local]);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.warn('Firestore write failed, saving locally:', error.message);
    const local = getLocalInquiries();
    const mockId = 'inq-' + Date.now();
    const updatedLocal = [{ id: mockId, ...newEntry }, ...local];
    saveLocalInquiries(updatedLocal);
    return { success: true, id: mockId, isOffline: true };
  }
};

/**
 * Get all customer inquiries from Firestore (or fallback local storage)
 */
export const fetchInquiries = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const data = querySnapshot.docs.map(docSnapshot => ({
        id: docSnapshot.id,
        ...docSnapshot.data(),
        createdAt: docSnapshot.data().timestamp?.toDate()?.toISOString() || docSnapshot.data().createdAt || new Date().toISOString()
      }));
      saveLocalInquiries(data);
      return data;
    }
  } catch (error) {
    console.warn('Firestore fetch failed, returning local cached enquiries:', error.message);
  }
  return getLocalInquiries();
};

/**
 * Update inquiry status and admin response notes in Firestore (and local storage)
 */
export const updateInquiryStatus = async (id, status, adminNote = '') => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      status,
      adminNote,
      updatedAt: new Date().toISOString()
    });
    console.log(`Inquiry ${id} updated in Firestore`);
  } catch (error) {
    console.warn('Firestore update failed, updating local state:', error.message);
  }

  // Always sync local storage for immediate UI update
  const local = getLocalInquiries();
  const updated = local.map(item => 
    item.id === id ? { ...item, status, adminNote, updatedAt: new Date().toISOString() } : item
  );
  saveLocalInquiries(updated);
  return updated;
};

/**
 * Delete customer inquiry from Firestore and local cache
 */
export const deleteInquiry = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    console.log(`Inquiry ${id} deleted from Firestore`);
  } catch (error) {
    console.warn('Firestore delete failed, removing from local state:', error.message);
  }

  const local = getLocalInquiries();
  const updated = local.filter(item => item.id !== id);
  saveLocalInquiries(updated);
  return updated;
};
