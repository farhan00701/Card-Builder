import React, { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import { Upload, Download, Image as ImageIcon, User, Calendar, MapPin, Hash, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function App() {
  const [name, setName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [rightLogo, setRightLogo] = useState<string | null>(null);
  const [appLogo, setAppLogo] = useState<string | null>(null);
  
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleRightLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setRightLogo(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAppLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAppLogo(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const downloadCard = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(cardRef.current, {
          quality: 1,
          pixelRatio: 2,
        });
        const link = document.createElement('a');
        link.download = `alumni-card-${name.replace(/\s+/g, '-').toLowerCase() || '1995'}.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Error generating card:', error);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen w-full lg:overflow-hidden bg-[#f4f7f6] text-[#2d3436] font-['Helvetica_Neue',Arial,sans-serif]">
      {/* Sidebar */}
      <aside className="w-full lg:w-[360px] lg:h-full bg-white border-b lg:border-b-0 lg:border-r border-[#ddd] flex flex-col p-5 sm:p-6 shrink-0 lg:overflow-y-auto z-20">
        <div className="flex flex-col items-center justify-center text-center gap-3 mb-8">
          <label className="cursor-pointer group relative">
            {appLogo ? (
              <img src={appLogo} alt="App Logo" className="w-32 h-32 object-contain drop-shadow-md" />
            ) : (
              <div className="w-32 h-32 bg-[#f8f9fa] rounded-full flex flex-col items-center justify-center border-2 border-dashed border-[#ccc] group-hover:border-[#1a2a6c] transition-colors shadow-inner">
                <Upload className="w-6 h-6 text-[#888] mb-1" />
                <span className="text-[10px] text-[#888] font-medium leading-tight">Upload<br/>Top Logo</span>
              </div>
            )}
            <input type="file" className="hidden" accept="image/*" onChange={handleAppLogoUpload} />
          </label>
          <div className="text-[20px] font-bold text-[#1a2a6c] tracking-[-0.5px]">
            Alumni Card Builder
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-[11px] font-semibold uppercase text-[#888] mb-1.5 tracking-[0.5px]">Participant Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-[#888]" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jane Doe"
              className="w-full pl-9 pr-3 py-2.5 border border-[#ddd] rounded-md text-[14px] bg-[#fafafa] focus:outline-none focus:border-[#1a2a6c] focus:ring-1 focus:ring-[#1a2a6c]"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-[11px] font-semibold uppercase text-[#888] mb-1.5 tracking-[0.5px]">Registration Number</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Hash className="h-4 w-4 text-[#888]" />
            </div>
            <input
              type="text"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              placeholder="e.g. SSC95-1042"
              className="w-full pl-9 pr-3 py-2.5 border border-[#ddd] rounded-md text-[14px] bg-[#fafafa] focus:outline-none focus:border-[#1a2a6c] focus:ring-1 focus:ring-[#1a2a6c]"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-[11px] font-semibold uppercase text-[#888] mb-1.5 tracking-[0.5px]">Event Date</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-4 w-4 text-[#888]" />
            </div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 border border-[#ddd] rounded-md text-[14px] bg-[#fafafa] focus:outline-none focus:border-[#1a2a6c] focus:ring-1 focus:ring-[#1a2a6c]"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-[11px] font-semibold uppercase text-[#888] mb-1.5 tracking-[0.5px]">Venue</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-4 w-4 text-[#888]" />
            </div>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="e.g. Grand Hotel"
              className="w-full pl-9 pr-3 py-2.5 border border-[#ddd] rounded-md text-[14px] bg-[#fafafa] focus:outline-none focus:border-[#1a2a6c] focus:ring-1 focus:ring-[#1a2a6c]"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-2 mb-6">
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#ccc] p-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-[#1a2a6c] hover:bg-[#f0f4ff]">
            <ImageIcon className="w-5 h-5 text-[#666] mb-1" />
            <span className="text-[9px] text-center text-[#666] mt-1">Left Logo</span>
            <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
          </label>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#ccc] p-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-[#1a2a6c] hover:bg-[#f0f4ff]">
            <Upload className="w-5 h-5 text-[#666] mb-1" />
            <span className="text-[9px] text-center text-[#666] mt-1">Right Graphic</span>
            <input type="file" className="hidden" accept="image/*" onChange={handleRightLogoUpload} />
          </label>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#ccc] p-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-[#1a2a6c] hover:bg-[#f0f4ff]">
            <User className="w-5 h-5 text-[#666] mb-1" />
            <span className="text-[9px] text-center text-[#666] mt-1">Your Photo</span>
            <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
          </label>
        </div>

        <button
          onClick={downloadCard}
          className="mt-auto bg-[#1a2a6c] text-white border-none p-4 rounded-lg font-semibold text-[15px] cursor-pointer shadow-[0_4px_12px_rgba(26,42,108,0.2)] hover:bg-[#152259] transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Generate & Download Card
        </button>
        <footer className="text-center text-sm text-gray-500 pt-6 pb-2">
          Made with ❤️ for Sawkot Hasan Bhai
        </footer>
      </aside>

      {/* Main Preview */}
      <main className="flex w-full lg:flex-1 lg:h-full bg-[#e0e0e0] flex-col items-center justify-center relative overflow-hidden lg:overflow-auto min-h-[500px] sm:min-h-[550px] lg:min-h-0 py-8 z-10">
        <div className="transform scale-[0.65] sm:scale-90 lg:scale-100 flex items-center justify-center origin-center">
        {/* We wrap the card in a padded container and attach cardRef here so html-to-image captures the drop shadow */}
        <div ref={cardRef} className="p-10 bg-transparent flex items-center justify-center shrink-0">
          <div className="w-[380px] h-[580px] bg-white rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.3)] relative flex flex-col shrink-0 overflow-hidden">
            {/* Top Blue Section */}
            <div className="bg-[#0b1b32] h-[200px] w-full relative shrink-0">
            {/* Header content */}
            <div className="flex items-center gap-4 p-6 relative z-10">
              {/* Logo */}
              <div className="w-14 h-14 rounded-full bg-transparent flex items-center justify-center overflow-hidden shrink-0">
                {logo ? (
                  <img src={logo} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full border border-[#c1a661] rounded-full flex items-center justify-center text-[#c1a661] text-[10px] text-center p-1">Logo</div>
                )}
              </div>
              <h1 className="text-[26px] font-bold text-white tracking-wide">EID REUNION</h1>
            </div>
            
            {/* Right Graphic */}
            <div className="absolute top-2 right-4 pointer-events-none z-20 flex justify-end">
              {rightLogo ? (
                <img src={rightLogo} className="w-[100px] h-auto object-contain" alt="Right Graphic" />
              ) : (
                <div className="relative w-[180px] h-[180px] transform scale-[0.55] origin-top-right">
                  <div className="absolute top-2 right-14 text-[130px] font-black text-[#a53626] leading-none tracking-tighter" style={{ fontFamily: 'Arial, sans-serif' }}>9</div>
                  <div className="absolute top-14 right-[-10px] text-[130px] font-black text-[#8cb33e] leading-none tracking-tighter" style={{ fontFamily: 'Arial, sans-serif' }}>5</div>
                  <div className="absolute top-6 right-[100px] text-[60px] font-black text-[#a53626] leading-none" style={{ fontFamily: 'Arial, sans-serif' }}>‘</div>
                  <div className="absolute top-[85px] right-[10px] bg-[#a53626] text-white text-[11px] font-bold px-10 py-1 transform -rotate-45 shadow-sm z-10 tracking-wider">BATCH</div>
                  <div className="absolute bottom-[25px] right-[5px] text-[#f4d03f] text-[40px] leading-none transform -rotate-12 z-20" style={{ fontFamily: "'Brush Script MT', 'Comic Sans MS', cursive" }}>friends</div>
                </div>
              )}
            </div>

            {/* Gold Divider */}
            <div className="absolute bottom-0 left-0 w-full h-[8px] bg-[#c1a661]"></div>
          </div>

          {/* Bottom White Section */}
          <div className="flex-1 w-full relative pt-[150px] px-8 pb-8 flex flex-col">
            
            {/* Profile Photo (Absolute positioned to overlap) */}
            <div className="absolute top-[-130px] left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
              <div className="w-[260px] h-[260px] bg-[#f5f5f5] rounded-full border-[10px] border-[#c1a661] overflow-hidden relative">
                {photo ? (
                  <img src={photo} alt="Participant" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#ccc] bg-white">
                    <User className="w-32 h-32" />
                  </div>
                )}
              </div>
              {/* Verified Badge */}
              <div className="absolute bottom-6 right-[-10px] bg-[#42a047] text-white text-[12px] px-3 py-1.5 rounded-md font-bold uppercase flex items-center gap-1.5 shadow-md z-30">
                <div className="bg-white rounded-full p-0.5 flex items-center justify-center">
                  <Check className="w-3 h-3 text-[#42a047]" strokeWidth={4} />
                </div>
                VERIFIED MEMBER
              </div>
            </div>

            {/* Details and QR Code Container */}
            <div className="flex justify-between items-end h-full w-full">
              {/* Left Column: Details */}
              <div className="flex flex-col gap-3 w-[55%]">
                <div>
                  <div className="text-[12px] font-bold text-[#c1a661] uppercase mb-0.5">NAME:</div>
                  <div className="text-[18px] text-[#0b1b32] font-medium leading-tight">{name || 'Participant Name'}</div>
                </div>
                <div>
                  <div className="text-[12px] font-bold text-[#c1a661] uppercase mb-0.5">REGISTRATION:</div>
                  <div className="text-[18px] text-[#0b1b32] font-medium leading-tight">{regNo || 'REG-NUMBER'}</div>
                </div>
                <div>
                  <div className="text-[12px] font-bold text-[#c1a661] uppercase mb-0.5">VENUE:</div>
                  <div className="text-[18px] text-[#0b1b32] font-medium leading-tight">{venue || 'Event Venue'}</div>
                </div>
                <div>
                  <div className="text-[12px] font-bold text-[#c1a661] uppercase mb-0.5">EVENT DATE:</div>
                  <div className="text-[18px] text-[#0b1b32] font-medium leading-tight">
                    {date ? new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'October 25, 2026'}
                  </div>
                </div>
              </div>

              {/* Right Column: QR Code */}
              <div className="flex flex-col items-center gap-2 shrink-0 mb-2">
                <div className="text-[14px] font-bold text-[#c1a661] uppercase tracking-wide">SSC 1995 BATCH</div>
                <div className="w-[140px] h-[140px] bg-white p-2 rounded-xl border-[4px] border-[#0b1b32] flex items-center justify-center">
                  <QRCodeSVG 
                    value={`SSC 1995 BATCH\nName: ${name || 'N/A'}\nReg No: ${regNo || 'N/A'}\nDate: ${date ? new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A'}\nVenue: ${venue || 'N/A'}`} 
                    size={116} 
                    level="M"
                    includeMargin={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
      </main>
    </div>
  );
}
