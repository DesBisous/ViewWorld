package com.service;

import com.beans.AlbumEntity;
import com.forms.AlbumPackageForm;
import com.forms.PageForm;

import java.util.List;

/**
 * Created by Benson on 2017/2/21.
 */
public interface AlbumService {
    /**
     * 保存相册信息
     */
    public boolean saveAlbum(AlbumEntity albumEntity);

    /**
     * 查找相册信息
     */
    public AlbumEntity findAlbum(AlbumEntity albumEntity);

    /**
     * 更新相册
     */
    public boolean updateAlbum(AlbumEntity albumEntity);

    /**
     * 根据用户ID查询相册，并且进行排序
     */
    public List<AlbumEntity> findAlbumByHql(int userId , String order );

    /**
     * 对相册点赞进行排序，获取相册列表
     */
    public List<AlbumEntity> findAlbumByGoodLevel();

    /**
     * 根据相册ID查询相册
     */
    public AlbumEntity findAlbumByAlbumId(int albumId);

    /**
     * 根据相册信息查询相册下的所有图片名称,并进行相册对象的重新封装
     */
    public AlbumPackageForm findPictureName( AlbumEntity albumEntity );

    /**
     * 获取用户下的相册数量
     */
    public int getAlbumNum( int userId );

    /**
     * 分页查询
     * @param pageSize  每页显示多少记录
     * @param page 当前页
     * @return 封装了分页信息的bean
     */
    public PageForm queryForPage(int pageSize, int page, String hql);

    /**
     * 根据相册信息查找一张随机图片名称进行返回
     * @param albumPackageForm
     * @return
     */
    public String getAlbumPackageAboutImageName( AlbumPackageForm albumPackageForm);
}
