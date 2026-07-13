function horizontalNav() {
  return {
    wrapper: document.querySelector(".header__menu"),
    navigation: document.querySelector(".main__menu"),
    item: document.querySelectorAll(".menu__item__group"),
    arrows: document.querySelector(".menuBtn__wrapper"),
    scrollStep: 0,
    totalStep: 0,

    // Count the actual number of rows based on offsetTop
    countRows: function () {
      const items = Array.from(
        this.navigation.querySelectorAll(".menuItem__link")
      );
      const rowTops = new Set(items.map((item) => item.offsetTop));
      return rowTops.size;
    },

    // Maximum number of scroll steps (not negative)
    onCalcNavOverView: function () {
      const totalRows = this.countRows();

      // Number of rows displayed (usually 1)
      let wrapper = document.querySelector(".menu__horizontal__wrapper");
      let rowHeight = wrapper.offsetHeight;
      let visibleRows = Math.floor(wrapper.offsetHeight / rowHeight);

      // Maximum scroll steps (not negative)
      return Math.max(totalRows - visibleRows, 0);
    },

    transform: function () {
      let wrapper = document.querySelector(".menu__horizontal__wrapper");
      let rowHeight = wrapper.offsetHeight;
      return `translateY(-${this.scrollStep * rowHeight}px)`;
    },

    handleArrowClick: function (e) {
      this.totalStep = this.onCalcNavOverView();

      if (e.currentTarget.classList.contains("menu__prev")) {
        this.scrollStep = this.scrollStep - 1;
      } else {
        this.scrollStep = this.scrollStep + 1;
      }

      this.handleScroll();
    },

    handleScroll: function () {
      // Remove disabled class from all buttons
      if (!this.arrows) return;
      const buttons = this.arrows.querySelectorAll("button");
      buttons.forEach((btn) => btn.classList.remove("disabled"));

      // Check if reached end
      if (this.scrollStep >= this.totalStep) {
        const nextBtn = this.arrows.querySelector(".menu__next");
        if (nextBtn) nextBtn.classList.add("disabled");
        this.scrollStep = this.totalStep;
      }

      // Check if at beginning
      if (this.scrollStep <= 0) {
        const prevBtn = this.arrows.querySelector(".menu__prev");
        if (prevBtn) prevBtn.classList.add("disabled");
        this.scrollStep = 0;
      }

      // Determine the current row
      let wrapper = document.querySelector(".menu__horizontal__wrapper");
      if (!wrapper) return;
      let rowHeight = wrapper.offsetHeight;
      let currentRow = this.scrollStep;
      let items = Array.from(
        this.navigation.querySelectorAll(".menuItem__link")
      );

      // Find offsetTop of each row
      let rowTops = [...new Set(items.map((item) => item.offsetTop))];
      let visibleTop = rowTops[currentRow];

      // Handle display
      this.item.forEach((item) => {
        const menuLink = item.querySelector(".menuItem__link");
        if (menuLink) {
          // Transform as before
          menuLink.style.transform = this.transform();

          // Show/hide item based on row
          if (menuLink.offsetTop === visibleTop) {
            item.classList.add("visible-row");
          } else {
            item.classList.remove("visible-row");
          }
        }
      });
    },

    init: function () {
      // Check if required elements exist
      if (
        !this.wrapper ||
        !this.navigation ||
        !this.arrows ||
        this.item.length === 0
      ) {
        return;
      }

      this.totalStep = this.onCalcNavOverView();

      if (this.totalStep > 0) {
        this.wrapper.classList.add("overflow");
      }

      this.handleScroll();

      // Add event listeners to arrow buttons
      const buttons = this.arrows.querySelectorAll("button");
      buttons.forEach((button) => {
        button.addEventListener("click", (e) => this.handleArrowClick(e));
      });
    }
  };
}

let navInstance = null;

// --- Globally Scoped Variables & Toggle Function ---
let overlays, body, menuBtn, menuItems;

function toggle() {
  if (body && overlays && menuBtn && menuItems) {
    body.classList.toggle("overflow");
    overlays.classList.toggle("overlay--active");
    menuBtn.classList.toggle("open");
    menuItems.classList.toggle("open");
  }
}

function handleResizeAndLoad() {
  const isDesktop = window.innerWidth > 768;
  const arrowContainer = document.querySelector(".menu__horizontal__btn");

  // --- Logic for Horizontal Nav (Desktop) ---
  if (isDesktop) {
    if (arrowContainer) arrowContainer.style.display = "";

    if (!navInstance) {
      navInstance = horizontalNav();
      navInstance.init();
    } else {
      // Recalculate on resize
      navInstance.totalStep = navInstance.onCalcNavOverView();
      navInstance.scrollStep = 0;
      navInstance.handleScroll();
    }
  }
  // --- Logic for Mobile View ---
  else {
    if (arrowContainer) arrowContainer.style.display = "none";

    if (navInstance) {
      // "Destroy" the instance by resetting its visual effects
      if (navInstance.wrapper) navInstance.wrapper.classList.remove("overflow");
      if (navInstance.item) {
        navInstance.item.forEach((item) => {
          const menuLink = item.querySelector(".menuItem__link");
          if (menuLink) menuLink.style.transform = "";
        });
      }
      navInstance = null;
    }
  }

  // --- Cleanup Mobile Menu state when switching to Desktop ---
  if (isDesktop) {
    // Close the main off-canvas menu if it's open
    if (menuBtn && menuBtn.classList.contains("open")) {
      toggle();
    }

    // Reset all sub-menus that were opened on mobile
    const dropdownMenu = document.querySelectorAll(".main__menu .sub__menu");
    for (let i = 0; i < dropdownMenu.length; i++) {
      dropdownMenu[i].style.display = ""; // Reset display from slide functions
      const parentLi = dropdownMenu[i].closest("li");
      if (parentLi && parentLi.classList.contains("open")) {
        parentLi.classList.remove("open");
        const expandBtn = parentLi.querySelector(".expand-btn");
        if (expandBtn) expandBtn.classList.remove("open");
      }
    }
  }
}

