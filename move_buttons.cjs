const fs = require('fs');
let content = fs.readFileSync('src/components/ServicesPage.tsx', 'utf8');

const buttonsBlock = `          {/* Services Buttons / Pills */}
          <motion.div
            variants={cardEntrance}
            className="mt-8 flex flex-row flex-wrap justify-center items-center gap-4 max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-purple-50/50 border border-purple-100 shadow-sm text-sm font-bold text-purple-700 hover:shadow-md hover:bg-purple-50 transition-all cursor-pointer">
               <Newspaper className="w-4 h-4 text-purple-600" />
               <span>Indiekraf Media</span>
            </div>
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50/50 border border-blue-100 shadow-sm text-sm font-bold text-blue-700 hover:shadow-md hover:bg-blue-50 transition-all cursor-pointer">
               <Layers className="w-4 h-4 text-blue-600" />
               <span>Indiekraf Studio</span>
            </div>
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-orange-50/50 border border-orange-100 shadow-sm text-sm font-bold text-orange-700 hover:shadow-md hover:bg-orange-50 transition-all cursor-pointer">
               <GraduationCap className="w-4 h-4 text-orange-600" />
               <span>Indiekraf Academy</span>
            </div>
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 shadow-sm text-sm font-bold text-emerald-700 hover:shadow-md hover:bg-emerald-50 transition-all cursor-pointer">
               <BarChart2 className="w-4 h-4 text-emerald-600" />
               <span>Indiekraf Insight Center</span>
            </div>
          </motion.div>`;

content = content.replace(buttonsBlock, "");

const insertTarget = `      </section>

      {/* 2. Service Cards list */}`;

const insertedBlock = `      </section>

      {/* 2. Services Navigation Pills */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            <div 
              onClick={() => { const el = document.getElementById('media'); if(el) el.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-purple-700 hover:shadow-md hover:border-purple-300 transition-all cursor-pointer"
            >
               <Newspaper className="w-4 h-4 text-purple-600" />
               <span>Indiekraf Media</span>
            </div>
            <div 
              onClick={() => { const el = document.getElementById('studio'); if(el) el.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-blue-700 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
            >
               <Layers className="w-4 h-4 text-blue-600" />
               <span>Indiekraf Studio</span>
            </div>
            <div 
              onClick={() => { const el = document.getElementById('academy'); if(el) el.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-orange-700 hover:shadow-md hover:border-orange-300 transition-all cursor-pointer"
            >
               <GraduationCap className="w-4 h-4 text-orange-600" />
               <span>Indiekraf Academy</span>
            </div>
            <div 
              onClick={() => { const el = document.getElementById('insight'); if(el) el.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-emerald-700 hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer"
            >
               <BarChart2 className="w-4 h-4 text-emerald-600" />
               <span>Indiekraf Insight Center</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Service Cards list */}`;

content = content.replace(insertTarget, insertedBlock);
fs.writeFileSync('src/components/ServicesPage.tsx', content);
