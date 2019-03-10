/**
 * Created by Benson on 2016/10/8.
 */
app.filter('parseIntFilter',function () {
    return function (value) {
        return parseInt(value) == 99 ? 100:parseInt(value);
    }
});
app.filter('starUploadFilter',function () {
    return function (value) {
        var text;
        if( value == true ){
            text = '开始上传...';
        }else if( value == false ){
            text = '准备上传...';
        }else{
            text = '已取消上传...';
        }
        return text;
    }
});