if($.browser.mozilla||$.browser.opera){
    document.removeEventListener("DOMContentLoaded",$.ready,false);
    document.addEventListener("DOMContentLoaded",function(){
        $.ready()
        },false)
    }
    $.event.remove(window,"load",$.ready);
$.event.add( window,"load",function(){
    $.ready()
    });
$.extend({
    includeStates:{},
    include:function(url,callback,dependency){
        if(typeof callback!='function'&&!dependency){
            dependency=callback;
            callback=null
            }
            url=url.replace('\n','');
        $.includeStates[url]=false;
        var script=document.createElement('script');
        script.type='text/javascript';
        script.onload=function(){
            $.includeStates[url]=true;
            if(callback)callback.call(script)
                };
                
        script.onreadystatechange=function(){
            if(this.readyState!="complete"&&this.readyState!="loaded")return;
            $.includeStates[url]=true;
            if(callback)callback.call(script)
                };
                
        script.src=url;
        if(dependency){
            if(dependency.constructor!=Array)dependency=[dependency];
            setTimeout(function(){
                var valid=true;
                $.each(dependency,function(k,v){
                    if(!v()){
                        valid=false;
                        return false
                        }
                    });
            if(valid)document.getElementsByTagName('head')[0].appendChild(script);else setTimeout(arguments.callee,10)
                },10)
        }else document.getElementsByTagName('head')[0].appendChild(script);
    return function(){
        return $.includeStates[url]
        }
    },
readyOld:$.ready,
ready:function(){
    if($.isReady) return;
    imReady=true;
    $.each($.includeStates,function(url,state){
        if(!state)return imReady=false
            });
    if(imReady){
        $.readyOld.apply($,arguments)
        }else{
        setTimeout(arguments.callee,10)
        }
    }
});
$.include('js/superfish.js')
$.include('js/tms-0.4.1.js')
$.include('js/uCarousel.js')
$.include('js/jquery.easing.1.3.js')
$.include('js/jquery.ui.totop.js')
$(function(){
    if($('#contact-form').length)$.include('js/forms.js');
});
$(function(){
    $().UItoTop({
        easingType: 'easeOutQuart'
    });
})
$(function(){
    $('.carousel_wrap').uCarousel({
        show:4,
        shift:1, 
        buttonClass:'car_button'
    })
    if (($.browser.msie) && ($.browser.version < '9.0'))
    {
        $('#slider .slider')._TMS({
            show:0,
            pauseOnHover:true,
            prevBu:false,
            nextBu:false,
            playBu:false,
            pagNums:false,
            numStatus:false,
            duration:1000,
            preset:'fade',
            pagination:$('.img-pags').uCarousel({
                show:4,
                shift:0,
                buttonClass:'btn'
            }),
            slideshow:10000,
            banners:'fromTop',// fromLeft, fromRight, fromTop, fromBottom
            waitBannerAnimation:false,
            progressBar:false
        })
    }
    else
    {
        $('#slider .slider')._TMS({
            show:0,
            pauseOnHover:true,
            prevBu:false,
            nextBu:false,
            playBu:false,
            pagNums:false,
            numStatus:false,
            duration:1000,
            preset:'fade',
            pagination:$('.img-pags').uCarousel({
                show:4,
                shift:0,
                buttonClass:'btn'
            }),
            slideshow:10000,
            banners:'fade',// fromLeft, fromRight, fromTop, fromBottom
            waitBannerAnimation:false,
            progressBar:false
        })
    }
})
