import { owner } from '@/data/portfolio';

export function Footer() {
  return (
    <footer className="w-full bg-[#0A0A0A] border-t border-white/5 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        <div>
          <h2 className="font-display text-3xl font-semibold mb-2">{owner.brandName}</h2>
          <p className="text-white/50 text-sm max-w-sm">
            {owner.tagline} &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>

        <div className="flex gap-8">
          <div className="flex flex-col gap-4">
            <h4 className="text-micro text-white/40">Socials</h4>
            <div className="flex flex-col gap-2">
              <a href={owner.socials.instagram} target="_blank" rel="noreferrer" className="text-white/80 hover:text-luxury-gold transition-colors text-sm relative group w-max">
                Instagram
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-300 group-hover:w-full" />
              </a>
              <a href={owner.socials.github} target="_blank" rel="noreferrer" className="text-white/80 hover:text-luxury-gold transition-colors text-sm relative group w-max">
                GitHub
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="text-micro text-white/40">Contact</h4>
            <div className="flex flex-col gap-2">
              <a href={`mailto:${owner.email}`} className="text-white/80 hover:text-luxury-gold transition-colors text-sm relative group w-max">
                {owner.email}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
