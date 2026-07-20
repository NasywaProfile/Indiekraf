const fs = require('fs');
let content = fs.readFileSync('src/components/ContactPage.tsx', 'utf8');

const oldMapSection = `{GOOGLE_MAPS_API_KEY ? (
                  <Map
                    defaultCenter={mapPosition}
                    defaultZoom={15}
                    mapId="DEMO_MAP_ID"
                    disableDefaultUI={true}
                    className="w-full h-full"
                    internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                  >
                    <AdvancedMarker position={mapPosition}>
                      <Pin background="#0A2472" glyphColor="#fff" borderColor="#0A2472" />
                    </AdvancedMarker>
                  </Map>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    <MapPin className="w-8 h-8 text-slate-300 mb-2" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                      Google Maps API Key Required <br /> to display map
                    </p>
                  </div>
                )}`;

const newMapSection = `<img src="/maps.png" alt="Telkom AI Center Malang Map" className="w-full h-full object-cover" />`;

content = content.replace(oldMapSection, newMapSection);
fs.writeFileSync('src/components/ContactPage.tsx', content);
