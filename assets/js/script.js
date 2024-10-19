$(function () {
  console.log("ready");
  var myMarquee = $("#services-marquee").marquee({
    loop: true,
    gap: 50,
  });
  myMarquee.marquee("pause");

  $("#accordion-collapse item").on("click", function (e) {
    $(this).toggleClass("expanded");
  });

  const navLinks = $("ul.page-navigation a"); // Target the anchor tags within your navigation

  // Function to handle adding/removing active class based on scroll position
  function handleScroll() {
    const scrollPos = $(document).scrollTop();

    // Loop through each section
    navLinks.each(function () {
      const currLink = $(this);
      const targetSection = $(currLink.attr("href")); // Get the section by href attribute

      // Ensure the target section exists
      if (targetSection.length) {
        // If the section is within the viewport
        if (
          targetSection.position().top <= scrollPos + 100 &&
          targetSection.position().top + targetSection.height() >
            scrollPos + 100
        ) {
          navLinks.removeClass("active"); // Remove 'active' from all links
          currLink.addClass("active"); // Add 'active' to the current link
        } else {
          currLink.removeClass("active"); // Remove 'active' if the section is out of view
        }
      }
    });
  }

  // Trigger the scroll event on page load and when the user scrolls
  // $(document).on('scroll', handleScroll);
});

/*function Marquee(selector, speed) {
  const parentSelector = document.querySelector(selector);
  const items = parentSelector.querySelectorAll('.flex > div'); // Select all marquee items
  const clone = parentSelector.innerHTML;
  const firstElement = parentSelector.children[0];
  let i = 0;
  
  parentSelector.insertAdjacentHTML('beforeend', clone);
  parentSelector.insertAdjacentHTML('beforeend', clone);

  setInterval(function () {
    firstElement.style.marginLeft = `-${i}px`;
    if (i > firstElement.clientWidth) {
      i = 0;
    }
    i = i + speed;

    // Check if each item is centered
    items.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      const parentRect = parentSelector.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;
      const parentCenter = parentRect.left + parentRect.width / 2;

      // Add class when the item's center is close to the parent's center
      if (Math.abs(itemCenter - parentCenter) < itemRect.width / 2) {
        item.classList.add('centered');
      } else {
        item.classList.remove('centered');
      }
    });
  }, 16); // Use 16ms interval for a smooth animation (approx. 60 FPS)
}*/
const headingElement = document.querySelector(".active-title");
const descriptionElement = document.querySelector(".active-description");
const linkElement = document.querySelector(".services_link");
const serviceImageSelector = document.querySelector(".center-service-img");

