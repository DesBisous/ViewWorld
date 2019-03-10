package com.dao;

import com.beans.UserEntity;

/**
 * Created by Benson on 2017/2/9.
 */
public interface UserDao {
    public boolean saveUser(UserEntity userEntity);
    public UserEntity findUserByAccount(UserEntity userEntity);
    public UserEntity findUserByAccountAndPassword(UserEntity userEntity);
    public UserEntity findUserByUserId(UserEntity userEntity);
    public boolean updateUser(UserEntity userEntity);
}
