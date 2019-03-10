package com.serviceImpl;

import com.beans.SuggestionBoxEntity;
import com.dao.SuggestionBoxDao;
import com.service.SuggestionBoxService;

import java.util.List;

/**
 * Created by Benson on 2017/2/19.
 */
public class SuggestionBoxServiceImpl implements SuggestionBoxService {
    private SuggestionBoxDao suggestionBoxDao;

    public SuggestionBoxDao getSuggestionBoxDao() {
        return suggestionBoxDao;
    }

    public void setSuggestionBoxDao(SuggestionBoxDao suggestionBoxDao) {
        this.suggestionBoxDao = suggestionBoxDao;
    }

    @Override
    public boolean saveSuggestionBoxService(SuggestionBoxEntity SuggestionBoxEntity) {
        return suggestionBoxDao.saveSuggestionBox(SuggestionBoxEntity);
    }

    @Override
    public List<SuggestionBoxEntity> findSugBoxByTypeAndUserId(SuggestionBoxEntity SuggestionBoxEntity) {
        return suggestionBoxDao.findSugBoxByTypeAndUserId(SuggestionBoxEntity);
    }
}
