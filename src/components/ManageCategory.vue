<template>
	<div style="margin-top: 6rem;">
		<b-modal ref="my-modal" hide-footer centered :title="'Edit '+current.cat_name+' Caterogy'">
	      <div class="d-block">
	      	<form @submit.prevent="onManage" enctype="multipart/form-data">
			  <div class="form-group">
			    <label for="cat_name">Category Name :</label>
			    <input type="text" class="form-control" placeholder="Enter category name..." id="cat_name" v-model="current.cat_name" required="">
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
							<b>Add Category</b>
						</div>
						<div class="card-body">
							<form @submit.prevent="onSubmit" enctype="multipart/form-data">
							  <div class="form-group">
							    <label for="cat_name">Category Name :</label>
							    <input type="text" class="form-control" placeholder="Enter category name..." id="cat_name" v-model="cat_name" required="">
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
							<b>Manage Category</b>
						</div>
						<div class="card-body">
							<table class="table">
								<thead>
									<th>id</th>
									<th>category name</th>
									<th>options</th>
								</thead>
								<tbody>
									<tr v-for="(cat, index) in all_cats">
										<td>{{ index+1 }}</td>
										<td>{{ cat.cat_name }}</td>
										<td>
											<a href="javascript:void(0)" @click="editCat(cat.cat_id)">Edit</a> |
											<a href="javascript:void(0)" @click="deleteCat(cat.cat_id)">Delete</a>
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
				cat_name: "",
				all_cats: [],
		        dismissSecs: 2,
		        dismissCountDown: 0,
		        showDismissibleAlert: false,
				alert: {
					text: ""
				},
				current: {
					cat_id: "",
					cat_name: "",
					cat_picture: ""
				},
				file:"",
				message:""
			}
		},
		methods: {
			sendForm(){
				axios.post('https://winterserver.herokuapp.com/api/cat/add',{
	                cat_name: this.cat_name
	            }).then((response)=>{
	                if(response.data == "ERROR|DUPLICATED"){
	                    this.alert.text = "The Category is duplicated"
	                	this.showAlert()
	                }else{
	                    this.cat_name = ""
	                	this.addtoast()
	                	this.getInfo()
	                }
	            })
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
		    async onSubmit(){
		      const formData = new FormData();
		      formData.append('file',this.file);
		      formData.append('cat_name',this.cat_name);
		      try{
		        await axios.post('https://winterserver.herokuapp.com/upload_cat',formData);
                this.alert.text = "Success"
                this.cat_name = ""
            	this.showAlert()
            	this.getInfo()
		      }
		      catch(err){
		        console.log(err);
                this.alert.text = "Error, Contact Admin"
            	this.showAlert()
		      }
		    },
		    async onManage(){
		      const formData = new FormData();
		      formData.append('cat_id', this.current.cat_id)
		      formData.append('file',this.file);
		      formData.append('cat_name',this.current.cat_name);
		      try{
		        await axios.post('https://winterserver.herokuapp.com/manage_cat',formData);
		        this.hideModal()
                this.managetoast()
            	this.getInfo()
		      }
		      catch(err){
		        console.log(err);
                this.alert.text = "Error, Contact Admin"
            	this.showAlert()
		      }
		    },
			getInfo(){
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
			getCatInfo(cat_id){
				axios.post('https://winterserver.herokuapp.com/api/cat/id',{
					cat_id: cat_id
				})
				.then((response)=>{
					if(response.data != "ERROR|EMPTY"){
						this.current.cat_id = cat_id
						this.current.cat_name = response.data[0].cat_name
						this.current.cat_picture = response.data[0].cat_picture
					}
				})
			},
			editCat(cat_id){
				this.getCatInfo(cat_id)
				this.showModal()
			},
			deleteCat(cat_id){
				axios.post('https://winterserver.herokuapp.com/api/cat/delete',{
	                cat_id: cat_id
	            }).then((response)=>{
	                if(response.data == "ERROR|NOTFOUND"){
	                    this.alert.text = "Error, Not Found this category"
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
			addtoast(toaster, append = true) {
				this.$bvToast.toast(`Category Added`, {
				  title: `Success`,
				  toaster: "b-toaster-bottom-right",
				  solid: true,
				  appendToast: append,
				  variant: "success"
				})
			},
			toast(toaster, append = true) {
				this.$bvToast.toast(`Category removed`, {
				  title: `Success`,
				  toaster: "b-toaster-bottom-right",
				  solid: true,
				  appendToast: append,
				  variant: "success"
				})
			},
			managetoast(toaster, append = true) {
				this.$bvToast.toast(`Category Updated`, {
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
		}
	};
</script>