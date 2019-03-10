package com.beans;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by Benson on 2017/2/20.
 */
@Entity
//@Table(name = "userConcern", schema = "ViewWorld", catalog = "")
@Table(name = "userconcern", schema = "viewworld", catalog = "")
public class UserConcernEntity {
    private int userConcernId;
    private Integer userId;
    private String userName;
    private Integer concernId;
    private String concernName;
    private Timestamp createTime;

    @Id
    @Column(name = "userConcernId")
    public int getUserConcernId() {
        return userConcernId;
    }

    public void setUserConcernId(int userConcernId) {
        this.userConcernId = userConcernId;
    }

    @Basic
    @Column(name = "userId")
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "userName")
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Basic
    @Column(name = "concernId")
    public Integer getConcernId() {
        return concernId;
    }

    public void setConcernId(Integer concernId) {
        this.concernId = concernId;
    }

    @Basic
    @Column(name = "concernName")
    public String getConcernName() {
        return concernName;
    }

    public void setConcernName(String concernName) {
        this.concernName = concernName;
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

        UserConcernEntity that = (UserConcernEntity) o;

        if (userConcernId != that.userConcernId) return false;
        if (userId != null ? !userId.equals(that.userId) : that.userId != null) return false;
        if (userName != null ? !userName.equals(that.userName) : that.userName != null) return false;
        if (concernId != null ? !concernId.equals(that.concernId) : that.concernId != null) return false;
        if (concernName != null ? !concernName.equals(that.concernName) : that.concernName != null) return false;
        if (createTime != null ? !createTime.equals(that.createTime) : that.createTime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = userConcernId;
        result = 31 * result + (userId != null ? userId.hashCode() : 0);
        result = 31 * result + (userName != null ? userName.hashCode() : 0);
        result = 31 * result + (concernId != null ? concernId.hashCode() : 0);
        result = 31 * result + (concernName != null ? concernName.hashCode() : 0);
        result = 31 * result + (createTime != null ? createTime.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "UserConcernEntity{" +
                "userConcernId=" + userConcernId +
                ", userId=" + userId +
                ", userName='" + userName + '\'' +
                ", concernId=" + concernId +
                ", concernName='" + concernName + '\'' +
                ", createTime=" + createTime +
                '}';
    }
}
