package com.beans;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by Benson on 2017/2/21.
 */
@Entity
//@Table(name = "album", schema = "ViewWorld", catalog = "")
@Table(name = "album", schema = "viewworld", catalog = "")
public class AlbumEntity {
    private int albumId;
    private String theme;
    private String title;
    private String albumIntroduction;
    private String good;
    private String albumNum;
    private Timestamp createTime;
    private int userId;

    @Id
    @Column(name = "albumId")
    public int getAlbumId() {
        return albumId;
    }

    public void setAlbumId(int albumId) {
        this.albumId = albumId;
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
    @Column(name = "albumIntroduction")
    public String getAlbumIntroduction() {
        return albumIntroduction;
    }

    public void setAlbumIntroduction(String albumIntroduction) {
        this.albumIntroduction = albumIntroduction;
    }

    @Basic
    @Column(name = "good")
    public String getGood() {
        return good;
    }

    public void setGood(String good) {
        this.good = good;
    }

    @Basic
    @Column(name = "albumNum")
    public String getAlbumNum() {
        return albumNum;
    }

    public void setAlbumNum(String albumNum) {
        this.albumNum = albumNum;
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

        AlbumEntity that = (AlbumEntity) o;

        if (albumId != that.albumId) return false;
        if (userId != that.userId) return false;
        if (theme != null ? !theme.equals(that.theme) : that.theme != null) return false;
        if (title != null ? !title.equals(that.title) : that.title != null) return false;
        if (albumIntroduction != null ? !albumIntroduction.equals(that.albumIntroduction) : that.albumIntroduction != null)
            return false;
        if (good != null ? !good.equals(that.good) : that.good != null) return false;
        if (albumNum != null ? !albumNum.equals(that.albumNum) : that.albumNum != null) return false;
        if (createTime != null ? !createTime.equals(that.createTime) : that.createTime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = albumId;
        result = 31 * result + (theme != null ? theme.hashCode() : 0);
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (albumIntroduction != null ? albumIntroduction.hashCode() : 0);
        result = 31 * result + (good != null ? good.hashCode() : 0);
        result = 31 * result + (albumNum != null ? albumNum.hashCode() : 0);
        result = 31 * result + (createTime != null ? createTime.hashCode() : 0);
        result = 31 * result + userId;
        return result;
    }
}
