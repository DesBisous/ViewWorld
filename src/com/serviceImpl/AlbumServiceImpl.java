package com.serviceImpl;


import com.beans.AlbumEntity;
import com.dao.AlbumDao;
import com.dao.MemberDao;
import com.forms.AlbumPackageForm;
import com.forms.PageForm;
import com.service.AlbumService;
import org.apache.struts2.ServletActionContext;
import org.springframework.beans.BeanUtils;

import java.awt.*;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Benson on 2017/2/21.
 */
public class AlbumServiceImpl implements AlbumService {
    private AlbumDao albumDao;
    private MemberDao memberDao;

    public AlbumDao getAlbumDao() {
        return albumDao;
    }

    public void setAlbumDao(AlbumDao albumDao) {
        this.albumDao = albumDao;
    }

    public MemberDao getMemberDao() {
        return memberDao;
    }

    public void setMemberDao(MemberDao memberDao) {
        this.memberDao = memberDao;
    }

    @Override
    public boolean saveAlbum(AlbumEntity albumEntity) {
        return albumDao.saveAlbum(albumEntity);
    }

    @Override
    public AlbumEntity findAlbum(AlbumEntity albumEntity) {
        return albumDao.findAlbum(albumEntity);
    }

    @Override
    public boolean updateAlbum(AlbumEntity albumEntity) {
        return albumDao.updateAlbum(albumEntity);
    }

    @Override
    public List<AlbumEntity> findAlbumByHql(int userId, String order) {
        return albumDao.findAlbumByHql(userId,order);
    }

    @Override
    public List<AlbumEntity> findAlbumByGoodLevel() {
        return albumDao.findAlbumByGoodLevel();
    }

    @Override
    public AlbumEntity findAlbumByAlbumId(int albumId) {
        return albumDao.findAlbumByAlbumId(albumId);
    }

    @Override
    public AlbumPackageForm findPictureName(AlbumEntity albumEntity) {
        AlbumPackageForm albumPackageForm = new AlbumPackageForm();
        BeanUtils.copyProperties(albumEntity,albumPackageForm);
        String albumPath = "/resources/image/"+albumPackageForm.getUserId()+"/"+albumPackageForm.getTitle()+"/";
        String path = ServletActionContext.getServletContext().getRealPath(albumPath);
        File filePath = new File(path);
        if(!filePath.exists()){
            return null;
        }else{
            //获取当前相册中的所有文件
            File[] listFiles =  filePath.listFiles();
            List<String> nameList = new ArrayList<String>();
            for( int i = 0 ; i < listFiles.length ; i++ ){
                String imageName = listFiles[i].getName();
                int len = imageName.lastIndexOf(".");
                String imageType = imageName.substring(len);
                //判断获取到的文件是不是图片类型
                if( imageType.equals(".BMP")||imageType.equals(".PNG")||imageType.equals(".GIF")||imageType.equals(".JPG")||imageType.equals(".JPEG")||
                        imageType.equals(".bmp")||imageType.equals(".png")||imageType.equals(".gif")||imageType.equals(".jpg")||imageType.equals(".jpeg" ) ){
                    nameList.add(imageName);
                }
            }
            albumPackageForm.setPictureNames(nameList);
            return albumPackageForm;
        }
    }

    @Override
    public int getAlbumNum(int userId) {
        return albumDao.getAlbumNum(userId);
    }

    @Override
    public PageForm queryForPage(int pageSize, int page, String hql) {
        int allRow = memberDao.getAllRowCount(hql);  //总记录数
        int totalPage = PageForm.countTatalPage(pageSize, allRow); //总页数
        final int currentPage = PageForm.countCurrentPage(page,totalPage); // 当前页
        final int offset = PageForm.countOffset(pageSize, currentPage); //当前页开始记录
        final int length = pageSize; // 每页记录数
        List<AlbumEntity> list = new ArrayList<>();
        if( allRow > 0 ){
            list = memberDao.queryForPage(hql, offset, length); //分页查询
        }
        PageForm pageForm  = new PageForm();
        pageForm.setPageSize(pageSize);
        pageForm.setCurrentPage(currentPage);
        pageForm.setAllRow(allRow);
        pageForm.setTotalPage(totalPage);
        pageForm.setList(list);
        pageForm.init();
        return pageForm;
    }

    @Override
    public String getAlbumPackageAboutImageName(AlbumPackageForm albumPackageForm) {
        String albumPath = "/resources/image/"+albumPackageForm.getUserId()+"/"+albumPackageForm.getTitle()+"/";
        String path = ServletActionContext.getServletContext().getRealPath(albumPath);
        File filePath = new File(path);
        if(!filePath.exists()){
            albumPackageForm.setPictureName("No picture");
        }else{
            //获取当前相册中的所有文件
            File[] listFiles =  filePath.listFiles();
            if( listFiles.length<=0 ) {
                albumPackageForm.setPictureName("No picture");
            }else{
                for( int i = 0 ; i < 5 ; i++ ){
                    int n = (int)(Math.random() * listFiles.length); //0-100以内的随机数，用Matn.random()方式
                    String imageName  = listFiles[n].getName();
                    int len = imageName.lastIndexOf(".");
                    String imageType = imageName.substring(len);
                    //判断获取到的文件是不是图片类型
                    if( imageType.equals(".BMP")||imageType.equals(".PNG")||imageType.equals(".GIF")||imageType.equals(".JPG")||imageType.equals(".JPEG")||
                            imageType.equals(".bmp")||imageType.equals(".png")||imageType.equals(".gif")||imageType.equals(".jpg")||imageType.equals(".jpeg" ) ){
                        albumPackageForm.setPictureName(imageName);
                        break;
                    }
                }
            }
        }
        return albumPackageForm.getPictureName();
    }
}
