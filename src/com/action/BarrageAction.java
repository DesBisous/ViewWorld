package com.action;

import com.beans.VideoEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.forms.BarrageForm;
import com.opensymphony.xwork2.ActionSupport;
import com.service.BarrageService;
import com.service.VideoService;
import org.apache.struts2.ServletActionContext;
import org.w3c.dom.*;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.File;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Benson on 2017/3/31.
 */
public class BarrageAction  extends ActionSupport {
    private static final long serialVersionUID = 1L;
    private BarrageForm barrageForm;
    private BarrageService barrageService;
    private VideoEntity videoEntity;
    private VideoService videoService;
    private String result;

    public BarrageForm getBarrageForm() {
        return barrageForm;
    }

    public void setBarrageForm(BarrageForm barrageForm) {
        this.barrageForm = barrageForm;
    }

    public BarrageService getBarrageService() {
        return barrageService;
    }

    public void setBarrageService(BarrageService barrageService) {
        this.barrageService = barrageService;
    }

    public VideoEntity getVideoEntity() {
        return videoEntity;
    }

    public void setVideoEntity(VideoEntity videoEntity) {
        this.videoEntity = videoEntity;
    }

    public VideoService getVideoService() {
        return videoService;
    }

    public void setVideoService(VideoService videoService) {
        this.videoService = videoService;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String updateBarrage() throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Object, Object> map = new HashMap<>();

        DocumentBuilder db = barrageService.getDocumentBuilder();
        //获取xml相对路径
        String videoPath = "/resources/video/"+videoEntity.getUserId()+"/"+videoEntity.getTitle()+"/"+barrageForm.getBarrageXmlName();
        String Path = ServletActionContext.getServletContext().getRealPath(videoPath);
        File file = new File(Path);
        if(!file.exists()){
            map.put("status", "F");
            map.put("msg", "弹幕文件不存在");
        }else{
            Document doc = db.parse(file);

            //获取根节点Info
            NodeList InfoList = doc.getElementsByTagName("Info");
            Node Info = InfoList.item(0);

            //创建Barrage节点
            Element Barrage = doc.createElement("Barrage");

            //创建Barrage一下的所有子节点
            Element font_size = doc.createElement("font_size");
            Element barrage_position = doc.createElement("barrage_position");
            Element barrage_color = doc.createElement("barrage_color");
            Element barrage_text = doc.createElement("barrage_text");
            Element barrage_time = doc.createElement("barrage_time");
            Element barrage_date = doc.createElement("barrage_date");

            //创建Barrage一下的所有子节点的文本节点
            Text font_size_txt = doc.createTextNode(barrageForm.getBarrage_font_size_str());
            Text barrage_position_txt = doc.createTextNode(barrageForm.getBarrage_position_str());
            Text barrage_color_txt = doc.createTextNode(barrageForm.getBarrage_color_str());
            Text barrage_text_txt = doc.createTextNode(barrageForm.getBarrage_text_str());
            Text barrage_time_txt = doc.createTextNode(barrageForm.getBarrage_time_str());
            Text barrage_date_txt = doc.createTextNode(barrageForm.getBarrage_date_str());

            //将文本节点添加到对应的Barrage的子节点中
            font_size.appendChild(font_size_txt);
            barrage_position.appendChild(barrage_position_txt);
            barrage_color.appendChild(barrage_color_txt);
            barrage_text.appendChild(barrage_text_txt);
            barrage_time.appendChild(barrage_time_txt);
            barrage_date.appendChild(barrage_date_txt);

            //将Barrage的子节点添加到Barrage中
            Barrage.appendChild(font_size);
            Barrage.appendChild(barrage_position);
            Barrage.appendChild(barrage_color);
            Barrage.appendChild(barrage_text);
            Barrage.appendChild(barrage_time);
            Barrage.appendChild(barrage_date);

            //将Barrage添加到Indo根节点中
            Info.appendChild(Barrage);

            //利用transformer对象将修改后的文档重新输出
            TransformerFactory tFactory = TransformerFactory.newInstance();
            Transformer transformer = tFactory.newTransformer();
            transformer.setOutputProperty(OutputKeys.INDENT,"yes");
            DOMSource source = new DOMSource(doc);
            //将xml文档保存
            StreamResult streamResult = new StreamResult(file);
            transformer.transform(source,streamResult);

            //更新弹幕数量
            videoEntity = videoService.findVideoByVideoId(videoEntity.getVideoId());
            videoEntity.setBarrageNum((Integer.parseInt(videoEntity.getBarrageNum())+1)+"");
            videoService.updateVideo(videoEntity);

            map.put("status", "S");
            map.put("msg", "弹幕更新成功");
        }
        result = objectMapper.writeValueAsString(map);
        return "Barrage";
    }
}
