package com.forms;

import java.io.File;
import java.util.List;


public class ImgForm {

    private List<File> upload;
    private List<String> uploadContentType;
    private List<String> uploadFileName;

    public List<File> getUpload() {
        return upload;
    }

    public void setUpload(List<File> upload) {
        this.upload = upload;
    }

    public List<String> getUploadContentType() {
        return uploadContentType;
    }

    public void setUploadContentType(List<String> uploadContentType) {
        this.uploadContentType = uploadContentType;
    }

    public List<String> getUploadFileName() {
        return uploadFileName;
    }

    public void setUploadFileName(List<String> uploadFileName) {
        this.uploadFileName = uploadFileName;
    }

    @Override
    public String toString() {
        return "ImgForm{" +
                "upload=" + upload +
                ", uploadContentType=" + uploadContentType +
                ", uploadFileName=" + uploadFileName +
                '}';
    }
}
