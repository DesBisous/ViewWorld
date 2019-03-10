package com.serviceImpl;

import com.beans.WebsiteSuggestionsEntity;
import com.dao.WebsiteSugDao;
import com.service.WebsiteSugService;

/**
 * Created by Benson on 2017/2/16.
 */
public class WebsiteSugServiceImpl implements WebsiteSugService {
    WebsiteSugDao websiteSugDao;

    public WebsiteSugDao getWebsiteSugDao() {
        return websiteSugDao;
    }

    public void setWebsiteSugDao(WebsiteSugDao websiteSugDao) {
        this.websiteSugDao = websiteSugDao;
    }

    @Override
    public boolean saveWebsiteSugService(WebsiteSuggestionsEntity websiteSuggestionsEntity) {
        return websiteSugDao.saveWebsiteSug(websiteSuggestionsEntity);
    }

    @Override
    public WebsiteSuggestionsEntity findWebsiteSugByBrief(WebsiteSuggestionsEntity websiteSuggestionsEntity) {
        return websiteSugDao.findWebsiteSugByBrief(websiteSuggestionsEntity);
    }
}