function Marquee(selector, speed) {
  const parentSelector = document.querySelector(selector);
  let items = parentSelector.querySelectorAll(".flex > div"); // Initial selection of items
  const clone = parentSelector.innerHTML;
  const firstElement = parentSelector.children[0];
  let i = 0;
  let paused = false; // Flag to track if the animation is paused
  // Clone the marquee content for the infinite scroll effect
  parentSelector.insertAdjacentHTML("beforeend", clone);
  parentSelector.insertAdjacentHTML("beforeend", clone);

  // Re-select items after cloning (to include the clones in the tracking)
  items = parentSelector.querySelectorAll(".flex > div");

  const parentContainer = document.querySelector(
    "#servicesSection .content-area"
  );
  const leftBtn = document.querySelector(".service-left-btn");
  const rightBtn = document.querySelector(".service-right-btn");

  parentContainer.addEventListener("mouseenter", function () {
    paused = true;
  });

  parentContainer.addEventListener("mouseleave", function () {
    paused = false;
  });

  leftBtn.addEventListener("click", function () {
    clearInterval(refreshIntervalId); // Stop auto-slide

    let currentCenteredItem = document.querySelector(".flex > div.centered"); // Find the currently centered item

    let currentIndex = Array.from(items).indexOf(currentCenteredItem); // Find the index of the centered item

    // Remove the centered class from the current item
    if (currentCenteredItem) {
      currentCenteredItem.classList.remove("centered");
    }

    // Move to the next item
    let nextIndex = (currentIndex + 1) % items.length; // Loop back to 0 if it goes beyond the last item
    let nextItem = items[nextIndex];

    let centerContentArea = document.querySelector(
      "#servicesSection .content-area"
    );
    // console.log(centerContentArea.offsetWidth);

    // // Calculate the total margin to slide by the width of one item
    // const itemWidth = nextItem.offsetWidth;
    // let newMarginLeft = `-${(nextItem.offsetLeft / 2) - (itemWidth ) - 36}px`;
    // firstElement.style.marginLeft = newMarginLeft;

    let centerContentWidth = centerContentArea.offsetWidth;
    let itemWidth = nextItem.offsetWidth;

    // Calculate the center position of both elements
    let centerContentCenter = centerContentWidth / 2;
    let nextItemCenter = itemWidth / 2 + 36;
    let currentOffsetLeft =
      nextItem.offsetLeft - centerContentArea.offsetLeft;

    // Calculate the margin-left to move nextItem to the center of centerContentArea
    let newMarginLeft =
      centerContentCenter - nextItem.offsetLeft - nextItemCenter;

    let marginLeft = firstElement.style.marginLeft;
    let marginLeftNumber = parseFloat(marginLeft);

    firstElement.style.marginLeft = `${marginLeftNumber + newMarginLeft}px`;

    // Update the content for the next centered item
    let title = nextItem.getAttribute("data-title");
    let description = nextItem.getAttribute("data-description");
    let serviceLink = nextItem.getAttribute("data-link");
    let serviceImage = nextItem.getAttribute("data-image-path");

    headingElement.textContent = title;
    descriptionElement.textContent = description;
    linkElement.setAttribute("href", serviceLink);
    serviceImageSelector.setAttribute("src", serviceImage);

    // Add the centered class to the new item
    nextItem.classList.add("centered");
  });

  rightBtn.addEventListener("click", function () {
    clearInterval(refreshIntervalId); // Stop auto-slide

    let currentCenteredItem = document.querySelector(".flex > div.centered"); // Find the currently centered item
    let currentIndex = Array.from(items).indexOf(currentCenteredItem); // Find the index of the centered item
    // Remove the centered class from the current item
    if (currentCenteredItem) {
      currentCenteredItem.classList.remove("centered");
    }
    // Move to the next item
    let prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1; // Loop back to 0 if it goes beyond the last item
    let prevItem = items[prevIndex];

    
    let centerContentArea = document.querySelector(
      "#servicesSection .content-area"
    );

    let centerContentWidth = centerContentArea.offsetWidth;
    let prevItemWidth = prevItem.offsetWidth;

    
    // Calculate the center position of both elements
    let centerContentCenter = centerContentWidth / 2;
    let prevItemCenter = prevItemWidth / 2 + 36;
    let currentOffsetRight =
    prevItem.offsetRight - centerContentArea.offsetRight;

    // Calculate the margin-left to move nextItem to the center of centerContentArea
    let newMarginRight =
      centerContentCenter - prevItem.offsetLeft - prevItemCenter;


    let marginLeft = firstElement.style.marginLeft;
    let marginLeftNumber = parseFloat(marginLeft);

    firstElement.style.marginLeft = `${marginLeftNumber + newMarginRight}px`;

    // Update the content for the next centered item
    let title = prevItem.getAttribute("data-title");
    let description = prevItem.getAttribute("data-description");
    let serviceLink = prevItem.getAttribute("data-link");
    let serviceImage = prevItem.getAttribute("data-image-path");

    headingElement.textContent = title;
    descriptionElement.textContent = description;
    linkElement.setAttribute("href", serviceLink);
    serviceImageSelector.setAttribute("src", serviceImage);

    // Add the centered class to the new item
    prevItem.classList.add("centered");
  });

  let refreshIntervalId = setInterval(function () {
    if (!paused) {
      firstElement.style.marginLeft = `-${i}px`;
      if (i > firstElement.clientWidth) {
        i = 0;
      }
      i += speed;

      // Check if each item is centered
      items.forEach((item) => {
        let itemRect = item.getBoundingClientRect();
        let parentRect = parentSelector.getBoundingClientRect();
        let itemCenter = itemRect.left + itemRect.width / 2;
        let parentCenter = parentRect.left + parentRect.width / 2;
        // console.log(Math.abs(itemCenter - parentCenter) < itemRect.width / 2);

        // Add class when the item's center is close to the parent's center
        // if (Math.abs(itemCenter - parentCenter) < itemRect.width / 2) {
        //   item.classList.add('centered');

        //   // console.log("center element")
        // } else {
        //   item.classList.remove('centered');
        //   // console.log("center element hide");
        // }

        if (Math.abs(itemCenter - parentCenter) < itemRect.width / 2) {
          // Only update if the centered item has changed
          // if (currentCenteredItem !== item) {
          // Set the new centered item
          currentCenteredItem = item;

          // Get the data-title and data-description attributes
          let title = item.getAttribute("data-title");
          let description = item.getAttribute("data-description");
          let serviceLink = item.getAttribute("data-link");
          let serviceImage = item.getAttribute("data-image-path");

          // Update the h2 element's text content
          headingElement.textContent = `${title}`;
          descriptionElement.textContent = `${description}`;
          linkElement.setAttribute("href", serviceLink);
          serviceImageSelector.setAttribute("src", serviceImage);

          // Add the centered class
          item.classList.add("centered");
          // }
        } else {
          // Remove the centered class when the item is not centered
          item.classList.remove("centered");
        }
      });
    }
  }, 16); // Smooth 60 FPS animation
}

// Call the Marquee function after window load
window.addEventListener("load", function () {
  Marquee(".service-marquee", 0.7);
});

// let swiperCustomer = new Swiper('.swiper-customer', {
//   spaceBetween: 10,
//   centeredSlides: true,
//   speed: 6000,
//   autoplay: false,
//   loop: false,
//   slidesPerView: 5,
//   allowTouchMove: false,
//   disableOnInteraction: true,
//   breakpoints: {
//     320: {
//       slidesPerView: 5,
//     },
//     1024: {
//       slidesPerView: 5,
//     }
//   }
// });

const testimonial = new Swiper(".testiminial-slider", {
  spaceBetween: 20,
  centeredSlides: false,
  // speed: 6000,
  // autoplay: {
  //   delay: 1,
  // },
  loop: true,
  slidesPerView: 3,
  allowTouchMove: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 2.5,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});
