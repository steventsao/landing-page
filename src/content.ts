// Inline CSS for deployment
export const CSS = `:root{--background:0 0% 7%;--foreground:0 0% 98%;--muted:0 0% 15%;--muted-foreground:0 0% 60%;--radius:0.75rem}*{box-sizing:border-box;margin:0;padding:0}body{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;background-color:hsl(var(--background));color:hsl(var(--foreground));line-height:1.6}.container{width:100%;margin:0 auto;padding:0 1.5rem;max-width:1400px}.min-h-screen{min-height:100vh}.bg-background{background-color:hsl(var(--background))}.text-foreground{color:hsl(var(--foreground))}.text-background{color:hsl(var(--background))}.bg-foreground{background-color:hsl(var(--foreground))}.text-muted-foreground{color:hsl(var(--muted-foreground))}.bg-muted{background-color:hsl(var(--muted))}.hover\\:bg-muted:hover{background-color:hsl(var(--muted))}.hover\\:text-foreground:hover{color:hsl(var(--foreground))}.hover\\:bg-foreground\\/90:hover{background-color:hsl(var(--foreground)/ 0.9)}.fixed{position:fixed}.relative{position:relative}.flex{display:flex}.inline-flex{display:inline-flex}.items-center{align-items:center}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.gap-3{gap:0.75rem}.gap-4{gap:1rem}.gap-6{gap:1.5rem}.gap-8{gap:2rem}.z-10{z-index:10}.z-50{z-index:50}.px-3{padding-left:0.75rem;padding-right:0.75rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.py-5{padding-top:1.25rem;padding-bottom:1.25rem}.py-6{padding-top:1.5rem;padding-bottom:1.5rem}.py-16{padding-top:4rem;padding-bottom:4rem}.py-32{padding-top:8rem;padding-bottom:8rem}.mb-3{margin-bottom:0.75rem}.mb-6{margin-bottom:1.5rem}.mb-10{margin-bottom:2.5rem}.mb-14{margin-bottom:3.5rem}.mb-20{margin-bottom:5rem}.h-6{height:1.5rem}.h-7{height:1.75rem}.h-9{height:2.25rem}.h-11{height:2.75rem}.w-6{width:1.5rem}.w-7{width:1.75rem}.max-w-2xl{max-width:42rem}.max-w-4xl{max-width:56rem}.max-w-5xl{max-width:64rem}.max-w-7xl{max-width:80rem}.mx-auto{margin-left:auto;margin-right:auto}.text-xs{font-size:0.75rem;line-height:1rem}.text-sm{font-size:0.875rem;line-height:1.25rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-5xl{font-size:3rem;line-height:1}.text-6xl{font-size:3.75rem;line-height:1}.font-medium{font-weight:500}.font-semibold{font-weight:600}.font-bold{font-weight:700}.tracking-tight{letter-spacing:-0.025em}.rounded-lg{border-radius:var(--radius)}.rounded-md{border-radius:calc(var(--radius) - 2px)}.rounded-full{border-radius:9999px}.text-center{text-align:center}.flex-col{flex-direction:column}.transition-colors{transition-property:color,background-color;transition-duration:150ms}.transition-transform{transition-property:transform;transition-duration:150ms}.overflow-hidden{overflow:hidden}.leading-\\[1\\.1\\]{line-height:1.1}.border-b-4{border-bottom-width:4px}.border-foreground{border-color:hsl(var(--foreground))}.pb-2{padding-bottom:0.5rem}.inline-block{display:inline-block}.min-w-\\[320px\\]{min-width:320px}.text-left{text-align:left}.whitespace-nowrap{white-space:nowrap}.ring-offset-background:focus-visible{--ring-offset-color:hsl(var(--background))}.focus-visible\\:outline-none:focus-visible{outline:2px solid transparent;outline-offset:2px}.disabled\\:pointer-events-none:disabled{pointer-events:none}.disabled\\:opacity-50:disabled{opacity:0.5}.group:hover .group-hover\\:translate-x-1{transform:translateX(0.25rem)}.backdrop-blur-sm{backdrop-filter:blur(4px)}.bg-background\\/95{background-color:hsl(var(--background)/ 0.95)}.top-0{top:0}.left-0{left:0}.right-0{right:0}.animate-fade-in{animation:fade-in 0.6s ease-out}@keyframes fade-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.ml-2{margin-left:0.5rem}button{cursor:pointer;border:none;background:none}a{color:inherit;text-decoration:none}.hidden{display:none}@media (min-width:640px){.sm\\:flex-row{flex-direction:row}}@media (min-width:768px){.md\\:flex{display:flex}.md\\:flex-row{flex-direction:row}.md\\:text-6xl{font-size:3.75rem;line-height:1}.md\\:text-8xl{font-size:6rem;line-height:1}.md\\:text-xl{font-size:1.25rem;line-height:1.75rem}.md\\:min-w-\\[500px\\]{min-width:500px}}.typing-text{position:relative;display:inline-block}.typing-cursor{opacity:1;animation:blink 1s infinite}@keyframes blink{0%,50%{opacity:1}51%,100%{opacity:0}}`;

