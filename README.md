#### 附件预览

# 通用附件预览插件




### 1.1 拟支持的文件类型

| 类别 | 文件类型 | 场景描述 |
|----------|------------------------------------------|-----------------------------|
| 图片类 | JPEG (JPG) | 照片和复杂图像 | 
| | PNG | 网页图形和需要透明背景的图像 |
| | GIF | 动画图像和简单图形 |
| | BMP | 高质量图像，适合打印 | 
| | TIFF | 专业图像处理和印刷 |
| | WEBP | 现代网页图像，高效压缩 |
| | SVG | 矢量图形、图标和简单设计 | 
| 文本类 | TXT | 纯文本文件 |
| | RTF | 富文本格式，支持简单格式化 | 
| | Markdown | 文本格式化，广泛用于文档和评论 | 
| | HTML | 网页和网络文档 | 
| Word类型 | DOC | Microsoft Word 文档 |
| | DOCX | 更新版 Microsoft Word 文档 | 
| | DOT | Word 模板文件 | 
| PDF类 | PDF | 电子文档，便于分享和打印 |
| | PDF/A | 存档的 PDF 格式 |
| Excel类 | XLS | Microsoft Excel 97-2003 文件 |
| | XLSX | Microsoft Excel 2007 及更新版文件 |
| | CSV | 逗号分隔值文件，常用于数据交换 |
| 视频类 | MP4 | 广泛使用的视频格式 |
| | AVI | 较老的视频格式，质量较高 |
| | MKV | 多媒体容器支持多种编码格式 |
| | MOV | Apple QuickTime 视频格式 | | | WMV | Windows Media 视频格式 |



#### 1.1.1 图片

图片可以直接利用原始img标签来进行处理

#### 1.1.2 文本类

图片可以直接利用原始p标签来进行处理

#### 1.2.3  word类型

使用`docx-preview`插件，将docx转换成html展示

#### 1.2.4 excel类型

使用 `xlsx` 插件进行处理进行处理

#### 1.2.5 pdf 类型

使用 `pdfjs-dist` 插件进行处理

#### 1.2.6 其他

直接返回该文件不支持预览
