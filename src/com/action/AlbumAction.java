package com.action;

import com.beans.AlbumEntity;
import com.beans.UserEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.forms.AlbumPackageForm;
import com.forms.PageForm;
import com.opensymphony.xwork2.ActionSupport;
import com.service.AlbumService;
import com.service.SessionService;
import com.service.UserService;
import org.springframework.beans.BeanUtils;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Benson on 2017/2/21.
 */
public class AlbumAction extends ActionSupport {
    private static final long serialVersionUID = 1L;
    private PageForm pageForm;
    private AlbumEntity albumEntity;
    private SessionService sessionService;
    private AlbumService albumService;
    private UserService userService;
    private String result;

    public AlbumService getAlbumService() {
        return albumService;
    }

    public void setAlbumService(AlbumService albumService) {
        this.albumService = albumService;
    }

    public AlbumEntity getAlbumEntity() {
        return albumEntity;
    }

    public void setAlbumEntity(AlbumEntity albumEntity) {
        this.albumEntity = albumEntity;
    }

    public SessionService getSessionService() {
        return sessionService;
    }

    public void setSessionService(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    public PageForm getPageForm() {
        return pageForm;
    }

    public void setPageForm(PageForm pageForm) {
        this.pageForm = pageForm;
    }

    public UserService getUserService() {
        return userService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    /**
     * 保存相册信息
     * @return
     * @throws Exception
     */
    public String saveAlbumAction() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        UserEntity existUserEntity = (UserEntity)sessionService.session_Get("user");
        if( existUserEntity == null ){
            sessionService.session_Del("album");
            map.put("status","F");
            map.put("msg","未登录，不能上传");
        }else {
            if( existUserEntity.getUserId() != 1 ){
                map.put("status", "F");
                map.put("msg", "您不具有上传权限！");
                result = objectMapper.writeValueAsString(map);
                return "Album";
            }
            albumEntity.setUserId(existUserEntity.getUserId());
            Timestamp dateTime = new Timestamp(System.currentTimeMillis());
            albumEntity.setCreateTime(dateTime);
            AlbumEntity existAlbumEntity = albumService.findAlbum(albumEntity);//查找是否已存在该相册了
            if (existAlbumEntity != null) {
                existAlbumEntity.setAlbumIntroduction(albumEntity.getAlbumIntroduction());
                existAlbumEntity.setAlbumNum((Integer.parseInt(albumEntity.getAlbumNum()) + Integer.parseInt(existAlbumEntity.getAlbumNum()) ) + "");
                existAlbumEntity.setTheme(albumEntity.getTheme());
                if (albumService.updateAlbum(existAlbumEntity)) {   //更新相册信息
                    map.put("album", existAlbumEntity);
                    sessionService.session_Put(map);
                    map.put("status", "S");
                    map.put("msg", "上传成功");
                } else {
                    sessionService.session_Del("album");
                    map.put("status", "F");
                    map.put("msg", "上传失败");
                }
            } else {
                albumEntity.setGood("0");
                if (albumService.saveAlbum(albumEntity)) {  //保存相册信息
                    //获取用户下的相册数量
                    int albumNum = albumService.getAlbumNum(existUserEntity.getUserId());
                    //更新用户信息的相册数量
                    existUserEntity.setAlbumNum( albumNum + "");
                    userService.modifyUserInfo(existUserEntity);
                    map.put("album", albumEntity);
                    sessionService.session_Put(map);
                    map.put("status", "S");
                    map.put("msg", "上传成功");
                } else {
                    sessionService.session_Del("album");
                    map.put("status", "F");
                    map.put("msg", "上传失败");
                }
            }
        }
        result = objectMapper.writeValueAsString(map);
        return "Album";
    }

    /**
     * 通过用户Id获取完整的相册信息，并按时间降序
     * @return
     * @throws Exception
     */
    public String getAlbumAllByIdDesc() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        //获取用户下的所有相册信息，并按时间降序
        List<AlbumEntity> albums = albumService.findAlbumByHql( albumEntity.getUserId(), "desc" );
        if( albums == null ){
            map.put("status","F");
            map.put("msg","没有相册数据");
            map.put("albumPackageForms",new ArrayList<>());
        }else{
            List<AlbumPackageForm> albumPackageForms = new ArrayList<AlbumPackageForm>();
            for ( int i = 0 ; i < albums.size() ; i++ ){
                AlbumPackageForm albumPackageForm = albumService.findPictureName(albums.get(i));
                if( albumPackageForm != null ){
                    albumPackageForms.add(albumPackageForm);
                }
            }
            map.put("status","S");
            map.put("msg","查询成功");
            map.put("albumPackageForms",albumPackageForms);
        }
        result = objectMapper.writeValueAsString(map);
        return "Album";
    }

