package com.daoImpl;

import com.beans.AlbumEntity;
import com.dao.AlbumDao;
import org.hibernate.FlushMode;
import org.hibernate.HibernateException;
import org.springframework.orm.hibernate4.support.HibernateDaoSupport;

import java.util.List;

/**
 * Created by Benson on 2017/2/21.
 */
public class AlbumDaoImpl extends HibernateDaoSupport implements AlbumDao {
    @Override
    public boolean saveAlbum(AlbumEntity albumEntity) {
        //设置为读写状态
        try {
            this.getHibernateTemplate().getSessionFactory().getCurrentSession().setFlushMode(FlushMode.AUTO);
            this.getHibernateTemplate().save(albumEntity);
        } catch ( HibernateException e ){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public AlbumEntity findAlbum(AlbumEntity albumEntity) {
        String Hql = "from AlbumEntity where userId = ? and title = ?";
        List<AlbumEntity> list = (List<AlbumEntity>) this.getHibernateTemplate().find(Hql,albumEntity.getUserId(),albumEntity.getTitle());
        if( list.size() > 0 ){
            return list.get(0);
        }else{
            return null;
        }
    }

    @Override
    public List<AlbumEntity> findAlbumByHql(int userId, String order) {
        String Hql = "from AlbumEntity where userId = ? order by createTime "+ order;
        List<AlbumEntity> list = (List<AlbumEntity>) this.getHibernateTemplate().find(Hql,userId);
        if( list.size() > 0 ){
            return list;
        }else{
            return null;
        }
    }

    @Override
    public List<AlbumEntity> findAlbumByGoodLevel() {
        String Hql = "from AlbumEntity order by good desc";
        List<AlbumEntity> list = (List<AlbumEntity>) this.getHibernateTemplate().find(Hql);
        if( list.size() > 0 ){
            return list;
        }else{
            return null;
        }
    }

    @Override
    public AlbumEntity findAlbumByAlbumId(int albumId) {
        String Hql = "from AlbumEntity where albumId = ?";
        List<AlbumEntity> list = (List<AlbumEntity>) this.getHibernateTemplate().find(Hql,albumId);
        if( list.size() > 0 ){
            return list.get(0);
        }else{
            return null;
        }
    }

    @Override
    public boolean updateAlbum(AlbumEntity albumEntity) {
        //设置为读写状态
        try {
            this.getHibernateTemplate().getSessionFactory().getCurrentSession().setFlushMode(FlushMode.AUTO);
            this.getHibernateTemplate().update(albumEntity);
        } catch (HibernateException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public int getAlbumNum(int userId) {
        String Hql = "from AlbumEntity where userId = ?";
        List<AlbumEntity> list = (List<AlbumEntity>) this.getHibernateTemplate().find(Hql,userId);
        return list.size();
    }
}
