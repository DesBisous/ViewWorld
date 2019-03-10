package com.daoImpl;

import com.beans.SuggestionBoxEntity;
import com.dao.SuggestionBoxDao;
import org.hibernate.FlushMode;
import org.hibernate.HibernateException;
import org.springframework.orm.hibernate4.support.HibernateDaoSupport;

import java.util.List;

/**
 * Created by Benson on 2017/2/19.
 */
public class SuggestionBoxDaoImpl extends HibernateDaoSupport implements SuggestionBoxDao{
    @Override
    public boolean saveSuggestionBox(SuggestionBoxEntity suggestionBoxEntity) {
        //设置为读写状态
        try {
            this.getHibernateTemplate().getSessionFactory().getCurrentSession().setFlushMode(FlushMode.AUTO);
            this.getHibernateTemplate().save(suggestionBoxEntity);
        } catch ( HibernateException e ){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public List<SuggestionBoxEntity> findSugBoxByTypeAndUserId(SuggestionBoxEntity suggestionBoxEntity) {
        String Hql = "from SuggestionBoxEntity where userId = ? and type = ?";
        List<SuggestionBoxEntity> list = (List<SuggestionBoxEntity>) this.getHibernateTemplate().find(Hql,suggestionBoxEntity.getUserId(),suggestionBoxEntity.getType());
        if( list.size() > 0 ){
            return list;
        }else{
            return null;
        }
    }
}
