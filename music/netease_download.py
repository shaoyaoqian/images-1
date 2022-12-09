
# 网易云爬虫，使用了NeteaseCloudMusicApi，文档参见：
# https://neteasecloudmusicapi.vercel.app
# 第三方API服务搭建在vercel上

import requests
import eyed3, time, random
from loguru import logger

logger.add('my_log.log')

phone    = '15991859247'
password = 'a12345'
url_base = "https://netease.pengfeima.cn"

class NeteaseAPI():
    def login(self):
        url = url_base+"/login/cellphone"
        params = {
            'phone': phone,
            'password': password
        }
        response = requests.get(url,params=params)
        logger.info("response.url: {}".format(response.url))
        return response

    def singer(self, id = "11972054"):
        url = url_base + "/artist/desc"
        params = {
            'id':id
        }
        response = requests.get(url,params=params)
        logger.info("response.url: {}".format(response.url))
        return response

    def singer_details(self, id = "11972054"):
        url = url_base + "/artist/detail"
        params = {
            'id':id
        }
        response = requests.get(url,params=params)
        logger.info("response.url: {}".format(response.url))
        return response

    def album(self, id = "32311"):
        url = url_base + "/album"
        params = {
            'id':id
        }
        response = requests.get(url,params=params)
        logger.info("response.url: {}".format(response.url))
        return response

    def singer_albums(self, id = "11972054", limit=5, offset=0):
        url = url_base + "/artist/album"
        params = {
            'id':id,
            'limit':limit,
            'offset':offset
        }
        response = requests.get(url,params=params)
        logger.info("response.url: {}".format(response.url))
        return response

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
# result = NA.login()
# result = NA.singer()
# result = NA.singer_details()
# result = NA.album()
# result = NA.singer_albums()
id="29818028"
result = NA.song(id=id)
result = NA.song_detail(id=id)

song_name = result.json()['songs'][0]['name']
singer_name = result.json()['songs'][0]['ar'][0]['name']

with open("-".join([id,song_name,singer_name])+'.txt', 'wb') as f:
    f.write(result.content)

response = requests.get(result.json()['songs'][0]['al']['picUrl'])
with open(id+'.png', 'wb') as f:
    f.write(response.content)

result = NA.song_lyric(id=id)
with open(id+'.lrc', 'w') as f:
    f.write(result.json()['lrc']['lyric'])

result = NA.song_download(id=id,filename=id)
