// ===== Content =====
const profile = {
    brand: "Scarlett",
    name: "Scarlett Routledge",
    bio: "I work at McDonald’s and I enjoy simple things—watching movies, reading books, and relaxing in my free time.",
    movies: [
      { title: "Shutter Island", note: "Favourite.", tags: ["Psychological thriller", "Mystery", "Favourite"] },
      { title: "Coraline", note: "Favourite.", tags: ["Dark fantasy", "Animation", "Favourite"] },
      { title: "Once Upon a Time in Hollywood", note: "Favourite.", tags: ["Comedy-drama", "Favourite"] }
    ],
    books: [
      { title: "The Perks of Being a Wallflower", note: "Favourite.", tags: ["Coming-of-age", "Epistolary", "Favourite"] },
      { title: "The Kite Runner", note: "Favourite.", tags: ["Historical fiction", "Drama", "Favourite"] },
      { title: "Call Me by Your Name", note: "Favourite.", tags: ["Romance", "Coming-of-age", "Favourite"] }
    ]
  };
  
  // Top texts
  document.getElementById("brandText").textContent = profile.brand;
  document.getElementById("nameOut").textContent = profile.name;
  document.getElementById("bioOut").textContent = profile.bio;
  document.getElementById("footTitle").textContent = profile.name;
  document.getElementById("year").textContent = new Date().getFullYear();
  
  // Cards
  function escapeHtml(str){
    return String(str)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }
  
  function makeCard(item){
    const el = document.createElement("div");
    el.className = "card";
    const tags = (item.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("");
    el.innerHTML = `
      <h4>${escapeHtml(item.title)}</h4>
      <p>${escapeHtml(item.note || "")}</p>
      <div class="metaRow">${tags}</div>
    `;
    return el;
  }
  
  function renderGrid(id, items){
    const wrap = document.getElementById(id);
    if(!wrap) return;
    wrap.innerHTML = "";
    items.forEach(it => wrap.appendChild(makeCard(it)));
  }
  
  renderGrid("moviesGrid", profile.movies);
  renderGrid("booksGrid", profile.books);
  
  // Contact actions
  const sendBtn = document.getElementById("sendBtn");
  const clearBtn = document.getElementById("clearBtn");
  const msg = document.getElementById("msg");
  
  sendBtn.addEventListener("click", () => {
    const name = document.getElementById("cName").value.trim();
    const email = document.getElementById("cEmail").value.trim();
    const body = document.getElementById("cMsg").value.trim();
    if(!name || !email || !body){
      msg.textContent = "Please fill in name, email, and message.";
      return;
    }
    msg.textContent = "Message sent.";
  });
  
  clearBtn.addEventListener("click", () => {
    document.getElementById("cName").value = "";
    document.getElementById("cEmail").value = "";
    document.getElementById("cMsg").value = "";
    msg.textContent = "";
  });
  
  // Highlight nav link while scrolling
  const navLinks = Array.from(document.querySelectorAll(".navLink"));
  const idToLink = Object.fromEntries(navLinks.map(a => [a.getAttribute("href").slice(1), a]));
  const observed = ["about","work","movies","books","contact"]
    .map(id => document.getElementById(id))
    .filter(Boolean);
  
  const obs = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if(!visible) return;
  
    navLinks.forEach(a => a.classList.remove("active"));
    const id = visible.target.id;
    if(idToLink[id]) idToLink[id].classList.add("active");
  }, { threshold: [0.25, 0.45, 0.65] });
  
  observed.forEach(s => obs.observe(s));
  