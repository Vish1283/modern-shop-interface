let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

// Product Data with Categories
let products = [
    {
        id: 1,
        name: 'Sony WH-1000XM4',
        description: 'Premium Noise Cancelling Wireless Headphones',
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
        price: 349.99,
        category: 'Audio',
        rating: 4.8,
        stock: 15
    },
    {
        id: 2,
        name: 'Apple Watch Series 7',
        description: 'GPS + Cellular, 45mm Midnight Aluminum',
        image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500',
        price: 499.99,
        category: 'Wearables',
        rating: 4.9,
        stock: 10
    },
    {
        id: 3,
        name: 'AirPods Pro',
        description: 'Active Noise Cancelling True Wireless Earbuds',
        image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500',
        price: 249.99,
        category: 'Audio',
        rating: 4.7,
        stock: 20
    },
    {
        id: 4,
        name: 'MacBook Pro 14"',
        description: 'M1 Pro, 16GB RAM, 512GB SSD',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
        price: 1999.99,
        category: 'Computers',
        rating: 4.9,
        stock: 8
    },
    {
        id: 5,
        name: 'Razer DeathAdder V2',
        description: 'Pro Gaming Mouse with Focus+ 20K DPI',
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500',
        price: 129.99,
        category: 'Gaming',
        rating: 4.6,
        stock: 25
    },
    {
        id: 6,
        name: 'Keychron K2',
        description: 'Wireless Mechanical Keyboard with RGB',
        image: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=500',
        price: 179.99,
        category: 'Gaming',
        rating: 4.7,
        stock: 12
    }
];

let listCards = [];

function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <div class="item-image">
                <img src="${value.image}" alt="${value.name}">
                ${value.stock < 10 ? '<span class="low-stock">Low Stock</span>' : ''}
            </div>
            <div class="item-content">
                <div class="category">${value.category}</div>
                <div class="title">${value.name}</div>
                <div class="description">${value.description}</div>
                <div class="item-details">
                    <div class="price">$${value.price.toLocaleString()}</div>
                    <div class="rating">
                        ${getRatingStars(value.rating)}
                        <span class="rating-number">${value.rating}</span>
                    </div>
                </div>
                <button onclick="addToCard(${key})" ${value.stock === 0 ? 'disabled' : ''}>
                    ${value.stock === 0 ? 'Out of Stock' : 'Add To Cart'}
                    <i class="fas fa-shopping-cart"></i>
                </button>
            </div>`;
        list.appendChild(newDiv);
    })
}

function getRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    return stars;
}

initApp();

function addToCard(key){
    if(products[key].stock === 0) return;
    
    if(listCards[key] == null){
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
        products[key].stock--;
    } else if(products[key].stock > 0) {
        listCards[key].quantity++;
        products[key].stock--;
    }
    reloadCard();
    updateProductDisplay();
}

function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    
    listCards.forEach((value, key) => {
        if(value != null){
            let price = value.price * value.quantity;
            totalPrice += price;
            count += value.quantity;

            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div class="cart-item">
                    <img src="${value.image}" alt="${value.name}"/>
                    <div class="cart-item-details">
                        <div class="name">${value.name}</div>
                        <div class="price">$${price.toLocaleString()}</div>
                        <div class="quantity-controls">
                            <button onclick="changeQuantity(${key}, ${value.quantity - 1})">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="count">${value.quantity}</span>
                            <button onclick="changeQuantity(${key}, ${value.quantity + 1})" 
                                    ${products[key].stock === 0 ? 'disabled' : ''}>
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <button class="remove-item" onclick="changeQuantity(${key}, 0)">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = `$${totalPrice.toLocaleString()}`;
    quantity.innerText = count;
}

function updateProductDisplay() {
    const items = document.querySelectorAll('.item');
    products.forEach((product, key) => {
        const item = items[key];
        const button = item.querySelector('button');
        const stockLabel = item.querySelector('.low-stock');
        
        if (product.stock === 0) {
            button.disabled = true;
            button.innerHTML = 'Out of Stock <i class="fas fa-shopping-cart"></i>';
        } else {
            button.disabled = false;
            button.innerHTML = 'Add To Cart <i class="fas fa-shopping-cart"></i>';
        }
        
        if (product.stock < 10) {
            if (!stockLabel) {
                const span = document.createElement('span');
                span.className = 'low-stock';
                span.textContent = 'Low Stock';
                item.querySelector('.item-image').appendChild(span);
            }
        } else if (stockLabel) {
            stockLabel.remove();
        }
    });
}

function changeQuantity(key, quantity){
    if(quantity == 0){
        products[key].stock += listCards[key].quantity;
        delete listCards[key];
    } else if(quantity > listCards[key].quantity) {
        if(products[key].stock > 0) {
            products[key].stock--;
            listCards[key].quantity = quantity;
        }
    } else {
        products[key].stock += (listCards[key].quantity - quantity);
        listCards[key].quantity = quantity;
    }
    reloadCard();
    updateProductDisplay();
}

openShopping.addEventListener('click', () => {
    body.classList.add('active');
})

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
}) 