    /**
     * 根据用户ID分页获取相册内容，相册展示图片为随机
     * @return
     * @throws Exception
     */
    public String getAlbumPageByUserId() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        int userId = albumEntity.getUserId();
        if( (userId+"").length() <= 0 ){
            map.put("status","F");
            map.put("msg","未登录");
        }else {
            String Hql = "from AlbumEntity where userId=" + userId;
            pageForm = albumService.queryForPage(pageForm.getPageSize(), pageForm.getCurrentPage(),Hql);
            List<AlbumPackageForm> albumPackageForms = new ArrayList<>();
            for( int i = 0 ; i < pageForm.getList().size() ; i++ ){
                AlbumPackageForm albumPackageForm = new AlbumPackageForm();
                BeanUtils.copyProperties(pageForm.getList().get(i),albumPackageForm);
                albumPackageForm.setPictureName( albumService.getAlbumPackageAboutImageName(albumPackageForm) );
                albumPackageForms.add(albumPackageForm);
            }
            map.put("status","S");
            map.put("msg","查询成功");
            map.put("albumPackageForms",albumPackageForms);
            map.put("allRow",pageForm.getAllRow());
            map.put("totalPage",pageForm.getTotalPage());
            map.put("currentPage",pageForm.getCurrentPage());
            map.put("pageSize",pageForm.getPageSize());
        }
        result = objectMapper.writeValueAsString(map);
        return "Album";
    }

    /**
     * 通过相册标题进行分页模糊查询，相册展示图片为随机
     * @return
     * @throws Exception
     */
    public String getAlbumPageByTitle() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        String Hql = "from AlbumEntity where title like '%" + albumEntity.getTitle() + "%'";
        pageForm = albumService.queryForPage(pageForm.getPageSize(), pageForm.getCurrentPage(),Hql);
        List<AlbumPackageForm> albumPackageForms = new ArrayList<>();
        for( int i = 0 ; i < pageForm.getList().size() ; i++ ){
            AlbumPackageForm albumPackageForm = new AlbumPackageForm();
            BeanUtils.copyProperties(pageForm.getList().get(i),albumPackageForm);
            albumPackageForm.setPictureName( albumService.getAlbumPackageAboutImageName(albumPackageForm) );
            albumPackageForms.add(albumPackageForm);
        }
        map.put("status","S");
        map.put("msg","查询成功");
        map.put("albumPackageForms",albumPackageForms);
        map.put("allRow",pageForm.getAllRow());
        map.put("totalPage",pageForm.getTotalPage());
        map.put("currentPage",pageForm.getCurrentPage());
        map.put("pageSize",pageForm.getPageSize());
        result = objectMapper.writeValueAsString(map);
        return "Album";
    }

    /**
     * 通过相册类型进行分页模糊查询，相册展示图片为随机
     * @return
     * @throws Exception
     */
    public String getAlbumPageByType() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        String Hql = "from AlbumEntity where theme like '%" + albumEntity.getTheme() + "%'";
        pageForm = albumService.queryForPage(pageForm.getPageSize(), pageForm.getCurrentPage(),Hql);
        List<AlbumPackageForm> albumPackageForms = new ArrayList<>();
        for( int i = 0 ; i < pageForm.getList().size() ; i++ ){
            AlbumPackageForm albumPackageForm = new AlbumPackageForm();
            BeanUtils.copyProperties(pageForm.getList().get(i),albumPackageForm);
            albumPackageForm.setPictureName( albumService.getAlbumPackageAboutImageName(albumPackageForm) );
            UserEntity userEntity = new UserEntity();
            userEntity.setUserId(albumPackageForm.getUserId());
            userEntity = userService.findUserByUserId(userEntity);
            albumPackageForm.setUserName(userEntity.getName());
            albumPackageForms.add(albumPackageForm);
        }
        map.put("status","S");
        map.put("msg","查询成功");
        map.put("albumPackageForms",albumPackageForms);
        map.put("allRow",pageForm.getAllRow());
        map.put("totalPage",pageForm.getTotalPage());
        map.put("currentPage",pageForm.getCurrentPage());
        map.put("pageSize",pageForm.getPageSize());
        result = objectMapper.writeValueAsString(map);
        return "Album";
    }

    /**
     * 通过相册ID获取相册的所有信息
     * @return
     * @throws Exception
     */
    public String getAlbumInfoByAlbumId() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        AlbumEntity existAlbumEntity = albumService.findAlbumByAlbumId(albumEntity.getAlbumId());
        if( existAlbumEntity == null ){
            map.put("status","F");
            map.put("msg","未能找到该相册");
        }else{
            AlbumPackageForm albumPackageForm = albumService.findPictureName(existAlbumEntity);
            map.put("status","S");
            map.put("msg","查询成功");
            map.put("album",albumPackageForm);
        }
        result = objectMapper.writeValueAsString(map);
        return "Album";
    }

    /**
     * 点赞
     * @return
     * @throws Exception
     */
    public String setGood() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        AlbumEntity existAlbumEntity = albumService.findAlbumByAlbumId(albumEntity.getAlbumId());
        UserEntity existUserEntity = (UserEntity)sessionService.session_Get("user");
        if ( existAlbumEntity.getUserId() == existUserEntity.getUserId() ){
            map.put("status","F");
            map.put("msg","不能点赞自己发布的相册");
        }else {
            existAlbumEntity.setGood((Integer.parseInt(existAlbumEntity.getGood())+1)+"");
            boolean success = albumService.updateAlbum(existAlbumEntity);
            if( !success ){
                map.put("status","F");
                map.put("msg","未能点赞成功");
            }else{
                map.put("status","S");
                map.put("msg","点赞成功");
                map.put("existAlbumEntity",existAlbumEntity);
            }
        }
        result = objectMapper.writeValueAsString(map);
        return "Album";
    }

    /**
     * 对相册点赞进行排序，获取相册列表
     * @return
     * @throws Exception
     */
    public String findAlbumByGoodLevel() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();
        List<AlbumEntity> albums = albumService.findAlbumByGoodLevel();
        if( albums == null ){
            map.put("status","F");
            map.put("msg","没有相册数据");
            map.put("albumPackageForms",new ArrayList<>());
        }else {
            List<AlbumPackageForm> albumPackageForms = new ArrayList<>();
            for (int i = 0; i < albums.size(); i++) {
                AlbumPackageForm albumPackageForm = new AlbumPackageForm();
                BeanUtils.copyProperties(albums.get(i), albumPackageForm);
                albumPackageForm.setPictureName(albumService.getAlbumPackageAboutImageName(albumPackageForm));
                albumPackageForms.add(albumPackageForm);
            }
            map.put("status","S");
            map.put("msg","查询成功");
            map.put("albumPackageForms",albumPackageForms);
        }
        result = objectMapper.writeValueAsString(map);
        return "Album";
    }
}

