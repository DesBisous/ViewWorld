package com.action;

import com.beans.UserConcernEntity;
import com.beans.UserEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.opensymphony.xwork2.ActionSupport;
import com.service.SessionService;
import com.service.UserConcernService;
import com.service.UserService;

import java.awt.*;
import java.sql.Timestamp;
import java.util.*;
import java.util.List;

/**
 * Created by Benson on 2017/2/20.
 */
public class UserConcernAction extends ActionSupport {
    private static final long serialVersionUID = 1L;
    private UserConcernEntity userConcernEntity;
    private UserConcernService userConcernService;
    private SessionService sessionService;
    private UserService userService;
    private String result;

    public UserConcernEntity getUserConcernEntity() {
        return userConcernEntity;
    }

    public void setUserConcernEntity(UserConcernEntity userConcernEntity) {
        this.userConcernEntity = userConcernEntity;
    }

    public UserConcernService getUserConcernService() {
        return userConcernService;
    }

    public void setUserConcernService(UserConcernService userConcernService) {
        this.userConcernService = userConcernService;
    }

    public SessionService getSessionService() {
        return sessionService;
    }

    public void setSessionService(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    public UserService getUserService() {
        return userService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    /**
     * 获取用户关注人信息
     * @return
     * @throws Exception
     */
    public String getUserConcernByUserId() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        List<UserConcernEntity> UserConcerns = userConcernService.findUserConcernByUserId(userConcernEntity);
        if( UserConcerns != null ){
            map.put("status","S");
            map.put("msg","查询成功");
            map.put("userConcerns",UserConcerns);
        }else{
            map.put("status","F");
            map.put("msg","没有关注的人");
        }
        result = objectMapper.writeValueAsString(map);
        return "userConcern";
    }
    /**
     * 添加关注人
     * @return
     * @throws Exception
     */
    public String addUserConcern() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        UserEntity existUserEntity = (UserEntity)sessionService.session_Get("user");
        if( existUserEntity == null ) {
            map.put("status", "F");
            map.put("msg", "未登录,请先登录");
        }else{
            if( existUserEntity.getUserId() == userConcernEntity.getConcernId() ){
                map.put("status","F");
                map.put("msg","不能关注本人发布的作品");
            }else{
                boolean isConcern = userConcernService.existByUserIdAndConcernId(existUserEntity.getUserId(),userConcernEntity.getConcernId());
                if( isConcern ){
                    //已经关注过了
                    map.put("status","F");
                    map.put("msg","已关注过了");
                }else{
                    //获取被关注人信息
                    UserEntity userEntity = new UserEntity();
                    userEntity.setUserId(userConcernEntity.getConcernId());
                    userEntity = userService.findUserByUserId(userEntity);
                    if( userEntity == null ){
                        map.put("status","F");
                        map.put("msg","未能找到该用户的信息，已请求管理员处理");
                    }else{
                        userConcernEntity.setUserId(existUserEntity.getUserId());
                        userConcernEntity.setUserName(existUserEntity.getName());
                        userConcernEntity.setConcernId(userEntity.getUserId());
                        userConcernEntity.setConcernName(userEntity.getName());
                        userConcernEntity.setCreateTime(new Timestamp(System.currentTimeMillis()));
                        boolean isSave = userConcernService.saveUserConcern(userConcernEntity);
                        if( !isSave ){
                            map.put("status","F");
                            map.put("msg","关注失败，请稍后再试");
                        }else{
                            //获取已关注的人数
                            int concernNum = userConcernService.getConcernByUserId(existUserEntity.getUserId());
                            existUserEntity.setConcernNum(concernNum+"");
                            userService.modifyUserInfo(existUserEntity);
                            map.put("status","S");
                            map.put("msg","关注成功");
                        }
                    }
                }
            }
        }
        result = objectMapper.writeValueAsString(map);
        return "userConcern";
    }
}
