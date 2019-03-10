package com.service;

import java.util.List;
import java.util.Map;

/**
 * Created by Benson on 2017/2/9.
 */
public interface SessionService {
    /**
     * 压入Session对象
     */
    public void session_Put( Map map )  throws Exception;
    /**
     * 获取Session对象
     */
    public Object session_Get( String key )  throws Exception;
    /**
     * 删除Session对象
     */
    public void session_Del( String key )  throws Exception;
}
