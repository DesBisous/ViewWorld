package com.dao;

import com.beans.AlbumEntity;

import java.util.List;

/**
 * Created by Benson on 2017/2/21.
 */
public interface AlbumDao {
    public boolean saveAlbum( AlbumEntity albumEntity );
    public AlbumEntity findAlbum( AlbumEntity albumEntity );
    public List<AlbumEntity> findAlbumByHql( int userId , String order );
    public List<AlbumEntity> findAlbumByGoodLevel();
    public AlbumEntity findAlbumByAlbumId( int albumId );
    public boolean updateAlbum( AlbumEntity albumEntity );
    public int getAlbumNum( int userId );
}
