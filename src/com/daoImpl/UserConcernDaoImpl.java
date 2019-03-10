package com.daoImpl;

import com.beans.UserConcernEntity;
import com.beans.UserEntity;
import com.dao.UserConcernDao;
import org.hibernate.FlushMode;
import org.hibernate.HibernateException;
import org.springframework.orm.hibernate4.support.HibernateDaoSupport;

import java.util.List;

/**
 * Created by Benson on 2017/2/20.
 */
public class UserConcernDaoImpl extends HibernateDaoSupport implements UserConcernDao {
    @Override
    public List<UserConcernEntity> findUserConcernByUserId(UserConcernEntity userConcernEntity) {
        String Hql = "from UserConcernEntity where userId = ?";
        List<UserConcernEntity> list = (List<UserConcernEntity>) this.getHibernateTemplate().find(Hql,userConcernEntity.getUserId());
        if( list.size() > 0 ){
            return list;
        }else{
            return null;
        }
    }

    @Override
    public boolean saveUserConcern(UserConcernEntity userConcernEntity) {
        //设置为读写状态
        try {
            this.getHibernateTemplate().getSessionFactory().getCurrentSession().setFlushMode(FlushMode.AUTO);
            this.getHibernateTemplate().save(userConcernEntity);
        } catch (HibernateException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public boolean existByUserIdAndConcernId(int userId, int concernId) {
        String Hql = "from UserConcernEntity where userId = ? and concernId = ?";
        List<UserConcernEntity> list = (List<UserConcernEntity>) this.getHibernateTemplate().find(Hql,userId,concernId);
        if( list.size() > 0 ){
            return true;
        }else{
            return false;
        }
    }

    @Override
    public int getConcernByUserId(int userId) {
        String Hql = "from UserConcernEntity where userId = ?";
        List<UserConcernEntity> list = (List<UserConcernEntity>) this.getHibernateTemplate().find(Hql,userId);
        return list.size();
    }
}
