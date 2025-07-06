(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function o(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=o(r);fetch(r.href,n)}})();let v=0,T="hero",f="dark";const E=["Cybersecurity Specialist","Data Analyst","Ethical Hacker","Problem Solver"];let h=0,d=0,u=!1;document.addEventListener("DOMContentLoaded",function(){console.log("DOM loaded, initializing enhanced portfolio..."),S();const e=document.getElementById("loadingScreen");e?(console.log("Found loading screen, removing it..."),setTimeout(()=>{e.classList.add("hidden"),console.log("Loading screen removed, starting portfolio..."),g()},1e3)):(console.log("No loading screen found, starting portfolio directly..."),g())});function S(){f=localStorage.getItem("portfolio-theme")||"dark",document.documentElement.setAttribute("data-theme",f);const t=document.getElementById("themeToggle");t&&t.addEventListener("click",k)}function k(){f=f==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",f),localStorage.setItem("portfolio-theme",f),document.body.style.transition="background-color 0.3s ease, color 0.3s ease",setTimeout(()=>{document.body.style.transition=""},300)}function g(){console.log("Starting enhanced portfolio functionality...");try{A(),I(),q(),Y(),F(),D(),N(),P(),z(),$(),M(),console.log("Enhanced portfolio initialization complete!")}catch(e){console.error("Error starting portfolio:",e);const t=document.getElementById("loadingScreen");t&&t.classList.add("hidden")}}function M(){const e=document.getElementById("typingText");if(!e)return;function t(){const o=E[h];u?(e.textContent=o.substring(0,d-1),d--):(e.textContent=o.substring(0,d+1),d++);let s=u?50:100;!u&&d===o.length?(s=2e3,u=!0):u&&d===0&&(u=!1,h=(h+1)%E.length,s=500),setTimeout(t,s)}t()}function P(){const e=document.querySelectorAll(".filter-btn"),t=document.querySelectorAll(".project-card");e.forEach(o=>{o.addEventListener("click",()=>{const s=o.getAttribute("data-filter");e.forEach(r=>r.classList.remove("active")),o.classList.add("active"),t.forEach(r=>{const n=r.getAttribute("data-category");s==="all"||n===s?(r.classList.remove("hidden"),setTimeout(()=>{r.style.opacity="1",r.style.transform="scale(1)"},100)):(r.style.opacity="0",r.style.transform="scale(0.8)",setTimeout(()=>{r.classList.add("hidden")},300))})})})}function z(){const e=document.getElementById("tooltip");document.querySelectorAll("[data-tooltip]").forEach(o=>{o.addEventListener("mouseenter",s=>{const r=o.getAttribute("data-tooltip");e.textContent=r,e.classList.add("visible");const n=o.getBoundingClientRect();e.style.left=n.left+n.width/2-e.offsetWidth/2+"px",e.style.top=n.top-e.offsetHeight-10+"px"}),o.addEventListener("mouseleave",()=>{e.classList.remove("visible")})})}function A(){console.log("Initializing enhanced navigation...");try{const e=document.getElementById("navbar"),t=document.getElementById("navToggle"),o=document.getElementById("navMenu"),s=document.querySelectorAll(".nav-link");if(!e){console.error("Navbar not found");return}t&&o&&t.addEventListener("click",()=>{o.classList.toggle("active"),t.classList.toggle("active"),console.log("Mobile menu toggled")}),s.forEach(n=>{n.addEventListener("click",()=>{o&&o.classList.remove("active"),t&&t.classList.remove("active")})}),s.forEach(n=>{n.addEventListener("click",function(a){a.preventDefault();const i=this.getAttribute("href"),c=document.querySelector(i);if(c){const l=c.offsetTop-80;b(l,800)}})});let r=window.scrollY;window.addEventListener("scroll",()=>{const n=window.scrollY;n>100?e.classList.add("scrolled"):e.classList.remove("scrolled"),n>r&&n>200?e.style.transform="translateY(-100%)":e.style.transform="translateY(0)",r=n,C()}),console.log("Enhanced navigation initialized successfully")}catch(e){console.error("Error initializing navigation:",e)}}function b(e,t){const o=window.pageYOffset,s=e-o;let r=null;function n(i){r===null&&(r=i);const c=i-r,l=a(c,o,s,t);window.scrollTo(0,l),c<t&&requestAnimationFrame(n)}function a(i,c,l,p){return i/=p/2,i<1?l/2*i*i*i+c:(i-=2,l/2*(i*i*i+2)+c)}requestAnimationFrame(n)}function C(){try{const e=document.querySelectorAll("section[id]"),t=document.querySelectorAll(".nav-link");let o="";const s=window.scrollY+150;e.forEach(r=>{const n=r.offsetTop,a=r.clientHeight;s>=n&&s<n+a&&(o=r.getAttribute("id"))}),t.forEach(r=>{r.classList.remove("active"),r.getAttribute("data-section")===o&&r.classList.add("active")}),T=o}catch(e){console.error("Error updating active nav link:",e)}}function I(){console.log("Initializing enhanced scroll effects...");try{const e=document.querySelector(".scroll-progress");if(!e){console.error("Scroll progress bar not found");return}window.addEventListener("scroll",x(()=>{const t=window.pageYOffset,o=document.documentElement.scrollHeight-window.innerHeight;v=t/o*100,e.style.width=v+"%",document.querySelectorAll(".bg-effects > *").forEach((r,n)=>{const a=.5+n*.1,i=-(t*a);r.style.transform=`translateY(${i}px)`})},16)),console.log("Enhanced scroll effects initialized")}catch(e){console.error("Error initializing scroll effects:",e)}}function q(){console.log("Initializing enhanced animations...");try{const e={threshold:.1,rootMargin:"0px 0px -50px 0px"},t=new IntersectionObserver(r=>{r.forEach(n=>{if(n.isIntersecting){const a=n.target.getAttribute("data-delay")||0;setTimeout(()=>{n.target.classList.add("aos-animate"),n.target.classList.contains("hero-stats")&&B()},a)}})},e),o=document.querySelectorAll("[data-aos]");console.log(`Found ${o.length} elements to animate`),o.forEach(r=>{t.observe(r)});const s=document.querySelector(".hero-stats");s&&t.observe(s)}catch(e){console.error("Error initializing animations:",e)}}function $(){console.log("Starting enhanced animations...");try{document.querySelectorAll(".title-line").forEach((t,o)=>{setTimeout(()=>{t.style.opacity="1",t.style.transform="translateY(0)"},o*300)}),setTimeout(()=>{const t=document.querySelector(".profile-frame");t&&(t.style.transform="translateY(0) rotateY(0) scale(1)",t.style.opacity="1")},800)}catch(e){console.error("Error starting animations:",e)}}function Y(){console.log("Initializing enhanced counters...")}function B(){try{const e=document.querySelectorAll(".stat-number[data-target]");if(e.length===0){console.error("No counter elements found");return}console.log(`Found ${e.length} counters to animate`),e.forEach((t,o)=>{const s=parseInt(t.getAttribute("data-target")),r=2e3+o*200,n=performance.now();function a(i){const c=i-n,l=Math.min(c/r,1),p=1-Math.pow(1-l,4),y=Math.floor(s*p);t.textContent=y+(y<s?"":"+"),l<1?requestAnimationFrame(a):(t.textContent=s+"+",t.style.transform="scale(1.1)",setTimeout(()=>{t.style.transform="scale(1)"},200))}setTimeout(()=>{requestAnimationFrame(a)},o*200)})}catch(e){console.error("Error animating counters:",e)}}function F(){console.log("Initializing enhanced contact form...");try{const e=document.getElementById("contactForm");if(!e){console.log("Contact form not found");return}e.addEventListener("submit",function(o){o.preventDefault(),H(this)}),e.querySelectorAll("input, textarea").forEach(o=>{o.addEventListener("focus",function(){this.parentElement.classList.add("focused"),this.style.transform="scale(1.02)"}),o.addEventListener("blur",function(){this.value||this.parentElement.classList.remove("focused"),this.style.transform="scale(1)"}),o.addEventListener("input",function(){O(this)})}),console.log("Enhanced contact form initialized")}catch(e){console.error("Error initializing contact form:",e)}}function O(e){const t=e.value.trim(),o=e.type;e.classList.remove("error","success"),t!==""&&(o==="email"?L(t)?e.classList.add("success"):e.classList.add("error"):t.length>0&&e.classList.add("success"))}function H(e){try{const t=new FormData(e),o=t.get("name"),s=t.get("email"),r=t.get("message");if(!o||!s||!r){m("Please fill in all fields.","error");return}if(!L(s)){m("Please enter a valid email address.","error");return}if(r.length<10){m("Please enter a more detailed message.","error");return}const n=e.querySelector('button[type="submit"]'),a=n.innerHTML;n.innerHTML='<span class="btn-text"><i class="fas fa-spinner fa-spin"></i> Sending...</span>',n.disabled=!0,n.style.opacity="0.7",fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(t).toString()}).then(i=>{if(i.ok)e.reset(),m("Thank you for your message! I'll get back to you soon.","success"),n.innerHTML='<span class="btn-text"><i class="fas fa-check"></i> Message Sent!</span>',n.style.background="var(--gradient-secondary)",n.style.transform="scale(1.05)",n.style.opacity="1",e.querySelectorAll(".form-group").forEach(l=>{l.classList.remove("focused")}),setTimeout(()=>{n.innerHTML=a,n.style.background="",n.style.transform="scale(1)",n.disabled=!1},3e3);else throw new Error("Network response was not ok")}).catch(i=>{console.error("Form submission error:",i),m("There was an error sending your message. Please try again.","error"),n.innerHTML=a,n.style.opacity="1",n.disabled=!1})}catch(t){console.error("Error handling form submission:",t),m("There was an error sending your message. Please try again.","error");const o=e.querySelector('button[type="submit"]');o&&(o.innerHTML='<span class="btn-text">Send Message</span>',o.style.opacity="1",o.disabled=!1)}}function L(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function m(e,t="info"){try{const o=document.createElement("div");o.className=`notification notification-${t}`;const s=t==="error"?"fas fa-exclamation-circle":t==="success"?"fas fa-check-circle":"fas fa-info-circle";o.innerHTML=`
            <i class="${s}"></i>
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
        `,document.body.appendChild(o),setTimeout(()=>{o.style.animation="slideOutRight 0.3s ease",setTimeout(()=>{o.remove()},300)},5e3)}catch(o){console.error("Error showing notification:",o)}}function D(){console.log("Initializing enhanced back to top...");try{const e=document.getElementById("backToTop");if(!e){console.log("Back to top button not found");return}window.addEventListener("scroll",x(()=>{window.scrollY>300?e.classList.add("visible"):e.classList.remove("visible")},100)),e.addEventListener("click",()=>{b(0,1e3),e.style.transform="scale(0.9)",setTimeout(()=>{e.style.transform="scale(1)"},150)}),console.log("Enhanced back to top initialized")}catch(e){console.error("Error initializing back to top:",e)}}function N(){console.log("Initializing enhanced particles...");try{R(),X(),j()}catch(e){console.error("Error initializing particles:",e)}}function R(){try{const e=document.querySelector(".floating-particles");if(!e){console.log("Particle container not found");return}for(let t=0;t<50;t++){const o=document.createElement("div");o.className="particle",o.style.cssText=`
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
    `,document.body.appendChild(e);const t=e.getContext("2d");let o=[],s={x:0,y:0};function r(){e.width=window.innerWidth,e.height=window.innerHeight}function n(i,c){return{x:i,y:c,vx:(Math.random()-.5)*2,vy:(Math.random()-.5)*2,life:1,decay:Math.random()*.02+.01}}function a(){t.clearRect(0,0,e.width,e.height);for(let i=o.length-1;i>=0;i--){const c=o[i];if(c.x+=c.vx,c.y+=c.vy,c.life-=c.decay,c.life<=0){o.splice(i,1);continue}t.save(),t.globalAlpha=c.life,t.fillStyle="#00f5ff",t.beginPath(),t.arc(c.x,c.y,2,0,Math.PI*2),t.fill(),t.restore()}requestAnimationFrame(a)}window.addEventListener("resize",r),window.addEventListener("mousemove",i=>{s.x=i.clientX,s.y=i.clientY,Math.random()<.1&&o.push(n(s.x,s.y))}),r(),a()}document.addEventListener("DOMContentLoaded",function(){try{document.querySelectorAll(".btn").forEach(t=>{t.addEventListener("mouseenter",function(){const o=this.querySelector(".btn-particles");o&&G(o),this.style.transform="translateY(-2px) scale(1.05)"}),t.addEventListener("mouseleave",function(){this.style.transform="translateY(0) scale(1)"}),t.addEventListener("click",function(o){const s=document.createElement("span"),r=this.getBoundingClientRect(),n=Math.max(r.width,r.height),a=o.clientX-r.left-n/2,i=o.clientY-r.top-n/2;s.style.cssText=`
                    position: absolute;
                    width: ${n}px;
                    height: ${n}px;
                    left: ${a}px;
                    top: ${i}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `,this.appendChild(s),setTimeout(()=>{s.remove()},600)})})}catch(e){console.error("Error initializing button effects:",e)}});function G(e){try{for(let t=0;t<8;t++){const o=document.createElement("div");o.style.cssText=`
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                left: ${Math.random()*100}%;
                top: ${Math.random()*100}%;
                animation: buttonParticle 0.8s ease-out forwards;
                animation-delay: ${t*.1}s;
            `,e.appendChild(o),setTimeout(()=>{o.remove()},800)}}catch(t){console.error("Error creating button particles:",t)}}function x(e,t){let o;return function(){const s=arguments,r=this;o||(e.apply(r,s),o=!0,setTimeout(()=>o=!1,t))}}const w=document.createElement("style");w.textContent=`
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
