package com.daoImpl;

import com.beans.UserEntity;
import com.dao.UserDao;
import org.hibernate.FlushMode;
import org.hibernate.HibernateException;
import org.springframework.orm.hibernate4.support.HibernateDaoSupport;

import java.util.List;

/**
 * Created by Benson on 2017/2/9.
 */
public class UserDaoImpl extends HibernateDaoSupport implements UserDao {
    @Override
    public boolean saveUser(UserEntity userEntity) {
        //设置为读写状态
        try {
            this.getHibernateTemplate().getSessionFactory().getCurrentSession().setFlushMode(FlushMode.AUTO);
            this.getHibernateTemplate().save(userEntity);
        } catch (HibernateException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public UserEntity findUserByAccount(UserEntity userEntity) {
        String Hql = "from UserEntity where account = ?";
        List<UserEntity> list = (List<UserEntity>) this.getHibernateTemplate().find(Hql,userEntity.getAccount());
        if( list.size() > 0 ){
            return list.get(0);
        }else{
            return null;
        }
    }

    @Override
    public UserEntity findUserByAccountAndPassword(UserEntity userEntity) {
        String Hql = "from UserEntity where account = ? and password = ?";
        List<UserEntity> list = (List<UserEntity>) this.getHibernateTemplate().find(Hql,userEntity.getAccount(),userEntity.getPassword());
        if( list.size() > 0 ){
            return list.get(0);
        }else{
            return null;
        }
    }

    @Override
    public UserEntity findUserByUserId(UserEntity userEntity) {
        String Hql = "from UserEntity where userId = ?";
        List<UserEntity> list = (List<UserEntity>) this.getHibernateTemplate().find(Hql,userEntity.getUserId());
        if( list.size() > 0 ){
            return list.get(0);
        }else{
            return null;
        }
    }

    @Override
    public boolean updateUser(UserEntity userEntity) {
        //设置为读写状态
        try {
            this.getHibernateTemplate().getSessionFactory().getCurrentSession().setFlushMode(FlushMode.AUTO);
            this.getHibernateTemplate().update(userEntity);
        } catch (HibernateException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
