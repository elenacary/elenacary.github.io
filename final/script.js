
const app = document.getElementById("app");
const nav = document.querySelector(".desktop-nav");
const savedCount = document.getElementById("saved-count");

let savedItems = JSON.parse(
  localStorage.getItem("everydayEditSaved") || "[]"
);

const content = {
  move: [
    {
      id: "m1",
      category: "RUN",
      type: "Running",
      title: "A feel-good interval run",
      desc: "A treadmill or outdoor session to add variety to your week.",
      tag: "25 MIN",
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=900&q=85",
      link: "https://www.youtube.com/results?search_query=running+interval+workout"
    },
    {
      id: "m2",
      category: "STRENGTH",
      type: "Strength",
      title: "A full-body strength reset",
      desc: "A balanced strength session for the days you want to feel strong.",
      tag: "30 MIN",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85",
      link: "https://www.youtube.com/results?search_query=full+body+strength+workout"
    },
    {
      id: "m3",
      category: "PILATES",
      type: "Pilates",
      title: "A slower kind of strength",
      desc: "A mat-based flow for a focused, low-impact movement day.",
      tag: "20 MIN",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85",
      link: "https://www.youtube.com/results?search_query=mat+pilates"
    }
  ],

  daily: [
    {
      id: "d1",
      category: "STYLE",
      type: "Everyday",
      title: "The everyday outfit formula",
      desc: "Easy layers, great jeans, and one detail that makes it feel like you.",
      tag: "WHAT TO WEAR",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
      link: "https://www.pinterest.com/search/pins/?q=everyday+outfit"
    },
    {
      id: "d2",
      category: "GIRLS' NIGHT",
      type: "Occasion",
      title: "A night in, but make it special",
      desc: "A cozy evening with good food, a playlist, and your favorite people.",
      tag: "MAKE A PLAN",
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=85",
      link: "https://www.pinterest.com/search/pins/?q=girls+night"
    },
    {
      id: "d3",
      category: "WEEKEND",
      type: "Everyday",
      title: "A little weekend inspiration",
      desc: "A long walk, a market stop, and time to reset.",
      tag: "LITTLE THINGS",
      image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=85",
      link: "https://www.pinterest.com/search/pins/?q=weekend+inspiration"
    }
  ],

  recipes: [
    {
      id: "r1",
      category: "SWEET",
      type: "Dessert",
      title: "The cozy-season baking list",
      desc: "Cookies, cakes, and little treats worth making.",
      tag: "SOMETHING SWEET",
      image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=900&q=85",
      link: "https://www.bbcgoodfood.com/recipes/collection/autumn-baking-recipes"
    },
    {
      id: "r2",
      category: "WEEK NIGHT",
      type: "Dinner",
      title: "An easy dinner to keep on repeat",
      desc: "A flexible weeknight idea for something delicious.",
      tag: "DINNER IDEAS",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
      link: "https://www.budgetbytes.com/"
    },
    {
      id: "r3",
      category: "SEASONAL",
      type: "Seasonal",
      title: "A market-basket kind of meal",
      desc: "Build something colorful around what's in season.",
      tag: "COOK WITH THE SEASON",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
      link: "https://www.loveandlemons.com/"
    }
  ],

  spaces: [
    {
      id: "s1",
      category: "LIVING ROOM",
      type: "Living room",
      title: "Collected, not decorated",
      desc: "Mix artwork, vintage finds, texture, and pieces that tell a story.",
      tag: "ROOM INSPIRATION",
      image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=900&q=85",
      link: "https://www.pinterest.com/search/pins/?q=eclectic+living+room"
    },
    {
      id: "s2",
      category: "BEDROOM",
      type: "Bedroom",
      title: "A bedroom with personality",
      desc: "Layered bedding, warm lighting, and details that make a room yours.",
      tag: "ROOM INSPIRATION",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85",
      link: "https://www.pinterest.com/search/pins/?q=collected+bedroom"
    },
    {
      id: "s3",
      category: "DETAILS",
      type: "Details",
      title: "The details make the space",
      desc: "Art, lamps, flowers, books, and objects collected over time.",
      tag: "FINISHING TOUCHES",
      image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=85",
      link: "https://www.pinterest.com/search/pins/?q=eclectic+home+decor"
    }
  ],

  holiday: [
    {
      id: "h1",
      category: "DECOR",
      type: "Decor",
      title: "A collected Christmas",
      desc: "A festive mix of color, nostalgic details, and greenery.",
      tag: "HOLIDAY SPACES",
      image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=900&q=85",
      link: "https://www.pinterest.com/search/pins/?q=colorful+christmas+decor"
    },
    {
      id: "h2",
      category: "HOSTING",
      type: "Hosting",
      title: "A holiday night with friends",
      desc: "A simple menu, a pretty table, and a reason to gather.",
      tag: "GATHER TOGETHER",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85",
      link: "https://www.pinterest.com/search/pins/?q=christmas+dinner+party"
    },
    {
      id: "h3",
      category: "GIFTING",
      type: "Gifts",
      title: "Thoughtful little gift ideas",
      desc: "A few ideas for the people who are fun to shop for.",
      tag: "THE GIFT EDIT",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=85",
      link: "https://www.pinterest.com/search/pins/?q=thoughtful+gift+guide"
    }
  ]
};

