const fs = require('fs');
let content = fs.readFileSync('src/components/ContactPage.tsx', 'utf8');

// 1. Fix wrappers to match PortfolioPage hero position
content = content.replace(
  '<div className="w-full bg-[#FAFBFF] min-h-screen pt-24 pb-20 overflow-x-hidden font-sans">',
  '<div className="w-full bg-[#f8fafc] min-h-screen overflow-x-hidden font-sans">'
);
content = content.replace(
  '<section className="w-full pt-20 pb-16 relative overflow-hidden">',
  '<section className="w-full pt-20 pb-16 bg-white relative overflow-hidden">'
);

// 2. Fix Card Colors to bg-white with border-[#0A2472]/30
content = content.replace(
  'className="bg-[#0A2472]/30 p-2 rounded-[10px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"',
  'className="bg-white p-2 rounded-[10px] border border-[#0A2472]/30 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"'
);
content = content.replace(
  'className="bg-[#0A2472]/30 p-6 rounded-[10px] border border-slate-100 shadow-sm"',
  'className="bg-white p-6 rounded-[10px] border border-[#0A2472]/30 shadow-sm"'
);
content = content.replace(
  'className="bg-[#0A2472]/30 p-6 rounded-[10px] border border-slate-100 shadow-sm"',
  'className="bg-white p-6 rounded-[10px] border border-[#0A2472]/30 shadow-sm"'
);

// 3. Fix Form Card (Konsultasi) - Reduce padding and adjust colors
content = content.replace(
  'className="bg-[#0A2472]/30 p-8 md:p-12 rounded-[10px] border border-slate-100 shadow-xl shadow-blue-900/5"',
  'className="bg-white p-6 md:p-8 rounded-[10px] border border-[#0A2472]/30 shadow-xl shadow-blue-900/5"'
);

// Reduce spacing in Form Card
content = content.replace('<div className="mb-10">', '<div className="mb-6">');
content = content.replace('<form className="space-y-6">', '<form className="space-y-4">');

// Reduce textarea height
content = content.replace('rows={4}', 'rows={3}');

// Adjust inputs padding
content = content.replace(/px-5 py-4/g, 'px-4 py-3');

// Adjust button padding
content = content.replace('w-full py-5', 'w-full py-3.5');

// 4. Update Social Media Card to Dark Blue
const socialSectionOld = `<motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-[#0A2472]/30 p-8 rounded-[10px] border border-slate-100 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <p className="text-[10px] font-black tracking-widest text-[#0A2472] uppercase mb-1">{current.socialLabel}</p>
              <p className="text-sm text-slate-600 font-medium">{current.socialSub}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a href="https://instagram.com/indiekraf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/50 hover:bg-white rounded-[10px] text-sm font-bold text-[#0A2472] transition-colors">
                <Instagram className="w-4 h-4" />
                @indiekraf
              </a>
              <a href="https://linkedin.com/company/indiekraf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/50 hover:bg-white rounded-[10px] text-sm font-bold text-[#0A2472] transition-colors">
                <Linkedin className="w-4 h-4" />
                Indiekraf
              </a>
            </div>
          </div>
        </motion.div>`;

const socialSectionNew = `<motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-[#0A2472] p-8 rounded-[10px] border border-[#0A2472]/30 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <p className="text-[10px] font-black tracking-widest text-white/70 uppercase mb-1">{current.socialLabel}</p>
              <p className="text-sm text-white/90 font-medium">{current.socialSub}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a href="https://instagram.com/indiekraf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-[10px] text-sm font-bold text-white transition-colors border border-white/10">
                <Instagram className="w-4 h-4" />
                @indiekraf
              </a>
              <a href="https://linkedin.com/company/indiekraf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-[10px] text-sm font-bold text-white transition-colors border border-white/10">
                <Linkedin className="w-4 h-4" />
                Indiekraf
              </a>
            </div>
          </div>
        </motion.div>`;

content = content.replace(socialSectionOld, socialSectionNew);

// Add extra padding to the bottom so the footer is pushed down like in Portfolio
content = content.replace(
  '      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">',
  '      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 pb-16">'
);

fs.writeFileSync('src/components/ContactPage.tsx', content);
