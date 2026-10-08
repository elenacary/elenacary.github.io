```javascript
/* =========================================
   PAGE NAVIGATION
========================================= */

const navButtons =
  document.querySelectorAll(".nav-button");

const pages =
  document.querySelectorAll(".page");

const pageTitle =
  document.getElementById("pageTitle");

const pageSubtitle =
  document.getElementById("pageSubtitle");


const pageInfo = {

  overview: {
    title: "Good morning, Elena ☀️",
    subtitle: "Here's what's happening in your world."
  },

  assignments: {
    title: "Your assignments 📚",
    subtitle: "Everything coming up for school."
  },

  schedule: {
    title: "Your week 🗓️",
    subtitle: "A look at your general schedule."
  },

  research: {
    title: "Research days 🔬",
    subtitle: "Exercise oncology, projects & research."
  },

  medschool: {
    title: "Medical school 🩺",
    subtitle: "Interviews, preparation & everything in between."
  },

  weekend: {
    title: "Weekend plans 🌿",
    subtitle: "Make room for things outside of school."
  },

  ideas: {
    title: "Things you want to do ✨",
    subtitle: "Little ideas worth remembering."
  }

};


function showPage(pageId) {

  pages.forEach(page => {

    page.classList.remove(
      "active-page"
    );

  });


  const selectedPage =
    document.getElementById(pageId);

  if (selectedPage) {

    selectedPage.classList.add(
      "active-page"
    );

  }


  navButtons.forEach(button => {

    button.classList.remove(
      "active"
    );

    if (
      button.dataset.page === pageId
    ) {

      button.classList.add(
        "active"
      );

    }

  });


  if (pageInfo[pageId]) {

    pageTitle.textContent =
      pageInfo[pageId].title;

    pageSubtitle.textContent =
      pageInfo[pageId].subtitle;

  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


navButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      showPage(
        button.dataset.page
      );

    }
  );

});


/* =========================================
   OVERVIEW BUTTONS
========================================= */

document
  .querySelectorAll("[data-go]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        showPage(
          button.dataset.go
        );

      }
    );

  });


/* =========================================
   ASSIGNMENT CHECKBOXES
========================================= */

document
  .querySelectorAll(".complete-button")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const row =
          button.closest(
            ".assignment-row"
          );

        row.classList.toggle(
          "completed"
        );

      }
    );

  });


/* =========================================
   ADD ASSIGNMENT
========================================= */

const assignmentInput =
  document.getElementById(
    "assignmentInput"
  );

const addAssignmentButton =
  document.getElementById(
    "addAssignment"
  );


function addAssignment() {

  const text =
    assignmentInput.value.trim();

  if (!text) return;


  const row =
    document.createElement("div");

  row.className =
    "assignment-row searchable";


  row.innerHTML = `

    <button class="complete-button">
      ✓
    </button>

    <div class="assignment-details">

      <strong>
        ${escapeHTML(text)}
      </strong>

      <span>
        New assignment
      </span>

    </div>

    <span class="priority medium">
      New
    </span>

  `;


  const largeCard =
    document.querySelector(
      "#assignments .large-card"
    );


  const addRow =
    largeCard.querySelector(
      ".add-row"
    );


  largeCard.insertBefore(
    row,
    addRow
  );


  const button =
    row.querySelector(
      ".complete-button"
    );


  button.addEventListener(
    "click",
    () => {

      row.classList.toggle(
        "completed"
      );

    }
  );


  assignmentInput.value = "";

}


addAssignmentButton.addEventListener(
  "click",
  addAssignment
);


assignmentInput.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Enter"
    ) {

      addAssignment();

    }

  }
);


/* =========================================
   ADD IDEA
========================================= */

const ideaInput =
  document.getElementById(
    "ideaInput"
  );

const addIdeaButton =
  document.getElementById(
    "addIdea"
  );


function addIdea() {

  const text =
    ideaInput.value.trim();

  if (!text) return;


  const idea =
    document.createElement("div");

  idea.className =
    "idea searchable";

  idea.textContent =
    "✨ " + text;


  const ideasCard =
    document.querySelector(
      ".ideas-card"
    );


  const addRow =
    ideasCard.querySelector(
      ".add-row"
    );


  ideasCard.insertBefore(
    idea,
    addRow
  );


  ideaInput.value = "";

}


addIdeaButton.addEventListener(
  "click",
  addIdea
);


ideaInput.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Enter"
    ) {

      addIdea();

    }

  }
);


/* =========================================
   SEARCH
========================================= */

const searchInput =
  document.getElementById(
    "searchInput"
  );

const searchResults =
  document.getElementById(
    "searchResults"
  );

const resultsList =
  document.getElementById(
    "resultsList"
  );


searchInput.addEventListener(
  "input",
  searchWebsite
);


function searchWebsite() {

  const query =
    searchInput.value
      .toLowerCase()
      .trim();


  if (!query) {

    searchResults.classList.add(
      "hidden"
    );

    resultsList.innerHTML = "";

    return;

  }


  resultsList.innerHTML = "";


  const searchable =
    document.querySelectorAll(
      ".searchable"
    );


  let found = 0;


  searchable.forEach(item => {

    const text =
      item.innerText
        .toLowerCase();


    if (
      text.includes(query)
    ) {

      const result =
        document.createElement("div");

      result.className =
        "search-result";


      result.innerHTML = `

        <strong>
          ${item.innerText.split("\n")[0]}
        </strong>

        <span>
          ${item.innerText
            .split("\n")
            .slice(1)
            .join(" · ")}
        </span>

      `;


      resultsList.appendChild(
        result
      );


      found++;

    }

  });


  if (found === 0) {

    resultsList.innerHTML = `

      <p style="
        color:#71878b;
        font-size:12px;
      ">
        Nothing found yet 🌿
      </p>

    `;

  }


  searchResults.classList.remove(
    "hidden"
  );

}


/* =========================================
   ESCAPE USER INPUT
========================================= */

function escapeHTML(text) {

  const div =
    document.createElement(
      "div"
    );

  div.textContent =
    text;

  return div.innerHTML;

}
```
