package com.daoImpl;

import com.beans.WebsiteSuggestionsEntity;
import com.dao.WebsiteSugDao;
import org.hibernate.FlushMode;
import org.hibernate.HibernateException;
import org.springframework.orm.hibernate4.support.HibernateDaoSupport;

import java.util.List;

/**
 * Created by Benson on 2017/2/16.
 */
public class WebsiteSugDaoImpl extends HibernateDaoSupport implements WebsiteSugDao {
    @Override
    public boolean saveWebsiteSug(WebsiteSuggestionsEntity websiteSuggestionsEntity) {
        //设置为读写状态
        try {
            this.getHibernateTemplate().getSessionFactory().getCurrentSession().setFlushMode(FlushMode.AUTO);
            this.getHibernateTemplate().save(websiteSuggestionsEntity);
        } catch ( HibernateException e ){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public WebsiteSuggestionsEntity findWebsiteSugByBrief(WebsiteSuggestionsEntity websiteSuggestionsEntity) {
        String Hql = "from WebsiteSuggestionsEntity where websiteSugBrief = ?";
        List<WebsiteSuggestionsEntity> list = (List<WebsiteSuggestionsEntity>) this.getHibernateTemplate().find(Hql,websiteSuggestionsEntity.getWebsiteSugBrief());
        if( list.size() > 0 ){
            return list.get(0);
        }else{
            return null;
        }
    }
}
