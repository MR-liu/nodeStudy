$(function(){
	// 切换
	let checkoutreg = $('.blog-user-checkoutreg'),
		checkoutlogin = $('.blog-user-checkoutlogin'),
		userInfoBox = $('.blog-user-infos'),
		regBox = $('.blog-user-res-box'),
		loginBox = $('.blog-user-login-box'),
		tips = $('.tips');

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
				if (res && res.code===0) {
					window.location.reload()
				}else{
					tips.show().html(res.message)
				}
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
				if (res && res.code===0) {
					window.location.reload()
				}else{
					tips.show().html(res.message)
				}
			}
		})
	})

	//loginout
	let loginoutBtn = $('.login-out');

	loginoutBtn.on('click', function(){
		console.log(11)
		$.ajax({
			url:'/api/user/loginout',
			type:'POST',
			data:{
			},
			dataType:'json',
			success: function(res){
				if (res&&res.code == 0) {
					window.location.reload();
				} else {
					console.log(res);
				}
			}
		})
	})

	/*
	* 提交评论
	*
	* */
	let messageBtn = $('#messageBtn'),
		bid = $('#messageContent').attr('bid'),
		msgCon = $('.commentsBox'),
		username = $('.blog-user-infos-name').text(),
		valBox = $('#messageContent');


    messageBtn.on('click', function () {
        let contentText = valBox.val();
		$.ajax({
			url:'/api/content/blog',
			type:'POST',
			data:{
                contentID:bid,
                content:contentText
			},
            dataType:'json',
            success: function(res){
				// console.log(1)
                if (res&&res.code == 0){
                    msgCon.append("<div class='comment'><div class='commentsName'>"+ username +"</div><div class='commentSay'>" + contentText + "</div></div>")
                    valBox.val('');
                } else{
                	console.log(res)
				}
            }

		})
    })

	//test================================================
	let	testbtn = $('.testbtn');

	testbtn.on('click',function(){
		let loginUsername = 1,
			loginPassword = 2,
			reloginPassword = 3;
		$.ajax({
			url:'/test',
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