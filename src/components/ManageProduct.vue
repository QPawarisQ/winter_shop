<template>
	<div style="margin-top: 6rem;">
		<b-modal ref="my-modal" centered hide-footer :title="'Edit '+current.product_name">
	      <div class="d-block">
			<form @submit.prevent="onManage" enctype="multipart/form-data">
				<div class="form-group">
			    <label for="product_name">Product Name :</label>
			    <input type="text" class="form-control" placeholder="Enter product name..." id="product_name" v-model="current.product_name"  required="">
			  </div>
			  <div class="form-group">
			    <label for="product_detail">Product Detail :</label>
			    <textarea type="text" class="form-control" placeholder="Enter product detail..." id="product_detail" v-model="current.product_detail"  required=""></textarea>
			  </div>
			  <div class="form-group">
			    <label for="product_price">Product Price :</label>
			    <input type="number" class="form-control" placeholder="Enter product price..." id="product_price" v-model="current.product_price"  required="">
			  </div>
		      <div class="fields">
		        <label>Upload File</label><br/>
		        <input 
		          type="file"
		          ref="file"
		          @change="onSelect"
		          required=""
		        />
		      </div>
		      <br>
		      <div class="fields">
		        <button type="submit" class="btn btn-dark">Submit</button>
		      </div>
		   </form>
	      </div>
	    </b-modal>
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<b-alert
				      :show="dismissCountDown"
				      dismissible
				      variant="warning"
				      @dismissed="dismissCountDown=0"
				      @dismiss-count-down="countDownChanged"
				    >
				      <p class="text-left">{{ alert.text }} , Gone in {{ dismissCountDown }} seconds...</p>
				      <b-progress
				        variant="warning"
				        :max="dismissSecs"
				        :value="dismissCountDown"
				        height="4px"
				      ></b-progress>
				    </b-alert>
					<div class="card">
						<div class="card-header">
							<b>Add Product</b>
						</div>
						<div class="card-body">
							<form @submit.prevent="onSubmit" enctype="multipart/form-data">
								<div class="form-group">
							    <label for="product_name">Product Name :</label>
							    <input type="text" class="form-control" placeholder="Enter product name..." id="product_name" v-model="product_name"  required="">
							  </div>
							  <div class="form-group">
							    <label for="product_detail">Product Detail :</label>
							    <textarea type="text" class="form-control" placeholder="Enter product detail..." id="product_detail" v-model="product_detail"  required=""></textarea>
							  </div>
							  <div class="form-group">
							    <label for="product_price">Product Price :</label>
							    <input type="number" class="form-control" placeholder="Enter product price..." id="product_price" v-model="product_price"  required="">
							  </div>
							  <div class="form-group">
							    <label for="product_category">Product Category :</label>
							    <select class="form-control" id="product_category" v-model="category_id">
							      <option v-for="(cat, index) in all_cats" :value="cat.cat_id"  required="">
							      	{{ cat.cat_name }}
							      </option>
							    </select>
							  </div>
						      <div class="fields">
						        <label>Upload File</label><br/>
						        <input 
						          type="file"
						          ref="file"
						          @change="onSelect"
						          required=""
						        />
						      </div>
						      <br>
						      <div class="fields">
						        <button type="submit" class="btn btn-dark">Submit</button>
						      </div>
						   </form>
						</div>
					</div>
				</div>
			</div>
			<br>
			<div class="row">
				<div class="col-lg-12">
					<div class="card">
						<div class="card-header">
							<b>Manage Product</b>
						</div>
						<div class="card-body">
							<table class="table">
								<thead>
									<th>id</th>
									<th>product name</th>
									<th>product price</th>
									<th>options</th>
								</thead>
								<tbody>
									<tr v-for="(product, index) in all_products">
										<td>{{ index+1 }}</td>
										<td>{{ product.product_name }}</td>
										<td>{{ product.product_price }}</td>
										<td>
											<a href="javascript:void(0)" @click="editProduct(product.product_id)">Edit</a> |
											<a href="javascript:void(0)" @click="deleteProduct(product.product_id)">Delete</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	export default{
		data(){
			return{
				current: {
					product_name: "",
					product_detail: "",
					product_price: "",
					category_id: "",
				},
				product_name: "",
				product_detail: "",
				product_price: "",
				category_id: "",
				all_products: [],
				all_cats: [],
		        dismissSecs: 2,
		        dismissCountDown: 0,
		        showDismissibleAlert: false,
				alert: {
					text: ""
				},
				file:"",
				message:""
			}
		},
		methods: {
			sendForm(){
				axios.post('https://winterserver.herokuapp.com/api/product/add',{
	                product_name: this.product_name,
	                product_detail: this.product_detail,
	                product_price: this.product_price,
	                category_id: this.category_id
	            }).then((response)=>{
	                if(response.data == "ERROR|DUPLICATED"){
	                    this.alert.text = "The Product is duplicated"
	                	this.showAlert()
	                }else{
	                    this.alert.text = "Success"
	                    this.product_name = ""
	                    this.product_detail = ""
	                    this.product_price = ""
	                	this.showAlert()
	                	this.getInfo()
	                }
	            })
			},
			getProductInfo(product_id){
				axios.post('https://winterserver.herokuapp.com/api/product/id',{
					product_id: product_id
				})
				.then((response)=>{
					if(response.data != "ERROR|EMPTY"){
						this.current.product_id = product_id
						this.current.product_name = response.data[0].product_name
						this.current.product_detail = response.data[0].product_detail
						this.current.product_price = response.data[0].product_price
						this.current.product_picture = response.data[0].product_picture
					}
				})
			},
			getInfo(){
				this.all_products.length = 0
				axios.get('https://winterserver.herokuapp.com/api/product/all')
				.then((response)=>{
					if(response.data != "ERROR|EMPTY"){
						for (var i = 0; i < response.data.length; i++) {
							this.all_products.push({
								product_id: response.data[i].product_id,
								product_name: response.data[i].product_name,
								product_detail: response.data[i].product_detail,
								product_price: response.data[i].product_price,
								category_id: response.data[i].category_id,
							})
						}
					}
				})
			},
			getCatInfo(){
				this.all_cats.length = 0
				axios.get('https://winterserver.herokuapp.com/api/cat/all')
				.then((response)=>{
					if(response.data != "ERROR|EMPTY"){
						for (var i = 0; i < response.data.length; i++) {
							this.all_cats.push({
								cat_id: response.data[i].cat_id,
								cat_name: response.data[i].cat_name
							})
						}
					}
				})
			},
			deleteProduct(product_id){
				axios.post('https://winterserver.herokuapp.com/api/product/delete',{
	                product_id: product_id
	            }).then((response)=>{
	                if(response.data == "ERROR|NOTFOUND"){
	                    this.alert.text = "Error, Not Found this product"
	                	this.showAlert()
	                }else{
	                	this.toast()
	                	this.getInfo()
	                }
	            })
			},
			countDownChanged(dismissCountDown) {
				this.dismissCountDown = dismissCountDown
			},
			showAlert() {
				this.dismissCountDown = this.dismissSecs
			},
			onSelect(){
		      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
		      const file = this.$refs.file.files[0];
		      this.file = file;
		      if(!allowedTypes.includes(file.type)){
		        this.message = "Filetype is wrong!!"
		      }
		      if(file.size>500000){
		        this.message = 'Too large, max size allowed is 500kb'
		      }
		    },
			editProduct(product_id){
				this.getProductInfo(product_id)
				this.showModal()
			},
		    async onSubmit(){
		      const formData = new FormData();
		      formData.append('file',this.file);
		      formData.append('product_name',this.product_name);
		      formData.append('product_detail',this.product_detail);
		      formData.append('product_price',this.product_price);
		      formData.append('category_id',this.category_id);
		      try{
		        await axios.post('https://winterserver.herokuapp.com/upload',formData);
                this.product_name = ""
                this.product_detail = ""
                this.product_price = ""
            	this.add_toast()
            	this.getInfo()
		      }
		      catch(err){
		        console.log(err);
                this.alert.text = "The Product is duplicated"
            	this.showAlert()
		      }
		    },
		    async onManage(){
		      const formData = new FormData();
		      formData.append('file',this.file);
		      formData.append('product_id',this.current.product_id);
		      formData.append('product_name',this.current.product_name);
		      formData.append('product_detail',this.current.product_detail);
		      formData.append('product_price',this.current.product_price);
		      try{
		        await axios.post('https://winterserver.herokuapp.com/manage',formData);
            	this.manageToast()
            	this.getInfo()
		      }
		      catch(err){
		        console.log(err);
                this.alert.text = "The Product is duplicated"
            	this.showAlert()
		      }
		    },
			manageToast(toaster, append = true) {
				this.$bvToast.toast(`Product Updated`, {
				  title: `Success`,
				  toaster: "b-toaster-bottom-right",
				  solid: true,
				  appendToast: append,
				  variant: "success"
				})
			},
			add_toast(toaster, append = true) {
				this.$bvToast.toast(`Product Added`, {
				  title: `Success`,
				  toaster: "b-toaster-bottom-right",
				  solid: true,
				  appendToast: append,
				  variant: "success"
				})
			},
			toast(toaster, append = true) {
				this.$bvToast.toast(`Product removed`, {
				  title: `Success`,
				  toaster: "b-toaster-bottom-right",
				  solid: true,
				  appendToast: append,
				  variant: "success"
				})
			},
			showModal() {
				this.$refs['my-modal'].show()
			},
			hideModal() {
				this.$refs['my-modal'].hide()
			},
		},
		mounted(){
			this.getInfo()
			this.getCatInfo()
		}
	};
</script>