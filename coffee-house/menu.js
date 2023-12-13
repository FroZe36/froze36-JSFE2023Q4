//------------------------------------------------------------Menu------------------------------------------------------------

const buttonsCategory = document.querySelectorAll('.menu__button-tab');
const listCards = document.querySelector('.menu__cards');
const btnUpload = document.querySelector('.menu__upload');
buttonsCategory.forEach((item, i) =>
  item.addEventListener('click', () => renderCards(i)),
);
btnUpload.addEventListener('click', loadMore);
let screenWidth = window.innerWidth;

window.addEventListener('resize', () => {
  screenWidth = window.innerWidth;
  displayCard(screenWidth);
});

function renderCards(index = 0) {
  listCards.innerHTML = '';
  fetch('../products.json')
    .then(response => response.json())
    .then(data => {
      data
        .filter((el, i) => {
          if (index === 0) {
            if (el.category === 'coffee') {
              return (
                el,
                (el['img'] = `../assets/img/menu-coffee/coffee-${i + 1}.jpg`)
              );
            }
          }
          if (index === 1) {
            if (el.category === 'tea') {
              return (
                el, (el['img'] = `../assets/img/menu-tea/tea-${i + 1}.jpg`)
              );
            }
          }
          if (index === 2) {
            if (el.category === 'dessert') {
              return (
                el,
                (el['img'] = `../assets/img/menu-desserts/dessert-${i + 1}.jpg`)
              );
            }
          }
        })
        .forEach(item => {
          const menuCard = document.createElement('li');
          menuCard.classList.add('menu__card');
          const wrapperImgCard = document.createElement('div');
          wrapperImgCard.classList.add('menu__card-wrapper');
          const imageCard = document.createElement('img');
          imageCard.src = item.img;
          imageCard.alt = item.name;
          imageCard.classList.add('menu__card-img');
          const containerCard = document.createElement('div');
          containerCard.classList.add('menu__card-container');
          const innerCard = document.createElement('div');
          innerCard.classList.add('menu__card-inner');
          const titleCard = document.createElement('h3');
          titleCard.innerText = item.name;
          titleCard.classList.add('menu__card-title', 'heading-3');
          const descriptionCard = document.createElement('p');
          descriptionCard.innerText = item.description;
          descriptionCard.classList.add('menu__card-description', 'medium');
          const priceCard = document.createElement('span');
          priceCard.innerText = `$${item.price}`;
          priceCard.classList.add('menu__card-price', 'heading-3');
          wrapperImgCard.appendChild(imageCard);
          innerCard.append(titleCard, descriptionCard);
          containerCard.append(innerCard, priceCard);
          menuCard.append(wrapperImgCard, containerCard);
          listCards.append(menuCard);
        });
      document
        .querySelectorAll('.menu__card')
        .forEach(item => item.addEventListener('click', e => openModal(e)));
      activeButton(index);
      displayCard(screenWidth);
    });
}
renderCards();
function activeButton(index = 0) {
  buttonsCategory.forEach(item => item.classList.remove('active'));
  buttonsCategory[index].classList.add('active');
}
activeButton();

function loadMore() {
  document.querySelectorAll('.menu__card').forEach(item => {
    item.classList.remove('hidden');
  });
  btnUpload.style.display = 'none';
}

function displayCard(width) {
  const elems = document.querySelectorAll('.menu__card');
  if (width <= 768 && elems.length > 4) {
    elems.forEach((item, i) => {
      if (i >= 4) {
        item.classList.add('hidden');
      }
    });
    btnUpload.style.display = 'flex';
  } else {
    elems.forEach(item => item.classList.remove('hidden'));
    btnUpload.style.display = 'none';
  }
}

//------------------------------------------------------------Modal------------------------------------------------------------

const modal = document.querySelector('.modal-buy');
const modalImg = document.querySelector('.modal-buy__img');
const modalTitle = document.querySelector('.modal-buy__title');
const modalDescr = document.querySelector('.modal-buy__descr');
const modalSize = document.querySelectorAll('.modal-buy-tab_size');
const modalAdditives = document.querySelectorAll('.modal-buy-tab_additives');
const modalTotalPrice = document.querySelector(
  '.modal-buy__wrapper-total-price',
);
const modalBtnClose = document.querySelector('.modal-buy__btn-close');
let selectedSize;
let productData;

modalAdditives.forEach((item, i) =>
  item.addEventListener('click', () => activeBtnAdditives(i)),
);

document.addEventListener('click', e => {
  if (e.target === modal || e.target === modalBtnClose) {
    modal.classList.remove('active');
    document.body.style.overflowY = 'unset';
  }
});
function openModal(event) {
  const elem = event.currentTarget;
  modalImg.src = elem.firstChild.firstChild.attributes[0].value;
  modalTitle.innerHTML = elem.lastChild.childNodes[0].childNodes[0].innerHTML;
  fetch('../products.json')
    .then(response => response.json())
    .then(data => {
      productData = data.find(item => item.name === modalTitle.innerHTML);
      modalDescr.innerHTML = productData.description;
      modalSize[0].children[1].innerHTML = productData.sizes.s.size;
      modalSize[1].children[1].innerHTML = productData.sizes.m.size;
      modalSize[2].children[1].innerHTML = productData.sizes.l.size;
      modalAdditives.forEach((additive, i) => {
        if (productData.additives[i]) {
          additive.children[1].innerHTML = productData.additives[i].name;
        }
      });
      modalSize.forEach((size, i) => {
        size.addEventListener('click', () => activeBtnSize(i, productData.sizes));
      });
      modalTotalPrice.innerHTML = `$${productData.price}`;
      activeBtnSize(0, productData.sizes);
    });
  document.body.style.overflowY = 'hidden';
  modal.classList.toggle('active');
}

function activeBtnSize(index, sizesData) {
  modalSize.forEach(item => item.classList.remove('active'));
  modalSize[index].classList.add('active');
  let newPrice = +productData.price;
  const selectedSize = Object.values(sizesData)[index];
  if (selectedSize && selectedSize['add-price']) {
    const addPrice = +selectedSize['add-price'];
    newPrice += addPrice;
  }

  const activeAdditives = Array.from(modalAdditives).filter(item => item.classList.contains('active'));
  activeAdditives.forEach(additive => {
    const additiveIndex = Array.from(modalAdditives).indexOf(additive);
    if (productData.additives[additiveIndex]) {
      const additiveData = productData.additives[additiveIndex];
      if (additiveData && additiveData['add-price']) {
        const additivePrice = +additiveData['add-price'];
        newPrice += additivePrice;
      }
    }
  });

  modalTotalPrice.innerHTML = `$${newPrice.toFixed(2)}`;
}

function activeBtnAdditives(index) {
  modalAdditives[index].classList.toggle('active');
  activeBtnSize(Array.from(modalSize).findIndex(size => size.classList.contains('active')), productData.sizes);
}

