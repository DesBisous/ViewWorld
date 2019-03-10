package com.service;

import com.beans.UserConcernEntity;

import java.util.List;

/**
 * Created by Benson on 2017/2/20.
 */
public interface UserConcernService {
    /**
     * 根据UserId查询关注人信息
     */
    public List<UserConcernEntity> findUserConcernByUserId(UserConcernEntity userConcernEntity );
    /**
     * 通过用户Id和关注人Id查询是否存在已关注记录
     */
    public boolean existByUserIdAndConcernId(int userId,int concernId);
    /**
     * 添加关注人
     */
    public boolean saveUserConcern(UserConcernEntity userConcernEntity);
    /**
     * 获取已关注的人数
     */
    public int getConcernByUserId(int userId);
}
