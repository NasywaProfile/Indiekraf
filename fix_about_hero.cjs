const fs = require('fs');
let content = fs.readFileSync('src/components/AboutPage.tsx', 'utf8');

const targetStr = `      <section className="relative w-full min-h-[85vh] lg:h-[90vh] lg:max-h-[800px] flex flex-col justify-center bg-[#040D26] overflow-hidden text-white py-12 lg:py-0" id="about-hero">
        
        {/* Full-bleed team photo background with deep shadow overlays */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBackgroundImage}
            alt="Indiekraf Collaboration Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover select-none pointer-events-none opacity-30 object-center filter brightness-[0.6] saturate-[1.1]"
          />
          {/* Deep cinematic overlays for absolute readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#040D26]/90 via-[#040D26]/75 to-[#040D26]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#040D26]/85 via-[#040D26]/40 to-transparent" />
          
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/15 rounded-full blur-[100px] pointer-events-none" />
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={staggerSettings}
              className="max-w-4xl space-y-6 text-left"
            >`;

const replacementStr = `      <section className="relative w-full min-h-screen flex flex-col justify-center bg-[#0A2472] overflow-hidden text-white py-20 lg:py-0" id="about-hero">
        
        {/* Full-bleed team photo background with deep shadow overlays */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBackgroundImage}
            alt="Indiekraf Collaboration Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover select-none pointer-events-none opacity-40 object-center"
          />
          {/* Deep cinematic overlays for absolute readability */}
          <div className="absolute inset-0 bg-[#0A2472]/60 shadow-[inset_0_0_150px_rgba(10,36,114,0.9)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A2472]/60 to-[#0A2472]" />
          
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={staggerSettings}
            className="max-w-4xl space-y-6 text-left"
          >`;

const targetEndStr = `                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
          
          <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-[20px] overflow-hidden shadow-2xl shadow-[#38BDF8]/20 border border-white/10">
                <img 
                  src="/gambar.jpg" 
                  alt="About Us Hero" 
                  className="w-full aspect-[4/3] object-cover opacity-90 hover:opacity-100 transition-opacity duration-500" 
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>`;

const replacementEndStr = `                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>`;

if(content.includes(targetStr) && content.includes(targetEndStr)) {
  content = content.replace(targetStr, replacementStr);
  content = content.replace(targetEndStr, replacementEndStr);
  fs.writeFileSync('src/components/AboutPage.tsx', content);
  console.log("Replaced hero layout successfully.");
} else {
  console.log("Strings not found!");
}
