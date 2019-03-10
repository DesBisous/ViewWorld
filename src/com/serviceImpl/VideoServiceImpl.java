package com.serviceImpl;

import com.beans.CommentVideoEntity;
import com.beans.VideoEntity;
import com.beans.VideoScoreEntity;
import com.dao.MemberDao;
import com.dao.VideoDao;
import com.forms.PageForm;
import com.forms.VideoPackageForm;
import com.service.VideoService;
import org.apache.struts2.ServletActionContext;
import org.springframework.beans.BeanUtils;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Benson on 2017/3/10.
 */
public class VideoServiceImpl  implements VideoService{
    private VideoDao videoDao;
    private MemberDao memberDao;

    public VideoDao getVideoDao() {
        return videoDao;
    }

    public void setVideoDao(VideoDao videoDao) {
        this.videoDao = videoDao;
    }

    public MemberDao getMemberDao() {
        return memberDao;
    }

    public void setMemberDao(MemberDao memberDao) {
        this.memberDao = memberDao;
    }

    @Override
    public boolean saveVideo(VideoEntity videoEntity) {
        return videoDao.saveVideo(videoEntity);
    }

    @Override
    public VideoEntity findVideoByTitle(VideoEntity videoEntity) {
        return videoDao.findVideoByTitle(videoEntity);
    }

    @Override
    public boolean updateVideo(VideoEntity videoEntity) {
        return videoDao.updateVideo(videoEntity);
    }

    @Override
    public List<VideoEntity> findVideoByHql(int userId, String order) {
        return videoDao.findVideoByHql( userId , order );
    }

    @Override
    public VideoEntity findVideoByVideoId(int videoId) {
        return videoDao.findVideoByVideoId(videoId);
    }

    @Override
    public VideoPackageForm findVideoInfoName(VideoEntity videoEntity) {
        VideoPackageForm videoPackageForm = new VideoPackageForm();
        BeanUtils.copyProperties(videoEntity,videoPackageForm);
        String albumPath = "/resources/video/"+videoPackageForm.getUserId()+"/"+videoPackageForm.getTitle()+"/";
        String path = ServletActionContext.getServletContext().getRealPath(albumPath);
        File filePath = new File(path);
        if(!filePath.exists()){
            return null;
        }else{
            //获取当前视频中的所有文件
            File[] listFiles =  filePath.listFiles();
            List<String> xmlNameList = new ArrayList<>();
            List<String> videoNameList = new ArrayList<>();
            for( int i = 0 ; i < listFiles.length ; i++ ){
                String name = listFiles[i].getName();
                int len = name.lastIndexOf(".");
                String type = name.substring(len);
                //判断获取到的文件是不是图片类型
                if( type.equals(".BMP")||type.equals(".PNG")||type.equals(".GIF")||type.equals(".JPG")||type.equals(".JPEG")||
                        type.equals(".bmp")||type.equals(".png")||type.equals(".gif")||type.equals(".jpg")||type.equals(".jpeg" ) ){
                    videoPackageForm.setPictureName(name);
                }
                //判断获取到的文件是不是视频类型
                if( type.equals(".mp4") || type.equals(".MP4") ){
                    videoNameList.add(name);
                }
                //判断获取到的文件是不是xml类型
                if( type.equals(".xml") || type.equals(".XML") ){
                    xmlNameList.add(name);
                }
            }
            videoPackageForm.setVideoNames(videoNameList);
            videoPackageForm.setVideoXMLNames(xmlNameList);
            return videoPackageForm;
        }
    }

    @Override
    public PageForm queryForPageByVideo(int pageSize, int page, String hql) {
        int allRow = memberDao.getAllRowCount(hql);  //总记录数
        int totalPage = PageForm.countTatalPage(pageSize, allRow); //总页数
        final int currentPage = PageForm.countCurrentPage(page,totalPage); // 当前页
        final int offset = PageForm.countOffset(pageSize, currentPage); //当前页开始记录
        final int length = pageSize; // 每页记录数
        List<VideoEntity> list = new ArrayList<>();
        if( allRow > 0 ){
            list = memberDao.queryForPageByVideo(hql, offset, length); //分页查询
        }
        PageForm pageForm  = new PageForm();
        pageForm.setPageSize(pageSize);
        pageForm.setCurrentPage(currentPage);
        pageForm.setAllRow(allRow);
        pageForm.setTotalPage(totalPage);
        pageForm.setListVideo(list);
        pageForm.init();
        return pageForm;
    }

