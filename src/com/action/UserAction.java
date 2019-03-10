package com.action;

import com.beans.UserEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.opensymphony.xwork2.ActionSupport;
import com.service.SessionService;
import com.service.UserConcernService;
import com.service.UserService;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Benson on 2016/9/22.
 */
public class UserAction extends ActionSupport{
    private static final long serialVersionUID = 1L;
    private UserEntity userEntity;
    private UserService userService;
    private SessionService sessionService;
    private UserConcernService userConcernService;
    private String result;

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
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

    public SessionService getSessionService() {
        return sessionService;
    }

    public void setSessionService(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    public UserConcernService getUserConcernService() {
        return userConcernService;
    }

    public void setUserConcernService(UserConcernService userConcernService) {
        this.userConcernService = userConcernService;
    }

    /**
     * 注册用户
     * @return
     * @throws Exception
     */
    public String register() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        UserEntity existUserEntity = userService.existAccountService(userEntity);
        if( existUserEntity == null ){
            Timestamp dateTime = new Timestamp(System.currentTimeMillis());
            userEntity.setUpdateTime(dateTime);
            userEntity.setCreateTime(dateTime);
            Boolean isSave = userService.registerService(userEntity);
            if( isSave ){
                map.put("user",userEntity);
                sessionService.session_Put(map);
                map.remove("user");
                map.put("status","S");
                map.put("msg","注册成功");
            }else{
                map.put("status","F");
                map.put("msg","注册失败");
            }
        }else{
            map.put("status","F");
            map.put("msg","账号已被使用");
        }
        result = objectMapper.writeValueAsString(map);
        return "userActionResult";
    }

    /**
     * 登录
     * @return
     * @throws Exception
     */
    public String login() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        UserEntity existUserEntity = userService.loginService(userEntity);
        if( existUserEntity == null ){
            map.put("status","F");
            map.put("msg","账号或密码错误");
        }else{
            map.put("user",existUserEntity);
            sessionService.session_Put(map);
            map.put("status","S");
            map.put("msg","登录成功");
        }
        result = objectMapper.writeValueAsString(map);
        return "userActionResult";
    }

    /**
     * 通过账号查询密码
     * @return
     * @throws Exception
     */
    public String findPasswordByAccount() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        UserEntity existUserEntity = userService.existAccountService(userEntity);
        if( existUserEntity == null ){
            map.put("status","F");
            map.put("msg","账号不存在");
        }else{
            map.put("status","S");
            map.put("msg","查询成功");
            map.put("user",existUserEntity);
        }
        result = objectMapper.writeValueAsString(map);
        return "userActionResult";
    }

    /**
     * 查找Session中是否已登录账号
     * @return
     * @throws Exception
     */
    public String existUserBySession() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map map = new HashMap<>();
        UserEntity existUserEntity = (UserEntity)sessionService.session_Get("user");
        if( existUserEntity == null ){
            map.put("status","F");
            map.put("msg","未登录");
        }else{
            map.put("status","S");
            map.put("msg","已登录");
            map.put("user",existUserEntity);
        }
        result = objectMapper.writeValueAsString(map);
        return "userActionResult";
    }

    /**
     * 退出登录
     * @return
     * @throws Exception
     */
    public String exitUserBySession() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map map = new HashMap<>();
        sessionService.session_Del("user");
        map.put("status","S");
        map.put("msg","已退出");
        result = objectMapper.writeValueAsString(map);
        return "userActionResult";
    }

    /**
     * 修改密码
     */
    public String modifyPassword() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map map = new HashMap<>();
        UserEntity existUserEntity = (UserEntity)sessionService.session_Get("user");
        existUserEntity.setPassword(userEntity.getPassword());
        Timestamp dateTime = new Timestamp(System.currentTimeMillis());
        existUserEntity.setUpdateTime(dateTime);
        boolean isModify = userService.modifyPassword(existUserEntity);
        if( isModify ){
            map.put("user",existUserEntity);
            sessionService.session_Put(map);
            map.remove("user");
            map.put("status","S");
            map.put("msg","修改成功");
        }else{
            map.put("status","F");
            map.put("msg","修改失败");
        }
        result = objectMapper.writeValueAsString(map);
        return "userActionResult";
    }

    /**
     * 修改用户基本信息
     */
    public String modifyUserInfo() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map map = new HashMap<>();
        UserEntity existUserEntity = (UserEntity)sessionService.session_Get("user");
        if( existUserEntity == null ){
            map.put("status","F");
            map.put("msg","未登录，不能修改");
        }else{
            if( userEntity.getPhone() != null && userEntity.getPhone().length() > 0 ){
                existUserEntity.setPhone(userEntity.getPhone());
            }
            if( userEntity.getName() != null && userEntity.getName().length() > 0 ){
                existUserEntity.setName(userEntity.getName());
            }
            if( userEntity.getBirthday() != null && userEntity.getBirthday().length() > 0 ){
                existUserEntity.setBirthday(userEntity.getBirthday());
            }
            if( userEntity.getSex() != null && userEntity.getSex().length() > 0 ){
                existUserEntity.setSex(userEntity.getSex());
            }
            if( userEntity.getNationality() != null && userEntity.getNationality().length() > 0 ){
                existUserEntity.setNationality(userEntity.getNationality());
            }
            if( userEntity.getUserIntroduction() != null && userEntity.getUserIntroduction().length() > 0 ){
                existUserEntity.setUserIntroduction(userEntity.getUserIntroduction());
            }
            Timestamp dateTime = new Timestamp(System.currentTimeMillis());
            existUserEntity.setUpdateTime(dateTime);
            boolean isModify = userService.modifyUserInfo(existUserEntity);
            if( !isModify ){
                map.put("status","F");
                map.put("msg","修改失败");
            }else{
                map.put("user",existUserEntity);
                sessionService.session_Put(map);
                map.put("status","S");
                map.put("msg","修改成功");
                map.remove("user");
            }
        }
        result = objectMapper.writeValueAsString(map);
        return "userActionResult";
    }

    /**
     * 通过UserId获取用户信息
     */
    public String getUserByIdAction() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map map = new HashMap<>();
        UserEntity existUserEntity = userService.findUserByUserId(userEntity);
        if( existUserEntity == null ){
            map.put("status","F");
            map.put("msg","未能找到该用户");
        }else{
            map.put("status","S");
            map.put("msg","查找成功");
            map.put("user",existUserEntity);
            //检测当前登录用户ID是否为传入进来的用户ID
            UserEntity loginUserEntity = (UserEntity)sessionService.session_Get("user");
            if( loginUserEntity.getUserId() == existUserEntity.getUserId() ){
                map.put("sameUser","sameUser");//true表示不显示关注按钮
            }else{
                //当前为不同用户时，需要检测登录用户是否已经关注了传进来的用户ID
                if(userConcernService.existByUserIdAndConcernId(loginUserEntity.getUserId(),existUserEntity.getUserId())){
                    map.put("sameUser","alreadyConcern");
                }else{
                    map.put("sameUser","notConcern");
                }
            }
        }
        result = objectMapper.writeValueAsString(map);
        return "userActionResult";
    }
}

