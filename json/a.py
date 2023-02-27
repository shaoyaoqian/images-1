
import requests
import json


GITHUB_OWNER = "shaoyaoqian"
GITHUB_REPOSITORY = "MerryJingle"
TIMEOUT = 5

def fetch_issues(owner, repository, state = None, labels=None, per_page=None, page=None):
    url_base = "https://api.github.com/repos/{owner:s}/{repository:s}/issues"
    file_base = "issues_{owner:s}_{repository:s}.json"
    url = url_base.format(owner=owner, repository=repository)
    file = file_base.format(owner=owner, repository=repository)
    # API docs: https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#list-repository-issues
    params = {
        "state":state,
        "labels":labels,
        "per_page":per_page,
        "page":page
    }
    try:
        response = requests.get(url, params = params, timeout=TIMEOUT)
        if str(response) != '<Response [200]>':
            print(response.content) 
    except Exception as e:
        print(e)

    with open(file, 'w') as f:
        json.dump(response.json(), f, ensure_ascii=False, indent=2)


def fetch_weibo():
    url_base = "https://raw.githubusercontent.com/{owner:s}/{repository:s}/{branch:s}/output/tweets.json"
    url = url_base.format(owner=GITHUB_OWNER, repository="WeiboSpider", branch="output")
    file_base = "tweets_{owner:s}_{repository:s}.json"
    file = file_base.format(owner=GITHUB_OWNER, repository=GITHUB_REPOSITORY)
    response = requests.get(url, timeout=TIMEOUT)
    with open(file, "wb") as f:
        f.write(response.content)

def fetch_friends():
    url_base = "https://raw.githubusercontent.com/{owner:s}/{repository:s}/{branch:s}/v2/data.json"
    url = url_base.format(owner=GITHUB_OWNER, repository="blog-neighbours", branch="output")
    file_base = "friends_{owner:s}_{repository:s}.json"
    file = file_base.format(owner=GITHUB_OWNER, repository=GITHUB_REPOSITORY)
    response = requests.get(url, timeout=TIMEOUT)
    with open(file, "wb") as f:
        f.write(response.content)

def fetch_fcircles():
    url_base = "https://raw.githubusercontent.com/{owner:s}/{repository:s}/{branch:s}/data.json"
    url = url_base.format(owner=GITHUB_OWNER, repository="hexo-circle-of-friends", branch="main")
    file_base = "fcircles_{owner:s}_{repository:s}.json"
    file = file_base.format(owner=GITHUB_OWNER, repository=GITHUB_REPOSITORY)
    response = requests.get(url, timeout=TIMEOUT)
    with open(file, "wb") as f:
        f.write(response.content)

fetch_issues(GITHUB_OWNER, GITHUB_REPOSITORY)
fetch_issues(GITHUB_OWNER, "MerryJingle-timeline-schedule")

fetch_weibo()
fetch_friends()
fetch_fcircles()