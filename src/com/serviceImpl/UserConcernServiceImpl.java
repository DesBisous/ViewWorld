package com.serviceImpl;


import com.beans.UserConcernEntity;
import com.dao.UserConcernDao;
import com.service.UserConcernService;

import java.util.List;

/**
 * Created by Benson on 2017/2/20.
 */
public class UserConcernServiceImpl implements UserConcernService {
    private UserConcernDao userConcernDao;

    public UserConcernDao getUserConcernDao() {
        return userConcernDao;
    }

    public void setUserConcernDao(UserConcernDao userConcernDao) {
        this.userConcernDao = userConcernDao;
    }

    @Override
    public List<UserConcernEntity> findUserConcernByUserId(UserConcernEntity userConcernEntity) {
        return userConcernDao.findUserConcernByUserId(userConcernEntity);
    }

    @Override
    public boolean existByUserIdAndConcernId(int userId, int concernId) {
        return userConcernDao.existByUserIdAndConcernId(userId,concernId);
    }

    @Override
    public boolean saveUserConcern(UserConcernEntity userConcernEntity) {
        return userConcernDao.saveUserConcern(userConcernEntity);
    }

    @Override
    public int getConcernByUserId(int userId) {
        return userConcernDao.getConcernByUserId(userId);
    }
}
