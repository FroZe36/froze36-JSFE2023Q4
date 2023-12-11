//------------------------------------------------------------Menu------------------------------------------------------------
// let jsonData;
// let coffee;
// fetch('../products.json')
//   .then(response => response.json())
//   .then(data => {});
// const coffeeMenu = [
//   {
//     img: '../assets/img/menu-coffee/coffee-1.jpg',
//     name: 'Irish coffee',
//     description:
//       'Fragrant black coffee with Jameson Irish whiskey and whipped milk',
//     price: '7.00',
//   },
//   {
//     img: '../assets/img/menu-coffee/coffee-2.jpg',
//     name: 'Kahlua coffee',
//     description:
//       'Classic coffee with milk and Kahlua liqueur under a cap of frothed milk',
//     price: '7.00',
//   },
//   {
//     img: '../assets/img/menu-coffee/coffee-3.jpg',
//     name: 'Honey raf',
//     description: 'Espresso with frothed milk, cream and aromatic honey',
//     price: '5.50',
//   },
//   {
//     img: '../assets/img/menu-coffee/coffee-4.jpg',
//     name: 'Ice cappuccino',
//     description: 'Cappuccino with soft thick foam in summer version with ice',
//     price: '5.00',
//   },
//   {
//     img: '../assets/img/menu-coffee/coffee-5.jpg',
//     name: 'Espresso',
//     description: 'Classic black coffee',
//     price: '7.00',
//   },
//   {
//     img: '../assets/img/menu-coffee/coffee-6.jpg',
//     name: 'Latte',
//     description:
//       'Espresso coffee with the addition of steamed milk and dense milk foam',
//     price: '5.50',
//   },
//   {
//     img: '../assets/img/menu-coffee/coffee-7.jpg',
//     name: 'Latte macchiato',
//     description: 'Espresso with frothed milk and chocolate',
//     price: '5.50',
//   },
//   {
//     img: '../assets/img/menu-coffee/coffee-8.jpg',
//     name: 'Coffee with cognac',
//     description: 'Fragrant black coffee with cognac and whipped cream',
//     price: '6.50',
//   },
// ];
// const teaMenu = [
//   {
//     img: '../assets/img/menu-tea/tea-1.jpg',
//     name: 'Moroccan',
//     description:
//       'Fragrant black tea with the addition of tangerine, cinnamon, honey, lemon and mint',
//     price: '4.50',
//   },
//   {
//     img: '../assets/img/menu-tea/tea-2.jpg',
//     name: 'Ginger',
//     description: 'Original black tea with fresh ginger, lemon and honey',
//     price: '5.00',
//   },
//   {
//     img: '../assets/img/menu-tea/tea-3.jpg',
//     name: 'Cranberry',
//     description: 'Invigorating black tea with cranberry and honey',
//     price: '5.00',
//   },
//   {
//     img: '../assets/img/menu-tea/tea-4.jpg',
//     name: 'Sea buckthorn',
//     description:
//       'Toning sweet black tea with sea buckthorn, fresh thyme and cinnamon',
//     price: '5.50',
//   },
// ];
// const dessertMenu = [
//   {
//     img: '../assets/img/menu-desserts/dessert-1.jpg',
//     name: 'Marble cheesecake',
//     description:
//       'Philadelphia cheese with lemon zest on a light sponge cake and red currant jam',
//     price: '3.50',
//   },
//   {
//     img: '../assets/img/menu-desserts/dessert-2.jpg',
//     name: 'Red velvet',
//     description: 'Layer cake with cream cheese frosting',
//     price: '4.00',
//   },
//   {
//     img: '../assets/img/menu-desserts/dessert-3.jpg',
//     name: 'Cheesecakes',
//     description:
//       'Soft cottage cheese pancakes with sour cream and fresh berries and sprinkled with powdered sugar',
//     price: '4.50',
//   },
//   {
//     img: '../assets/img/menu-desserts/dessert-4.jpg',
//     name: 'Creme brulee',
//     description:
//       'Delicate creamy dessert in a caramel basket with wild berries',
//     price: '4.00',
//   },
//   {
//     img: '../assets/img/menu-desserts/dessert-5.jpg',
//     name: 'Pancakes',
//     description: 'Tender pancakes with strawberry jam and fresh strawberries',
//     price: '4.50',
//   },
//   {
//     img: '../assets/img/menu-desserts/dessert-6.jpg',
//     name: 'Honey cake',
//     description: 'Classic honey cake with delicate custard',
//     price: '4.50',
//   },
//   {
//     img: '../assets/img/menu-desserts/dessert-7.jpg',
//     name: 'Chocolate cake',
//     description: 'Cake with hot chocolate filling and nuts with dried apricots',
//     price: '5.50',
//   },
//   {
//     img: '../assets/img/menu-desserts/dessert-8.jpg',
//     name: 'Black forest',
//     description:
//       'A combination of thin sponge cake with cherry jam and light chocolate mousse',
//     price: '6.50',
//   },
// ];

