# pip install pillow -i https://pypi.douban.com/simple
from PIL import Image
import os

# 源文件
origin_directory = './images'
output_directory = './images/compressed'
max_width = 1080

#获取文件夹里面的图片
path_list=[origin_directory + "/" + i for i in os.listdir(origin_directory)]

compress_file_list = []
existed_path_list=[output_directory + "/" + i for i in os.listdir(output_directory)]
for file_path in existed_path_list:
    file_name = os.path.basename(file_path)
    file_name_without_ext = os.path.splitext(file_name)[0]
    compress_file_list.append(file_name_without_ext)


def reduce_image_quality(infile, mb=10002400, step=3, quality=80):
    """不改变图片尺寸压缩到指定大小
    :param infile: 压缩源文件
    :param mb: 压缩目标(B)默认100K
    :param step: 每次调整的压缩比率
    :param quality: 初始压缩比率
    """
    outfile = 'temp.webp'
    o_size = os.path.getsize(infile)
    if o_size < mb:
        return
    else :
        while o_size > mb:
            print(o_size, quality)
            im = Image.open(infile)
            im.save(outfile, quality=quality)
            if quality - step < 0:
                break
            quality -= step
            o_size = os.path.getsize(outfile)
        im = Image.open(infile)
        im.save(infile, quality=quality)    


#循环图片路径，依次对图片进行压缩
for file_input in path_list:
    file_name = os.path.basename(file_input)
    file_name_without_ext = os.path.splitext(file_name)[0]
    if file_name_without_ext in compress_file_list:
        print(f"{file_name_without_ext}已经压缩过了")
        continue
    print(f"{file_input}开始压缩")
    file   = file_input.split("/")[-1]
    filename, format_in = (file.split(".")[0], file.split(".")[-1])
    format_out = 'webp'
    file_output = '{directory:s}/{filename:s}.{format_out}'.format(directory=output_directory,filename=filename,format_out=format_out)
    print(file_output)
    if format_in not in set(['png','jpg','jpeg','webp','JPG']):
        continue
    im = Image.open(file_input)
    (x, y) = im.size            # 读取图片尺寸（像素）
    if x < max_width:
        out = im
    else :
        x_1 = max_width         # 定义缩小后的标准宽度
        y_1 = int(y * x_1 / x)  # 计算缩小后的高度
        out = im.resize((x_1, y_1), Image.Resampling.LANCZOS)  # 改变尺寸，保持图片高品质
    out.save(file_output)
    reduce_image_quality(file_output)
