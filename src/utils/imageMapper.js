// frontend/src/utils/imageMapper.js

// Import all your images
import originalImage from '../assets/images/original.jpg';
import donAlfredoImage from '../assets/images/Don-alfredo.jpg';
import honeySrirachaImage from '../assets/images/Honey-sriracha.jpg';
import patisGlazedImage from '../assets/images/Patis-glazed.jpg';
import garlicParmesanImage from '../assets/images/Garlic-parmesan.jpg';
import butterBeeImage from '../assets/images/butter-bee.jpg';
import lemonPepperImage from '../assets/images/lemon-pepper.jpg';
import saltedEggImage from '../assets/images/salted-egg.jpg';
import soyGarlicImage from '../assets/images/soy-garlic.jpg';
import spicyKoreanImage from '../assets/images/spicy-korean.jpg';
import tapsilogImage from '../assets/images/tapsilog.jpg';
import shangsilogImage from '../assets/images/shangsilog.jpg';
import tocilogImage from '../assets/images/tocilog.jpg';
import bangsilogImage from '../assets/images/bangsilog.jpg';
import budgetSisigImage from '../assets/images/budget-sisig.jpg';
import burgerSteakImage from '../assets/images/burger-steak.jpg';
import signatureSisigImage from '../assets/images/signiture-sisig.jpg';
import buy1Take1SisigImage from '../assets/images/2x-sisig.jpg';
import burgerAlacarteImage from '../assets/images/burger-alacarte.jpg';
import burgerFriesImage from '../assets/images/burger-fries.jpg';
import burgerFriesDrinkImage from '../assets/images/bur-fri-dri.jpg';
import db1Image from '../assets/images/db1.png';
import dbSoloImage from '../assets/images/db-solo.png';
import db2Image from '../assets/images/db2.png';
import db3Image from '../assets/images/db3.png';
import db4Image from '../assets/images/db4.png';
import okinawaImage from '../assets/images/okinawa.jpg';
import darkMochaImage from '../assets/images/dark-mocha.jpg';
import wintermelonImage from '../assets/images/wintermelon.jpg';
import cookiesCreamFrappeImage from '../assets/images/cookies-creamf.jpg';
import darkMochaFrappeImage from '../assets/images/dark-mochaf.png';
import coffeeVanillaFrappeImage from '../assets/images/coffee-vanillaf.png';
import saltedCaramelFrappeImage from '../assets/images/salted-caramelf.png';
import bilao1Image from '../assets/images/Bilao-1.jpg';
import bilao2Image from '../assets/images/Bilao-2.jpg';
import bilao3Image from '../assets/images/Bilao-3.jpg';
import pancitBihonImage from '../assets/images/pancit-bihon.jpg';
import pancitCantonImage from '../assets/images/pancit-canton.png';

// Map item names to images
export const imageMap = {
  // Chicken
  'Original Wings': originalImage,
  'Don Alfredo Wings': donAlfredoImage,
  'Honey Sriracha Wings': honeySrirachaImage,
  'Patiz Glazed Wings': patisGlazedImage,
  'Garlic Parmesan': garlicParmesanImage,
  'Butter Bee': butterBeeImage,
  'Lemon Pepper': lemonPepperImage,
  'Salted Egg': saltedEggImage,
  'Soy Garlic': soyGarlicImage,
  'Spicy Korean': spicyKoreanImage,
  
  // Silog
  'Tapsilog': tapsilogImage,
  'Shangsilog': shangsilogImage,
  'Tocilog': tocilogImage,
  'Bangsilog': bangsilogImage,
  
  // Sizzling
  'Budget Sisig': budgetSisigImage,
  'Burger Steak': burgerSteakImage,
  'Signature Sizzling Sisig': signatureSisigImage,
  'Buy 1, Take 1 Sisig': buy1Take1SisigImage,
  
  // Burger & Fries
  'Burger Ala Carte': burgerAlacarteImage,
  'Burger Fries': burgerFriesImage,
  'Burger, Fries & Drink': burgerFriesDrinkImage,
  
  // Combo Meals
  'DB1': db1Image,
  'DB Solo': dbSoloImage,
  'DB2': db2Image,
  'DB3': db3Image,
  'DB4': db4Image,
  
  // Drinks & Frappes
  'Okinawa Milktea': okinawaImage,
  'Dark Choco Milktea': darkMochaImage,
  'Wintermelon': wintermelonImage,
  'Cookies & Cream Frappe': cookiesCreamFrappeImage,
  'Dark Mocha Frappe': darkMochaFrappeImage,
  'Coffee Vanilla Frappe': coffeeVanillaFrappeImage,
  'Salted Caramel Frappe': saltedCaramelFrappeImage,
  
  // Bilao Wings
  'Bilao 1': bilao1Image,
  'Bilao 2': bilao2Image,
  'Bilao 3': bilao3Image,
  
  // Special Pancit
  'Special Pancit Bihon': pancitBihonImage,
  'Special Pancit Canton': pancitCantonImage
};

// Helper function to get image by name
export const getImageByName = (name) => {
  return imageMap[name] || '';
};