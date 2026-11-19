
/* =====================================
   THE EVERYDAY EDIT
   Main website functionality
===================================== */

// Add your TMDB API Read Access Token here.
// Get one at: https://www.themoviedb.org/settings/api
const TMDB_TOKEN = "PASTE_YOUR_TMDB_READ_ACCESS_TOKEN_HERE";

// Saved items are kept in the browser.
let savedItems = JSON.parse(localStorage.getItem("everydayEditSaved") || "[]");

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const selectedPage = document.getElementById(pageId);
  if (selectedPage) selectedPage.classList.add("active");

  document.getElementById("navigation").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (pageId === "saved") displaySaved();
  if (pageId === "buzz") loadMovies();
}

function toggleMenu() {
  document.getElementById("navigation").classList.toggle("open");
}

// =====================================
// SEARCH
// =====================================

const searchableContent = [
  { title: "Running", description: "Intervals, long runs and easy miles", page: "move" },
  { title: "Pilates", description: "Strengthen, stretch and reset", page: "move" },
  { title: "Strength Training", description: "Build strength at your own pace", page: "move" },
  { title: "Date Night", description: "Outfits and plans for date night", page: "daily" },
  { title: "Girls' Night", description: "Ideas for a night with friends", page: "daily" },
  { title: "Weekend Plans", description: "Find something fun to do", page: "daily" },
  { title: "Easy Dinners", description: "Simple dinner ideas", page: "recipes" },
  { title: "Something Sweet", description: "Desserts and treats", page: "recipes" },
  { title: "Trader Joe's Finds", description: "Food finds and grocery inspiration", page: "recipes" },
  { title: "Living Spaces", description: "Interior and room inspiration", page: "spaces" },
  { title: "Decorating", description: "Home decor and seasonal inspiration", page: "spaces" },
  { title: "Gift Guides", description: "Gift ideas for everyone", page: "holiday" },
  { title: "Holiday Recipes", description: "Seasonal recipes and baking", page: "holiday" },
  { title: "Movies", description: "Trending movies and new releases", page: "buzz" },
  { title: "Influencers", description: "Creator updates and social media", page: "buzz" }
];

function searchSite() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase().trim();
  if (!searchTerm) return;

  const results = searchableContent.filter(item =>
    item.title.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm)
  );

  showPage("searchPage");

  const container = document.getElementById("searchResults");

  if (results.length === 0) {
    container.innerHTML = "<p>No results found. Try another search!</p>";
    return;
  }

  container.innerHTML = results.map(item => `
    <article class="tile" onclick="showPage('${item.page}')">
      <div style="background:#f4d66d;padding:35px;min-height:140px;">
        <p class="eyebrow">THE EVERYDAY EDIT</p>
        <h3>${item.title}</h3>
      </div>
      <p>${item.description}</p>
      <button class="text-button">EXPLORE ↗</button>
    </article>
  `).join("");
}

// =====================================
// SAVED ITEMS
// =====================================

function saveItem(title, description) {
  const alreadySaved = savedItems.some(item => item.title === title);

  if (alreadySaved) {
    savedItems = savedItems.filter(item => item.title !== title);
  } else {
    savedItems.push({ title, description });
  }

  localStorage.setItem("everydayEditSaved", JSON.stringify(savedItems));
  displaySaved();
}

function displaySaved() {
  const container = document.getElementById("savedGrid");

  if (savedItems.length === 0) {
    container.innerHTML = "<p>You haven't saved anything yet. Explore the site and tap ♡ on something you love.</p>";
    return;
  }

  container.innerHTML = savedItems.map(item => `
    <article class="saved-item">
      <p class="eyebrow">YOUR SAVED EDIT</p>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <button class="text-button" onclick="saveItem('${escapeText(item.title)}','${escapeText(item.description)}')">
        REMOVE FROM SAVED ×
      </button>
    </article>
  `).join("");
}

