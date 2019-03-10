package com.daoImpl;

import com.beans.AlbumEntity;
import com.beans.CommentVideoEntity;
import com.beans.VideoEntity;
import com.dao.MemberDao;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate4.support.HibernateDaoSupport;

import java.util.List;

/**
 * Created by Benson on 2017/2/23.
 */
public class MemberDaoImpl extends HibernateDaoSupport implements MemberDao {
    @Override
    public List<AlbumEntity> queryForPage(String hql, int offset, int length) {
        Session session = this.getHibernateTemplate().getSessionFactory().getCurrentSession();
        Query q = session.createQuery(hql);
        q.setFirstResult(offset);
        q.setMaxResults(length);
        List<AlbumEntity> list = q.list();
        return list;
    }

    @Override
    public List<VideoEntity> queryForPageByVideo(String hql, int offset, int length) {
        Session session = this.getHibernateTemplate().getSessionFactory().getCurrentSession();
        Query q = session.createQuery(hql);
        q.setFirstResult(offset);
        q.setMaxResults(length);
        List<VideoEntity> list = q.list();
        return list;
    }

    @Override
    public List queryForPageByVideoSql(String sql, int offset, int length) {
//        String Hql = "SELECT v.*,FORMAT(vs.score,1) score " +
//                "FROM video v," +
//                "(SELECT AVG(score) score,videoId FROM videoScore GROUP BY videoId ) vs " +
//                "WHERE v.videoId = vs.videoId AND v.theme LIKE '%" + theme + "%' AND v.region LIKE  '%" + region + "%'" +
//                "ORDER BY vs.score DESC ";
        Session session = this.getHibernateTemplate().getSessionFactory().getCurrentSession();
        Query q = session.createSQLQuery(sql);
        q.setFirstResult(offset);
        q.setMaxResults(length);
        List list = q.list();
        return list;
    }

    @Override
    public List<CommentVideoEntity> queryForPageByCommentVideo(String hql, int offset, int length) {
        Session session = this.getHibernateTemplate().getSessionFactory().getCurrentSession();
        Query q = session.createQuery(hql);
        q.setFirstResult(offset);
        q.setMaxResults(length);
        List<CommentVideoEntity> list = q.list();
        return list;
    }

    @Override
    public int getAllRowCount(String hql) {
        return this.getHibernateTemplate().find(hql).size();
    }

    @Override
    public int getAllRowCountSql(String sql) {
        Session session = this.getHibernateTemplate().getSessionFactory().getCurrentSession();
        Query q = session.createSQLQuery(sql);
        List list = q.list();
        return list.size();
    }
}
