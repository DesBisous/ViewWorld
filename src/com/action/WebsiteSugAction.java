package com.action;

import com.beans.WebsiteSuggestionsEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.opensymphony.xwork2.ActionSupport;
import com.service.WebsiteSugService;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Benson on 2017/2/16.
 */
public class WebsiteSugAction extends ActionSupport {
    private static final long serialVersionUID = 1L;
    private WebsiteSuggestionsEntity websiteSuggestionsEntity;
    private WebsiteSugService websiteSugService;
    private String result;

    public WebsiteSuggestionsEntity getWebsiteSuggestionsEntity() {
        return websiteSuggestionsEntity;
    }

    public void setWebsiteSuggestionsEntity(WebsiteSuggestionsEntity websiteSuggestionsEntity) {
        this.websiteSuggestionsEntity = websiteSuggestionsEntity;
    }

    public WebsiteSugService getWebsiteSugService() {
        return websiteSugService;
    }

    public void setWebsiteSugService(WebsiteSugService websiteSugService) {
        this.websiteSugService = websiteSugService;
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
    public String saveWebsiteSugAction() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        Timestamp dateTime = new Timestamp(System.currentTimeMillis());
        websiteSuggestionsEntity.setCreateTime(dateTime);
        if( websiteSugService.saveWebsiteSugService(websiteSuggestionsEntity) ){
            map.put("status","S");
            map.put("msg","提交成功");
        }else{
            map.put("status","F");
            map.put("msg","提交失败");
        }
        result = objectMapper.writeValueAsString(map);
        return "WebsiteSug";
    }
    /**
     * 获取网站建议
     */
    public String getWebsiteSugByBriefAction() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        WebsiteSuggestionsEntity existWebsiteSugEntity = websiteSugService.findWebsiteSugByBrief(websiteSuggestionsEntity);
        if( existWebsiteSugEntity != null ){
            map.put("status","S");
            map.put("msg","获取成功");
            map.put("WebsiteSug",existWebsiteSugEntity);
        }else{
            map.put("status","F");
            map.put("msg","获取失败");
        }
        result = objectMapper.writeValueAsString(map);
        return "WebsiteSug";
    }
}
