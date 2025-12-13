// src/pages/Menu/MenuData.js

// Import all images at the top - NOTE THE EXACT CAPITALIZATION!
import originalImage from '../../assets/images/original.jpg';
import donAlfredoImage from '../../assets/images/Don-alfredo.jpg'; // Capital D
import honeySrirachaImage from '../../assets/images/Honey-sriracha.jpg'; // Capital H
import patisGlazedImage from '../../assets/images/Patis-glazed.jpg'; // Capital P
import garlicParmesanImage from '../../assets/images/Garlic-parmesan.jpg'; // Capital G
import butterBeeImage from '../../assets/images/butter-bee.jpg'; // lowercase b
import lemonPepperImage from '../../assets/images/lemon-pepper.jpg'; // lowercase l
import saltedEggImage from '../../assets/images/salted-egg.jpg'; // lowercase s
import soyGarlicImage from '../../assets/images/soy-garlic.jpg'; // lowercase s
import spicyKoreanImage from '../../assets/images/spicy-korean.jpg'; // lowercase s
import tapsilogImage from '../../assets/images/tapsilog.jpg'; // lowercase t
import shangsilogImage from '../../assets/images/shangsilog.jpg'; // lowercase s
import tocilogImage from '../../assets/images/tocilog.jpg'; // lowercase t
import bangsilogImage from '../../assets/images/bangsilog.jpg'; // lowercase b
import budgetSisigImage from '../../assets/images/budget-sisig.jpg'; // lowercase b
import burgerSteakImage from '../../assets/images/burger-steak.jpg'; // lowercase b
import signatureSisigImage from '../../assets/images/signiture-sisig.jpg'; // lowercase s
import buy1Take1SisigImage from '../../assets/images/2x-sisig.jpg'; // starts with number
import burgerAlacarteImage from '../../assets/images/burger-alacarte.jpg'; // lowercase b
import burgerFriesImage from '../../assets/images/burger-fries.jpg'; // lowercase b
import burgerFriesDrinkImage from '../../assets/images/bur-fri-dri.jpg'; // lowercase b
import db1Image from '../../assets/images/db1.png'; // lowercase d
import dbSoloImage from '../../assets/images/db-solo.png'; // lowercase d
import db2Image from '../../assets/images/db2.png'; // lowercase d
import db3Image from '../../assets/images/db3.png'; // lowercase d
import db4Image from '../../assets/images/db4.png'; // lowercase d
import okinawaImage from '../../assets/images/okinawa.jpg'; // lowercase o
import darkMochaImage from '../../assets/images/dark-mocha.jpg'; // lowercase d
import wintermelonImage from '../../assets/images/wintermelon.jpg'; // lowercase w
import cookiesCreamFrappeImage from '../../assets/images/cookies-creamf.jpg'; // lowercase c
import darkMochaFrappeImage from '../../assets/images/dark-mochaf.png'; // lowercase d
import coffeeVanillaFrappeImage from '../../assets/images/coffee-vanillaf.png'; // lowercase c
import saltedCaramelFrappeImage from '../../assets/images/salted-caramelf.png'; // lowercase s
import bilao1Image from '../../assets/images/Bilao-1.jpg'; // Capital B
import bilao2Image from '../../assets/images/Bilao-2.jpg'; // Capital B
import bilao3Image from '../../assets/images/Bilao-3.jpg'; // Capital B
import pancitBihonImage from '../../assets/images/pancit-bihon.jpg'; // lowercase p
import pancitCantonImage from '../../assets/images/pancit-canton.png'; // lowercase p

