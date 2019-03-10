package com.service;

import com.beans.UserEntity;

/**
 * Created by Benson on 2017/2/9.
 */
public interface UserService {
    /**
     * 注册
     */
    public boolean registerService(UserEntity userEntity);
    /**
     * 登录
     */
    public UserEntity loginService(UserEntity userEntity);
    /**
     * 账号是否已使用
     */
    public UserEntity existAccountService(UserEntity userEntity);

    /**
     * 修改密码
     */
    public boolean modifyPassword(UserEntity userEntity);

    /**
     * 修改基本用户信息
     */
    public boolean modifyUserInfo(UserEntity userEntity);

    /**
     * 通过用户ID获取用户信息
     */
    public UserEntity findUserByUserId(UserEntity userEntity);
}
