(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}})();let v=0,T="hero",u="dark";const E=["Cybersecurity Specialist","Data Analyst","Ethical Hacker","Problem Solver"];let h=0,d=0,m=!1;document.addEventListener("DOMContentLoaded",function(){console.log("DOM loaded, initializing enhanced portfolio..."),S();const e=document.getElementById("loadingScreen");e?(console.log("Found loading screen, removing it..."),setTimeout(()=>{e.classList.add("hidden"),console.log("Loading screen removed, starting portfolio..."),g()},1e3)):(console.log("No loading screen found, starting portfolio directly..."),g())});function S(){u=localStorage.getItem("portfolio-theme")||"dark",document.documentElement.setAttribute("data-theme",u);const t=document.getElementById("themeToggle");t&&t.addEventListener("click",k)}function k(){u=u==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",u),localStorage.setItem("portfolio-theme",u),document.body.style.transition="background-color 0.3s ease, color 0.3s ease",setTimeout(()=>{document.body.style.transition=""},300)}function g(){console.log("Starting enhanced portfolio functionality...");try{z(),P(),$(),Y(),F(),R(),H(),C(),I(),q(),M(),console.log("Enhanced portfolio initialization complete!")}catch(e){console.error("Error starting portfolio:",e);const t=document.getElementById("loadingScreen");t&&t.classList.add("hidden")}}function M(){const e=document.getElementById("typingText");if(!e)return;function t(){const o=E[h];m?(e.textContent=o.substring(0,d-1),d--):(e.textContent=o.substring(0,d+1),d++);let i=m?50:100;!m&&d===o.length?(i=2e3,m=!0):m&&d===0&&(m=!1,h=(h+1)%E.length,i=500),setTimeout(t,i)}t()}function C(){const e=document.querySelectorAll(".filter-btn"),t=document.querySelectorAll(".project-card");e.forEach(o=>{o.addEventListener("click",()=>{const i=o.getAttribute("data-filter");e.forEach(n=>n.classList.remove("active")),o.classList.add("active"),t.forEach(n=>{const r=n.getAttribute("data-category");i==="all"||r===i?(n.classList.remove("hidden"),setTimeout(()=>{n.style.opacity="1",n.style.transform="scale(1)"},100)):(n.style.opacity="0",n.style.transform="scale(0.8)",setTimeout(()=>{n.classList.add("hidden")},300))})})})}function I(){const e=document.getElementById("tooltip");document.querySelectorAll("[data-tooltip]").forEach(o=>{o.addEventListener("mouseenter",i=>{const n=o.getAttribute("data-tooltip");e.textContent=n,e.classList.add("visible");const r=o.getBoundingClientRect();e.style.left=r.left+r.width/2-e.offsetWidth/2+"px",e.style.top=r.top-e.offsetHeight-10+"px"}),o.addEventListener("mouseleave",()=>{e.classList.remove("visible")})})}function z(){console.log("Initializing enhanced navigation...");try{const e=document.getElementById("navbar"),t=document.getElementById("navToggle"),o=document.getElementById("navMenu"),i=document.querySelectorAll(".nav-link");if(!e){console.error("Navbar not found");return}t&&o&&t.addEventListener("click",()=>{o.classList.toggle("active"),t.classList.toggle("active"),console.log("Mobile menu toggled")}),i.forEach(r=>{r.addEventListener("click",()=>{o&&o.classList.remove("active"),t&&t.classList.remove("active")})}),i.forEach(r=>{r.addEventListener("click",function(c){c.preventDefault();const s=this.getAttribute("href"),a=document.querySelector(s);if(a){const l=a.offsetTop-80;b(l,800)}})});let n=window.scrollY;window.addEventListener("scroll",()=>{const r=window.scrollY;r>100?e.classList.add("scrolled"):e.classList.remove("scrolled"),r>n&&r>200?e.style.transform="translateY(-100%)":e.style.transform="translateY(0)",n=r,A()}),console.log("Enhanced navigation initialized successfully")}catch(e){console.error("Error initializing navigation:",e)}}function b(e,t){const o=window.pageYOffset,i=e-o;let n=null;function r(s){n===null&&(n=s);const a=s-n,l=c(a,o,i,t);window.scrollTo(0,l),a<t&&requestAnimationFrame(r)}function c(s,a,l,p){return s/=p/2,s<1?l/2*s*s*s+a:(s-=2,l/2*(s*s*s+2)+a)}requestAnimationFrame(r)}function A(){try{const e=document.querySelectorAll("section[id]"),t=document.querySelectorAll(".nav-link");let o="";const i=window.scrollY+150;e.forEach(n=>{const r=n.offsetTop,c=n.clientHeight;i>=r&&i<r+c&&(o=n.getAttribute("id"))}),t.forEach(n=>{n.classList.remove("active"),n.getAttribute("data-section")===o&&n.classList.add("active")}),T=o}catch(e){console.error("Error updating active nav link:",e)}}function P(){console.log("Initializing enhanced scroll effects...");try{const e=document.querySelector(".scroll-progress");if(!e){console.error("Scroll progress bar not found");return}window.addEventListener("scroll",x(()=>{const t=window.pageYOffset,o=document.documentElement.scrollHeight-window.innerHeight;v=t/o*100,e.style.width=v+"%",document.querySelectorAll(".bg-effects > *").forEach((n,r)=>{const c=.5+r*.1,s=-(t*c);n.style.transform=`translateY(${s}px)`})},16)),console.log("Enhanced scroll effects initialized")}catch(e){console.error("Error initializing scroll effects:",e)}}function $(){console.log("Initializing enhanced animations...");try{const e={threshold:.1,rootMargin:"0px 0px -50px 0px"},t=new IntersectionObserver(n=>{n.forEach(r=>{if(r.isIntersecting){const c=r.target.getAttribute("data-delay")||0;setTimeout(()=>{r.target.classList.add("aos-animate"),r.target.classList.contains("hero-stats")&&B()},c)}})},e),o=document.querySelectorAll("[data-aos]");console.log(`Found ${o.length} elements to animate`),o.forEach(n=>{t.observe(n)});const i=document.querySelector(".hero-stats");i&&t.observe(i)}catch(e){console.error("Error initializing animations:",e)}}function q(){console.log("Starting enhanced animations...");try{document.querySelectorAll(".title-line").forEach((t,o)=>{setTimeout(()=>{t.style.opacity="1",t.style.transform="translateY(0)"},o*300)}),setTimeout(()=>{const t=document.querySelector(".profile-frame");t&&(t.style.transform="translateY(0) rotateY(0) scale(1)",t.style.opacity="1")},800)}catch(e){console.error("Error starting animations:",e)}}function Y(){console.log("Initializing enhanced counters...")}function B(){try{const e=document.querySelectorAll(".stat-number[data-target]");if(e.length===0){console.error("No counter elements found");return}console.log(`Found ${e.length} counters to animate`),e.forEach((t,o)=>{const i=parseInt(t.getAttribute("data-target")),n=2e3+o*200,r=performance.now();function c(s){const a=s-r,l=Math.min(a/n,1),p=1-Math.pow(1-l,4),y=Math.floor(i*p);t.textContent=y+(y<i?"":"+"),l<1?requestAnimationFrame(c):(t.textContent=i+"+",t.style.transform="scale(1.1)",setTimeout(()=>{t.style.transform="scale(1)"},200))}setTimeout(()=>{requestAnimationFrame(c)},o*200)})}catch(e){console.error("Error animating counters:",e)}}function F(){console.log("Initializing enhanced contact form...");try{const e=document.getElementById("contactForm");if(!e){console.log("Contact form not found");return}e.addEventListener("submit",function(o){o.preventDefault(),D(this)}),e.querySelectorAll("input, textarea").forEach(o=>{o.addEventListener("focus",function(){this.parentElement.classList.add("focused"),this.style.transform="scale(1.02)"}),o.addEventListener("blur",function(){this.value||this.parentElement.classList.remove("focused"),this.style.transform="scale(1)"}),o.addEventListener("input",function(){O(this)})}),console.log("Enhanced contact form initialized")}catch(e){console.error("Error initializing contact form:",e)}}function O(e){const t=e.value.trim(),o=e.type;e.classList.remove("error","success"),t!==""&&(o==="email"?L(t)?e.classList.add("success"):e.classList.add("error"):t.length>0&&e.classList.add("success"))}function D(e){try{const t=new FormData(e),o=t.get("name"),i=t.get("email"),n=t.get("message");if(!o||!i||!n){f("Please fill in all fields.","error");return}if(!L(i)){f("Please enter a valid email address.","error");return}if(n.length<10){f("Please enter a more detailed message.","error");return}const r=encodeURIComponent(`Portfolio Contact from ${o}`),c=encodeURIComponent(`Name: ${o}
Email: ${i}

Message:
${n}`),s=`mailto:iambhavesh55@gmail.com?subject=${r}&body=${c}`;window.location.href=s,e.reset(),f("Thank you for your message! Your email client should open with the message ready to send.","success");const a=e.querySelector('button[type="submit"]'),l=a.innerHTML;a.innerHTML='<span class="btn-text"><i class="fas fa-check"></i> Message Sent!</span>',a.style.background="var(--gradient-secondary)",a.style.transform="scale(1.05)",setTimeout(()=>{a.innerHTML=l,a.style.background="",a.style.transform="scale(1)"},3e3)}catch(t){console.error("Error handling form submission:",t),f("There was an error sending your message. Please try again.","error")}}function L(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function f(e,t="info"){try{const o=document.createElement("div");o.className=`notification notification-${t}`;const i=t==="error"?"fas fa-exclamation-circle":t==="success"?"fas fa-check-circle":"fas fa-info-circle";o.innerHTML=`
            <i class="${i}"></i>
            <span>${e}</span>
        `,o.style.cssText=`
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${t==="error"?"var(--danger)":"var(--success)"};
            color: white;
            padding: var(--space-md) var(--space-lg);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-strong);
            z-index: 9999;
            animation: slideInRight 0.3s ease;
            max-width: 350px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: var(--space-sm);
        `,document.body.appendChild(o),setTimeout(()=>{o.style.animation="slideOutRight 0.3s ease",setTimeout(()=>{o.remove()},300)},5e3)}catch(o){console.error("Error showing notification:",o)}}function R(){console.log("Initializing enhanced back to top...");try{const e=document.getElementById("backToTop");if(!e){console.log("Back to top button not found");return}window.addEventListener("scroll",x(()=>{window.scrollY>300?e.classList.add("visible"):e.classList.remove("visible")},100)),e.addEventListener("click",()=>{b(0,1e3),e.style.transform="scale(0.9)",setTimeout(()=>{e.style.transform="scale(1)"},150)}),console.log("Enhanced back to top initialized")}catch(e){console.error("Error initializing back to top:",e)}}function H(){console.log("Initializing enhanced particles...");try{N(),X(),j()}catch(e){console.error("Error initializing particles:",e)}}function N(){try{const e=document.querySelector(".floating-particles");if(!e){console.log("Particle container not found");return}for(let t=0;t<50;t++){const o=document.createElement("div");o.className="particle",o.style.cssText=`
                position: absolute;
                width: ${Math.random()*3+1}px;
                height: ${Math.random()*3+1}px;
                background: rgba(0, 245, 255, ${Math.random()*.5+.3});
                border-radius: 50%;
                left: ${Math.random()*100}%;
                top: ${Math.random()*100}%;
                animation: particleFloat ${5+Math.random()*10}s ease-in-out infinite;
                animation-delay: ${Math.random()*5}s;
            `,e.appendChild(o)}}catch(e){console.error("Error creating floating particles:",e)}}function X(){try{const e=document.querySelector(".matrix-rain");if(!e){console.log("Matrix container not found");return}for(let t=0;t<30;t++){const o=document.createElement("div");o.style.cssText=`
                position: absolute;
                left: ${t*3.33}%;
                top: -100%;
                width: 1px;
                height: ${50+Math.random()*100}px;
                background: linear-gradient(transparent, rgba(0, 245, 255, ${Math.random()*.5+.2}), transparent);
                animation: matrixDrop ${3+Math.random()*4}s linear infinite;
                animation-delay: ${Math.random()*5}s;
            `,e.appendChild(o)}}catch(e){console.error("Error creating matrix effect:",e)}}function j(){const e=document.createElement("canvas");e.style.cssText=`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.3;
    `,document.body.appendChild(e);const t=e.getContext("2d");let o=[],i={x:0,y:0};function n(){e.width=window.innerWidth,e.height=window.innerHeight}function r(s,a){return{x:s,y:a,vx:(Math.random()-.5)*2,vy:(Math.random()-.5)*2,life:1,decay:Math.random()*.02+.01}}function c(){t.clearRect(0,0,e.width,e.height);for(let s=o.length-1;s>=0;s--){const a=o[s];if(a.x+=a.vx,a.y+=a.vy,a.life-=a.decay,a.life<=0){o.splice(s,1);continue}t.save(),t.globalAlpha=a.life,t.fillStyle="#00f5ff",t.beginPath(),t.arc(a.x,a.y,2,0,Math.PI*2),t.fill(),t.restore()}requestAnimationFrame(c)}window.addEventListener("resize",n),window.addEventListener("mousemove",s=>{i.x=s.clientX,i.y=s.clientY,Math.random()<.1&&o.push(r(i.x,i.y))}),n(),c()}document.addEventListener("DOMContentLoaded",function(){try{document.querySelectorAll(".btn").forEach(t=>{t.addEventListener("mouseenter",function(){const o=this.querySelector(".btn-particles");o&&U(o),this.style.transform="translateY(-2px) scale(1.05)"}),t.addEventListener("mouseleave",function(){this.style.transform="translateY(0) scale(1)"}),t.addEventListener("click",function(o){const i=document.createElement("span"),n=this.getBoundingClientRect(),r=Math.max(n.width,n.height),c=o.clientX-n.left-r/2,s=o.clientY-n.top-r/2;i.style.cssText=`
                    position: absolute;
                    width: ${r}px;
                    height: ${r}px;
                    left: ${c}px;
                    top: ${s}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `,this.appendChild(i),setTimeout(()=>{i.remove()},600)})})}catch(e){console.error("Error initializing button effects:",e)}});function U(e){try{for(let t=0;t<8;t++){const o=document.createElement("div");o.style.cssText=`
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                left: ${Math.random()*100}%;
                top: ${Math.random()*100}%;
                animation: buttonParticle 0.8s ease-out forwards;
                animation-delay: ${t*.1}s;
            `,e.appendChild(o),setTimeout(()=>{o.remove()},800)}}catch(t){console.error("Error creating button particles:",t)}}function x(e,t){let o;return function(){const i=arguments,n=this;o||(e.apply(n,i),o=!0,setTimeout(()=>o=!1,t))}}const w=document.createElement("style");w.textContent=`
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    @keyframes particleFloat {
        0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.6;
        }
        50% { 
            transform: translateY(-30px) rotate(180deg); 
            opacity: 1;
        }
    }
    
    @keyframes matrixDrop {
        0% { 
            transform: translateY(-100vh); 
            opacity: 0;
        }
        10% { 
            opacity: 1;
        }
        90% { 
            opacity: 1;
        }
        100% { 
            transform: translateY(100vh); 
            opacity: 0;
        }
    }
    
    @keyframes buttonParticle {
        0% { 
            transform: scale(0) translateY(0); 
            opacity: 1;
        }
        100% { 
            transform: scale(1) translateY(-30px); 
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .form-group input.success,
    .form-group textarea.success {
        border-color: var(--success);
        box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
    }
    
    .form-group input.error,
    .form-group textarea.error {
        border-color: var(--danger);
        box-shadow: 0 0 0 3px rgba(255, 51, 102, 0.1);
    }
`;document.head.appendChild(w);document.addEventListener("DOMContentLoaded",function(){try{document.querySelectorAll("img").forEach(t=>{t.addEventListener("error",function(){console.warn("Failed to load image:",this.src),this.style.opacity="0.5",this.style.filter="grayscale(100%)"}),t.addEventListener("load",function(){console.log("Image loaded successfully:",this.src),this.style.opacity="1",this.style.filter="none"})})}catch(e){console.error("Error setting up image error handling:",e)}});window.addEventListener("load",()=>{try{if("performance"in window){const e=performance.timing.loadEventEnd-performance.timing.navigationStart;console.log("Page load time:",e+"ms"),e>3e3&&console.warn("Page load time is slow. Consider optimizing assets.");const t=performance.getEntriesByType("navigation")[0];console.log("Performance metrics:",{DNS:t.domainLookupEnd-t.domainLookupStart,TCP:t.connectEnd-t.connectStart,Request:t.responseStart-t.requestStart,Response:t.responseEnd-t.responseStart,DOM:t.domContentLoadedEventEnd-t.domContentLoadedEventStart})}}catch(e){console.error("Error monitoring performance:",e)}});document.addEventListener("keydown",e=>{if(e.key==="Tab"&&document.body.classList.add("keyboard-navigation"),e.key==="Escape"){const t=document.getElementById("navMenu"),o=document.getElementById("navToggle");t&&t.classList.contains("active")&&(t.classList.remove("active"),o.classList.remove("active"))}});document.addEventListener("mousedown",()=>{document.body.classList.remove("keyboard-navigation")});try{window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(document.documentElement.style.setProperty("--transition-fast","0s"),document.documentElement.style.setProperty("--transition-base","0s"),document.documentElement.style.setProperty("--transition-slow","0s"),console.log("Reduced motion preferences detected"))}catch(e){console.error("Error checking motion preferences:",e)}setTimeout(()=>{const e=document.getElementById("loadingScreen");e&&!e.classList.contains("hidden")&&(console.log("Ultimate fallback: Force removing loading screen..."),e.classList.add("hidden"),e.style.display="none",typeof g=="function"&&g())},3e3);console.log("Enhanced Portfolio JavaScript loaded successfully");
