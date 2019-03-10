package com.beans;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by Benson on 2017/3/19.
 */
@Entity
//@Table(name = "videoScore", schema = "ViewWorld", catalog = "")
@Table(name = "videoscore", schema = "viewworld", catalog = "")
public class VideoScoreEntity {
    private int videoScoreId;
    private double score;
    private int refereeId;
    private String refereeName;
    private int userId;
    private int videoId;
    private Timestamp createTime;

    @Id
    @Column(name = "videoScoreId")
    public int getVideoScoreId() {
        return videoScoreId;
    }

    public void setVideoScoreId(int videoScoreId) {
        this.videoScoreId = videoScoreId;
    }

    @Basic
    @Column(name = "score")
    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    @Basic
    @Column(name = "refereeId")
    public int getRefereeId() {
        return refereeId;
    }

    public void setRefereeId(int refereeId) {
        this.refereeId = refereeId;
    }

    @Basic
    @Column(name = "refereeName")
    public String getRefereeName() {
        return refereeName;
    }

    public void setRefereeName(String refereeName) {
        this.refereeName = refereeName;
    }

    @Basic
    @Column(name = "userId")
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "videoId")
    public int getVideoId() {
        return videoId;
    }

    public void setVideoId(int videoId) {
        this.videoId = videoId;
    }

    @Basic
    @Column(name = "createTime")
    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        VideoScoreEntity that = (VideoScoreEntity) o;

        if (videoScoreId != that.videoScoreId) return false;
        if (Double.compare(that.score, score) != 0) return false;
        if (refereeId != that.refereeId) return false;
        if (userId != that.userId) return false;
        if (videoId != that.videoId) return false;
        if (refereeName != null ? !refereeName.equals(that.refereeName) : that.refereeName != null) return false;
        if (createTime != null ? !createTime.equals(that.createTime) : that.createTime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = videoScoreId;
        temp = Double.doubleToLongBits(score);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        result = 31 * result + refereeId;
        result = 31 * result + (refereeName != null ? refereeName.hashCode() : 0);
        result = 31 * result + userId;
        result = 31 * result + videoId;
        result = 31 * result + (createTime != null ? createTime.hashCode() : 0);
        return result;
    }
}