const pageInfo = {
  move: [
    "Move your way.",
    "Workouts, movement ideas, and reminders to get out the door."
  ],
  daily: [
    "The Daily Edit.",
    "What to wear, what to do, where to go, and little plans that make an ordinary day feel special."
  ],
  recipes: [
    "The Recipe Edit.",
    "Seasonal favorites, weeknight ideas, and something sweet. Good food, no rules."
  ],
  spaces: [
    "The Space Edit.",
    "Rooms, objects, colors, and collected details that make a space feel like you."
  ],
  holiday: [
    "The Holiday Edit.",
    "Seasonal inspiration for decorating, gathering, gifting, and cooking."
  ],
  saved: [
    "Your saved edit.",
    "All the ideas you have bookmarked in one place."
  ]
};

function updateSavedCount() {
  savedCount.textContent = savedItems.length;
}

function cardTemplate(item) {
  const isSaved = savedItems.some(
    saved => saved.id === item.id
  );

  return `
    <article class="content-card">
      <img src="${item.image}" alt="${item.title}">

      <div class="content-card-body">
        <span class="category">
          ${item.category} · ${item.tag}
        </span>

        <h3>${item.title}</h3>
        <p>${item.desc}</p>

        <div class="card-actions">
          <a href="${item.link}" target="_blank">
            EXPLORE ↗
          </a>

          <button
            class="save-btn ${isSaved ? "saved" : ""}"
            data-save="${item.id}">
            ${isSaved ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderPage(page, filter = "All") {
  const isSavedPage = page === "saved";

  let items = isSavedPage
    ? savedItems
    : content[page] || [];

  if (filter !== "All") {
    items = items.filter(
      item => item.type === filter
    );
  }

  const filters = isSavedPage
    ? []
    : ["All", ...new Set(
        (content[page] || []).map(item => item.type)
      )];

  app.innerHTML = `
    <section class="page-wrap">

      <div class="page-top">
        <div>
          <p class="eyebrow">THE EVERYDAY EDIT / ${page.toUpperCase()}</p>
          <h1>${pageInfo[page][0]}</h1>
        </div>

        <p>${pageInfo[page][1]}</p>
      </div>

      <div class="filter-row">
        ${filters.map(f => `
          <button class="filter-btn ${filter === f ? "active" : ""}"
            data-filter="${f}">
            ${f.toUpperCase()}
          </button>
        `).join("")}
      </div>

      <div class="content-grid">
        ${items.length
          ? items.map(cardTemplate).join("")
          : `<div class="empty-state">
               <h2>Nothing saved just yet.</h2>
               <p>Tap the heart on anything you want to revisit.</p>
             </div>`
        }
      </div>

    </section>
  `;

  document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      renderPage(page, button.dataset.filter);
    });
  });

  document.querySelectorAll("[data-save]").forEach(button => {
    button.addEventListener("click", () => {
      toggleSave(button.dataset.save, page);
    });
  });
}

function toggleSave(id, page) {
  const allItems = Object.values(content).flat();

  const item = allItems.find(
    item => item.id === id
  );

  const index = savedItems.findIndex(
    saved => saved.id === id
  );

  if (index >= 0) {
    savedItems.splice(index, 1);
  } else if (item) {
    savedItems.push(item);
  }

  localStorage.setItem(
    "everydayEditSaved",
    JSON.stringify(savedItems)
  );

  updateSavedCount();
  renderPage(page);
}

function navigate(page) {
  if (page === "home") {
    location.hash = "";
    location.reload();
    return;
  }

  location.hash = page;
  renderPage(page);

  document.querySelectorAll(".desktop-nav button").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.page === page
    );
  });

  nav.classList.remove("open");
  window.scrollTo(0, 0);
}

// NAVIGATION BUTTONS

document.querySelectorAll("[data-page]").forEach(button => {
  button.addEventListener("click", () => {
    navigate(button.dataset.page);
  });
});

// SEARCH

document.getElementById("search-toggle").addEventListener("click", () => {
  document.getElementById("search-panel").classList.toggle("open");
});

document.getElementById("menu-toggle").addEventListener("click", () => {
  nav.classList.toggle("open");
});

function runSearch() {
  const term = document.getElementById("search-input")
    .value.trim().toLowerCase();

  if (!term) return;

  const matches = Object.values(content)
    .flat()
    .filter(item =>
      (item.title + " " + item.desc + " " +
       item.category + " " + item.type)
        .toLowerCase()
        .includes(term)
    );

  app.innerHTML = `
    <section class="page-wrap">
      <div class="page-top">
        <div>
          <p class="eyebrow">THE EVERYDAY EDIT / SEARCH</p>
          <h1>Search results.</h1>
        </div>
        <p>Ideas matching "${term}"</p>
      </div>

      <div class="content-grid">
        ${matches.length
          ? matches.map(cardTemplate).join("")
          : `<div class="empty-state">
               No matches yet. Try "run", "dinner", or "bedroom".
             </div>`
        }
      </div>
    </section>
  `;

  document.querySelectorAll("[data-save]").forEach(button => {
    button.addEventListener("click", () => {
      toggleSave(button.dataset.save, "daily");
    });
  });
}

document.getElementById("search-submit")
  .addEventListener("click", runSearch);

document.getElementById("search-input")
  .addEventListener("keydown", event => {
    if (event.key === "Enter") runSearch();
  });

updateSavedCount();
