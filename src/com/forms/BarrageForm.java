package com.forms;

/**
 * Created by Benson on 2017/3/31.
 */
public class BarrageForm {
    private String barrageXmlName;//弹幕XML文件名字
    private String barrage_font_size_str;//默认字体为小字体[0,1]
    private String barrage_position_str;//默认弹幕样式为顶端弹幕1，其余底端弹幕2，滚动弹幕0
    private String barrage_color_str;//默认弹幕颜色为#ffffff
    private String barrage_text_str;//弹幕内容
    private String barrage_time_str;//弹幕时间
    private String barrage_date_str;//弹幕发送本地时间

    public String getBarrageXmlName() {
        return barrageXmlName;
    }

    public void setBarrageXmlName(String barrageXmlName) {
        this.barrageXmlName = barrageXmlName;
    }

    public String getBarrage_font_size_str() {
        return barrage_font_size_str;
    }

    public void setBarrage_font_size_str(String barrage_font_size_str) {
        this.barrage_font_size_str = barrage_font_size_str;
    }

    public String getBarrage_position_str() {
        return barrage_position_str;
    }

    public void setBarrage_position_str(String barrage_position_str) {
        this.barrage_position_str = barrage_position_str;
    }

    public String getBarrage_color_str() {
        return barrage_color_str;
    }

    public void setBarrage_color_str(String barrage_color_str) {
        this.barrage_color_str = barrage_color_str;
    }

    public String getBarrage_text_str() {
        return barrage_text_str;
    }

    public void setBarrage_text_str(String barrage_text_str) {
        this.barrage_text_str = barrage_text_str;
    }

    public String getBarrage_time_str() {
        return barrage_time_str;
    }

    public void setBarrage_time_str(String barrage_time_str) {
        this.barrage_time_str = barrage_time_str;
    }

    public String getBarrage_date_str() {
        return barrage_date_str;
    }

    public void setBarrage_date_str(String barrage_date_str) {
        this.barrage_date_str = barrage_date_str;
    }
}
