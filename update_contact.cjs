const fs = require('fs');
let content = fs.readFileSync('src/components/ContactPage.tsx', 'utf8');

// 1. Remove the custom Bottom CTA Section
content = content.replace(/\{\/\* 3\. Bottom CTA Section \*\/\}.*?(?=<\/div>\s*<\/APIProvider>)/s, '');

// 2. Replace Hero Section
const heroRegex = /\{\/\* 1\. Header Section \*\/\}.*?(?=\{\/\* 2\. Main Content Grid \*\/\})/s;
const newHero = `{/* 1. Header Section */}
      <section className="w-full pt-20 pb-16 relative overflow-hidden">
        {/* Floating Icons */}
        <div className="absolute inset-0 z-0 pointer-events-none hidden md:block" style={{ perspective: '1000px' }}>
          {[
            { src: '/icon-kiri.png', alt: 'Icon Kiri', className: 'top-[50%] -translate-y-[50%] left-[2%] lg:left-[5%]' },
            { src: '/icon-kanan.png', alt: 'Icon Kanan', className: 'top-[50%] -translate-y-[50%] right-[2%] lg:right-[5%]' }
          ].map(({ src, alt, className }, index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -20, 0],
                rotateX: [0, 10, 0],
                rotateY: [0, 15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 1.5
              }}
              className={\`absolute w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)] \${className}\`}
            >
              <img 
                src={src} 
                alt={alt} 
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={containerVariants}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          {/* Pill Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[10px] text-[10px] font-bold tracking-widest bg-blue-50 text-[#0A2472] border border-blue-100 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A2472] animate-pulse" />
            <span>{current.badge}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold text-[#0A2472] tracking-tight leading-[1.1] mb-6"
          >
            {current.title}<br />
            <span className="text-[#1e3a8a]">{current.titleHighlight}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            {current.subtitle}
          </motion.p>
        </motion.div>
      </section>

      `;
content = content.replace(heroRegex, newHero);

// 3. Update Grid and Cards
// Replace grid-cols-1 lg:grid-cols-12 to lg:grid-cols-2
content = content.replace(
  `className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"`,
  `className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"`
);
// Replace lg:col-span-5 with lg:col-span-1 for left side
content = content.replace(/className="lg:col-span-5 space-y-8"/, `className="space-y-8"`);
// Replace lg:col-span-7 with lg:col-span-1 for right side
content = content.replace(/className="lg:col-span-7 bg-white/g, `className="bg-[#0A2472]/30`);

// Apply 0A2472 30% background to the cards
// Office Card
content = content.replace(/className="bg-white p-2 rounded-\[10px\] border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"/, `className="bg-[#0A2472]/30 p-2 rounded-[10px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"`);
// Email Card
content = content.replace(/className="bg-white p-6 rounded-\[10px\] border border-slate-100 shadow-sm"/g, `className="bg-[#0A2472]/30 p-6 rounded-[10px] border border-slate-100 shadow-sm"`);

// Remove Social Media card from left column and put it after the grid
const socialCardRegex = /\{\/\* Social Media Card \*\/\}.*?<\/motion\.div>/s;
const match = content.match(socialCardRegex);
if (match) {
  content = content.replace(socialCardRegex, ''); // remove from left column
  // insert after the main grid section
  const gridEndRegex = /(<\/form>\s*<\/motion\.div>\s*<\/section>)/;
  content = content.replace(gridEndRegex, `$1\n\n      {/* Social Media Card - Full Width */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-[#0A2472]/30 p-8 rounded-[10px] border border-slate-100 shadow-sm">
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
        </motion.div>
      </section>`);
}

fs.writeFileSync('src/components/ContactPage.tsx', content);
