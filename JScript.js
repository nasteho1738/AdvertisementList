const advertisementsData = [ 
    { 
      title: 'Ad 1', 
      description: 'Experience the thrill of adventure with the Mahindra KUV100 NXT, a rugged compact SUV designed for off-road excitement, with advanced features like GPS navigation and a premium black interior.', 
      image: 'images/ad1.jpg', 
      contact: 'contact1@example.com' 
    }, 
    { 
      title: 'Ad 2', 
      description: 'Get ready to step up your shoe game! Searches for Velcro Flats have increased 6 times on Lyst. Shop the trend now at lyst.com!', 
      image: 'images/ad 2.jpg', 
      contact: 'contact2@example.com' 
    }, 
    { 
      title: 'Ad 3', 
      description: 'Introducing Colgate Enamel Health, the toothpaste that strengthens weakened enamel 4x better by replenishing it with vital minerals. Recommended most often by dental professionals, our unique formula provides mineral repair for a healthier, stronger smile. Smile with strength, smile with confidence', 
      image: 'images/ad3.jpeg', 
      contact: 'contact3@example.com' 
    }, 
    { 
      title: 'Ad 4', 
      description: 'Evian, the natural spring water that quenches your thirst for adventure. Sourced from the French Alps, our water is as pure as the mountains and as refreshing as a breath of fresh air. Drink Evian and taste the difference nature makes', 
      image: 'images/ad4.jpg', 
      contact: 'contact4@example.com' 
    }, 
    { 
      title: 'Ad 5', 
      description: 'Lipton Lemon Mint is a refreshing blend of real, garden-fresh mint and succulent lemon pieces. Available in boxes containing 15 tea bags. Refresh yourself with Lipton Lemon Mint.', 
      image: 'images/ad5.jpg', 
      contact: 'contact5@example.com' 
    }, 
    { 
      title: 'Ad 6', 
      description: 'Indulge in the ultimate burger experience with our 100% beef Whopper. Taste the juicy, flavorful goodness of a perfectly crafted burger. What a Whopper!', 
      image: 'images/ad6.jpeg', 
      contact: 'contact6@example.com' 
    } ];

    const advertisementsContainer = document.getElementById('advertisements');
    const filterInput = document.getElementById('filterTitle');
    const sortSelect = document.getElementById('sortSelect');

    function createAdvertisementCard(ad) {
        const card = document.createElement('div');
        card.className = 'card mb-4 col-md-4';
        card.innerHTML = `
        <img class="card-img-top lazy" data-src="${ad.image}" alt="${ad.title}">
    <div class="card-body">
      <h5 class="card-title">${ad.title}</h5>
      <p class="card-text">${ad.description}</p>
      <p class="card-text contact-info" data-contact="${ad.contact}">Contact: ***</p>
    </div>
    <div class="card-footer text-center">
      <button class="btn btn-info btn-block details-btn">Details</button>
    </div>
        `;
        const contactInfo = card.querySelector('.contact-info');
        contactInfo.addEventListener('click', () => toggleContact(contactInfo));
      
        const detailsBtn = card.querySelector('.details-btn');
        detailsBtn.addEventListener('click', () => showDetails(ad));
      
        return card;
    }

    function toggleContact(element) {
        if (element.textContent === 'Contact: ***') {
          element.textContent = `Contact: ${element.dataset.contact}`;
        } else {
          element.textContent = 'Contact: ***';
        }
      }
      
      function showDetails(ad) {
        alert(`Contact Information: ${ad.contact}`);
      }
      
      function renderAdvertisements(ads) {
        advertisementsContainer.innerHTML = '';
        ads.forEach(ad => {
          advertisementsContainer.appendChild(createAdvertisementCard(ad));
        });
        lazyLoadImages();
      }
      
      function filterAdvertisements() {
        const query = filterInput.value.toLowerCase();
        const filteredAds = advertisementsData.filter(ad =>
          ad.title.toLowerCase().includes(query)
        );
        renderAdvertisements(filteredAds);
      }
      
      function sortAdvertisements() {
        const sortBy = sortSelect.value;
        const sortedAds = [...advertisementsData].sort((a, b) =>
          a[sortBy].localeCompare(b[sortBy])
        );
        renderAdvertisements(sortedAds);
      }
      
      function lazyLoadImages() {
        const lazyImages = document.querySelectorAll('img.lazy');
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          });
        });
      
        lazyImages.forEach(img => imageObserver.observe(img));
      }
      
      function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
      }
      
      filterInput.addEventListener('input', debounce(filterAdvertisements, 300));
      sortSelect.addEventListener('change', sortAdvertisements);
      
      // Initial render
      renderAdvertisements(advertisementsData);
