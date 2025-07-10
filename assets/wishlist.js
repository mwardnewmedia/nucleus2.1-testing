let LOCAL_STORAGE_WISHLIST_KEY = 'shopify-wishlist';
let LOCAL_STORAGE_DELIMITER = ',';
let BUTTON_ACTIVE_CLASS = 'active';
let GRID_LOADED_CLASS = 'loaded';

let selectors = {
  button: '[button-wishlist]',
  grid: '[grid-wishlist]',
  productCard: '.product-card',
};

document.addEventListener('DOMContentLoaded', () => {
  initButtons();
  initGrid();
});

document.addEventListener('shopify-wishlist:updated', (event) => {
  console.log('[Shopify Wishlist] Wishlist Updated ✅', event.detail.wishlist);
  initGrid();
});

document.addEventListener('shopify-wishlist:init-product-grid', (event) => {
  console.log('[Shopify Wishlist] Wishlist Product List Loaded ✅', event.detail.wishlist);
});

document.addEventListener('shopify-wishlist:init-buttons', (event) => {
  console.log('[Shopify Wishlist] Wishlist Buttons Loaded ✅', event.detail.wishlist);
});

let fetchProductCardHTML = (handle) => {
  let productTileTemplateUrl = `/products/${handle}?view=card`;
  return fetch(productTileTemplateUrl)
  .then((res) => res.text())
  .then((res) => {
    let text = res;
    let parser = new DOMParser();
    let htmlDocument = parser.parseFromString(text, 'text/html');
    let productCard = htmlDocument.documentElement.querySelector('.wishlist-product-card');
    return productCard.outerHTML;
  })
  .catch((err) => console.error(`[Shopify Wishlist] Failed to load content for handle: ${handle}`, err));
};

let setupGrid = async (grid) => {
  let wishlist = getWishlist();
  let requests = wishlist.map(fetchProductCardHTML);
  let responses = await Promise.all(requests);
  let wishlistProductCards = responses.join('');
  grid.innerHTML = wishlistProductCards;
  grid.classList.add(GRID_LOADED_CLASS);
  initButtons();

  let event = new CustomEvent('shopify-wishlist:init-product-grid', {
    detail: { wishlist: wishlist }
  });
  document.dispatchEvent(event);
};

let setupButtons = (buttons) => {
  buttons.forEach((button) => {
    let productHandle = button.dataset.productHandle || false;
    if (!productHandle) return console.error('[Shopify Wishlist] Missing `data-product-handle` attribute. Failed to update the wishlist.');
    if (wishlistContains(productHandle)) button.classList.add(BUTTON_ACTIVE_CLASS);
    button.addEventListener('click', () => {
      updateWishlist(productHandle);
      button.classList.toggle(BUTTON_ACTIVE_CLASS);
    });
  });
};

let initGrid = () => {
  let grid = document.querySelector(selectors.grid) || false;
  if (grid) setupGrid(grid);
};

let initButtons = () => {
  let buttons = document.querySelectorAll(selectors.button) || [];
  if (buttons.length) setupButtons(buttons);
  else return;
  let event = new CustomEvent('shopify-wishlist:init-buttons', {
    detail: { wishlist: getWishlist() }
  });
  document.dispatchEvent(event);
};

let getWishlist = () => {
  let wishlist = localStorage.getItem(LOCAL_STORAGE_WISHLIST_KEY) || false;
  if (wishlist) return wishlist.split(LOCAL_STORAGE_DELIMITER);
  return [];
};

let setWishlist = (array) => {
  let wishlist = array.join(LOCAL_STORAGE_DELIMITER);
  if (array.length) localStorage.setItem(LOCAL_STORAGE_WISHLIST_KEY, wishlist);
  else localStorage.removeItem(LOCAL_STORAGE_WISHLIST_KEY);

  let event = new CustomEvent('shopify-wishlist:updated', {
    detail: { wishlist: array }
  });
  document.dispatchEvent(event);

  return wishlist;
};

let updateWishlist = (handle) => {
  let wishlist = getWishlist();
  let indexInWishlist = wishlist.indexOf(handle);
  if (indexInWishlist === -1) wishlist.push(handle);
  else wishlist.splice(indexInWishlist, 1);
  return setWishlist(wishlist);
};

let wishlistContains = (handle) => {
  let wishlist = getWishlist();
  return wishlist.includes(handle);
};

let resetWishlist = () => {
  return setWishlist([]);
};