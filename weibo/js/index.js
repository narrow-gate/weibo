$(function(){
    $("body").delegate('.comment','propertychange input',function(){
     if($(this).val().length>0){
        $('.send').prop("disabled",false)
     }
     else{
        $('.send').prop("disabled",true)
     }; 
    })
  //  var number=$getCookie("pageNumber")||1;
  var number=window.location.hash.substring(1)||1;
    getMsgPage()
    function getMsgPage(){
       $(".page").html(""),
       $.ajax({
          type:"get",
          url:"weibo.php",
          data:"act=get&get_page_count",
          success:function(msg){
         //console.log(msg); 根据json对象创建页码，决定遍历多少次
         var obj=eval("("+msg+")");
         for(var i=0;i<obj.count;i++){
            var $a=$(`<a href="javascript:;">`+(i+1)+`</a>`)
            if(i===number-1){
               $a.addClass("cur");
            }
            $(".page").append($a)
         }
          },
          error:function(xhr){
             alert(xhr.status);
          }
       })
    }
 var number=$getCookie("pageNumber")||1;
 getMsgList(number);
//获取一页数据
function  getMsgList(number){
   $(".messageList").html("");
   $.ajax({
      type:"get",
      url:"weibo.php",
      data:"act=get&page="+number,
      success:function(msg){
       var obj=eval("("+msg+")");
      $.each(obj,function(key,value){
         var $weibo=createEle(value);
         $weibo.get(0).obj=value;
         $(".messageList").append($weibo);
      })
      },
      error:function(xhr){
         alert(xhr.status);
      }
   })
}

    //监听发布按钮的点击
    $('.send').click(function(){
         var $text=$(".comment").val();
         $.ajax({
            type:"get",
            url:"weibo.php",
            data:'act=add&content='+$text,
            success:function(msg){
              // console.log(msg);
              var obj=eval("("+msg+")");//eval可以转化非标准的json字符串，但是要在前面加上（）才可以
              obj.content=$test;
         var $weibo=createEle(obj);
         $weibo.get(0).obj=obj;
         $(".messageList").prepend($weibo);//在 获取元素的开头插入内容：
         //清空输入框的内容
         $(".comment").val("")
         //重新获取下一页
         getMsgPage();
         //删除最前面一条微博
         if($(".info").length>6){
             $(".info:last-child").remove();
         }
            },
         error:function(xhr){
            alert(xhr.status);
         }
            
         })
    })
      //监听顶点击 weibo.php?act=acc&id=12
    $('body').delegate('.infoTop','click',function(id){
       //打印this，看是哪个东西，然后找自己需要的东西
       $(this).text(parseInt($(this).text())+1);//parseInt解析字符串
       var obj=$(this).parents(".info").get(0).obj;
       $.ajax({
          type:"get",
          url:"weibo.php",
          data:"act=acc&id="+obj.id,
          success:function(){
             console.log(msg);
             
          },
          error:function(xhr){
             alert(xhr.status);
          }
       })
    })
    //监听踩点击 	
    $('body').delegate('.infoDown','click',function(){
        $(this).text(parseInt($(this).text())+1);
         var obj=$(this).parents(".info").get(0).obj;
        $.ajax({
           type:"get",
           url:"weibo.php",
           data:"act=ref&id="+obj.id,
           success:function(){
              console.log(msg);
              
           },
           error:function(xhr){
              alert(xhr.status);
           }
        })
     })
     //删除
     $('body').delegate('.infoDel','click',function(){
        $(this).parents('.info').remove();
        var obj=$(this).parents(".info").get(0).obj;
        $.ajax({
           type:"get",
           url:"weibo.php",
           data:"act=del&id="+obj.id,
           success:function(){
              console.log(msg);
           },
           error:function(xhr){
              alert(xhr.status);
           }
        });
        getMsgList($('.cur').html);
     })
//监听页码点击
$('body').delegate('.page>a','click',function(){
   $(this).addClass("cur");
   $(this).siblings().removeClass("cur")
   getMsgList($(this).html())//相当于innerHTML
   //保存当前点击的页码
 //  $.addCookie("pageNumber",$(this).html())
 window.location.hash=$(this).html();
})

    function createEle(obj){
        var $weibo=$(`  <div class="info">
        <p class="infoText">`+obj.content+ `</p>
            <p class="infoOperation">
               <span class="infoTime">`+formartDate(obj.time)+`</span>
               <span class="infoHandle">
                   <a href="javascript:;" class="infoTop">`+obj.acc+`</a>
                   <a href="javascript:;" class="infoDown">`+obj.ref+`</a>
                   <a href="javascript:;" class="infoDel">删除</a>
               </span>
            </p>
    </div>`)
   return $weibo }
   //生成时间方法
function formartDate(time){
var date=new Date(time*1000);
var arr=[date.getFullYear()+'-',
date.getMonth()+1+'-',
date.getDate() + " ",
date.getHours() + ":",
date.getMinutes() + ":",
date.getSeconds()];
return arr.join('')
}
    })
