package com.action;

import com.beans.UserEntity;
import com.beans.VideoEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.opensymphony.xwork2.ActionSupport;
import com.service.BarrageService;
import com.service.SessionService;
import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Benson on 2017/3/11.
 */
public class UploadVideoAction  extends ActionSupport {
    private static final long serialVersionUID = 1L;
    private File file;
    private String fileName;
    private SessionService sessionService;
    private BarrageService barrageService;
    private String result;

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

    public SessionService getSessionService() {
        return sessionService;
    }

    public void setSessionService(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    public BarrageService getBarrageService() {
        return barrageService;
    }

    public void setBarrageService(BarrageService barrageService) {
        this.barrageService = barrageService;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String uploadVideo() throws Exception {
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
                String headName;
                if( fileName != null && fileName.length() > 0 ){
                    headName = fileName;
                }else{
                    headName = System.currentTimeMillis() + "_" + idStr + ".mp4";
                }
                FileUtils.copyFile(file, new File(filePath, headName));
                String[] xmlName = headName.split("\\.");
                barrageService.createXML(new File(filePath, xmlName[0]+".xml"));
                map.put("status","S");
                map.put("msg","上传成功");
            }
        }
        result = objectMapper.writeValueAsString(map);
        return "upload";
    }
}
