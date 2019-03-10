package com.dao;

import com.beans.AlbumEntity;
import com.beans.CommentVideoEntity;
import com.beans.VideoEntity;

import java.util.List;

/**
 * Created by Benson on 2017/2/23.
 */
public interface MemberDao {
    /**
     * 分页查询相册
     * @param hql  查询条件
     * @param offset  开始记录
     * @param length  一次查询几条记录
     * @return 查询的记录集合
     */
    public List<AlbumEntity> queryForPage(final String hql, final int offset, final int length);

    /**
     * 分页查询视频
     * @param hql  查询条件
     * @param offset  开始记录
     * @param length  一次查询几条记录
     * @return 查询的记录集合
     */
    public List<VideoEntity> queryForPageByVideo(final String hql, final int offset, final int length);

    /**
     * 分页查询视频
     * @param sql  查询条件
     * @param offset  开始记录
     * @param length  一次查询几条记录
     * @return 查询的记录集合
     */
    public List<VideoEntity> queryForPageByVideoSql(final String sql, final int offset, final int length);

    /**
     * 分页查询视频评论
     * @param hql  查询条件
     * @param offset  开始记录
     * @param length  一次查询几条记录
     * @return 查询的记录集合
     */
    public List<CommentVideoEntity> queryForPageByCommentVideo(final String hql, final int offset, final int length);

    /**
     * 查询所有的记录数
     * @param hql 查询条件
     * @return 总记录数
     */
    public int getAllRowCount(String hql);

    /**
     * 查询所有的记录数
     * @param sql 查询条件
     * @return 总记录数
     */
    public int getAllRowCountSql(String sql);
}