// const arrProducts = [coffeeMenu, teaMenu, dessertMenu];

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
      document.querySelectorAll('.menu__card').forEach((item) => item.addEventListener('click', (e) => openModal(e)))
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
const modalImg = document.querySelector('.modal-buy__img')
const modalTitle = document.querySelector('.modal-buy__title');
const modalDescr = document.querySelector('.modal-buy__descr');
const modalSize = document.querySelectorAll('.modal-buy-tab_size');
const modalAdditives = document.querySelectorAll('.modal-buy-tab_additives');
const modalTotalPrice = document.querySelector('.modal-buy__wrapper-total-price');
const modalBtnClose = document.querySelector('.modal-buy__btn-close');
let selectedSize;

modalAdditives.forEach((item, i) => item.addEventListener('click', () => activeBtnAdditives(i)))
function openModal(event) {
  const elem = event.currentTarget
  modalImg.src = elem.firstChild.firstChild.attributes[0].value;
  modalTitle.innerHTML = elem.lastChild.childNodes[0].childNodes[0].innerHTML;
  fetch('../products.json')
    .then(response => response.json())
    .then(data => {
      data.filter(item => {
        if(item.name === modalTitle.innerHTML) {
          modalDescr.innerHTML = item.description
          modalSize[0].children[1].innerHTML = item.sizes.s.size
          modalSize[1].children[1].innerHTML = item.sizes.m.size
          modalSize[2].children[1].innerHTML = item.sizes.l.size
          for(let i = 0; i < modalAdditives.length; i++) {
            modalAdditives[i].children[1].innerHTML = item.additives[i].name
            modalSize[i].addEventListener('click', () => activeBtnSize(i, item.price))
          }
          modalTotalPrice.innerHTML = `$${item.price}`
        }
      })
    });
  document.body.style.overflowY = 'hidden';
  modal.classList.toggle('active')
}
function activeBtnSize(index = 0, price) {
  modalSize.forEach(item => item.classList.remove('active'))
  modalSize[index].classList.add('active')
  let newprice = +price
  if (index === 0) {
    modalTotalPrice.innerHTML = `$${newprice.toFixed(2)}`
  }
  if (index === 1) {
    newprice += 0.50;
    modalTotalPrice.innerHTML = `$${newprice.toFixed(2)}`
  }
  if (index === 2) {
    newprice += 1.00;
    modalTotalPrice.innerHTML = `$${newprice.toFixed(2)}`
  }
;
}
activeBtnSize()
function activeBtnAdditives(index, price) {
  if(!modalAdditives[index].classList.contains('active')) {
    modalAdditives[index].classList.add('active')
  } else {
    modalAdditives[index].classList.remove('active');
  }
  // let arr = Array.from(modalAdditives).filter(item => item.classList.contains('active'))
  // let newprice = +modalTotalPrice.innerHTML.slice(1);
  // newprice += (arr.length * 0.50);
  // modalTotalPrice.innerHTML = `$${newprice.toFixed(2)}`
}

document.addEventListener('click', (e) => {
  if(e.target === modal || e.target === modalBtnClose) {
    modal.classList.remove('active')
    document.body.style.overflowY = 'unset';
  }
})