    @Override
    public PageForm queryForPageByVideoSql(int pageSize, int page, String sql) {
        int allRow = memberDao.getAllRowCountSql(sql);  //总记录数
        int totalPage = PageForm.countTatalPage(pageSize, allRow); //总页数
        final int currentPage = PageForm.countCurrentPage(page,totalPage); // 当前页
        final int offset = PageForm.countOffset(pageSize, currentPage); //当前页开始记录
        final int length = pageSize; // 每页记录数
        List list = null;
        if( allRow > 0 ){
            list = memberDao.queryForPageByVideoSql(sql, offset, length); //分页查询
        }
        PageForm pageForm  = new PageForm();
        pageForm.setPageSize(pageSize);
        pageForm.setCurrentPage(currentPage);
        pageForm.setAllRow(allRow);
        pageForm.setTotalPage(totalPage);
        pageForm.setListSql(list);
        pageForm.init();
        return pageForm;
    }

    @Override
    public PageForm queryForPageByCommentVideo(int pageSize, int page, String hql) {
        int allRow = memberDao.getAllRowCount(hql);  //总记录数
        int totalPage = PageForm.countTatalPage(pageSize, allRow); //总页数
        final int currentPage = PageForm.countCurrentPage(page,totalPage); // 当前页
        final int offset = PageForm.countOffset(pageSize, currentPage); //当前页开始记录
        final int length = pageSize; // 每页记录数
        List<CommentVideoEntity> list = new ArrayList<>();
        if( allRow > 0 ){
            list = memberDao.queryForPageByCommentVideo(hql, offset, length); //分页查询
        }
        PageForm pageForm  = new PageForm();
        pageForm.setPageSize(pageSize);
        pageForm.setCurrentPage(currentPage);
        pageForm.setAllRow(allRow);
        pageForm.setTotalPage(totalPage);
        pageForm.setListCommentVideo(list);
        pageForm.init();
        return pageForm;
    }

    @Override
    public int getVideoAlbumNum(int userId) {
        return videoDao.getVideoAlbumNum(userId);
    }

    @Override
    public String getVideoPackageAboutPictureName(VideoPackageForm videoPackageForm) {
        String albumPath = "/resources/video/"+videoPackageForm.getUserId()+"/"+videoPackageForm.getTitle()+"/";
        String path = ServletActionContext.getServletContext().getRealPath(albumPath);
        File filePath = new File(path);
        if(!filePath.exists()){
            return null;
        }else{
            //获取当前视频中的所有文件
            File[] listFiles =  filePath.listFiles();
            for( int i = 0 ; i < listFiles.length ; i++ ){
                String name = listFiles[i].getName();
                int len = name.lastIndexOf(".");
                String type = name.substring(len);
                //判断获取到的文件是不是图片类型
                if( type.equals(".BMP")||type.equals(".PNG")||type.equals(".GIF")||type.equals(".JPG")||type.equals(".JPEG")||
                        type.equals(".bmp")||type.equals(".png")||type.equals(".gif")||type.equals(".jpg")||type.equals(".jpeg" ) ){
                    return name;
                }
            }
            return null;
        }
    }

    @Override
    public List getHotList(String theme, int limitNum) {
        return videoDao.getHotList(theme,limitNum);
    }

    @Override
    public List getBarrageList(int limitNum) {
        return videoDao.getBarrageList(limitNum);
    }

    @Override
    public String getAvgScoreByVideoId(int videoId) {
        return videoDao.getAvgScoreByVideoId(videoId);
    }

    @Override
    public List getCommentVideoByCVId(int commentVideoId) {
        return videoDao.getCommentVideoByCVId(commentVideoId);
    }

    @Override
    public List<CommentVideoEntity> getCommentVideo() {
        return videoDao.getCommentVideo();
    }

    @Override
    public boolean saveCommentVideo(CommentVideoEntity commentVideoEntity) {
        return videoDao.saveCommentVideo(commentVideoEntity);
    }

    @Override
    public boolean saveVideoScore(VideoScoreEntity videoScoreEntity) {
        return videoDao.saveVideoScore(videoScoreEntity);
    }
}
