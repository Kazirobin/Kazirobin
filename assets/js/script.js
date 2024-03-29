    // JavaScript for the slider functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    function showSlide(index) {
      if (index >= 0 && index < totalSlides) {
        // Hide all containers in the current slide
        slides[currentSlide].querySelectorAll('.container').forEach(container => {
          container.style.display = 'none';
        });
        // Update current slide index
        currentSlide = index;
        // Show all containers in the new current slide
        slides[currentSlide].querySelectorAll('.container').forEach(container => {
          container.style.display = 'block';
        });
      }
    }

    function prevSlide() {
      // Move to the previous slide
      showSlide((currentSlide - 1 + totalSlides) % totalSlides);
    }

    function nextSlide() {
      // Move to the next slide
      showSlide((currentSlide + 1) % totalSlides);
    }

    // Show the initial slide
    showSlide(currentSlide);

    //----Team Section-------------------//----------

    const cardsContainer = document.getElementById('cards-container');
    const tagContainer = document.getElementById('tags-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const resetBtn = document.getElementById('resetBtn');
    const cardsPerPage = 3;
    let currentPage = 1;
    let data = [...originalData];
    let selectedTags = [];
  
    // Function to render cards based on current page and data
    const renderCards = () => {
      cardsContainer.innerHTML = '';
      const startIndex = (currentPage - 1) * cardsPerPage;
      const endIndex = startIndex + cardsPerPage;
      const currentData = data.slice(startIndex, endIndex);
  
      currentData.forEach((cardData) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<img src="${cardData.image}" alt="" class="card_img" />
          <h1 class="card_title">${cardData.title}</h1>
          <p class="card_text">${cardData.text}</p>
          <button class="card_btn">See more</button>
          <div class="social">${getSocialLinks(cardData)}</div>
          <div class="card_tags">${getTags(cardData.tags)}</div>`;
        cardsContainer.appendChild(card);
      });
  
      updatePagination();
    };
  
    // Function to get social links HTML
    const getSocialLinks = (cardData) =>
      Object.entries(cardData.social)
        .map(
          ([key, value]) =>
            `<a href="${value.url}" class="social_link ${key}"><img src="${value.icon}" alt="" class="social_link_icon"></a>`
        )
        .join('');
  
    // Function to get tags HTML
    const getTags = (tags) =>
      `<div class="card_tags">${tags
        .map((tag) => `<h2 class="card_tag">${tag}</h2>`)
        .join('')}</div>`;
  
    // Function to update pagination buttons
    const updatePagination = () => {
      const totalPages = Math.ceil(data.length / cardsPerPage);
      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = currentPage === totalPages;
    };
  
    // Function to go to the previous page
    const prevPage = () => {
      if (currentPage > 1) {
        currentPage--;
        renderCards();
      }
    };
  
    // Function to go to the next page
    const nextPage = () => {
      const totalPages = Math.ceil(data.length / cardsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        renderCards();
      }
    };
  
    // Function to filter cards based on selected tags
    const filterCards = () => {
      data = [...originalData];
      if (selectedTags.length > 0) {
        data = data.filter((cardData) =>
          selectedTags.some((tag) => cardData.tags.includes(tag))
        );
      }
      currentPage = 1;
      renderCards();
    };
  
    // Function to update the tag container with checkboxes
    const updateTagsContainer = () => {
      tagContainer.innerHTML = '';
      const uniqueTags = [...new Set(originalData.flatMap((item) => item.tags))];
  
      uniqueTags.forEach((tag) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = tag;
        checkbox.onchange = () => updateSelectedTags(checkbox);
  
        const label = document.createElement('label');
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(` ${tag}`));
  
        tagContainer.appendChild(label);
      });
  
      // Added reset button
      const resetButton = document.createElement('button');
      resetButton.textContent = 'Reset';
      resetButton.onclick = resetFilters;
      resetButton.id = 'resetBtn';
      tagContainer.appendChild(resetButton);
    };
  
    // Function to update selected tags array and trigger filtering
    const updateSelectedTags = (checkbox) => {
      const tag = checkbox.value;
      const isChecked = checkbox.checked;
  
      if (isChecked) {
        selectedTags.push(tag);
      } else {
        const index = selectedTags.indexOf(tag);
        if (index !== -1) {
          selectedTags.splice(index, 1);
        }
      }
  
      filterCards();
    };
  
    // Function to reset selected tags and trigger filtering
    const resetFilters = () => {
      selectedTags = [];
      filterCards();
    };
  
    // Initial setup
    updateTagsContainer();
    renderCards();