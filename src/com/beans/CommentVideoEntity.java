package com.beans;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by Benson on 2017/4/5.
 */
@Entity
//@Table(name = "commentVideo", schema = "ViewWorld", catalog = "")
@Table(name = "commentvideo", schema = "viewworld", catalog = "")
public class CommentVideoEntity {
    private int commentVideoId;
    private int videoId;
    private String videoName;
    private int parentId;
    private Integer replyId;
    private String replyName;
    private Integer beReplyId;
    private String beReplyName;
    private Timestamp createTime;
    private String content;

    @Id
    @Column(name = "commentVideoId")
    public int getCommentVideoId() {
        return commentVideoId;
    }

    public void setCommentVideoId(int commentVideoId) {
        this.commentVideoId = commentVideoId;
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
    @Column(name = "videoName")
    public String getVideoName() {
        return videoName;
    }

    public void setVideoName(String videoName) {
        this.videoName = videoName;
    }

    @Basic
    @Column(name = "parentId")
    public int getParentId() {
        return parentId;
    }

    public void setParentId(int parentId) {
        this.parentId = parentId;
    }

    @Basic
    @Column(name = "replyId")
    public Integer getReplyId() {
        return replyId;
    }

    public void setReplyId(Integer replyId) {
        this.replyId = replyId;
    }

    @Basic
    @Column(name = "replyName")
    public String getReplyName() {
        return replyName;
    }

    public void setReplyName(String replyName) {
        this.replyName = replyName;
    }

    @Basic
    @Column(name = "beReplyId")
    public Integer getBeReplyId() {
        return beReplyId;
    }

    public void setBeReplyId(Integer beReplyId) {
        this.beReplyId = beReplyId;
    }

    @Basic
    @Column(name = "beReplyName")
    public String getBeReplyName() {
        return beReplyName;
    }

    public void setBeReplyName(String beReplyName) {
        this.beReplyName = beReplyName;
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
    @Column(name = "content")
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CommentVideoEntity that = (CommentVideoEntity) o;

        if (commentVideoId != that.commentVideoId) return false;
        if (videoId != that.videoId) return false;
        if (parentId != that.parentId) return false;
        if (videoName != null ? !videoName.equals(that.videoName) : that.videoName != null) return false;
        if (replyId != null ? !replyId.equals(that.replyId) : that.replyId != null) return false;
        if (replyName != null ? !replyName.equals(that.replyName) : that.replyName != null) return false;
        if (beReplyId != null ? !beReplyId.equals(that.beReplyId) : that.beReplyId != null) return false;
        if (beReplyName != null ? !beReplyName.equals(that.beReplyName) : that.beReplyName != null) return false;
        if (createTime != null ? !createTime.equals(that.createTime) : that.createTime != null) return false;
        if (content != null ? !content.equals(that.content) : that.content != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = commentVideoId;
        result = 31 * result + videoId;
        result = 31 * result + (videoName != null ? videoName.hashCode() : 0);
        result = 31 * result + parentId;
        result = 31 * result + (replyId != null ? replyId.hashCode() : 0);
        result = 31 * result + (replyName != null ? replyName.hashCode() : 0);
        result = 31 * result + (beReplyId != null ? beReplyId.hashCode() : 0);
        result = 31 * result + (beReplyName != null ? beReplyName.hashCode() : 0);
        result = 31 * result + (createTime != null ? createTime.hashCode() : 0);
        result = 31 * result + (content != null ? content.hashCode() : 0);
        return result;
    }
}
