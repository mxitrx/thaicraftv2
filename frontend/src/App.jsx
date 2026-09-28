import React, { useState, useEffect, useMemo, useRef } from 'react';

// ==========================================
// 1. CONFIG & BACKEND SETUP (THAICRAFT THEME)
// ==========================================
const GAS_URL = "https://script.google.com/macros/s/AKfycby5McbTH-_VnGxChrvI04xtSSZ_yTr5kGI0WSLMvkOJKdEnm6DadWkt7HXy8xt-wPmH/exec";

// ข้อมูลเริ่มต้นสำหรับงาน ThaiCraft
const defaultConfig = {
  title: "THAICRAFT 2026",
  subtitle: "สืบสานสถาปัตยกรรมและงานออกแบบไทยสู่อนาคต",
  date: "15 สิงหาคม 2026",
  targetDate: "2026-08-15T09:00:00", 
  location: "หอศิลปวัฒนธรรมแห่งกรุงเทพมหานคร (BACC)",
  aboutText: "เวทีระดับชาติที่รวบรวมสถาปนิก นักออกแบบ และช่างฝีมือชั้นครู มาร่วมแลกเปลี่ยนมุมมองการนำศิลปะและสถาปัตยกรรมไทยดั้งเดิมมาประยุกต์ใช้ในบริบทร่วมสมัย ถอดรหัสความงามจากอดีตสู่นวัตกรรมเพื่ออนาคต สัมผัสประสบการณ์ผ่านการบรรยายและเวิร์กชอปลงมือทำจริง",
  contactEmail: "contact@thaicraftdesign.com",
  contactPhone: "02-987-6543",
  
  primaryColor: "#C5A059", // Gold/Brass color for Thai Theme
  secondaryColor: "#1E293B", // Slate Dark
  
  heroBg: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2000&auto=format&fit=crop", 
  marqueeBg: "", 
  sponsorBg: "", 

  showVideo: false,
  videoTitle: "THAICRAFT HIGHLIGHTS",
  videoUrl: "", 
  videoDesc: "ชมภาพบรรยากาศและความประทับใจจากงานสัมมนาปีที่ผ่านมา ที่รวบรวมนักออกแบบและสถาปนิกชั้นนำของเมืองไทย",

  speakers: [
    { id: 1, name: "ณภัทร จุฑาทิพรัตน์", role: "ผู้เชี่ยวชาญด้านสถาปัตยกรรมไทย", tag: "SCIENCE", color: "#C5A059", img: "https://github.com/mxitrx/thaicraftv2/blob/main/frontend/pic/1.jpg?raw=true", desc: "คณบดีและผู้เชี่ยวชาญด้านประวัติศาสตร์สถาปัตยกรรม จะมาบรรยายหัวข้อ 'รากเหง้าสถาปัตยกรรมไทยในกระแสโลกาภิวัตน์'" },
    { id: 2, name: "กิรณา กังวาฬวงษ์", role: "Design Director, ThaiCraft Studio", tag: "ART AND DESIGN", color: "#F97316", img: "https://github.com/mxitrx/thaicraftv2/blob/main/frontend/pic/2.jpg?raw=true", desc: "นักออกแบบรางวัลระดับโลก ผู้ผสานงานหัตถศิลป์พื้นบ้านเข้ากับงานเฟอร์นิเจอร์และสถาปัตยกรรมภายในแบบร่วมสมัย" },
    { id: 3, name: "ธัญญวรรณ แช่มชื่น", role: "Material Innovator", tag: "ART AND DESIGN", color: "#10B981", img: "https://github.com/mxitrx/thaicraftv2/blob/main/frontend/pic/3.jpg?raw=true", desc: "นักวิจัยด้านวัสดุธรรมชาติ จะมาเผยเทคนิคการนำ ดินเผา ไม้ไผ่ และพืชท้องถิ่น มาใช้ในงานโครงสร้างยุคใหม่เพื่อความยั่งยืน" },
    { id: 4, name: "วารินทร์ทิพย์ แก้วอินต๊ะ", role: "Material Innovator", tag: "ART AND DESIGN", color: "#10B981", img: "https://github.com/mxitrx/thaicraftv2/blob/main/frontend/pic/4.jpg?raw=true", desc: "นักวิจัยด้านวัสดุธรรมชาติ จะมาเผยเทคนิคการนำ ดินเผา ไม้ไผ่ และพืชท้องถิ่น มาใช้ในงานโครงสร้างยุคใหม่เพื่อความยั่งยืน" },
    { id: 5, name: "ศุภาวิตา พิรักษา", role: "Material Innovator", tag: "ART AND DESIGN", color: "#10B981", img: "https://github.com/mxitrx/thaicraftv2/blob/main/frontend/pic/5.jpg?raw=true", desc: "นักวิจัยด้านวัสดุธรรมชาติ จะมาเผยเทคนิคการนำ ดินเผา ไม้ไผ่ และพืชท้องถิ่น มาใช้ในงานโครงสร้างยุคใหม่เพื่อความยั่งยืน" },
    { id: 6, name: "อิทธิฤทธิ์ กุนศิริ", role: "Material Innovator", tag: "AGRICULTURE", color: "#C5A059", img: "https://github.com/mxitrx/thaicraftv2/blob/main/frontend/pic/6.jpg?raw=true", desc: "นักวิจัยด้านวัสดุธรรมชาติ จะมาเผยเทคนิคการนำ ดินเผา ไม้ไผ่ และพืชท้องถิ่น มาใช้ในงานโครงสร้างยุคใหม่เพื่อความยั่งยืน" }

  ],
  
  sponsors: [
    { id: 1, name: "DEV TO THEMOON" }, { id: 2, name: "EVENT FOR U" },
    { id: 3, name: "TCDC" }, { id: 4, name: "King Mongkuts Institute of Technology Ladkrabang (KMITL)" }, { id: 5, name: "BACC" }
  ],

  tickets: [
    { id: 1, name: "Craftman Pass", price: 1200, type: "early", badge: "🔥 BEST VALUE", features: "เข้าฟังสัมมนาได้ทุกเวที\nเข้าร่วม Masterclass Workshop\nอาหารว่างและเครื่องดื่ม\nรับ E-Certificate ดีไซน์พิเศษ" },
    { id: 2, name: "Architect Pass", price: 2500, type: "regular", badge: "STANDARD PASS", features: "เข้าฟังสัมมนาได้ทุกเวที\nเข้าร่วม Masterclass Workshop\nอาหารกลางวันและเครื่องดื่ม\nรับ E-Certificate ดีไซน์พิเศษ" },
    { id: 3, name: "VIP Designer", price: 4500, type: "vip", badge: "👑 VIP EXPERIENCE", features: "สิทธิพิเศษทุกประการของ Architect Pass\nที่นั่ง Reserved Seat แถวหน้าสุด\nเข้าร่วม Exclusive Dinner กับวิทยากรชั้นครู\nรับชุดของที่ระลึก ThaiCraft Limited Edition" }
  ],

  schedule: [
    { id: 1, time: "08:30", title: "Registration & Exhibition", desc: "ลงทะเบียนรับป้ายชื่อ และเดินชมนิทรรศการผลงานสถาปัตยกรรมและหัตถศิลป์ไทยประยุกต์", tag: "NETWORKING", color: "#9CA3AF" },
    { id: 2, time: "09:30", title: "Keynote: อนาคตสถาปัตยกรรมไทยในเวทีโลก", desc: "เปิดมุมมองการนำเอกลักษณ์และภูมิปัญญาไทยไปต่อยอดในงานระดับสากล โดย รศ.ดร. ภูมิปัญญา สถาปัตย์", tag: "MAIN STAGE", color: "#C5A059" },
    { id: 3, time: "11:00", title: "Panel Discussion: ถอดรหัสงานออกแบบไทยประยุกต์", desc: "ร่วมเสวนาถกประเด็นการรักษารากเหง้าควบคู่ไปกับนวัตกรรมและเทคโนโลยีการก่อสร้าง", tag: "PANEL", color: "#3B82F6" },
    { id: 4, time: "12:30", title: "Networking Lunch", desc: "พักรับประทานอาหารไทยฟิวชัน และพบปะพูดคุยกับเพื่อนร่วมวงการ", tag: "BREAK", color: "#10B981" },
    { id: 5, time: "14:00", title: "ThaiCraft Masterclasses", desc: "แยกย้ายเข้าห้องปฏิบัติการ (Track 1: งานไม้ประยุกต์, Track 2: การจัดแสงสถาปัตยกรรม, Track 3: นวัตกรรมสิ่งทอ)", tag: "WORKSHOP", color: "#F97316" },
    { id: 6, time: "16:30", title: "Closing Remarks & Networking", desc: "สรุปกิจกรรม มอบใบประกาศนียบัตร และ After Party สไตล์ร่วมสมัย", tag: "MAIN STAGE", color: "#C5A059" }
  ],
  
  faqs: [
    { id: 1, q: "งานสัมมนานี้เหมาะกับใครบ้าง?", a: "เหมาะสำหรับสถาปนิก, มัณฑนากร, นักออกแบบผลิตภัณฑ์, นิสิตนักศึกษา และผู้ที่หลงใหลในศิลปะและสถาปัตยกรรมไทยประยุกต์" },
    { id: 2, q: "ต้องเตรียมอุปกรณ์อะไรสำหรับ Masterclass หรือไม่?", a: "ทางผู้จัดเตรียมวัสดุอุปกรณ์พื้นฐานให้ครบถ้วน แต่หากท่านมีสมุดสเก็ตช์หรือแท็บเล็ตส่วนตัว สามารถนำมาใช้ประกอบการเวิร์กชอปได้" },
    { id: 3, q: "การเดินทางและที่จอดรถ?", a: "สถานที่จัดงานคือ หอศิลปวัฒนธรรมแห่งกรุงเทพมหานคร แนะนำให้เดินทางด้วยรถไฟฟ้า BTS สถานีสนามกีฬาแห่งชาติ หากนำรถยนต์มาสามารถจอดได้ที่อาคารจอดรถของหอศิลป์ หรือ MBK" }
  ]
};

