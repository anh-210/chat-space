$(function() {
  function addUser(user){
   var html = ` 
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
    </div>`
    $("#user-search-result").append(html);
  }
   function noUser(){
     var html = `
     <div class="chat-group-user clearfix">
       <p class="chat-group-user__name">ユーザーが見つかりません</p>
     </div>`
     $("#user-search-result").append(html);
   }
   function  buildUser(data) {
    var html = `
            <div class='chat-group-user'>
              <input name='group[user_ids][]' type='hidden' value='${data.userId}'> 
              <p class='chat-group-user__name'>${data.userName}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
            </div>
            `
    $(".js-add-user").append(html)
  }
  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0){
          users.forEach(function(user){
            addUser(user);
          })
        }
        else{
          noUser()
        }
      })
      .fail(function() {
        alert("ユーザー検索に失敗しました");
      });
  }); 
    $(document).on("click", ".chat-group-user__btn--add", function(){
      var userData = $(this).data();
      $(this).parent().remove();
      buildUser(userData);
    });
    $(document).on("click", ".chat-group-user__btn--remove", function(){
      $(this).parent().remove();
    });
});