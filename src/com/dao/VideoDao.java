package com.dao;

import com.beans.CommentVideoEntity;
import com.beans.VideoEntity;
import com.beans.VideoScoreEntity;
import com.forms.VideoPackageForm;

import java.util.List;

/**
 * Created by Benson on 2017/3/10.
 */
public interface VideoDao {
    public boolean saveVideo( VideoEntity videoEntity );
    public VideoEntity findVideoByTitle( VideoEntity videoEntity );
    public List<VideoEntity> findVideoByHql(int userId , String order );
    public VideoEntity findVideoByVideoId( int videoId );
    public boolean updateVideo( VideoEntity videoEntity );
    public int getVideoAlbumNum( int userId );
    public List getHotList(String theme,int limitNum);
    public List getBarrageList(int limitNum);
    public String getAvgScoreByVideoId(int videoId);
    public List getCommentVideoByCVId(int commentVideoId);
    public List<CommentVideoEntity> getCommentVideo();
    public boolean saveCommentVideo( CommentVideoEntity commentVideoEntity );
    public boolean saveVideoScore( VideoScoreEntity videoScoreEntity );
}
