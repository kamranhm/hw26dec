jQuery(document).ready(function($){

     let panels = $('.accordion > dd').hide();
     $('.accordion > dt > a').click(function(){
        
        var item = $(this);
        
        panels.slideUp();
        
        item.parent().next().slideDown();
        
        return false; 
    });

});