/* --- Pure JavaScript slideToggle, slideUp, slideDown --- */
function slideUp(element, duration = 300) {
  return new Promise((resolve) => {
    element.style.height = element.offsetHeight + "px";
    element.style.transitionProperty = "height, margin, padding";
    element.style.transitionDuration = duration + "ms";
    element.offsetHeight; // Force reflow
    element.style.overflow = "hidden";
    element.style.height = "0";
    element.style.paddingTop = "0";
    element.style.paddingBottom = "0";
    element.style.marginTop = "0";
    element.style.marginBottom = "0";
    window.setTimeout(() => {
      element.style.display = "none";
      element.style.removeProperty("height");
      element.style.removeProperty("padding-top");
      element.style.removeProperty("padding-bottom");
      element.style.removeProperty("margin-top");
      element.style.removeProperty("margin-bottom");
      element.style.removeProperty("overflow");
      element.style.removeProperty("transition-duration");
      element.style.removeProperty("transition-property");
      resolve(true);
    }, duration);
  });
}

function slideDown(element, duration = 300) {
  return new Promise((resolve) => {
    element.style.removeProperty("display");
    let display = window.getComputedStyle(element).display;
    if (display === "none") display = "block";
    element.style.display = display;
    let height = element.offsetHeight;
    element.style.overflow = "hidden";
    element.style.height = "0";
    element.style.paddingTop = "0";
    element.style.paddingBottom = "0";
    element.style.marginTop = "0";
    element.style.marginBottom = "0";
    element.offsetHeight; // Force reflow
    element.style.transitionProperty = "height, margin, padding";
    element.style.transitionDuration = duration + "ms";
    element.style.height = height + "px";
    element.style.removeProperty("padding-top");
    element.style.removeProperty("padding-bottom");
    element.style.removeProperty("margin-top");
    element.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      element.style.removeProperty("height");
      element.style.removeProperty("overflow");
      element.style.removeProperty("transition-duration");
      element.style.removeProperty("transition-property");
      resolve(true);
    }, duration);
  });
}

function slideToggle(element, duration = 300) {
  if (window.getComputedStyle(element).display === "none") {
    return slideDown(element, duration);
  } else {
    return slideUp(element, duration);
  }
}
// --- End of slide functions ---

// --- Main Event Listeners Setup ---
document.addEventListener("DOMContentLoaded", () => {
  // --- Initialize Globally Scoped Variables ---
  overlays = document.querySelector(".overlay");
  body = document.querySelector("body");
  menuBtn = document.querySelector(".menu__btn");
  menuItems = document.querySelector(".main__menu");

  // Add .expand-btn class
  const liElems = document.querySelectorAll(".main__menu li");
  liElems.forEach((elem) => {
    const childrenElems = elem.querySelectorAll(".sub__menu");
    if (childrenElems.length > 0) {
      const firstChild = elem.firstElementChild;
      if (firstChild) firstChild.classList.add("expand-btn");
    }
  });

  // --- Attach Event Listeners ---
  if (menuBtn) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggle();
    });
  }

  window.onkeydown = function (event) {
    if (!menuItems) return;
    const key = event.key;
    const active = menuItems.classList.contains("open");
    if (key === "Escape" && active) {
      toggle();
    }
  };

  if (document) {
    document.addEventListener("click", (e) => {
      if (!menuItems || !menuBtn) return;
      let target = e.target,
        its_menu = target === menuItems || menuItems.contains(target),
        its_hamburger = target === menuBtn,
        menu_is_active = menuItems.classList.contains("open");
      if (!its_menu && !its_hamburger && menu_is_active) {
        toggle();
      }
    });
  }

  const expandBtn = document.querySelectorAll(".expand-btn");
  expandBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();

        const parentLi = btn.parentElement;
        if (!parentLi) return;
        const submenu = parentLi.querySelector(".sub__menu");
        if (!submenu) return;

        const parentUl = parentLi.parentElement;
        if (!parentUl) return;

        parentUl.querySelectorAll(":scope > li.open").forEach((siblingLi) => {
          if (siblingLi !== parentLi) {
            const siblingSubmenu = siblingLi.querySelector(".sub__menu");
            if (siblingSubmenu) {
              slideUp(siblingSubmenu);
              siblingLi.classList.remove("open");
              siblingLi.querySelector(".expand-btn")?.classList.remove("open");
            }
          }
        });

        parentLi.classList.toggle("open");
        btn.classList.toggle("open");
        slideToggle(submenu);
      }
    });
  });

  // --- Load and Resize Handlers ---
  handleResizeAndLoad();
  window.addEventListener("resize", handleResizeAndLoad);
});
