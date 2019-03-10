package com.service;

import javax.xml.parsers.DocumentBuilder;
import java.io.File;

/**
 * Created by Benson on 2017/4/2.
 */
public interface BarrageService {
    /**
     * 获取操作XML对象
     * @return
     */
    public DocumentBuilder getDocumentBuilder();

    /**
     * 创建xml文件
     */
    public void createXML(File pathXml);
}
