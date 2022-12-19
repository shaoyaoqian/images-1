
# 网易云爬虫，使用了NeteaseCloudMusicApi，文档参见：
# https://neteasecloudmusicapi.vercel.app

import requests
from loguru import logger
logger.add('my_log.log')
url_base = "https://netease.pengfeima.cn"
class NeteaseAPI():
    def song_lyric(self, id = '436147423'):
        url = url_base + "/lyric"
        params = {
            'id':id
        }
        response = requests.get(url,params=params)
        logger.info("response.url: {}".format(response.url))
        return response

    def song_detail(self, id = '436147423'):
        url = url_base + "/song/detail"
        params = {
            'ids':id
        }
        response = requests.get(url,params=params)
        logger.info("response.url: {}".format(response.url))
        return response

    def song(self, id = '436147423', level = 'standard'):
        # url = url_base + "/song/url"          # old API
        url = url_base + "/song/url/v1"
        params = {
            'id'    : id,
            'level' : level  
            # standard => 标准
            # higher   => 较高
            # exhigh   => 极高
            # lossless => 无损 
            # hires    => Hi-Res
        }
        response = requests.get(url,params=params)
        logger.info("response.url: {}".format(response.url))
        return response

    def song_download(self, id = '1834270728', level = 'standard', filename = "filename"):
        result = self.song(id=id,level=level)
        url_song =  result.json()['data'][0]['url']
        logger.info("url_song: {}".format(url_song))
        logger.info("song_path: {}".format(filename))
        # 判断歌曲是否能下载
        if url_song == None :
            appendix = ".txt"
            with open(filename + appendix, 'wb') as f:
                f.write(filename.encode())
        else :
            appendix = '.' + url_song.split(".")[-1]
            response = requests.get(url_song)
            # 文件名外部传入，后缀从url解析
            with open(filename + appendix, 'wb') as f:
                f.write(response.content)
            logger.info("response.url: {}".format(response.url))
        return filename + appendix


# test 
NA = NeteaseAPI()
id="453927771"

# 获取歌曲详细信息
result = NA.song_detail(id=id)
song_name = result.json()['songs'][0]['name']
singer_name = result.json()['songs'][0]['ar'][0]['name']
with open("-".join([id,song_name,singer_name])+'.txt', 'wb') as f:
    f.write(result.content)

# 获取歌曲封面
response = requests.get(result.json()['songs'][0]['al']['picUrl'])
with open(id+'.png', 'wb') as f:
    f.write(response.content)

# 获取歌词
result = NA.song_lyric(id=id)
with open(id+'.lrc', 'w') as f:
    f.write(result.json()['lrc']['lyric'])

# 获取歌曲音频
result = NA.song_download(id=id,filename=id)

# 返回我们需要的格式
url_base = "https://raw.githubusercontent.com/shaoyaoqian/images-1/main/music/"
print("audio=\'"+url_base+id+".mp3\',")
print("cover=\'"+url_base+id+".png\',")
print("lrc=\'"+url_base+id+".lrc\',")
print("name=\'"+song_name+'\',')
print("artist=\'"+singer_name+'\',')