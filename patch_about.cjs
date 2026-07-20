const fs = require('fs');
const content = fs.readFileSync('src/components/About.tsx', 'utf8');

const importIdx = content.indexOf("import React from 'react';");
const importMotionIdx = content.indexOf("import { motion } from 'motion/react';");

let newContent = content.substring(0, importIdx) + "import React, { useState, useEffect } from 'react';\n" + content.substring(importIdx + "import React from 'react';\n".length);

newContent = newContent.replace("import { motion } from 'motion/react';", "import { motion, AnimatePresence } from 'motion/react';");

const fnStart = newContent.indexOf('export default function About() {');
const tDecl = newContent.indexOf('const { t } = useLanguage();');

const imagesState = `
  const aboutImages = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop"
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % aboutImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
`;

newContent = newContent.substring(0, tDecl + 'const { t } = useLanguage();\n'.length) + imagesState + newContent.substring(tDecl + 'const { t } = useLanguage();\n'.length);

const rightImgColStart = newContent.indexOf('{/* Right Image Column */}');
const rightImgColEnd = newContent.indexOf('</div>\n      </div>\n    </section>');

const rightColRepl = `{/* Right Image Column */}
          <div className="flex justify-center lg:justify-end">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              className="relative h-[350px] lg:h-[500px] xl:h-[550px] w-full max-w-[500px] group"
            >
              <div className="absolute inset-0 bg-[#0A2472]/10 rounded-[48px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative h-full w-full overflow-hidden rounded-[48px] border-[10px] border-white shadow-2xl bg-slate-100">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    src={aboutImages[currentImageIndex]} 
                    alt="Indiekraf Creative Collaboration"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0A2472]/30 to-transparent mix-blend-overlay pointer-events-none" />
              </div>
              
              {/* Decorative Element */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#38BDF8] rounded-full blur-[100px] opacity-20 pointer-events-none" />
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#0A2472] rounded-full blur-[100px] opacity-15 pointer-events-none" />
            </motion.div>
          </div>
        `;

newContent = newContent.substring(0, rightImgColStart) + rightColRepl + newContent.substring(rightImgColEnd);

fs.writeFileSync('src/components/About.tsx', newContent);
