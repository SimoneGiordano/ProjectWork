// accordion footer
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}
// close scount
function myDelete() {
    var x = document.getElementById("close");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

// add to wish list

const buttonAddToWishList = document.querySelectorAll(".add-to-list");
const buttonRemoveToWishList  = document.querySelectorAll(".remove-to-list");
const wishlist = [];

buttonAddToWishList.forEach(bottone => {
	bottone.addEventListener("click", addToWishList);
})

buttonRemoveToWishList.forEach(bottone => {
	bottone.addEventListener("click", removeToWhishList);
})


function addToWishList(event) {

	const productId = event.target.dataset.id;
	wishlist.push(productId);

	localStorage.setItem("wishlist", JSON.stringify(wishlist));
	updateWishlist(); 
}

function removeToWhishList(event) {
	const productId = event.target.dataset.id;
	const indiceElementoDaRimuovere = wishlist.findIndex(product => product === productId);
	wishlist.splice(indiceElementoDaRimuovere, 1);
	localStorage.setItem("wishlist", JSON.stringify(wishlist));
	updateWishlist();
}

function updateWishlist() {
	buttonRemoveToWishList.forEach((bottone) => {
		if (wishlist.includes(bottone.dataset.id)) {
			bottone.removeAttribute("hidden");
			bottone.previousElementSibling.setAttribute("hidden", "hidden");
		} else {
			bottone.setAttribute("hidden", "hidden");
			bottone.previousElementSibling.removeAttribute("hidden");
		}
	})
}

function inizializzaWishlist() {
	const wishListLocalStorage = JSON.parse(localStorage.getItem("wishlist"));
	if (wishListLocalStorage) {
		wishlist.push(...wishListLocalStorage);
	}
	updateWishlist();
}

inizializzaWishlist();



// carousel product page

const slider = document.querySelector('.gallery');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', e => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', _ => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', _ => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const SCROLL_SPEED = 3;
  const walk = (x - startX) * SCROLL_SPEED;
  slider.scrollLeft = scrollLeft - walk;
});

