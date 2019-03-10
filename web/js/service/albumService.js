/**
 * Created by Benson on 2016/12/21.
 */
app.factory('albumFactory',function($timeout){
    return {
        Reddit:{
            busy:true,
            start:false,//是否开始了
            imageLists:[],
            imageList:[],
            nextPage:function () {
                if (this.busy) return;
                this.busy = true;
                console.log('加载中...');
                $timeout(function () {
                    for( var i = 0,len = this.imageList.length; i < 4&&(len+i)<this.imageLists.length ; i ++ ){
                        this.imageList.push(this.imageLists[len + i]);
                        if( this.imageList.length >= this.imageLists.length ) break;
                    }
                    if( this.imageList.length < this.imageLists.length || this.start == false ) this.busy = false;
                }.bind(this),1000);
            }
        }
    };
});