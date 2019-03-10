package com.service;

import com.beans.CommentVideoEntity;
import com.beans.VideoEntity;
import com.beans.VideoScoreEntity;
import com.forms.PageForm;
import com.forms.VideoPackageForm;

import java.util.List;

/**
 * Created by Benson on 2017/3/10.
 */
public interface VideoService {
    /**
     * 保存视频信息
     */
    public boolean saveVideo(VideoEntity videoEntity);

    /**
     * 根据标题查找视频信息
     */
    public VideoEntity findVideoByTitle(VideoEntity videoEntity);

    /**
     * 更新视频
     */
    public boolean updateVideo(VideoEntity videoEntity);

    /**
     * 根据用户ID查询视频，并且进行排序
     */
    public List<VideoEntity> findVideoByHql(int userId , String order );

    /**
     * 根据视频ID查询视频
     */
    public VideoEntity findVideoByVideoId(int videoId);

    /**
     * 根据视频信息查询视频下的所有视频名称,并进行视频对象的重新封装
     */
    public VideoPackageForm findVideoInfoName(VideoEntity videoEntity );

    /**
     * 分页查询
     * @param pageSize  每页显示多少记录
     * @param page 当前页
     * @return 封装了分页信息的bean
     */
    public PageForm queryForPageByVideo(int pageSize, int page, String hql);

    /**
     * 分页查询
     * @param pageSize  每页显示多少记录
     * @param page 当前页
     * @return 封装了分页信息的bean
     */
    public PageForm queryForPageByVideoSql(int pageSize, int page, String sql);

    /**
     * 分页查询(查询评论)
     * @param pageSize  每页显示多少记录
     * @param page 当前页
     * @return 封装了分页信息的bean
     */
    public PageForm queryForPageByCommentVideo(int pageSize, int page, String hql);
    /**
     * 获取用户下的视频数量
     */
    public int getVideoAlbumNum( int userId );

    /**
     * 根据视频信息查找一张视频专辑图片名称进行返回
     */
    public String getVideoPackageAboutPictureName( VideoPackageForm videoPackageForm);

    /**
     *查询分数最高，且指定theme和limit的结果集
     */
    public List getHotList(String theme,int limitNum);

    /**
     *查询弹幕数量最高，且指定limit的结果集
     */
    public List getBarrageList(int limitNum);

    /**
     * 通过视频ID获取平均分数
     */
    public String getAvgScoreByVideoId( int videoId );

    /**
     * 通过评论ID去查找孩子评论
     */
    public List getCommentVideoByCVId( int commentVideoId );

    /**
     * 获取视频所有顶级评论
     */
    public List<CommentVideoEntity> getCommentVideo();

    /**
     * 保存视频评论
     */
    public boolean saveCommentVideo(CommentVideoEntity commentVideoEntity);

    /**
     * 保存视频评分
     */
    public boolean saveVideoScore(VideoScoreEntity videoScoreEntity);
}