function escapeText(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

// =====================================
// QUIZ 1: FIND YOUR WEEKEND VIBE
// =====================================

function startWeekendQuiz() {
  showPage("quizzes");

  const area = document.getElementById("quizArea");

  const questions = [
    {
      question: "1. What sounds best?",
      options: ["Getting outside", "A cozy day at home", "Exploring somewhere new", "Getting dressed up"]
    },
    {
      question: "2. Who are you going with?",
      options: ["Friends", "Just me", "Family"]
    },
    {
      question: "3. What's your budget?",
      options: ["Budget-friendly", "A little splurge"]
    }
  ];

  let answers = [];

  function renderQuestion(index) {
    if (index >= questions.length) {
      showWeekendResult(answers);
      return;
    }

    const question = questions[index];

    area.innerHTML = `
      <p class="eyebrow">WEEKEND VIBE QUIZ · QUESTION ${index + 1} OF 3</p>
      <h2>${question.question}</h2>
      <div class="quiz-options">
        ${question.options.map(option => `
          <button class="quiz-option" onclick="selectWeekendAnswer('${escapeText(option)}', ${index})">
            ${option}
          </button>
        `).join("")}
      </div>
    `;

    window.selectWeekendAnswer = function(answer, questionIndex) {
      answers[questionIndex] = answer;
      renderQuestion(questionIndex + 1);
    };
  }

  function showWeekendResult(responses) {
    const activity = responses[0];
    const company = responses[1];
    const budget = responses[2];

    let result;

    if (activity === "Getting outside") {
      result = {
        title: "The Outdoor Explorer",
        description: "Your ideal weekend includes fresh air, a little movement, and somewhere beautiful to explore.",
        ideas: "Try a scenic walk, a morning hike, a picnic, or a new outdoor workout."
      };
    } else if (activity === "A cozy day at home") {
      result = {
        title: "The Cozy Weekend",
        description: "You're in the mood to slow down, recharge, and enjoy being at home.",
        ideas: "Make a fun breakfast, try a new recipe, have a movie night, or refresh your space."
      };
    } else if (activity === "Exploring somewhere new") {
      result = {
        title: "The Little Adventurer",
        description: "You want a change of scenery and something new to discover.",
        ideas: "Visit a new coffee shop, browse a local market, explore a nearby town, or try a new class."
      };
    } else {
      result = {
        title: "The Main Character Weekend",
        description: "You're ready for a fun plan, a great outfit, and a reason to get out of the house.",
        ideas: "Plan a dinner, get dressed up, try a new restaurant, or organize a girls' night."
      };
    }

    area.innerHTML = `
      <p class="eyebrow">YOUR WEEKEND VIBE</p>
      <div class="quiz-result">
        <h3>${result.title}</h3>
        <p>${result.description}</p>
        <p><strong>Your weekend ideas:</strong> ${result.ideas}</p>
        <p><strong>Your plans:</strong> ${company} · ${budget}</p>
        <button class="dark-button" onclick="saveItem('${escapeText(result.title)}','${escapeText(result.ideas)}')">♡ SAVE MY RESULT</button>
        <button class="text-button" onclick="startWeekendQuiz()">TAKE AGAIN ↻</button>
      </div>
    `;
  }

  renderQuestion(0);
}

// =====================================
// QUIZ 2: WHAT'S IN YOUR FRIDGE?
// =====================================

function startFridgeQuiz() {
  showPage("quizzes");

  const area = document.getElementById("quizArea");

  area.innerHTML = `
    <p class="eyebrow">THE FRIDGE CLEAN-OUT CHALLENGE</p>
    <h2>What's in your fridge?</h2>
    <p>Enter a few ingredients you already have, separated by commas. We'll suggest something to make!</p>
    <input id="ingredients" type="text" placeholder="Example: eggs, spinach, chicken, pasta">
    <button class="dark-button" onclick="findRecipe()">FIND MY RECIPE ↗</button>
    <div id="recipeResult"></div>
  `;
}

function findRecipe() {
  const ingredients = document.getElementById("ingredients").value.toLowerCase();
  const result = document.getElementById("recipeResult");

  if (!ingredients.trim()) {
    result.innerHTML = "<p>Enter at least one ingredient to get started!</p>";
    return;
  }

  const recipes = [
    {
      title: "The Easy Breakfast Bowl",
      description: "A simple bowl with eggs, avocado, spinach, and whatever vegetables you have.",
      keywords: ["egg", "avocado", "spinach", "tomato", "potato"]
    },
    {
      title: "The Everything Pasta",
      description: "Toss pasta with olive oil, garlic, vegetables, and a little parmesan.",
      keywords: ["pasta", "tomato", "spinach", "cheese", "garlic"]
    },
    {
      title: "The Weeknight Chicken Bowl",
      description: "Build a bowl with chicken, rice, vegetables, and your favorite dressing.",
      keywords: ["chicken", "rice", "broccoli", "carrot", "avocado"]
    },
    {
      title: "The Loaded Salad",
      description: "Mix greens with whatever vegetables, protein, nuts, and cheese you have.",
      keywords: ["lettuce", "spinach", "chicken", "cheese", "cucumber"]
    },
    {
      title: "The Sweet Treat",
      description: "Make a quick yogurt bowl with fruit, honey, and something crunchy.",
      keywords: ["yogurt", "berries", "banana", "strawberry", "honey"]
    }
  ];

  let bestRecipe = recipes[0];
  let highestScore = 0;

  recipes.forEach(recipe => {
    let score = 0;

    recipe.keywords.forEach(keyword => {
      if (ingredients.includes(keyword)) score++;
    });

    if (score > highestScore) {
      highestScore = score;
      bestRecipe = recipe;
    }
  });

  if (highestScore === 0) {
    bestRecipe = {
      title: "The Mix-and-Match Meal",
      description: "Try combining one protein, one vegetable, and one carbohydrate. Add a sauce or seasoning you love, and make it your own!"
    };
  }

  result.innerHTML = `
    <div class="quiz-result">
      <p class="eyebrow">YOUR RECIPE MATCH</p>
      <h3>${bestRecipe.title}</h3>
      <p>${bestRecipe.description}</p>
      <p><strong>Ingredients you entered:</strong> ${ingredients}</p>
      <button class="dark-button" onclick="saveItem('${escapeText(bestRecipe.title)}','${escapeText(bestRecipe.description)}')">♡ SAVE THIS IDEA</button>
      <button class="text-button" onclick="startFridgeQuiz()">TRY AGAIN ↻</button>
    </div>
  `;
}

// =====================================
// QUIZ 3: BUILD MY WORKOUT
// =====================================

function startWorkoutQuiz(preselectedType = "") {
  showPage("quizzes");

  const area = document.getElementById("quizArea");

  const workoutTypes = ["Run", "Pilates", "Strength", "Walk", "Hike", "Recovery"];

  area.innerHTML = `
    <p class="eyebrow">YOUR PERSONAL WORKOUT EDIT</p>
    <h2>Build my workout.</h2>

    <div class="quiz-question">
      <h3>What are you in the mood for?</h3>
      <div class="quiz-options">
        ${workoutTypes.map(type => `
          <button class="quiz-option ${preselectedType === type ? "selected" : ""}"
            onclick="selectWorkoutType('${type}', this)">${type}</button>
        `).join("")}
      </div>
    </div>

    <div class="quiz-question">
      <h3>How much time do you have?</h3>
      <div class="quiz-options">
        <button class="quiz-option" onclick="selectWorkoutTime('15 minutes',this)">15 minutes</button>
        <button class="quiz-option" onclick="selectWorkoutTime('30 minutes',this)">30 minutes</button>
        <button class="quiz-option" onclick="selectWorkoutTime('45 minutes',this)">45 minutes</button>
        <button class="quiz-option" onclick="selectWorkoutTime('60 minutes',this)">60 minutes</button>
      </div>
    </div>

    <div class="quiz-question">
      <h3>What intensity sounds right?</h3>
      <div class="quiz-options">
        <button class="quiz-option" onclick="selectWorkoutDifficulty('Easy',this)">Easy</button>
        <button class="quiz-option" onclick="selectWorkoutDifficulty('Moderate',this)">Moderate</button>
        <button class="quiz-option" onclick="selectWorkoutDifficulty('Challenging',this)">Challenging</button>
      </div>
    </div>

    <button class="dark-button" onclick="generateWorkout()">FIND MY WORKOUT ↗</button>
    <div id="workoutResult"></div>
  `;

  window.workoutChoices = {
    type: preselectedType,
    time: "",
    difficulty: ""
  };
}

function selectWorkoutType(value, button) {
  workoutChoices.type = value;
  highlightSelection(button);
}

function selectWorkoutTime(value, button) {
  workoutChoices.time = value;
  highlightSelection(button);
}

function selectWorkoutDifficulty(value, button) {
  workoutChoices.difficulty = value;
  highlightSelection(button);
}

function highlightSelection(button) {
  button.parentElement.querySelectorAll(".quiz-option").forEach(option => {
    option.classList.remove("selected");
  });
  button.classList.add("selected");
}

function generateWorkout() {
  const choice = workoutChoices;
  const result = document.getElementById("workoutResult");

  if (!choice.type || !choice.time || !choice.difficulty) {
    result.innerHTML = "<p>Please choose a workout type, time, and intensity first!</p>";
    return;
  }

  const suggestions = {
    Run: "Start with a 5-minute warm-up, alternate running and recovery intervals, and finish with an easy cooldown.",
    Pilates: "Focus on core work, controlled movements, glute strength, and a few minutes of stretching.",
    Strength: "Choose a squat, hinge, push, pull, and core movement. Complete 2–3 rounds with controlled form.",
    Walk: "Head outside for a brisk walk. Mix in a few faster intervals if you want an extra challenge.",
    Hike: "Find a local trail, bring water, and enjoy a steady-paced outdoor adventure.",
    Recovery: "Try gentle mobility, stretching, breathing exercises, and an easy walk."
  };

  const suggestion = suggestions[choice.type];

  result.innerHTML = `
    <div class="quiz-result">
      <p class="eyebrow">YOUR WORKOUT IS READY</p>
      <h3>${choice.time} ${choice.difficulty.toLowerCase()} ${choice.type.toLowerCase()}</h3>
      <p>${suggestion}</p>
      <p><strong>Your plan:</strong> ${choice.type} · ${choice.time} · ${choice.difficulty}</p>
      <p>Adjust the movements to your ability, and take breaks whenever you need them.</p>
      <button class="dark-button" onclick="saveItem('${escapeText(choice.type + ' Workout')}','${escapeText(suggestion)}')">♡ SAVE WORKOUT</button>
      <button class="text-button" onclick="startWorkoutQuiz()">BUILD ANOTHER ↻</button>
    </div>
  `;
}

// =====================================
// THE BUZZ: SOCIAL POSTS
// =====================================

function addSocialPost() {
  const input = document.getElementById("socialUrl");
  const url = input.value.trim();
  const container = document.getElementById("socialPosts");

  if (!url) {
    alert("Paste a TikTok or Instagram post link first.");
    return;
  }

  let parsedUrl;

  try {
    parsedUrl = new URL(url);
  } catch {
    alert("Please enter a valid link.");
    return;
  }

  const allowedSites = [
    "tiktok.com",
    "www.tiktok.com",
    "instagram.com",
    "www.instagram.com"
  ];

  if (!allowedSites.includes(parsedUrl.hostname)) {
    alert("Please use a TikTok or Instagram link.");
    return;
  }

  const post = document.createElement("article");
  post.className = "social-post";

  const label = document.createElement("p");
  label.textContent = "YOUR CREATOR EDIT";

  const link = document.createElement("a");
  link.href = parsedUrl.href;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = "OPEN POST ↗";

  post.append(label, link);
  container.prepend(post);
  input.value = "";
}

// =====================================
// THE BUZZ: MOVIE API
// =====================================

async function loadMovies() {
  const container = document.getElementById("movieGrid");

  if (!container) return;

  if (
    !TMDB_TOKEN ||
    TMDB_TOKEN === "PASTE_YOUR_TMDB_READ_ACCESS_TOKEN_HERE"
  ) {
    container.innerHTML = `
      <p>Your movie feed is ready to connect! Add your TMDB API Read Access Token in script.js to display current trending movies.</p>
    `;
    return;
  }

  container.innerHTML = "<p>Loading the latest movie edit...</p>";

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_TOKEN}`
        }
      }
    );

    if (!response.ok) {
      throw new Error("The movie feed could not be loaded.");
    }

    const data = await response.json();

    const movies = data.results.slice(0, 12);

    container.innerHTML = movies.map(movie => {
      const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "";

      const releaseDate = movie.release_date || "Release date unavailable";
      const rating = movie.vote_average
        ? movie.vote_average.toFixed(1)
        : "Not rated";

      return `
        <article class="movie-card">
          ${
            poster
              ? `<img src="${poster}" alt="${escapeHtml(movie.title)} poster">`
              : `<div style="height:310px;background:#e8d9cb;display:grid;place-items:center;">Poster unavailable</div>`
          }
          <div>
            <p class="eyebrow">TRENDING MOVIE</p>
            <h3>${escapeHtml(movie.title)}</h3>
            <p>${escapeHtml(releaseDate)}</p>
            <p class="movie-rating">★ ${rating} / 10</p>
            <p>${escapeHtml(movie.overview || "No description available.")}</p>
            <button class="text-button" onclick="saveItem('${escapeText(movie.title)}','${escapeText("Trending movie · " + releaseDate)}')">♡ SAVE MOVIE</button>
          </div>
        </article>
      `;
    }).join("");

  } catch (error) {
    container.innerHTML = `
      <p>We couldn't load the movie feed right now. Check your API token and internet connection, then refresh.</p>
    `;
    console.error(error);
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

// =====================================
// INITIALIZE WEBSITE
// =====================================

displaySaved();
