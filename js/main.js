Vue.component('product',{
	props: {
		premium: {
			type: Boolean,
			required: true
		}
	},
	template:`
	  <div class="product">
					<div class="product-image">
						<img v-bind:src="image"/>
					</div>
					<div class="product-info">
						<h1>{{ title }}</h1>
						<p v-if="inStock">In Stock</p>
      					<p v-else>Out of Stock</p>
						<p>Shipping: {{ shipping }} </p>
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
					</div>
					<product-review></product-review>
					
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
        ]
    }
  },
    methods: {
      addToCart: function() {
          this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
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
Vue.component('product-review', {
	template: `
	<input v-model="name">
	`,
	data() {
		return {
			name: null
		}
	}
})

var app = new Vue({
    el: '#app',
    data: {
      premium: false,
      cart: []
    },
    methods: {
    	updateCart(id){
    		this.cart.push(id)
    	}
    }
})