package com.action;

import com.beans.CommentVideoEntity;
import com.beans.UserEntity;
import com.beans.VideoEntity;
import com.beans.VideoScoreEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.forms.PageForm;
import com.forms.VideoPackageForm;
import com.opensymphony.xwork2.ActionSupport;
import com.service.BarrageService;
import com.service.SessionService;
import com.service.UserService;
import com.service.VideoService;
import org.springframework.beans.BeanUtils;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Benson on 2017/3/10.
 */
public class VideoAction extends ActionSupport {
    private static final long serialVersionUID = 1L;
    private PageForm pageForm;
    private CommentVideoEntity commentVideoEntity;
    private VideoEntity videoEntity;
    private VideoScoreEntity videoScoreEntity;
    private VideoService videoService;
    private SessionService sessionService;
    private UserService userService;
    private String limit;
    private String result;

    public PageForm getPageForm() {
        return pageForm;
    }

    public void setPageForm(PageForm pageForm) {
        this.pageForm = pageForm;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public CommentVideoEntity getCommentVideoEntity() {
        return commentVideoEntity;
    }

    public void setCommentVideoEntity(CommentVideoEntity commentVideoEntity) {
        this.commentVideoEntity = commentVideoEntity;
    }

    public VideoEntity getVideoEntity() {
        return videoEntity;
    }

    public void setVideoEntity(VideoEntity videoEntity) {
        this.videoEntity = videoEntity;
    }

    public VideoScoreEntity getVideoScoreEntity() {
        return videoScoreEntity;
    }

    public void setVideoScoreEntity(VideoScoreEntity videoScoreEntity) {
        this.videoScoreEntity = videoScoreEntity;
    }

    public VideoService getVideoService() {
        return videoService;
    }

    public void setVideoService(VideoService videoService) {
        this.videoService = videoService;
    }

    public SessionService getSessionService() {
        return sessionService;
    }

    public void setSessionService(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    public UserService getUserService() {
        return userService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    public String getLimit() {
        return limit;
    }

    public void setLimit(String limit) {
        this.limit = limit;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    /**
     * 保存视频信息
     * @return
     * @throws Exception
     */
    public String saveVideoAction() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        UserEntity existUserEntity = (UserEntity)sessionService.session_Get("user");
        if( existUserEntity == null ){
            sessionService.session_Del("video");
            map.put("status","F");
            map.put("msg","未登录，不能上传");
        }else {
            if( existUserEntity.getUserId() != 1 ){
                map.put("status", "F");
                map.put("msg", "您不具有上传权限！");
                result = objectMapper.writeValueAsString(map);
                return "Video";
            }
            videoEntity.setUserId(existUserEntity.getUserId());
            Timestamp dateTime = new Timestamp(System.currentTimeMillis());
            videoEntity.setCreateTime(dateTime);
            VideoEntity existVideoEntity = videoService.findVideoByTitle(videoEntity);//查找是否已存在该视频专辑了
            if ( existVideoEntity != null) {
                existVideoEntity.setVideoIntroduction(videoEntity.getVideoIntroduction());
                existVideoEntity.setLabel(videoEntity.getLabel());
                existVideoEntity.setRegion(videoEntity.getRegion());
                existVideoEntity.setTheme(videoEntity.getTheme());
                existVideoEntity.setVideoNum((Integer.parseInt(videoEntity.getVideoNum()) + Integer.parseInt(existVideoEntity.getVideoNum()) ) + "");
                if (videoService.updateVideo(existVideoEntity)) {   //更新视频信息
                    map.put("video", existVideoEntity);
                    sessionService.session_Put(map);
                    map.put("status", "S");
                    map.put("msg", "上传成功");
                } else {
                    sessionService.session_Del("video");
                    map.put("status", "F");
                    map.put("msg", "上传失败");
                }
            } else {
                videoEntity.setBarrageNum("0");
                videoEntity.setPlayNum("0");
                if (videoService.saveVideo(videoEntity)) {  //保存视频信息
                    //获取用户下的视频专辑数量
                    int videoNum = videoService.getVideoAlbumNum(existUserEntity.getUserId());
                    //更新用户信息的视频专辑数量
                    existUserEntity.setVideoNum( videoNum + "");
                    userService.modifyUserInfo(existUserEntity);
                    existVideoEntity = videoService.findVideoByTitle(videoEntity);//查找是否已存在该视频专辑了
                    //默认一个评分
                    VideoScoreEntity videoScoreEntity = new VideoScoreEntity();
                    videoScoreEntity.setRefereeId(existUserEntity.getUserId());
                    videoScoreEntity.setRefereeName(existUserEntity.getName());
                    videoScoreEntity.setCreateTime(new Timestamp(System.currentTimeMillis()));
                    videoScoreEntity.setScore(5.0);
                    videoScoreEntity.setUserId(existUserEntity.getUserId());
                    videoScoreEntity.setVideoId(existVideoEntity.getVideoId());
                    videoService.saveVideoScore(videoScoreEntity);
                    map.put("video", videoEntity);
                    sessionService.session_Put(map);
                    map.put("status", "S");
                    map.put("msg", "上传成功");
                } else {
                    sessionService.session_Del("video");
                    map.put("status", "F");
                    map.put("msg", "上传失败");
                }
            }
        }
        result = objectMapper.writeValueAsString(map);
        return "Video";
    }
    /**
     * 通过用户Id获取完整的视频信息，并按时间降序
     * @return
     * @throws Exception
     */
    public String getVideoAllByIdDesc() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        //获取用户下的所有相册信息，并按时间降序
        List<VideoEntity> videos = videoService.findVideoByHql( videoEntity.getUserId(), "desc" );
        if( videos == null ){
            map.put("status","F");
            map.put("msg","没有视频数据");
            map.put("videoPackageForms",new ArrayList<>());
        }else{
            List<VideoPackageForm> videoPackageForms = new ArrayList<VideoPackageForm>();
            for ( int i = 0 ; i < videos.size() ; i++ ){
                VideoPackageForm videoPackageForm = videoService.findVideoInfoName(videos.get(i));
                if( videoPackageForm != null ){
                    videoPackageForms.add(videoPackageForm);
                }
            }
            map.put("status","S");
            map.put("msg","查询成功");
            map.put("videoPackageForms",videoPackageForms);
        }
        result = objectMapper.writeValueAsString(map);
        return "Video";
    }
    /**
     * 根据用户ID分页获取视频内容
     * @return
     * @throws Exception
     */
    public String getVideoPageByUserId() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        int userId = videoEntity.getUserId();
        if( (userId+"").length() <= 0 ){
            map.put("status","F");
            map.put("msg","未登录");
        }else {
            String Hql = "from VideoEntity where userId=" + userId;
            pageForm = videoService.queryForPageByVideo(pageForm.getPageSize(), pageForm.getCurrentPage(), Hql);
            List<VideoPackageForm> videoPackageForms = new ArrayList<>();
            for( int i = 0 ; i < pageForm.getListVideo().size() ; i++ ){
                videoPackageForms.add(videoService.findVideoInfoName(pageForm.getListVideo().get(i)));
            }
            map.put("status","S");
            map.put("msg","查询成功");
            map.put("videoPackageForms",videoPackageForms);
            map.put("allRow",pageForm.getAllRow());
            map.put("totalPage",pageForm.getTotalPage());
            map.put("currentPage",pageForm.getCurrentPage());
            map.put("pageSize",pageForm.getPageSize());
        }
        result = objectMapper.writeValueAsString(map);
        return "Video";
    }
    /**
     * 通过视频标题进行分页模糊查询
     * @return
     * @throws Exception
     */
    public String getVideoPageByTitle() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        String Hql = "from VideoEntity where title like '%" + videoEntity.getTitle() + "%'";
        pageForm = videoService.queryForPageByVideo(pageForm.getPageSize(), pageForm.getCurrentPage(),Hql);
        List<VideoPackageForm> videoPackageForms = new ArrayList<>();
        for( int i = 0 ; i < pageForm.getListVideo().size() ; i++ ){
            VideoPackageForm videoPackageForm = videoService.findVideoInfoName(pageForm.getListVideo().get(i));
            UserEntity userEntity = new UserEntity();
            userEntity.setUserId(videoPackageForm.getUserId());
            userEntity = userService.findUserByUserId(userEntity);
            videoPackageForm.setUserName(userEntity.getName());
            videoPackageForms.add(videoPackageForm);
        }
        map.put("status","S");
        map.put("msg","查询成功");
        map.put("videoPackageForms",videoPackageForms);
        map.put("allRow",pageForm.getAllRow());
        map.put("totalPage",pageForm.getTotalPage());
        map.put("currentPage",pageForm.getCurrentPage());
        map.put("pageSize",pageForm.getPageSize());
        result = objectMapper.writeValueAsString(map);
        return "Video";
    }
    /**
     * 查询分数最高，且指定theme和limit的结果集
     */
    public String getHotList() throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        List list = videoService.getHotList(videoEntity.getTheme(),Integer.parseInt(limit));
        List<VideoPackageForm> videoPackageForms = new ArrayList<>();
        for( int i = 0 ; i < list.size() ; i ++ ){
            VideoPackageForm videoPackageForm = new VideoPackageForm();
            Object[] objectList =  (Object[])list.get(i);
            videoPackageForm.setVideoId(Integer.parseInt(objectList[0].toString()));
            videoPackageForm.setRegion(objectList[1].toString());
            videoPackageForm.setTheme(objectList[2].toString());
            videoPackageForm.setTitle(objectList[3].toString());
            videoPackageForm.setLabel(objectList[4].toString());
            videoPackageForm.setVideoIntroduction(objectList[5].toString());
            videoPackageForm.setVideoNum(objectList[6].toString());
            videoPackageForm.setPlayNum(objectList[7].toString());
            videoPackageForm.setBarrageNum(objectList[8].toString());
            videoPackageForm.setCreateTime((Timestamp) objectList[9]);
            videoPackageForm.setUserId(Integer.parseInt(objectList[10].toString()));
            videoPackageForm.setScore(objectList[11].toString());
            videoPackageForm.setPictureName(videoService.getVideoPackageAboutPictureName(videoPackageForm));
            UserEntity userEntity = new UserEntity();
            userEntity.setUserId(videoPackageForm.getUserId());
            userEntity = userService.findUserByUserId(userEntity);
            videoPackageForm.setUserName(userEntity.getName());
            videoPackageForms.add(videoPackageForm);
        }
        map.put("videoPackageForms",videoPackageForms);
        map.put("status","S");
        map.put("msg","查询成功");
        result = objectMapper.writeValueAsString(map);
        return "Video";
    }
    /**
     * 查询弹幕数量最多，且指定limit的结果集
     */
    public String getBarrageList() throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        List list = videoService.getBarrageList(Integer.parseInt(limit));
        List<VideoPackageForm> videoPackageForms = new ArrayList<>();
        for( int i = 0 ; i < list.size() ; i ++ ){
            VideoPackageForm videoPackageForm = new VideoPackageForm();
            Object[] objectList =  (Object[])list.get(i);
            videoPackageForm.setVideoId(Integer.parseInt(objectList[0].toString()));
            videoPackageForm.setRegion(objectList[1].toString());
            videoPackageForm.setTheme(objectList[2].toString());
            videoPackageForm.setTitle(objectList[3].toString());
            videoPackageForm.setLabel(objectList[4].toString());
            videoPackageForm.setVideoIntroduction(objectList[5].toString());
            videoPackageForm.setVideoNum(objectList[6].toString());
            videoPackageForm.setPlayNum(objectList[7].toString());
            videoPackageForm.setBarrageNum(objectList[8].toString());
            videoPackageForm.setCreateTime((Timestamp) objectList[9]);
            videoPackageForm.setUserId(Integer.parseInt(objectList[10].toString()));
            videoPackageForm.setScore(objectList[11].toString());
            videoPackageForm.setPictureName(videoService.getVideoPackageAboutPictureName(videoPackageForm));
            UserEntity userEntity = new UserEntity();
            userEntity.setUserId(videoPackageForm.getUserId());
            userEntity = userService.findUserByUserId(userEntity);
            videoPackageForm.setUserName(userEntity.getName());
            videoPackageForms.add(videoPackageForm);
        }
        map.put("videoPackageForms",videoPackageForms);
        map.put("status","S");
        map.put("msg","查询成功");
        result = objectMapper.writeValueAsString(map);
        return "Video";
    }
    /**
     * 通过视频类型和地区进行分页模糊查询
     * @return
     * @throws Exception
     */
    public String getVideoPageBySql() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        String Sql = "SELECT v.*,FORMAT(vs.score,1) score " +
        "FROM video v," +
        "(SELECT AVG(score) score,videoId FROM videoScore GROUP BY videoId ) vs " +
        "WHERE v.videoId = vs.videoId AND v.theme LIKE '%" + videoEntity.getTheme() + "%' AND v.region LIKE  '%" + videoEntity.getRegion() + "%'" +
        "ORDER BY vs.score DESC ";
        pageForm = videoService.queryForPageByVideoSql(pageForm.getPageSize(), pageForm.getCurrentPage(),Sql);
        List<VideoPackageForm> videoPackageForms = new ArrayList<>();
        for( int i = 0 ; i < pageForm.getListSql().size() ; i++ ){
            VideoPackageForm videoPackageForm = new VideoPackageForm();
            Object[] objectList =  (Object[])pageForm.getListSql().get(i);
            videoPackageForm.setVideoId(Integer.parseInt(objectList[0].toString()));
            videoPackageForm.setRegion(objectList[1].toString());
            videoPackageForm.setTheme(objectList[2].toString());
            videoPackageForm.setTitle(objectList[3].toString());
            videoPackageForm.setLabel(objectList[4].toString());
            videoPackageForm.setVideoIntroduction(objectList[5].toString());
            videoPackageForm.setVideoNum(objectList[6].toString());
            videoPackageForm.setPlayNum(objectList[7].toString());
            videoPackageForm.setBarrageNum(objectList[8].toString());
            videoPackageForm.setCreateTime((Timestamp) objectList[9]);
            videoPackageForm.setUserId(Integer.parseInt(objectList[10].toString()));
            videoPackageForm.setScore(objectList[11].toString());
            videoPackageForm.setPictureName(videoService.getVideoPackageAboutPictureName(videoPackageForm));
            videoPackageForms.add(videoPackageForm);
        }
        map.put("status","S");
        map.put("msg","查询成功");
        map.put("videoPackageForms",videoPackageForms);
        map.put("allRow",pageForm.getAllRow());
        map.put("totalPage",pageForm.getTotalPage());
        map.put("currentPage",pageForm.getCurrentPage());
        map.put("pageSize",pageForm.getPageSize());
        result = objectMapper.writeValueAsString(map);
        return "Video";
    }
    /**
     * 通过视频ID获取视频的基本信息和分数
     * @return
     * @throws Exception
     */
    public String getVideoByVideoId() throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        videoEntity = videoService.findVideoByVideoId(videoEntity.getVideoId());
        if( videoEntity == null ){
            map.put("status","F");
            map.put("msg","未找到视频");
        }else{
            VideoPackageForm videoPackageForm = videoService.findVideoInfoName(videoEntity);
            videoPackageForm.setScore(videoService.getAvgScoreByVideoId(videoEntity.getVideoId()));
            UserEntity userEntity = new UserEntity();
            userEntity.setUserId(videoPackageForm.getUserId());
            userEntity = userService.findUserByUserId(userEntity);
            videoPackageForm.setUserName(userEntity.getName());
            map.put("videoPackageForm",videoPackageForm);
            map.put("status","S");
            map.put("msg","查询成功");
        }
        result = objectMapper.writeValueAsString(map);
        return "Video";
    }

    /**
     * 获取视频评论,根据videoId
     * @return
     * @throws Exception
     */
    public String getCommentVideoPageByVideoId() throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        String Hql = "from CommentVideoEntity where videoId="+commentVideoEntity.getVideoId()+" and parentId=0 order by createTime desc";
        pageForm = videoService.queryForPageByCommentVideo(pageForm.getPageSize(), pageForm.getCurrentPage(),Hql);
        List<List> commentVideoChild = new ArrayList<>();
        for( int i = 0 ; i < pageForm.getListCommentVideo().size() ; i++ ){
            commentVideoChild.add(videoService.getCommentVideoByCVId(pageForm.getListCommentVideo().get(i).getCommentVideoId()));
        }
        map.put("status","S");
        map.put("msg","查询成功");
        map.put("commentVideo",pageForm.getListCommentVideo());
        map.put("commentVideoChild",commentVideoChild);
        map.put("allRow",pageForm.getAllRow());
        map.put("totalPage",pageForm.getTotalPage());
        map.put("currentPage",pageForm.getCurrentPage());
        map.put("pageSize",pageForm.getPageSize());
        result = objectMapper.writeValueAsString(map);
        return "Video";
    }

    /**
     * 获取视频所有顶级评论
     * @return
     * @throws Exception
     */
    public String getCommentVideo() throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        List<CommentVideoEntity> commentVideo = videoService.getCommentVideo();
        List<VideoEntity> videoEntityList = new ArrayList<>();
        for( int i = 0 ; i < commentVideo.size() ; i ++ ){
            videoEntityList.add(videoService.findVideoByVideoId(commentVideo.get(i).getVideoId()));
        }
        if( commentVideo == null ){
            map.put("status","F");
            map.put("msg","没有评论数据");
            map.put("commentVideo",new ArrayList<>());
            map.put("videoEntityList",new ArrayList<>());
        }else{
            map.put("status","S");
            map.put("msg","查询成功");
            map.put("commentVideo",commentVideo);
            map.put("videoEntityList",videoEntityList);
        }
        result = objectMapper.writeValueAsString(map);
        return "Video";
    }

    /**
     * 保存评论
     * @return
     * @throws Exception
     */
    public String saveCommentVideo() throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        UserEntity existUserEntity = (UserEntity)sessionService.session_Get("user");
        if( existUserEntity == null ){
            commentVideoEntity.setReplyId(-1);
            commentVideoEntity.setReplyName("游客");
        }else{
            commentVideoEntity.setReplyId(existUserEntity.getUserId());
            commentVideoEntity.setReplyName(existUserEntity.getName());
        }
        commentVideoEntity.setCreateTime(new Timestamp(System.currentTimeMillis()));
        if( commentVideoEntity.getBeReplyId() == null ){
            //评论
            commentVideoEntity.setParentId(0);
        }else{
            //回复
        }
        if (videoService.saveCommentVideo(commentVideoEntity)){
            map.put("status","S");
            map.put("msg","评论成功");
        }else {
            map.put("status","F");
            map.put("msg","评论失败");
        }
        result = objectMapper.writeValueAsString(map);
        return "Video";
    }

    /**
     * 评分
     * @return
     * @throws Exception
     */
    public String saveVideoScore() throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        UserEntity existUserEntity = (UserEntity)sessionService.session_Get("user");
        if( existUserEntity == null ){
            videoScoreEntity.setRefereeId(-1);
            videoScoreEntity.setRefereeName("游客");
        }else{
            videoScoreEntity.setRefereeId(existUserEntity.getUserId());
            videoScoreEntity.setRefereeName(existUserEntity.getName());
        }
        videoScoreEntity.setCreateTime(new Timestamp(System.currentTimeMillis()));
        if(videoService.saveVideoScore(videoScoreEntity)){
            map.put("status","S");
            map.put("msg","评分成功");
        }else{
            map.put("status","F");
            map.put("msg","评分失败");
        }
        result = objectMapper.writeValueAsString(map);
        return "Video";
    }
}
