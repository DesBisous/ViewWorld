package com.action;

import com.beans.SuggestionBoxEntity;
import com.beans.UserEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.opensymphony.xwork2.ActionSupport;
import com.service.SessionService;
import com.service.SuggestionBoxService;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Benson on 2017/2/19.
 */
public class SuggestionBoxAction extends ActionSupport {
    private static final long serialVersionUID = 1L;
    private SuggestionBoxService suggestionBoxService;
    private SuggestionBoxEntity suggestionBoxEntity;
    private SessionService sessionService;
    private String result;

    public SuggestionBoxService getSuggestionBoxService() {
        return suggestionBoxService;
    }

    public void setSuggestionBoxService(SuggestionBoxService suggestionBoxService) {
        this.suggestionBoxService = suggestionBoxService;
    }

    public SuggestionBoxEntity getSuggestionBoxEntity() {
        return suggestionBoxEntity;
    }

    public void setSuggestionBoxEntity(SuggestionBoxEntity suggestionBoxEntity) {
        this.suggestionBoxEntity = suggestionBoxEntity;
    }

    public SessionService getSessionService() {
        return sessionService;
    }

    public void setSessionService(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
    /**
     * 保存网站建议
     */
    public String saveSuggestionBoxAction() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        UserEntity existUserEntity = (UserEntity)sessionService.session_Get("user");
        if( existUserEntity == null ){
            map.put("status","F");
            map.put("msg","未登录，不能上传");
        }else{
            Timestamp dateTime = new Timestamp(System.currentTimeMillis());
            suggestionBoxEntity.setCreateTime(dateTime);
            suggestionBoxEntity.setUserId(existUserEntity.getUserId());
            if( suggestionBoxService.saveSuggestionBoxService(suggestionBoxEntity) ){
                map.put("status","S");
                map.put("msg","提交成功");
            }else{
                map.put("status","F");
                map.put("msg","提交失败");
            }
        }
        result = objectMapper.writeValueAsString(map);
        return "suggestionBox";
    }
    public String findSugBoxByUserIdAndTypeAction() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        UserEntity existUserEntity = (UserEntity)sessionService.session_Get("user");
        if( existUserEntity == null ){
            map.put("status","F");
            map.put("msg","未登录，无法获取意见");
        }else{
            suggestionBoxEntity.setUserId( existUserEntity.getUserId() );
            List<SuggestionBoxEntity> sugBoxEntits = suggestionBoxService.findSugBoxByTypeAndUserId(suggestionBoxEntity);
            if( sugBoxEntits == null ){
                map.put("status","F");
                map.put("msg","没有意见");
            }else{
                map.put("status","S");
                map.put("msg","获取成功");
                map.put("sugList",sugBoxEntits);
            }
        }
        result = objectMapper.writeValueAsString(map);
        return "suggestionBox";
    }
}


