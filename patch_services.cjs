const fs = require('fs');
const content = fs.readFileSync('src/components/ServicesPage.tsx', 'utf8');

const startIdx = content.indexOf('{/* 2. Sticky Service Cards stack */}');
const endIdx = content.lastIndexOf('</div>\n    </div>\n  );\n}');

const newContent = `      {/* 2. Service Cards list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24 mb-24">
        {servicesData.map((service, idx) => (
          <section
            key={service.id}
            ref={service.ref}
            className="pt-4 first:pt-0"
          >
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-12 border-t border-slate-100 first:border-0 first:pt-0"
            >
              {/* Left Header Sidebar */}
              <div
                className="lg:col-span-4 flex flex-col justify-start"
              >
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className={\`p-2.5 rounded-xl \${service.accentColor} shrink-0\`}>
                      {service.icon}
                    </div>
                    <div className="flex flex-col pt-0.5">
                      <p className="text-[9px] font-bold tracking-widest uppercase text-slate-900 leading-tight mb-1">
                        {service.tagline}
                      </p>
                      <p className="text-[8px] font-semibold tracking-widest uppercase text-slate-500">
                        LAYANAN INDIEKRAF
                      </p>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-display font-extrabold text-[#0A2472] tracking-tight">
                    {service.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {service.description}
                  </p>
                  <div>
                    <a
                      href={\`https://\${service.link}\`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-200 hover:border-slate-300 rounded-2xl text-[11px] font-semibold text-slate-700 bg-white transition-all duration-300 shadow-sm group"
                    >
                      <span>{service.link}</span>
                      <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Content Grid */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                  {service.cards.map((card, cardIdx) => (
                    <motion.div
                      key={cardIdx}
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: cardIdx * 0.1, ease: "easeOut" }}
                      className="bg-white rounded-[24px] p-6 lg:p-7 border border-slate-200 hover:border-[#0A2472]/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full group"
                    >
                      <div className="space-y-4">
                        <h3 className="font-sans font-bold text-[15px] text-[#0A2472] leading-snug">
                          {card.title}
                        </h3>
                        {card.description && (
                          <p className="text-xs text-slate-500 leading-relaxed font-medium">
                            {card.description}
                          </p>
                        )}
                        {"list" in card && card.list && (
                          <ul className="space-y-2 text-xs text-slate-500 font-medium">
                            {card.list.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 mt-1" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <button
                        onClick={() =>
                          handleContactService(
                            card.title,
                            service.title.replace("Indiekraf ", ""),
                          )
                        }
                        className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold text-slate-900 transition-all duration-300 tracking-wider uppercase group-hover:text-[#0A2472]"
                      >
                        <span>{t[language as keyof typeof t].contactBtn}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>
        ))}
`;

fs.writeFileSync('src/components/ServicesPage.tsx', content.substring(0, startIdx) + newContent + content.substring(endIdx));
