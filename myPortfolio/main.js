/* ============================================================
   ALIRAZA — PORTFOLIO — SHARED SCRIPTS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('open'));
    menu.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => menu.classList.remove('open'))
    );
  }

  /* ---------- Active nav link based on current page ---------- */
  const current = (window.location.pathname.split('/').pop() || 'Portfolio.html').toLowerCase();
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = (link.getAttribute('href') || '').toLowerCase();
    if (href === current) link.classList.add('active');
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('revealed'));
  }

  /* ---------- Animated skill bars ---------- */
  const skillFills = document.querySelectorAll('.skill-fill[data-width]');
  if ('IntersectionObserver' in window) {
    const so = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width + '%';
            so.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    skillFills.forEach((el) => so.observe(el));
  } else {
    skillFills.forEach((el) => (el.style.width = el.dataset.width + '%'));
  }

  /* ---------- Typewriter effect ---------- */
  const typeEl = document.getElementById('typewriter');
  if (typeEl) {
    const roles = [
      'Full Stack Software Engineer',
      'Django & WebSocket Developer',
      'Python + Tkinter Builder',
      'Clean Code Enthusiast',
    ];
    let roleIdx = 0, charIdx = 0, deleting = false;

    const type = () => {
      const word = roles[roleIdx];
      typeEl.textContent = word.slice(0, charIdx);
      if (!deleting) {
        if (charIdx < word.length) { charIdx++; setTimeout(type, 70); }
        else { deleting = true; setTimeout(type, 1600); }
      } else {
        if (charIdx > 0) { charIdx--; setTimeout(type, 35); }
        else { deleting = false; roleIdx = (roleIdx + 1) % roles.length; setTimeout(type, 300); }
      }
    };
    type();
  }

  /* ---------- Contact form (opens mail client, no backend needed) ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cf-name').value.trim();
      const email = document.getElementById('cf-email').value.trim();
      const msg = document.getElementById('cf-message').value.trim();
      if (!name || !email || !msg) return;
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`${msg}\n\n— ${name} (${email})`);
      window.location.href = `mailto:youremail@example.com?subject=${subject}&body=${body}`;
      const status = document.getElementById('form-status');
      if (status) {
        status.textContent = '✓ Opening your mail app — send the message to get in touch!';
        status.classList.add('revealed');
      }
    });
  }
});

/* ============================================================
   WORKING DOWNLOAD RESUME — generates a real downloadable file
   ============================================================ */
function downloadResume() {
  const resumeHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Aliraza — Resume</title>
<style>
  body { font-family: Arial, Helvetica, sans-serif; color: #1f2937; max-width: 760px; margin: 40px auto; padding: 0 24px; line-height: 1.6; }
  h1 { margin-bottom: 4px; } h2 { border-bottom: 2px solid #58a6ff; padding-bottom: 4px; margin-top: 28px; color: #0d1117; }
  a { color: #58a6ff; } .muted { color: #6b7280; } ul { margin: 8px 0 8px 20px; } li { margin-bottom: 4px; }
  .chip { display: inline-block; background: #eef4ff; color: #1d4ed8; border-radius: 6px; padding: 2px 10px; font-size: 12px; margin: 2px 4px 2px 0; }
</style>
</head>
<body>
  <h1>Aliraza</h1>
  <p class="muted"><strong>Full Stack Software Engineer</strong> · Kota, Rajasthan, India<br>
  youremail@example.com · +91 98765 43210 · <a href="https://github.com/aliraza3t6-dev">github.com/aliraza3t6-dev</a></p>

  <h2>Professional Summary</h2>
  <p>Results-driven Software Engineer with a strong foundation in modern web architecture, real-time communication, and desktop application logic. Focused on writing clean, maintainable code and optimizing application workflows for superior performance.</p>

  <h2>Projects</h2>
  <ul>
    <li><strong>Chatube</strong> — Real-time chat application built with Python (Django), SQLite and WebSocket connections. Custom user authentication with instantaneous message delivery. <em>(github.com/aliraza3t6-dev/chatube · live: chatube-u2ev.onrender.com)</em></li>
    <li><strong>Quizy</strong> — Interactive assessment engine in core Python + Tkinter supporting MCQ, Fill-in-the-Blank and True/False formats with real-time ability checking. <em>(github.com/aliraza3t6-dev/quizy)</em></li>
  </ul>

  <h2>Technical Competencies</h2>
  <p><span class="chip">JavaScript / TypeScript</span><span class="chip">React.js / Next.js</span><span class="chip">Node.js / Express</span><span class="chip">Python / Django</span><span class="chip">WebSockets</span><span class="chip">SQL &amp; NoSQL</span><span class="chip">Tailwind CSS</span><span class="chip">Git / GitHub</span></p>

  <h2>Education</h2>
  <p><strong>Bachelor of Technology in Computer Science</strong> — 2021 to 2025<br>
  Focused on data structures, algorithms, and software system design with a consistent academic record.</p>

  <h2>Career Milestones</h2>
  <ul>
    <li><strong>2018–2020:</strong> Foundational exploration of HTML &amp; CSS markup and client-side rendering.</li>
    <li><strong>College Year 1:</strong> Algorithmic foundations — C++, procedural logic, structured problem solving.</li>
    <li><strong>College Year 2:</strong> Framework navigation, Git workflows and full ecosystem integration.</li>
    <li><strong>College Year 3+:</strong> Production deployments, latency optimization and end-to-end codebases.</li>
  </ul>

  <p class="muted" style="margin-top:32px">— Generated from aliraza3t6-dev portfolio. Download / print to share.</p>
</body>
</html>`;

  const blob = new Blob([resumeHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Aliraza_Resume.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