const SIGN_IN_URL = '/sign-in'

// Inline home page HTML
export const HOME_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>cookbook.run - Grow Your AI Presence</title>
  <meta name="description" content="Grow your AI presence with multi-platform publishing. Create once, publish to ChatGPT and Claude.">
  <style>${CSS}</style>
</head>
<body>
  <div class="min-h-screen bg-background">
    <header class="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
      <div class="container mx-auto px-6 py-5">
        <div class="flex items-center justify-between">
          <a href="/" class="flex items-center gap-3">
            <div class="h-7 w-7 rounded-lg bg-foreground flex items-center justify-center">
              <span class="text-background font-bold text-lg">C</span>
            </div>
            <span class="text-lg font-semibold text-foreground tracking-tight">cookbook.run</span>
          </a>
          <nav class="hidden md:flex items-center gap-8">
            <a href="#features" class="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="/blog" class="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a>
          </nav>
          <a href="${SIGN_IN_URL}" class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm h-9 rounded-md px-3 bg-foreground text-background hover:bg-foreground/90 font-medium">Get Started</a>
        </div>
      </div>
    </header>

    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div class="container mx-auto px-6 py-32 relative z-10">
        <div class="max-w-5xl mx-auto text-center animate-fade-in">
          <h1 class="text-6xl md:text-8xl font-bold text-foreground mb-10 leading-[1.1] tracking-tight">
            Grow your AI presence with <span class="inline-block min-w-[320px] md:min-w-[500px] text-left border-b-4 border-foreground pb-2"><span id="typing-text" class="typing-text"></span><span class="typing-cursor">|</span></span>
          </h1>
          <p class="text-lg md:text-xl text-muted-foreground mb-14 max-w-2xl mx-auto font-normal">Create once, publish to ChatGPT and Claude.</p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="${SIGN_IN_URL}" class="inline-flex items-center justify-center gap-2 h-11 bg-foreground text-background hover:bg-foreground/90 font-medium px-10 py-6 rounded-full">Start Publishing</a>
            <a href="/blog" class="inline-flex items-center justify-center gap-2 h-11 hover:bg-muted font-medium px-10 py-6 rounded-full">Read Blog</a>
          </div>
        </div>
      </div>
    </section>
    <script>
      const formats = ['Claude Skills', 'llms.txt', 'Connectors', 'Pompt Links'];
      let currentIndex = 0;
      let currentText = '';
      let isDeleting = false;
      let charIndex = 0;

      function type() {
        const typingElement = document.getElementById('typing-text');
        const currentFormat = formats[currentIndex];

        if (isDeleting) {
          currentText = currentFormat.substring(0, charIndex - 1);
          charIndex--;
        } else {
          currentText = currentFormat.substring(0, charIndex + 1);
          charIndex++;
        }

        typingElement.textContent = currentText;

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentFormat.length) {
          typeSpeed = 2000;
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % formats.length;
          typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
      }

      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(type, 500);
      });
    </script>


    <footer class="py-16">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 max-w-7xl mx-auto">
          <div class="flex items-center gap-3">
            <div class="h-6 w-6 rounded-lg bg-foreground flex items-center justify-center">
              <span class="text-background font-bold text-sm">C</span>
            </div>
            <span class="text-foreground font-medium tracking-tight">cookbook.run</span>
          </div>
          <p class="text-muted-foreground text-xs">© 2024 cookbook.run. All rights reserved.</p>
          <a href="/blog" class="text-muted-foreground hover:text-foreground transition-colors text-xs">Blog</a>
        </div>
      </div>
    </footer>
  </div>
</body>
</html>`;
