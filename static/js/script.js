      // JavaScript function to toggle the responsive class for the navigation menu
      function toggleNavbar() {
        var navbar = document.getElementById("myNavbar");
        if (navbar.className === "navbar") {
          navbar.className += " responsive";
        } else {
          navbar.className = "navbar";
        }
      }

      // JavaScript function to toggle the dropdown summary
      /*
      function toggleSummary(headline) {
        headline.classList.toggle("open");
        var dropdownContent =
          headline.getElementsByClassName("dropdown-content")[0];
        dropdownContent.style.display =
          dropdownContent.style.display === "block" ? "none" : "block";
      }
      */
      // JavaScript function to toggle the dropdown summary
      // JavaScript function to toggle the dropdown summary
      // JavaScript function to toggle the dropdown summary
      function toggleSummary(headline) {
        var dropdownContent =
          headline.getElementsByClassName("dropdown-content")[0];
        var isOpen = dropdownContent.style.display === "block";

        // Close all open dropdowns except the clicked one
        var openHeadlines = document.getElementsByClassName("headline open");
        for (var i = 0; i < openHeadlines.length; i++) {
          if (openHeadlines[i] !== headline) {
            var openDropdownContent =
              openHeadlines[i].getElementsByClassName("dropdown-content")[0];
            openDropdownContent.style.display = "none";
            openHeadlines[i].classList.remove("open");
          }
        }

        // Toggle the clicked dropdown
        if (isOpen) {
          dropdownContent.style.display = "none";
          headline.classList.remove("open");
          headline.classList.remove("space");
        } else {
          dropdownContent.style.display = "block";
          headline.classList.add("open");
          headline.classList.add("space");
        }
      }

      function toggleDropdown() {
        var dropdownContent = document.getElementById("dropdownContent");
        var headline = document.getElementById("headline");
        var isOpen = headline.classList.contains("open");

        if (isOpen) {
          dropdownContent.style.display = "none";
          headline.classList.remove("open");
          headline.classList.remove("space");
        } else {
          // Remove "space" class from previously opened headline (if any)
          var prevOpenedHeadline = document.querySelector(".open");
          if (prevOpenedHeadline) {
            prevOpenedHeadline.classList.remove("space");
          }

          dropdownContent.style.display = "block";
          headline.classList.add("open");
          headline.classList.add("space");
        }
      }

      // Prevent closing the dropdown when clicking on a link within it
      document.addEventListener("click", function (event) {
        var dropdownContent = event.target.closest(".dropdown-content");
        if (dropdownContent) {
          event.stopPropagation();
        }
      });
