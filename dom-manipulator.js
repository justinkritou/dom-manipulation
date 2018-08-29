var cartQuantity = $('.minicart-quantity')[0].innerHTML; //grab the quantity of items in the cart from the HTML DOM

//ONLY RUN THE REST OF THE SNIPPET IF THERE'S ATLEAST 1 ITEM IN THE CART (overlay should not appear if there's no items in cart)
if (cartQuantity > 0) {
    var orderValue = $('.order-value')[0].innerHTML;
    var itemImages = []; //initialize array to hold item images

    //loop through the item images and add the src's to an array
    for (i = 0; i < cartQuantity; i++) {
        if ($('.mini-cart-image').find('img')[i] !== void 0) { //make sure the index is not void (would occur if quantity > 1 for an item)
            itemImages.push($('.mini-cart-image').find('img')[i].src);
        }
    }


    //USED APPEND METHOD TO ADD ELEMENTS TO THE HTML DOM TO CREATE THE OVERLAY AND THE CONTENT IT CONTAINS
    //*****************************************************************************************************
    //create modal element
    $('body').append('<div id="myModal" class="modal" style="display: none; position: fixed; z-index: 1; padding-top: 200px; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0,0,0); background-color: rgba(0,0,0,0.5);"</div>');
    //create a div which displays the contents of the model (all elements created below)
    $('.modal').append('<div class="modal-content" style = "background-color: #fefefe; margin: auto; padding: 20px; border: 1px solid #888; width: 500px; height: 370px;"</div>');

    //create div which contains <h3> and <p> (as well as those elements themselves) to display a header and quantity of items currently in the cart
    $('.modal-content').append('<div class="modal-cart-header" style ="border-bottom: 1px solid #cbcbcb; overflow: hidden; padding-bottom: 15px;"</div>');
    $('.modal-cart-header').append('<h3 style="font-size:24px; float: left; font-weight: 400; display: block; margin-bottom: 8px;">You have items in your shopping cart</h3>');
    $('.modal-cart-header').append('<p id="modalCartQuantity" style="font-size:14px; clear: both;">' + cartQuantity + ' items</p>');


    //create div (as well as img objects themselves) to display item images
    $('.modal-content').append('<div class="modal-cart-images" style ="padding:20px; overflow: hidden;"</div>');
    for (j = 0; j < itemImages.length; j++) { //loop through the item images and append the corresponding img to the overlay div
        $('.modal-cart-images').append('<img class="modalImagePic" style="padding: 8px; clear:both;" src=' + itemImages[j] + '>');
    }

    //create div which contains a <h3> which displays the subtotal
    $('.modal-content').append('<div class="modal-cart-lower-header" style ="padding-top: 15px; border-top: 1px solid #cbcbcb; overflow: hidden;"</div>');
    $('.modal-cart-lower-header').append('<h3 id="modalOrderValue" style="float: right; clear: both; padding-bottom: 5px;">Subtotal ' + orderValue + '</h3>');

    //create div (as well as the buttons themselves) for the buttons
    $('.modal-content').append('<div class="modal-cart-buttons" style ="padding:10px; overflow: hidden; align-items: center;"</div>');
    $('.modal-cart-buttons').append('<button id= "modalClose-button" class="arrow-left-link continue-shopping" position: relative; float: left;">Continue Shopping</button>');
    $('.modal-cart-buttons').append('<button id= "modalToCart-button" class="checkout-button show-for-large" style="position: relative; float: right;">My Cart</button>');
    //*****************************************************************************************************


    var closeButton = document.getElementById("modalClose-button"); //select 'Close' button element
    var toCartButton = document.getElementById("modalToCart-button"); //select 'toCart' button element
    var modal = document.getElementById('myModal'); //select Modal element 
    var didScroll = false; //initialize boolean variable used to check if user scrolled to bottom 10% of the page 

    //display modal element (and children) when scrolled to the bottom 10% of the screen
    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() > $(document).height() * .9) {
            if (didScroll == false) {
                modal.style.display = "block"; //show modal element
                didScroll = true; //'flag' that scroll function was triggered
            }
        }
    });

    //create function for when the 'Close' button is clicked which hides the modal as well as sets an interval for when the overlay can display
    closeButton.onclick = function() {
        modal.style.display = "none"; //hide modal element
        //sets a timer for the .scroll function above (works with the 'didScroll' variable)
        setInterval(function() {
            if (didScroll) {
                didScroll = false; //reset 'flag'
            }
        }, 30000);
    }

    //create function for when the 'toCart' button is clicked which forwards the user to the cart's url page
    toCartButton.onclick = function() {
        window.location.href = "https://www.marmot.com/cart";
    }
}