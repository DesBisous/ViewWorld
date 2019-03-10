package com.dao;

import com.beans.SuggestionBoxEntity;

import java.util.List;

/**
 * Created by Benson on 2017/2/19.
 */
public interface SuggestionBoxDao {
    public boolean saveSuggestionBox(SuggestionBoxEntity suggestionBoxEntity);
    public List<SuggestionBoxEntity> findSugBoxByTypeAndUserId(SuggestionBoxEntity suggestionBoxEntity);
}