export default function App() {
  const [currentView, setCurrentView] = useState('customer');
  const [adminTab, setAdminTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [config, setConfig] = useState(() => {
    try { 
      const saved = localStorage.getItem('eventPlatformConfigV6'); 
      return saved ? { ...defaultConfig, ...JSON.parse(saved) } : defaultConfig; 
    } catch { return defaultConfig; }
  });

  const [registrations, setRegistrations] = useState(() => {
    try { const saved = localStorage.getItem('eventPlatformRegisV6'); return saved ? JSON.parse(saved) : []; } 
    catch { return []; }
  });

  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [ticketModal, setTicketModal] = useState({ isOpen: false, name: '', tier: '', qrUrl: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(true);
  const [lastSyncTime, setLastSyncTime] = useState(new Date().toLocaleTimeString('th-TH'));
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeFaq, setActiveFaq] = useState(null);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', role: '', roleOther: '', companyOther: '', workshop: 'ไม่ได้เลือก', ticketId: config?.tickets?.[0]?.id || ''
  });

  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserForm, setEditUserForm] = useState({});

  const [scanQuery, setScanQuery] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerInputRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    if (!window.Html5Qrcode) {
      const script = document.createElement('script');
      script.src = "https://unpkg.com/html5-qrcode";
      script.async = true;
      document.body.appendChild(script);
    }

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    if (isDark) { document.documentElement.classList.add('dark'); localStorage.theme = 'dark'; } 
    else { document.documentElement.classList.remove('dark'); localStorage.theme = 'light'; }
  };

  useEffect(() => { localStorage.setItem('eventPlatformConfigV6', JSON.stringify(config)); }, [config]);
  useEffect(() => { localStorage.setItem('eventPlatformRegisV6', JSON.stringify(registrations)); }, [registrations]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (currentView !== 'customer') return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [currentView, config, darkMode]);

  useEffect(() => {
    const timer = setInterval(() => {
      if(!config?.targetDate) return;
      const difference = +new Date(config.targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [config?.targetDate]);

  useEffect(() => {
    syncWithGoogleSheet(true);
    const intervalTime = currentView === 'admin' ? 5000 : 30000; 
    const interval = setInterval(() => { syncWithGoogleSheet(true); }, intervalTime);
    return () => clearInterval(interval);
  }, [currentView]);

  useEffect(() => {
    if (adminTab === 'scanner' && scannerInputRef.current) {
      scannerInputRef.current.focus();
    }
  }, [adminTab]);

  useEffect(() => {
    if (isScanning && window.Html5Qrcode) {
      html5QrCodeRef.current = new window.Html5Qrcode("qr-reader");
      html5QrCodeRef.current.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          processScan(decodedText);
          html5QrCodeRef.current.stop().then(() => setIsScanning(false));
        },
        (errorMessage) => { /* ignore */ }
      ).catch(err => {
        alert("❌ ไม่สามารถเปิดกล้องได้ กรุณาอนุญาตให้สิทธิ์ใช้งานกล้อง (Camera Permission)");
        setIsScanning(false);
      });
    }
    return () => {
      if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
        html5QrCodeRef.current.stop().catch(console.error);
      }
    };
  }, [isScanning]);

  const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const selectedTicket = config?.tickets?.find(t => String(t.id) === String(formData.ticketId)) || config?.tickets?.[0] || { price: 0, name: '-' };
  const subtotal = selectedTicket ? Number(selectedTicket.price) : 0;
  const vat = Math.round(subtotal * 0.07);
  const total = subtotal + vat;

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const finalRole = formData.role === 'other' ? formData.roleOther : formData.role;
    const finalCompany = formData.company === 'other' ? formData.companyOther : formData.company;

    if (formData.role === 'other' && !finalRole) return alert('กรุณาระบุตำแหน่ง/อาชีพของคุณ');
    if (formData.company === 'other' && !finalCompany) return alert('กรุณาระบุองค์กร/สตูดิโอของคุณ');

    setIsSubmitting(true);
    
    const regId = Date.now();
    const newRegis = {
      id: regId, name: formData.name, email: formData.email, phone: formData.phone, 
      company: `${finalCompany || 'GUEST'} ${finalRole ? `(${finalRole})` : ''}`, 
      ticketName: selectedTicket.name, ticketId: selectedTicket.id,
      totalPaid: total, timestamp: new Date().toLocaleString('th-TH'), status: 'Pending'
    };

    try {
      await fetch(GAS_URL, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "register", data: newRegis })
      });
    } catch (error) { console.error("Sheet API Error:", error); }

    setRegistrations(prev => [newRegis, ...prev]);
    const qrData = encodeURIComponent(`EVENT|${formData.name}|${selectedTicket.name}|${regId}`);
    const qrUrl = `https://quickchart.io/qr?text=${qrData}&size=300&margin=1&dark=${(config.primaryColor || '#C5A059').replace('#','')}`;
    
    setTicketModal({ isOpen: true, name: formData.name, tier: selectedTicket.name, qrUrl });
    setIsSubmitting(false);
    setFormData({ name: '', email: '', phone: '', company: '', role: '', roleOther: '', companyOther: '', workshop: 'ไม่ได้เลือก', ticketId: config?.tickets?.[0]?.id || '' });
  };

  const syncWithGoogleSheet = async (isAuto = false) => {
    if(!isAuto) setIsSyncing(true);
    try {
      const resReg = await fetch(GAS_URL + "?action=getRegistrations&timestamp=" + new Date().getTime() + Math.random(), { cache: 'no-store' });
      const regData = await resReg.json();
      if(Array.isArray(regData)) {
        const formattedData = regData.map(r => ({
          id: r.id || r.Id || r.ID || Date.now() + Math.random(),
          name: r.name || r.Name || '', email: r.email || r.Email || '',
          phone: r.phone || r.Phone || '', company: r.company || r.Company || '',
          ticketName: r.ticketName || r.TicketName || r['Ticket Name'] || r.ticket || r.Ticket || 'UNKNOWN PASS',
          ticketId: String(r.ticketId || r.TicketId || ''),
          totalPaid: Number(r.totalPaid || r.TotalPaid || r['Total Paid'] || r.total || 0),
          timestamp: r.timestamp || r.Timestamp || '',
          status: r.status || r.Status || 'Pending'
        }));
        setRegistrations(formattedData.filter(r => r.name !== ''));
      }

      if (currentView === 'customer' || !isAuto) {
        const resConfig = await fetch(GAS_URL + "?action=getConfig&timestamp=" + new Date().getTime() + Math.random(), { cache: 'no-store' });
        const configData = await resConfig.json();
        if (configData && configData.title) setConfig({ ...defaultConfig, ...configData });
      }
      
      setLastSyncTime(new Date().toLocaleTimeString('th-TH'));
    } catch (error) { console.error("Sync Error:", error); }
    if(!isAuto) setIsSyncing(false);
  };

  const processScan = async (rawText) => {
    if(!rawText) return;
    const parts = rawText.split('|');
    let foundUser = null;

    if(parts.length >= 4 && (parts[0] === 'CRAFT' || parts[0] === 'EVENT' || parts[0] === 'MOTO' || parts[0] === 'RACE')) {
       foundUser = registrations.find(r => String(r.id) === String(parts[3]) || (r.name === parts[1] && r.ticketName === parts[2]));
    } else {
       foundUser = registrations.find(r => r.phone === rawText || r.name.toLowerCase().includes(rawText.toLowerCase()) || String(r.id) === rawText);
    }

    if(!foundUser) { setScanResult({ type: 'error', message: '❌ ไม่พบข้อมูล (Invalid Ticket)' }); return; }
    if(foundUser.status === 'Checked In') { setScanResult({ type: 'duplicate', user: foundUser, message: '⚠️ สแกนซ้ำ (Already Checked In)' }); return; }

    const updatedUser = { ...foundUser, status: 'Checked In' };
    setRegistrations(prev => prev.map(r => r.id === updatedUser.id ? updatedUser : r));
    setScanResult({ type: 'success', user: updatedUser, message: '✅ ยืนยันสิทธิ์สำเร็จ (Entry Granted)' });

    try { await fetch(GAS_URL, { method: 'POST', body: JSON.stringify({ action: 'checkIn', id: updatedUser.id }) }); } catch (err) {}
  };

  const printBadge = (user) => {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    const html = `
      <html>
        <head>
          <title>Preview Badge - ${user.name}</title>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Kanit:wght@400;600;800&display=swap" rel="stylesheet">
          <style>
            body { font-family: 'Kanit', sans-serif; margin: 0; padding: 20px; display: flex; justify-content: center; align-items: center; background: #e5e5e5; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .badge { width: 100mm; height: 140mm; background: #ffffff; overflow: hidden; position: relative; display: flex; flex-direction: column; color: #171717; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border: 1px solid #d4d4d8; border-radius: 20px; }
            .header { background: #1E293B; color: #fff; padding: 25px 15px; text-align: center; text-transform: uppercase; display: flex; flex-direction: column; align-items: center; justify-content: center; border-bottom: 5px solid ${config?.primaryColor || '#C5A059'}; }
            .header h2 { margin: 0; font-size: 22px; font-weight: 700; font-family: 'Playfair Display', serif; }
            .header p { margin: 5px 0 0; font-size: 10px; font-weight: 400; letter-spacing: 3px; color: ${config?.primaryColor || '#C5A059'}; }
            .content { padding: 40px 20px; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background-image: radial-gradient(rgba(197,160,89,0.1) 1.5px, transparent 1.5px); background-size: 15px 15px; }
            .name { font-size: 36px; font-weight: 800; color: #171717; text-transform: uppercase; margin-bottom: 12px; text-align: center; line-height: 1.1; word-break: break-word; letter-spacing: -0.5px;}
            .company { font-size: 16px; font-weight: 500; color: #737373; text-transform: uppercase; text-align: center; letter-spacing: 1px; }
            .footer { background: #fdfbf7; padding: 25px 20px; text-align: center; border-top: 1px solid #e5e5e5; }
            .ticket { font-size: 18px; font-weight: 800; color: ${config?.primaryColor || '#C5A059'}; text-transform: uppercase; letter-spacing: 2px; display: inline-block; padding: 10px 30px; border-radius: 50px; border: 2px solid ${config?.primaryColor || '#C5A059'}; background: rgba(197,160,89,0.05); }
            
            .no-print { position: fixed; top: 20px; right: 20px; z-index: 1000; }
            .print-btn { background: ${config?.primaryColor || '#C5A059'}; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-family: 'Kanit', sans-serif; font-weight: bold; font-size: 16px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.15); transition: background 0.2s; }
            .print-btn:hover { background: #b08a47; }
            
            @media print {
              body { background: #fff; padding: 0; }
              .badge { box-shadow: none; border: 1px solid #ccc; width: 100vw; height: 100vh; border-radius: 0; }
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          <div class="no-print">
            <button class="print-btn" onclick="window.print()">🖨️ พิมพ์ / Print Badge</button>
          </div>
          <div class="badge">
            <div class="header">
              <h2>${config?.title || 'THAICRAFT'}</h2>
              <p>SYMPOSIUM PASS</p>
            </div>
            <div class="content">
              <div class="name">${user.name}</div>
              <div class="company">${user.company || 'GUEST'}</div>
            </div>
            <div class="footer">
              <div class="ticket">${user.ticketName || 'ACCESS PASS'}</div>
            </div>
          </div>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  // ✅ เปลี่ยนฟอนต์กลับมาเป็น Sarabun ตัวมาตรฐานสวยๆ และจัดระยะห่างใหม่เพื่อไม่ให้ตัวอักษรซ้อนกัน
  const printCertificate = (user) => {
    const printWindow = window.open('', '_blank', 'width=1000,height=700');
    const html = `
      <html>
        <head>
          <title>Preview Certificate - ${user.name}</title>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Sarabun:wght@300;400;500;600;700&display=swap" rel="stylesheet">
          <style>
            @page { size: A4 landscape; margin: 0; }
            body { font-family: 'Sarabun', sans-serif; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: #52525B; -webkit-print-color-adjust: exact; print-color-adjust: exact; min-height: 100vh; }
            
            .certificate { width: 297mm; height: 210mm; background: #FFFCF5; position: relative; padding: 15mm; box-sizing: border-box; text-align: center; color: #1f2937; box-shadow: 0 10px 40px rgba(0,0,0,0.3); margin: 20px;}
            
            .border-outer { border: 8px solid ${config?.primaryColor || '#C5A059'}; height: 100%; box-sizing: border-box; padding: 6px; position: relative; background-image: radial-gradient(${config?.primaryColor || '#C5A059'} 1px, transparent 1px); background-size: 25px 25px; }
            .border-inner { border: 2px solid ${config?.primaryColor || '#C5A059'}; background: rgba(255,252,245,0.96); height: 100%; box-sizing: border-box; padding: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; }
            
            .corner { position: absolute; width: 40px; height: 40px; border: 4px solid ${config?.primaryColor || '#C5A059'}; }
            .corner-tl { top: -10px; left: -10px; border-right: none; border-bottom: none; }
            .corner-tr { top: -10px; right: -10px; border-left: none; border-bottom: none; }
            .corner-bl { bottom: -10px; left: -10px; border-right: none; border-top: none; }
            .corner-br { bottom: -10px; right: -10px; border-left: none; border-top: none; }

            .logo-img { height: 90px; object-fit: contain; margin-bottom: 20px; }
            .sig-img { height: 40px; object-fit: contain; margin-bottom: 5px; }
            
            /* เปลี่ยนฟอนต์กลับมาเป็น Sarabun มาตรฐานเพื่อแก้ปัญหาตัวอักษรซ้อนกัน */
            .cert-title { font-family: 'Sarabun', sans-serif; font-size: 36px; font-weight: 700; color: #1E293B; margin: 0 0 30px; letter-spacing: 1.5px;}
            
            .name { font-family: 'Sarabun', sans-serif; font-size: 56px; font-weight: 700; color: ${config?.primaryColor || '#C5A059'}; margin: 10px 0 40px; line-height: 1.4; border-bottom: 2px solid ${config?.primaryColor || '#C5A059'}; padding-bottom: 10px; min-width: 60%; display: inline-block; word-break: break-word;}
            
            .reason { font-family: 'Sarabun', sans-serif; font-size: 20px; font-weight: 400; color: #4b5563; line-height: 1.8; max-width: 80%; margin: 0 auto 40px; }
            .reason strong { font-weight: 700; color: #1E293B; font-size: 26px; font-family: 'Sarabun', sans-serif;}
            
            .footer-cert { display: flex; justify-content: space-between; width: 75%; margin-top: auto; }
            .signature { display: flex; flex-direction: column; align-items: center; }
            .line { width: 220px; height: 1px; background: #1E293B; margin-bottom: 10px; }
            .title { font-family: 'Sarabun', sans-serif; font-size: 16px; color: #4b5563; font-weight: 500;}
            
            .no-print { position: fixed; top: 20px; right: 20px; z-index: 1000; }
            .print-btn { background: ${config?.primaryColor || '#C5A059'}; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-family: 'Sarabun', sans-serif; font-weight: bold; font-size: 16px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.15); transition: background 0.2s; }
            .print-btn:hover { background: #a68444; }
            
            @media print {
              body { background: #fff; align-items: flex-start; justify-content: flex-start; }
              .certificate { width: 100%; height: 100vh; padding: 10mm; box-shadow: none; margin: 0; }
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          <div class="no-print">
            <button class="print-btn" onclick="window.print()">🖨️ พิมพ์ / Print Certificate</button>
          </div>
          <div class="certificate">
            <div class="border-outer">
              <div class="border-inner">
                <div class="corner corner-tl"></div>
                <div class="corner corner-tr"></div>
                <div class="corner corner-bl"></div>
                <div class="corner corner-br"></div>
                
                <img src="https://github.com/mxitrx/thaicraftv2/blob/main/frontend/pic/logo.png?raw=true" class="logo-img" alt="Event Logo" onerror="this.style.display='none'" />
                
                <h1 class="cert-title">เกียรติบัตรฉบับนี้ให้ไว้เพื่อแสดงว่า</h1>
                
                <div class="name">${user.name}</div>
                
                <div class="reason">
                  ได้เข้าร่วมสัมมนาและนิทรรศการด้านสถาปัตยกรรมและงานออกแบบไทยประยุกต์<br>
                  ในงาน <strong>${config?.title || 'THAICRAFT EVENT'}</strong><br>
                  จัดขึ้นเมื่อวันที่ ${config?.date || '2026'}
                </div>
                
                <div class="footer-cert">
                  <div class="signature">
                    <img src="https://github.com/mxitrx/thaicraftv2/blob/main/frontend/pic/sig1.png?raw=true" class="sig-img" alt="Signature 1" onerror="this.style.display='none'" />
                    <div class="line"></div>
                    <div class="title">ประธานกรรมการจัดงาน</div>
                  </div>
                  <div class="signature">
                    <img src="https://github.com/mxitrx/thaicraftv2/blob/main/frontend/pic/sig2.png?raw=true" class="sig-img" alt="Signature 2" onerror="this.style.display='none'" />
                    <div class="line"></div>
                    <div class="title">ผู้อำนวยการสถาบันสถาปัตยกรรม</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  const scrollTo = (id) => { const el = document.getElementById(id); if(el) el.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); };
  const handleArrayChange = (arr, id, field, value) => setConfig(prev => ({ ...prev, [arr]: (prev[arr]||[]).map(i => i.id === id ? { ...i, [field]: value } : i) }));
  
  const handleSaveConfig = async () => {
    alert('⏳ กำลังบันทึกการตั้งค่าขึ้น Google Sheet...');
    try {
      await fetch(GAS_URL, { method: "POST", body: JSON.stringify({ action: "saveConfig", data: config }) });
      localStorage.setItem('eventPlatformConfigV6', JSON.stringify(config));
      alert('✅ บันทึกการตั้งค่าลงระบบ Google Sheet เรียบร้อยแล้ว!');
    } catch (error) { alert('❌ เกิดข้อผิดพลาดในการบันทึกข้อมูล'); }
  };

  const addSpeaker = () => setConfig(prev => ({ ...prev, speakers: [...(prev.speakers || []), { id: Date.now(), name: "รอการประกาศชื่อ", role: "ตำแหน่ง / บริษัท", tag: "NEW", color: "#C5A059", img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png", desc: "ข้อมูลประวัติและหัวข้อการบรรยายของวิทยากรท่านนี้ จะได้รับการอัปเดตให้ทราบเร็วๆ นี้" }] }));
  const addSchedule = () => setConfig(prev => ({ ...prev, schedule: [...(prev.schedule || []), { id: Date.now(), time: "00:00", title: "กิจกรรม", desc: "รายละเอียด", tag: "INFO", color: "#10B981" }] }));
  const addSponsor = () => setConfig(prev => ({ ...prev, sponsors: [...(prev.sponsors || []), { id: Date.now(), name: "แบรนด์" }] }));
  const addFaq = () => setConfig(prev => ({ ...prev, faqs: [...(prev.faqs || []), { id: Date.now(), q: "คำถาม?", a: "คำตอบ" }] }));
  const addTicket = () => setConfig(prev => ({ ...prev, tickets: [...(prev.tickets || []), { id: Date.now(), name: "ชื่อบัตร", price: 1000, type: "regular", badge: "NEW", features: "Benefit 1" }] }));
  const removeArrayItem = (arr, id) => setConfig(prev => ({ ...prev, [arr]: (prev[arr]||[]).filter(i => i.id !== id) }));
  
  const handleImageUpload = (e, arr, id) => { 
    const file = e.target.files[0]; 
    if (!file) return; 

    if (file.size > 5 * 1024 * 1024) { 
      alert("⚠️ ขนาดรูปภาพใหญ่เกิน 5MB กรุณาเลือกรูปที่เล็กกว่านี้"); 
      return; 
    }
    
    setIsSubmitting(true);
    const reader = new FileReader(); 
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400; 
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);

        setConfig(prev => {
          const newConfig = { ...prev, [arr]: (prev[arr]||[]).map(i => i.id === id ? { ...i, img: compressedBase64 } : i) };
          localStorage.setItem('eventPlatformConfigV6', JSON.stringify(newConfig));
          return newConfig;
        });
        
        setIsSubmitting(false);
        alert("✅ อัปโหลดและเปลี่ยนรูปวิทยากรสำเร็จ! (ระบบได้ย่อขนาดอัตโนมัติ)");
      };
      img.src = reader.result;
    }; 
    reader.readAsDataURL(file); 
  };

  const startEditUser = (user) => { setEditingUserId(user.id); setEditUserForm(user); };
  const saveUserEdit = async () => { 
    setRegistrations(prev => prev.map(r => r.id === editingUserId ? editUserForm : r)); 
    setEditingUserId(null); 
    try { await fetch(GAS_URL, { method: "POST", body: JSON.stringify({ action: "updateUser", data: editUserForm }) }); } catch (e) {}
  };
  const deleteUser = async (id) => { 
    if(window.confirm('ลบข้อมูลถาวร?')) {
      setRegistrations(prev => prev.filter(r => r.id !== id)); 
      try { await fetch(GAS_URL, { method: "POST", body: JSON.stringify({ action: "deleteUser", id: id }) }); } catch (e) {}
    }
  };

  const safeRegistrations = Array.isArray(registrations) ? registrations : [];
  const totalRevenueNum = safeRegistrations.reduce((sum, r) => sum + (Number(r.totalPaid) || 0), 0);
  const totalAttendeesNum = safeRegistrations.length;
  const avgOrderValue = totalAttendeesNum > 0 ? Math.round(totalRevenueNum / totalAttendeesNum) : 0;
  const ticketStats = (config?.tickets || []).map(t => {
    const count = safeRegistrations.filter(r => String(r.ticketId) === String(t.id) || (r.ticketName && r.ticketName.toLowerCase().includes(t.name.toLowerCase()))).length;
    const percent = totalAttendeesNum ? Math.round((count / totalAttendeesNum) * 100) : 0;
    return { ...t, count, percent };
  });
  const topTicket = [...ticketStats].sort((a,b) => b.count - a.count)[0];

  // ==========================================
  // VIEW RENDER: CUSTOMER
  // ==========================================
  if (currentView === 'customer') {
    return (
      <>
        <div className={`transition-colors duration-500 min-h-screen antialiased ${darkMode ? 'dark bg-[#0A0D14] text-gray-200' : 'bg-[#FDFBF7] text-gray-800'}`}>
          
          <style dangerouslySetInnerHTML={{__html: `
            html { scroll-behavior: smooth; }
            .font-serif { font-family: 'Playfair Display', serif; }
            .font-sans { font-family: 'Kanit', sans-serif; }
            
            /* Parallax Background */
            @keyframes panBackground { 0% { background-position: 0% 0%; } 100% { background-position: 100% 100%; } }
            .thai-pattern-bg {
              position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 0; pointer-events: none; transition: all 0.5s ease;
              background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000' stroke-width='1'%3E%3Cpath d='M30 5L55 30L30 55L5 30Z M30 15L45 30L30 45L15 30Z M30 0V60 M0 30H60'/%3E%3C/g%3E%3C/svg%3E");
              background-repeat: repeat; background-size: 90px; opacity: 0.03;
              animation: panBackground 90s linear infinite;
            }
            .dark .thai-pattern-bg { opacity: 0.08; filter: invert(65%) sepia(100%) saturate(500%) hue-rotate(350deg) brightness(1.2); mix-blend-mode: screen; }

            /* Glow & Float Effects */
            @keyframes glowPulse { 0% { box-shadow: 0 0 0 2px ${config.primaryColor}, 0 15px 30px -5px rgba(197, 160, 89, 0.2); } 100% { box-shadow: 0 0 0 2px ${config.primaryColor}, 0 20px 45px 10px rgba(197, 160, 89, 0.5); } }
            .ticket-radio:checked + div { border-color: ${config.primaryColor} !important; animation: glowPulse 2s infinite alternate ease-in-out !important; transform: translateY(-10px) scale(1.02) !important; z-index: 20; }
            
            @keyframes floatBadge { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-6px); filter: brightness(1.1); } }
            .badge-float { animation: floatBadge 3s ease-in-out infinite; }

            .premium-card { transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease; }
            .premium-card:hover { transform: translateY(-10px); box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.15); }
            .dark .premium-card:hover { box-shadow: 0 30px 60px -12px rgba(197, 160, 89, 0.2); border-color: rgba(197, 160, 89, 0.4); }

            .premium-card ul li svg { transition: transform 0.3s ease, color 0.3s ease; }
            .premium-card:hover ul li svg { transform: translateX(4px) scale(1.15); color: ${config.primaryColor}; }

            /* VIP Shimmer & Reveal Animation */
            @keyframes shimmerSweep { 0% { transform: translateX(-150%) skewX(-45deg); } 100% { transform: translateX(250%) skewX(-45deg); } }
            .vip-shimmer { position: absolute; top: 0; left: 0; width: 60%; height: 100%; background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%); animation: shimmerSweep 3.5s infinite cubic-bezier(0.4, 0, 0.2, 1); pointer-events: none; }

            .reveal { opacity: 0; transform: translateY(50px); transition: all 0.9s cubic-bezier(0.25, 1, 0.5, 1); }
            .reveal.is-visible { opacity: 1; transform: translateY(0); }
            
            /* Marquees & Utils */
            .marquee-container { display: flex; width: 200%; animation: marquee-slide 25s linear infinite; }
            .sponsor-track { display: flex; width: max-content; animation: sponsor-marquee-slide 35s linear infinite; }
            @keyframes marquee-slide { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            @keyframes sponsor-marquee-slide { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

            .faq-answer { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
            .faq-answer > div { overflow: hidden; }
            .faq-item.active .faq-answer { grid-template-rows: 1fr; margin-top: 1rem; }
            .faq-item.active .faq-icon { transform: rotate(180deg); color: ${config.primaryColor}; }
            
            @keyframes spin-custom { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            @keyframes pulse-custom { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

            /* Glassmorphism & Admin UI */
            .admin-glass { background: rgba(17, 24, 39, 0.6); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.05); transition: all 0.3s ease; }
            .admin-glass:hover { border-color: rgba(197, 160, 89, 0.3); transform: translateY(-3px); box-shadow: 0 15px 30px -5px rgba(0,0,0,0.5), 0 0 20px rgba(197,160,89,0.1); }
            .admin-table-row { transition: all 0.2s ease; border-left: 2px solid transparent; }
            .admin-table-row:hover { background: rgba(255,255,255,0.03); border-left: 2px solid #F97316; transform: scale(1.01); }
            .stagger-enter { animation: fadeInUp 0.5s ease-out forwards; opacity: 0; }
            @keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
            .glow-text { text-shadow: 0 0 10px rgba(197,160,89,0.5); }
          `}} />

          {isSubmitting && (
            <div className="fixed inset-0 bg-white/90 dark:bg-[#0A0D14]/90 backdrop-blur-md z-[9999] flex flex-col items-center justify-center">
              <svg className="animate-spin h-16 w-16 text-[#C5A059] mb-6 drop-shadow-[0_0_15px_rgba(197,160,89,0.5)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <h2 className="text-xl font-bold font-serif text-gray-900 dark:text-white uppercase tracking-widest animate-pulse">
                {currentView === 'admin' ? 'Uploading Image...' : 'Processing Booking...'}
              </h2>
              <p className="text-sm text-gray-500 mt-2 font-sans">
                {currentView === 'admin' ? 'ระบบกำลังประมวลผลรูปภาพและบันทึกข้อมูล' : 'โปรดรอสักครู่ ระบบกำลังสำรองที่นั่งให้คุณ'}
              </p>
            </div>
          )}

          <div className="thai-pattern-bg"></div>

          {/* Navbar */}
          <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-[#0A0D14]/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm py-2' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16 md:h-20">
                <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollTo('home')}>
                  <div className="w-1.5 h-6 bg-[#C5A059] rounded-full group-hover:h-8 transition-all duration-300 shadow-[0_0_12px_#C5A059]"></div>
                  <span className="text-heading font-bold text-xl tracking-tight text-gray-900 dark:text-white leading-none flex flex-col">
                    {config?.title?.split(' ')?.[0] || 'THAI'} {config?.title?.split(' ')?.[1] || 'CRAFT'}
                    <span className="text-[9px] tracking-[0.25em] font-sans text-[#C5A059] font-bold uppercase mt-1">Design Symposium</span>
                  </span>
                </div>
                
                <div className="hidden lg:flex space-x-10 text-sm font-medium text-gray-500 dark:text-gray-400 relative z-10">
                  <a href="#about" onClick={(e)=>{e.preventDefault(); scrollTo('home');}} className="hover:text-[#C5A059] transition flex items-center gap-1">หน้าแรก</a>
                  <a href="#concept" onClick={(e)=>{e.preventDefault(); scrollTo('concept');}} className="hover:text-[#C5A059] transition flex items-center gap-1">แนวคิด</a>
                  <a href="#speakers" onClick={(e)=>{e.preventDefault(); scrollTo('speakers');}} className="hover:text-[#C5A059] transition flex items-center gap-1">วิทยากร</a>
                  <a href="#schedule" onClick={(e)=>{e.preventDefault(); scrollTo('schedule');}} className="hover:text-[#C5A059] transition flex items-center gap-1">กำหนดการ</a>
                </div>
                
                <div className="flex items-center gap-3 md:gap-4 relative z-10">
                
                  <a href="#register" onClick={(e)=>{e.preventDefault(); scrollTo('register');}} className="bg-[#C5A059] text-white px-5 md:px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 rounded-full shadow-[0_8px_20px_-4px_rgba(197,160,89,0.4)] hidden sm:flex items-center gap-2 hover:scale-105">
                    ลงทะเบียน <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </a>
                  <button className="lg:hidden p-2 text-gray-900 dark:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-[100] bg-white/95 dark:bg-[#0A0D14]/95 backdrop-blur-xl flex flex-col justify-center items-center gap-8 text-2xl font-serif font-bold text-gray-900 dark:text-white">
              <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 p-2 text-gray-500 hover:text-[#C5A059]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              <a href="#about" onClick={(e)=>{e.preventDefault(); scrollTo('home'); setIsMobileMenuOpen(false);}}>หน้าแรก</a>
              <a href="#concept" onClick={(e)=>{e.preventDefault(); scrollTo('concept'); setIsMobileMenuOpen(false);}}>แนวคิด</a>
              <a href="#speakers" onClick={(e)=>{e.preventDefault(); scrollTo('speakers'); setIsMobileMenuOpen(false);}}>วิทยากร</a>
              <a href="#schedule" onClick={(e)=>{e.preventDefault(); scrollTo('schedule'); setIsMobileMenuOpen(false);}}>กำหนดการ</a>
              <a href="#register" onClick={(e)=>{e.preventDefault(); scrollTo('register'); setIsMobileMenuOpen(false);}} className="bg-[#C5A059] text-white px-8 py-3 rounded-full text-lg mt-4 font-sans shadow-[0_8px_20px_-4px_rgba(197,160,89,0.4)]">ลงทะเบียนทันที</a>
            </div>
          )}

          {/* Hero Section */}
          <section id="home" className="pt-32 md:pt-40 pb-20 px-4 max-w-7xl mx-auto relative z-10 overflow-hidden md:overflow-visible">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="lg:col-span-7 mt-8 md:mt-0 reveal delay-1">
                <div className="inline-flex items-center gap-2 bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] text-[9px] md:text-[10px] font-bold tracking-widest uppercase mb-6 md:mb-8 px-4 py-2 rounded-full backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-ping absolute"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] relative"></span>
                  Architecture & Design Symposium
                </div>
                
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-[1.15] md:leading-[1.1] mb-6">
                  {config?.title?.split(' ')?.[0] || 'THAI'} <br className="hidden md:block"/>{config?.title?.split(' ')?.[1] || 'CRAFT'}<br/>
                  <span className="font-sans text-2xl sm:text-3xl md:text-5xl text-[#C5A059] font-semibold inline-block mt-2">{config.subtitle}</span><br/>
                </h1>
                
                <p className="text-gray-500 dark:text-gray-400 mb-8 md:mb-10 max-w-xl leading-relaxed text-sm md:text-base font-light">{config.aboutText}</p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <a href="#register" onClick={(e)=>{e.preventDefault(); scrollTo('register');}} className="w-full sm:w-auto bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-full hover:scale-105 shadow-xl flex items-center justify-center gap-3 group">
                    สำรองที่นั่ง <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </a>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium flex items-center gap-3">
                    <div className="w-10 h-10 sm:hidden rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                    <div>
                      <span className="block text-gray-900 dark:text-white font-bold text-base md:text-lg">{config.date}</span>
                      {config.location}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 w-full mt-10 lg:mt-0 reveal delay-2">
                <div className="w-full h-[350px] md:h-[550px] shadow-2xl border-[6px] border-white dark:border-[#111827] rounded-[1.5rem] relative overflow-hidden group">
                  <img src={config.heroBg} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Hero"/>
                  <div className="absolute bottom-4 left-4 right-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg p-4 rounded-2xl shadow-xl transform translate-y-2 group-hover:translate-y-0 transition duration-500 border border-white/50 dark:border-gray-700/50">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="flex h-2.5 w-2.5 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span></span>
                      <div className="text-gray-900 dark:text-white text-[9px] font-bold uppercase tracking-widest">Event Update</div>
                    </div>
                    <div className="text-[#C5A059] text-xs md:text-sm font-bold leading-tight font-sans">นิทรรศการสถาปัตยกรรมไทยประยุกต์</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Marquee */}
          <div className="w-full overflow-hidden bg-[#0A0D14] py-3 border-y border-gray-800 relative z-10 pointer-events-none">
            <div className="marquee-container text-white text-[9px] md:text-[10px] font-bold tracking-widest uppercase opacity-80">
              <div className="flex justify-around items-center w-max md:w-1/2 shrink-0 pr-8">
                <span className="text-[#C5A059] flex items-center gap-2 shrink-0">🔥 Tickets Selling Fast</span>
                <span className="text-gray-700 mx-4 md:mx-6 shrink-0">•</span><span className="shrink-0">{config.title}</span><span className="text-gray-700 mx-4 md:mx-6 shrink-0">•</span>
                <span className="text-[#10B981] shrink-0">Limited Seats Available</span><span className="text-gray-700 mx-4 md:mx-6 shrink-0">•</span>
                <span className="shrink-0">{config.location}</span><span className="text-gray-700 mx-4 md:mx-6 shrink-0">•</span>
              </div>
              <div className="flex justify-around items-center w-max md:w-1/2 shrink-0 pr-8">
                <span className="text-[#C5A059] flex items-center gap-2 shrink-0">🔥 Tickets Selling Fast</span>
                <span className="text-gray-700 mx-4 md:mx-6 shrink-0">•</span><span className="shrink-0">{config.title}</span><span className="text-gray-700 mx-4 md:mx-6 shrink-0">•</span>
                <span className="text-[#10B981] shrink-0">Limited Seats Available</span><span className="text-gray-700 mx-4 md:mx-6 shrink-0">•</span>
                <span className="shrink-0">{config.location}</span><span className="text-gray-700 mx-4 md:mx-6 shrink-0">•</span>
              </div>
            </div>
          </div>

          {/* Concept Section */}
          <section id="concept" className="py-16 md:py-24 bg-white dark:bg-gray-950 relative z-10 border-b border-gray-100 dark:border-gray-900">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-[#C5A059]/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
              <div className="text-center mb-16 md:mb-20 reveal">
                <div className="text-[#C5A059] text-[10px] font-bold tracking-widest uppercase mb-4">Core Pillars</div>
                <h2 className="font-serif text-3xl md:text-5xl text-gray-900 dark:text-white mb-6">Thai Architectural Design</h2>
                <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-6 rounded-full"></div>
                <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-light px-2">
                    ร่วมเจาะลึก 4 แกนหลักที่จะพลิกโฉมวงการสถาปัตยกรรมและการออกแบบของไทย สู่การสร้างสรรค์ผลงานที่เป็นที่ยอมรับในระดับสากล
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 reveal delay-1">
                <div className="bg-[#FDFBF7] dark:bg-[#111827] p-6 md:p-8 rounded-3xl premium-card text-center border border-transparent dark:border-gray-800">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white dark:bg-gray-800 text-[#C5A059] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-xl md:text-2xl shadow-sm border border-gray-100 dark:border-gray-700">🏯</div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg mb-2 md:mb-3">สถาปัตยกรรมไทยประยุกต์</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-light">เรียนรู้การผสานภูมิปัญญาช่างไทยโบราณเข้ากับโครงสร้างและฟังก์ชันการใช้งานของอาคารสมัยใหม่</p>
                </div>
                <div className="bg-[#FDFBF7] dark:bg-[#111827] p-6 md:p-8 rounded-3xl premium-card text-center border border-transparent dark:border-gray-800">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white dark:bg-gray-800 text-[#3B82F6] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-xl md:text-2xl shadow-sm border border-gray-100 dark:border-gray-700">🧱</div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg mb-2 md:mb-3">นวัตกรรมวัสดุท้องถิ่น</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-light">เจาะลึกการนำวัสดุพื้นบ้านอย่าง ไม้ ไผ่ หวาย และดินเผา มายกระดับด้วยเทคโนโลยีเพื่อสร้างมูลค่าเพิ่ม</p>
                </div>
                <div className="bg-[#FDFBF7] dark:bg-[#111827] p-6 md:p-8 rounded-3xl premium-card text-center border border-transparent dark:border-gray-800">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white dark:bg-gray-800 text-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-xl md:text-2xl shadow-sm border border-gray-100 dark:border-gray-700">🌱</div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg mb-2 md:mb-3">นิเวศสถาปัตย์วิถีไทย</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-light">ทำความเข้าใจการออกแบบที่สอดคล้องกับสภาพภูมิอากาศเขตร้อนชื้น และบริบททางวัฒนธรรมอย่างยั่งยืน</p>
                </div>
                <div className="bg-[#FDFBF7] dark:bg-[#111827] p-6 md:p-8 rounded-3xl premium-card text-center border border-transparent dark:border-gray-800">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white dark:bg-gray-800 text-[#EC4899] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-xl md:text-2xl shadow-sm border border-gray-100 dark:border-gray-700">🤝</div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg mb-2 md:mb-3">เครือข่ายนักสร้างสรรค์</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-light">พบปะสถาปนิก นักออกแบบ และช่างฝีมือระดับแนวหน้าของประเทศเพื่อแลกเปลี่ยนแนวคิดและต่อยอดความร่วมมือ</p>
                </div>
              </div>
            </div>
          </section>

          {/* Speakers Section */}
          <section id="speakers" className="py-16 md:py-24 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-4 md:gap-6 border-b border-gray-100 dark:border-gray-800 pb-6 reveal">
                <div>
                  <div className="text-[#C5A059] text-[10px] font-bold tracking-widest uppercase mb-3">The Visionaries</div>
                  <h2 className="font-serif text-3xl md:text-5xl text-gray-900 dark:text-white">Keynote Speakers</h2>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-light mb-2 hidden md:block">* คลิกที่รูปเพื่อดูรายละเอียดเพิ่มเติม</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 reveal delay-1">
                {config.speakers?.map((speaker, i) => (
                  <div key={speaker.id} className="group cursor-pointer premium-card bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-3 rounded-[2rem] shadow-sm" onClick={() => setSelectedSpeaker(speaker)}>
                    <div className="h-64 md:h-72 overflow-hidden rounded-[1.5rem] mb-4 relative bg-gray-100 dark:bg-gray-800">
                      <img src={speaker.img} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition duration-700" alt={speaker.name}/>
                      <div className="absolute top-4 left-4 text-white text-[9px] font-bold px-3 py-1.5 tracking-widest uppercase rounded-full border border-transparent dark:border-gray-700" style={{backgroundColor: speaker.color}}>{speaker.tag}</div>
                    </div>
                    <div className="px-2 pb-2 mt-2">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 font-serif group-hover:text-[#C5A059] dark:group-hover:text-[#C5A059] transition-colors">{speaker.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-light truncate">{speaker.role}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-10 block md:hidden text-xs text-gray-400 font-light">* แตะที่รูปเพื่อดูรายละเอียดเพิ่มเติม</div>
            </div>
          </section>

          {/* Schedule */}
          <section id="schedule" className="py-16 md:py-24 bg-[#FDFBF7] dark:bg-[#0A0D14] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#C5A059]/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="max-w-4xl mx-auto px-4 relative z-10">
              <div className="text-center mb-16 md:mb-20 reveal">
                <div className="text-[#C5A059] text-[10px] font-bold tracking-widest uppercase mb-4">Event Agenda</div>
                <h2 className="font-serif text-3xl md:text-5xl text-gray-900 dark:text-white mb-6">กำหนดการกิจกรรม</h2>
                <div className="w-16 h-1 bg-[#C5A059] mx-auto rounded-full"></div>
              </div>

              <div className="relative border-l-2 border-dashed border-gray-200 dark:border-gray-800 ml-4 md:ml-6 space-y-12 md:space-y-16 pb-8 reveal delay-1">
                {config.schedule?.map((s) => (
                  <div key={s.id} className="relative pl-8 md:pl-16 group">
                    <div className="absolute -left-[11px] md:-left-[11px] top-8 md:top-10 w-[20px] h-[20px] rounded-full border-4 border-[#FDFBF7] dark:border-[#0A0D14] transition-all duration-300 group-hover:scale-125 z-10" style={{backgroundColor: s.color, boxShadow: `0 0 15px ${s.color}80`}}></div>
                    <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-[2rem] p-6 md:p-8 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start">
                      <div className="md:w-40 shrink-0 border-l-4 pl-4" style={{borderColor: s.color}}>
                        <div className="font-black text-3xl md:text-4xl tracking-tight" style={{color: s.color}}>{s.time}</div>
                        <div className="text-[10px] md:text-[11px] text-gray-400 mt-1 uppercase tracking-wider font-medium">Session</div>
                      </div>
                      <div className="flex-grow">
                        <div className="inline-block text-[9px] font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full border" style={{color: s.color, backgroundColor: `${s.color}15`, borderColor: `${s.color}30`}}>{s.tag}</div>
                        <h4 className="text-gray-900 dark:text-white font-bold text-xl md:text-2xl mb-2 md:mb-3 font-serif group-hover:opacity-80 transition-opacity">{s.title}</h4>
                        <p className="text-sm md:text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed font-light mb-4">{s.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Sponsor Marquee */}
          <div className="w-full overflow-hidden bg-white dark:bg-[#0A0D14] py-8 md:py-10 border-y border-gray-100 dark:border-gray-900 mt-8 md:mt-0 z-10 relative">
            <div className="max-w-7xl mx-auto px-4 text-center mb-6 md:mb-8">
              <div className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest">ผู้สนับสนุนหลักอย่างเป็นทางการ</div>
            </div>
            <div className="w-full overflow-hidden">
              <div className="sponsor-track text-lg md:text-3xl font-bold font-serif text-gray-300 dark:text-gray-700">
                <div className="flex items-center justify-around shrink-0 px-4">
                  {config.sponsors?.map(s => <React.Fragment key={s.id}><span className="mx-4 md:mx-6 hover:text-[#C5A059] transition-colors cursor-pointer">{s.name}</span><span className="text-[#C5A059] text-sm md:text-lg mx-4 md:mx-6">•</span></React.Fragment>)}
                </div>
                <div className="flex items-center justify-around shrink-0 px-4">
                  {config.sponsors?.map(s => <React.Fragment key={s.id+'dup'}><span className="mx-4 md:mx-6 hover:text-[#C5A059] transition-colors cursor-pointer">{s.name}</span><span className="text-[#C5A059] text-sm md:text-lg mx-4 md:mx-6">•</span></React.Fragment>)}
                </div>
              </div>
            </div>
          </div>

          {/* Form Registration Section */}
          <section id="register" className="py-16 md:py-24 bg-[#FDFBF7] dark:bg-[#0A0D14] relative z-10 border-t border-gray-100 dark:border-gray-900">
            <div className="max-w-5xl mx-auto px-4">
              <div className="text-center mb-12 reveal">
                <div className="inline-block bg-[#C5A059]/10 text-[#C5A059] text-[10px] font-bold tracking-widest uppercase mb-4 px-3 py-1 rounded-full border border-[#C5A059]/20">Participation Passes</div>
                <h2 className="font-serif text-3xl md:text-5xl text-gray-900 dark:text-white mb-6">แบบฟอร์มลงทะเบียนออนไลน์</h2>
                <div className="w-16 h-1 bg-[#C5A059] mx-auto rounded-full"></div>
              </div>

              {/* Ticket Cards Dynamic Mapping */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto reveal delay-1 pt-4">
                {config.tickets?.map((ticket) => {
                  const isVIP = ticket.type === 'vip';
                  const isSelected = String(formData.ticketId) === String(ticket.id);
                  
                  return (
                    <label key={ticket.id} className="cursor-pointer relative group block mt-4 md:mt-0">
                      <input type="radio" name="ticketId" value={ticket.id} checked={isSelected} onChange={(e) => setFormData(prev => ({...prev, ticketId: e.target.value}))} className="ticket-radio peer sr-only" />
                      <div className={`p-6 md:p-8 rounded-[2rem] flex flex-col h-full transition-all premium-card relative ${isVIP ? 'bg-gray-900 dark:bg-black border border-[#C5A059]/40 shadow-[0_10px_40px_-10px_rgba(197,160,89,0.15)]' : 'bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] dark:shadow-none'}`}>
                        
                        {isVIP && <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none"><div className="vip-shimmer"></div></div>}

                        {ticket.badge && (
                          <div className={`badge-float absolute -top-3 left-1/2 transform -translate-x-1/2 text-white text-[9px] md:text-[10px] font-black px-4 md:px-6 py-1.5 rounded-full whitespace-nowrap tracking-widest uppercase shadow-lg z-20 ${isVIP ? 'bg-gradient-to-r from-[#D4AF37] to-[#b08a47] shadow-[#C5A059]/40 border border-[#D4AF37]' : 'bg-[#C5A059] shadow-[#C5A059]/30 border border-[#b08a47]'}`}>
                            {ticket.badge}
                          </div>
                        )}
                        
                        <div className="flex justify-between items-start mb-4 mt-2 relative z-10">
                          <h3 className={`text-xl font-bold font-serif transition-colors ${isVIP ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{ticket.name}</h3>
                          <div className="w-5 h-5 rounded-full bg-[#C5A059] text-white hidden peer-checked:flex items-center justify-center shadow-lg shadow-[#C5A059]/40">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                          </div>
                        </div>
                        
                        <div className="text-3xl md:text-4xl font-black text-[#C5A059] mb-6 flex items-baseline gap-2 relative z-10">
                          {Number(ticket.price).toLocaleString()} <span className="text-sm font-medium text-gray-400">บาท</span>
                        </div>
                        
                        <ul className={`text-xs md:text-sm space-y-3 mb-8 flex-grow font-light transition-colors relative z-10 ${isVIP ? 'text-amber-100' : 'text-gray-600 dark:text-gray-400'}`}>
                          {(ticket.features || '').split('\n').map((f, i) => (
                            <li key={i} className={`flex gap-3 items-start ${isVIP && i > 0 ? 'text-amber-200' : ''}`}>
                              <svg className={`w-4 h-4 shrink-0 mt-0.5 ${isVIP && i > 0 ? 'text-[#C5A059]' : (isVIP ? 'text-[#C5A059]' : 'text-gray-400 dark:text-gray-500')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className={`py-3 text-[10px] font-bold uppercase tracking-wider rounded-full text-center w-full transition-all relative z-10 ${isSelected ? (isVIP ? 'bg-gradient-to-r from-[#C5A059] to-[#a68444] text-white shadow-lg shadow-[#C5A059]/30 border-none' : 'bg-[#C5A059] text-white border-none') : (isVIP ? 'bg-gradient-to-r from-[#C5A059]/20 to-[#a68444]/20 text-[#C5A059] border border-[#C5A059]/30 group-hover:from-[#C5A059] group-hover:to-[#a68444] group-hover:text-white' : 'bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 group-hover:bg-[#C5A059] group-hover:text-white')}`}>
                          {isSelected ? '✓ เลือกแล้ว' : `เลือก ${ticket.name}`}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>

              <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-6 md:p-12 shadow-2xl relative rounded-[2rem] md:rounded-[2.5rem] premium-card reveal delay-2">
                <form onSubmit={handleRegisterSubmit} className="space-y-8">
                  
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3 border-b border-gray-100 dark:border-gray-800 pb-3 font-serif">
                      <span className="w-6 h-6 rounded-full bg-[#C5A059] text-white flex items-center justify-center text-xs font-sans">1</span> ข้อมูลส่วนตัว
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-[#0A0D14] p-2 rounded-xl border border-transparent focus-within:border-[#C5A059] transition-all">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase px-3 pt-1">ชื่อ-นามสกุล *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-transparent px-3 py-2 text-sm focus:outline-none dark:text-white" placeholder="สมชาย ใจดี"/>
                      </div>
                      <div className="bg-gray-50 dark:bg-[#0A0D14] p-2 rounded-xl border border-transparent focus-within:border-[#C5A059] transition-all">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase px-3 pt-1">อีเมล *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-transparent px-3 py-2 text-sm focus:outline-none dark:text-white" placeholder="email@example.com"/>
                      </div>
                      <div className="bg-gray-50 dark:bg-[#0A0D14] p-2 rounded-xl border border-transparent focus-within:border-[#C5A059] transition-all md:col-span-2">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase px-3 pt-1">เบอร์โทรศัพท์ *</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full bg-transparent px-3 py-2 text-sm focus:outline-none dark:text-white" placeholder="XXX-XXX-XXXX"/>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3 border-b border-gray-100 dark:border-gray-800 pb-3 font-serif mt-8">
                      <span className="w-6 h-6 rounded-full bg-[#1E293B] text-white flex items-center justify-center text-xs font-sans">2</span> ข้อมูลองค์กร
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-[#0A0D14] p-2 rounded-xl border border-transparent focus-within:border-[#1E293B] dark:focus-within:border-gray-600 transition-all relative">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase px-3 pt-1">ตำแหน่ง / อาชีพ *</label>
                        <select name="role" value={formData.role} onChange={handleInputChange} required className="w-full bg-transparent px-3 py-2 text-sm focus:outline-none dark:text-white appearance-none cursor-pointer">
                          <option value="" disabled>-- เลือก --</option>
                          <option value="สถาปนิก">สถาปนิก (Architect)</option>
                          <option value="มัณฑนากร">มัณฑนากร (Interior Designer)</option>
                          <option value="นักออกแบบ">นักออกแบบ (Designer)</option>
                          <option value="ช่างฝีมือ">ช่างฝีมือ (Craftsman)</option>
                          <option value="นิสิตนักศึกษา">นิสิตนักศึกษา (Student)</option>
                          <option value="other">อื่นๆ (โปรดระบุ)</option>
                        </select>
                        <div className="pointer-events-none absolute top-8 right-4 flex items-center text-gray-400"><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></div>
                        {formData.role === 'other' && <input type="text" name="roleOther" value={formData.roleOther} onChange={handleInputChange} placeholder="โปรดระบุตำแหน่ง/อาชีพ" required className="w-full bg-transparent px-3 py-2 text-sm mt-2 border-t border-gray-200 dark:border-gray-700 focus:outline-none dark:text-white" />}
                      </div>

                      <div className="bg-gray-50 dark:bg-[#0A0D14] p-2 rounded-xl border border-transparent focus-within:border-[#1E293B] dark:focus-within:border-gray-600 transition-all relative">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase px-3 pt-1">องค์กร / สตูดิโอ *</label>
                        <select name="company" value={formData.company} onChange={handleInputChange} required className="w-full bg-transparent px-3 py-2 text-sm focus:outline-none dark:text-white appearance-none cursor-pointer">
                          <option value="" disabled>-- เลือก --</option>
                          <option value="สตูดิโอออกแบบ">สตูดิโอออกแบบ / บริษัทสถาปนิก</option>
                          <option value="องค์กรธุรกิจ">องค์กรธุรกิจ / บริษัทพัฒนาอสังหาฯ</option>
                          <option value="สถาบันการศึกษา">สถาบันการศึกษา</option>
                          <option value="ธุรกิจส่วนตัว / ฟรีแลนซ์">ธุรกิจส่วนตัว / ฟรีแลนซ์</option>
                          <option value="other">อื่นๆ (โปรดระบุ)</option>
                        </select>
                        <div className="pointer-events-none absolute top-8 right-4 flex items-center text-gray-400"><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></div>
                        {formData.company === 'other' && <input type="text" name="companyOther" value={formData.companyOther} onChange={handleInputChange} placeholder="โปรดระบุชื่อองค์กร" required className="w-full bg-transparent px-3 py-2 text-sm mt-2 border-t border-gray-200 dark:border-gray-700 focus:outline-none dark:text-white" />}
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#C5A059]/10 border-2 border-[#C5A059]/30 p-6 md:p-8 rounded-3xl mt-10 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
                    <div className="absolute left-0 top-0 w-2 h-full bg-[#C5A059]"></div>
                    <div className="text-center md:text-left w-full md:w-auto">
                      <div className="text-xs text-[#C5A059] font-bold uppercase tracking-widest mb-3">{selectedTicket.name} (1 ท่าน)</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Subtotal: {subtotal.toLocaleString()} ฿ | VAT 7%: {vat.toLocaleString()} ฿</div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
                      <div className="text-center md:text-right">
                        <div className="text-[10px] text-gray-500 uppercase font-bold">NET TOTAL</div>
                        <div className="text-3xl font-bold font-serif text-gray-900 dark:text-white">{total.toLocaleString()} <span className="text-sm font-sans text-gray-400">฿</span></div>
                      </div>
                      <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-gray-900 dark:bg-white hover:bg-gray-800 text-white dark:text-gray-900 px-8 py-4 text-[11px] font-bold rounded-full uppercase tracking-widest transition-transform hover:scale-105 shadow-xl disabled:opacity-50">
                        PAY SECURELY
                      </button>
                    </div>
                  </div>

              </form>
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 md:py-24 border-t border-gray-100 dark:border-gray-900">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12 md:mb-16 reveal">
              <div className="inline-block bg-[#C5A059]/10 text-[#C5A059] text-[10px] font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full border border-[#C5A059]/20">Got Questions?</div>
              <h2 className="font-serif text-2xl md:text-4xl text-gray-900 dark:text-white">คำถามที่พบบ่อย (FAQ)</h2>
            </div>
            <div className="space-y-3 md:space-y-4 reveal delay-1">
              {config.faqs?.map(faq => (
                <div key={faq.id} className={`faq-item bg-[#FDFBF7] dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-2xl p-5 md:p-6 cursor-pointer hover:border-[#C5A059] dark:hover:border-[#C5A059] transition-colors ${activeFaq === faq.id ? 'active' : ''}`} onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}>
                  <div className="flex justify-between items-center font-bold text-gray-900 dark:text-white text-sm md:text-base">
                    <span className="font-medium">{faq.q}</span>
                    <svg className="w-5 h-5 text-gray-400 faq-icon transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                  <div className="faq-answer text-xs md:text-sm text-gray-500 dark:text-gray-400 font-light"><div className="pt-3">{faq.a}</div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 dark:bg-[#0A0D14] pt-16 pb-12 text-white border-t border-gray-800 relative z-10">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[#C5A059] rounded-full shadow-[0_0_8px_#C5A059]"></div>
                <span className="font-serif font-bold text-xl tracking-wide">{config.title}</span>
            </div>
            <div className="text-xs text-gray-500 font-light">© 2026 {config.title}. All rights reserved.</div>
            <button onClick={() => setCurrentView('admin')} className="text-[10px] font-bold text-gray-500 hover:text-[#C5A059] transition-colors uppercase tracking-widest">
              Admin Access
            </button>
          </div>
        </footer>

        {/* Modal Speaker */}
        {selectedSpeaker && (
          <div className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedSpeaker(null)}>
            <div className="bg-white dark:bg-[#111827] max-w-2xl w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row transform transition-transform duration-300 border border-gray-100 dark:border-gray-800" onClick={e => e.stopPropagation()}>
              <div className="h-48 md:h-auto md:w-2/5 relative p-3">
                <div className="w-full h-full relative overflow-hidden rounded-[1.5rem] bg-gray-100 dark:bg-gray-800">
                  <img src={selectedSpeaker.img} className="w-full h-full object-cover" alt="speaker" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/80"></div>
                  <div className="absolute bottom-4 left-4 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest" style={{backgroundColor: selectedSpeaker.color}}>{selectedSpeaker.tag}</div>
                </div>
              </div>
              <div className="p-6 md:p-8 md:w-3/5 relative flex flex-col">
                <button onClick={() => setSelectedSpeaker(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 dark:hover:text-white bg-gray-100 dark:bg-gray-800 rounded-full p-1 z-10"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1 md:mb-2 mt-2">{selectedSpeaker.role}</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 font-serif">{selectedSpeaker.name}</h3>
                <div className="overflow-y-auto max-h-32 md:max-h-48 pr-2 text-xs md:text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-4 md:mb-6">{selectedSpeaker.desc}</div>
                <div className="mt-auto">
                  <a href="#schedule" onClick={() => setSelectedSpeaker(null)} className="inline-flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-[#C5A059] uppercase tracking-widest hover:text-[#a68444]">ดูกำหนดการ <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Ticket Success (With QR Code) */}
        {ticketModal.isOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            <div className="flex flex-col items-center max-w-sm w-full">
              <div className="bg-[#FDFBF7] dark:bg-[#111827] w-full shadow-2xl relative p-8 md:p-10 text-center rounded-[2rem] overflow-hidden border border-gray-200 dark:border-gray-800">
                <div className="absolute top-0 left-0 w-full h-2 bg-[#C5A059]"></div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2 mt-2">{config.title.split(' ')[0]}</h2>
                <div className="text-[#C5A059] text-[9px] font-bold tracking-widest uppercase mb-6 pb-3 border-b border-gray-200 dark:border-gray-800">Official E-Ticket</div>
                
                <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center">
                  
                  {/* QR Code Section */}
                  {ticketModal.qrUrl && (
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-white p-2 rounded-xl shadow-sm border border-gray-100 mb-4 flex items-center justify-center">
                      <img src={ticketModal.qrUrl} alt="QR Code" className="w-full h-full object-contain" />
                    </div>
                  )}

                  <div className="w-full text-left">
                    <div className="text-gray-400 text-[9px] font-bold uppercase tracking-widest mb-1">Attendee</div>
                    <div className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 font-serif border-b border-gray-100 dark:border-gray-800 pb-2 break-words">{ticketModal.name}</div>
                    <div className="text-gray-400 text-[9px] font-bold uppercase tracking-widest mb-1">Ticket Type</div>
                    <div className="text-xs md:text-sm font-bold text-[#C5A059] uppercase tracking-widest">{ticketModal.tier}</div>
                  </div>

                </div>
                <p className="text-xs text-gray-500 mt-6 leading-relaxed">โปรดแคปเจอร์หน้าจอนี้ หรือใช้ E-Ticket<br/>ที่จัดส่งไปยังอีเมลเพื่อสแกนเข้างาน</p>
              </div>
              <div className="mt-6 md:mt-8 w-full">
                <button onClick={() => setTicketModal({isOpen:false})} className="w-full bg-gray-900 dark:bg-white hover:bg-gray-800 text-white dark:text-gray-900 text-[11px] font-bold py-3.5 uppercase tracking-widest transition rounded-full shadow-xl">ปิดหน้าต่าง / Close</button>
              </div>
            </div>
          </div>
        )}
        </div>
      </>
    );
  }

  // ==========================================
  // RENDER: ADMIN VIEW (DASHBOARD)
  // ==========================================
  return (
    <>
      <div className="flex flex-col md:flex-row h-screen bg-[#0A0D14] text-gray-200 font-sans overflow-hidden selection:bg-[#C5A059]/30">
        
        {/* Mobile Admin Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-[#111827] border-b border-gray-800 shadow-md z-50">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 flex items-center justify-center text-white font-bold text-sm rounded-lg bg-[#C5A059]">T</div>
             <span className="font-bold text-white uppercase tracking-wider text-xs">Event Admin</span>
           </div>
           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
           </button>
        </div>

        {/* Sidebar */}
        <aside className={`fixed md:relative z-40 w-72 h-[calc(100vh-65px)] md:h-full bg-[#111827] border-r border-gray-800 flex flex-col shadow-2xl transition-transform transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          
          <div className="hidden md:flex p-6 border-b border-gray-800 items-center gap-4 cursor-pointer hover:bg-gray-800/50 transition-colors" onClick={() => setCurrentView('customer')}>
            <div className="w-10 h-10 flex items-center justify-center text-white font-bold text-xl rounded-xl bg-[#C5A059] shadow-lg shadow-[#C5A059]/20">T</div>
            <div>
              <h1 className="font-bold text-white text-sm tracking-wide uppercase">Dashboard</h1>
              <span className="text-[9px] text-[#10B981] font-semibold flex items-center gap-1.5 mt-1 uppercase tracking-wider"><span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span> Online</span>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 px-3">Management</div>
            <button onClick={() => {setAdminTab('dashboard'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all rounded-xl ${adminTab === 'dashboard' ? 'bg-gray-800 text-white shadow-sm border-l-2 border-[#C5A059]' : 'text-gray-400 hover:bg-gray-800/50 hover:text-white border-l-2 border-transparent'}`}>
              <span className="text-lg opacity-80">📊</span> Live Analytics
            </button>
            <button onClick={() => {setAdminTab('users'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all rounded-xl ${adminTab === 'users' ? 'bg-gray-800 text-white shadow-sm border-l-2 border-[#C5A059]' : 'text-gray-400 hover:bg-gray-800/50 hover:text-white border-l-2 border-transparent'}`}>
              <span className="text-lg opacity-80">📋</span> Attendee List
            </button>
            <button onClick={() => {setAdminTab('scanner'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all rounded-xl ${adminTab === 'scanner' ? 'bg-gray-800 text-white shadow-sm border-l-2 border-[#C5A059]' : 'text-gray-400 hover:bg-gray-800/50 hover:text-white border-l-2 border-transparent'}`}>
              <span className="text-lg opacity-80">📷</span> Event Check-In
            </button>
            
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 px-3 mt-8">Configuration</div>
            <button onClick={() => {setAdminTab('settings'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all rounded-xl ${adminTab === 'settings' ? 'bg-gray-800 text-white shadow-sm border-l-2 border-[#C5A059]' : 'text-gray-400 hover:bg-gray-800/50 hover:text-white border-l-2 border-transparent'}`}>
              <span className="text-lg opacity-80">⚙️</span> Event Config
            </button>
            <button onClick={() => {setAdminTab('schedule'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all rounded-xl ${adminTab === 'schedule' ? 'bg-gray-800 text-white shadow-sm border-l-2 border-[#C5A059]' : 'text-gray-400 hover:bg-gray-800/50 hover:text-white border-l-2 border-transparent'}`}>
              <span className="text-lg opacity-80">⏱️</span> Schedule
            </button>
            <button onClick={() => {setAdminTab('speakers'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all rounded-xl ${adminTab === 'speakers' ? 'bg-gray-800 text-white shadow-sm border-l-2 border-[#C5A059]' : 'text-gray-400 hover:bg-gray-800/50 hover:text-white border-l-2 border-transparent'}`}>
              <span className="text-lg opacity-80">🏵️</span> Speakers
            </button>
            <button onClick={() => {setAdminTab('sponsors'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all rounded-xl ${adminTab === 'sponsors' ? 'bg-gray-800 text-white shadow-sm border-l-2 border-[#C5A059]' : 'text-gray-400 hover:bg-gray-800/50 hover:text-white border-l-2 border-transparent'}`}>
              <span className="text-lg opacity-80">🤝</span> Sponsors
            </button>
            <button onClick={() => {setAdminTab('tickets'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all rounded-xl ${adminTab === 'tickets' ? 'bg-gray-800 text-white shadow-sm border-l-2 border-[#C5A059]' : 'text-gray-400 hover:bg-gray-800/50 hover:text-white border-l-2 border-transparent'}`}>
              <span className="text-lg opacity-80">🎟️</span> Ticketing
            </button>
          </nav>

          <div className="p-4 border-t border-gray-800 bg-[#111827]">
            <button onClick={() => setCurrentView('customer')} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white text-[11px] font-bold uppercase tracking-wider transition-all border border-gray-700 rounded-xl">
              ← Return to Site
            </button>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isMobileMenuOpen && <div className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>}

        {/* Main Content Area (Admin Backend Upgraded) */}
        <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto relative" style={{ backgroundColor: '#0A0D14', backgroundImage: 'radial-gradient(rgba(197,160,89,0.05) 1.5px, transparent 1.5px)', backgroundSize: '35px 35px' }}>
          
          {adminTab === 'dashboard' && (
            <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 relative z-10 stagger-enter">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight uppercase glow-text">Live Analytics</h2>
                  <p className="text-[#C5A059] text-[10px] md:text-xs mt-1 uppercase tracking-wider font-bold">Real-time Event Data Insight <span className="text-gray-500 font-normal lowercase tracking-normal ml-2 bg-gray-800 px-2 py-0.5 rounded-full border border-gray-700">last sync: {lastSyncTime}</span></p>
                </div>
                <button 
  onClick={() => syncWithGoogleSheet()} 
  disabled={isSyncing} 
  className={`w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-3 border rounded-lg relative overflow-hidden group
    ${isSyncing 
      ? 'bg-[#C5A059]/10 border-[#C5A059]/40 text-[#C5A059] cursor-wait shadow-[0_0_25px_rgba(197,160,89,0.15)]' 
      : 'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white border-gray-700 hover:border-[#C5A059] shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(197,160,89,0.2)]'
    }`}
>
  {/* เอฟเฟกต์แสงกระพริบเบาๆ เป็นพื้นหลังตอนโหลด */}
  {isSyncing && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C5A059]/10 to-transparent animate-pulse"></div>}
  
  {isSyncing ? (
    /* อนิเมชันวงแหวนโหลดแบบลื่นไหล (Smooth Premium Spinner) */
    <div className="relative w-4 h-4 flex items-center justify-center">
      {/* วงแหวนจางด้านหลัง หมุนแบบช้าๆ */}
      <svg className="absolute inset-0 w-full h-full animate-[spin_2s_linear_infinite] opacity-30" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5" stroke="currentColor"></circle>
      </svg>
      {/* เส้นประด้านหน้า หมุนแบบมีจังหวะ (ease-in-out) */}
      <svg className="absolute inset-0 w-full h-full animate-[spin_1.2s_ease-in-out_infinite]" viewBox="0 0 50 50">
        <circle 
          cx="25" cy="25" r="20" 
          fill="none" 
          strokeWidth="5" 
          stroke="currentColor" 
          strokeDasharray="80 150" 
          strokeDashoffset="0" 
          strokeLinecap="round" 
          className="drop-shadow-[0_0_8px_rgba(197,160,89,0.8)]"
        ></circle>
      </svg>
    </div>
  ) : (
    /* ไอคอนรีเฟรชตอนปกติ (หมุนสมูทๆ ตอนเอาเมาส์ชี้) */
    <svg 
      className="w-4 h-4 text-gray-400 group-hover:text-[#C5A059] transition-transform duration-700 ease-in-out group-hover:rotate-180" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
    </svg>
  )}
  
  <span className="relative z-10 mt-0.5">{isSyncing ? "SYNCING..." : "FORCE SYNC"}</span>
</button>
              </div>

              {/* Bento Grid Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                <div className="admin-glass p-6 rounded-2xl relative overflow-hidden group hover:border-blue-500/50">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                  <div className="w-10 h-10 bg-blue-500/20 text-blue-400 flex items-center justify-center rounded-xl text-xl mb-4 border border-blue-500/30">👥</div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Attendees</p>
                  <div className="text-3xl lg:text-4xl font-bold text-white break-words font-mono">{registrations.length}</div>
                </div>
                <div className="admin-glass p-6 rounded-2xl relative overflow-hidden group hover:border-[#10B981]/50">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#10B981]/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                  <div className="w-10 h-10 bg-[#10B981]/20 text-[#10B981] flex items-center justify-center rounded-xl text-xl mb-4 border border-[#10B981]/30">💰</div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Net Revenue</p>
                  <div className="text-2xl lg:text-3xl font-bold text-white font-mono break-words leading-tight">฿{totalRevenueNum.toLocaleString()}</div>
                </div>
                <div className="admin-glass p-6 rounded-2xl relative overflow-hidden group hover:border-[#C5A059]/50">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A059]/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                  <div className="w-10 h-10 bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center rounded-xl text-xl mb-4 border border-[#C5A059]/30">🏆</div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Top Ticket</p>
                  <div className="text-lg lg:text-xl font-bold text-white mt-1 uppercase break-words leading-tight">{topTicket?.name || '-'}</div>
                </div>
                <div className="admin-glass p-6 rounded-2xl relative overflow-hidden group hover:border-pink-500/50">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                  <div className="w-10 h-10 bg-pink-500/20 text-pink-400 flex items-center justify-center rounded-xl text-xl mb-4 border border-pink-500/30">📊</div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Avg. Ticket Value</p>
                  <div className="text-2xl lg:text-3xl font-bold text-white font-mono break-words leading-tight">฿{avgOrderValue.toLocaleString()}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="lg:col-span-1 admin-glass p-6 md:p-8 rounded-2xl">
                  <h3 className="text-sm md:text-base font-bold text-white mb-6 uppercase tracking-wide">Ticket Allocation</h3>
                  <div className="space-y-5">
                    {ticketStats.map((t, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-[11px] md:text-xs font-semibold mb-2 uppercase">
                          <span className="text-gray-400 break-words pr-2">{t.name}</span>
                          <span className="text-white flex-shrink-0">{t.count} <span className="text-gray-600 font-normal">({t.percent}%)</span></span>
                        </div>
                        <div className="w-full h-1 bg-white/10 overflow-hidden rounded-full">
                          <div className={`h-full transition-all duration-1000 ${i===0?'bg-blue-500':i===1?'bg-[#10B981]':'bg-amber-500'}`} style={{ width: `${t.percent}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2 admin-glass p-6 md:p-8 flex flex-col rounded-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-wide">Recent Registrations</h3>
                    <button onClick={() => setAdminTab('users')} className="text-[10px] font-bold text-gray-400 hover:text-[#C5A059] uppercase tracking-wider bg-black/40 px-3 py-1.5 rounded-lg transition-colors border border-gray-800">View All →</button>
                  </div>
                  {registrations.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-600 text-xs md:text-sm py-12 border border-dashed border-gray-700/50 rounded-xl">
                      NO DATA YET
                    </div>
                  ) : (
                    <div className="space-y-2 flex-1 overflow-x-auto">
                      {registrations.slice(0, 5).map(r => (
                        <div key={r.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-transparent border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors gap-3 sm:gap-0 min-w-[300px] rounded-lg">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="text-gray-500 text-[10px] w-12 flex-shrink-0 font-mono">#{r.id.toString().slice(-6)}</div>
                            <div>
                              <div className="font-bold text-white text-xs md:text-sm uppercase break-words max-w-[150px] md:max-w-[200px]">{r.name}</div>
                              <div className="text-[9px] text-gray-500 uppercase tracking-wider break-words max-w-[150px] md:max-w-[200px]">{r.company || r.email}</div>
                            </div>
                          </div>
                          <div className="flex sm:justify-end items-center gap-3 md:gap-4 ml-14 sm:ml-0">
                            {r.status === 'Checked In' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981] flex-shrink-0"></span>}
                            <span className="inline-block px-2 py-1 text-[8px] font-bold bg-black/40 text-gray-300 uppercase tracking-wider border border-gray-700 rounded break-words text-center max-w-[100px] md:max-w-[120px] backdrop-blur-sm">{r.ticketName || 'UNKNOWN PASS'}</span>
                            <div className="text-xs font-bold text-[#C5A059] font-mono w-16 md:w-24 text-right flex-shrink-0">฿{Number(r.totalPaid).toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {adminTab === 'scanner' && (
             <div className="max-w-4xl mx-auto space-y-6 relative z-10 stagger-enter">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-6">
                 <div>
                   <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight uppercase glow-text">Event Check-In</h2>
                   <p className="text-[#C5A059] text-[10px] md:text-xs mt-1 uppercase tracking-widest font-bold">Scan QR or Barcode</p>
                 </div>
               </div>

               <div className="admin-glass p-4 md:p-8 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[400px] rounded-2xl">
                 
                 <div className="flex justify-center gap-4 mb-6 md:mb-8 relative z-10 w-full sm:w-auto">
                    <button onClick={() => setIsScanning(!isScanning)} className={`w-full sm:w-auto px-5 py-3 text-white text-[10px] font-bold uppercase tracking-wider transition-all border shadow-lg rounded-lg ${isScanning ? 'bg-red-600/80 hover:bg-red-600 border-red-500' : 'bg-[#C5A059]/80 hover:bg-[#C5A059] border-[#C5A059]'}`}>
                      {isScanning ? '🛑 Close Camera' : '📷 Open Camera Scanner'}
                    </button>
                 </div>

                 {isScanning && (
                   <div id="qr-reader" className="w-full max-w-sm mx-auto overflow-hidden border border-gray-600 mb-8 bg-black rounded-xl shadow-[0_0_30px_rgba(197,160,89,0.2)]"></div>
                 )}

                 <div className="relative z-10 w-full max-w-md">
                   {scanResult && (
                     <div className={`mb-8 p-6 border ${scanResult.type === 'success' ? 'bg-[#10B981]/10 border-[#10B981]/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]' : scanResult.type === 'duplicate' ? 'bg-amber-900/20 border-amber-500/50' : 'bg-red-900/20 border-red-500/50'} backdrop-blur-md transition-all rounded-xl`}>
                       <div className={`text-4xl md:text-5xl mb-4 ${scanResult.type === 'success' ? 'text-[#10B981]' : scanResult.type === 'duplicate' ? 'text-amber-500' : 'text-red-500'}`}>
                         {scanResult.type === 'success' ? '✅' : scanResult.type === 'duplicate' ? '⚠️' : '❌'}
                       </div>
                       <h3 className="text-lg md:text-xl font-bold text-white uppercase mb-2 leading-tight">{scanResult.message}</h3>
                       
                       {scanResult.user && (
                         <div className="mt-5 pt-5 border-t border-gray-700 text-left bg-black/40 p-4 md:p-5 rounded-lg">
                           <div className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">Guest Name</div>
                           <div className="text-lg font-bold text-white uppercase mb-4 break-words glow-text">{scanResult.user.name}</div>
                           
                           <div className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">Ticket Type</div>
                           <div className={`text-xs font-bold uppercase px-3 py-1 inline-block border rounded ${scanResult.type === 'success' ? 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/50' : 'bg-amber-500/20 text-amber-400 border-amber-500/50'}`}>{scanResult.user.ticketName || 'UNKNOWN PASS'}</div>
                           
                           <div className="flex gap-2 mt-6">
                             <button onClick={() => printBadge(scanResult.user)} className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white text-[10px] font-bold uppercase tracking-widest transition-all rounded-lg border border-gray-600 shadow-sm">
                               🖨️ PRINT BADGE
                             </button>
                           </div>
                         </div>
                       )}
                     </div>
                   )}

                   <form onSubmit={(e) => { e.preventDefault(); processScan(scanQuery); setScanQuery(''); }} className="relative">
                     <label className="block text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 md:mb-3">USB / Bluetooth Scanner</label>
                     <input 
                       ref={scannerInputRef}
                       type="text" 
                       value={scanQuery}
                       onChange={e => setScanQuery(e.target.value)}
                       placeholder="CLICK TO SCAN..." 
                       className="w-full p-4 md:p-5 bg-black/50 border border-gray-700 focus:border-[#C5A059] focus:shadow-[0_0_15px_rgba(197,160,89,0.3)] text-center text-xs md:text-sm text-white outline-none transition-all uppercase tracking-widest rounded-xl backdrop-blur-sm"
                     />
                   </form>
                 </div>
               </div>
             </div>
          )}

          {adminTab === 'users' && (
             <div className="max-w-7xl mx-auto space-y-4 md:space-y-6 relative z-10 stagger-enter">
               <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4 md:mb-6 uppercase glow-text">Attendee Database</h2>
               <div className="admin-glass rounded-2xl overflow-hidden shadow-2xl">
                 {registrations.length === 0 ? (
                   <div className="text-center py-20 text-gray-500 text-xs md:text-sm uppercase tracking-widest">Awaiting Entries...</div>
                 ) : (
                   <div className="overflow-x-auto">
                     <table className="w-full text-left border-collapse min-w-[750px]">
                       <thead>
                         <tr className="bg-black/40 border-b border-gray-700/50 text-[10px] font-bold text-[#C5A059] uppercase tracking-widest backdrop-blur-sm">
                           <th className="py-4 px-4 md:py-5 md:px-6">Guest Profile</th>
                           <th className="py-4 px-4 md:py-5 md:px-6">Contact Info</th>
                           <th className="py-4 px-4 md:py-5 md:px-6">Pass Type</th>
                           <th className="py-4 px-4 md:py-5 md:px-6 text-center">Check-in Status</th>
                           <th className="py-4 px-4 md:py-5 md:px-6 text-center">Action</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-800/30 text-xs">
                         {registrations.map(r => (
                           <tr key={r.id} className="admin-table-row cursor-default">
                             {editingUserId === r.id ? (
                               <>
                                 <td className="py-4 px-4 md:px-6 space-y-2">
                                   <input className="w-full p-2 bg-black/60 border border-gray-700 text-xs text-white font-semibold uppercase focus:border-[#C5A059] outline-none rounded" value={editUserForm.name || ''} onChange={e => setEditUserForm({...editUserForm, name: e.target.value})} placeholder="Name" />
                                   <input className="w-full p-2 bg-black/60 border border-gray-700 text-[10px] text-white uppercase focus:border-[#C5A059] outline-none rounded" value={editUserForm.company || ''} onChange={e => setEditUserForm({...editUserForm, company: e.target.value})} placeholder="Company" />
                                 </td>
                                 <td className="py-4 px-4 md:px-6 space-y-2">
                                   <input className="w-full p-2 bg-black/60 border border-gray-700 text-[10px] text-gray-300 focus:border-[#C5A059] outline-none rounded" value={editUserForm.email || ''} onChange={e => setEditUserForm({...editUserForm, email: e.target.value})} placeholder="Email" />
                                   <input className="w-full p-2 bg-black/60 border border-gray-700 text-[10px] text-gray-300 focus:border-[#C5A059] outline-none rounded" value={editUserForm.phone || ''} onChange={e => setEditUserForm({...editUserForm, phone: e.target.value})} placeholder="Phone" />
                                 </td>
                                 <td className="py-4 px-4 md:px-6">
                                    <input className="w-full p-2 bg-black/60 border border-gray-700 text-[10px] text-white uppercase focus:border-[#C5A059] outline-none rounded" value={editUserForm.ticketName || ''} onChange={e => setEditUserForm({...editUserForm, ticketName: e.target.value})} placeholder="Ticket Name" />
                                 </td>
                                 <td className="py-4 px-4 md:px-6 text-center">
                                    <select className="bg-black/60 border border-gray-700 text-[10px] text-white p-2 outline-none uppercase font-semibold rounded" value={editUserForm.status || 'Pending'} onChange={e => setEditUserForm({...editUserForm, status: e.target.value})}>
                                      <option value="Pending">Pending</option>
                                      <option value="Checked In">Checked In</option>
                                    </select>
                                 </td>
                                 <td className="py-4 px-4 md:px-6 text-center space-x-1 md:space-x-2 whitespace-nowrap">
                                   <button onClick={saveUserEdit} className="px-3 py-1.5 bg-[#10B981]/90 hover:bg-[#10B981] text-white text-[9px] font-bold uppercase tracking-wider transition-colors rounded">Save</button>
                                   <button onClick={() => setEditingUserId(null)} className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-[9px] font-bold uppercase tracking-wider border border-gray-700 transition-colors rounded">Cancel</button>
                                 </td>
                               </>
                             ) : (
                               <>
                                 <td className="py-4 md:py-5 px-4 md:px-6 max-w-[200px]">
                                   <div className="font-semibold text-white text-xs uppercase break-words">{r.name}</div>
                                   <div className="text-[9px] text-gray-400 font-medium mt-1 uppercase tracking-wider truncate">{r.company || '-'}</div>
                                 </td>
                                 <td className="py-4 md:py-5 px-4 md:px-6 max-w-[150px]">
                                   <div className="text-gray-300 text-[10px] truncate">{r.email}</div>
                                   <div className="text-[9px] text-gray-500 mt-1 font-mono">{r.phone}</div>
                                 </td>
                                 <td className="py-4 md:py-5 px-4 md:px-6 max-w-[150px]">
                                   <span className="px-2 md:px-3 py-1 text-[8px] font-bold bg-black/50 text-gray-300 border border-gray-700 uppercase tracking-widest break-words inline-block text-center rounded backdrop-blur-sm">{r.ticketName || 'UNKNOWN PASS'}</span>
                                 </td>
                                 <td className="py-4 md:py-5 px-4 md:px-6 text-center">
                                    {r.status === 'Checked In' ? (
                                       <span className="px-2 py-1 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 text-[8px] font-bold uppercase tracking-wider rounded">Checked In</span>
                                    ) : (
                                       <span className="px-2 py-1 bg-transparent text-gray-500 border border-gray-800 text-[8px] font-bold uppercase tracking-wider rounded">Pending</span>
                                    )}
                                 </td>
                                 <td className="py-4 md:py-5 px-4 md:px-6 text-center space-x-1 md:space-x-1.5 whitespace-nowrap">
                                   <button onClick={() => printBadge(r)} className="px-2 md:px-2.5 py-1 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 bg-black/40 border border-gray-700 font-bold text-[8px] uppercase tracking-wider transition-colors rounded" title="Print Badge">Badge</button>
                                   <button onClick={() => printCertificate(r)} className="px-2 md:px-2.5 py-1 text-[#C5A059] hover:text-[#e0b96b] hover:bg-[#C5A059]/20 bg-black/40 border border-gray-700 font-bold text-[8px] uppercase tracking-wider transition-colors rounded" title="Print Certificate">Cert</button>
                                   <button onClick={() => startEditUser(r)} className="px-2 md:px-2.5 py-1 text-gray-300 hover:text-white hover:bg-gray-800 bg-black/40 border border-gray-700 font-bold text-[8px] uppercase tracking-wider transition-colors rounded" title="Edit">Edit</button>
                                   <button onClick={() => deleteUser(r.id)} className="px-2 md:px-2.5 py-1 text-red-500 hover:text-red-400 hover:bg-red-900/20 bg-black/40 border border-gray-700 font-bold text-[8px] uppercase tracking-wider transition-colors rounded" title="Delete">Del</button>
                                 </td>
                               </>
                             )}
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                 )}
               </div>
             </div>
           )}

           {adminTab === 'settings' && (
            <div className="max-w-5xl mx-auto space-y-6 relative z-10 stagger-enter">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight uppercase glow-text">Event Config</h2>
                <button onClick={handleSaveConfig} className="w-full sm:w-auto px-6 md:px-8 py-3 bg-[#C5A059] hover:bg-[#a68444] text-white font-semibold uppercase text-[10px] md:text-xs tracking-widest shadow-[0_0_15px_rgba(197,160,89,0.4)] rounded-lg transition-all">
                  💾 SAVE CONFIG
                </button>
              </div>

              <div className="admin-glass p-6 md:p-8 space-y-6 rounded-2xl">
                <div className="border-b border-gray-700/50 pb-4">
                  <h3 className="text-base md:text-lg font-bold text-[#C5A059] uppercase">🖼️ Background Images</h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">ใส่ลิงก์รูปภาพ (URL) สำหรับเปลี่ยนพื้นหลังเว็บ</p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  <div className="space-y-1.5 md:space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hero Background</label>
                    <input type="text" value={config.heroBg} onChange={(e) => setConfig({...config, heroBg: e.target.value})} placeholder="https://..." className="w-full p-3 bg-black/50 border border-gray-700 text-xs text-gray-200 focus:border-[#C5A059] outline-none rounded-lg" />
                  </div>
                  <div className="space-y-1.5 md:space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sponsors Background</label>
                    <input type="text" value={config.sponsorBg} onChange={(e) => setConfig({...config, sponsorBg: e.target.value})} placeholder="https://..." className="w-full p-3 bg-black/50 border border-gray-700 text-xs text-gray-200 focus:border-[#C5A059] outline-none rounded-lg" />
                  </div>
                </div>
              </div>

              <div className="admin-glass p-6 md:p-8 space-y-6 rounded-2xl">
                <div className="flex justify-between items-center border-b border-gray-700/50 pb-4">
                  <h3 className="text-base md:text-lg font-bold text-[#C5A059] uppercase">🎬 VOD Highlight</h3>
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" className="sr-only" checked={config.showVideo} onChange={(e) => setConfig({...config, showVideo: e.target.checked})} />
                      <div className={`block w-10 h-5 transition-colors border border-gray-700 rounded-full ${config.showVideo ? 'bg-[#C5A059]' : 'bg-black/50'}`}></div>
                      <div className={`dot absolute left-1 top-1 w-3 h-3 rounded-full transition-transform ${config.showVideo ? 'bg-white transform translate-x-5 shadow-sm' : 'bg-gray-500'}`}></div>
                    </div>
                    <span className="ml-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{config.showVideo ? 'LIVE' : 'OFFLINE'}</span>
                  </label>
                </div>
                
                {config.showVideo && (
                  <div className="grid grid-cols-1 gap-4 md:gap-6">
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Video Title</label>
                      <input type="text" value={config.videoTitle} onChange={(e) => setConfig({...config, videoTitle: e.target.value})} className="w-full p-3 bg-black/50 border border-gray-700 text-xs font-semibold text-white focus:border-[#C5A059] outline-none uppercase rounded-lg" />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">YouTube Video Link</label>
                      <input type="text" value={config.videoUrl} onChange={(e) => setConfig({...config, videoUrl: e.target.value})} className="w-full p-3 bg-black/50 border border-gray-700 text-xs text-[#3B82F6] font-mono focus:border-[#C5A059] outline-none rounded-lg" />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description</label>
                      <textarea value={config.videoDesc} onChange={(e) => setConfig({...config, videoDesc: e.target.value})} className="w-full p-3 bg-black/50 border border-gray-700 text-xs text-gray-300 focus:border-[#C5A059] outline-none rounded-lg" rows="3"></textarea>
                    </div>
                  </div>
                )}
              </div>

              <div className="admin-glass p-6 md:p-8 space-y-6 md:space-y-8 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <div className="space-y-1.5 md:space-y-2"><label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Event Title</label><input type="text" value={config.title} onChange={(e) => setConfig({...config, title: e.target.value})} className="w-full p-3 bg-black/50 border border-gray-700 text-xs font-semibold text-white focus:border-[#C5A059] outline-none uppercase rounded-lg" /></div>
                  <div className="space-y-1.5 md:space-y-2"><label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Subtitle / Tagline</label><input type="text" value={config.subtitle} onChange={(e) => setConfig({...config, subtitle: e.target.value})} className="w-full p-3 bg-black/50 border border-gray-700 text-xs text-white focus:border-[#C5A059] outline-none font-semibold rounded-lg" /></div>
                  <div className="space-y-1.5 md:space-y-2"><label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Event Date</label><input type="text" value={config.date} onChange={(e) => setConfig({...config, date: e.target.value})} className="w-full p-3 bg-black/50 border border-gray-700 text-xs font-semibold text-white focus:border-[#C5A059] outline-none uppercase rounded-lg" /></div>
                  <div className="space-y-1.5 md:space-y-2"><label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Countdown Target</label><input type="datetime-local" value={config.targetDate?.slice(0,16)} onChange={(e) => setConfig({...config, targetDate: e.target.value + ":00"})} className="w-full p-3 bg-black/50 border border-gray-700 text-xs font-mono text-gray-300 focus:border-[#C5A059] outline-none rounded-lg [color-scheme:dark]" /></div>
                  <div className="md:col-span-2 space-y-1.5 md:space-y-2"><label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</label><input type="text" value={config.location} onChange={(e) => setConfig({...config, location: e.target.value})} className="w-full p-3 bg-black/50 border border-gray-700 text-xs font-semibold text-white focus:border-[#C5A059] outline-none uppercase rounded-lg" /></div>
                  <div className="md:col-span-2 space-y-1.5 md:space-y-2"><label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description</label><textarea value={config.aboutText} onChange={(e) => setConfig({...config, aboutText: e.target.value})} className="w-full p-3 bg-black/50 border border-gray-700 text-xs text-gray-300 focus:border-[#C5A059] outline-none rounded-lg" rows="4"></textarea></div>
                </div>
              </div>
            </div>
          )}

          {adminTab === 'speakers' && (
            <div className="max-w-6xl mx-auto space-y-6 relative z-10 stagger-enter">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight uppercase glow-text">Speakers & VIPs</h2>
                <button onClick={handleSaveConfig} className="w-full sm:w-auto px-6 py-3 bg-[#C5A059] hover:bg-[#a68444] text-white font-semibold uppercase text-[10px] tracking-widest shadow-[0_0_15px_rgba(197,160,89,0.4)] rounded-lg transition-all">
                  💾 SAVE CONFIG
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {config.speakers?.map((speaker, index) => (
                  <div key={speaker.id} className="admin-glass p-6 relative rounded-2xl flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-gray-700/50 pb-3">
                       <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">Speaker #{index + 1}</span>
                       <button onClick={() => removeArrayItem('speakers', speaker.id)} className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-500 text-[9px] font-bold uppercase hover:bg-rose-500 hover:text-white transition-all rounded-md">Delete</button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      <img src={speaker.img} className="w-20 h-20 object-cover border border-gray-700 rounded-lg shadow-md bg-white" alt="speaker" />
                      <div className="flex-1 w-full space-y-3">
                        <div className="space-y-1">
                          <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">Image URL</label>
                          <input type="text" value={speaker.img} onChange={(e) => handleArrayChange('speakers', speaker.id, 'img', e.target.value)} className="w-full p-2.5 bg-black/50 border border-gray-700 text-[10px] font-mono text-[#3B82F6] focus:border-[#C5A059] outline-none rounded-md" placeholder="https://..." />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">Or Upload File (Max 5MB)</label>
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'speakers', speaker.id)} className="w-full text-[10px] text-gray-400 file:mr-2 file:py-1 file:px-3 file:border-0 file:text-[9px] file:font-semibold file:uppercase file:bg-gray-800 file:text-white hover:file:bg-gray-700 cursor-pointer rounded-md" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input type="text" value={speaker.name} onChange={(e) => handleArrayChange('speakers', speaker.id, 'name', e.target.value)} className="w-full p-2.5 bg-black/50 border border-gray-700 text-xs font-semibold uppercase text-white focus:border-[#C5A059] outline-none rounded-md" placeholder="Name" />
                        <input type="text" value={speaker.role} onChange={(e) => handleArrayChange('speakers', speaker.id, 'role', e.target.value)} className="w-full p-2.5 bg-black/50 border border-gray-700 text-[10px] font-medium uppercase text-gray-300 focus:border-[#C5A059] outline-none rounded-md" placeholder="Role/Company" />
                      </div>
                      <div className="flex gap-3">
                         <input type="text" value={speaker.tag} onChange={(e) => handleArrayChange('speakers', speaker.id, 'tag', e.target.value)} className="flex-1 p-2.5 bg-black/50 border border-gray-700 text-[10px] font-semibold text-white uppercase focus:border-[#C5A059] outline-none rounded-md" placeholder="Category" />
                         <input type="color" value={speaker.color} onChange={(e) => handleArrayChange('speakers', speaker.id, 'color', e.target.value)} className="w-10 h-9 bg-black border border-gray-700 cursor-pointer p-0.5 rounded-md" />
                      </div>
                      <textarea value={speaker.desc} onChange={(e) => handleArrayChange('speakers', speaker.id, 'desc', e.target.value)} className="w-full p-3 bg-black/50 border border-gray-700 text-[10px] text-gray-300 focus:border-[#C5A059] outline-none rounded-md" rows="3" placeholder="Biography..."></textarea>
                    </div>
                  </div>
                ))}
                
                <button onClick={addSpeaker} className="w-full min-h-[200px] py-8 border-2 border-dashed border-gray-700 hover:border-[#C5A059] text-gray-500 hover:text-[#C5A059] font-bold text-[11px] uppercase tracking-widest transition-all bg-black/20 hover:bg-[#C5A059]/5 rounded-2xl flex flex-col items-center justify-center gap-2 backdrop-blur-sm">
                  <span className="text-3xl mb-1">+</span> Add Speaker
                </button>
              </div>
            </div>
          )}

          {adminTab === 'schedule' && (
            <div className="max-w-4xl mx-auto space-y-6 relative z-10 stagger-enter">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight uppercase glow-text">Event Schedule</h2>
                <button onClick={handleSaveConfig} className="w-full sm:w-auto px-6 py-3 bg-[#C5A059] hover:bg-[#a68444] text-white font-semibold uppercase text-[10px] tracking-widest shadow-[0_0_15px_rgba(197,160,89,0.4)] rounded-lg transition-all">
                  💾 SAVE CONFIG
                </button>
              </div>
              <div className="space-y-4">
                {config.schedule?.map((s, index) => (
                  <div key={s.id} className="admin-glass p-6 flex flex-col gap-4 relative group rounded-2xl">
                    <div className="flex justify-between items-center border-b border-gray-700/50 pb-3">
                       <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">Agenda Session #{index + 1}</span>
                       <button onClick={() => removeArrayItem('schedule', s.id)} className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-500 text-[9px] font-bold uppercase hover:bg-rose-500 hover:text-white transition-all rounded-md opacity-0 group-hover:opacity-100">Delete</button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                      <div className="w-full sm:w-24 flex sm:flex-col gap-3">
                        <input type="text" value={s.time} onChange={(e) => handleArrayChange('schedule', s.id, 'time', e.target.value)} className="w-full p-3 bg-black/50 border border-gray-700 text-center font-bold text-lg text-white focus:border-[#C5A059] outline-none rounded-lg" />
                        <input type="color" value={s.color} onChange={(e) => handleArrayChange('schedule', s.id, 'color', e.target.value)} className="w-12 sm:w-full h-12 sm:h-8 bg-black border border-gray-700 cursor-pointer p-0.5 flex-shrink-0 rounded-md" />
                      </div>
                      <div className="flex-1 space-y-3 sm:pr-2">
                        <div className="flex flex-col sm:flex-row gap-3">
                          <input type="text" value={s.tag} onChange={(e) => handleArrayChange('schedule', s.id, 'tag', e.target.value)} className="w-full sm:w-28 p-2.5 bg-black/50 border border-gray-700 text-[9px] font-bold text-gray-400 uppercase tracking-widest focus:border-[#C5A059] outline-none rounded-lg" placeholder="TAG" />
                          <input type="text" value={s.title} onChange={(e) => handleArrayChange('schedule', s.id, 'title', e.target.value)} className="flex-1 p-2.5 bg-black/50 border border-gray-700 text-sm font-semibold uppercase text-white focus:border-[#C5A059] outline-none rounded-lg" placeholder="Session Title" />
                        </div>
                        <textarea value={s.desc} onChange={(e) => handleArrayChange('schedule', s.id, 'desc', e.target.value)} className="w-full p-3 bg-black/50 border border-gray-700 text-[10px] text-gray-300 focus:border-[#C5A059] outline-none rounded-lg" rows="2" placeholder="Description"></textarea>
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={addSchedule} className="w-full py-8 border-2 border-dashed border-gray-700 hover:border-[#C5A059] text-gray-500 hover:text-[#C5A059] font-bold text-[11px] uppercase tracking-widest transition-all bg-black/20 hover:bg-[#C5A059]/5 rounded-2xl flex items-center justify-center gap-2 backdrop-blur-sm">
                  <span className="text-2xl mb-1">+</span> Add Session
                </button>
              </div>
            </div>
          )}

          {adminTab === 'sponsors' && (
            <div className="max-w-4xl mx-auto space-y-6 relative z-10 stagger-enter">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight uppercase glow-text">Sponsors & Partners</h2>
                <button onClick={handleSaveConfig} className="w-full sm:w-auto px-6 py-3 bg-[#C5A059] hover:bg-[#a68444] text-white font-semibold uppercase text-[10px] tracking-widest shadow-[0_0_15px_rgba(197,160,89,0.4)] rounded-lg transition-all">
                  💾 SAVE CONFIG
                </button>
              </div>
              
              <div className="admin-glass p-6 md:p-8 rounded-2xl">
                <div className="border-b border-gray-700/50 pb-4 mb-6">
                  <h3 className="text-base md:text-lg font-bold text-[#C5A059] uppercase">🤝 Official Sponsors</h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">จัดการรายชื่อผู้สนับสนุนหลักที่แสดงในแถบเลื่อน (Marquee)</p>
                </div>
                
                <div className="space-y-4">
                  {config.sponsors?.map((sponsor, index) => (
                    <div key={sponsor.id} className="flex items-center gap-3 md:gap-4 bg-black/30 p-3 md:p-4 rounded-xl border border-gray-800/80 transition-all hover:border-gray-700">
                      <span className="text-[10px] font-bold text-[#C5A059] w-6 text-center">{index + 1}.</span>
                      <input 
                        type="text" 
                        value={sponsor.name} 
                        /* เพิ่ม .toUpperCase() เพื่อบังคับให้ข้อมูลที่ถูกพิมพ์แปลงเป็นตัวใหญ่ทั้งหมดทันที */
                        onChange={(e) => handleArrayChange('sponsors', sponsor.id, 'name', e.target.value.toUpperCase())} 
                        className="flex-1 p-3 bg-black/50 border border-gray-700 text-sm font-semibold text-white uppercase focus:border-[#C5A059] outline-none rounded-lg" 
                        placeholder="SPONSOR NAME (เช่น BACC, TCDC)" 
                      />
                      <button 
                        onClick={() => removeArrayItem('sponsors', sponsor.id)} 
                        className="px-4 py-3 bg-rose-500/10 border border-rose-500/30 text-rose-500 text-[10px] font-bold uppercase hover:bg-rose-500 hover:text-white transition-all rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  
                  <button 
                    onClick={addSponsor} 
                    className="w-full py-6 border-2 border-dashed border-gray-700 hover:border-[#C5A059] text-gray-500 hover:text-[#C5A059] font-bold text-[11px] uppercase tracking-widest transition-all bg-black/20 hover:bg-[#C5A059]/5 rounded-xl flex items-center justify-center gap-2 backdrop-blur-sm mt-4"
                  >
                    <span className="text-2xl mb-1">+</span> Add Sponsor
                  </button>
                </div>
              </div>
            </div>
          )}

          {adminTab === 'tickets' && (
            <div className="max-w-6xl mx-auto space-y-6 relative z-10 stagger-enter">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                 <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight uppercase glow-text">Ticketing</h2>
                 <div className="flex w-full sm:w-auto gap-3">
                   <button onClick={addTicket} className="flex-1 sm:flex-none px-4 py-3 bg-black/50 hover:bg-gray-800 text-white text-[10px] font-semibold uppercase tracking-wider border border-gray-600 transition-all rounded-lg backdrop-blur-sm">+ Add Ticket</button>
                   <button onClick={handleSaveConfig} className="flex-1 sm:flex-none px-6 py-3 bg-[#C5A059] hover:bg-[#a68444] text-white font-semibold uppercase text-[10px] tracking-widest shadow-[0_0_15px_rgba(197,160,89,0.4)] rounded-lg transition-all">
                     💾 SAVE CONFIG
                   </button>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {config.tickets?.map((ticket, index) => (
                  <div key={ticket.id} className="admin-glass p-6 flex flex-col gap-4 relative rounded-2xl">
                    <div className="flex justify-between items-center border-b border-gray-700/50 pb-3">
                       <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">Ticket Tier #{index + 1}</span>
                       <button onClick={() => removeArrayItem('tickets', ticket.id)} className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-500 text-[9px] font-bold uppercase hover:bg-rose-500 hover:text-white transition-all rounded-md">Delete</button>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-2">Ticket Name</label>
                      <input type="text" value={ticket.name} onChange={(e) => handleArrayChange('tickets', ticket.id, 'name', e.target.value)} className="w-full p-3 bg-black/50 border border-gray-700 text-sm font-semibold uppercase text-white focus:border-[#C5A059] outline-none text-center rounded-lg" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-2">Price (THB)</label>
                      <div className="relative">
                         <span className="absolute left-4 top-3 text-gray-500 font-bold text-sm">฿</span>
                         <input type="number" value={ticket.price} onChange={(e) => handleArrayChange('tickets', ticket.id, 'price', e.target.value)} className="w-full p-3 pl-8 bg-black/50 border border-gray-700 text-xl font-bold font-mono text-[#10B981] focus:border-[#C5A059] outline-none text-center rounded-lg" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-2">Highlight Badge (Optional)</label>
                      <input type="text" value={ticket.badge || ''} onChange={(e) => handleArrayChange('tickets', ticket.id, 'badge', e.target.value)} className="w-full p-2.5 bg-black/50 border border-gray-700 text-[10px] font-semibold text-[#F97316] uppercase text-center outline-none rounded-lg" placeholder="e.g. VIP ZONE" />
                    </div>

                    <div className="space-y-1 flex-1 flex flex-col">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-2">Access & Perks</label>
                      <textarea value={ticket.features} onChange={(e) => handleArrayChange('tickets', ticket.id, 'features', e.target.value)} className="w-full flex-1 p-3 bg-black/50 border border-gray-700 text-[10px] text-gray-300 focus:border-[#C5A059] outline-none leading-relaxed rounded-lg" rows="5"></textarea>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}