$(function(){
	// 切换
	let checkoutreg = $('.blog-user-checkoutreg'),
		checkoutlogin = $('.blog-user-checkoutlogin'),
		regBox = $('.blog-user-res-box'),
		loginBox = $('.blog-user-login-box');

	checkoutreg.on('click', function(){
		loginBox.hide();
		regBox.show();
	})

	checkoutlogin.on('click', function(){
		loginBox.show();
		regBox.hide();
	})

	// AJAX
	//login
	let	loginBtn = $('.login-btn');

	loginBtn.on('click',function(){
		let loginUsername = $('.login-username').val(),
			loginPassword = $('.login-password').val();

		$.ajax({
			url:'/api/user/login',
			type:'POST',
			data:{
				username: loginUsername,
				password: loginPassword
			},
			dataType:'json',
			success: function(res){
				console.log(res)
			}
		})
	});

	//reg
	let	regBtn = $('.reg-btn');

	regBtn.on('click',function(){
		let loginUsername = $('.reg-name').val(),
			loginPassword = $('.reg-password').val(),
			reloginPassword = $('.reg-repassword').val();

		$.ajax({
			url:'/api/user/register',
			type:'POST',
			data:{
				username: loginUsername,
				password: loginPassword,
				repassword: reloginPassword
			},
			dataType:'json',
			success: function(res){
				console.log(res)
			}
		})
	})
})