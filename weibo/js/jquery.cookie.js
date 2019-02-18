;(function ($,window) {
    $.extend({
        addCookie:function (key,value,day,path,domain){
            //document.cookie="";
            var index = window.location.pathname.lastIndexOf("/")
                var currentPath = window.location.pathname.slice(0, index);
                //console.log(currentPath);
                path=path||currentPath
                domain=domain||document.domain;
            var date=new Date();
           date.setDate(date.getDate()+day);
           if(!day){
          document.cookie=key+"="+value+";path="+path+";domain="+domain+";";   
           }
           else{
               var date=new Date();
               date.setDate(date.getDate()+day);
               document.cookie=key+"="+value+";expires="+date.toGMTString()+";path="+path+";domin="+domin+";";   
           }
           
        },
        getCookie:function (key){
            var res=document.cookie.split(";");
            for(var i=0;i<res.length;i++){
                var temp=res[i].split("=");
                if(temp[0].trim()===key){
                    return temp[1];
                }
            }
        },
        delCooklie:function (key,path){
            addCookie(key,getCookie(key),-1,path);
        }
       
    })
})(jQuery,window);