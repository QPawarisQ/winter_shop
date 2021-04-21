<template>
	<div>
		<section id="header">
			<div class="container" style="margin-top: 6rem">
				<div class="row">
					<div class="col-lg-3"></div><div class="col-lg-4"></div>
					<div class="col-lg-5 text-left" style="padding-top: 10rem">
						<h1 class="title">{{ title }}</h1>
						<h2 class="subtitle">{{ subtitle }}</h2>
						<h4 class="desc">{{ desc }}</h4>
						<br>
						<div class="row">
							<div class="col-lg-8">
								<a href="#shop" class="btn btn-dark btn-block" style="border-radius: 0px;">
									{{ shop_button }}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				title: "75% off",
				subtitle: "If you like it wear it",
				desc: "Lorem ipsum dolor sit amet, consectetur adipiscing ,elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.",
				shop_button: "SHOP NOW"
			}
		}
	};
</script>
<style scoped>
	.title{
		color: #A91126;
		font-size: 8rem;
	}
	.subtitle{
		color: #000;
		font-size: 4rem;
	}
	.desc{
		font-size: 1.3rem;
	}
	#header{
		margin-top: -6rem;
		min-height: 100vh;
		background-image: url(../assets/bgpic.png); 
		background-repeat: no-repeat;
		background-size: 50% auto;
	}
	@media only screen and (max-width: 600px) {
		#header{
			min-height: 100vh;
			background: url(../assets/bgpic_mobile.png) no-repeat center center fixed; 
			-webkit-background-size: cover;
			-moz-background-size: cover;
			-o-background-size: cover;
			background-size: cover;
		}
		.title{
			color: #ff002a;
			font-size: 8rem;
			text-align: center
		}
		.subtitle{
			color: #fff;
			font-size: 3rem;
			text-align: center
		}
		.desc{
			color: #eee;
			font-size: 1rem;
			text-align: center
		}
	}
</style>