package com.daoImpl;

import com.beans.CommentVideoEntity;
import com.beans.VideoEntity;
import com.beans.VideoScoreEntity;
import com.dao.VideoDao;
import com.forms.VideoPackageForm;
import org.hibernate.FlushMode;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate4.support.HibernateDaoSupport;

import java.util.List;

/**
 * Created by Benson on 2017/3/10.
 */
public class VideoDaoImpl extends HibernateDaoSupport implements VideoDao{
    @Override
    public boolean saveVideo(VideoEntity videoEntity) {
        //设置为读写状态
        try {
            this.getHibernateTemplate().getSessionFactory().getCurrentSession().setFlushMode(FlushMode.AUTO);
            this.getHibernateTemplate().save(videoEntity);
        } catch ( HibernateException e ){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public VideoEntity findVideoByTitle(VideoEntity videoEntity) {
        String Hql = "from VideoEntity where userId = ? and title = ?";
        List<VideoEntity> list = (List<VideoEntity>) this.getHibernateTemplate().find(Hql,videoEntity.getUserId(),videoEntity.getTitle());
        if( list.size() > 0 ){
            return list.get(0);
        }else{
            return null;
        }
    }

    @Override
    public List<VideoEntity> findVideoByHql(int userId, String order) {
        String Hql = "from VideoEntity where userId = ? order by createTime "+ order;
        List<VideoEntity> list = (List<VideoEntity>) this.getHibernateTemplate().find(Hql,userId);
        if( list.size() > 0 ){
            return list;
        }else{
            return null;
        }
    }

    @Override
    public VideoEntity findVideoByVideoId(int videoId) {
        String Hql = "from VideoEntity where videoId = ?";
        List<VideoEntity> list = (List<VideoEntity>) this.getHibernateTemplate().find(Hql,videoId);
        if( list.size() > 0 ){
            return list.get(0);
        }else{
            return null;
        }
    }

    @Override
    public boolean updateVideo(VideoEntity videoEntity) {
        //设置为读写状态
        try {
            this.getHibernateTemplate().getSessionFactory().getCurrentSession().setFlushMode(FlushMode.AUTO);
            this.getHibernateTemplate().update(videoEntity);
        } catch (HibernateException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public int getVideoAlbumNum(int userId) {
        String Hql = "from VideoEntity where userId = ?";
        List<VideoEntity> list = (List<VideoEntity>) this.getHibernateTemplate().find(Hql,userId);
        return list.size();
    }

    @Override
    public List getHotList(String theme,int limitNum) {
        String Hql = "SELECT v.*,ifnull(FORMAT(vs.score,1),5.0) score " +
                "FROM video v LEFT JOIN " +
                "(SELECT AVG(score) score,videoId FROM videoScore GROUP BY videoId ) vs ON v.videoId = vs.videoId " +
                "WHERE v.theme LIKE '%" + theme + "%' "+
                "ORDER BY vs.score DESC LIMIT " + limitNum;
        Session session = this.getHibernateTemplate().getSessionFactory().getCurrentSession();
        Query q = session.createSQLQuery(Hql);
        List list = q.list();
        return list;
    }

    @Override
    public List getBarrageList(int limitNum) {
        String Hql = "SELECT v.*,ifnull(FORMAT(vs.score,1),5.0) score " +
                "FROM video v LEFT JOIN " +
                "(SELECT AVG(score) score,videoId FROM videoScore GROUP BY videoId ) vs ON v.videoId = vs.videoId " +
                "ORDER BY v.barrageNum DESC LIMIT " + limitNum;
        Session session = this.getHibernateTemplate().getSessionFactory().getCurrentSession();
        Query q = session.createSQLQuery(Hql);
        List list = q.list();
        return list;
    }

    @Override
    public String getAvgScoreByVideoId(int videoId) {
        String Hql = "SELECT FORMAT(AVG(score),1) score FROM videoScore vs WHERE vs.videoId = " + videoId + " GROUP BY videoId";
        Session session = this.getHibernateTemplate().getSessionFactory().getCurrentSession();
        Query q = session.createSQLQuery(Hql);
        List list = q.list();
        if( list.size() > 0 ){
            return (String)list.get(0);
        }else{
            return "5.0";
        }
    }

    @Override
    public List getCommentVideoByCVId(int commentVideoId) {
        String Hql = "from CommentVideoEntity where parentId = ?";
        List<CommentVideoEntity> list = (List<CommentVideoEntity>) this.getHibernateTemplate().find(Hql,commentVideoId);
        if( list.size() > 0 ){
            return list;
        }else{
            return null;
        }
    }

    @Override
    public List<CommentVideoEntity> getCommentVideo() {
        String Hql = "from CommentVideoEntity where parentId=0 order by createTime desc";
        List<CommentVideoEntity> list = (List<CommentVideoEntity>) this.getHibernateTemplate().find(Hql);
        if( list.size() > 0 ){
            return list;
        }else{
            return null;
        }
    }

    @Override
    public boolean saveCommentVideo(CommentVideoEntity commentVideoEntity) {
        //设置为读写状态
        try {
            this.getHibernateTemplate().getSessionFactory().getCurrentSession().setFlushMode(FlushMode.AUTO);
            this.getHibernateTemplate().save(commentVideoEntity);
        } catch ( HibernateException e ){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public boolean saveVideoScore(VideoScoreEntity videoScoreEntity) {
        //设置为读写状态
        try {
            this.getHibernateTemplate().getSessionFactory().getCurrentSession().setFlushMode(FlushMode.AUTO);
            this.getHibernateTemplate().save(videoScoreEntity);
        } catch ( HibernateException e ){
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
