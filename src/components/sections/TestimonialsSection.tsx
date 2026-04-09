import useEmblaCarousel from 'embla-carousel-react';
import { testimonials } from '@/data/portfolio';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCallback } from 'react';

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="w-full py-32 bg-[#F7F6F3] text-black">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-micro text-luxury-gold mb-4 block">CLIENT ENDORSEMENTS</span>
            <h2 className="text-h2 font-display">Testimonials</h2>
          </div>
          
          <div className="flex gap-4">
            <button onClick={scrollPrev} className="w-12 h-12 flex items-center justify-center border border-black/10 rounded-full hover:bg-black hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </button>
            <button onClick={scrollNext} className="w-12 h-12 flex items-center justify-center border border-black/10 rounded-full hover:bg-black hover:text-white transition-colors">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((test, index) => (
              <div key={index} className="flex-[0_0_100%] md:flex-[0_0_80%] lg:flex-[0_0_60%] min-w-0 pr-8">
                <div className="p-12 border border-black/5 bg-white shadow-sm">
                  <div className="text-luxury-gold text-6xl font-display mb-6 opacity-30 leading-none">"</div>
                  <p className="text-2xl md:text-3xl font-display italic text-luxury-charcoal mb-10 leading-relaxed">
                    {test.quote}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#0A0A0A] text-white flex items-center justify-center rounded-full font-serif text-sm">
                      {test.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-sm tracking-wide uppercase">{test.author}</div>
                      <div className="text-black/50 text-xs tracking-wider">{test.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
