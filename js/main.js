Vue.component('product',{
	template:`
	  <div class="product">
					<div class="product-image">
						<img v-bind:src="image"/>
					</div>
					<div class="product-info">
						<h1>{{ title }}</h1>
						<p v-if="inStock">In Stock</p>
      					<p v-else>Out of Stock</p>

						<ul>
							<li v-for="detail in details">{{ detail }}</li>
						</ul>
						<div v-for="(variant, index) in variants" :key="variants.variantId" 
							 class="color-box" :style="{backgroundColor: variant.variantColor}" 
							 @mouseover="updateProduct(index)">
						</div>
						<button @click="addToCart" 
								:disabled="!inStock"
								:class="{ disabledButton: !inStock }">Add to Cart</button>
					<div class="cart">
						<p>Cart({{cart}})</p>
					</div>
					</div>
					
			</div>
	`,
	data() {
    return {
        product: 'Socks',
        brand: 'Vue Mastery',
        selectedVariant: 0,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
          {
            variantId: 2234,
            variantColor: 'green',
            variantImage:  'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
            variantQuantity: 10     
          },
          {
            variantId: 2235,
            variantColor: 'blue',
            variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
            variantQuantity: 0     
          }
        ],
        cart: 0
    }
  },
    methods: {
      addToCart: function() {
          this.cart += 1
      },
      updateProduct: function(index) {  
          this.selectedVariant = index
      }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product  
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
          if (this.premium) {
            return "Free"
          }
            return 2.99
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
      premium: true
    }
})