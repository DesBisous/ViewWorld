package com.forms;

import java.sql.Timestamp;
import java.util.List;

/**
 * Created by Benson on 2017/2/22.
 */
public class AlbumPackageForm {
    private int albumId;
    private String theme;
    private String title;
    private String albumIntroduction;
    private String good;
    private String albumNum;
    private Timestamp createTime;
    private int userId;
    private String userName;
    private List<String> pictureNames;
    private String pictureName;

    public int getAlbumId() {
        return albumId;
    }

    public void setAlbumId(int albumId) {
        this.albumId = albumId;
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

    public String getAlbumIntroduction() {
        return albumIntroduction;
    }

    public void setAlbumIntroduction(String albumIntroduction) {
        this.albumIntroduction = albumIntroduction;
    }

    public String getGood() {
        return good;
    }

    public void setGood(String good) {
        this.good = good;
    }

    public String getAlbumNum() {
        return albumNum;
    }

    public void setAlbumNum(String albumNum) {
        this.albumNum = albumNum;
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

    public List<String> getPictureNames() {
        return pictureNames;
    }

    public void setPictureNames(List<String> pictureNames) {
        this.pictureNames = pictureNames;
    }

    public String getPictureName() {
        return pictureName;
    }

    public void setPictureName(String pictureName) {
        this.pictureName = pictureName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Override
    public String toString() {
        return "AlbumPackageForm{" +
                "albumId=" + albumId +
                ", theme='" + theme + '\'' +
                ", title='" + title + '\'' +
                ", albumIntroduction='" + albumIntroduction + '\'' +
                ", good='" + good + '\'' +
                ", albumNum='" + albumNum + '\'' +
                ", createTime=" + createTime +
                ", userId=" + userId +
                ", pictureNames=" + pictureNames +
                ", pictureName='" + pictureName + '\'' +
                '}';
    }
}
