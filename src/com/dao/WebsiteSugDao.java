package com.dao;

import com.beans.WebsiteSuggestionsEntity;

/**
 * Created by Benson on 2017/2/16.
 */
public interface WebsiteSugDao {
    public boolean saveWebsiteSug(WebsiteSuggestionsEntity websiteSuggestionsEntity);
    public WebsiteSuggestionsEntity findWebsiteSugByBrief(WebsiteSuggestionsEntity websiteSuggestionsEntity);
}
