import React, { useState, useEffect, useMemo, useRef } from 'react';

// ==========================================
// 1. CONFIG & BACKEND SETUP
// ==========================================
const GAS_URL = "https://script.google.com/macros/s/AKfycbzpKB17ZYwR0SqrGTgAHv4bor-m_WakpmlzxVfKzW9hjQzcROzMcIcO3ZWMTvRk2V55/exec";

const defaultConfig = {
  title: "BKK GRAND PRIX",
  subtitle: "World Championship 2026",
  date: "27 - 29 พฤศจิกายน 2026",
  targetDate: "2026-11-29T14:00:00", 
  location: "Bangkok International Circuit (BIC)",
  aboutText: "ทลายทุกขีดจำกัดความเร็วกับมหกรรมแข่งรถมอเตอร์ไซค์ทางเรียบระดับโลก สัมผัสเสียงคำรามของเครื่องยนต์ 1000cc การเข้าโค้งสุดระทึกขวัญ และโซน Paddock ที่ให้คุณกระทบไหล่นักบิดระดับแชมป์โลก",
  contactEmail: "ticket@bkkgrandprix.com",
  contactPhone: "02-100-MOTO",
  
  primaryColor: "#DC2626", 
  secondaryColor: "#FACC15", 
  
  heroBg: "https://images.alphacoders.com/130/thumb-1920-1308978.jpeg", 
  marqueeBg: "https://static.vecteezy.com/system/resources/thumbnails/070/170/919/small/an-empty-track-with-a-long-exposure-free-photo.jpeg", 
  sponsorBg: "https://static.vecteezy.com/system/resources/thumbnails/070/170/919/small/an-empty-track-with-a-long-exposure-free-photo.jpeg", 

  showVideo: true,
  videoTitle: "RACE HIGHLIGHTS & ON-BOARD",
  videoUrl: "https://www.youtube.com/embed/NF-x5UD_pRE", 
  videoDesc: "สัมผัสความเร็วผ่านมุมมองกล้อง On-Board ของเหล่านักบิดระดับพระกาฬ และช็อตแซงทางโค้งสุดเดือดจากฤดูกาลล่าสุด",

  speakers: [
    { id: 1, name: "ฟรานเชสโก บัญญาญ่า", role: "World Champion Rider", tag: "FACTORY RIDER", color: "#DC2626", img: "https://www.motowish.com/wp-content/uploads/2023/09/Francesco-Bagnaia-1.jpg", desc: "แชมป์โลก 2 สมัยซ้อน จะมาแชร์ศาสตร์แห่งความเร็ว การควบคุมคันเร่ง (Throttle Control) และการอ่านไลน์สนาม" },
    { id: 2, name: "มาร์ค มาร์เกซ", role: "8-Time World Champion", tag: "THE ALIEN", color: "#EF4444", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs3Wzzk-N_Y5J05rJZI3ZIX-3p0Gn7xfPaGcngUIId28tziiFyNl19f7Q&s=10", desc: "เจ้าแห่งแทร็กผู้ไม่เคยยอมแพ้ แชร์มุมมองการขับขี่แบบดุดันทะลุขีดจำกัด และการกอบกู้ฟอร์มหลังอาการบาดเจ็บ" },
    { id: 3, name: "ฟาบิโอ กวาร์ตาราโร่", role: "El Diablo - Top Rider", tag: "PRO RIDER", color: "#3B82F6", img: "https://image.makewebcdn.com/makeweb/m_1920x0/oEzbICNVY/A119PRO/FQ1.png", desc: "นักบิดดาวรุ่งเจ้าของสไตล์การเข้าโค้งแบบสมูทขั้นสุด พูดคุยเรื่องความสำคัญของ Corner Speed" },
    { id: 4, name: "จอร์จ มาร์ติน", role: "The Martinator", tag: "SPRINT KING", color: "#8B5CF6", img: "https://ticketsgp.vshcdn.net/uploads/images/752/motogp-jorge-martin-pramac-motogpaustria-motogpitaly-motogpassen-motogpsilverstone-motogpmugello-motogpjerez-motogpsachsenring.jpg", desc: "ราชันย์แห่ง Sprint Race เล่าถึงการเค้นสมรรถนะเครื่องยนต์และการบริหารยางในระยะสั้นให้ทรงประสิทธิภาพสูงสุด" }
  ],
  
  sponsors: [
    { id: 1, name: "MICHELIN" }, { id: 2, name: "MOTUL" },
    { id: 3, name: "ALPINESTARS" }, { id: 4, name: "SHOEI" }, { id: 5, name: "BREMBO" },
    { id: 6, name: "AKRAPOVIC" }, { id: 7, name: "MONSTER ENERGY" }
  ],

  tickets: [
    { id: 1, name: "Grandstand Ticket", price: 1800, type: "early", badge: "🏁 MAIN STAND", features: "ที่นั่ง Grandstand บริเวณโค้งสุดท้าย\nสิทธิ์เข้าโซน Moto Festival & Expo\nชมคอนเสิร์ตหลังจบการแข่งขัน\nLanyard & Official E-Ticket" },
    { id: 2, name: "Pit Walk Pass", price: 4500, type: "regular", badge: "🏍️ MOST POPULAR", features: "ที่นั่ง Grandstand โซน VIP (ร่มเงา)\nสิทธิ์เดินชม Pit Lane (เช้าวันแข่ง)\nกระทบไหล่นักบิดและขอลายเซ็น\nคูปองอาหารและเครื่องดื่ม 500 บาท" },
    { id: 3, name: "Paddock VIP Club", price: 18500, type: "vip", badge: "👑 VIP HOSPITALITY", features: "สิทธิ์เข้า Paddock Area ตลอดทั้งวัน\nเข้าใช้ VIP Lounge ติดแอร์เหนือ Pit Box\nอาหารและเครื่องดื่ม Premium Free-flow\nสิทธิ์เดิน Grid Walk ก่อนปล่อยตัวนักแข่ง" }
  ],

  schedule: [
    { id: 1, time: "09:00", title: "Free Practice (FP1 & FP2)", desc: "นักแข่งลงทดสอบสภาพแทร็ก และปรับเซ็ตติ้งรถให้เข้ากับอุณหภูมิยาง", tag: "PRACTICE", color: "#3B82F6" },
    { id: 2, time: "13:30", title: "Qualifying (Q1 & Q2)", desc: "รอบจัดอันดับจุดสตาร์ท เฟ้นหานักบิดที่ทำเวลาต่อรอบ (Lap Time) ได้เร็วที่สุดเพื่อคว้า Pole Position", tag: "QUALIFY", color: "#FACC15" },
    { id: 3, time: "16:00", title: "Pit Lane Walk & Fan Meet", desc: "เปิดให้ผู้ถือบัตรพรีเมียมเข้าพบปะนักแข่ง และชมการทำงานของทีมช่างหน้าพิต", tag: "FAN ZONE", color: "#10B981" },
    { id: 4, time: "18:00", title: "Main Race: Superbike Grand Prix", desc: "ไฟแดงดับลง! เปิดคันเร่งสุดปลอก การแข่งขันชิงแชมป์ประจำปี ระยะทาง 25 รอบสนาม", tag: "MAIN EVENT", color: "#DC2626" }
  ],
  
  faqs: [
    { id: 1, q: "ต้องแลกรับบัตรแข็ง หรือสายรัดข้อมือ (Wristband) ที่ไหน?", a: "ผู้ซื้อบัตรสามารถนำ QR Code จาก E-Ticket ในอีเมล มาสแกนรับ Wristband ได้ที่เต็นท์ Registration บริเวณหน้าทางเข้าสนาม ตั้งแต่เวลา 07:00 น. เป็นต้นไป" },
    { id: 2, q: "มีที่จอดรถสำหรับมอเตอร์ไซค์ (บิ๊กไบค์) หรือไม่?", a: "ทางงานได้จัดเตรียม VIP Motorcycle Parking รองรับบิ๊กไบค์กว่า 2,000 คัน พร้อมเจ้าหน้าที่รักษาความปลอดภัยดูแลตลอดงาน" },
    { id: 3, q: "อนุญาตให้นำกล้องถ่ายรูปขนาดใหญ่เข้าสนามหรือไม่?", a: "อนุญาตให้นำกล้อง DSLR หรือ Mirrorless เข้าได้ แต่ไม่อนุญาตให้นำขาตั้งกล้อง (Tripod) หรือโดรนเข้ามาในบริเวณ Grandstand" }
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
  
  const [config, setConfig] = useState(() => {
    try { const saved = localStorage.getItem('motoGpProFinalV1'); return saved ? JSON.parse(saved) : defaultConfig; } 
    catch { return defaultConfig; }
  });

  const [registrations, setRegistrations] = useState(() => {
    try { const saved = localStorage.getItem('motoGpProFinalRegisV1'); return saved ? JSON.parse(saved) : []; } 
    catch { return []; }
  });

  const pageViews = useMemo(() => registrations.length > 0 ? registrations.length * 15 + 5600 : 5600, [registrations.length]);

  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [ticketModal, setTicketModal] = useState({ isOpen: false, name: '', tier: '', qrUrl: '' });
  const [isSubmitting, setIsSubmitting] = useState(false); // สำหรับเปิด Loader ตอนลงทะเบียน
  const [isSyncing, setIsSyncing] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeFaq, setActiveFaq] = useState(null);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', role: '', ticketId: config?.tickets?.[0]?.id || ''
  });

  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserForm, setEditUserForm] = useState({});

  // --- SCANNER STATE ---
  const [scanQuery, setScanQuery] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerInputRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  useEffect(() => { localStorage.setItem('motoGpProFinalV1', JSON.stringify(config)); }, [config]);
  useEffect(() => { localStorage.setItem('motoGpProFinalRegisV1', JSON.stringify(registrations)); }, [registrations]);

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

  // 🔥 ฟังก์ชัน Submit การลงทะเบียน (เพิ่มระบบแสดง Loader)
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // เปิด Loader
    
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
    const qrData = encodeURIComponent(`MOTO|${formData.name}|${selectedTicket.name}|${regId}`);
    const qrUrl = `https://quickchart.io/qr?text=${qrData}&size=300&margin=1&dark=${(config.primaryColor || '#DC2626').replace('#','')}`;
    
    setTicketModal({ isOpen: true, name: formData.name, tier: selectedTicket.name, qrUrl });
    setIsSubmitting(false); // ปิด Loader
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

    if(parts.length >= 4 && (parts[0] === 'MOTO' || parts[0] === 'RACE')) {
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
    setScanResult({ type: 'success', user: updatedUser, message: '✅ ENTRY GRANTED (ยืนดีต้อนรับ)' });

    try {
      fetch(GAS_URL, {
         method: 'POST', mode: 'no-cors',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ action: 'checkIn', id: updatedUser.id })
      });
    } catch (err) { console.error(err); }
  };

  // 🔥 ฟังก์ชันปริ้นท์ป้ายชื่อ (Print Badge - No QR Code)
  const printBadge = (user) => {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    
    const html = `
      <html>
        <head>
          <title>Print Badge - ${user.name}</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Kanit:wght@400;700;900&display=swap" rel="stylesheet">
          <style>
            body { font-family: 'Kanit', 'Inter', sans-serif; margin: 0; padding: 20px; display: flex; justify-content: center; align-items: center; background: #e4e4e7; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .badge { width: 100mm; height: 140mm; background: #18181b; border-radius: 20px; overflow: hidden; position: relative; display: flex; flex-direction: column; color: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.2); border: 2px solid #3f3f46; }
            .header { background: ${config.primaryColor || '#DC2626'}; color: #fff; padding: 25px 15px; text-align: center; text-transform: uppercase; display: flex; flex-direction: column; align-items: center; justify-content: center; border-bottom: 4px solid ${config.secondaryColor || '#FACC15'}; }
            .header h2 { margin: 0; font-size: 26px; font-weight: 900; letter-spacing: 1px; font-style: italic; }
            .header p { margin: 5px 0 0; font-size: 12px; font-weight: 700; letter-spacing: 2px; opacity: 0.9; }
            .content { padding: 40px 20px; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 10px 10px; }
            
            /* ขยายชื่อนักแข่งให้ใหญ่ขึ้น ตรงกลาง */
            .name { font-size: 42px; font-weight: 900; color: #fff; text-transform: uppercase; margin-bottom: 15px; text-align: center; line-height: 1.1; }
            .team { font-size: 18px; font-weight: 700; color: #a1a1aa; text-transform: uppercase; text-align: center; letter-spacing: 1px; margin-bottom: 30px; }
            
            .footer { background: #000; padding: 30px 20px; text-align: center; border-top: 2px solid #3f3f46; }
            .ticket { font-size: 24px; font-weight: 900; color: ${config.secondaryColor || '#FACC15'}; text-transform: uppercase; letter-spacing: 2px; display: inline-block; padding: 12px 30px; border-radius: 50px; border: 3px solid ${config.secondaryColor || '#FACC15'}; }
            
            @media print {
              body { background: #fff; padding: 0; }
              .badge { box-shadow: none; border: 1px solid #ddd; border-radius: 0; width: 100vw; height: 100vh; }
            }
          </style>
        </head>
        <body>
          <div class="badge">
            <div class="header">
              <h2>${config.title}</h2>
              <p>OFFICIAL ENTRY PASS</p>
            </div>
            <div class="content">
              <div class="name">${user.name}</div>
              <div class="team">${user.company || 'GUEST'}</div>
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
      localStorage.setItem('motoGpProCloudV3', JSON.stringify(config));
      alert('🏁 บันทึกการตั้งค่าลงระบบ Google Sheet เรียบร้อยแล้ว!');
    } catch (error) { alert('❌ เกิดข้อผิดพลาดในการบันทึกข้อมูล'); }
  };

  const addSpeaker = () => setConfig(prev => ({ ...prev, speakers: [...(prev.speakers || []), { id: Date.now(), name: "ชื่อนักบิด", role: "ทีม", tag: "TAG", color: "#DC2626", img: "https://images.unsplash.com/photo-1541344999736-83eca272f6fc?q=80&w=400&auto=format&fit=crop", desc: "รายละเอียด" }] }));
  const addSchedule = () => setConfig(prev => ({ ...prev, schedule: [...(prev.schedule || []), { id: Date.now(), time: "00:00", title: "กิจกรรม", desc: "รายละเอียด", tag: "INFO", color: "#FACC15" }] }));
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
  // CSS: PRO MOTORCYCLE RACING THEME
  // ==========================================
  const customerCss = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Kanit:wght@300;400;500;600;700;800;900&display=swap');
    
    :root { 
      --primary: ${config.primaryColor || '#DC2626'}; 
      --primary-glow: ${config.primaryColor ? config.primaryColor + '80' : 'rgba(220, 38, 38, 0.5)'}; 
      --secondary: ${config.secondaryColor || '#FACC15'}; 
      --bg-asphalt: #0f0f11; 
      --bg-card: #18181b; 
      --text-light: #fafafa; 
      --text-muted: #a1a1aa; 
      --border: rgba(255, 255, 255, 0.08); 
    }
    
    html { scroll-behavior: smooth; }
    body { font-family: 'Kanit', 'Inter', sans-serif; background-color: var(--bg-asphalt); color: var(--text-light); overflow-x: hidden; margin: 0; }
    
    .track-bg { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; opacity: 0.15; pointer-events: none; background-image: radial-gradient(circle at 100% 100%, transparent 40%, rgba(255,255,255,0.05) 41%, transparent 42%), radial-gradient(circle at 0% 0%, transparent 60%, rgba(255,255,255,0.05) 61%, transparent 62%); background-size: 100% 100%; }

    .reveal { opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1); }
    .reveal.is-visible { opacity: 1; transform: translateY(0); }
    .delay-1 { transition-delay: 0.1s; } .delay-2 { transition-delay: 0.2s; }
    
    @keyframes shine { to { background-position: 200% center; } }
    .subtitle-sweep { background: linear-gradient(90deg, #fff 0%, var(--primary) 50%, #fff 100%); background-size: 200% auto; color: transparent; -webkit-background-clip: text; background-clip: text; animation: shine 4s linear infinite; }
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .glow-text { text-shadow: 0 0 25px var(--primary-glow); }

    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
    .section { padding: 100px 0; position: relative; z-index: 2; border-bottom: 1px solid rgba(255,255,255,0.03); }
    .section-alt { background: rgba(255,255,255,0.02); backdrop-filter: blur(5px); }
    
    .sec-header { text-align: center; margin-bottom: 60px; }
    .sec-badge { display: inline-flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 900; color: #fff; background: var(--primary); padding: 6px 20px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; border-radius: 50px; }
    .sec-title { font-size: 42px; font-weight: 900; color: #fff; margin-bottom: 15px; letter-spacing: -1px; text-transform: uppercase; }
    .sec-line { width: 80px; height: 6px; background: var(--primary); margin: 0 auto; border-radius: 50px; }

    .btn { display: inline-flex; align-items: center; gap: 10px; justify-content: center; background: #27272a; color: #fff; border: none; padding: 16px 32px; font-size: 16px; font-weight: 900; cursor: pointer; transition: 0.3s; text-transform: uppercase; letter-spacing: 1px; border-radius: 50px; box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
    .btn:hover:not(:disabled) { background: #3f3f46; transform: translateY(-3px); box-shadow: 0 15px 30px rgba(0,0,0,0.3); }
    .btn-primary { background: var(--primary); color: #fff; box-shadow: 0 10px 25px var(--primary-glow); }
    .btn-primary:hover:not(:disabled) { filter: brightness(1.1); box-shadow: 0 15px 35px var(--primary-glow); }

    .navbar { position: fixed; top: 0; width: 100%; z-index: 1000; padding: 20px 0; transition: all 0.4s ease; border-bottom: 1px solid transparent; }
    .navbar.scrolled { padding: 12px 0; background: rgba(15, 15, 17, 0.95); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); }
    .nav-wrap { display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 26px; font-weight: 900; color: #fff; display: flex; align-items: center; gap: 10px; cursor: pointer; letter-spacing: -1px; text-transform: uppercase; }
    .logo-mark { width: 36px; height: 36px; background: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 900; color: #fff; border-radius: 50%; box-shadow: 0 0 15px var(--primary-glow); }
    .nav-links { display: flex; gap: 30px; }
    .nav-links a { color: #d4d4d8; font-weight: 800; cursor: pointer; transition: 0.3s; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; position: relative;}
    .nav-links a:hover { color: var(--primary); }
    
    @keyframes subtleZoom { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
    .hero { min-height: 100vh; display: flex; align-items: center; position: relative; overflow: hidden; padding-top: 60px; }
    .hero-bg { position: absolute; inset: 0; z-index: -1; background-size: cover; background-position: center; animation: subtleZoom 20s ease-in-out infinite; }
    .hero::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(15,15,17,0.95) 0%, rgba(15,15,17,0.4) 100%); z-index: 0; }
    .hero-content { position: relative; z-index: 1; max-width: 850px; }
    .hero h1 { font-size: 72px; line-height: 1.05; margin-bottom: 20px; color: #fff; font-weight: 900; letter-spacing: -2px; text-transform: uppercase; }
    
    .countdown-wrap { display: flex; gap: 10px; margin-bottom: 30px; flex-wrap: wrap; }
    .cd-box { background: rgba(0,0,0,0.6); border: 1px solid var(--border); backdrop-filter: blur(8px); width: 80px; height: 80px; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
    .cd-num { font-size: 28px; font-weight: 900; color: #fff; line-height: 1; }
    .cd-label { font-size: 10px; color: var(--text-muted); text-transform: uppercase; font-weight: 800; margin-top: 4px; letter-spacing: 1px; }

    .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; }
    .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; }
    
    .concept-card { padding: 40px 30px; text-align: center; transition: 0.4s; background: var(--bg-card); border: 1px solid var(--border); border-radius: 32px; }
    .concept-card:hover { background: #27272a; transform: translateY(-8px); border-color: var(--primary); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
    .concept-icon { width: 70px; height: 70px; background: rgba(255,255,255,0.05); border: 2px solid var(--border); display: flex; justify-content: center; align-items: center; margin: 0 auto 20px; font-size: 28px; border-radius: 50%; color: #fff; transition: 0.4s; }
    .concept-card:hover .concept-icon { border-color: var(--primary); box-shadow: 0 0 20px var(--primary-glow); background: var(--primary); }
    
    .speaker-card { transition: 0.4s; cursor: pointer; background: var(--bg-card); position: relative; border-radius: 32px; border: 1px solid var(--border); overflow: hidden; }
    .speaker-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px var(--primary-glow); border-color: var(--primary); }
    .speaker-img-wrap { height: 300px; position: relative; }
    .speaker-img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(80%) contrast(1.1); transition: 0.7s; }
    .speaker-card:hover .speaker-img { filter: grayscale(0%) contrast(1); }
    .speaker-tag { position: absolute; top: 20px; left: 20px; font-size: 10px; font-weight: 900; color: #fff; padding: 8px 16px; letter-spacing: 1px; text-transform: uppercase; border-radius: 50px; box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
    .speaker-info { padding: 25px; text-align: center; }

    .timeline-wrap { max-width: 800px; margin: 0 auto; position: relative; padding-left: 50px; }
    .timeline-wrap::before { content: ''; position: absolute; left: 15px; top: 0; bottom: 0; width: 4px; background: #27272a; border-radius: 50px; }
    .time-card { padding: 30px; display: flex; gap: 30px; align-items: center; margin-bottom: 25px; position: relative; transition: 0.3s; background: var(--bg-card); border: 1px solid var(--border); border-radius: 32px; }
    .time-card:hover { border-color: var(--primary); box-shadow: 0 15px 30px rgba(0,0,0,0.2); }
    .time-dot { position: absolute; left: -45px; top: 50%; transform: translateY(-50%); width: 24px; height: 24px; background: var(--bg-asphalt); border: 4px solid var(--primary); z-index: 2; border-radius: 50%; transition: 0.3s; }
    .time-card:hover .time-dot { background: var(--primary); box-shadow: 0 0 15px var(--primary-glow); }
    .time-left { width: 100px; flex-shrink: 0; border-right: 2px solid var(--border); padding-right: 20px; text-align: right; }
    .time-text { font-size: 28px; font-weight: 900; color: #fff; line-height: 1; }

    .video-wrapper { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border: 2px solid var(--border); background: #000; border-radius: 32px; transition: 0.4s; }
    .video-wrapper:hover { border-color: var(--primary); box-shadow: 0 20px 50px var(--primary-glow); }
    .video-wrapper iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; }

    .ticket-wrapper { height: 100%; display: block; cursor: pointer; }
    .ticket-card { padding: 40px 30px; position: relative; display: flex; flex-direction: column; transition: 0.4s; height: 100%; background: var(--bg-card); border: 1px solid var(--border); border-radius: 32px; }
    .ticket-badge { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: var(--border); color: #fff; padding: 6px 20px; font-size: 11px; font-weight: 900; letter-spacing: 2px; white-space: nowrap; border-radius: 50px; }
    .ticket-radio:checked + .ticket-wrapper .ticket-card { border: 2px solid var(--primary); background: linear-gradient(180deg, ${config.primaryColor ? config.primaryColor + '1A' : 'rgba(220, 38, 38, 0.1)'} 0%, rgba(24,24,27,1) 100%); box-shadow: 0 20px 50px var(--primary-glow); transform: translateY(-10px); }
    .ticket-radio:checked + .ticket-wrapper .ticket-badge { background: var(--primary); color: #fff; border: none; }
    
    .faq-item { border-bottom: 1px solid var(--border); padding: 25px 0; cursor: pointer; }
    .faq-q { font-size: 18px; font-weight: 800; color: #fff; display: flex; justify-content: space-between; align-items: center; }
    .faq-a { font-size: 15px; color: #a1a1aa; margin-top: 15px; line-height: 1.7; display: none; padding-right: 20px; }
    .faq-item.active .faq-a { display: block; animation: fadeDown 0.3s ease; }
    .faq-item.active .faq-q { color: var(--primary); }
    @keyframes fadeDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

    .form-box-wrapper { filter: drop-shadow(0 20px 40px rgba(0,0,0,0.4)); max-width: 850px; margin: 0 auto; }
    .form-box { padding: 50px 40px; background: #18181b; border-radius: 32px; border-top: 6px solid var(--primary); }
    .form-group { margin-bottom: 20px; text-align: left; }
    .form-group label { display: block; font-size: 12px; font-weight: 800; color: #a1a1aa; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px; }
    .form-input { width: 100%; padding: 16px 20px; background: #0f0f11; border: 1px solid var(--border); color: #fff; font-size: 15px; transition: 0.3s; border-radius: 16px; font-weight: 600; }
    .form-input:focus { border-color: var(--primary); outline: none; background: #18181b; box-shadow: 0 0 0 4px var(--primary-glow); }

    /* ==========================================
       MOBILE RESPONSIVE TWEAKS
       ========================================== */
    @media (max-width: 768px) {
      .hero h1 { font-size: 42px; letter-spacing: -1px; }
      .hero h1 span { font-size: 24px; }
      .hero-content { padding-top: 20px; }
      .sec-title { font-size: 32px; }
      .section { padding: 60px 0; }
      .grid-4, .grid-3 { grid-template-columns: 1fr; gap: 20px; }
      .grid-2 { grid-template-columns: 1fr !important; gap: 15px !important; }
      .form-box { padding: 30px 20px; }
      .time-card { flex-direction: column; align-items: flex-start; gap: 15px; padding: 25px 20px; }
      .time-left { border-right: none; border-bottom: 1px solid var(--border); padding-bottom: 15px; text-align: left; width: 100%; }
      .timeline-wrap::before { left: 20px; }
      .time-dot { left: -40px; top: 40px; }
      .timeline-wrap { padding-left: 40px; }
      .grid-4 > div { padding: 15px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
      .grid-4 > div:last-child { border-bottom: none; }
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
        
        {/* 🔥 Loader ตอนลงทะเบียน */}
        {isSubmitting && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <div style={{ width: '80px', height: '80px', border: '6px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '25px' }}></div>
            <h2 style={{ fontSize: '24px', fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: '2px', animation: 'pulse 2s infinite' }}>Processing Entry...</h2>
            <p style={{ color: '#a1a1aa', fontSize: '14px', marginTop: '10px', fontFamily: 'monospace' }}>Securely transmitting data to paddock control</p>
            <style>
              {`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
              `}
            </style>
          </div>
        )}

        <div className="track-bg"></div>

        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
          <div className="container nav-wrap">
            <a onClick={() => scrollTo('home')} className="logo">
              <div className="logo-mark">M</div> 
              <div>{config.title?.split(' ')[0]}<span style={{fontWeight:300, color: 'var(--primary)'}}> {config.title?.split(' ')[1] || 'GP'}</span></div>
            </a>
            <div className="nav-links hidden md:flex">
              <a onClick={() => scrollTo('concept')}>Paddock</a>
              {config.showVideo && <a onClick={() => scrollTo('video')}>Highlights</a>}
              <a onClick={() => scrollTo('speakers')}>Riders</a>
              <a onClick={() => scrollTo('schedule')}>Schedule</a>
            </div>
            <button className="btn btn-primary hidden md:inline-flex" style={{padding: '10px 24px', fontSize: '13px'}} onClick={() => scrollTo('register')}>GET TICKETS</button>
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
                <span className="subtitle-sweep block font-extrabold mt-2 uppercase">
                  NIGHT RACE, SPEED & APEX.
                </span>
              </h1>
              
              <p style={{ color: '#e4e4e7', fontSize: '16px', maxWidth: '650px', marginBottom: '40px', fontWeight: 500 }} className="delay-1">{config.aboutText}</p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 delay-2">
                <button className="btn btn-primary w-full sm:w-auto" style={{ padding: '16px 36px', fontSize: '16px' }} onClick={() => scrollTo('register')}>BOOK PASS ➔</button>
                <div style={{ display: 'flex', gap: '15px', borderLeft: '3px solid var(--primary)', paddingLeft: '15px' }}>
                  <div>
                    <div style={{ color: '#fff', fontSize: '16px', fontWeight: 900, textTransform: 'uppercase' }}>{config.date}</div>
                    <div style={{ color: '#a1a1aa', fontSize: '13px', fontWeight: 600 }}>{config.location}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div style={{ background: '#0f0f11', padding: '40px 0', borderBottom: '1px solid var(--border)' }}>
          <div className="container grid-4" style={{ textAlign: 'center' }}>
            <div><div style={{ fontSize: '42px', fontWeight: 900, color: '#fff' }}>350<span style={{fontSize:'16px', color:'var(--primary)'}}>KM/H</span></div><div style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>Top Speed</div></div>
            <div><div style={{ fontSize: '42px', fontWeight: 900, color: '#fff' }}>4.5<span style={{fontSize:'16px', color:'var(--primary)'}}>KM</span></div><div style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>Track Length</div></div>
            <div><div style={{ fontSize: '42px', fontWeight: 900, color: '#fff' }}>12</div><div style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>Turns</div></div>
            <div><div style={{ fontSize: '42px', fontWeight: 900, color: '#fff' }}>25</div><div style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>Laps</div></div>
          </div>
        </div>

        {config.showVideo && (
          <section id="video" className="section section-alt">
            <div className="container" style={{ maxWidth: '1000px' }}>
              <div className="sec-header reveal">
                <div className="sec-badge">ON-BOARD CAMERA</div>
                <h2 className="sec-title">{config.videoTitle}</h2>
                <p style={{ color: '#a1a1aa', marginTop: '10px', fontSize: '15px' }}>{config.videoDesc}</p>
              </div>
              <div className="reveal delay-1 video-shadow-wrap">
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
              <div className="sec-badge">FAN VILLAGE</div>
              <h2 className="sec-title">EXPERIENCE THE APEX</h2>
              <div className="sec-line"></div>
            </div>
            <div className="grid-4 reveal delay-1">
              <div className="concept-card"><div className="concept-icon">🏍️</div><h3 style={{ fontSize: '18px', fontWeight: 900, color: '#fff', marginBottom: '10px', textTransform: 'uppercase' }}>Superbikes</h3><p style={{ fontSize: '13px', color: '#a1a1aa' }}>สัมผัสรถแข่ง 1000cc ตัวจริงที่ใช้แข่งขันในรายการชิงแชมป์โลก</p></div>
              <div className="concept-card delay-1"><div className="concept-icon">🔧</div><h3 style={{ fontSize: '18px', fontWeight: 900, color: '#fff', marginBottom: '10px', textTransform: 'uppercase' }}>Pit Garage</h3><p style={{ fontSize: '13px', color: '#a1a1aa' }}>ชมการทำงานของทีมช่างระดับพระกาฬในการเซ็ตอัพรถก่อนลงสนาม</p></div>
              <div className="concept-card delay-2"><div className="concept-icon">🎧</div><h3 style={{ fontSize: '18px', fontWeight: 900, color: '#fff', marginBottom: '10px', textTransform: 'uppercase' }}>Fan Festival</h3><p style={{ fontSize: '13px', color: '#a1a1aa' }}>โซนกิจกรรมสำหรับไบค์เกอร์ คอนเสิร์ต และการออกบูธจากแบรนด์ชั้นนำ</p></div>
              <div className="concept-card delay-3"><div className="concept-icon">🏁</div><h3 style={{ fontSize: '18px', fontWeight: 900, color: '#fff', marginBottom: '10px', textTransform: 'uppercase' }}>Grid Walk</h3><p style={{ fontSize: '13px', color: '#a1a1aa' }}>โอกาสเดียวที่จะได้เดินบนจุดสตาร์ทกระทบไหล่นักบิดก่อนไฟแดงดับลง</p></div>
            </div>
          </div>
        </section>

        <section id="speakers" className="section section-alt">
          <div className="container">
            <div className="sec-header reveal">
              <div className="sec-badge">RIDERS & CREW</div>
              <h2 className="sec-title">พบกับนักบิดระดับโลก</h2>
              <div className="sec-line"></div>
            </div>
            <div className="grid-4">
              {config.speakers?.map((speaker, i) => (
                <div key={speaker.id} className={`speaker-card reveal delay-${i%4}`} onClick={() => setSelectedSpeaker(speaker)}>
                  <div className="speaker-img-wrap"><img src={speaker.img} alt={speaker.name} className="speaker-img" /><span className="speaker-tag" style={{ background: speaker.color }}>{speaker.tag}</span></div>
                  <div className="speaker-info">
                    <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', marginBottom: '5px', textTransform: 'uppercase' }}>{speaker.name}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>{speaker.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="schedule" className="section">
          <div className="container">
            <div className="sec-header reveal">
              <div className="sec-badge">RACE WEEKEND</div>
              <h2 className="sec-title">กำหนดการแข่งขัน</h2>
              <div className="sec-line"></div>
            </div>
            <div className="timeline-wrap reveal delay-1">
              {config.schedule?.map((s) => (
                <div key={s.id} className="time-card">
                  <div className="time-dot" style={{ borderColor: s.color }}></div>
                  <div className="time-left"><div className="time-text" style={{ color: s.color }}>{s.time}</div></div>
                  <div>
                    <div style={{ display: 'inline-block', fontSize: '10px', fontWeight: '900', color: '#fff', background: s.color, padding: '4px 12px', marginBottom: '10px', letterSpacing: '1px', textTransform: 'uppercase', borderRadius: '50px' }}>{s.tag}</div>
                    <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', marginBottom: '8px', textTransform: 'uppercase' }}>{s.title}</h3>
                    <p style={{ fontSize: '14px', color: '#a1a1aa', lineHeight: 1.6, fontWeight: 500 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div style={{ backgroundImage: `url(${config.sponsorBg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', position: 'relative', padding: '80px 0', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 15, 17, 0.90)' }}></div>
          <div className="container text-center reveal" style={{ position: 'relative', zIndex: 1, marginBottom: '40px' }}>
            <h3 style={{ color: '#fff', fontSize: '24px', fontWeight: 900, letterSpacing: '4px', textTransform: 'uppercase' }}>OFFICIAL PARTNERS</h3>
            <div className="sec-line" style={{ marginTop: '15px' }}></div>
          </div>
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <div style={{ display: 'flex', animation: 'marquee 25s linear infinite' }}>
              {config.sponsors?.map(s => <div key={s.id} style={{ fontSize: '36px', fontWeight: 900, color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.4)', margin: '0 40px', textTransform: 'uppercase', letterSpacing: '4px' }}>{s.name}</div>)}
              {config.sponsors?.map(s => <div key={s.id+'dup'} style={{ fontSize: '36px', fontWeight: 900, color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.4)', margin: '0 40px', textTransform: 'uppercase', letterSpacing: '4px' }}>{s.name}</div>)}
            </div>
          </div>
        </div>

        <section id="register" className="section section-alt">
          <div className="container">
            <div className="sec-header reveal">
              <div className="sec-badge">TICKETING</div>
              <h2 className="sec-title">จองบัตรเข้าชม</h2>
              <div className="sec-line"></div>
            </div>

            <div className="grid-3 reveal delay-1" style={{ marginBottom: '60px' }}>
              {config.tickets?.map(ticket => (
                <label key={ticket.id} className="ticket-wrapper">
                  <input type="radio" name="ticketId" className="ticket-radio hidden" value={ticket.id} checked={String(formData.ticketId) === String(ticket.id)} onChange={handleInputChange} />
                  <div className="ticket-card" style={ticket.type === 'vip' ? { transform: 'scale(1.02)', background: `linear-gradient(180deg, ${config.primaryColor ? config.primaryColor + '1A' : 'rgba(220, 38, 38, 0.1)'} 0%, rgba(24, 24, 27, 1) 100%)`, borderColor: 'var(--primary)' } : {}}>
                    {ticket.badge && <div className="ticket-badge" style={ticket.type === 'vip' ? { background: 'var(--primary)', color: '#fff', border: 'none' } : {}}>{ticket.badge}</div>}
                    <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#fff', textAlign: 'center', textTransform: 'uppercase' }}>{ticket.name}</h3>
                    <div style={{ fontSize: '42px', fontWeight: '900', color: ticket.type === 'vip' ? 'var(--primary)' : '#fff', margin: '15px 0 20px', textAlign: 'center', lineHeight: 1 }}>{Number(ticket.price).toLocaleString()} <span style={{ fontSize: '14px', color: '#a1a1aa', fontWeight: 700 }}>THB</span></div>
                    <div style={{ flex: 1, marginBottom: '25px' }}>
                      {ticket.features.split('\n').map((f, i) => (
                        <div key={i} style={{ padding: '10px 0', display: 'flex', gap: '10px', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '14px', color: '#e4e4e7', fontWeight: 500 }}>
                          <span style={{ color: ticket.type === 'vip' ? 'var(--primary)' : 'var(--secondary)', fontWeight: 900 }}>✓</span> {f}
                        </div>
                      ))}
                    </div>
                    <div className="btn" style={{ width: '100%', background: String(formData.ticketId) === String(ticket.id) ? 'var(--primary)' : 'var(--bg-card)', color: '#fff', border: String(formData.ticketId) === String(ticket.id) ? 'none' : '1px solid var(--border)' }}>
                      {String(formData.ticketId) === String(ticket.id) ? 'SELECTED' : 'SELECT PASS'}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="form-box-wrapper reveal">
              <div className="form-box">
                <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '30px', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px', textTransform: 'uppercase' }}>
                  <span style={{ width: '35px', height: '35px', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', borderRadius: '50%' }}>🏁</span> Checkout
                </h3>
                <form onSubmit={handleRegisterSubmit}>
                  <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div className="form-group mb-0"><label>ชื่อ-นามสกุลผู้เข้าชม *</label><input type="text" name="name" className="form-input" required value={formData.name} onChange={handleInputChange} placeholder="Full Name" /></div>
                    <div className="form-group mb-0"><label>อีเมล (รับ E-Ticket) *</label><input type="email" name="email" className="form-input" required value={formData.email} onChange={handleInputChange} placeholder="Email Address" /></div>
                  </div>
                  <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div className="form-group mb-0"><label>เบอร์โทรศัพท์ *</label><input type="tel" name="phone" className="form-input" required value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" /></div>
                    <div className="form-group mb-0"><label>สังกัด / ทีม (ถ้ามี)</label><input type="text" name="company" className="form-input" value={formData.company} onChange={handleInputChange} placeholder="Team Name" /></div>
                  </div>

                  <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border)', padding: '25px', marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderRadius: '24px' }}>
                    <div>
                      <div style={{ fontSize:'12px', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '5px' }}>🎟️ {selectedTicket?.name || '-'} (1 PASS)</div>
                      <div style={{ color: '#a1a1aa', fontSize: '14px', fontWeight: 500 }}>Subtotal: {subtotal.toLocaleString()} ฿ | VAT 7%: {vat.toLocaleString()} ฿</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '10px', color: '#a1a1aa', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '1px' }}>Total Amount</div>
                        <div style={{ fontSize: '28px', fontWeight: '900', color: '#fff', lineHeight: 1 }}>{total.toLocaleString()} <span style={{ fontSize: '14px', fontWeight: 700 }}>฿</span></div>
                      </div>
                      <button type="submit" className="btn btn-primary w-full sm:w-auto" style={{ padding: '14px 28px', fontSize: '14px' }} disabled={isSubmitting}>
                        {isSubmitting ? 'PROCESSING...' : 'PAY SECURELY'}
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

        <footer style={{ background: '#000', padding: '60px 0 30px', borderTop: '2px solid var(--border)' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '30px', marginBottom: '30px' }}>
            <div>
              <div className="logo" style={{ marginBottom: '15px', fontSize: '24px' }}><div className="logo-mark" style={{ width:'30px', height:'30px', fontSize:'14px' }}>M</div> {config.title}</div>
              <p style={{ fontSize: '14px', color: '#a1a1aa', maxWidth: '300px', lineHeight: 1.6, fontWeight: 500 }}>{config.aboutText.substring(0, 80)}...</p>
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 900, marginBottom: '15px', fontSize: '16px', textTransform: 'uppercase' }}>Circuit Contact</h4>
              <p style={{ fontSize: '13px', color: '#a1a1aa', marginBottom: '8px', fontWeight: 600 }}>✉️ {config.contactEmail}</p>
              <p style={{ fontSize: '13px', color: '#a1a1aa', fontWeight: 600 }}>📞 {config.contactPhone}</p>
            </div>
          </div>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
            <p style={{ fontSize: '12px', color: '#52525b', fontWeight: 600 }}>© 2026 {config.title}. All rights reserved.</p>
            <div onClick={() => setCurrentView('admin')} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#52525b', fontSize: '11px', cursor: 'pointer', fontWeight: 900, transition: '0.3s', letterSpacing: '1px' }} onMouseOver={e => e.currentTarget.style.color='var(--primary)'} onMouseOut={e => e.currentTarget.style.color='#52525b'}>
              TELEMETRY DASHBOARD (ADMIN)
            </div>
          </div>
        </footer>

        {/* Modals */}
        {selectedSpeaker && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, padding: '20px' }} onClick={() => setSelectedSpeaker(null)}>
            <div className="glass" style={{ borderRadius: '32px', width: '100%', maxWidth: '900px', display: 'flex', flexDirection: window.innerWidth < 768 ? 'column' : 'row', overflow: 'hidden', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedSpeaker(null)} style={{ position:'absolute', top:'15px', right:'15px', background:'rgba(255,255,255,0.1)', border:'none', width: '35px', height: '35px', borderRadius: '50%', color:'#fff', cursor:'pointer', zIndex:10, fontWeight: 'bold', fontSize: '16px' }}>✕</button>
              <div style={{ flex: '1', minHeight: window.innerWidth < 768 ? '250px' : '400px' }}><img src={selectedSpeaker.img} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(50%) contrast(1.2)' }} alt="speaker" /></div>
              <div style={{ flex: '1.2', padding: window.innerWidth < 768 ? '30px' : '50px' }}>
                <span style={{ display: 'inline-block', background: selectedSpeaker.color, color: '#fff', padding: '6px 16px', fontSize: '10px', fontWeight: 900, letterSpacing: '2px', marginBottom: '15px', borderRadius: '50px' }}>{selectedSpeaker.tag}</span>
                <h3 style={{ fontSize: window.innerWidth < 768 ? '28px' : '36px', fontWeight: 900, margin: '0 0 10px', color: '#fff', letterSpacing: '-1px', textTransform: 'uppercase' }}>{selectedSpeaker.name}</h3>
                <div style={{ fontSize: '15px', color: 'var(--primary)', fontWeight: '800', marginBottom: '20px', letterSpacing: '1px', textTransform: 'uppercase' }}>{selectedSpeaker.role}</div>
                <div style={{ width: '50px', height: '3px', background: 'var(--primary)', marginBottom: '20px', borderRadius: '50px' }}></div>
                <p style={{ color: '#d4d4d8', lineHeight: '1.7', fontSize: '14px', fontWeight: 500 }}>{selectedSpeaker.desc}</p>
              </div>
            </div>
          </div>
        )}

        {ticketModal.isOpen && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(15px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, padding: '20px' }}>
            <div className="glow-box" style={{ background: '#18181b', borderRadius: '32px', border: '2px solid var(--primary)', width: '100%', maxWidth: '400px', padding: '40px 30px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ width: '60px', height: '60px', background: 'var(--primary)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', margin: '0 auto 15px', fontWeight: 900 }}>✓</div>
              <h2 style={{ marginBottom: '10px', color: '#fff', fontSize: '24px', fontWeight: 900, textTransform: 'uppercase' }}>Registration Success!</h2>
              <p style={{ color: '#a1a1aa', fontSize: '13px', marginBottom: '25px', fontWeight: 600 }}>ระบบส่ง E-TICKET และ PADDOCK PASS ไปยังอีเมลแล้ว</p>
              
              <div style={{ background: '#0f0f11', padding: '20px', marginBottom: '25px', border: '1px solid var(--border)', textAlign: 'center', borderRadius: '16px' }}>
                <div style={{ fontSize: '10px', fontWeight: 900, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '1px' }}>Name</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#fff', marginBottom: '10px' }}>{ticketModal.name}</div>
                <div style={{ fontSize: '10px', fontWeight: 900, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '1px' }}>Access Level</div>
                <div style={{ fontSize: '16px', color: 'var(--primary)', fontWeight: 900, marginTop: '2px', textTransform: 'uppercase' }}>{ticketModal.tier || 'UNKNOWN PASS'}</div>
              </div>
              
              <button className="btn btn-primary" style={{ width: '100%', padding: '15px', fontSize: '15px' }} onClick={() => setTicketModal({ isOpen: false, name: '', tier: '', qrUrl: '' })}>CLOSE WINDOW</button>
            </div>
          </div>
        )}
      </>
    );
  }

  // ==========================================
  // RENDER: ADMIN VIEW (MOBILE RESPONSIVE TELEMETRY)
  // ==========================================
  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      
      <div className="flex flex-col md:flex-row h-screen bg-[#050505] text-slate-200 font-sans overflow-hidden selection:bg-red-500/30">
        
        {/* Mobile Admin Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-[#0a0a0a] border-b border-white/5 relative z-50 shadow-md">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 flex items-center justify-center text-white font-black text-lg rounded-full" style={{ background: config.primaryColor || '#DC2626' }}>M</div>
             <span className="font-black text-white uppercase tracking-widest text-sm">Telemetry</span>
           </div>
           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
           </button>
        </div>

        {/* Sidebar */}
        <aside className={`fixed md:relative z-40 w-72 h-[calc(100vh-65px)] md:h-full bg-[#0a0a0a] border-r border-white/5 flex flex-col shadow-2xl transition-transform transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <div className="absolute top-0 left-0 w-full h-1 hidden md:block" style={{ background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }}></div>
          
          <div className="hidden md:flex p-8 border-b border-white/5 items-center gap-4 cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setCurrentView('customer')}>
            <div className="w-12 h-12 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-red-900/20 rounded-full border border-white/10" style={{ background: config.primaryColor || '#DC2626' }}>M</div>
            <div>
              <h1 className="font-black text-white text-xl tracking-tight leading-none uppercase">Telemetry</h1>
              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1.5 mt-2 uppercase tracking-widest"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10B981]"></span> Online</span>
            </div>
          </div>

          <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 px-2">Race Control</div>
            <button onClick={() => {setAdminTab('dashboard'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center gap-4 px-4 py-3.5 text-sm font-bold transition-all rounded-2xl ${adminTab === 'dashboard' ? 'bg-white/10 text-white shadow-lg' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}`}>
              <span className="text-xl">📊</span> Live Timing
            </button>
            <button onClick={() => {setAdminTab('users'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center gap-4 px-4 py-3.5 text-sm font-bold transition-all rounded-2xl ${adminTab === 'users' ? 'bg-white/10 text-white shadow-lg' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}`}>
              <span className="text-xl">🏁</span> Entries ({registrations.length})
            </button>
            <button onClick={() => {setAdminTab('scanner'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center gap-4 px-4 py-3.5 text-sm font-bold transition-all rounded-2xl ${adminTab === 'scanner' ? 'bg-white/10 text-white shadow-lg' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}`}>
              <span className="text-xl">📷</span> QR Scanner
            </button>
            
            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 px-2 mt-10">Event Setup</div>
            <button onClick={() => {setAdminTab('settings'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center gap-4 px-4 py-3.5 text-sm font-bold transition-all rounded-2xl ${adminTab === 'settings' ? 'bg-white/10 text-white shadow-lg' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}`}>
              <span className="text-xl">⚙️</span> Track Config
            </button>
            <button onClick={() => {setAdminTab('schedule'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center gap-4 px-4 py-3.5 text-sm font-bold transition-all rounded-2xl ${adminTab === 'schedule' ? 'bg-white/10 text-white shadow-lg' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}`}>
              <span className="text-xl">⏱️</span> Schedule
            </button>
            <button onClick={() => {setAdminTab('speakers'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center gap-4 px-4 py-3.5 text-sm font-bold transition-all rounded-2xl ${adminTab === 'speakers' ? 'bg-white/10 text-white shadow-lg' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}`}>
              <span className="text-xl">🏍️</span> Riders
            </button>
            <button onClick={() => {setAdminTab('tickets'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center gap-4 px-4 py-3.5 text-sm font-bold transition-all rounded-2xl ${adminTab === 'tickets' ? 'bg-white/10 text-white shadow-lg' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}`}>
              <span className="text-xl">🎟️</span> Ticketing
            </button>
          </nav>

          <div className="p-6 border-t border-white/5 bg-[#0a0a0a]">
            <button onClick={() => setCurrentView('customer')} className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-white/5 hover:bg-white/10 text-white text-xs font-black uppercase tracking-widest transition-all border border-white/10 hover:border-white/20 rounded-2xl">
              ← Exit to Track
            </button>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isMobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>}

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto relative" style={{ backgroundColor: '#050505', backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
          
          {adminTab === 'dashboard' && (
            <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase">Live Telemetry</h2>
                  <p className="text-zinc-500 text-[10px] md:text-xs mt-1 md:mt-2 font-mono tracking-widest uppercase">Real-time Paddock Data</p>
                </div>
                <button onClick={() => syncWithGoogleSheet()} disabled={isSyncing} className="w-full sm:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-white/10 rounded-full">
                  <span className={isSyncing ? "animate-spin" : ""}>🔄</span> {isSyncing ? "SYNCING..." : "FORCE SYNC"}
                </button>
              </div>

              {/* Bento Grid Stats - Removed 'truncate' to prevent cutting off large numbers/names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-3xl relative overflow-hidden group hover:border-red-500/50 transition-colors">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-red-500/10 text-red-500 flex items-center justify-center rounded-xl md:rounded-2xl text-xl md:text-2xl mb-4 md:mb-6">👥</div>
                  <p className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1 md:mb-2">Total Entries</p>
                  <div className="text-4xl md:text-5xl font-black text-white break-words">{registrations.length}</div>
                </div>
                <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-3xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/10 text-emerald-500 flex items-center justify-center rounded-xl md:rounded-2xl text-xl md:text-2xl mb-4 md:mb-6">💰</div>
                  <p className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1 md:mb-2">Net Revenue</p>
                  <div className="text-3xl md:text-4xl font-black text-white font-mono break-words">฿{totalRevenueNum.toLocaleString()}</div>
                </div>
                <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-3xl relative overflow-hidden group hover:border-yellow-500/50 transition-colors">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-500/10 text-yellow-500 flex items-center justify-center rounded-xl md:rounded-2xl text-xl md:text-2xl mb-4 md:mb-6">🏆</div>
                  <p className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1 md:mb-2">Top Category</p>
                  <div className="text-xl md:text-2xl font-black text-white mt-1 uppercase break-words leading-tight">{topTicket?.name || '-'}</div>
                </div>
                <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-3xl relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/10 text-blue-500 flex items-center justify-center rounded-xl md:rounded-2xl text-xl md:text-2xl mb-4 md:mb-6">📊</div>
                  <p className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1 md:mb-2">Avg. Value</p>
                  <div className="text-3xl md:text-4xl font-black text-white font-mono break-words">฿{avgOrderValue.toLocaleString()}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="lg:col-span-1 bg-[#0a0a0a] p-6 md:p-8 border border-white/5 rounded-3xl">
                  <h3 className="text-base md:text-lg font-black text-white mb-6 uppercase">Pass Allocation</h3>
                  <div className="space-y-5 md:space-y-6">
                    {ticketStats.map((t, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-[10px] md:text-xs font-bold mb-2 uppercase">
                          <span className="text-zinc-400 break-words pr-2">{t.name}</span>
                          <span className="text-white flex-shrink-0">{t.count} <span className="text-zinc-600 font-normal font-mono">({t.percent}%)</span></span>
                        </div>
                        <div className="w-full h-2 bg-white/5 overflow-hidden rounded-full">
                          <div className={`h-full transition-all duration-1000 ${i===0?'bg-red-500':i===1?'bg-yellow-500':'bg-blue-500'}`} style={{ width: `${t.percent}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2 bg-[#0a0a0a] p-6 md:p-8 border border-white/5 flex flex-col rounded-3xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-base md:text-lg font-black text-white uppercase">Recent Entries</h3>
                    <button onClick={() => setAdminTab('users')} className="text-[9px] md:text-[10px] font-black text-zinc-500 hover:text-white uppercase tracking-widest bg-white/5 px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-colors">View All →</button>
                  </div>
                  {registrations.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 font-mono text-xs md:text-sm py-12 border border-dashed border-white/10 rounded-2xl">
                      NO DATA TRANSMITTED
                    </div>
                  ) : (
                    <div className="space-y-3 flex-1 overflow-x-auto">
                      {registrations.slice(0, 5).map(r => (
                        <div key={r.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/5 border border-white/5 hover:border-white/10 transition-colors rounded-2xl gap-3 sm:gap-0 min-w-[300px]">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="font-mono text-zinc-600 text-[10px] md:text-xs w-12 md:w-16 flex-shrink-0">{r.id.toString().slice(-6)}</div>
                            <div>
                              <div className="font-bold text-white text-xs md:text-sm uppercase break-words max-w-[150px] md:max-w-xs">{r.name}</div>
                              <div className="text-[9px] md:text-[10px] text-zinc-500 font-mono uppercase tracking-wider break-words max-w-[150px] md:max-w-xs">{r.company || r.email}</div>
                            </div>
                          </div>
                          <div className="flex sm:justify-end items-center gap-3 md:gap-4 ml-14 sm:ml-0">
                            {r.status === 'Checked In' && <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] flex-shrink-0"></span>}
                            <span className="inline-block px-2 py-1 text-[8px] md:text-[9px] font-black bg-black text-white uppercase tracking-widest border border-white/10 rounded-full break-words text-center max-w-[100px] md:max-w-[120px]">{r.ticketName || 'UNKNOWN PASS'}</span>
                            <div className="text-xs md:text-sm font-black text-emerald-400 font-mono w-16 md:w-24 text-right flex-shrink-0">฿{Number(r.totalPaid).toLocaleString()}</div>
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
                   <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">Track Check-In</h2>
                   <p className="text-zinc-500 text-[10px] md:text-xs mt-1 font-mono tracking-widest uppercase">Scan QR to verify entry</p>
                 </div>
               </div>

               <div className="bg-[#0a0a0a] border border-white/5 p-4 md:p-8 rounded-3xl shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[400px]">
                 
                 <div className="flex justify-center gap-4 mb-6 md:mb-8 relative z-10 w-full sm:w-auto">
                    <button onClick={() => setIsScanning(!isScanning)} className={`w-full sm:w-auto px-4 md:px-6 py-3 text-white text-[10px] md:text-xs font-black uppercase tracking-widest transition-all border rounded-full shadow-lg ${isScanning ? 'bg-red-500 hover:bg-red-600 border-red-500' : 'bg-emerald-500 hover:bg-emerald-600 border-emerald-500 text-black'}`}>
                      {isScanning ? '🛑 ปิดกล้องสแกน' : '📷 เปิดกล้อง (มือถือ/เว็บแคม)'}
                    </button>
                 </div>

                 {isScanning && (
                   <div id="qr-reader" className="w-full max-w-sm mx-auto overflow-hidden rounded-2xl border-4 border-emerald-500 mb-8 shadow-[0_0_30px_rgba(16,185,129,0.3)] relative z-10 bg-black"></div>
                 )}

                 <div className="relative z-10 w-full max-w-md">
                   {scanResult && (
                     <div className={`mb-8 p-6 rounded-3xl border ${scanResult.type === 'success' ? 'bg-emerald-900/20 border-emerald-500/50' : scanResult.type === 'duplicate' ? 'bg-yellow-900/20 border-yellow-500/50' : 'bg-red-900/20 border-red-500/50'} shadow-2xl transition-all`}>
                       <div className={`text-4xl md:text-5xl mb-4 ${scanResult.type === 'success' ? 'text-emerald-500' : scanResult.type === 'duplicate' ? 'text-yellow-500' : 'text-red-500'}`}>
                         {scanResult.type === 'success' ? '✅' : scanResult.type === 'duplicate' ? '⚠️' : '❌'}
                       </div>
                       <h3 className="text-lg md:text-xl font-black text-white uppercase mb-2 leading-tight">{scanResult.message}</h3>
                       
                       {scanResult.user && (
                         <div className="mt-5 pt-5 border-t border-white/10 text-left bg-black/30 p-4 md:p-5 rounded-2xl">
                           <div className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Rider Name</div>
                           <div className="text-lg md:text-xl font-black text-white uppercase mb-4 break-words">{scanResult.user.name}</div>
                           
                           <div className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Pass Level</div>
                           <div className={`text-xs md:text-sm font-black uppercase px-3 py-1 inline-block rounded-full border break-words ${scanResult.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'}`}>{scanResult.user.ticketName || 'UNKNOWN PASS'}</div>
                           
                           <div className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest mt-4 mb-1">Contact</div>
                           <div className="text-xs md:text-sm text-zinc-300 font-mono break-all">{scanResult.user.phone || '-'}</div>

                           {/* ปุ่ม Print Badge เมื่อสแกนผ่าน */}
                           <button onClick={() => printBadge(scanResult.user)} className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white text-[10px] md:text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_15px_rgba(37,130,246,0.3)]">
                             🖨️ PRINT BADGE
                           </button>
                         </div>
                       )}
                     </div>
                   )}

                   <form onSubmit={(e) => { e.preventDefault(); processScan(scanQuery); setScanQuery(''); }} className="relative">
                     <label className="block text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 md:mb-3">Or use USB/Bluetooth Scanner here</label>
                     <input 
                       ref={scannerInputRef}
                       type="text" 
                       value={scanQuery}
                       onChange={e => setScanQuery(e.target.value)}
                       placeholder="CLICK TO SCAN..." 
                       className="w-full p-4 md:p-5 bg-black border-2 border-dashed border-zinc-700 focus:border-red-500 focus:bg-[#0f0f11] text-center font-mono text-xs md:text-sm text-white outline-none rounded-2xl transition-all uppercase tracking-widest shadow-inner"
                     />
                   </form>
                 </div>
               </div>
             </div>
          )}

          {adminTab === 'users' && (
             <div className="max-w-7xl mx-auto space-y-4 md:space-y-6 relative z-10">
               <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-4 md:mb-6 uppercase">Entry List</h2>
               <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl md:rounded-3xl overflow-hidden">
                 {registrations.length === 0 ? (
                   <div className="text-center py-20 text-zinc-600 text-xs md:text-sm font-mono uppercase">Awaiting Entries...</div>
                 ) : (
                   <div className="overflow-x-auto">
                     <table className="w-full text-left border-collapse min-w-[750px]">
                       <thead>
                         <tr className="bg-white/5 border-b border-white/5 text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                           <th className="py-4 px-4 md:py-5 md:px-8">Rider / Crew Info</th>
                           <th className="py-4 px-4 md:py-5 md:px-8">Comms</th>
                           <th className="py-4 px-4 md:py-5 md:px-8">Pass Type</th>
                           <th className="py-4 px-4 md:py-5 md:px-8 font-mono text-center">Status</th>
                           <th className="py-4 px-4 md:py-5 md:px-8 text-center">Action</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5 text-xs md:text-sm">
                         {registrations.map(r => (
                           <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                             {editingUserId === r.id ? (
                               <>
                                 <td className="py-4 px-4 md:px-8 space-y-2">
                                   <input className="w-full p-2 md:p-3 bg-black border border-white/10 text-xs md:text-sm text-white font-bold uppercase rounded-xl focus:border-red-500 outline-none" value={editUserForm.name} onChange={e => setEditUserForm({...editUserForm, name: e.target.value})} placeholder="Name" />
                                   <input className="w-full p-2 md:p-3 bg-black border border-white/10 text-[10px] md:text-xs text-white uppercase rounded-xl focus:border-red-500 outline-none" value={editUserForm.company} onChange={e => setEditUserForm({...editUserForm, company: e.target.value})} placeholder="Team" />
                                 </td>
                                 <td className="py-4 px-4 md:px-8 space-y-2">
                                   <input className="w-full p-2 md:p-3 bg-black border border-white/10 text-[10px] md:text-xs text-zinc-300 font-mono rounded-xl focus:border-red-500 outline-none" value={editUserForm.email} onChange={e => setEditUserForm({...editUserForm, email: e.target.value})} placeholder="Email" />
                                   <input className="w-full p-2 md:p-3 bg-black border border-white/10 text-[10px] md:text-xs text-zinc-300 font-mono rounded-xl focus:border-red-500 outline-none" value={editUserForm.phone} onChange={e => setEditUserForm({...editUserForm, phone: e.target.value})} placeholder="Phone" />
                                 </td>
                                 <td className="py-4 px-4 md:px-8">
                                    <select className="w-full p-2 md:p-3 bg-black border border-white/10 text-[10px] md:text-xs text-white uppercase rounded-xl focus:border-red-500 outline-none" value={editUserForm.ticketName || ''} onChange={e => setEditUserForm({...editUserForm, ticketName: e.target.value})}>
                                      <option value="">-- เลือกบัตร --</option>
                                      {config.tickets?.map(t => (
                                        <option key={t.id} value={t.name}>{t.name}</option>
                                      ))}
                                    </select>
                                 </td>
                                 <td className="py-4 px-4 md:px-8 text-center">
                                    <select className="bg-black border border-white/10 text-[10px] md:text-xs text-white p-1.5 md:p-2 rounded-lg outline-none uppercase font-bold" value={editUserForm.status || 'Pending'} onChange={e => setEditUserForm({...editUserForm, status: e.target.value})}>
                                      <option value="Pending">Pending</option>
                                      <option value="Checked In">Checked In</option>
                                    </select>
                                 </td>
                                 <td className="py-4 px-4 md:px-8 text-center space-x-1 md:space-x-2 whitespace-nowrap">
                                   <button onClick={saveUserEdit} className="px-3 md:px-4 py-1.5 md:py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-[8px] md:text-[10px] font-black uppercase tracking-wider rounded-full transition-colors">Save</button>
                                   <button onClick={() => setEditingUserId(null)} className="px-3 md:px-4 py-1.5 md:py-2 bg-white/5 hover:bg-white/10 text-white text-[8px] md:text-[10px] font-black uppercase tracking-wider border border-white/10 rounded-full transition-colors">Cancel</button>
                                 </td>
                               </>
                             ) : (
                               <>
                                 <td className="py-4 md:py-6 px-4 md:px-8 max-w-[200px]">
                                   <div className="font-black text-white text-xs md:text-sm uppercase break-words">{r.name}</div>
                                   <div className="text-[9px] md:text-[10px] text-zinc-500 font-bold mt-1 uppercase tracking-wider break-words">{r.company || '-'}</div>
                                 </td>
                                 <td className="py-4 md:py-6 px-4 md:px-8 max-w-[180px]">
                                   <div className="text-zinc-300 font-mono text-[10px] md:text-xs break-all">{r.email}</div>
                                   <div className="text-[9px] md:text-[10px] text-zinc-600 mt-1 font-mono">{r.phone}</div>
                                 </td>
                                 <td className="py-4 md:py-6 px-4 md:px-8 max-w-[150px]">
                                   <span className="px-2 md:px-4 py-1 md:py-1.5 text-[8px] md:text-[9px] font-black bg-black text-zinc-300 border border-white/10 uppercase tracking-widest rounded-full break-words inline-block text-center">{r.ticketName || 'UNKNOWN PASS'}</span>
                                 </td>
                                 <td className="py-4 md:py-6 px-4 md:px-8 text-center">
                                    {r.status === 'Checked In' ? (
                                       <span className="px-2 md:px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] md:text-[10px] font-black uppercase tracking-wider rounded-full shadow-[0_0_10px_rgba(16,185,129,0.2)]">Checked In</span>
                                    ) : (
                                       <span className="px-2 md:px-3 py-1 bg-zinc-800 text-zinc-400 border border-zinc-700 text-[8px] md:text-[10px] font-black uppercase tracking-wider rounded-full">Pending</span>
                                    )}
                                 </td>
                                 <td className="py-4 md:py-6 px-4 md:px-8 text-center space-x-1 md:space-x-2 whitespace-nowrap">
                                   <button onClick={() => printBadge(r)} className="px-2 md:px-3 py-1 md:py-1.5 text-blue-400 hover:text-white bg-black border border-white/10 font-black text-[8px] md:text-[10px] uppercase tracking-wider rounded-full transition-colors" title="Print Badge">Print</button>
                                   <button onClick={() => startEditUser(r)} className="px-2 md:px-3 py-1 md:py-1.5 text-zinc-400 hover:text-white bg-black border border-white/10 font-black text-[8px] md:text-[10px] uppercase tracking-wider rounded-full transition-colors" title="Edit">Edit</button>
                                   <button onClick={() => deleteUser(r.id)} className="px-2 md:px-3 py-1 md:py-1.5 text-rose-500 hover:text-white bg-black border border-white/10 font-black text-[8px] md:text-[10px] uppercase tracking-wider rounded-full transition-colors" title="Delete">Del</button>
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
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">Event Config</h2>
                <button onClick={handleSaveConfig} className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-[10px] md:text-xs tracking-widest shadow-lg shadow-emerald-500/20 transition-all rounded-full">
                  💾 SAVE CONFIG
                </button>
              </div>

              {/* BACKGROUND IMAGES SETTING */}
              <div className="bg-[#0a0a0a] p-6 md:p-8 border border-white/5 shadow-xl space-y-6 rounded-2xl md:rounded-3xl">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="text-base md:text-lg font-black text-white uppercase">🖼️ Background Images</h3>
                  <p className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest mt-1">ใส่ลิงก์รูปภาพ (URL) สำหรับเปลี่ยนพื้นหลังเว็บ</p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  <div className="space-y-1.5 md:space-y-2">
                    <label className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Hero Background (ภาพเปิดด้านบนสุด)</label>
                    <input type="text" value={config.heroBg} onChange={(e) => setConfig({...config, heroBg: e.target.value})} placeholder="https://..." className="w-full p-3 md:p-4 bg-black border border-white/10 text-xs md:text-sm font-mono text-blue-400 focus:border-red-500 outline-none rounded-xl" />
                  </div>
                  <div className="space-y-1.5 md:space-y-2">
                    <label className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Sponsors Background (ภาพพื้นหลังแบรนด์สปอนเซอร์)</label>
                    <input type="text" value={config.sponsorBg} onChange={(e) => setConfig({...config, sponsorBg: e.target.value})} placeholder="https://..." className="w-full p-3 md:p-4 bg-black border border-white/10 text-xs md:text-sm font-mono text-blue-400 focus:border-red-500 outline-none rounded-xl" />
                  </div>
                </div>
              </div>

              {/* VIDEO ON DEMAND SETTINGS */}
              <div className="bg-[#0a0a0a] p-6 md:p-8 border border-white/5 shadow-xl space-y-6 rounded-2xl md:rounded-3xl">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <h3 className="text-base md:text-lg font-black text-white uppercase">🎬 VOD Highlight</h3>
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" className="sr-only" checked={config.showVideo} onChange={(e) => setConfig({...config, showVideo: e.target.checked})} />
                      <div className={`block w-10 md:w-12 h-5 md:h-6 transition-colors border border-white/10 rounded-full ${config.showVideo ? 'bg-emerald-500' : 'bg-black'}`}></div>
                      <div className={`dot absolute left-1 top-1 w-3 md:w-4 h-3 md:h-4 rounded-full transition-transform ${config.showVideo ? 'bg-black transform translate-x-5 md:translate-x-6' : 'bg-zinc-600'}`}></div>
                    </div>
                    <span className="ml-3 text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">{config.showVideo ? 'LIVE' : 'OFFLINE'}</span>
                  </label>
                </div>
                
                {config.showVideo && (
                  <div className="grid grid-cols-1 gap-4 md:gap-6">
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Video Title</label>
                      <input type="text" value={config.videoTitle} onChange={(e) => setConfig({...config, videoTitle: e.target.value})} className="w-full p-3 md:p-4 bg-black border border-white/10 text-xs md:text-sm font-bold text-white focus:border-red-500 outline-none uppercase rounded-xl" />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">YouTube Video Link</label>
                      <input type="text" value={config.videoUrl} onChange={(e) => setConfig({...config, videoUrl: e.target.value})} className="w-full p-3 md:p-4 bg-black border border-white/10 text-xs md:text-sm text-blue-400 font-mono focus:border-red-500 outline-none rounded-xl" />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Description</label>
                      <textarea value={config.videoDesc} onChange={(e) => setConfig({...config, videoDesc: e.target.value})} className="w-full p-3 md:p-4 bg-black border border-white/10 text-xs text-zinc-300 focus:border-red-500 outline-none rounded-xl" rows="3"></textarea>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-[#0a0a0a] p-6 md:p-8 border border-white/5 shadow-xl space-y-6 md:space-y-8 rounded-2xl md:rounded-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-[9px] md:text-[10px] font-black text-zinc-400 uppercase tracking-widest">Primary Color</label>
                        <div className="flex gap-2 md:gap-3">
                            <input type="color" value={config.primaryColor} onChange={(e) => setConfig({...config, primaryColor: e.target.value})} className="w-12 md:w-14 h-12 md:h-14 bg-black border border-white/10 cursor-pointer p-1 rounded-xl flex-shrink-0" />
                            <input type="text" value={config.primaryColor} onChange={(e) => setConfig({...config, primaryColor: e.target.value})} className="w-full p-3 md:p-4 bg-black border border-white/10 text-xs md:text-sm font-bold text-white font-mono uppercase outline-none rounded-xl" />
                        </div>
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-[9px] md:text-[10px] font-black text-zinc-400 uppercase tracking-widest">Secondary Color</label>
                        <div className="flex gap-2 md:gap-3">
                            <input type="color" value={config.secondaryColor} onChange={(e) => setConfig({...config, secondaryColor: e.target.value})} className="w-12 md:w-14 h-12 md:h-14 bg-black border border-white/10 cursor-pointer p-1 rounded-xl flex-shrink-0" />
                            <input type="text" value={config.secondaryColor} onChange={(e) => setConfig({...config, secondaryColor: e.target.value})} className="w-full p-3 md:p-4 bg-black border border-white/10 text-xs md:text-sm font-bold text-white font-mono uppercase outline-none rounded-xl" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <div className="space-y-1.5 md:space-y-2"><label className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Event Title</label><input type="text" value={config.title} onChange={(e) => setConfig({...config, title: e.target.value})} className="w-full p-3 md:p-4 bg-black border border-white/10 text-xs md:text-sm font-black text-white focus:border-red-500 outline-none uppercase rounded-xl" /></div>
                  <div className="space-y-1.5 md:space-y-2"><label className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Subtitle / Tagline</label><input type="text" value={config.subtitle} onChange={(e) => setConfig({...config, subtitle: e.target.value})} className="w-full p-3 md:p-4 bg-black border border-white/10 text-xs md:text-sm text-white focus:border-red-500 outline-none font-bold rounded-xl" /></div>
                  <div className="space-y-1.5 md:space-y-2"><label className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Event Date</label><input type="text" value={config.date} onChange={(e) => setConfig({...config, date: e.target.value})} className="w-full p-3 md:p-4 bg-black border border-white/10 text-xs md:text-sm font-bold text-white focus:border-red-500 outline-none uppercase rounded-xl" /></div>
                  <div className="space-y-1.5 md:space-y-2"><label className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Countdown Target</label><input type="datetime-local" value={config.targetDate?.slice(0,16)} onChange={(e) => setConfig({...config, targetDate: e.target.value + ":00"})} className="w-full p-3 md:p-4 bg-black border border-white/10 text-xs md:text-sm font-mono text-zinc-300 focus:border-red-500 outline-none rounded-xl [color-scheme:dark]" /></div>
                  <div className="md:col-span-2 space-y-1.5 md:space-y-2"><label className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Location</label><input type="text" value={config.location} onChange={(e) => setConfig({...config, location: e.target.value})} className="w-full p-3 md:p-4 bg-black border border-white/10 text-xs md:text-sm font-bold text-white focus:border-red-500 outline-none uppercase rounded-xl" /></div>
                  <div className="md:col-span-2 space-y-1.5 md:space-y-2"><label className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Description</label><textarea value={config.aboutText} onChange={(e) => setConfig({...config, aboutText: e.target.value})} className="w-full p-3 md:p-4 bg-black border border-white/10 text-xs md:text-sm text-zinc-300 focus:border-red-500 outline-none rounded-xl" rows="4"></textarea></div>
                </div>
              </div>
            </div>
          )}

          {adminTab === 'speakers' && (
            <div className="max-w-6xl mx-auto space-y-6 relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">Riders & Crew</h2>
                <button onClick={handleSaveConfig} className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-[10px] md:text-xs tracking-widest shadow-lg rounded-full transition-all">
                  💾 SAVE CONFIG
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {config.speakers?.map(speaker => (
                  <div key={speaker.id} className="bg-[#0a0a0a] p-6 md:p-8 border border-white/5 relative rounded-2xl md:rounded-3xl shadow-xl">
                    <button onClick={() => removeArrayItem('speakers', speaker.id)} className="absolute top-4 md:top-6 right-4 md:right-6 px-3 py-1.5 md:px-4 md:py-2 bg-rose-500/10 text-rose-500 border border-rose-500/20 text-[9px] md:text-[10px] font-black uppercase hover:bg-rose-500/20 transition-all rounded-full">Delete</button>
                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-start mb-6">
                      <img src={speaker.img} className="w-20 h-20 md:w-28 md:h-28 object-cover border-2 border-white/10 rounded-2xl" alt="speaker" />
                      
                      <div className="flex-1 w-full space-y-2 md:space-y-3">
                        <div className="space-y-1 md:space-y-1.5">
                          <label className="block text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Image URL</label>
                          <input type="text" value={speaker.img} onChange={(e) => handleArrayChange('speakers', speaker.id, 'img', e.target.value)} className="w-full p-2.5 md:p-3 bg-black border border-white/10 text-[10px] md:text-xs font-mono text-blue-400 focus:border-red-500 outline-none rounded-xl" placeholder="https://..." />
                        </div>
                        <div className="space-y-1 md:space-y-1.5">
                          <label className="block text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Or Upload File</label>
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'speakers', speaker.id)} className="w-full text-[10px] md:text-xs text-zinc-400 file:mr-2 md:file:mr-4 file:py-1.5 file:px-3 md:file:px-4 file:border-0 file:text-[9px] md:file:text-[10px] file:font-black file:uppercase file:bg-white/5 file:text-white hover:file:bg-white/10 file:rounded-full cursor-pointer" />
                        </div>
                      </div>

                    </div>
                    <div className="space-y-3 md:space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        <input type="text" value={speaker.name} onChange={(e) => handleArrayChange('speakers', speaker.id, 'name', e.target.value)} className="w-full p-3 md:p-3.5 bg-black border border-white/10 text-xs md:text-sm font-black uppercase text-white focus:border-red-500 outline-none rounded-xl" placeholder="Name" />
                        <input type="text" value={speaker.role} onChange={(e) => handleArrayChange('speakers', speaker.id, 'role', e.target.value)} className="w-full p-3 md:p-3.5 bg-black border border-white/10 text-[10px] md:text-xs font-bold uppercase text-zinc-400 focus:border-red-500 outline-none rounded-xl" placeholder="Team" />
                      </div>
                      <div className="flex gap-3 md:gap-4">
                         <input type="text" value={speaker.tag} onChange={(e) => handleArrayChange('speakers', speaker.id, 'tag', e.target.value)} className="flex-1 p-3 md:p-3.5 bg-black border border-white/10 text-[10px] md:text-xs font-black text-white uppercase focus:border-red-500 outline-none rounded-xl" placeholder="Category" />
                         <input type="color" value={speaker.color} onChange={(e) => handleArrayChange('speakers', speaker.id, 'color', e.target.value)} className="w-12 md:w-14 h-10 md:h-12 bg-black border border-white/10 cursor-pointer p-1 rounded-xl" />
                      </div>
                      <textarea value={speaker.desc} onChange={(e) => handleArrayChange('speakers', speaker.id, 'desc', e.target.value)} className="w-full p-3 md:p-4 bg-black border border-white/10 text-[10px] md:text-xs text-zinc-400 focus:border-red-500 outline-none rounded-xl" rows="3" placeholder="Bio..."></textarea>
                    </div>
                  </div>
                ))}
                <button onClick={addSpeaker} className="min-h-[150px] md:min-h-[300px] border-2 border-dashed border-white/10 hover:border-white/30 text-zinc-500 hover:text-white font-black text-xs md:text-sm uppercase transition-all flex flex-col items-center justify-center gap-2 md:gap-4 bg-[#0a0a0a] rounded-2xl md:rounded-3xl p-6">
                  <span className="text-3xl md:text-5xl font-light">+</span> Add Personnel
                </button>
              </div>
            </div>
          )}

          {adminTab === 'schedule' && (
            <div className="max-w-4xl mx-auto space-y-6 relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">Race Schedule</h2>
                <button onClick={handleSaveConfig} className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-[10px] md:text-xs tracking-widest shadow-lg rounded-full transition-all">
                  💾 SAVE CONFIG
                </button>
              </div>
              <div className="space-y-4 md:space-y-6">
                {config.schedule?.map(s => (
                  <div key={s.id} className="bg-[#0a0a0a] p-6 md:p-8 border border-white/5 flex flex-col sm:flex-row gap-4 md:gap-8 relative group rounded-2xl md:rounded-3xl shadow-xl">
                    <button onClick={() => removeArrayItem('schedule', s.id)} className="absolute top-4 right-4 md:top-6 md:right-6 md:opacity-0 group-hover:opacity-100 px-3 py-1.5 md:px-4 md:py-2 bg-rose-500/10 text-rose-500 border border-rose-500/20 text-[9px] md:text-[10px] font-black uppercase transition-all rounded-full">Delete</button>
                    <div className="w-full sm:w-28 md:w-32 flex sm:flex-col gap-3 md:gap-4">
                      <input type="text" value={s.time} onChange={(e) => handleArrayChange('schedule', s.id, 'time', e.target.value)} className="w-full p-3 md:p-4 bg-black border border-white/10 text-center font-black text-lg md:text-2xl text-white focus:border-red-500 outline-none rounded-xl" />
                      <input type="color" value={s.color} onChange={(e) => handleArrayChange('schedule', s.id, 'color', e.target.value)} className="w-12 sm:w-full h-12 sm:h-10 md:h-10 bg-black border border-white/10 cursor-pointer p-1 rounded-xl flex-shrink-0" />
                    </div>
                    <div className="flex-1 space-y-3 md:space-y-4 sm:pr-8 md:pr-10">
                      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                        <input type="text" value={s.tag} onChange={(e) => handleArrayChange('schedule', s.id, 'tag', e.target.value)} className="w-full sm:w-32 p-2.5 md:p-3 bg-black border border-white/10 text-[9px] md:text-[10px] font-black text-zinc-400 uppercase tracking-widest focus:border-red-500 outline-none rounded-xl" placeholder="TAG" />
                        <input type="text" value={s.title} onChange={(e) => handleArrayChange('schedule', s.id, 'title', e.target.value)} className="flex-1 p-2.5 md:p-3 bg-black border border-white/10 text-xs md:text-sm font-black uppercase text-white focus:border-red-500 outline-none rounded-xl" placeholder="Session Title" />
                      </div>
                      <textarea value={s.desc} onChange={(e) => handleArrayChange('schedule', s.id, 'desc', e.target.value)} className="w-full p-3 md:p-4 bg-black border border-white/10 text-[10px] md:text-sm text-zinc-400 focus:border-red-500 outline-none rounded-xl" rows="3" placeholder="Description"></textarea>
                    </div>
                  </div>
                ))}
                <button onClick={addSchedule} className="w-full py-6 md:py-8 border-2 border-dashed border-white/10 hover:border-white/30 text-zinc-500 hover:text-white font-black text-xs md:text-sm uppercase transition-all bg-[#0a0a0a] rounded-2xl md:rounded-3xl">
                  + Add Track Session
                </button>
              </div>
            </div>
          )}

          {adminTab === 'tickets' && (
            <div className="max-w-6xl mx-auto space-y-6 relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                 <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">Ticketing & Passes</h2>
                 <div className="flex w-full sm:w-auto gap-3 md:gap-4">
                   <button onClick={addTicket} className="flex-1 sm:flex-none px-4 md:px-6 py-3 md:py-3.5 bg-white/10 hover:bg-white/20 text-white text-[10px] md:text-[11px] font-black uppercase tracking-wider shadow-lg border border-white/10 transition-all rounded-full">+ Add Pass</button>
                   <button onClick={handleSaveConfig} className="flex-1 sm:flex-none px-6 md:px-8 py-3 md:py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-[10px] md:text-xs tracking-widest shadow-lg rounded-full transition-all">
                     💾 SAVE CONFIG
                   </button>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {config.tickets?.map(ticket => (
                  <div key={ticket.id} className="bg-[#0a0a0a] p-6 md:p-8 border border-white/5 flex flex-col gap-4 md:gap-5 relative rounded-2xl md:rounded-3xl shadow-xl">
                    <button onClick={() => removeArrayItem('tickets', ticket.id)} className="absolute top-4 right-4 md:top-6 md:right-6 px-3 py-1.5 md:px-4 md:py-2 bg-rose-500/10 text-rose-500 border border-rose-500/20 text-[9px] md:text-[10px] font-black uppercase transition-all z-10 rounded-full">Delete</button>
                    
                    <div className="space-y-1 md:space-y-1.5">
                      <label className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-2">Pass Name</label>
                      <input type="text" value={ticket.name} onChange={(e) => handleArrayChange('tickets', ticket.id, 'name', e.target.value)} className="w-full p-3 md:p-4 bg-black border border-white/10 text-sm md:text-lg font-black uppercase text-white focus:border-red-500 outline-none text-center rounded-xl" />
                    </div>

                    <div className="space-y-1 md:space-y-1.5">
                      <label className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-2">Price (THB)</label>
                      <div className="relative">
                         <span className="absolute left-4 md:left-5 top-3.5 md:top-4 text-zinc-600 font-black text-sm md:text-base">฿</span>
                         <input type="number" value={ticket.price} onChange={(e) => handleArrayChange('tickets', ticket.id, 'price', e.target.value)} className="w-full p-3 md:p-4 pl-8 md:pl-10 bg-black border border-white/10 text-xl md:text-2xl font-black font-mono text-emerald-400 focus:border-red-500 outline-none text-center rounded-xl" />
                      </div>
                    </div>

                    <div className="space-y-1 md:space-y-1.5">
                      <label className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-2">Highlight Badge (Optional)</label>
                      <input type="text" value={ticket.badge || ''} onChange={(e) => handleArrayChange('tickets', ticket.id, 'badge', e.target.value)} className="w-full p-2.5 md:p-3 bg-black border border-white/10 text-[10px] md:text-xs font-bold text-yellow-500 uppercase text-center outline-none rounded-xl" placeholder="e.g. VIP ZONE" />
                    </div>

                    <div className="space-y-1 md:space-y-1.5 flex-1 flex flex-col">
                      <label className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-2">Access & Perks</label>
                      <textarea value={ticket.features} onChange={(e) => handleArrayChange('tickets', ticket.id, 'features', e.target.value)} className="w-full flex-1 p-3 md:p-4 bg-black border border-white/10 text-[10px] md:text-xs text-zinc-400 focus:border-red-500 outline-none leading-relaxed rounded-xl" rows="5"></textarea>
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