export const menuItems = [
  // ========== CHICKEN (10 items) ==========
  {
    id: 1,
    name: "Original Wings",
    category: "chicken",
    description: "Classic chicken wings, tender, juicy, and perfectly seasoned.",
    price: "₱309 (6 pieces)",
    image: originalImage,
    priceValue: 309
  },
  {
    id: 2,
    name: "Don Alfredo Wings",
    category: "chicken",
    description: "Creamy garlic parmesan wings with an Italian twist.",
    price: "₱309 (6 pieces)",
    image: donAlfredoImage,
    priceValue: 309
  },
  {
    id: 3,
    name: "Honey Sriracha Wings",
    category: "chicken",
    description: "Sweet and spicy wings glazed with honey and sriracha.",
    price: "₱309 (6 pieces)",
    image: honeySrirachaImage,
    priceValue: 309
  },
  {
    id: 4,
    name: "Patiz Glazed Wings",
    category: "chicken",
    description: "Savory Filipino-style wings glazed with patis and spices.",
    price: "₱309 (6 pieces)",
    image: patisGlazedImage,
    priceValue: 309
  },
  {
    id: 5,
    name: "Garlic Parmesan",
    category: "chicken",
    description: "Creamy garlic parmesan wings with an Italian twist.",
    price: "₱309 (6 pieces)",
    image: garlicParmesanImage,
    priceValue: 309
  },
  {
    id: 6,
    name: "Butter Bee",
    category: "chicken",
    description: "Tender and juicy chicken wings tossed in a rich, buttery sauce with a hint of sweetness.",
    price: "₱309 (6 pieces)",
    image: butterBeeImage,
    priceValue: 309
  },
  {
    id: 7,
    name: "Lemon Pepper",
    category: "chicken",
    description: "Crispy chicken wings coated in a zesty blend of lemon and cracked black pepper.",
    price: "₱309 (6 pieces)",
    image: lemonPepperImage,
    priceValue: 309
  },
  {
    id: 8,
    name: "Salted Egg",
    category: "chicken",
    description: "Crispy chicken wings tossed in a rich, creamy salted egg sauce.",
    price: "₱309 (6 pieces)",
    image: saltedEggImage,
    priceValue: 309
  },
  {
    id: 9,
    name: "Soy Garlic",
    category: "chicken",
    description: "Crispy chicken wings glazed in a flavorful blend of sweet soy sauce and aromatic garlic.",
    price: "₱309 (6 pieces)",
    image: soyGarlicImage,
    priceValue: 309
  },
  {
    id: 10,
    name: "Spicy Korean",
    category: "chicken",
    description: "Crispy chicken wings glazed in a flavorful blend of sweet soy sauce and aromatic garlic.",
    price: "₱309 (6 pieces)",
    image: spicyKoreanImage,
    priceValue: 309
  },

  // ========== SILOG (4 items) ==========
  {
    id: 11,
    name: "Tapsilog",
    category: "silog",
    description: "Classic Filipino breakfast meal made of beef tapa, garlic fried rice, and a fried egg.",
    price: "₱149",
    image: tapsilogImage,
    priceValue: 149
  },
  {
    id: 12,
    name: "Shangsilog",
    category: "silog",
    description: "A silog meal featuring crispy Shanghai rolls paired with garlic fried rice and a fried egg.",
    price: "₱149",
    image: shangsilogImage,
    priceValue: 149
  },
  {
    id: 13,
    name: "Tocilog",
    category: "silog",
    description: "A sweet and savory Filipino favorite with tocino, garlic fried rice, and a fried egg.",
    price: "₱149",
    image: tocilogImage,
    priceValue: 149
  },
  {
    id: 14,
    name: "Bangsilog",
    category: "silog",
    description: "A traditional combo of fried bangus (milkfish), garlic fried rice, and a fried egg.",
    price: "₱149",
    image: bangsilogImage,
    priceValue: 149
  },

  // ========== SIZZLING (4 items) ==========
  {
    id: 15,
    name: "Budget Sisig",
    category: "sizzling",
    description: "A flavorful mix of chopped pork, onions, and spices, served hot on a sizzling plate.",
    price: "₱179",
    image: budgetSisigImage,
    priceValue: 179
  },
  {
    id: 16,
    name: "Burger Steak",
    category: "sizzling",
    description: "Two juicy beef patties topped with savory gravy, served with rice as a satisfying meal.",
    price: "₱199",
    image: burgerSteakImage,
    priceValue: 199
  },
  {
    id: 17,
    name: "Signature Sizzling Sisig",
    category: "sizzling",
    description: "A flavorful pork sisig with mayonnaise and egg, served for a richer and more satisfying taste.",
    price: "₱209",
    image: signatureSisigImage,
    priceValue: 209
  },
  {
    id: 18,
    name: "Buy 1, Take 1 Sisig",
    category: "sizzling",
    description: "A tasty sisig deal where you get two sizzling servings of flavorful pork in one order.",
    price: "₱399",
    image: buy1Take1SisigImage,
    priceValue: 399
  },

  // ========== BURGER & FRIES (3 items) ==========
  {
    id: 19,
    name: "Burger Ala Carte",
    category: "burger",
    description: "Juicy beef patty with cheese, lettuce, and our special sauce.",
    price: "₱99",
    image: burgerAlacarteImage,
    priceValue: 99
  },
  {
    id: 20,
    name: "Burger Fries",
    category: "burger",
    description: "A classic combo of a juicy burger served with crispy golden fries.",
    price: "₱149",
    image: burgerFriesImage,
    priceValue: 149
  },
  {
    id: 21,
    name: "Burger, Fries & Drink",
    category: "burger",
    description: "A satisfying meal featuring a delicious burger, golden fries, and a refreshing drink.",
    price: "₱199",
    image: burgerFriesDrinkImage,
    priceValue: 199
  },

  // ========== COMBO MEALS (5 items) ==========
  {
    id: 22,
    name: "DB1",
    category: "combo-meals",
    description: "2 pieces of Dibby's Wings and 1 Rice.",
    price: "₱149",
    image: db1Image,
    priceValue: 149
  },
  {
    id: 23,
    name: "DB Solo",
    category: "combo-meals",
    description: "2 pieces Wings, 1 Rice, Fries, Ice Tea.",
    price: "₱199",
    image: dbSoloImage,
    priceValue: 199
  },
  {
    id: 24,
    name: "DB2",
    category: "combo-meals",
    description: "2 pieces Wings, 1 Rice, Pancit Canton.",
    price: "₱209",
    image: db2Image,
    priceValue: 209
  },
  {
    id: 25,
    name: "DB3",
    category: "combo-meals",
    description: "3 pieces Wings, 2 Rice, Pancit Canton.",
    price: "₱379",
    image: db3Image,
    priceValue: 379
  },
  {
    id: 26,
    name: "DB4",
    category: "combo-meals",
    description: "1 Special Sisig, 4 Shanghai Rolls, 2 Rice, Pancit Canton.",
    price: "₱599",
    image: db4Image,
    priceValue: 599
  },

  // ========== DRINKS & FRAPPES (7 items) ==========
  {
    id: 27,
    name: "Okinawa Milktea",
    category: "drinks",
    description: "A smooth and velvety milk tea with the deep, sweet flavor of caramelized brown sugar.",
    price: "Small - ₱49 | Medium - ₱59 | Large - ₱69",
    image: okinawaImage,
    priceValue: 59
  },
  {
    id: 28,
    name: "Dark Choco Milktea",
    category: "drinks",
    description: "A bold and indulgent blend of deep chocolate flavor and smooth milk tea.",
    price: "Small - ₱49 | Medium - ₱59 | Large - ₱69",
    image: darkMochaImage,
    priceValue: 59
  },
  {
    id: 29,
    name: "Wintermelon",
    category: "drinks",
    description: "A light, refreshing milk tea with a sweet and mellow wintermelon taste.",
    price: "Small - ₱49 | Medium - ₱59 | Large - ₱69",
    image: wintermelonImage,
    priceValue: 59
  },
  {
    id: 30,
    name: "Cookies & Cream Frappe",
    category: "drinks",
    description: "Buy 1 Take 1. A smooth, dessert-like frappe loaded with crushed cookies and creamy goodness.",
    price: "Medium - ₱175 | Large - ₱215",
    image: cookiesCreamFrappeImage,
    priceValue: 175
  },
  {
    id: 31,
    name: "Dark Mocha Frappe",
    category: "drinks",
    description: "Buy 1 Take 1. A bold mix of rich chocolate and strong coffee for a deep, satisfying flavor.",
    price: "Medium - ₱175 | Large - ₱215",
    image: darkMochaFrappeImage,
    priceValue: 175
  },
  {
    id: 32,
    name: "Coffee Vanilla Frappe",
    category: "drinks",
    description: "Buy 1 Take 1. A light and refreshing blend of classic coffee and smooth vanilla.",
    price: "Medium - ₱175 | Large - ₱215",
    image: coffeeVanillaFrappeImage,
    priceValue: 175
  },
  {
    id: 33,
    name: "Salted Caramel Frappe",
    category: "drinks",
    description: "Buy 1 Take 1. A sweet and buttery treat with a hint of salt, perfect for a rich flavor.",
    price: "Medium - ₱175 | Large - ₱215",
    image: saltedCaramelFrappeImage,
    priceValue: 175
  },

  // ========== BILAO WINGS (3 items) ==========
  {
    id: 34,
    name: "Bilao 1",
    category: "bilao",
    description: "Enjoy 24 pieces, any 2 flavors, plus a free Garlic Ranch dip for each flavor.",
    price: "₱649",
    image: bilao1Image,
    priceValue: 649
  },
  {
    id: 35,
    name: "Bilao 2",
    category: "bilao",
    description: "Enjoy 36 pieces, any 3 flavors, plus a free Garlic Ranch dip for each flavor.",
    price: "₱949",
    image: bilao2Image,
    priceValue: 949
  },
  {
    id: 36,
    name: "Bilao 3",
    category: "bilao",
    description: "Enjoy 48 pieces, any 4 flavors, plus a free Garlic Ranch dip for each flavor.",
    price: "₱1,149",
    image: bilao3Image,
    priceValue: 1149
  },

  // ========== SPECIAL PANCIT (2 items) ==========
  {
    id: 37,
    name: "Special Pancit Bihon",
    category: "special-pancit",
    description: "A flavorful stir-fried rice noodle dish loaded with vegetables, tender meat, and savory sauce.",
    price: "Small - ₱99 | Big - ₱239",
    image: pancitBihonImage,
    priceValue: 99
  },
  {
    id: 38,
    name: "Special Pancit Canton",
    category: "special-pancit",
    description: "A hearty stir-fried egg noodle dish with vegetables, savory meats, and rich sauce.",
    price: "Small - ₱109 | Big - ₱249",
    image: pancitCantonImage,
    priceValue: 109
  }
];

export const categories = [
  { id: 'all', name: 'All' },
  { id: 'chicken', name: 'Chicken' },
  { id: 'silog', name: 'Silog' },
  { id: 'sizzling', name: 'Sizzling' },
  { id: 'burger', name: 'Burger & Fries' },
  { id: 'combo-meals', name: 'Combo Meals' },
  { id: 'drinks', name: 'Drinks & Frappes' },
  { id: 'bilao', name: 'Special Bilao Wings' },
  { id: 'special-pancit', name: 'Special Pancit' }
];