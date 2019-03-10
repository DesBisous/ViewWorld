package com.beans;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by Benson on 2017/2/19.
 */
@Entity
//@Table(name = "suggestionBox", schema = "ViewWorld", catalog = "")
@Table(name = "suggestionbox", schema = "viewworld", catalog = "")
public class SuggestionBoxEntity {
    private int suggestionBoxId;
    private int userId;
    private String type;
    private String title;
    private String sugContent;
    private Timestamp createTime;
    private Integer csId;
    private String csName;
    private String csContent;
    private Timestamp csTime;

    @Id
    @Column(name = "suggestionBoxId")
    public int getSuggestionBoxId() {
        return suggestionBoxId;
    }

    public void setSuggestionBoxId(int suggestionBoxId) {
        this.suggestionBoxId = suggestionBoxId;
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
    @Column(name = "type")
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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
    @Column(name = "sugContent")
    public String getSugContent() {
        return sugContent;
    }

    public void setSugContent(String sugContent) {
        this.sugContent = sugContent;
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
    @Column(name = "csId")
    public Integer getCsId() {
        return csId;
    }

    public void setCsId(Integer csId) {
        this.csId = csId;
    }

    @Basic
    @Column(name = "csName")
    public String getCsName() {
        return csName;
    }

    public void setCsName(String csName) {
        this.csName = csName;
    }

    @Basic
    @Column(name = "csContent")
    public String getCsContent() {
        return csContent;
    }

    public void setCsContent(String csContent) {
        this.csContent = csContent;
    }

    @Basic
    @Column(name = "csTime")
    public Timestamp getCsTime() {
        return csTime;
    }

    public void setCsTime(Timestamp csTime) {
        this.csTime = csTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SuggestionBoxEntity that = (SuggestionBoxEntity) o;

        if (suggestionBoxId != that.suggestionBoxId) return false;
        if (userId != that.userId) return false;
        if (type != null ? !type.equals(that.type) : that.type != null) return false;
        if (title != null ? !title.equals(that.title) : that.title != null) return false;
        if (sugContent != null ? !sugContent.equals(that.sugContent) : that.sugContent != null) return false;
        if (createTime != null ? !createTime.equals(that.createTime) : that.createTime != null) return false;
        if (csId != null ? !csId.equals(that.csId) : that.csId != null) return false;
        if (csName != null ? !csName.equals(that.csName) : that.csName != null) return false;
        if (csContent != null ? !csContent.equals(that.csContent) : that.csContent != null) return false;
        if (csTime != null ? !csTime.equals(that.csTime) : that.csTime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = suggestionBoxId;
        result = 31 * result + userId;
        result = 31 * result + (type != null ? type.hashCode() : 0);
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (sugContent != null ? sugContent.hashCode() : 0);
        result = 31 * result + (createTime != null ? createTime.hashCode() : 0);
        result = 31 * result + (csId != null ? csId.hashCode() : 0);
        result = 31 * result + (csName != null ? csName.hashCode() : 0);
        result = 31 * result + (csContent != null ? csContent.hashCode() : 0);
        result = 31 * result + (csTime != null ? csTime.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "SuggestionBoxEntity{" +
                "suggestionBoxId=" + suggestionBoxId +
                ", userId=" + userId +
                ", type='" + type + '\'' +
                ", title='" + title + '\'' +
                ", sugContent='" + sugContent + '\'' +
                ", createTime=" + createTime +
                ", csId=" + csId +
                ", csName='" + csName + '\'' +
                ", csContent='" + csContent + '\'' +
                ", csTime=" + csTime +
                '}';
    }
}
