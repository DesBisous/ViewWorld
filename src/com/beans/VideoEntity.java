package com.beans;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by Benson on 2017/3/10.
 */
@Entity
//@Table(name = "video", schema = "ViewWorld", catalog = "")
@Table(name = "video", schema = "viewworld", catalog = "")
public class VideoEntity {
    private int videoId;
    private String region;
    private String theme;
    private String title;
    private String label;
    private String videoIntroduction;
    private String videoNum;
    private String playNum;
    private String barrageNum;
    private Timestamp createTime;
    private int userId;

    @Id
    @Column(name = "videoId")
    public int getVideoId() {
        return videoId;
    }

    public void setVideoId(int videoId) {
        this.videoId = videoId;
    }

    @Basic
    @Column(name = "region")
    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    @Basic
    @Column(name = "theme")
    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    @Basic
    @Column(name = "title")
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "label")
    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    @Basic
    @Column(name = "videoIntroduction")
    public String getVideoIntroduction() {
        return videoIntroduction;
    }

    public void setVideoIntroduction(String videoIntroduction) {
        this.videoIntroduction = videoIntroduction;
    }

    @Basic
    @Column(name = "videoNum")
    public String getVideoNum() {
        return videoNum;
    }

    public void setVideoNum(String videoNum) {
        this.videoNum = videoNum;
    }

    @Basic
    @Column(name = "playNum")
    public String getPlayNum() {
        return playNum;
    }

    public void setPlayNum(String playNum) {
        this.playNum = playNum;
    }

    @Basic
    @Column(name = "barrageNum")
    public String getBarrageNum() {
        return barrageNum;
    }

    public void setBarrageNum(String barrageNum) {
        this.barrageNum = barrageNum;
    }

    @Basic
    @Column(name = "createTime")
    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    @Basic
    @Column(name = "userId")
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        VideoEntity that = (VideoEntity) o;

        if (videoId != that.videoId) return false;
        if (userId != that.userId) return false;
        if (region != null ? !region.equals(that.region) : that.region != null) return false;
        if (theme != null ? !theme.equals(that.theme) : that.theme != null) return false;
        if (title != null ? !title.equals(that.title) : that.title != null) return false;
        if (label != null ? !label.equals(that.label) : that.label != null) return false;
        if (videoIntroduction != null ? !videoIntroduction.equals(that.videoIntroduction) : that.videoIntroduction != null)
            return false;
        if (videoNum != null ? !videoNum.equals(that.videoNum) : that.videoNum != null) return false;
        if (playNum != null ? !playNum.equals(that.playNum) : that.playNum != null) return false;
        if (barrageNum != null ? !barrageNum.equals(that.barrageNum) : that.barrageNum != null) return false;
        if (createTime != null ? !createTime.equals(that.createTime) : that.createTime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = videoId;
        result = 31 * result + (region != null ? region.hashCode() : 0);
        result = 31 * result + (theme != null ? theme.hashCode() : 0);
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (label != null ? label.hashCode() : 0);
        result = 31 * result + (videoIntroduction != null ? videoIntroduction.hashCode() : 0);
        result = 31 * result + (videoNum != null ? videoNum.hashCode() : 0);
        result = 31 * result + (playNum != null ? playNum.hashCode() : 0);
        result = 31 * result + (barrageNum != null ? barrageNum.hashCode() : 0);
        result = 31 * result + (createTime != null ? createTime.hashCode() : 0);
        result = 31 * result + userId;
        return result;
    }

    @Override
    public String toString() {
        return "VideoEntity{" +
                "videoId=" + videoId +
                ", region='" + region + '\'' +
                ", theme='" + theme + '\'' +
                ", title='" + title + '\'' +
                ", label='" + label + '\'' +
                ", videoIntroduction='" + videoIntroduction + '\'' +
                ", videoNum='" + videoNum + '\'' +
                ", playNum='" + playNum + '\'' +
                ", barrageNum='" + barrageNum + '\'' +
                ", createTime=" + createTime +
                ", userId=" + userId +
                '}';
    }
}
