package com.service;

import com.beans.WebsiteSuggestionsEntity;

/**
 * Created by Benson on 2017/2/16.
 */
public interface WebsiteSugService {
    /**
     * 保存
     */
    public boolean saveWebsiteSugService(WebsiteSuggestionsEntity websiteSuggestionsEntity);
    /**
     * 通过简介获取
     */
    public WebsiteSuggestionsEntity findWebsiteSugByBrief(WebsiteSuggestionsEntity websiteSuggestionsEntity);
}
