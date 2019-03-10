package com.serviceImpl;

import com.opensymphony.xwork2.ActionContext;
import com.service.SessionService;

import java.util.Iterator;
import java.util.Map;
import java.util.Set;

/**
 * Created by Benson on 2017/2/9.
 */
public class SessionServiceImpl implements SessionService{
    @Override
    public void session_Put( Map map ) throws Exception {
        Set set = map.entrySet();
        Iterator it = set.iterator();
        while(it.hasNext()){
            Map.Entry me=(Map.Entry)it.next();
            ActionContext.getContext().getSession().put(me.getKey().toString(), me.getValue());
        }
    }

    @Override
    public Object session_Get( String key ) throws Exception {
        return ActionContext.getContext().getSession().get(key);
    }

    @Override
    public void session_Del( String key ) throws Exception {
        ActionContext.getContext().getSession().remove(key);
    }
}
