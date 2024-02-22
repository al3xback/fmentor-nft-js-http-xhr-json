import { sendHttpRequest } from './util.js';

const URL =
	'https://gist.githubusercontent.com/al3xback/8c547ab35159471bece9dceab5c3c1c6/raw/861f3656a11d16839aa27b3ac0825ace073f4e1d/nft-data.json';

const cardWrapperEl = document.querySelector('.card-wrapper');
const cardTemplate = document.getElementById('card-template');
const cardImageTemplate = document.getElementById('card-image-template');
const cardContentTemplate = document.getElementById('card-content-template');
const loadingEl = document.querySelector('.loading');

const removeLoading = () => {
	loadingEl.parentElement.removeChild(loadingEl);
};

const handleError = (msg) => {
	removeLoading();

	const errorEl = document.createElement('p');
	errorEl.className = 'error';
	errorEl.textContent = msg;

	cardWrapperEl.appendChild(errorEl);
};

const renderCardContent = (data) => {
	const { title, description, image, status, author } = JSON.parse(data);

	const cardTemplateNode = document.importNode(cardTemplate.content, true);
	const cardEl = cardTemplateNode.querySelector('.card');

	/* [card image] */
	const cardImageTemplateNode = document.importNode(
		cardImageTemplate.content,
		true
	);
	const cardImageEl = cardImageTemplateNode.querySelector('.card__image img');
	cardImageEl.src = './images/' + image;
	cardImageEl.alt = image.substring(0, image.indexOf('.'));

	/* [card content] */
	const cardContentTemplateNode = document.importNode(
		cardContentTemplate.content,
		true
	);
	const cardContentEl =
		cardContentTemplateNode.querySelector('.card__content');

	const cardTitleEl = cardContentEl.querySelector('.card__title a');
	cardTitleEl.textContent = title;

	const cardDescEl = cardContentEl.querySelector('.card__desc');
	cardDescEl.textContent = description;

	const cardStatusItemEls = cardContentEl.querySelectorAll(
		'.card__stats-list-item'
	);
	const cardEthereumAmountEl = cardStatusItemEls[0];
	cardEthereumAmountEl.querySelector('span').textContent =
		status.ethereumAmount;
	const cardRemainingTimeEl = cardStatusItemEls[1];
	cardRemainingTimeEl.querySelector('span').textContent =
		status.remainingTime;

	const cardAuthorImageEl = cardContentEl.querySelector('.card__author-img');
	cardAuthorImageEl.src = './images/' + author.image;
	cardAuthorImageEl.alt = author.name;

	const cardAuthorNameEl = cardContentEl.querySelector(
		'.card__author-desc a'
	);
	cardAuthorNameEl.textContent = author.name;

	/* [init] */
	removeLoading();
	cardEl.appendChild(cardImageTemplateNode);
	cardEl.appendChild(cardContentTemplateNode);
	cardWrapperEl.appendChild(cardTemplateNode);
};

sendHttpRequest('GET', URL, renderCardContent, handleError);
