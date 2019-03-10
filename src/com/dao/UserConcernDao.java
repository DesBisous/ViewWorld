package com.dao;

import com.beans.UserConcernEntity;

import java.util.List;

/**
 * Created by Benson on 2017/2/20.
 */
public interface UserConcernDao {
    public List<UserConcernEntity> findUserConcernByUserId(UserConcernEntity userConcernEntity );
    public boolean saveUserConcern(UserConcernEntity userConcernEntity);
    public boolean existByUserIdAndConcernId(int userId,int concernId);
    public int getConcernByUserId(int userId);
}
