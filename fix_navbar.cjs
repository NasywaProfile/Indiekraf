const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// Update Props
content = content.replace(
  'interface NavbarProps {\n  onScrollTo: (id: string) => void;\n}',
  'interface NavbarProps {\n  onScrollTo: (id: string) => void;\n  currentPage: string;\n}'
);

// Update component arguments
content = content.replace(
  'export default function Navbar({ onScrollTo }: NavbarProps) {',
  'export default function Navbar({ onScrollTo, currentPage }: NavbarProps) {'
);

// Update Desktop Nav Items Container to be centered
content = content.replace(
  '<div className="hidden md:flex items-center space-x-8">',
  '<div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center space-x-8">'
);

// We need to add relative position to the inner flex container if it's not already there.
// The parent of the flex container is `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` which doesn't have relative.
// Let's add relative to the `<div className="flex justify-between h-20 items-center">`
content = content.replace(
  '<div className="flex justify-between h-20 items-center">',
  '<div className="flex justify-between h-20 items-center relative">'
);

// Update the Nav Item Button
const oldButton = `className="font-sans font-semibold text-sm text-slate-600 hover:text-[#0A2472] transition-colors cursor-pointer relative py-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#0A2472] after:transition-all after:duration-300 after:w-0 hover:after:w-full"`;
const newButton = 'className={`font-sans font-semibold text-sm transition-colors cursor-pointer relative py-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#0A2472] after:transition-all after:duration-300 ${currentPage === item.id ? \'text-[#0A2472] after:w-full\' : \'text-slate-600 hover:text-[#0A2472] after:w-0 hover:after:w-full\'}`}';
content = content.replace(oldButton, newButton);

fs.writeFileSync('src/components/Navbar.tsx', content);
