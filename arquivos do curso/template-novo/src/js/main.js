/**
 * Método Zero - Main JavaScript
 * 
 * IMPORTANTE: Todas as animações GSAP devem seguir este padrão para evitar bugs:
 * 1. Usar window 'load' (não DOMContentLoaded) para garantir layout estável
 * 2. Usar gsap.fromTo() ao invés de gsap.from() para estados determinísticos
 * 3. Usar once: true no ScrollTrigger para evitar glitches ao rolar para cima
 * 4. Chamar ScrollTrigger.refresh() após configurar animações
 */

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
  // Aguarda layout estabilizar
  ScrollTrigger.refresh();

  // ========================================
  // ANIMAÇÕES SCROLL-TRIGGERED
  // Adicione suas animações abaixo usando este padrão:
  // ========================================

  /*
  // Exemplo: Fade-up em elementos com classe .animate-on-scroll
  gsap.utils.toArray('.animate-on-scroll').forEach((el) => {
    gsap.fromTo(el, 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      }
    );
  });

  // Exemplo: Stagger em cards
  gsap.fromTo('.card',
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.cards-container',
        start: 'top 80%',
        once: true,
      },
    }
  );
  */

});
