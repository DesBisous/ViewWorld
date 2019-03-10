package com.serviceImpl;

import com.beans.UserEntity;
import com.dao.UserDao;
import com.service.UserService;
import org.hibernate.HibernateException;

/**
 * Created by Benson on 2017/2/9.
 */
public class UserServiceImpl implements UserService {
    private UserDao userDao;

    public UserDao getUserDao() {
        return userDao;
    }

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public boolean registerService(UserEntity userEntity)  throws HibernateException {
        return userDao.saveUser(userEntity);
    }

    @Override
    public UserEntity loginService(UserEntity userEntity) {
        return userDao.findUserByAccountAndPassword(userEntity);
    }

    @Override
    public UserEntity existAccountService(UserEntity userEntity) {
        return userDao.findUserByAccount(userEntity);
    }

    @Override
    public boolean modifyPassword(UserEntity userEntity) {
        return userDao.updateUser(userEntity);
    }

    @Override
    public boolean modifyUserInfo(UserEntity userEntity) {
        return userDao.updateUser(userEntity);
    }

    @Override
    public UserEntity findUserByUserId(UserEntity userEntity) {
        return userDao.findUserByUserId(userEntity);
    }
}
