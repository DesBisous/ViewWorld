# ViewWorld AngularJS与SSH框架下媒体分享系统

![image](https://raw.githubusercontent.com/DesBisous/ViewWorld/master/image/%E5%9B%BE%E7%89%87%202.png)
![image](https://raw.githubusercontent.com/DesBisous/ViewWorld/master/image/%E5%9B%BE%E7%89%87%204.png)

## 系统功能主要分为以下几个主要部分：

1. 媒体的分享功能：对已存储在系统中的媒体数据将以在网页中显示的形式进行分享，主要是通过图片的查阅、展示和视频的播放。
2. 媒体的交流功能：针对已上传的媒体数据通过对其中相册和视频进行发表评论，系统中还支持视频弹幕的发送，通过弹幕形式进行数据的分享和交流。
3. 媒体的上传功能：免费申请注册系统账号，进入上传页面进行上传媒体数据。
4. 媒体的搜索功能：系统的搜索通过以用户选择‘图片’、‘视频’两种关键类别进行搜索，并且分别对两个媒体数据进行分类，例如：图片分为：‘节日’、‘时尚’等，视频分为：‘电影’，‘电视剧’等类别划分。
5. 用户功能：用户功能包括查看媒体、修改信息、上传媒体一系列基本操作。
6. 管理员功能：管理员功能包括系统的信息维护、用户账号的管理、系统数据统计等一系列管理操作。

## 技术栈

1. 采用B/S结构,MVC设计模式
2. 系统框架:Struts2、spring、Hibernate
3. 数据库: MySql
4. 编译环境: IntelliJ IDEA, Tomcat 8.0
5. 网站前端技术: AngularJS、Bootstrap,CSS3, jQuery

#### 简述

1. 对于Strust2将主要使用到strust.xml的配置做到类似于后端接收前端信息的后端接口，并对用户的访问进行安全监测，地址异常友好处理，采用拦截器的机制来处理用户的请求，这样的设计也使得业务逻辑控制器能够与ServletAPI完全脱离开
2. 对于Spring将重点采用spring的两个核心技术IOC容器和AOP面向对象切面机制，来管理实体类。
3. 对于Hibernate将重点使用它的ORM关系映射机制，使用它自身的HQL语句、面向对象操作方式对数据的存储和更新等，使系统与数据库之间通过Hibernate框架进行更友好的连接。
4. 对于AJAX就是将POST和GET请求通过AJAX发送给后端。
5. 对于Booostrap将重点使用它的样式组件和响应式机制来构件网页。
6. 对于AngularJS主要用于前端的MVC布局设计，使用双向数据绑定、模块化等技术令前端开发变得更加便捷。

![image](https://raw.githubusercontent.com/DesBisous/ViewWorld/master/image/%E5%9B%BE%E7%89%87%201.png)
