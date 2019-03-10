package com.forms;

import java.sql.Timestamp;
import java.util.List;

/**
 * Created by Benson on 2017/3/10.
 */
public class VideoPackageForm {
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
    private String userName;
    private List<String> VideoNames;
    private List<String> VideoXMLNames;
    private String pictureName;
    private String score;


    public int getVideoId() {
        return videoId;
    }

    public void setVideoId(int videoId) {
        this.videoId = videoId;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getVideoIntroduction() {
        return videoIntroduction;
    }

    public void setVideoIntroduction(String videoIntroduction) {
        this.videoIntroduction = videoIntroduction;
    }

    public String getVideoNum() {
        return videoNum;
    }

    public void setVideoNum(String videoNum) {
        this.videoNum = videoNum;
    }

    public String getPlayNum() {
        return playNum;
    }

    public void setPlayNum(String playNum) {
        this.playNum = playNum;
    }

    public String getBarrageNum() {
        return barrageNum;
    }

    public void setBarrageNum(String barrageNum) {
        this.barrageNum = barrageNum;
    }

    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public List<String> getVideoNames() {
        return VideoNames;
    }

    public void setVideoNames(List<String> videoNames) {
        VideoNames = videoNames;
    }

    public List<String> getVideoXMLNames() {
        return VideoXMLNames;
    }

    public void setVideoXMLNames(List<String> videoXMLNames) {
        VideoXMLNames = videoXMLNames;
    }

    public String getPictureName() {
        return pictureName;
    }

    public void setPictureName(String pictureName) {
        this.pictureName = pictureName;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }
}
