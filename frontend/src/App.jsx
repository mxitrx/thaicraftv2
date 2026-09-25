import React, { useState, useEffect, useMemo, useRef } from 'react';

// ==========================================
// 1. CONFIG & BACKEND SETUP (ARCHITECTURE THEME)
// ==========================================
// ⚠️ ใส่ลิงก์ Google Apps Script ของคุณที่นี่
const GAS_URL = "https://script.google.com/macros/s/AKfycbzyM22RFFgUmHRRf_7Q4chOjr4S4LaIm_WyicFkRTIIgB2f40nqbypHS1pj2bxYplw-/exec";

const defaultConfig = {
  title: "VISIONARY SPACES",
  subtitle: "Architecture & Design Summit 2026",
  date: "12 - 14 ธันวาคม 2026",
  targetDate: "2026-12-12T09:00:00", 
  location: "QSNCC - Plenary Hall (ศูนย์การประชุมแห่งชาติสิริกิติ์)",
  aboutText: "ร่วมเปิดมุมมองใหม่แห่งวงการสถาปัตยกรรมและการออกแบบ ในงานสัมมนาที่รวบรวมสถาปนิกและนักออกแบบระดับโลก พบกับนวัตกรรมวัสดุก่อสร้าง เทรนด์การออกแบบยั่งยืน (Sustainable Design) และเทคโนโลยี AI ในงานสถาปัตยกรรม",
  contactEmail: "info@visionaryspaces.com",
  contactPhone: "02-ARCH-2026",
  
  primaryColor: "#D4AF37", // Architectural Brass/Gold
  secondaryColor: "#E5E5E5", // Concrete White
  
  heroBg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop", 
  marqueeBg: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop", 
  sponsorBg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop", 

  showVideo: true,
  videoTitle: "THE FUTURE OF HABITAT",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
  videoDesc: "รับชมสารคดีสั้นเกี่ยวกับวิวัฒนาการของการออกแบบพื้นที่อยู่อาศัยในศตวรรษที่ 21 ที่ผสานความงามเข้ากับธรรมชาติอย่างยั่งยืน",

  speakers: [
    { id: 1, name: "ศ.ดร. อนันต์ สถาปัตย์", role: "Principal Architect", tag: "KEYNOTE", color: "#D4AF37", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop", desc: "สถาปนิกรางวัลระดับนานาชาติ ผู้บุกเบิกการออกแบบสถาปัตยกรรมที่คำนึงถึงบริบทแวดล้อม (Contextual Architecture)" },
    { id: 2, name: "Elena Rostova", role: "Lead Interior Designer", tag: "INTERIOR", color: "#E5E5E5", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop", desc: "ผู้เชี่ยวชาญด้าน Space Planning และจิตวิทยาของสีในงานตกแต่งภายในระดับ Luxury Commercial" },
    { id: 3, name: "Kenzo Tanaka", role: "Landscape Architect", tag: "LANDSCAPE", color: "#10B981", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop", desc: "การผสานพื้นที่สีเขียวเข้ากับตึกระฟ้า (Vertical Forest) เพื่อแก้ปัญหา Urban Heat Island ในเมืองใหญ่" },
    { id: 4, name: "นภัสสร ดีไซน์", role: "Sustainable Materials Expert", tag: "MATERIAL", color: "#3B82F6", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop", desc: "เปิดนวัตกรรมวัสดุก่อสร้างทางเลือกใหม่ที่ลดการปล่อยคาร์บอน (Net Zero) โดยไม่ลดทอนความสวยงาม" }
  ],
  
  sponsors: [
    { id: 1, name: "SCG BUILDING MAT" }, { id: 2, name: "TOA" },
    { id: 3, name: "COTTO" }, { id: 4, name: "LIXIL" }, { id: 5, name: "AUTODESK" },
    { id: 6, name: "HERMAN MILLER" }, { id: 7, name: "STEELCASE" }
  ],

  tickets: [
    { id: 1, name: "Exhibition Pass", price: 500, type: "early", badge: "🏛️ BASIC", features: "สิทธิ์เข้าชมโซนจัดแสดงนวัตกรรมวัสดุ\nสิทธิ์ฟังบรรยายบนเวทีรอง (Mini Stage)\nรับสูจิบัตรดิจิทัล" },
    { id: 2, name: "Conference Pass", price: 2900, type: "regular", badge: "📐 STANDARD", features: "สิทธิพิเศษทั้งหมดของ Exhibition\nสิทธิ์เข้าฟัง Keynote บน Main Stage\nสิทธิ์เข้าร่วม 1 Masterclass Session\nคูปองอาหารกลางวันและ Coffee Break" },
    { id: 3, name: "Architect VIP Club", price: 9500, type: "vip", badge: "🏢 VIP ACCESS", features: "สิทธิพิเศษทั้งหมดของ Conference\nเข้าใช้ VIP Architect Lounge ติดแอร์\nสิทธิ์ร่วมงาน Networking Dinner กับวิทยากร\nชุดหนังสือรวมผลงานการออกแบบระดับโลก" }
  ],

  schedule: [
    { id: 1, time: "09:00", title: "Registration & Exhibition Opens", desc: "ลงทะเบียนรับป้ายชื่อ และเปิดโซนจัดแสดงนวัตกรรมวัสดุก่อสร้างจากแบรนด์ชั้นนำ", tag: "OPENING", color: "#D4AF37" },
    { id: 2, time: "10:30", title: "Keynote: The Future of Urban Living", desc: "วิสัยทัศน์การออกแบบเมืองและที่อยู่อาศัยในอีก 10 ปีข้างหน้า โดย ศ.ดร. อนันต์ สถาปัตย์", tag: "MAIN STAGE", color: "#E5E5E5" },
    { id: 3, time: "13:30", title: "Masterclass: AI in 3D Modeling", desc: "เวิร์กชอปเจาะลึกการใช้ AI ช่วย Generate แบบร่างสถาปัตยกรรมและโมเดล 3 มิติ", tag: "WORKSHOP", color: "#3B82F6" },
    { id: 4, time: "18:00", title: "Design Awards & Networking", desc: "พิธีมอบรางวัลงานออกแบบยอดเยี่ยมแห่งปี และงานเลี้ยงพบปะสังสรรค์ในแวดวงนักออกแบบ", tag: "NETWORKING", color: "#10B981" }
  ],
  
  faqs: [
    { id: 1, q: "งานสัมมนานี้เหมาะกับใครบ้าง?", a: "งานนี้เหมาะสำหรับสถาปนิก, มัณฑนากร, นักพัฒนาอสังหาริมทรัพย์, นักศึกษาคณะสถาปัตยกรรมศาสตร์ และผู้ที่สนใจเทรนด์การออกแบบและวัสดุก่อสร้างใหม่ๆ" },
    { id: 2, q: "สามารถออกใบกำกับภาษีในนามบริษัทได้หรือไม่?", a: "ได้ครับ หลังจากชำระเงินเสร็จสิ้น ระบบจะมีฟอร์มให้กรอกข้อมูลสำหรับออกใบกำกับภาษีเต็มรูปแบบในนามนิติบุคคล" },
    { id: 3, q: "ต้องเตรียมอุปกรณ์อะไรมาสำหรับ Masterclass หรือไม่?", a: "สำหรับ Masterclass ที่เกี่ยวกับการใช้โปรแกรม กรุณานำ Laptop หรือ iPad ส่วนตัวมาด้วย ทางงานจะมีจุดชาร์จไฟและ Wi-Fi เตรียมไว้ให้" }
  ]
};

const getValidVideoUrl = (url) => {
  if (!url) return '';
  if (url.includes('watch?v=')) return url.replace('watch?v=', 'embed/').split('&')[0];
  if (url.includes('youtu.be/')) return url.replace('youtu.be/', 'www.youtube.com/embed/').split('?')[0];
  return url;
};

export default function App() {
  const [currentView, setCurrentView] = useState('customer');
  const [adminTab, setAdminTab] = useState('dashboard');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 🔥 Storage Keys สำหรับธีมสถาปัตยกรรม
  const [config, setConfig] = useState(() => {
    try { const saved = localStorage.getItem('archDesignConfigV1'); return saved ? JSON.parse(saved) : defaultConfig; } 
    catch { return defaultConfig; }
  });

  const [registrations, setRegistrations] = useState(() => {
    try { const saved = localStorage.getItem('archDesignRegisV1'); return saved ? JSON.parse(saved) : []; } 
    catch { return []; }
  });

  const pageViews = useMemo(() => registrations.length > 0 ? registrations.length * 15 + 5600 : 5600, [registrations.length]);

  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [ticketModal, setTicketModal] = useState({ isOpen: false, name: '', tier: '', qrUrl: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeFaq, setActiveFaq] = useState(null);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', role: '', ticketId: config?.tickets?.[0]?.id || ''
  });

  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserForm, setEditUserForm] = useState({});

  const [scanQuery, setScanQuery] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerInputRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  useEffect(() => { localStorage.setItem('archDesignConfigV1', JSON.stringify(config)); }, [config]);
  useEffect(() => { localStorage.setItem('archDesignRegisV1', JSON.stringify(registrations)); }, [registrations]);

  useEffect(() => {
    if (!window.Html5Qrcode) {
      const script = document.createElement('script');
      script.src = "https://unpkg.com/html5-qrcode";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

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
  }, [currentView, config]);

  useEffect(() => {
    const timer = setInterval(() => {
      if(!config.targetDate) return;
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
  }, [config.targetDate]);

  useEffect(() => {
    syncWithGoogleSheet(true);
    const interval = setInterval(() => { syncWithGoogleSheet(true); }, 15000);
    return () => clearInterval(interval);
  }, []);

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
    setIsSubmitting(true);
    
    const regId = Date.now();
    const newRegis = {
      id: regId, ...formData, ticketName: selectedTicket.name, ticketId: selectedTicket.id,
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
    const qrData = encodeURIComponent(`ARCH|${formData.name}|${selectedTicket.name}|${regId}`);
    const qrUrl = `https://quickchart.io/qr?text=${qrData}&size=300&margin=1&dark=${(config.primaryColor || '#D4AF37').replace('#','')}`;
    
    setTicketModal({ isOpen: true, name: formData.name, tier: selectedTicket.name, qrUrl });
    setIsSubmitting(false);
    setFormData({ name: '', email: '', phone: '', company: '', role: '', ticketId: config?.tickets?.[0]?.id || '' });
  };

  const syncWithGoogleSheet = async (isAuto = false) => {
    if(!isAuto) setIsSyncing(true);
    try {
      const resReg = await fetch(GAS_URL + "?action=getRegistrations&timestamp=" + new Date().getTime(), { cache: 'no-store' });
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

      const resConfig = await fetch(GAS_URL + "?action=getConfig&timestamp=" + new Date().getTime(), { cache: 'no-store' });
      const configData = await resConfig.json();
      if (configData && configData.title) setConfig(configData);
    } catch (error) { console.error("Sync Error:", error); }
    if(!isAuto) setIsSyncing(false);
  };

  const processScan = (rawText) => {
    if(!rawText) return;
    const parts = rawText.split('|');
    let foundUser = null;

    if(parts.length >= 4 && (parts[0] === 'ARCH' || parts[0] === 'EVENT' || parts[0] === 'MOTO' || parts[0] === 'RACE')) {
       foundUser = registrations.find(r => String(r.id) === String(parts[3]) || (r.name === parts[1] && r.ticketName === parts[2]));
    } else {
       foundUser = registrations.find(r => r.phone === rawText || r.name.toLowerCase().includes(rawText.toLowerCase()) || String(r.id) === rawText);
    }

    if(!foundUser) {
       setScanResult({ type: 'error', message: '❌ INVALID TICKET (ไม่พบในระบบ)' });
       return;
    }
    if(foundUser.status === 'Checked In') {
       setScanResult({ type: 'duplicate', user: foundUser, message: '⚠️ ALREADY CHECKED IN (สแกนซ้ำ)' });
       return;
    }

    const updatedUser = { ...foundUser, status: 'Checked In' };
    setRegistrations(prev => prev.map(r => r.id === updatedUser.id ? updatedUser : r));
    setScanResult({ type: 'success', user: updatedUser, message: '✅ ENTRY GRANTED (ตรวจสอบสำเร็จ)' });

    try {
      fetch(GAS_URL, {
         method: 'POST', mode: 'no-cors',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ action: 'checkIn', id: updatedUser.id })
      });
    } catch (err) { console.error(err); }
  };

  // 🔥 ป้ายชื่อสไตล์งานสัมมนาสถาปัตยกรรม (เรียบหรูทางการ)
  const printBadge = (user) => {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    const html = `
      <html>
        <head>
          <title>Print Badge - ${user.name}</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Kanit:wght@300;400;600;800&display=swap" rel="stylesheet">
          <style>
            body { font-family: 'Inter', 'Kanit', sans-serif; margin: 0; padding: 20px; display: flex; justify-content: center; align-items: center; background: #e5e5e5; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .badge { width: 100mm; height: 140mm; background: #ffffff; overflow: hidden; position: relative; display: flex; flex-direction: column; color: #171717; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border: 1px solid #d4d4d8; }
            .header { background: #171717; color: #fff; padding: 25px 15px; text-align: center; text-transform: uppercase; display: flex; flex-direction: column; align-items: center; justify-content: center; border-bottom: 4px solid ${config.primaryColor || '#D4AF37'}; }
            .header h2 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: 2px; }
            .header p { margin: 8px 0 0; font-size: 10px; font-weight: 400; letter-spacing: 3px; color: ${config.primaryColor || '#D4AF37'}; }
            .content { padding: 40px 20px; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; }
            .name { font-size: 32px; font-weight: 800; color: #171717; text-transform: uppercase; margin-bottom: 12px; text-align: center; line-height: 1.2; word-break: break-word; letter-spacing: -0.5px;}
            .company { font-size: 16px; font-weight: 500; color: #737373; text-transform: uppercase; text-align: center; letter-spacing: 1px; }
            .footer { background: #f5f5f5; padding: 25px 20px; text-align: center; border-top: 1px solid #e5e5e5; }
            .ticket { font-size: 18px; font-weight: 800; color: #171717; text-transform: uppercase; letter-spacing: 2px; display: inline-block; padding: 10px 25px; border: 2px solid #171717; background: transparent; }
            @media print {
              body { background: #fff; padding: 0; }
              .badge { box-shadow: none; border: 1px solid #ccc; width: 100vw; height: 100vh; }
            }
          </style>
        </head>
        <body>
          <div class="badge">
            <div class="header">
              <h2>${config.title}</h2>
              <p>DELEGATE PASS</p>
            </div>
            <div class="content">
              <div class="name">${user.name}</div>
              <div class="company">${user.company || 'GUEST'}</div>
            </div>
            <div class="footer">
              <div class="ticket">${user.ticketName || 'ACCESS PASS'}</div>
            </div>
          </div>
          <script>
            window.onload = () => { setTimeout(() => { window.print(); window.close(); }, 800); }
          </script>
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
      await fetch(GAS_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "saveConfig", data: config }) });
      localStorage.setItem('archDesignConfigV1', JSON.stringify(config));
      alert('✅ บันทึกการตั้งค่าลงระบบ Google Sheet เรียบร้อยแล้ว!');
    } catch (error) { alert('❌ เกิดข้อผิดพลาดในการบันทึกข้อมูล'); }
  };

  const addSpeaker = () => setConfig(prev => ({ ...prev, speakers: [...(prev.speakers || []), { id: Date.now(), name: "ชื่อวิทยากร", role: "ตำแหน่ง", tag: "TAG", color: "#D4AF37", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop", desc: "รายละเอียด" }] }));
  const addSchedule = () => setConfig(prev => ({ ...prev, schedule: [...(prev.schedule || []), { id: Date.now(), time: "00:00", title: "กิจกรรม", desc: "รายละเอียด", tag: "INFO", color: "#E5E5E5" }] }));
  const addSponsor = () => setConfig(prev => ({ ...prev, sponsors: [...(prev.sponsors || []), { id: Date.now(), name: "แบรนด์" }] }));
  const addFaq = () => setConfig(prev => ({ ...prev, faqs: [...(prev.faqs || []), { id: Date.now(), q: "คำถาม?", a: "คำตอบ" }] }));
  const addTicket = () => setConfig(prev => ({ ...prev, tickets: [...(prev.tickets || []), { id: Date.now(), name: "ชื่อบัตร", price: 1000, type: "regular", badge: "NEW", features: "Benefit 1" }] }));
  const removeArrayItem = (arr, id) => setConfig(prev => ({ ...prev, [arr]: (prev[arr]||[]).filter(i => i.id !== id) }));
  
  const handleImageUpload = (e, arr, id) => { 
    const file = e.target.files[0]; 
    if (file) { 
      const reader = new FileReader(); 
      reader.onloadend = () => {
        if (reader.result.length > 45000) { alert("⚠️ ขนาดรูปภาพใหญ่เกินไป กรุณาใช้วิธีวาง Image URL แทนครับ"); return; }
        handleArrayChange(arr, id, 'img', reader.result);
      }; 
      reader.readAsDataURL(file); 
    } 
  };

  const startEditUser = (user) => { setEditingUserId(user.id); setEditUserForm(user); };
  const saveUserEdit = async () => { 
    setRegistrations(prev => prev.map(r => r.id === editingUserId ? editUserForm : r)); 
    setEditingUserId(null); 
    try { await fetch(GAS_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "updateUser", data: editUserForm }) }); } catch (e) {}
  };
  const deleteUser = async (id) => { 
    if(window.confirm('ลบข้อมูลถาวร?')) {
      setRegistrations(prev => prev.filter(r => r.id !== id)); 
      try { await fetch(GAS_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "deleteUser", id: id }) }); } catch (e) {}
    }
  };

  const totalRevenueNum = registrations.reduce((sum, r) => sum + (Number(r.totalPaid) || 0), 0);
  const totalAttendeesNum = registrations.length;
  const avgOrderValue = totalAttendeesNum > 0 ? Math.round(totalRevenueNum / totalAttendeesNum) : 0;
  const ticketStats = (config?.tickets || []).map(t => {
    const count = registrations.filter(r => String(r.ticketId) === String(t.id) || (r.ticketName && r.ticketName.toLowerCase().includes(t.name.toLowerCase()))).length;
    const percent = totalAttendeesNum ? Math.round((count / totalAttendeesNum) * 100) : 0;
    return { ...t, count, percent };
  });
  const topTicket = [...ticketStats].sort((a,b) => b.count - a.count)[0];

  // ==========================================
  // CSS: MODERN ARCHITECTURE THEME
  // ==========================================
  const customerCss = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Kanit:wght@300;400;500;600;700;800;900&display=swap');
    
    :root { 
      --primary: ${config.primaryColor || '#D4AF37'}; 
      --primary-glow: ${config.primaryColor ? config.primaryColor + '40' : 'rgba(212, 175, 55, 0.25)'}; 
      --secondary: ${config.secondaryColor || '#E5E5E5'}; 
      --bg-dark: #121212; 
      --bg-card: #18181b; 
      --text-light: #fafafa; 
      --text-muted: #a1a1aa; 
      --border: rgba(255, 255, 255, 0.1); 
    }
    
    html { scroll-behavior: smooth; }
    body { font-family: 'Inter', 'Kanit', sans-serif; background-color: var(--bg-dark); color: var(--text-light); overflow-x: hidden; margin: 0; }
    
    .bg-pattern { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; opacity: 0.05; pointer-events: none; background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px); background-size: 50px 50px; }

    .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
    .reveal.is-visible { opacity: 1; transform: translateY(0); }
    .delay-1 { transition-delay: 0.1s; } .delay-2 { transition-delay: 0.2s; }
    
    @keyframes shine { to { background-position: 200% center; } }
    .text-gradient { background: linear-gradient(90deg, #fff 0%, var(--primary) 50%, #fff 100%); background-size: 200% auto; color: transparent; -webkit-background-clip: text; background-clip: text; animation: shine 5s linear infinite; }
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
    .section { padding: 100px 0; position: relative; z-index: 2; border-bottom: 1px solid var(--border); }
    .section-alt { background: #0f0f11; }
    
    .sec-header { text-align: center; margin-bottom: 60px; }
    .sec-badge { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; color: var(--bg-dark); background: var(--primary); padding: 6px 16px; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 15px; }
    .sec-title { font-size: 40px; font-weight: 800; color: #fff; margin-bottom: 15px; letter-spacing: -1px; text-transform: uppercase; }
    .sec-line { width: 60px; height: 3px; background: var(--primary); margin: 0 auto; }

    /* Minimalist Buttons - Sharp edges */
    .btn { display: inline-flex; align-items: center; gap: 10px; justify-content: center; background: transparent; color: #fff; border: 1px solid var(--border); padding: 16px 36px; font-size: 13px; font-weight: 600; cursor: pointer; transition: 0.3s; text-transform: uppercase; letter-spacing: 2px; }
    .btn:hover:not(:disabled) { background: #fff; color: var(--bg-dark); }
    .btn-primary { background: var(--primary); color: var(--bg-dark); border: 1px solid var(--primary); font-weight: 700; }
    .btn-primary:hover:not(:disabled) { background: transparent; color: var(--primary); }

    .navbar { position: fixed; top: 0; width: 100%; z-index: 1000; padding: 25px 0; transition: all 0.4s ease; border-bottom: 1px solid transparent; }
    .navbar.scrolled { padding: 15px 0; background: rgba(18, 18, 18, 0.95); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border); }
    .nav-wrap { display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 20px; font-weight: 800; color: #fff; display: flex; align-items: center; gap: 10px; cursor: pointer; letter-spacing: 2px; text-transform: uppercase; }
    .logo-mark { width: 32px; height: 32px; background: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: var(--bg-dark); }
    .nav-links { display: flex; gap: 35px; }
    .nav-links a { color: var(--text-muted); font-weight: 500; cursor: pointer; transition: 0.3s; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; position: relative;}
    .nav-links a:hover { color: #fff; }
    
    .hero { min-height: 100vh; display: flex; align-items: center; position: relative; overflow: hidden; padding-top: 60px; }
    .hero-bg { position: absolute; inset: 0; z-index: -1; background-size: cover; background-position: center; filter: grayscale(40%) brightness(0.6); }
    .hero::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(18,18,18,1) 0%, rgba(18,18,18,0.4) 100%); z-index: 0; }
    .hero-content { position: relative; z-index: 1; max-width: 800px; }
    .hero h1 { font-size: 64px; line-height: 1.1; margin-bottom: 20px; color: #fff; font-weight: 800; letter-spacing: -1px; text-transform: uppercase; }
    
    .countdown-wrap { display: flex; gap: 12px; margin-bottom: 30px; flex-wrap: wrap; }
    .cd-box { background: rgba(255,255,255,0.02); border: 1px solid var(--border); backdrop-filter: blur(4px); width: 75px; height: 75px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .cd-num { font-size: 26px; font-weight: 700; color: #fff; line-height: 1; font-family: monospace; }
    .cd-label { font-size: 9px; color: var(--primary); text-transform: uppercase; font-weight: 600; margin-top: 4px; letter-spacing: 1px; }

    .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
    .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
    
    /* Concept Cards - Sharp edges */
    .concept-card { padding: 40px 30px; text-align: center; transition: 0.4s; background: transparent; border: 1px solid var(--border); }
    .concept-card:hover { border-color: var(--primary); background: rgba(255,255,255,0.02); transform: translateY(-5px); }
    .concept-icon { width: 60px; height: 60px; background: rgba(255,255,255,0.05); display: flex; justify-content: center; align-items: center; margin: 0 auto 20px; font-size: 24px; border: 1px solid var(--border); color: #fff; transition: 0.4s; }
    .concept-card:hover .concept-icon { border-color: var(--primary); color: var(--primary); }
    
    /* Speaker Cards */
    .speaker-card { transition: 0.4s; cursor: pointer; background: var(--bg-card); border: 1px solid var(--border); position: relative; overflow: hidden; }
    .speaker-card:hover { transform: translateY(-5px); border-color: var(--primary); }
    .speaker-img-wrap { height: 300px; position: relative; }
    .speaker-img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(80%) contrast(1.1); transition: 0.7s; }
    .speaker-card:hover .speaker-img { filter: grayscale(0%) contrast(1); }
    .speaker-tag { position: absolute; top: 15px; left: 15px; font-size: 9px; font-weight: 700; color: var(--bg-dark); background: var(--primary); padding: 4px 12px; letter-spacing: 1px; text-transform: uppercase; }
    .speaker-info { padding: 25px; text-align: left; border-top: 1px solid var(--border); }

    .timeline-wrap { max-width: 800px; margin: 0 auto; position: relative; padding-left: 40px; }
    .timeline-wrap::before { content: ''; position: absolute; left: 19px; top: 0; bottom: 0; width: 1px; background: var(--border); }
    .time-card { padding: 30px; display: flex; gap: 30px; align-items: center; margin-bottom: 20px; position: relative; transition: 0.3s; background: var(--bg-card); border: 1px solid var(--border); }
    .time-card:hover { border-color: var(--primary); }
    .time-dot { position: absolute; left: -24px; top: 50%; transform: translateY(-50%); width: 10px; height: 10px; background: var(--bg-dark); border: 2px solid var(--primary); z-index: 2; transition: 0.3s; }
    .time-card:hover .time-dot { background: var(--primary); }
    .time-left { width: 90px; flex-shrink: 0; border-right: 1px solid var(--border); padding-right: 20px; text-align: right; }
    .time-text { font-size: 24px; font-weight: 700; color: #fff; line-height: 1; font-family: monospace; }

    .video-wrapper { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border: 1px solid var(--border); background: #000; }
    .video-wrapper iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; filter: grayscale(20%); }

    .ticket-wrapper { height: 100%; display: block; cursor: pointer; }
    .ticket-card { padding: 40px 30px; position: relative; display: flex; flex-direction: column; transition: 0.4s; height: 100%; background: transparent; border: 1px solid var(--border); }
    .ticket-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--primary); color: var(--bg-dark); padding: 4px 16px; font-size: 9px; font-weight: 800; letter-spacing: 2px; white-space: nowrap; }
    .ticket-radio:checked + .ticket-wrapper .ticket-card { border-color: var(--primary); background: rgba(255,255,255,0.02); transform: translateY(-5px); }
    
    .faq-item { border-bottom: 1px solid var(--border); padding: 25px 0; cursor: pointer; }
    .faq-q { font-size: 16px; font-weight: 600; color: #fff; display: flex; justify-content: space-between; align-items: center; letter-spacing: 0.5px; }
    .faq-a { font-size: 14px; color: var(--text-muted); margin-top: 15px; line-height: 1.7; display: none; padding-right: 20px; font-weight: 300; }
    .faq-item.active .faq-a { display: block; animation: fadeDown 0.3s ease; }
    .faq-item.active .faq-q { color: var(--primary); }
    @keyframes fadeDown { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }

    .form-box-wrapper { max-width: 850px; margin: 0 auto; }
    .form-box { padding: 50px 40px; background: var(--bg-card); border: 1px solid var(--border); border-top: 4px solid var(--primary); }
    .form-group { margin-bottom: 20px; text-align: left; }
    .form-group label { display: block; font-size: 11px; font-weight: 600; color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; }
    .form-input { width: 100%; padding: 15px 20px; background: var(--bg-dark); border: 1px solid var(--border); color: #fff; font-size: 14px; transition: 0.3s; font-family: monospace; }
    .form-input:focus { border-color: var(--primary); outline: none; background: rgba(255,255,255,0.02); }

    /* ==========================================
       MOBILE RESPONSIVE
       ========================================== */
    @media (max-width: 768px) {
      .hero h1 { font-size: 40px; letter-spacing: 0; }
      .sec-title { font-size: 28px; }
      .section { padding: 60px 0; }
      .grid-4, .grid-3 { grid-template-columns: 1fr; gap: 20px; }
      .grid-2 { grid-template-columns: 1fr !important; gap: 15px !important; }
      .form-box { padding: 30px 20px; }
      .time-card { flex-direction: column; align-items: flex-start; gap: 15px; padding: 25px 20px; }
      .time-left { border-right: none; border-bottom: 1px solid var(--border); padding-bottom: 15px; text-align: left; width: 100%; }
      .timeline-wrap::before { left: 19px; }
      .time-dot { left: -6px; top: 40px; }
      .timeline-wrap { padding-left: 40px; }
      .nav-wrap .btn { display: none; }
      .form-box > form > div:last-child { flex-direction: column; align-items: stretch; text-align: center; gap: 20px; padding: 20px; }
      .form-box > form > div:last-child > div { text-align: center !important; justify-content: center; width: 100%; }
      .form-box > form > div:last-child button { width: 100%; }
    }
  `;

  if (currentView === 'customer') {
    return (
      <>
        <style>{customerCss}</style>
        
        {/* 🔥 Loader แบบ Minimal Architecture */}
        {isSubmitting && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(18,18,18,0.95)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <div style={{ width: '50px', height: '50px', border: '2px solid var(--border)', borderTopColor: 'var(--primary)', animation: 'spin 1s linear infinite', marginBottom: '20px' }}></div>
            <h2 style={{ fontSize: '16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '4px', animation: 'pulse 2s infinite' }}>Processing</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Securing your attendance</p>
            <style>
              {`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
              `}
            </style>
          </div>
        )}

        <div className="bg-pattern"></div>

        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
          <div className="container nav-wrap">
            <a onClick={() => scrollTo('home')} className="logo">
              <div className="logo-mark">V</div> 
              <div>{config.title?.split(' ')[0]}<span style={{fontWeight:300, color: 'var(--primary)'}}> {config.title?.split(' ')[1] || 'SPACES'}</span></div>
            </a>
            <div className="nav-links hidden md:flex">
              <a onClick={() => scrollTo('concept')}>Exhibition</a>
              {config.showVideo && <a onClick={() => scrollTo('video')}>Documentary</a>}
              <a onClick={() => scrollTo('speakers')}>Architects</a>
              <a onClick={() => scrollTo('schedule')}>Agenda</a>
            </div>
            <button className="btn btn-primary hidden md:inline-flex" style={{padding: '10px 24px', fontSize: '11px'}} onClick={() => scrollTo('register')}>BOOK TICKET</button>
          </div>
        </nav>

        <section id="home" className="hero">
          <div className="hero-bg" style={{ backgroundImage: `url(${config.heroBg})` }}></div>
          <div className="container">
            <div className="hero-content reveal">
              <div className="countdown-wrap delay-1">
                <div className="cd-box"><div className="cd-num">{timeLeft.days}</div><div className="cd-label">Days</div></div>
                <div className="cd-box"><div className="cd-num">{timeLeft.hours}</div><div className="cd-label">Hrs</div></div>
                <div className="cd-box"><div className="cd-num">{timeLeft.minutes}</div><div className="cd-label">Mins</div></div>
                <div className="cd-box"><div className="cd-num">{timeLeft.seconds}</div><div className="cd-label">Secs</div></div>
              </div>
              
              <h1 className="glow-text">{config.title} <br/>
                <span className="text-gradient block font-extrabold mt-2 uppercase" style={{fontSize: '32px'}}>
                  {config.subtitle}
                </span>
              </h1>
              
              <p style={{ color: '#e4e4e7', fontSize: '15px', maxWidth: '650px', marginBottom: '40px', fontWeight: 300, lineHeight: 1.8 }} className="delay-1">{config.aboutText}</p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 delay-2">
                <button className="btn btn-primary w-full sm:w-auto" style={{ padding: '16px 36px', fontSize: '13px' }} onClick={() => scrollTo('register')}>RESERVE SEAT</button>
                <div style={{ display: 'flex', gap: '15px', borderLeft: '1px solid var(--primary)', paddingLeft: '15px' }}>
                  <div>
                    <div style={{ color: '#fff', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{config.date}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 400 }}>{config.location}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div style={{ background: 'var(--bg-card)', padding: '50px 0', borderBottom: '1px solid var(--border)' }}>
          <div className="container grid-4" style={{ textAlign: 'center' }}>
            <div><div style={{ fontSize: '36px', fontWeight: 700, color: '#fff', fontFamily: 'monospace' }}>50<span style={{fontSize:'16px', color:'var(--primary)'}}>+</span></div><div style={{ color: 'var(--text-muted)', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px' }}>Global Speakers</div></div>
            <div><div style={{ fontSize: '36px', fontWeight: 700, color: '#fff', fontFamily: 'monospace' }}>20<span style={{fontSize:'16px', color:'var(--primary)'}}>+</span></div><div style={{ color: 'var(--text-muted)', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px' }}>Masterclasses</div></div>
            <div><div style={{ fontSize: '36px', fontWeight: 700, color: '#fff', fontFamily: 'monospace' }}>150<span style={{fontSize:'16px', color:'var(--primary)'}}>+</span></div><div style={{ color: 'var(--text-muted)', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px' }}>Exhibitors</div></div>
            <div><div style={{ fontSize: '36px', fontWeight: 700, color: '#fff', fontFamily: 'monospace' }}>10K<span style={{fontSize:'16px', color:'var(--primary)'}}>+</span></div><div style={{ color: 'var(--text-muted)', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px' }}>Attendees</div></div>
          </div>
        </div>

        {config.showVideo && (
          <section id="video" className="section section-alt">
            <div className="container" style={{ maxWidth: '1000px' }}>
              <div className="sec-header reveal">
                <div className="sec-badge">DOCUMENTARY</div>
                <h2 className="sec-title">{config.videoTitle}</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '10px', fontSize: '14px', fontWeight: 300 }}>{config.videoDesc}</p>
              </div>
              <div className="reveal delay-1">
                <div className="video-wrapper">
                  <iframe src={getValidVideoUrl(config.videoUrl)} title="Video Player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
              </div>
            </div>
          </section>
        )}

        <section id="concept" className="section">
          <div className="container">
            <div className="sec-header reveal">
              <div className="sec-badge">EXHIBITION HALLS</div>
              <h2 className="sec-title">EVENT ZONES</h2>
              <div className="sec-line"></div>
            </div>
            <div className="grid-4 reveal delay-1">
              <div className="concept-card"><div className="concept-icon">📐</div><h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Innovation Expo</h3><p style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 300 }}>โซนจัดแสดงเทคโนโลยีและนวัตกรรมวัสดุจากบริษัทชั้นนำทั่วโลก</p></div>
              <div className="concept-card delay-1"><div className="concept-icon">🏢</div><h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Main Stage</h3><p style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 300 }}>เวทีเสวนาหลักรวบรวมสถาปนิกและนักออกแบบระดับท็อปของอุตสาหกรรม</p></div>
              <div className="concept-card delay-2"><div className="concept-icon">💻</div><h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Masterclasses</h3><p style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 300 }}>กิจกรรมเวิร์กชอปเจาะลึกเทคโนโลยี AI และซอฟต์แวร์ออกแบบร่วมกับผู้เชี่ยวชาญ</p></div>
              <div className="concept-card delay-3"><div className="concept-icon">🍷</div><h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Networking Lounge</h3><p style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 300 }}>พื้นที่พบปะสังสรรค์ เจรจาธุรกิจ และสร้างคอนเนคชันใหม่ๆ ในแวดวง</p></div>
            </div>
          </div>
        </section>

        <section id="speakers" className="section section-alt">
          <div className="container">
            <div className="sec-header reveal">
              <div className="sec-badge">ARCHITECTS & DESIGNERS</div>
              <h2 className="sec-title">พบกับวิทยากรระดับโลก</h2>
              <div className="sec-line"></div>
            </div>
            <div className="grid-4">
              {config.speakers?.map((speaker, i) => (
                <div key={speaker.id} className={`speaker-card reveal delay-${i%4}`} onClick={() => setSelectedSpeaker(speaker)}>
                  <div className="speaker-img-wrap"><img src={speaker.img} alt={speaker.name} className="speaker-img" /><span className="speaker-tag" style={{ background: speaker.color, color: '#fff' }}>{speaker.tag}</span></div>
                  <div className="speaker-info">
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '5px', textTransform: 'uppercase' }}>{speaker.name}</h3>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>{speaker.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="schedule" className="section">
          <div className="container">
            <div className="sec-header reveal">
              <div className="sec-badge">EVENT AGENDA</div>
              <h2 className="sec-title">กำหนดการกิจกรรม</h2>
              <div className="sec-line"></div>
            </div>
            <div className="timeline-wrap reveal delay-1">
              {config.schedule?.map((s) => (
                <div key={s.id} className="time-card">
                  <div className="time-dot" style={{ borderColor: s.color }}></div>
                  <div className="time-left"><div className="time-text" style={{ color: s.color }}>{s.time}</div></div>
                  <div>
                    <div style={{ display: 'inline-block', fontSize: '9px', fontWeight: '700', color: '#121212', background: s.color, padding: '4px 10px', marginBottom: '10px', letterSpacing: '1px', textTransform: 'uppercase' }}>{s.tag}</div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px', textTransform: 'uppercase' }}>{s.title}</h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 300 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div style={{ backgroundImage: `url(${config.sponsorBg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', position: 'relative', padding: '100px 0', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(18, 18, 18, 0.95)' }}></div>
          <div className="container text-center reveal" style={{ position: 'relative', zIndex: 1, marginBottom: '40px' }}>
            <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase' }}>OFFICIAL PARTNERS</h3>
            <div className="sec-line" style={{ marginTop: '15px' }}></div>
          </div>
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <div style={{ display: 'flex', animation: 'marquee 30s linear infinite' }}>
              {config.sponsors?.map(s => <div key={s.id} style={{ fontSize: '28px', fontWeight: 800, color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.3)', margin: '0 40px', textTransform: 'uppercase', letterSpacing: '2px', fontFamily: 'monospace' }}>{s.name}</div>)}
              {config.sponsors?.map(s => <div key={s.id+'dup'} style={{ fontSize: '28px', fontWeight: 800, color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.3)', margin: '0 40px', textTransform: 'uppercase', letterSpacing: '2px', fontFamily: 'monospace' }}>{s.name}</div>)}
            </div>
          </div>
        </div>

        <section id="register" className="section section-alt">
          <div className="container">
            <div className="sec-header reveal">
              <div className="sec-badge">ADMISSION</div>
              <h2 className="sec-title">เลือกระดับการเข้าร่วมงาน</h2>
              <div className="sec-line"></div>
            </div>

            <div className="grid-3 reveal delay-1" style={{ marginBottom: '80px', alignItems: 'end' }}>
              {config.tickets?.map(ticket => (
                <label key={ticket.id} className="ticket-wrapper">
                  <input type="radio" name="ticketId" className="ticket-radio hidden" value={ticket.id} checked={String(formData.ticketId) === String(ticket.id)} onChange={handleInputChange} />
                  <div className="ticket-card">
                    {ticket.badge && <div className="ticket-badge" style={ticket.type === 'vip' ? { background: 'var(--primary)', color: 'var(--bg-dark)' } : {}}>{ticket.badge}</div>}
                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>{ticket.name}</h3>
                    <div style={{ fontSize: '42px', fontWeight: '700', color: ticket.type === 'vip' ? 'var(--primary)' : '#fff', margin: '15px 0 20px', textAlign: 'center', lineHeight: 1, fontFamily: 'monospace' }}>{Number(ticket.price).toLocaleString()} <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 400, fontFamily: 'Inter' }}>THB</span></div>
                    <div style={{ flex: 1, marginBottom: '25px' }}>
                      {ticket.features.split('\n').map((f, i) => (
                        <div key={i} style={{ padding: '10px 0', display: 'flex', gap: '10px', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '13px', color: '#d4d4d8', fontWeight: 300 }}>
                          <span style={{ color: ticket.type === 'vip' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 700 }}>+</span> {f}
                        </div>
                      ))}
                    </div>
                    <div className="btn" style={{ width: '100%', background: String(formData.ticketId) === String(ticket.id) ? 'var(--primary)' : 'transparent', color: String(formData.ticketId) === String(ticket.id) ? 'var(--bg-dark)' : '#fff', border: String(formData.ticketId) === String(ticket.id) ? '1px solid var(--primary)' : '1px solid var(--border)' }}>
                      {String(formData.ticketId) === String(ticket.id) ? 'SELECTED' : 'SELECT PASS'}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="form-box-wrapper reveal">
              <div className="form-box">
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '30px', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  <span style={{ width: '30px', height: '30px', background: 'var(--primary)', color: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>📝</span> Registration
                </h3>
                <form onSubmit={handleRegisterSubmit}>
                  <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div className="form-group mb-0"><label>ชื่อ-นามสกุล (Full Name) *</label><input type="text" name="name" className="form-input" required value={formData.name} onChange={handleInputChange} placeholder="John Doe" /></div>
                    <div className="form-group mb-0"><label>อีเมล (Email) *</label><input type="email" name="email" className="form-input" required value={formData.email} onChange={handleInputChange} placeholder="john@example.com" /></div>
                  </div>
                  <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div className="form-group mb-0"><label>เบอร์โทรศัพท์ (Phone) *</label><input type="tel" name="phone" className="form-input" required value={formData.phone} onChange={handleInputChange} placeholder="089-XXX-XXXX" /></div>
                    <div className="form-group mb-0"><label>องค์กร / สตูดิโอ (Company)</label><input type="text" name="company" className="form-input" value={formData.company} onChange={handleInputChange} placeholder="Company Name" /></div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', padding: '25px', marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                      <div style={{ fontSize:'11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '5px' }}>🎟️ {selectedTicket?.name || '-'} (1 PASS)</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: 400 }}>Subtotal: {subtotal.toLocaleString()} ฿ | VAT 7%: {vat.toLocaleString()} ฿</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '1px' }}>Total Amount</div>
                        <div style={{ fontSize: '28px', fontWeight: '700', color: '#fff', lineHeight: 1, fontFamily: 'monospace' }}>{total.toLocaleString()} <span style={{ fontSize: '12px', fontWeight: 400, fontFamily: 'Inter' }}>฿</span></div>
                      </div>
                      <button type="submit" className="btn btn-primary w-full sm:w-auto" style={{ padding: '14px 28px', fontSize: '13px' }} disabled={isSubmitting}>
                        PAY SECURELY
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="sec-header reveal">
              <div className="sec-badge">INFORMATION</div>
              <h2 className="sec-title">คำถามที่พบบ่อย (FAQ)</h2>
            </div>
            <div className="reveal delay-1">
              {config.faqs?.map(faq => (
                <div key={faq.id} className={`faq-item ${activeFaq === faq.id ? 'active' : ''}`} onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}>
                  <div className="faq-q">{faq.q} <span>{activeFaq === faq.id ? '−' : '+'}</span></div>
                  <div className="faq-a">{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer style={{ background: '#0a0a0a', padding: '60px 0 30px', borderTop: '1px solid var(--border)' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '30px', marginBottom: '30px' }}>
            <div>
              <div className="logo" style={{ marginBottom: '15px', fontSize: '20px' }}><div className="logo-mark" style={{ width:'28px', height:'28px', fontSize:'14px' }}>V</div> {config.title}</div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '300px', lineHeight: 1.6, fontWeight: 400 }}>{config.aboutText.substring(0, 80)}...</p>
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '15px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact Us</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 400 }}>✉️ {config.contactEmail}</p>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 400 }}>📞 {config.contactPhone}</p>
            </div>
          </div>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
            <p style={{ fontSize: '11px', color: '#52525b', fontWeight: 400 }}>© 2026 {config.title}. All rights reserved.</p>
            <div onClick={() => setCurrentView('admin')} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#52525b', fontSize: '10px', cursor: 'pointer', fontWeight: 600, transition: '0.3s', letterSpacing: '1px', textTransform: 'uppercase' }} onMouseOver={e => e.currentTarget.style.color='var(--primary)'} onMouseOut={e => e.currentTarget.style.color='#52525b'}>
              EVENT PLATFORM (ADMIN)
            </div>
          </div>
        </footer>

        {/* Modals */}
        {selectedSpeaker && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(18,18,18,0.95)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, padding: '20px' }} onClick={() => setSelectedSpeaker(null)}>
            <div className="glass" style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: window.innerWidth < 768 ? 'column' : 'row', overflow: 'hidden', position: 'relative', maxHeight: '90vh', overflowY: 'auto', border: '1px solid var(--border)' }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedSpeaker(null)} style={{ position:'absolute', top:'15px', right:'15px', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', width: '35px', height: '35px', color:'#fff', cursor:'pointer', zIndex:10, fontWeight: '300', fontSize: '14px' }}>✕</button>
              <div style={{ flex: '1', minHeight: window.innerWidth < 768 ? '250px' : '400px' }}><img src={selectedSpeaker.img} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(50%) contrast(1.1)' }} alt="speaker" /></div>
              <div style={{ flex: '1.2', padding: window.innerWidth < 768 ? '30px' : '50px', background: 'var(--bg-card)' }}>
                <span style={{ display: 'inline-block', border: '1px solid ' + selectedSpeaker.color, color: selectedSpeaker.color, padding: '4px 12px', fontSize: '9px', fontWeight: 700, letterSpacing: '1px', marginBottom: '15px', textTransform: 'uppercase' }}>{selectedSpeaker.tag}</span>
                <h3 style={{ fontSize: window.innerWidth < 768 ? '24px' : '32px', fontWeight: 800, margin: '0 0 10px', color: '#fff', textTransform: 'uppercase' }}>{selectedSpeaker.name}</h3>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '20px', letterSpacing: '1px', textTransform: 'uppercase' }}>{selectedSpeaker.role}</div>
                <div style={{ width: '40px', height: '2px', background: 'var(--primary)', marginBottom: '20px' }}></div>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '14px', fontWeight: 300 }}>{selectedSpeaker.desc}</p>
              </div>
            </div>
          </div>
        )}

        {ticketModal.isOpen && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(18,18,18,0.95)', backdropFilter: 'blur(15px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, padding: '20px' }}>
            <div className="glow-box" style={{ background: 'var(--bg-card)', border: '1px solid var(--primary)', width: '100%', maxWidth: '400px', padding: '40px 30px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ width: '50px', height: '50px', background: 'transparent', color: 'var(--primary)', border: '1px solid var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 15px', fontWeight: 400 }}>✓</div>
              <h2 style={{ marginBottom: '10px', color: '#fff', fontSize: '20px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Registration Confirmed</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '25px', fontWeight: 400 }}>ระบบส่ง E-TICKET ไปยังอีเมลของท่านเรียบร้อยแล้ว</p>
              
              <div style={{ background: '#fff', padding: '15px', display: 'inline-block', margin: '0 auto 25px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}><img src={ticketModal.qrUrl} alt="QR" width="150" style={{ display: 'block' }} /></div>
              
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', marginBottom: '25px', border: '1px solid var(--border)', textAlign: 'center' }}>
                <div>
                  <div style={{ fontSize: '9px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Guest Name</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '10px', wordBreak: 'break-all', textTransform: 'uppercase' }}>{ticketModal.name}</div>
                  <div style={{ fontSize: '9px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Access Type</div>
                  <div style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 700, marginTop: '2px', textTransform: 'uppercase', wordBreak: 'break-all' }}>{ticketModal.tier || 'UNKNOWN PASS'}</div>
                </div>
              </div>
              
              <button className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '13px' }} onClick={() => setTicketModal({ isOpen: false, name: '', tier: '', qrUrl: '' })}>CLOSE WINDOW</button>
            </div>
          </div>
        )}
      </>
    );
  }

  // ==========================================
  // RENDER: ADMIN VIEW (MODERN DASHBOARD)
  // ==========================================
  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      
      <div className="flex flex-col md:flex-row h-screen bg-[#0a0a0a] text-slate-200 font-sans overflow-hidden selection:bg-blue-500/30">
        
        {/* Mobile Admin Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-[#121212] border-b border-white/5 relative z-50 shadow-md">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 flex items-center justify-center text-black font-bold text-sm" style={{ background: config.primaryColor || '#D4AF37' }}>V</div>
             <span className="font-bold text-white uppercase tracking-wider text-xs">Event Platform</span>
           </div>
           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
           </button>
        </div>

        {/* Sidebar */}
        <aside className={`fixed md:relative z-40 w-72 h-[calc(100vh-65px)] md:h-full bg-[#121212] border-r border-white/5 flex flex-col shadow-2xl transition-transform transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          
          <div className="hidden md:flex p-6 border-b border-white/5 items-center gap-4 cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setCurrentView('customer')}>
            <div className="w-10 h-10 flex items-center justify-center text-black font-bold text-lg shadow-lg" style={{ background: config.primaryColor || '#D4AF37' }}>V</div>
            <div>
              <h1 className="font-bold text-white text-sm tracking-widest uppercase">Dashboard</h1>
              <span className="text-[9px] text-emerald-400 font-medium flex items-center gap-1.5 mt-1 uppercase tracking-widest"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online</span>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-3 px-3">Management</div>
            <button onClick={() => {setAdminTab('dashboard'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-medium transition-all ${adminTab === 'dashboard' ? 'bg-white/10 text-white shadow-sm border-l-2 border-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'}`}>
              <span className="text-base opacity-80">📊</span> Live Analytics
            </button>
            <button onClick={() => {setAdminTab('users'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-medium transition-all ${adminTab === 'users' ? 'bg-white/10 text-white shadow-sm border-l-2 border-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'}`}>
              <span className="text-base opacity-80">📋</span> Attendee List
            </button>
            <button onClick={() => {setAdminTab('scanner'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-medium transition-all ${adminTab === 'scanner' ? 'bg-white/10 text-white shadow-sm border-l-2 border-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'}`}>
              <span className="text-base opacity-80">📷</span> Event Check-In
            </button>
            
            <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-3 px-3 mt-8">Configuration</div>
            <button onClick={() => {setAdminTab('settings'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-medium transition-all ${adminTab === 'settings' ? 'bg-white/10 text-white shadow-sm border-l-2 border-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'}`}>
              <span className="text-base opacity-80">⚙️</span> Event Config
            </button>
            <button onClick={() => {setAdminTab('schedule'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-medium transition-all ${adminTab === 'schedule' ? 'bg-white/10 text-white shadow-sm border-l-2 border-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'}`}>
              <span className="text-base opacity-80">⏱️</span> Schedule
            </button>
            <button onClick={() => {setAdminTab('speakers'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-medium transition-all ${adminTab === 'speakers' ? 'bg-white/10 text-white shadow-sm border-l-2 border-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'}`}>
              <span className="text-base opacity-80">🎤</span> Speakers & VIPs
            </button>
            <button onClick={() => {setAdminTab('tickets'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-medium transition-all ${adminTab === 'tickets' ? 'bg-white/10 text-white shadow-sm border-l-2 border-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'}`}>
              <span className="text-base opacity-80">🎟️</span> Tickets
            </button>
          </nav>

          <div className="p-4 border-t border-white/5 bg-[#121212]">
            <button onClick={() => setCurrentView('customer')} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider transition-all border border-white/10">
              ← View Live Site
            </button>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isMobileMenuOpen && <div className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>}

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto relative" style={{ backgroundColor: '#0a0a0a', backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          
          {adminTab === 'dashboard' && (
            <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight uppercase">Live Analytics</h2>
                  <p className="text-zinc-500 text-[10px] md:text-xs mt-1 uppercase tracking-widest">Real-time Event Data</p>
                </div>
                <button onClick={() => syncWithGoogleSheet()} disabled={isSyncing} className="w-full sm:w-auto px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-white/10">
                  <span className={isSyncing ? "animate-spin" : ""}>🔄</span> {isSyncing ? "SYNCING..." : "FORCE SYNC"}
                </button>
              </div>

              {/* Bento Grid Stats - No Truncate, Allow break-words */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                <div className="bg-[#121212] border border-white/5 p-6 md:p-8 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                  <div className="text-xl md:text-2xl mb-4 md:mb-6 opacity-80">👥</div>
                  <p className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1 md:mb-2">Total Attendees</p>
                  <div className="text-3xl lg:text-4xl font-bold text-white break-words font-mono">{registrations.length}</div>
                </div>
                <div className="bg-[#121212] border border-white/5 p-6 md:p-8 relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                  <div className="text-xl md:text-2xl mb-4 md:mb-6 opacity-80">💰</div>
                  <p className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1 md:mb-2">Net Revenue</p>
                  <div className="text-2xl lg:text-3xl font-bold text-white font-mono break-words leading-tight">฿{totalRevenueNum.toLocaleString()}</div>
                </div>
                <div className="bg-[#121212] border border-white/5 p-6 md:p-8 relative overflow-hidden group hover:border-amber-500/30 transition-colors">
                  <div className="text-xl md:text-2xl mb-4 md:mb-6 opacity-80">🏆</div>
                  <p className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1 md:mb-2">Top Ticket</p>
                  <div className="text-lg lg:text-xl font-bold text-white mt-1 uppercase break-words leading-tight">{topTicket?.name || '-'}</div>
                </div>
                <div className="bg-[#121212] border border-white/5 p-6 md:p-8 relative overflow-hidden group hover:border-pink-500/30 transition-colors">
                  <div className="text-xl md:text-2xl mb-4 md:mb-6 opacity-80">📊</div>
                  <p className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1 md:mb-2">Avg. Ticket Value</p>
                  <div className="text-2xl lg:text-3xl font-bold text-white font-mono break-words leading-tight">฿{avgOrderValue.toLocaleString()}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="lg:col-span-1 bg-[#121212] p-6 md:p-8 border border-white/5">
                  <h3 className="text-sm md:text-base font-bold text-white mb-6 uppercase tracking-wide">Ticket Allocation</h3>
                  <div className="space-y-5">
                    {ticketStats.map((t, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-[10px] md:text-[11px] font-semibold mb-2 uppercase">
                          <span className="text-zinc-400 break-words pr-2">{t.name}</span>
                          <span className="text-white flex-shrink-0">{t.count} <span className="text-zinc-600 font-normal">({t.percent}%)</span></span>
                        </div>
                        <div className="w-full h-1 bg-white/10 overflow-hidden">
                          <div className={`h-full transition-all duration-1000 ${i===0?'bg-blue-500':i===1?'bg-emerald-500':'bg-amber-500'}`} style={{ width: `${t.percent}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2 bg-[#121212] p-6 md:p-8 border border-white/5 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-wide">Recent Registrations</h3>
                    <button onClick={() => setAdminTab('users')} className="text-[9px] font-bold text-zinc-400 hover:text-white uppercase tracking-widest bg-white/5 px-3 py-1.5 transition-colors">View All →</button>
                  </div>
                  {registrations.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 text-xs md:text-sm py-12 border border-dashed border-white/10">
                      NO DATA YET
                    </div>
                  ) : (
                    <div className="space-y-2 flex-1 overflow-x-auto">
                      {registrations.slice(0, 5).map(r => (
                        <div key={r.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-transparent border border-white/5 hover:bg-white/[0.02] transition-colors gap-3 sm:gap-0 min-w-[300px]">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="text-zinc-600 text-[9px] md:text-[10px] w-12 md:w-16 flex-shrink-0 font-mono">#{r.id.toString().slice(-6)}</div>
                            <div>
                              <div className="font-semibold text-white text-xs uppercase break-words max-w-[150px] md:max-w-[200px]">{r.name}</div>
                              <div className="text-[9px] text-zinc-500 uppercase tracking-wider break-words max-w-[150px] md:max-w-[200px]">{r.company || r.email}</div>
                            </div>
                          </div>
                          <div className="flex sm:justify-end items-center gap-3 md:gap-4 ml-14 sm:ml-0">
                            {r.status === 'Checked In' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] flex-shrink-0"></span>}
                            <span className="inline-block px-2 py-1 text-[8px] font-semibold bg-white/5 text-zinc-300 uppercase tracking-wider border border-white/10 break-words text-center max-w-[100px] md:max-w-[120px]">{r.ticketName || 'UNKNOWN PASS'}</span>
                            <div className="text-xs font-semibold text-emerald-400 font-mono w-16 md:w-24 text-right flex-shrink-0">฿{Number(r.totalPaid).toLocaleString()}</div>
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
             <div className="max-w-4xl mx-auto space-y-6 relative z-10">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-6">
                 <div>
                   <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight uppercase">Event Check-In</h2>
                   <p className="text-zinc-500 text-[10px] md:text-xs mt-1 uppercase tracking-widest">Scan QR or Barcode</p>
                 </div>
               </div>

               <div className="bg-[#121212] border border-white/5 p-4 md:p-8 shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[400px]">
                 
                 <div className="flex justify-center gap-4 mb-6 md:mb-8 relative z-10 w-full sm:w-auto">
                    <button onClick={() => setIsScanning(!isScanning)} className={`w-full sm:w-auto px-5 py-3 text-white text-[10px] font-bold uppercase tracking-wider transition-all border shadow-lg ${isScanning ? 'bg-red-600 hover:bg-red-700 border-red-600' : 'bg-transparent hover:bg-white/5 border-white/20'}`}>
                      {isScanning ? '🛑 Close Camera' : '📷 Open Camera Scanner'}
                    </button>
                 </div>

                 {isScanning && (
                   <div id="qr-reader" className="w-full max-w-sm mx-auto overflow-hidden border border-white/20 mb-8 bg-black"></div>
                 )}

                 <div className="relative z-10 w-full max-w-md">
                   {scanResult && (
                     <div className={`mb-8 p-6 border ${scanResult.type === 'success' ? 'bg-emerald-900/10 border-emerald-500/30' : scanResult.type === 'duplicate' ? 'bg-amber-900/10 border-amber-500/30' : 'bg-red-900/10 border-red-500/30'} shadow-xl transition-all`}>
                       <div className={`text-4xl md:text-5xl mb-4 ${scanResult.type === 'success' ? 'text-emerald-500' : scanResult.type === 'duplicate' ? 'text-amber-500' : 'text-red-500'}`}>
                         {scanResult.type === 'success' ? '✅' : scanResult.type === 'duplicate' ? '⚠️' : '❌'}
                       </div>
                       <h3 className="text-lg md:text-xl font-bold text-white uppercase mb-2 leading-tight">{scanResult.message}</h3>
                       
                       {scanResult.user && (
                         <div className="mt-5 pt-5 border-t border-white/5 text-left bg-black/20 p-4 md:p-5">
                           <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Guest Name</div>
                           <div className="text-lg font-bold text-white uppercase mb-4 break-words">{scanResult.user.name}</div>
                           
                           <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Ticket Type</div>
                           <div className={`text-xs font-bold uppercase px-3 py-1 inline-block border ${scanResult.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>{scanResult.user.ticketName || 'UNKNOWN PASS'}</div>
                           
                           <div className="text-[9px] text-zinc-500 uppercase tracking-widest mt-4 mb-1">Contact</div>
                           <div className="text-xs text-zinc-300 break-all font-mono">{scanResult.user.phone || '-'}</div>

                           <button onClick={() => printBadge(scanResult.user)} className="mt-6 w-full py-3 bg-transparent border border-white/20 hover:bg-white/5 text-white text-[10px] font-bold uppercase tracking-widest transition-all">
                             🖨️ PRINT BADGE (NO QR)
                           </button>
                         </div>
                       )}
                     </div>
                   )}

                   <form onSubmit={(e) => { e.preventDefault(); processScan(scanQuery); setScanQuery(''); }} className="relative">
                     <label className="block text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 md:mb-3">USB / Bluetooth Scanner</label>
                     <input 
                       ref={scannerInputRef}
                       type="text" 
                       value={scanQuery}
                       onChange={e => setScanQuery(e.target.value)}
                       autoFocus
                       placeholder="CLICK TO SCAN..." 
                       className="w-full p-4 md:p-5 bg-[#050505] border border-white/10 focus:border-primary text-center text-xs md:text-sm text-white outline-none transition-all uppercase tracking-widest"
                     />
                   </form>
                 </div>
               </div>
             </div>
          )}

          {adminTab === 'users' && (
             <div className="max-w-7xl mx-auto space-y-4 md:space-y-6 relative z-10">
               <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4 md:mb-6 uppercase">Attendee List</h2>
               <div className="bg-[#121212] border border-white/5 overflow-hidden">
                 {registrations.length === 0 ? (
                   <div className="text-center py-20 text-zinc-600 text-xs md:text-sm uppercase tracking-widest">Awaiting Entries...</div>
                 ) : (
                   <div className="overflow-x-auto">
                     <table className="w-full text-left border-collapse min-w-[750px]">
                       <thead>
                         <tr className="bg-white/5 border-b border-white/5 text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                           <th className="py-4 px-4 md:py-5 md:px-6">Guest Info</th>
                           <th className="py-4 px-4 md:py-5 md:px-6">Comms</th>
                           <th className="py-4 px-4 md:py-5 md:px-6">Ticket Type</th>
                           <th className="py-4 px-4 md:py-5 md:px-6 text-center">Status</th>
                           <th className="py-4 px-4 md:py-5 md:px-6 text-center">Action</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5 text-xs">
                         {registrations.map(r => (
                           <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                             {editingUserId === r.id ? (
                               <>
                                 <td className="py-4 px-4 md:px-6 space-y-2">
                                   <input className="w-full p-2 bg-black border border-white/10 text-xs text-white font-semibold uppercase focus:border-primary outline-none" value={editUserForm.name} onChange={e => setEditUserForm({...editUserForm, name: e.target.value})} placeholder="Name" />
                                   <input className="w-full p-2 bg-black border border-white/10 text-[10px] text-white uppercase focus:border-primary outline-none" value={editUserForm.company} onChange={e => setEditUserForm({...editUserForm, company: e.target.value})} placeholder="Company" />
                                 </td>
                                 <td className="py-4 px-4 md:px-6 space-y-2">
                                   <input className="w-full p-2 bg-black border border-white/10 text-[10px] text-zinc-300 focus:border-primary outline-none" value={editUserForm.email} onChange={e => setEditUserForm({...editUserForm, email: e.target.value})} placeholder="Email" />
                                   <input className="w-full p-2 bg-black border border-white/10 text-[10px] text-zinc-300 focus:border-primary outline-none" value={editUserForm.phone} onChange={e => setEditUserForm({...editUserForm, phone: e.target.value})} placeholder="Phone" />
                                 </td>
                                 <td className="py-4 px-4 md:px-6">
                                    <select className="w-full p-2 bg-black border border-white/10 text-[10px] text-white uppercase focus:border-primary outline-none" value={editUserForm.ticketName || ''} onChange={e => setEditUserForm({...editUserForm, ticketName: e.target.value})}>
                                      <option value="">-- Select Ticket --</option>
                                      {config.tickets?.map(t => (
                                        <option key={t.id} value={t.name}>{t.name}</option>
                                      ))}
                                    </select>
                                 </td>
                                 <td className="py-4 px-4 md:px-6 text-center">
                                    <select className="bg-black border border-white/10 text-[10px] text-white p-2 outline-none uppercase font-semibold" value={editUserForm.status || 'Pending'} onChange={e => setEditUserForm({...editUserForm, status: e.target.value})}>
                                      <option value="Pending">Pending</option>
                                      <option value="Checked In">Checked In</option>
                                    </select>
                                 </td>
                                 <td className="py-4 px-4 md:px-6 text-center space-x-1 md:space-x-2 whitespace-nowrap">
                                   <button onClick={saveUserEdit} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] font-semibold uppercase tracking-wider transition-colors">Save</button>
                                   <button onClick={() => setEditingUserId(null)} className="px-3 py-1.5 bg-transparent hover:bg-white/10 text-white text-[9px] font-semibold uppercase tracking-wider border border-white/20 transition-colors">Cancel</button>
                                 </td>
                               </>
                             ) : (
                               <>
                                 <td className="py-4 md:py-5 px-4 md:px-6 max-w-[200px]">
                                   <div className="font-semibold text-white text-xs uppercase break-words">{r.name}</div>
                                   <div className="text-[9px] text-zinc-500 font-medium mt-1 uppercase tracking-wider truncate">{r.company || '-'}</div>
                                 </td>
                                 <td className="py-4 md:py-5 px-4 md:px-6 max-w-[150px]">
                                   <div className="text-zinc-300 text-[10px] truncate">{r.email}</div>
                                   <div className="text-[9px] text-zinc-600 mt-1 font-mono">{r.phone}</div>
                                 </td>
                                 <td className="py-4 md:py-5 px-4 md:px-6 max-w-[150px]">
                                   <span className="px-2 md:px-3 py-1 text-[8px] font-medium bg-white/5 text-zinc-300 border border-white/10 uppercase tracking-widest break-words inline-block text-center">{r.ticketName || 'UNKNOWN PASS'}</span>
                                 </td>
                                 <td className="py-4 md:py-5 px-4 md:px-6 text-center">
                                    {r.status === 'Checked In' ? (
                                       <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[8px] font-semibold uppercase tracking-wider">Checked In</span>
                                    ) : (
                                       <span className="px-2 py-1 bg-transparent text-zinc-500 border border-white/10 text-[8px] font-semibold uppercase tracking-wider">Pending</span>
                                    )}
                                 </td>
                                 <td className="py-4 md:py-5 px-4 md:px-6 text-center space-x-1 md:space-x-2 whitespace-nowrap">
                                   <button onClick={() => printBadge(r)} className="px-2 md:px-3 py-1 text-blue-400 hover:text-white bg-transparent border border-white/20 font-semibold text-[8px] uppercase tracking-wider transition-colors" title="Print Badge">Print</button>
                                   <button onClick={() => startEditUser(r)} className="px-2 md:px-3 py-1 text-zinc-400 hover:text-white bg-transparent border border-white/10 font-semibold text-[8px] uppercase tracking-wider transition-colors" title="Edit">Edit</button>
                                   <button onClick={() => deleteUser(r.id)} className="px-2 md:px-3 py-1 text-rose-500 hover:text-white bg-transparent border border-white/10 font-semibold text-[8px] uppercase tracking-wider transition-colors" title="Delete">Del</button>
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
            <div className="max-w-5xl mx-auto space-y-6 relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight uppercase">Event Config</h2>
                <button onClick={handleSaveConfig} className="w-full sm:w-auto px-6 md:px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold uppercase text-[10px] md:text-xs tracking-widest shadow-sm transition-all">
                  💾 SAVE CONFIG
                </button>
              </div>

              {/* BACKGROUND IMAGES SETTING */}
              <div className="bg-[#121212] p-6 md:p-8 border border-white/5 shadow-sm space-y-6">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="text-base md:text-lg font-bold text-white uppercase">🖼️ Background Images</h3>
                  <p className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest mt-1">ใส่ลิงก์รูปภาพ (URL) สำหรับเปลี่ยนพื้นหลังเว็บ</p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  <div className="space-y-1.5 md:space-y-2">
                    <label className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Hero Background</label>
                    <input type="text" value={config.heroBg} onChange={(e) => setConfig({...config, heroBg: e.target.value})} placeholder="https://..." className="w-full p-3 bg-black border border-white/10 text-xs text-zinc-300 focus:border-primary outline-none" />
                  </div>
                  <div className="space-y-1.5 md:space-y-2">
                    <label className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Sponsors Background</label>
                    <input type="text" value={config.sponsorBg} onChange={(e) => setConfig({...config, sponsorBg: e.target.value})} placeholder="https://..." className="w-full p-3 bg-black border border-white/10 text-xs text-zinc-300 focus:border-primary outline-none" />
                  </div>
                </div>
              </div>

              {/* VIDEO ON DEMAND SETTINGS */}
              <div className="bg-[#121212] p-6 md:p-8 border border-white/5 shadow-sm space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <h3 className="text-base md:text-lg font-bold text-white uppercase">🎬 VOD Highlight</h3>
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" className="sr-only" checked={config.showVideo} onChange={(e) => setConfig({...config, showVideo: e.target.checked})} />
                      <div className={`block w-10 h-5 transition-colors border border-white/10 ${config.showVideo ? 'bg-emerald-600' : 'bg-black'}`}></div>
                      <div className={`dot absolute left-1 top-1 w-3 h-3 transition-transform ${config.showVideo ? 'bg-white transform translate-x-5' : 'bg-zinc-600'}`}></div>
                    </div>
                    <span className="ml-3 text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{config.showVideo ? 'LIVE' : 'OFFLINE'}</span>
                  </label>
                </div>
                
                {config.showVideo && (
                  <div className="grid grid-cols-1 gap-4 md:gap-6">
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Video Title</label>
                      <input type="text" value={config.videoTitle} onChange={(e) => setConfig({...config, videoTitle: e.target.value})} className="w-full p-3 bg-black border border-white/10 text-xs font-semibold text-white focus:border-primary outline-none uppercase" />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest">YouTube Video Link</label>
                      <input type="text" value={config.videoUrl} onChange={(e) => setConfig({...config, videoUrl: e.target.value})} className="w-full p-3 bg-black border border-white/10 text-xs text-primary font-mono focus:border-primary outline-none" />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Description</label>
                      <textarea value={config.videoDesc} onChange={(e) => setConfig({...config, videoDesc: e.target.value})} className="w-full p-3 bg-black border border-white/10 text-xs text-zinc-300 focus:border-primary outline-none" rows="3"></textarea>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-[#121212] p-6 md:p-8 border border-white/5 shadow-sm space-y-6 md:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6 bg-white/5 border border-white/10">
                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Primary Color</label>
                        <div className="flex gap-2 md:gap-3">
                            <input type="color" value={config.primaryColor} onChange={(e) => setConfig({...config, primaryColor: e.target.value})} className="w-10 h-10 bg-black border border-white/10 cursor-pointer p-1 flex-shrink-0" />
                            <input type="text" value={config.primaryColor} onChange={(e) => setConfig({...config, primaryColor: e.target.value})} className="flex-1 p-2.5 bg-black border border-white/10 text-xs font-semibold text-white uppercase outline-none" />
                        </div>
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Secondary Color</label>
                        <div className="flex gap-2 md:gap-3">
                            <input type="color" value={config.secondaryColor} onChange={(e) => setConfig({...config, secondaryColor: e.target.value})} className="w-10 h-10 bg-black border border-white/10 cursor-pointer p-1 flex-shrink-0" />
                            <input type="text" value={config.secondaryColor} onChange={(e) => setConfig({...config, secondaryColor: e.target.value})} className="flex-1 p-2.5 bg-black border border-white/10 text-xs font-semibold text-white uppercase outline-none" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <div className="space-y-1.5 md:space-y-2"><label className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Event Title</label><input type="text" value={config.title} onChange={(e) => setConfig({...config, title: e.target.value})} className="w-full p-3 bg-black border border-white/10 text-xs font-semibold text-white focus:border-primary outline-none uppercase" /></div>
                  <div className="space-y-1.5 md:space-y-2"><label className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Subtitle / Tagline</label><input type="text" value={config.subtitle} onChange={(e) => setConfig({...config, subtitle: e.target.value})} className="w-full p-3 bg-black border border-white/10 text-xs text-white focus:border-primary outline-none font-semibold" /></div>
                  <div className="space-y-1.5 md:space-y-2"><label className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Event Date</label><input type="text" value={config.date} onChange={(e) => setConfig({...config, date: e.target.value})} className="w-full p-3 bg-black border border-white/10 text-xs font-semibold text-white focus:border-primary outline-none uppercase" /></div>
                  <div className="space-y-1.5 md:space-y-2"><label className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Countdown Target</label><input type="datetime-local" value={config.targetDate?.slice(0,16)} onChange={(e) => setConfig({...config, targetDate: e.target.value + ":00"})} className="w-full p-3 bg-black border border-white/10 text-xs font-mono text-zinc-300 focus:border-primary outline-none [color-scheme:dark]" /></div>
                  <div className="md:col-span-2 space-y-1.5 md:space-y-2"><label className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Location</label><input type="text" value={config.location} onChange={(e) => setConfig({...config, location: e.target.value})} className="w-full p-3 bg-black border border-white/10 text-xs font-semibold text-white focus:border-primary outline-none uppercase" /></div>
                  <div className="md:col-span-2 space-y-1.5 md:space-y-2"><label className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Description</label><textarea value={config.aboutText} onChange={(e) => setConfig({...config, aboutText: e.target.value})} className="w-full p-3 bg-black border border-white/10 text-xs text-zinc-300 focus:border-primary outline-none" rows="4"></textarea></div>
                </div>
              </div>
            </div>
          )}

          {adminTab === 'speakers' && (
            <div className="max-w-6xl mx-auto space-y-6 relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight uppercase">Speakers & VIPs</h2>
                <button onClick={handleSaveConfig} className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold uppercase text-[10px] tracking-widest shadow-sm transition-all">
                  💾 SAVE CONFIG
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {config.speakers?.map(speaker => (
                  <div key={speaker.id} className="bg-[#121212] p-6 md:p-8 border border-white/5 relative shadow-sm">
                    <button onClick={() => removeArrayItem('speakers', speaker.id)} className="absolute top-4 right-4 px-3 py-1.5 bg-transparent border border-rose-500/50 text-rose-500 text-[9px] font-bold uppercase hover:bg-rose-500/10 transition-all">Delete</button>
                    <div className="flex flex-col sm:flex-row gap-4 items-start mb-6">
                      <img src={speaker.img} className="w-20 h-20 object-cover border border-white/10" alt="speaker" />
                      
                      <div className="flex-1 w-full space-y-2">
                        <div className="space-y-1">
                          <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Image URL</label>
                          <input type="text" value={speaker.img} onChange={(e) => handleArrayChange('speakers', speaker.id, 'img', e.target.value)} className="w-full p-2 bg-black border border-white/10 text-[10px] font-mono text-blue-400 focus:border-primary outline-none" placeholder="https://..." />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Or Upload File</label>
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'speakers', speaker.id)} className="w-full text-[10px] text-zinc-400 file:mr-2 file:py-1 file:px-3 file:border-0 file:text-[9px] file:font-semibold file:uppercase file:bg-white/5 file:text-white hover:file:bg-white/10 cursor-pointer" />
                        </div>
                      </div>

                    </div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input type="text" value={speaker.name} onChange={(e) => handleArrayChange('speakers', speaker.id, 'name', e.target.value)} className="w-full p-2.5 bg-black border border-white/10 text-xs font-semibold uppercase text-white focus:border-primary outline-none" placeholder="Name" />
                        <input type="text" value={speaker.role} onChange={(e) => handleArrayChange('speakers', speaker.id, 'role', e.target.value)} className="w-full p-2.5 bg-black border border-white/10 text-[10px] font-medium uppercase text-zinc-400 focus:border-primary outline-none" placeholder="Role/Company" />
                      </div>
                      <div className="flex gap-3">
                         <input type="text" value={speaker.tag} onChange={(e) => handleArrayChange('speakers', speaker.id, 'tag', e.target.value)} className="flex-1 p-2.5 bg-black border border-white/10 text-[10px] font-semibold text-white uppercase focus:border-primary outline-none" placeholder="Category" />
                         <input type="color" value={speaker.color} onChange={(e) => handleArrayChange('speakers', speaker.id, 'color', e.target.value)} className="w-10 h-9 bg-black border border-white/10 cursor-pointer p-0.5" />
                      </div>
                      <textarea value={speaker.desc} onChange={(e) => handleArrayChange('speakers', speaker.id, 'desc', e.target.value)} className="w-full p-3 bg-black border border-white/10 text-[10px] text-zinc-400 focus:border-primary outline-none" rows="3" placeholder="Biography..."></textarea>
                    </div>
                  </div>
                ))}
                <button onClick={addSpeaker} className="min-h-[150px] border border-dashed border-white/20 hover:border-primary text-zinc-500 hover:text-primary font-semibold text-xs uppercase transition-all flex flex-col items-center justify-center gap-2 bg-transparent p-6">
                  <span className="text-3xl">+</span> Add Speaker
                </button>
              </div>
            </div>
          )}

          {adminTab === 'schedule' && (
            <div className="max-w-4xl mx-auto space-y-6 relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight uppercase">Event Schedule</h2>
                <button onClick={handleSaveConfig} className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold uppercase text-[10px] tracking-widest shadow-sm transition-all">
                  💾 SAVE CONFIG
                </button>
              </div>
              <div className="space-y-4">
                {config.schedule?.map(s => (
                  <div key={s.id} className="bg-[#121212] p-6 border border-white/5 flex flex-col sm:flex-row gap-4 md:gap-6 relative group shadow-sm">
                    <button onClick={() => removeArrayItem('schedule', s.id)} className="absolute top-4 right-4 md:opacity-0 group-hover:opacity-100 px-3 py-1.5 bg-transparent border border-rose-500/50 text-rose-500 text-[9px] font-bold uppercase transition-all">Delete</button>
                    <div className="w-full sm:w-24 flex sm:flex-col gap-3">
                      <input type="text" value={s.time} onChange={(e) => handleArrayChange('schedule', s.id, 'time', e.target.value)} className="w-full p-3 bg-black border border-white/10 text-center font-bold text-lg text-white focus:border-primary outline-none" />
                      <input type="color" value={s.color} onChange={(e) => handleArrayChange('schedule', s.id, 'color', e.target.value)} className="w-12 sm:w-full h-12 sm:h-8 bg-black border border-white/10 cursor-pointer p-0.5 flex-shrink-0" />
                    </div>
                    <div className="flex-1 space-y-3 sm:pr-8">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input type="text" value={s.tag} onChange={(e) => handleArrayChange('schedule', s.id, 'tag', e.target.value)} className="w-full sm:w-28 p-2.5 bg-black border border-white/10 text-[9px] font-bold text-zinc-400 uppercase tracking-widest focus:border-primary outline-none" placeholder="TAG" />
                        <input type="text" value={s.title} onChange={(e) => handleArrayChange('schedule', s.id, 'title', e.target.value)} className="flex-1 p-2.5 bg-black border border-white/10 text-sm font-semibold uppercase text-white focus:border-primary outline-none" placeholder="Session Title" />
                      </div>
                      <textarea value={s.desc} onChange={(e) => handleArrayChange('schedule', s.id, 'desc', e.target.value)} className="w-full p-3 bg-black border border-white/10 text-[10px] text-zinc-400 focus:border-primary outline-none" rows="2" placeholder="Description"></textarea>
                    </div>
                  </div>
                ))}
                <button onClick={addSchedule} className="w-full py-6 border border-dashed border-white/20 hover:border-primary text-zinc-500 hover:text-primary font-semibold text-xs uppercase transition-all bg-transparent">
                  + Add Session
                </button>
              </div>
            </div>
          )}

          {adminTab === 'tickets' && (
            <div className="max-w-6xl mx-auto space-y-6 relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                 <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight uppercase">Ticketing</h2>
                 <div className="flex w-full sm:w-auto gap-3">
                   <button onClick={addTicket} className="flex-1 sm:flex-none px-4 py-3 bg-transparent hover:bg-white/5 text-white text-[10px] font-semibold uppercase tracking-wider border border-white/20 transition-all">+ Add Ticket</button>
                   <button onClick={handleSaveConfig} className="flex-1 sm:flex-none px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold uppercase text-[10px] tracking-widest shadow-sm transition-all">
                     💾 SAVE CONFIG
                   </button>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {config.tickets?.map(ticket => (
                  <div key={ticket.id} className="bg-[#121212] p-6 md:p-8 border border-white/5 flex flex-col gap-4 relative shadow-sm">
                    <button onClick={() => removeArrayItem('tickets', ticket.id)} className="absolute top-4 right-4 px-3 py-1.5 bg-transparent border border-rose-500/50 text-rose-500 text-[9px] font-bold uppercase transition-all z-10">Delete</button>
                    
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-2">Ticket Name</label>
                      <input type="text" value={ticket.name} onChange={(e) => handleArrayChange('tickets', ticket.id, 'name', e.target.value)} className="w-full p-3 bg-black border border-white/10 text-sm font-semibold uppercase text-white focus:border-primary outline-none text-center" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-2">Price (THB)</label>
                      <div className="relative">
                         <span className="absolute left-4 top-3 text-zinc-600 font-bold text-sm">฿</span>
                         <input type="number" value={ticket.price} onChange={(e) => handleArrayChange('tickets', ticket.id, 'price', e.target.value)} className="w-full p-3 pl-8 bg-black border border-white/10 text-xl font-bold font-mono text-emerald-400 focus:border-primary outline-none text-center" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-2">Highlight Badge (Optional)</label>
                      <input type="text" value={ticket.badge || ''} onChange={(e) => handleArrayChange('tickets', ticket.id, 'badge', e.target.value)} className="w-full p-2.5 bg-black border border-white/10 text-[10px] font-semibold text-primary uppercase text-center outline-none" placeholder="e.g. VIP ZONE" />
                    </div>

                    <div className="space-y-1 flex-1 flex flex-col">
                      <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-2">Access & Perks</label>
                      <textarea value={ticket.features} onChange={(e) => handleArrayChange('tickets', ticket.id, 'features', e.target.value)} className="w-full flex-1 p-3 bg-black border border-white/10 text-[10px] text-zinc-400 focus:border-primary outline-none leading-relaxed" rows="5"></textarea>
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