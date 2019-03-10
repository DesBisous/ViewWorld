package com.action;

import com.beans.AlbumEntity;
import com.beans.UserEntity;
import com.beans.VideoEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.forms.ImgForm;
import com.opensymphony.xwork2.ActionSupport;
import com.service.SessionService;
import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;

import java.io.File;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Benson on 2017/2/14.
 */
public class UploadImageAction extends ActionSupport {
    private static final long serialVersionUID = 1L;
    private File file;
    private String fileName;
    private SessionService sessionService;
    private String result;
    public SessionService getSessionService() {
        return sessionService;
    }

    public void setSessionService(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String uploadHeadImagByUser() throws Exception {
        ObjectMapper objectMapper=new ObjectMapper();
        Map map=new HashMap<>();
        UserEntity existUserEntity = (UserEntity)sessionService.session_Get("user");
        if( existUserEntity == null ){
            map.put("status","F");
            map.put("msg","未登录，不能上传");
        }else{
            String idStr = String.valueOf(existUserEntity.getUserId());
            String relativePath = "/resources/image/"+idStr+"/";
            String path = ServletActionContext.getServletContext().getRealPath(relativePath);
            File filePath = new File(path);
            if(!filePath.exists()){
                filePath.mkdir();
            }
            String headName = "Head_" + idStr + ".jpg";
            FileUtils.copyFile(file, new File(filePath, headName));
            map.put("status","S");
            map.put("msg","上传成功");
        }
        result = objectMapper.writeValueAsString(map);
        return "upload";
    }
    public String uploadAlbumImag() throws Exception {
        ObjectMapper objectMapper=new ObjectMapper();
        Map map=new HashMap<>();
        UserEntity existUserEntity = (UserEntity)sessionService.session_Get("user");
        if( existUserEntity == null ){
            map.put("status","F");
            map.put("msg","未登录，不能上传");
        }else{
            AlbumEntity existAlbumEntity = (AlbumEntity)sessionService.session_Get("album");
            if( existAlbumEntity == null ){
                map.put("status","F");
                map.put("msg","未能找到相册目录，图片保存失败");
            }else{
                String idStr = String.valueOf(existUserEntity.getUserId());
                String relativePath = "/resources/image/"+idStr+"/";
                String path = ServletActionContext.getServletContext().getRealPath(relativePath);
                File filePath = new File(path);
                if(!filePath.exists()){
                    filePath.mkdir();
                }
                relativePath = relativePath + existAlbumEntity.getTitle() + "/";
                path = ServletActionContext.getServletContext().getRealPath(relativePath);
                filePath = new File(path);
                if(!filePath.exists()){
                    filePath.mkdir();
                }
                String headName = System.currentTimeMillis() + "_" + idStr + ".png";
                FileUtils.copyFile(file, new File(filePath, headName));
                map.put("status","S");
                map.put("msg","上传成功");
            }
        }
        result = objectMapper.writeValueAsString(map);
        return "upload";
    }
    public String uploadVideoImag() throws Exception {
        ObjectMapper objectMapper=new ObjectMapper();
        Map map=new HashMap<>();
        UserEntity existUserEntity = (UserEntity)sessionService.session_Get("user");
        if( existUserEntity == null ){
            map.put("status","F");
            map.put("msg","未登录，不能上传");
        }else{
            VideoEntity existVideoEntity = (VideoEntity)sessionService.session_Get("video");
            if( existVideoEntity == null ){
                map.put("status","F");
                map.put("msg","未能找到视频Session，视频图片保存失败");
            }else{
                String idStr = String.valueOf(existUserEntity.getUserId());
                String relativePath = "/resources/video/"+idStr+"/";
                String path = ServletActionContext.getServletContext().getRealPath(relativePath);
                File filePath = new File(path);
                if(!filePath.exists()){
                    filePath.mkdir();
                }
                relativePath = relativePath + existVideoEntity.getTitle() + "/";
                path = ServletActionContext.getServletContext().getRealPath(relativePath);
                filePath = new File(path);
                if(!filePath.exists()){
                    filePath.mkdir();
                }
                String headName = existVideoEntity.getTitle() + ".png";
                FileUtils.copyFile(file, new File(filePath, headName));
                map.put("status","S");
                map.put("msg","上传成功");
            }
        }
        result = objectMapper.writeValueAsString(map);
        return "upload";
    }
}
