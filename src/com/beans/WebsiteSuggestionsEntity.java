package com.beans;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by Benson on 2017/2/16.
 */
@Entity
//@Table(name = "websiteSuggestions", schema = "ViewWorld", catalog = "")
@Table(name = "websitesuggestions", schema = "viewworld", catalog = "")
public class WebsiteSuggestionsEntity {
    private int websiteSugId;
    private String websiteSugBrief;
    private String websiteSugDetails;
    private Timestamp createTime;

    @Id
    @Column(name = "websiteSugId")
    public int getWebsiteSugId() {
        return websiteSugId;
    }

    public void setWebsiteSugId(int websiteSugId) {
        this.websiteSugId = websiteSugId;
    }

    @Basic
    @Column(name = "websiteSugBrief")
    public String getWebsiteSugBrief() {
        return websiteSugBrief;
    }

    public void setWebsiteSugBrief(String websiteSugBrief) {
        this.websiteSugBrief = websiteSugBrief;
    }

    @Basic
    @Column(name = "websiteSugDetails")
    public String getWebsiteSugDetails() {
        return websiteSugDetails;
    }

    public void setWebsiteSugDetails(String websiteSugDetails) {
        this.websiteSugDetails = websiteSugDetails;
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

        WebsiteSuggestionsEntity that = (WebsiteSuggestionsEntity) o;

        if (websiteSugId != that.websiteSugId) return false;
        if (websiteSugBrief != null ? !websiteSugBrief.equals(that.websiteSugBrief) : that.websiteSugBrief != null)
            return false;
        if (websiteSugDetails != null ? !websiteSugDetails.equals(that.websiteSugDetails) : that.websiteSugDetails != null)
            return false;
        if (createTime != null ? !createTime.equals(that.createTime) : that.createTime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = websiteSugId;
        result = 31 * result + (websiteSugBrief != null ? websiteSugBrief.hashCode() : 0);
        result = 31 * result + (websiteSugDetails != null ? websiteSugDetails.hashCode() : 0);
        result = 31 * result + (createTime != null ? createTime.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "WebsiteSuggestionsEntity{" +
                "websiteSugId=" + websiteSugId +
                ", websiteSugBrief='" + websiteSugBrief + '\'' +
                ", websiteSugDetails='" + websiteSugDetails + '\'' +
                ", createTime=" + createTime +
                '}';
    }
}
