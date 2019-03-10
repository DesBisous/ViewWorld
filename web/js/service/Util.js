/**
 * Created by Benson on 2016/9/23.
 */
app.factory('Util',function(){
    return{
        checkPhone:function (phone) {
            var isMobile=/^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/; //手机号码验证规则
            var isPhone=/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;   //座机验证规则
            if( isMobile.test(phone) || isPhone.test(phone) ){
                return true;
            }else{
                return false;
            }
        },
        //根据年和月获取天数
        getDaysByYearAndMonth:function (year, month) {
            month = parseInt(month, 10);
            var d= new Date(year, month, 0);
            return d.getDate();
        },
        //获取当前年
        getNowYear:function(){
            var tYear = new Date().getFullYear();
            return tYear;
        },
        getNowDate:function () {
            var date = new Date();
            var mon = date.getMonth() + 1;
            var day = date.getDate();
            return date.getFullYear() + "-" + (mon<10?"0"+mon:mon) + "-" +(day<10?"0"+day:day);
        },
        //格式化YYYY-MM-DD HH:mm:ss
        getNowFormatDate:function (date) {
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
        }
    }
});
