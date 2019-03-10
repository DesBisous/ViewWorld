package com.service;


import com.beans.SuggestionBoxEntity;

import java.util.List;

/**
 * Created by Benson on 2017/2/19.
 */
public interface SuggestionBoxService {
    /**
     * 保存
     */
    public boolean saveSuggestionBoxService(SuggestionBoxEntity SuggestionBoxEntity);
    public List<SuggestionBoxEntity> findSugBoxByTypeAndUserId(SuggestionBoxEntity SuggestionBoxEntity);
}
