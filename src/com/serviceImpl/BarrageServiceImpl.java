package com.serviceImpl;

import com.service.BarrageService;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.*;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.File;

/**
 * Created by Benson on 2017/4/2.
 */
public class BarrageServiceImpl implements BarrageService{

    @Override
    public DocumentBuilder getDocumentBuilder() {
        DocumentBuilderFactory dbf = null;
        DocumentBuilder db = null;
        try {
            //创建一个DocumentBuilderFactory的对象
            dbf = DocumentBuilderFactory.newInstance();
            //创建一个DocumentBuilder对象
            db = dbf.newDocumentBuilder();
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        }
        return db;
    }

    @Override
    public void createXML(File pathXml) {
        DocumentBuilder db = getDocumentBuilder();
        Document document = db.newDocument();
        Element Info = document.createElement("Info");
        document.appendChild(Info);

        //利用transformer对象将修改后的文档重新输出
        TransformerFactory tFactory = TransformerFactory.newInstance();
        try {
            Transformer transformer = tFactory.newTransformer();
            transformer.setOutputProperty(OutputKeys.INDENT,"yes");
            transformer.transform(new DOMSource(document),new StreamResult(pathXml));
        } catch ( TransformerConfigurationException e ){
            e.printStackTrace();
        } catch ( TransformerException e ){
            e.printStackTrace();
        }
    }
}





















